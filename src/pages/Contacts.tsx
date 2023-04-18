import React from "react"
import ExternalLink from "../components/ExternalLink"

import contactImg from "../styles/img/contact.jpg"

import MailImg from "../styles/img/contacts/mail.svg"
import InstImg from "../styles/img/contacts/inst.svg"
import FbImg from "../styles/img/contacts/fb.svg"
import TgImg from "../styles/img/contacts/tg.svg"
import YtImg from "../styles/img/contacts/yt.svg"


class Contacts extends React.Component<{}, {}> {
  render = () =>
    <div className="Contacts">
      <div className="row">
        <div className="Contacts__links order-2 order-lg-1">
          <div className="Contacts__name">
            Marta Shilova
          </div>
          <div className="contact_text">
            Je m'appelle Marta, je suis visual & interaction designer. J'aime créer des projets a l'intersection du design, de la science et de l'art. Collaborer avec des spécialistes au niveau international
          </div>
          <div className="d-flex flex-row">
            <ExternalLink
              newTab
              to="mailto:martashilova@gmail.com"
              className="Contacts__links__item"
            >
              <img src={MailImg} alt="" />
            </ExternalLink>
            <ExternalLink
              newTab
              to="https://www.instagram.com/slipper0"
              className="Contacts__links__item"
            >
              <img src={InstImg} alt="" />
            </ExternalLink>
            <ExternalLink
              newTab
              to="https://www.facebook.com/sssmarta"
              className="Contacts__links__item"
            >
              <img src={FbImg} alt="" />
            </ExternalLink>
            <ExternalLink
              newTab
              to="https://t.me/ssmarta"
              className="Contacts__links__item"
            >
              <img src={TgImg} alt="" />
            </ExternalLink>
            <ExternalLink
              newTab
              to="https://www.youtube.com/channel/UCKQpivpLQOIo2AHrwzsu2-g/videos?view_as=subscriber"
              className="Contacts__links__item"
            >
              <img src={YtImg} alt="" />
            </ExternalLink>
          </div>

        </div>

        <div className="Contacts__photo order-1 order-lg-2">
          <img src={contactImg} alt="" />
        </div>

        <div className="Contacts__Lev order-3">
          site by: <ExternalLink newTab to="https://t.me/the_sociophobic">
            @the_sociophobic
          </ExternalLink>
        </div>

      </div>
    </div>
}


export default Contacts