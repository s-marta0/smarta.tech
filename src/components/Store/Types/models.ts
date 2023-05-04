import { ContentfulItem, File, RichTextNode } from './contentfulTypes'


export interface Project extends ContentfulItem {
  title?: RichTextNode
  description?: RichTextNode
  media?: File[]
  // media_?: File
  link?: string
  autoplay: boolean
}

export interface Section extends ContentfulItem {
  name?: string
  projects?: Project[]
}