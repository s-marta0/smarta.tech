import React, { FunctionComponent } from 'react'

import Media from '../components/Media'
import { Project } from '../types'


type Props = {
  projects: Project[]
}


const Header: FunctionComponent<Props> = ({ projects }) =>
  <div className="Layout">
    {projects.map(project =>
      <div className="Layout__project">
        <div className="Layout__project__video">
          {project.blocks.map(block =>
            <div className="Layout__project__video__item">
              <Media
                src={block.link}
                autoplay={block.autoplay}
                mobile={block.mobile}
              />
            </div>
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