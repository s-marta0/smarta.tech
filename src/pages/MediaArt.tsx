import React from "react"

// import data from '../data/media-art'
// import Layout from "../components/Layout"
import { Context } from "../components/Store"
import ContentfulLayout from "../components/ContentfulLayout"


const MediaArt: React.FC = () => {
  const { contentful } = React.useContext(Context)
  const section = contentful?.sections?.find(section => section.id === '2mjsMNa1gvwjMb8gXX8vNe')

  return (
    <div className="MediaArt">
      {section?.projects && <ContentfulLayout projects={section?.projects} />}
    </div>
  )
}


export default MediaArt