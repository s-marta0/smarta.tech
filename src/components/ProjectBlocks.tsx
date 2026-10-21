import React from 'react'

import Linkify from 'react-linkify'

import Img from './Img'
import Video from './Video'
import { Block } from './Store/Types/models'
import { resizedUrl } from '../utils/contentfulImage'


type ProjectBlocksProps = {
  blocks: Block[]
}

// Displayed image widths per layout (container is 1110px at xl), so the
// browser downloads a copy that fits. Rows stack below 768px, image-text
// below 992px.
const ROW_SIZES = {
  2: '(max-width: 767px) 100vw, (min-width: 1200px) 555px, 50vw',
  3: '(max-width: 767px) 100vw, (min-width: 1200px) 370px, 34vw',
}
const IMAGE_TEXT_SIZES = '(max-width: 991px) 100vw, (min-width: 1200px) 830px, 75vw'


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
              {block.heading &&
                <h2 className="Blocks__heading">{block.heading}</h2>
              }
              <Video
                className=""
                src={block.link}
                autoplay={block.autoplay || false}
                mobile={resizedUrl(images[0]?.file, 1000)}
              />
            </div>
          ) : null
        case 'row-2':
        case 'row-3':
          return (
            <div key={block.id}>
              {block.heading &&
                <h2 className="Blocks__heading">{block.heading}</h2>
              }
              <div
                className={`Blocks__row Blocks__row--${block.variant === 'row-3' ? 3 : 2}${block.crop ? ' Blocks__row--crop' : ''}`}
              >
                {images.map((image, index) =>
                  <Img
                    key={index}
                    file={image}
                    sizes={ROW_SIZES[block.variant === 'row-3' ? 3 : 2]}
                  />
                )}
              </div>
            </div>
          )

        case 'image-text':
          return (
            <div
              key={block.id}
              className={`Blocks__image-text Blocks__image-text--text-${block.textPosition === 'left' ? 'left' : 'right'} Blocks__image-text--img-${block.imageSize || 'equal'}`}
            >
              <div className="Blocks__image-text__image">
                {images[0] && <Img file={images[0]} sizes={IMAGE_TEXT_SIZES} />}
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
              {block.heading &&
                <h2 className="Blocks__heading">{block.heading}</h2>
              }
              {images.map((image, index) =>
                <Img key={index} file={image} />
              )}
            </div>
          )
      }
    })}
  </div>


export default ProjectBlocks
