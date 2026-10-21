import React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Context } from "../components/Store"
import { Project } from "../components/Store/Types/models"
import { projectSlug } from "../utils/slugify"
import { coverScale, resizedSrcSet, resizedUrl } from "../utils/contentfulImage"
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

  // Extract a 4-digit year from the project title for chronological sorting
  getYear = (project: Project): number => {
    const title = typeof project.title === 'string' ? project.title : '';
    const match = title.match(/\b(19|20)\d{2}\b/);
    return match ? parseInt(match[0], 10) : 0;
  }

  getFilteredProjects = (): Array<Project & { category: string }> => {
    const allProjects = this.getAllProjects();
    const { activeFilter } = this.state;

    const base = activeFilter
      ? allProjects.filter(project => project.category === activeFilter)
      : allProjects;

    // newest first; projects without a year in the title go last
    return [...base].sort((a, b) => this.getYear(b) - this.getYear(a));
  }

  getCategories = (): string[] => {
    const projects = this.getAllProjects();
    const categories = new Set(projects.map(p => p.category));
    // Filter buttons in this order; categories not listed here go last,
    // in Contentful order.
    const order = ['Performance', 'Installation', 'Design'];
    const rank = (category: string) => {
      const i = order.indexOf(category);
      return i === -1 ? order.length : i;
    };
    return Array.from(categories)
      .filter(Boolean)
      .sort((a, b) => rank(a) - rank(b));
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
    // Cover image: the first media asset, or — when media is empty — the
    // first image found across the project's blocks.
    const firstBlockImage = project.blocks
      ?.map((block: any) => block.images?.[0]?.file)
      .find((file: any) => file?.url);
    const coverFile = project.media?.[0]?.file?.url ? project.media[0].file : firstBlockImage;
    const mediaUrl = coverFile?.url || '';
    const hasMedia = !!mediaUrl;
    // The box is 3:4 and the photo is cropped to fill it, so a landscape
    // photo is drawn wider than the box: scale the requested size to match.
    // Boxes are half the container (max 540px), full width on phones.
    const scale = coverScale(coverFile, 3 / 4);
    const coverSrcSet = resizedSrcSet(coverFile);
    const coverSizes = `(max-width: 767px) ${Math.round(100 * scale)}vw, `
      + `(min-width: 1200px) ${Math.round(540 * scale)}px, ${Math.round(50 * scale)}vw`;
    const { hoveredProjectId } = this.state;
    const isHovered = hoveredProjectId === project.id;
    
    // Handle title - it might be a RichTextNode (React component) or string
    const titleContent = typeof project.title === 'string' 
      ? project.title 
      : project.title;

    const handleClick = () => {
      this.props.history.push(`/projects/${projectSlug(project)}`);
    };

    return (
      <div
        key={`${project.id}-${project.category}`}
        className={`Projects__grid-item ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => this.setState({ hoveredProjectId: project.id })}
        onMouseLeave={() => this.setState({ hoveredProjectId: null })}
        onClick={handleClick}
      >
        <div className="Projects__cover">
          {hasMedia ? (
            <div className="Projects__image-wrapper">
              <img
                src={resizedUrl(coverFile, 1000)}
                srcSet={coverSrcSet}
                sizes={coverSrcSet && coverSizes}
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
    );
  }
}

Projects.contextType = Context;

export default withRouter(Projects)
