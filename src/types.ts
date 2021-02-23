type Block = {
  link: string;
  autoplay?: boolean;
  mobile?: string;
}
type Project = {
  title: string;
  description: string;
  blocks: Block[];
}


export type {
  Block,
  Project
}