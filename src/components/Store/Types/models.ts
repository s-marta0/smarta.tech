import { ContentfulItem, File, RichTextNode } from './contentfulTypes'


export type BlockVariant = 'full' | 'row-2' | 'row-3' | 'image-text' | 'video' | 'credits'

export interface Block extends ContentfulItem {
  name?: string
  variant?: BlockVariant
  images?: File[]
  heading?: string
  text?: RichTextNode
  textPosition?: 'left' | 'right'
  imageSize?: 'equal' | 'large' | 'wide'
  crop?: boolean
  link?: string
  autoplay?: boolean
}

export interface Project extends ContentfulItem {
  title?: RichTextNode
  description?: RichTextNode
  media?: File[]
  // media_?: File
  blocks?: Block[]
  link?: string
  autoplay: boolean
}

export interface Section extends ContentfulItem {
  name?: string
  projects?: Project[]
}