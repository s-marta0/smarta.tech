import React from "react"

import Layout from "../components/Layout"

import data from '../data/motion-design'


class MotionDesign extends React.Component<{}, {}> {
  render = () =>
    <div className="MotionDesign">
      <Layout projects={data} />
    </div>
}


export default MotionDesign