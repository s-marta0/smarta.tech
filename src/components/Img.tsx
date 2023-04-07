import React from 'react'


type ImgProps = {
  src: string
  alt?: string
  className?: string
}


const Img: React.FC<ImgProps> = ({
  src,
  alt,
  className
}) => {
  const [fullscreen, setFullscreen] = React.useState(false)
  const _Img = () =>
    <img
      src={src}
      alt={alt || ''}
      onClick={() => setFullscreen(!fullscreen)}
      className={`
    Img
    ${className}
    ${fullscreen && 'Img--fullscreen'}
  `}
    />

  return fullscreen ?
    <div
      className='Img__fullscreen-container'
      onClick={() => setFullscreen(false)}
    >
      <_Img />
    </div>
    :
    <_Img />
}


export default Img
