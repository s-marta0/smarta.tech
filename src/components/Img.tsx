import React from 'react'

import { File } from './Store/Types/contentfulTypes'
import { resizedSrcSet, resizedUrl, zoomUrl } from '../utils/contentfulImage'


// Default: the image spans the container (1110px at xl, full width below).
const SIZES = '(min-width: 1200px) 1110px, 100vw'


type ImgProps = {
  src?: string
  file?: File | undefined
  alt?: string
  description?: string
  title?: string
  className?: string
  crop?: boolean
  sizes?: string
  onClick?: (e: any) => void
}

const Img: React.FC<ImgProps> = ({
  src,
  file,
  alt,
  description,
  title,
  className,
  crop,
  sizes = SIZES,
  onClick,
}) => {
  // const [fullscreen, setFullscreen] = React.useState(false)
  // const [portrait, setPortrait] = React.useState<boolean | undefined>(undefined)

  // const imgRef: any = React.useRef(null)
  const containerRef: any = React.useRef(null)
  // let resizeObs

  // A Contentful asset gets resized copies; a plain `src` is used as is.
  const asset = file?.file
  const srcSet = resizedSrcSet(asset)

  // React.useEffect(() => {
  //   resizeObs = new ResizeObserver(setOrientation.bind(this))
  //     .observe(containerRef.current)
  // }, [])

  // const setOrientation = () =>
  //   setPortrait(containerRef?.current?.offsetWidth / containerRef?.current?.offsetHeight >
  //     imgRef?.current?.width / imgRef?.current?.height
  //   )

  return (
    <div
      ref={containerRef}
      className={`
        Img
        ${className}
        Img--${crop ? 'crop' : 'nocrop'}
        `}
        // Img--${fullscreen ? 'fullscreen' : 'default'}
      // onClick={onClick || (() => setFullscreen(!fullscreen))}
    >
      {/* <img
        ref={imgRef}
        src={src}
        alt={alt || ''}
        className={`
          Img__img
          Img__img--${crop && (portrait ? 'portrait' : 'landscape')}
        `}
      /> */}
      <img
        src={asset ? resizedUrl(asset, 1400) : src}
        srcSet={srcSet}
        sizes={srcSet && sizes}
        data-image={asset && zoomUrl(asset)}
        alt={description || ""}
        data-title={title || ""}
        data-caption={description || ""}
        className={`Img__img ${!onClick ? 'intense lazyload' : ''}`}
        loading="lazy"
        onClick={e => onClick?.(e)}
      />
    </div>
  )
}


export default Img
