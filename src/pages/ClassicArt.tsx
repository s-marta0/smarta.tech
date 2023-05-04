import React from "react"

import Layout from "../components/Layout"

import data from '../data/classic-art'
import { Context } from "../components/Store"


const ClassicArt: React.FC = () => {
  const { contentful } = React.useContext(Context)

  return (
    <div className="ClassicArt">
      <Layout projects={data} />
    </div>
  )
}


export default ClassicArt