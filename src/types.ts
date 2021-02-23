type Block = {
  link: string;
  autoplay?: boolean;
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