import { Project, Section } from './models'


export type ContentfulLocale = {
  projects?: Project[]
  sections?: Section[]
}

export type StateType = {
  ready: boolean

  locale: string //'en-US' | 'fr'
  contentfulData: any// | ContentfulLocale[]
  contentful: ContentfulLocale

  youtubeIframeWorks: boolean
}
const initialState = {
  ready: false,

  locale: 'en-US',
  contentfulData: [],
  contentful: {},

  youtubeIframeWorks: true
}

export type NonStateType = {
  setState: (obj: Partial<StateType>) => void
  registerInitializeCallback: (fn: () => void) => void
}
const initialNonState: NonStateType = {
  setState: () => {},
  registerInitializeCallback: (fn: () => void) => {},
}


export {
  initialState,
  initialNonState
}
