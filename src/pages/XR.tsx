import React from "react"

import { Context } from "../components/Store"
import ContentfulLayout from "../components/ContentfulLayout"


const XR: React.FC = () => {
  const { contentful } = React.useContext(Context)
  // You'll need to update this section ID to match your Contentful section
  const section = contentful?.sections?.find(section => section.id === '7n5o8Ed4F6Lwmx4dxRhi1W')

  return (
    <div className="XR">
      {section?.projects && <ContentfulLayout projects={section?.projects} />}
    </div>
  )
}


export default XR
