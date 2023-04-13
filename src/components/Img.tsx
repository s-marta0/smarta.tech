import React from 'react'

import { File } from './Store/Types/contentfulTypes'


type ImgProps = {
  src?: string
  file?: File | undefined
  alt?: string
  className?: string
  crop?: boolean
  onClick?: (e: any) => void
}

const Img: React.FC<ImgProps> = ({
  src,
  file,
  alt,
  className,
  crop,
  onClick,
}) => {
  const [fullscreen, setFullscreen] = React.useState(false)
  const [portrait, setPortrait] = React.useState<boolean | undefined>(undefined)

  const imgRef: any = React.useRef(null)
  const containerRef: any = React.useRef(null)
  let resizeObs

  React.useEffect(() => {
    resizeObs = new ResizeObserver(setOrientation.bind(this))
      .observe(containerRef.current)
  }, [])

  const setOrientation = () =>
    setPortrait(containerRef?.current?.offsetWidth / containerRef?.current?.offsetHeight >
      imgRef?.current?.width / imgRef?.current?.height
    )

  return (
    <div
      ref={containerRef}
      className={`
        Img
        ${className}
        Img--${crop ? 'crop' : 'nocrop'}
        Img--${fullscreen ? 'fullscreen' : 'default'}
      `}
      onClick={onClick || (() => setFullscreen(!fullscreen))}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt || ''}
        className={`
          Img__img
          Img__img--${crop && (portrait ? 'portrait' : 'landscape')}
        `}
      />
    </div>
  )
}


export default Img
