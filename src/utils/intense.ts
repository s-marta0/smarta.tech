declare global {
  interface Window {
    Intense?: (elements: any) => void
  }
}

const BOUND_ATTR = 'data-intense-bound'

// Intense.js attaches its click handler on every call with no dedupe, and it
// blows up on an empty NodeList (`e.length` is 0 -> it tries getAttribute on
// the list itself). So: never hand it an empty list, and never hand it the
// same element twice.
const bindIntense = () => {
  if (typeof window.Intense !== 'function') return

  const elements = Array.from(
    document.querySelectorAll(`.intense:not([${BOUND_ATTR}])`)
  )
  if (!elements.length) return

  elements.forEach(el => el.setAttribute(BOUND_ATTR, ''))
  window.Intense(elements)
}

const initIntense = () => {
  const root = document.getElementById('root')
  if (!root) return

  bindIntense()

  // Images arrive asynchronously (route changes, Contentful fetches), so
  // re-scan on DOM mutations, coalesced into one pass per frame.
  let scheduled = false
  const observer = new MutationObserver(() => {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      bindIntense()
    })
  })

  observer.observe(root, { childList: true, subtree: true })
}


export default initIntense
