import React from "react"

import Layout from "../components/Layout"

import data from '../data/photography'
import { Context } from "../components/Store"


const Photography: React.FC = () => {
  const { contentful } = React.useContext(Context)

  return (
    <div className="Photography">
      <Layout projects={data} />
    </div>
  )
}


export default Photography