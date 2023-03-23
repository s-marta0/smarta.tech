import React from "react"
import ExternalLink from "../components/ExternalLink"

import contactImg from "../styles/img/contact.jpg"


class Contacts extends React.Component<{}, {}> {
  render = () =>
    <div className="Contacts">
      <div className="row">
        <div className="Contacts__links">
        <div className="Contacts__name">
          Marta Shilova
        </div>
        <div className="contact_text">Je m'appelle Marta, je suis visual & interaction designer. J'aime créer des projets a l'intersection du design, de la science et de l'art. Collaborer avec des spécialistes au niveau international</div>
          <ExternalLink newTab to="https://t.me/ssmarta" className="Contacts__links__item">
            Telegram
          </ExternalLink>
          <ExternalLink newTab to="https://www.youtube.com/channel/UCKQpivpLQOIo2AHrwzsu2-g/videos?view_as=subscriber" className="Contacts__links__item">
            Youtube
          </ExternalLink>
          <ExternalLink newTab to="https://www.facebook.com/sssmarta" className="Contacts__links__item">
            Facebook
          </ExternalLink>
          <ExternalLink newTab to="https://www.instagram.com/slipper0" className="Contacts__links__item">
            Instagram
          </ExternalLink>

        </div>

        <div className="Contacts__photo">
          <img src={contactImg} alt="" />
        </div>

        <div className="Contacts__Lev">
          site by: <ExternalLink newTab to="https://t.me/the_sociophobic">
            @the_sociophobic
          </ExternalLink>
        </div>

      </div>
    </div>
}


export default Contacts