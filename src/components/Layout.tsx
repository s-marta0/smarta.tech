import React, { FunctionComponent } from 'react'

import Video from '../components/Video'
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
            <Video
              className="Layout__project__video__item"
              src={getVideoId(block.link)}
              autoplay={block.autoplay}
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