import React from "react"

// import data from '../data/graphic-design'
// import Layout from "../components/Layout"
import { Context } from "../components/Store"
import ContentfulLayout from "../components/ContentfulLayout"


const GraphicDesign: React.FC = () => {
  const { contentful } = React.useContext(Context)
  const section = contentful?.sections?.find(section => section.id === '7n5o8Ed4F6Lwmx4dxRhi1W')

  return (
    <div className="GraphicDesign">
      {section?.projects && <ContentfulLayout projects={section?.projects} />}
    </div>
  )
}


export default GraphicDesign