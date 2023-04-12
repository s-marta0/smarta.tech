import React, { useEffect, useState } from 'react'

import { StateType, initialState, NonStateType } from './Types'
import Context from './Context'
import { createContentfulClient, parseContentfulItems } from '../../utils/contentful'


type PropsType = {
  children: any
}


const Provider: React.FC<PropsType> = ({ children }) => {
  const [state, _setState] = useState<StateType>(initialState)

  const setState = (someParams: Partial<StateType>) => {
    _setState({
      ...state,
      ...someParams
    })
  }
  const loadContentful = async () => {
    const client = createContentfulClient()

    setState({
      contentfulData: [
        await parseContentfulItems((await client.getEntries({ limit: 200, })).items),
        await parseContentfulItems((await client.getEntries({ limit: 200, locale: 'fr' })).items)
      ]
    })
  }
  const initializeCallBacks: Function[] = []
  const initialization = async () => {
    await loadContentful()
    callInitializeCallbacks()
    setState({ ready: true })
  }

  useEffect(() => {
    if (!state.ready)
      initialization()
  }, [state.ready])
  useEffect(() => {
    if (!state.ready)
      initialization()
  }, [])
  useEffect(() => {
    console.log(state.contentfulData)
  }, [state.ready])

  const registerInitializeCallback = (fn: Function) => {
    initializeCallBacks.push(fn)
    state.ready && fn()
  }

  const callInitializeCallbacks = () =>
    setTimeout(() => initializeCallBacks.forEach((callback) => callback()), 50)

  const stateAndSetters = () => {
    const nonState: NonStateType = {
      setState,
      registerInitializeCallback,
    }
    const stateWithLocale = {
      ...state,
      contentful: state.contentfulData?.[state.locale === "en-US" ? 0 : 1],
    }

    return {
      ...(state.ready ? stateWithLocale : initialState),
      ...nonState
    }
  }

  return (
    <Context.Provider value={stateAndSetters()}>
      {children}
    </Context.Provider>
  )
}


export default Provider
