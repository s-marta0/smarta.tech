import React from "react"

import { Context } from "../components/Store"
import ContentfulLayout from "../components/ContentfulLayout"


const PublicationsTalks: React.FC = () => {
  const { contentful } = React.useContext(Context)
  // Using GraphicDesign section ID - update if you have a different Contentful section for Publications/Talks
  const section = contentful?.sections?.find(section => section.id === '7n5o8Ed4F6Lwmx4dxRhi1W')

  return (
    <div className="PublicationsTalks">
      {section?.projects && <ContentfulLayout projects={section?.projects} />}
    </div>
  )
}


export default PublicationsTalks
