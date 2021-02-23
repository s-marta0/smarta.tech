import React from 'react'


type Props = {
  src: string;
  className?: string;
}


class Img extends React.Component<Props, {}> {
  render = () =>
    <img
      alt=""
      className={`custom-img ${this.props.className}`}
      src={this.props.src}
    />
}


export default Img