import React from 'react'

import Video from './Video'
import Img from './Img'
import getVideoId from '../utils/getVideoId'
import isMobile from '../utils/isMobile'


type Props = {
  autoplay?: boolean;
  src: string;
  className?: string;
  mobile?: string;
}


class Media extends React.Component<Props, {}> {
  render = () =>
    !this.props.src.includes('youtu') || (isMobile() && this.props.mobile) ?
      <Img src={isMobile() && this.props.mobile ? this.props.mobile : this.props.src} />
      :
      <Video
        {...this.props}
        src={getVideoId(this.props.src)}
      />
}


export default Media