import React from 'react'

import Linkify from 'react-linkify'

import Video from './Video'
import Img from '../components/Img'
import { Project } from './Store/Types/models'
import { resizedUrl } from '../utils/contentfulImage'


type ContentfulLayoutProps = {
  projects: Project[]
}


const ContentfulLayout: React.FC<ContentfulLayoutProps> = ({
  projects
}) =>
  <div className="Layout">
    {projects.map(project =>
      <div
        key={project.id}
        className="d-flex flex-column align-items-center mb-70"
      >
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
        {project.link?.includes('youtu') &&
          <Video
            className="mb-4"
            src={project.link}
            autoplay={project.autoplay || false}
            mobile={resizedUrl(project.media?.[0]?.file, 1000)}
          />
        }
        {project.media?.map((media, index) =>
          <Img
            key={index}
            className="mb-4"
            file={media}
            description={typeof project.description === 'string' ? project.description : ''}
            title={typeof project.title === 'string' ? project.title : ''}
          />
        )}
      </div>
    )}
  </div>


export default ContentfulLayout
