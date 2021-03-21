import React from 'react'

import YouTube from 'react-youtube'


type Props = {
  autoplay: boolean;
  src: string;
  className: string;
}

type State = {
  needsLoad: boolean
}


class Video extends React.Component<Props, State> {

  render = () =>
    <YouTube
      videoId={this.props.src}
      opts={{
        // height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          playlist: `${this.props.src}`,
          loop: 1,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
          
        },
      }}
      // onReady={this._onReady}
    />
}


export default Video