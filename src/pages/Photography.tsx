import React from "react"

import Layout from "../components/Layout"

import data from '../data/photography'


class Photography extends React.Component<{}, {}> {
  render = () =>
    <div className="Photography">
      <Layout projects={data} />
    </div>
}


export default Photography