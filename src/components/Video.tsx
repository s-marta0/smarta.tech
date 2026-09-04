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
  const [isMuted, setIsMuted] = React.useState(true)
  const [showHint, setShowHint] = React.useState(true)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const src_parsed = getVideoId(src)
  const videoId = src_parsed.replace('https://youtu.be/', '')
  const thumbnail = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg'

  // Vimeo support: detect a vimeo url and pull out the id (+ optional
  // privacy hash, e.g. vimeo.com/123456789/abcdef).
  const isVimeo = /vimeo\.com/.test(src || '')
  const vimeoParts = (src || '').split('?')[0].split('/').filter(Boolean)
  const vimeoIdx = vimeoParts.findIndex(p => /^\d+$/.test(p))
  const vimeoId = vimeoIdx >= 0 ? vimeoParts[vimeoIdx] : ''
  const vimeoHash =
    vimeoIdx >= 0 && vimeoParts[vimeoIdx + 1] && !/^\d+$/.test(vimeoParts[vimeoIdx + 1])
      ? vimeoParts[vimeoIdx + 1]
      : ''
  const vimeoHashParam = vimeoHash ? `h=${vimeoHash}&` : ''
  const vimeoAutoplaySrc = `https://player.vimeo.com/video/${vimeoId}?${vimeoHashParam}autoplay=1&muted=1&loop=1&background=1&dnt=1`
  const vimeoClickSrc = `https://player.vimeo.com/video/${vimeoId}?${vimeoHashParam}autoplay=1&dnt=1`

  // Hide hint after 5 seconds
  React.useEffect(() => {
    if (autoplay && showHint) {
      const timer = setTimeout(() => {
        setShowHint(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [autoplay, showHint])
  
  React.useEffect(() => {
    if (iframeRef.current && autoplay) {
      const iframe = iframeRef.current.contentWindow
      if (iframe) {
        // Set quality to highest available
        iframe.postMessage(JSON.stringify({
          event: 'command',
          func: 'setPlaybackQuality',
          args: ['highres']
        }), '*')
        
        // Mute/unmute
        iframe.postMessage(JSON.stringify({
          event: 'command',
          func: isMuted ? 'mute' : 'unMute',
          args: []
        }), '*')
      }
    }
  }, [isMuted, autoplay])
  
  // Set quality after iframe loads - try multiple times as YouTube may need time to initialize
  React.useEffect(() => {
    if (iframeRef.current && autoplay) {
      const setQuality = () => {
        const iframe = iframeRef.current?.contentWindow
        if (iframe) {
          // Try to set highest quality
          iframe.postMessage(JSON.stringify({
            event: 'command',
            func: 'setPlaybackQuality',
            args: ['highres']
          }), '*')

          // Make sure captions/subtitles stay off
          iframe.postMessage(JSON.stringify({
            event: 'command',
            func: 'unloadModule',
            args: ['captions']
          }), '*')
          iframe.postMessage(JSON.stringify({
            event: 'command',
            func: 'unloadModule',
            args: ['cc']
          }), '*')
        }
      }
      
      // Try immediately
      setQuality()
      
      // Try after 1 second
      const timer1 = setTimeout(setQuality, 1000)
      // Try after 2 seconds
      const timer2 = setTimeout(setQuality, 2000)
      // Try after 3 seconds
      const timer3 = setTimeout(setQuality, 3000)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [autoplay])

  const handleVideoClick = () => {
    setIsMuted(!isMuted)
    setShowHint(false) // Hide hint when user interacts
  }

  const SoundIcon = () => (
    <div 
      className="video__sound-icon"
      onClick={(e) => {
        e.stopPropagation();
        handleVideoClick();
      }}
    >
      {isMuted ? (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="white"/>
        </svg>
      ) : (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.03C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="white"/>
        </svg>
      )}
    </div>
  );

  const playing_video = () =>
    <div style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}>
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;playlist=${videoId}&amp;mute=1&amp;vq=highres&cc_load_policy=0`}
        className={`video__iframe ${mobile && "desktop-only"} lazyload`}
        title={src_parsed}
        frameBorder="0"
        allow="autoplay"
        id="widget2"
        loading="lazy"
      />
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 10,
          cursor: 'pointer',
          pointerEvents: 'auto'
        }} 
        onClick={handleVideoClick}
      />
      {autoplay && <SoundIcon />}
      {autoplay && showHint && (
        <div className="video__hint">
          Click to toggle sound
        </div>
      )}
    </div>
  const plaing_video_with_sound = () =>
    <div style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}>
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&amp;enablejsapi=1&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;vq=highres&amp;mute=${isMuted ? '1' : '0'}`}
        className={`video__iframe ${mobile && "desktop-only"} lazyload`}
        title={src_parsed}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 10,
          cursor: 'pointer',
          pointerEvents: 'auto'
        }} 
        onClick={handleVideoClick}
      />
      <SoundIcon />
      {showHint && (
        <div className="video__hint">
          Click to toggle sound
        </div>
      )}
    </div>
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

  if (isVimeo) {
    const showPoster = mobile && !autoplay && !thumbnail_is_clicked
    return (
      <div className={`video ${className}`}>
        {isMobile && mobile && !thumbnail_is_clicked ?
          <img
            src={mobile}
            className="video__mobile mobile-only intense lazyload"
            alt=""
            loading="lazy"
            onClick={() => set_thumbnail_is_clicked(true)}
          />
          :
          showPoster ?
            <div className='video__thumbnail'>
              <Img
                crop
                className='video__thumbnail__img'
                src={mobile}
                onClick={() => set_thumbnail_is_clicked(true)}
              />
              <img
                alt=''
                className='video__thumbnail__play-buttonn'
                src={logo}
                onClick={() => set_thumbnail_is_clicked(true)}
              />
            </div>
            :
            <iframe
              src={autoplay ? vimeoAutoplaySrc : vimeoClickSrc}
              className='video__iframe lazyload'
              title={`vimeo-${vimeoId}`}
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
              loading='lazy'
            />
        }
      </div>
    )
  }

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
          playing_video()
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