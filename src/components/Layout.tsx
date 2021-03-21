import React, { FunctionComponent } from 'react'

import Video from '../components/Video_'
import { Project } from '../types'
import getVideoId from '../utils/getVideoId'



type Props = {
  projects: Project[]
}

const Header: FunctionComponent<Props> = ({ projects }) =>
  <div className="Layout">
    {projects.map(project =>
      <div className="Layout__project">
        <div className="Layout__project__video">
          {project.blocks.map(block =>
            block.link?.includes('youtu') ?
              <Video
                className="Layout__project__video__item"
                src={getVideoId(block.link)}
                autoplay={block.autoplay || false}
                mobile={block.mobile}
              />
              :
              <img 
                src={block.link}
                alt={block.description || ""}
                data-title={project.title || ""}
                data-caption={block.description || ""}
                className="Layout__project__video__img intense lazyload"
                loading="lazy"
              />
          )}
        </div>
        <h1 className="Layout__project__h1">
          {project.title}
        </h1>
        <div className="Layout__project__description">
          {project.description}
        </div>
      </div>
    )}
  </div>


export default Header