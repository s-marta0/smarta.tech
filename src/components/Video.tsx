import React from 'react'


type Props = {
  autoplay: boolean;
  src: string;
  className: string;
}

type State = {
  needsLoad: boolean
}


class Video extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      needsLoad: true
    }
  }

  render = () =>
    <div className={`video ${this.props.className}`}>
      {this.props.autoplay ?
        <iframe
          src={!this.state.needsLoad ? "" : `https://www.youtube.com/embed/${this.props.src}?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;playlist=${this.props.src}&amp;mute=1`}
          className="video__iframe"
          title={this.props.src}
          frameBorder="0"
          allow="autoplay"
          id="widget2"
        />
        :
        <iframe
          src={`https://www.youtube.com/embed/${this.props.src}`}
          className="video__iframe"
          title={this.props.src}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      }
    </div>
}


export default Video