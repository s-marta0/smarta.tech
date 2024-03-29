import React from 'react'

import { isMobile } from 'react-device-detect'

import Img from './Img'
import logo from '../styles/img/play_button.webp'
import { Context } from './Store'
import getVideoId from '../utils/getVideoId'


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
  const src_parsed = getVideoId(src)
  const thumbnail = 'https://img.youtube.com/vi/' + src_parsed.replace('https://youtu.be/', '') + '/sddefault.jpg'
  const playing_video = () =>
    <iframe
      src={`https://www.youtube.com/embed/${src_parsed}?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;playlist=${src_parsed}&amp;mute=1`}
      className={`video__iframe ${mobile && "desktop-only"} lazyload`}
      title={src_parsed}
      frameBorder="0"
      allow="autoplay"
      id="widget2"
      loading="lazy"
    />
  const plaing_video_with_sound = () =>
    <iframe
      src={`https://www.youtube.com/embed/${src_parsed}?autoplay=1`}
      className={`video__iframe ${mobile && "desktop-only"} lazyload`}
      title={src_parsed}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  const render_thumbnail = () =>
    <div className='video__thumbnail'>
      <Img
        crop
        className='video__thumbnail__img'
        src={thumbnail}
        onClick={() => set_thumbnail_is_clicked(true)}
      />
      <img
        alt=''
        className='video__thumbnail__play-buttonn'
        src={logo}
        onClick={() => set_thumbnail_is_clicked(true)}
      />
    </div>

  return (
    <div
      className={`video ${className}`}
    >
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
            src={`https://www.youtube.com/embed/${src_parsed.replace('https://youtu.be/', '')}?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;playlist=${src_parsed.replace('https://youtu.be/', '')}&amp;mute=1`}
            className={`video__iframe ${mobile && "desktop-only"} lazyload`}
            title={src_parsed}
            frameBorder="0"
            allow="autoplay"
            id="widget2"
            loading="lazy"
          />
          :
          thumbnail_is_clicked ?
            plaing_video_with_sound()
            :
            render_thumbnail()
      }
    </div>
  )
}



export default Video