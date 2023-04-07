import React from 'react'

import Linkify from 'react-linkify'

import Video from '../components/Video_'
import Img from '../components/Img'
import { Project } from '../types'
import getVideoId from '../utils/getVideoId'


type LayoutProps = {
  projects: Project[]
}


const Layout: React.FC<LayoutProps> = ({
  projects
}) =>
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
              <Img
                src={block.link || ''}
                alt={block.description || ''}
              />
          )}
        </div>
        <h1 className="Layout__project__h1">
        <Linkify>
          {project.title}
        </Linkify>
        </h1>
        <div className="Layout__project__description">
        <Linkify>
          {project.description}
        </Linkify>
        </div>
      </div>
    )}
  </div>


export default Layout
