type Block = {
  link?: string | undefined
  autoplay?: boolean | undefined
  mobile?: string | undefined
  description?: string | undefined
}
type Project = {
  title: string | undefined
  description: string | undefined
  blocks: Block[]
}


export type {
  Block,
  Project
}