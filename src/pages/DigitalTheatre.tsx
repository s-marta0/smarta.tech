import React from "react"

import { Context } from "../components/Store"
import ContentfulLayout from "../components/ContentfulLayout"


const DigitalTheatre: React.FC = () => {
  const { contentful } = React.useContext(Context)
  // You'll need to update this section ID to match your Contentful section for Digital Theatre
  const section = contentful?.sections?.find(section => section.id === '3OpjNNcZIjmWP13U08o7ol')

  return (
    <div className="DigitalTheatre">
      {section?.projects && <ContentfulLayout projects={section?.projects} />}
    </div>
  )
}


export default DigitalTheatre
