import React from 'react'

import { Context } from './Store'


const Test: React.FC = () => {
  // const [text, setText] = React.useState({a: 'start'})
  const context = React.useContext(Context)

  React.useEffect(() => {
    // setText({
    //   ...text,
    //   a: 'finish'
    // })
  }, [])

  return (
    <div>
      {/* {text.a} */}
      {context.contentfulData.length}
    </div>
  )
}


export default Test
