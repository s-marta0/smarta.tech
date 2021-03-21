import React from 'react'


type Props = {
  autoplay: boolean
  src: string
  className?: string
  mobile?: string
}

class Video extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

  }

  render = () =>
<div
        className={`video ${this.props.className}`}
      >
        {this.props.autoplay ?
          <iframe
            src={`https://www.youtube.com/embed/${this.props.src}?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;playlist=${this.props.src}&amp;mute=1`}
            className={`video__iframe ${this.props.mobile && "desktop-only"} lazyload`}
            title={this.props.src}
            frameBorder="0"
            allow="autoplay"
            id="widget2"
            loading="lazy"
          /> 
          :
          <iframe
            src={`https://www.youtube.com/embed/${this.props.src}`}
            className={`video__iframe ${this.props.mobile && "desktop-only"} lazyload`}
            title={this.props.src}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        }
        <img
          src={this.props.mobile}
          className={`video__mobile ${this.props.mobile && "mobile-only"} intense lazyload`}
          alt=""
          loading="lazy"
        />
      </div>
}


export default Video