import { Project, Section } from './models'


export type ContentfulLocale = {
  projects?: Project[]
  sections?: Section[]
}

export type StateType = {
  ready: boolean
  loading: boolean

  locale: string //'en-US' | 'fr'
  contentfulData: any// | ContentfulLocale[]
  contentful: ContentfulLocale
}
const initialState = {
  ready: false,
  loading: false,

  locale: 'en-US',
  contentfulData: [],
  contentful: {},
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
