import React from 'react'
import Video from '../components/Video'


const Main: React.FC = () => {
  return (
    <div className="Main">
      <Video
        src='https://youtu.be/LEX9eKW0G5s'
        autoplay={true}
      />
    </div>
  )
}


export default Main
