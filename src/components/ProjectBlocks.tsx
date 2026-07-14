import React from 'react'

import Linkify from 'react-linkify'

import Img from './Img'
import Video from './Video'
import { Block } from './Store/Types/models'


type ProjectBlocksProps = {
  blocks: Block[]
}


const ProjectBlocks: React.FC<ProjectBlocksProps> = ({ blocks }) =>
  <div className="Blocks">
    {blocks.map(block => {
      const images = block.images ?? []

      switch (block.variant) {
        case 'credits':
          return (
            <div key={block.id} className="Blocks__credits">
              {block.heading &&
                <div className="Blocks__credits__title">{block.heading}</div>
              }
              {block.text &&
                <Linkify>
                  {block.text}
                </Linkify>
              }
            </div>
          )

        case 'video':
          return block.link ? (
            <div key={block.id} className="Blocks__full">
              <Video
                className=""
                src={block.link}
                autoplay={block.autoplay || false}
                mobile={images[0]?.file.url}
              />
            </div>
          ) : null
        case 'row-2':
        case 'row-3':
          return (
            <div
              key={block.id}
              className={`Blocks__row Blocks__row--${block.variant === 'row-3' ? 3 : 2}${block.crop ? ' Blocks__row--crop' : ''}`}
            >
              {images.map((image, index) =>
                <Img key={index} src={image.file.url} />
              )}
            </div>
          )

        case 'image-text':
          return (
            <div
              key={block.id}
              className={`Blocks__image-text Blocks__image-text--text-${block.textPosition === 'left' ? 'left' : 'right'}`}
            >
              <div className="Blocks__image-text__image">
                {images[0] && <Img src={images[0].file.url} />}
              </div>
              <div className="Blocks__image-text__text">
                {block.heading &&
                  <h2 className="Blocks__heading">
                    {block.heading}
                  </h2>
                }
                {block.text &&
                  <Linkify>
                    {block.text}
                  </Linkify>
                }
              </div>
            </div>
          )

        case 'full':
        default:
          return (
            <div key={block.id} className="Blocks__full">
              {images.map((image, index) =>
                <Img key={index} src={image.file.url} />
              )}
            </div>
          )
      }
    })}
  </div>


export default ProjectBlocks
