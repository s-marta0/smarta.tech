import React from 'react'
import DisplacedVideo from '../components/DisplacedVideo'
// import FluidBackground from '../components/FluidBackground'
// import Video from '../components/Video'


const Main: React.FC = () => {
  return (
    <div className="Main">
      <DisplacedVideo src="/showreel.mp4" intensity={0.12} />
      {/* Alternatives :
        <FluidBackground />  (champ généré, sans vidéo)
        <Video src='https://youtu.be/LEX9eKW0G5s' autoplay={true} />  (ancienne vidéo) */}
    </div>
  )
}


export default Main
