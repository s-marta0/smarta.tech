import { ContentfulItem, File, RichTextNode } from './contentfulTypes'


export interface Project extends ContentfulItem {
  title?: RichTextNode
  description?: RichTextNode
  media?: File
  videoURL?: string
  showMediaOnMobile: boolean
}

export interface Section extends ContentfulItem {
  name?: string
  projects?: Project[]
}