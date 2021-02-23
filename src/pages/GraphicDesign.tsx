import React from "react"

import Layout from "../components/Layout"

import data from '../data/graphic-design'


class GraphicDesign extends React.Component<{}, {}> {
  render = () =>
    <div className="GraphicDesign">
      <Layout projects={data} />
    </div>
}


export default GraphicDesign