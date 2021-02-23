import React, { FunctionComponent } from 'react'

import { Project } from '../types'


type Props = {
  projects: Project[]
}


const Header: FunctionComponent<Props> = ({ projects }) =>
  <div className="Layout">
    {projects.map(project =>
      <div className="Layout__project">
        {project.title}
      </div>
    )}
  </div>


export default Header