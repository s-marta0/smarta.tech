import React, { useEffect, useState } from 'react'

import { StateType, initialState, NonStateType } from './Types'
import Context from './Context'
import { loadContentfulData } from '../../utils/contentful'


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
  const initializeCallBacks: Function[] = []
  const registerInitializeCallback = (fn: Function) => {
    initializeCallBacks.push(fn)
    state.ready && fn()
  }

  useEffect(() => {
    const callInitializeCallbacks = () =>
    setTimeout(() => initializeCallBacks.forEach((callback) => callback()), 50)

    const initialization = async () => {
      setState({ loading: true })
      console.log('Loading contentful...')
      const contentfulData = await loadContentfulData()

      setState({
        contentfulData,
        ready: true,
        loading: false
      })
      callInitializeCallbacks()
      // setState({
      //   ready: true,
      //   loading: false
      // })
    }

    if (!state.ready && !state.loading)
      initialization()
  }, [state, setState, initializeCallBacks])

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
      {state.ready ? children : 'loading...'}
    </Context.Provider>
  )
}


export default Provider
