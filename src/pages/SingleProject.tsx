import React from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { Context } from "../components/Store"
import { Project } from "../components/Store/Types/models"
import ContentfulLayout from "../components/ContentfulLayout"
import ProjectBlocks from "../components/ProjectBlocks"
import { matchesProject } from "../utils/slugify"
import Linkify from 'react-linkify'


const SingleProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const history = useHistory()
  const { contentful } = React.useContext(Context)
  
  // Find the project across all sections (sectionV2 first, then legacy sections)
  let project: Project | null = null

  const sectionsToSearch = [
    ...(contentful?.sectionV2s ?? []),
    ...(contentful?.sections ?? []),
  ]

  for (const section of sectionsToSearch) {
    const foundProject = section.projects?.find((p: Project) => matchesProject(p, projectId))
    if (foundProject) {
      project = foundProject
      break
    }
  }

  if (!project) {
    return (
      <div className="SingleProject">
        <div className="container">
          <div className="SingleProject__not-found">
            <h1>Project not found</h1>
            <Link to="/projects" className="SingleProject__back-btn">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="SingleProject">
      <div className="container">
        {/* Back Button */}
        <div className="SingleProject__back">
          <button
            className="SingleProject__back-btn"
            onClick={() => history.push('/projects')}
          >
            ← Back to Projects
          </button>
        </div>

        {/* Project Content */}
        <div className="SingleProject__content">
          {project.blocks && project.blocks.length > 0 ? (
            <ProjectBlocks blocks={project.blocks} />
          ) : (
            <>
              {project.title && (
                <h1 className="SingleProject__title">
                  <Linkify>
                    {typeof project.title === 'string' ? project.title : project.title}
                  </Linkify>
                </h1>
              )}
              {project.description && (
                <div className="SingleProject__description">
                  <Linkify>
                    {typeof project.description === 'string' ? project.description : project.description}
                  </Linkify>
                </div>
              )}
              {project.media && project.media.length > 0 && (
                <ContentfulLayout projects={[project]} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}


export default SingleProject
