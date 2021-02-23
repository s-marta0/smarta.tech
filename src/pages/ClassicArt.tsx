import React from "react"

import Layout from "../components/Layout"

import data from '../data'


class ClassicArt extends React.Component<{}, {}> {
  render = () =>
    <div className="ClassicArt">
      <Layout projects={data} />
    </div>
}


export default ClassicArt