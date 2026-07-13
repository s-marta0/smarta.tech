import React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Context } from "../components/Store"
import { Project } from "../components/Store/Types/models"
import Linkify from 'react-linkify'


type State = {
  activeFilter: string | null;
  hoveredProjectId: string | null;
}


class Projects extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      activeFilter: null, // null means show all
      hoveredProjectId: null
    };
  }

  getAllProjects = (): Array<Project & { category: string }> => {
    const context = this.context as any;
    const { contentful } = context;
    if (!contentful?.sectionV2s) return [];

    const allProjects: Array<Project & { category: string }> = [];

    contentful.sectionV2s.forEach((section: any) => {
      const category = section.name;
      if (category && section.projects) {
        section.projects.forEach((project: Project) => {
          allProjects.push({ ...project, category });
        });
      }
    });

    return allProjects;
  }

  getFilteredProjects = (): Array<Project & { category: string }> => {
    const allProjects = this.getAllProjects();
    const { activeFilter } = this.state;

    if (!activeFilter) {
      return allProjects;
    }

    return allProjects.filter(project => project.category === activeFilter);
  }

  getCategories = (): string[] => {
    const projects = this.getAllProjects();
    const categories = new Set(projects.map(p => p.category));
    return Array.from(categories).filter(Boolean);
  }

  // Generate consistent heights for projects based on ID
  getProjectHeight = (projectId: string): number => {
    // Create a pattern of different heights for irregular layout
    // Heights range from 500px to 700px
    const heights = [550, 650, 500, 600, 580, 680, 520, 620, 560, 640, 540, 630];
    // Use project ID to get consistent height regardless of filter
    const hash = projectId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return heights[hash % heights.length];
  }

  renderProject = (project: Project & { category: string }) => {
    const firstMedia = project.media?.[0];
    const hasMedia = !!firstMedia;
    const mediaUrl = firstMedia?.file?.url || '';
    const { hoveredProjectId } = this.state;
    const isHovered = hoveredProjectId === project.id;
    
    // Handle title - it might be a RichTextNode (React component) or string
    const titleContent = typeof project.title === 'string' 
      ? project.title 
      : project.title;

    const handleClick = () => {
      this.props.history.push(`/projects/${project.id}`);
    };

    const itemHeight = this.getProjectHeight(project.id);

    return (
      <div 
        key={project.id} 
        className={`Projects__grid-item ${isHovered ? 'hovered' : ''}`}
        style={{ height: `${itemHeight}px` }}
        onMouseEnter={() => this.setState({ hoveredProjectId: project.id })}
        onMouseLeave={() => this.setState({ hoveredProjectId: null })}
        onClick={handleClick}
      >
        <div className="Projects__cover">
          {hasMedia ? (
            <div className="Projects__image-wrapper">
              <img
                src={mediaUrl}
                alt={typeof project.description === 'string' ? project.description : ''}
                className="Projects__cover-image"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="Projects__placeholder" />
          )}
          {project.title && (
            <div className="Projects__title-overlay">
              <Linkify>
                {titleContent}
              </Linkify>
            </div>
          )}
        </div>
      </div>
    );
  }

  render = () => {
    const { activeFilter } = this.state;
    const projects = this.getFilteredProjects();
    const categories = this.getCategories();

    // Add "All" option
    const allFilters = ['all', ...categories];

    return (
      <div className="Projects">
        <div className="container">
          {/* Filter Buttons */}
          <div className="Projects__filters">
            {allFilters.map(filter => (
              <button
                key={filter}
                className={`Projects__filter-btn ${(filter === 'all' && !activeFilter) || activeFilter === filter ? 'active' : ''}`}
                onClick={() => this.setState({ activeFilter: filter === 'all' ? null : filter })}
              >
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className={`Projects__grid ${this.state.hoveredProjectId ? 'has-hover' : ''}`}>
            {projects.length > 0 ? (
              projects.map(project => this.renderProject(project))
            ) : (
              <div className="Projects__empty">
                No projects found for this filter.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Projects.contextType = Context;

export default withRouter(Projects)
