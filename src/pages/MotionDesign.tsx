import React from "react"

// import data from '../data/motion-design'
// import Layout from "../components/Layout"
import { Context } from "../components/Store"
import ContentfulLayout from "../components/ContentfulLayout"


const MotionDesign: React.FC = () => {
  const { contentful } = React.useContext(Context)
  const section = contentful?.sections?.find(section => section.id === '3OpjNNcZIjmWP13U08o7ol')
  console.log(contentful)
  return (
    <div className="MotionDesign">
      {section?.projects && <ContentfulLayout projects={section?.projects} />}
    </div>
  )
}


export default MotionDesign