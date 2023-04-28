import React from 'react'

import Linkify from 'react-linkify'

import Video from './Video'
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
      <div className="d-flex flex-column align-items-center mb-70">
        {project.title &&
          <h1 className="h1 text-center">
            <Linkify>
              {project.title}
            </Linkify>
          </h1>
        }
        {project.description &&
          <Linkify>
            {project.description}
          </Linkify>
        }
        {(project.title || project.description) &&
          <div className='mb-4' />}
        {project.blocks.map(block =>
          block.link?.includes('youtu') ?
            <Video
              className=""
              src={getVideoId(block.link)}
              autoplay={block.autoplay || false}
              mobile={block.mobile}
            />
            :
            <Img
              src={block.link || ''}
              description={block.description}
              title={project.title}
            />
        )}
      </div>
    )}
  </div>


export default Layout
