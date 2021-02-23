import React from "react"
import ExternalLink from "../components/ExternalLink"


class Contacts extends React.Component<{}, {}> {
  render = () =>
    <div className="Contacts">
      <ExternalLink newTab to="https://t.me/ssmarta">
        Telegram
      </ExternalLink>, 
      <ExternalLink newTab to="https://t.me/ssmarta">
        VK
      </ExternalLink>, 
      <ExternalLink newTab to="https://www.instagram.com/slipper0">
        Instagram
      </ExternalLink><br /><br />
      site by: <ExternalLink newTab to="https://t.me/the_sociophobic">
        @the_sociophobic
      </ExternalLink>

    </div>
}


export default Contacts