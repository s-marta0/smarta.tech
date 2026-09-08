import React from "react"

import Linkify from 'react-linkify'
import { Context } from "../components/Store"


type Activity = {
  id: string
  title?: string
  year?: number
  description?: string
  link?: string
  category?: string
}

const CATEGORIES: { key: string; label: string }[] = [
  { key: 'publication', label: 'Publications' },
  { key: 'conference', label: 'Conférences & Talks' },
  { key: 'academique', label: 'Activités académiques' },
]

const cleanLink = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?(dx\.)?(doi\.org\/)?/, '')


const PublicationsTalks: React.FC = () => {
  const contentful = (React.useContext(Context) as any)?.contentful
  const activities: Activity[] = contentful?.activitys ?? []

  return (
    <div className="Research">
      <h1 className="Research__title">Recherche</h1>

      {activities.length === 0 && (
        <div className="Research__empty">Aucune activité pour le moment.</div>
      )}

      {CATEGORIES.map(cat => {
        const items = activities
          .filter(a => a.category === cat.key)
          .sort((a, b) => (b.year || 0) - (a.year || 0))
        if (!items.length) return null

        return (
          <section className="Research__section" key={cat.key}>
            <h2 className="Research__section-title">{cat.label}</h2>
            {items.map(a => (
              <div className="Research__item" key={a.id}>
                <div className="Research__year">{a.year || ''}</div>
                <div className="Research__body">
                  <div className="Research__item-title">{a.title}</div>
                  {a.description && (
                    <div className="Research__desc">
                      <Linkify>{a.description}</Linkify>
                    </div>
                  )}
                  {a.link && (
                    <a
                      className="Research__link"
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cleanLink(a.link)}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>
        )
      })}
    </div>
  )
}


export default PublicationsTalks
