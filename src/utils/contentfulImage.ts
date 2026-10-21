// Contentful serves uploads at their original size (some covers are 6000px /
// 19 MB). Its Images API resizes on the fly when you append ?w=…&fm=…&q=…
// https://www.contentful.com/developers/docs/references/images-api/


type ImageFile = {
  url?: string
  contentType?: string
  details?: {
    image?: {
      width: number
      height: number
    }
  }
}

const CONTENTFUL_IMAGES = /^(https?:)?\/\/images\.ctfassets\.net\//

// Widths offered to the browser in srcset; it picks the smallest one that
// covers the displayed size × screen density.
const SRCSET_WIDTHS = [640, 1000, 1400, 2000]


// gif/webp may be animated, and the Images API flattens them to one frame,
// so those are always served as uploaded.
const canResize = (file?: ImageFile): file is ImageFile & { url: string } =>
  !!file?.url
  && CONTENTFUL_IMAGES.test(file.url)
  && !/^image\/(gif|webp)$/.test(file.contentType || '')
  && !/\.(gif|webp)$/i.test(file.url)


// Url of a copy at most `width` px wide (never upscaled), as webp.
export const resizedUrl = (file: ImageFile | undefined, width: number, quality = 80): string => {
  if (!canResize(file))
    return file?.url || ''

  const original = file.details?.image?.width
  const w = Math.min(width, original || width, 4000)
  return `${file.url}?w=${w}&fm=webp&q=${quality}`
}


// srcset with copies up to the original width, or undefined when the file
// can't be resized.
export const resizedSrcSet = (file: ImageFile | undefined): string | undefined => {
  if (!canResize(file))
    return undefined

  const original = file.details?.image?.width
  const largest = SRCSET_WIDTHS[SRCSET_WIDTHS.length - 1]
  const widths = original
    ? [...SRCSET_WIDTHS.filter(w => w < original), Math.min(original, largest)]
    : SRCSET_WIDTHS

  return Array.from(new Set(widths))
    .map(w => `${resizedUrl(file, w)} ${w}w`)
    .join(', ')
}


// Copy used by the click-to-zoom lightbox (intense.js reads data-image).
export const zoomUrl = (file: ImageFile | undefined): string =>
  resizedUrl(file, 2560, 85)


// How much wider than its box a cropped (object-fit: cover) image is drawn.
// A landscape photo in a 3:4 portrait box is drawn ~2× the box width.
export const coverScale = (file: ImageFile | undefined, boxAspect: number): number => {
  const image = file?.details?.image
  if (!image?.width || !image?.height)
    return 1
  return Math.max(1, (image.width / image.height) / boxAspect)
}
