import React from 'react'

import Video from './Video'
import Img from './Img'
import getVideoId from '../utils/getVideoId'


type Props = {
  autoplay?: boolean;
  src: string;
  className?: string;
}


class Media extends React.Component<Props, {}> {
  render = () =>
    this.props.src.includes('youtu') ?
      <Video
        {...this.props}
        src={getVideoId(this.props.src)}
      />
      :
      <Img src={this.props.src} />
}


export default Media