import React from 'react'

import { isMobile } from 'react-device-detect'

import Img from './Img'
import logo from '../styles/img/play_button.webp'
import { Context } from './Store'


type VideoProps = {
  autoplay: boolean
  src: string
  className?: string
  mobile?: string
}


const Video: React.FC<VideoProps> = ({
  autoplay,
  src,
  className,
  mobile,
}) => {
  const [thumbnail_is_clicked, set_thumbnail_is_clicked] = React.useState(false)
  const thumbnail = 'https://img.youtube.com/vi/' + src.replace('https://youtu.be/', '') + '/sddefault.jpg'
  const playing_video = () =>
    <iframe
      src={`https://www.youtube.com/embed/${src}?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;playlist=${src}&amp;mute=1`}
      className={`video__iframe ${mobile && "desktop-only"} lazyload`}
      title={src}
      frameBorder="0"
      allow="autoplay"
      id="widget2"
      loading="lazy"
    />
  const plaing_video_with_sound = () =>
    <iframe
      src={`https://www.youtube.com/embed/${src}?autoplay=1`}
      className={`video__iframe ${mobile && "desktop-only"} lazyload`}
      title={src}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />

  const { youtubeIframeWorks } = React.useContext(Context)

  return (
    <div
      className={`video ${className}`}
    >
      {/* {!youtubeIframeWorks && mobile != undefined ? */}
      {isMobile ?
        mobile ?
          <img
            src={mobile}
            className={`video__mobile ${mobile && "mobile-only"} intense lazyload`}
            alt=""
            loading="lazy"
          />
          :
          playing_video()
        :
        autoplay ?
          <iframe
            src={`https://www.youtube.com/embed/${src.replace('https://youtu.be/', '')}?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;playlist=${src.replace('https://youtu.be/', '')}&amp;mute=1`}
            className={`video__iframe ${mobile && "desktop-only"} lazyload`}
            title={src}
            frameBorder="0"
            allow="autoplay"
            id="widget2"
            loading="lazy"
          />
          :
          thumbnail_is_clicked ?
            plaing_video_with_sound()
            :
            <div className='video__thumbnail'>
              <Img
                crop
                className='video__thumbnail__img'
                src={thumbnail}
                onClick={() => set_thumbnail_is_clicked(true)}
              />
              <img
                className='video__thumbnail__play-button'
                src={logo}
                onClick={() => set_thumbnail_is_clicked(true)}
              />
            </div>
      }
    </div>
  )
}


export default Video