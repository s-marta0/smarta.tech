import React from "react"

import Layout from "../components/Layout"

import data from '../data/media-art'


class MediaArt extends React.Component<{}, {}> {
  render = () =>
    <div className="MediaArt">
      <Layout projects={data} />
    </div>
}


export default MediaArt