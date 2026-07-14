import { Project } from '../components/Store/Types/models'


// Turn a string into a URL-friendly slug:
// "Réseaunance. Creartathon 2022" -> "reseaunance-creartathon-2022"
export const slugify = (text: string): string =>
  text
    .normalize('NFD')                 // split accented letters into base + accent
    .replace(/[\u0300-\u036f]/g, '') // remove the accent marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')      // non-alphanumeric -> hyphen
    .replace(/^-+|-+$/g, '')          // trim leading/trailing hyphens


// The slug used in the URL for a project. Falls back to the Contentful id
// when the title is missing or produces an empty slug.
export const projectSlug = (project: Project): string => {
  const title = typeof project.title === 'string' ? project.title : ''
  return (title && slugify(title)) || project.id
}


// Whether a URL param matches this project, by slug or by legacy id.
export const matchesProject = (project: Project, param: string): boolean =>
  projectSlug(project) === param || project.id === param
