import React from "react";
import ExternalLink from "../components/ExternalLink";

import contactImg from "../styles/img/contact.jpg";

import MailImg from "../styles/img/contacts/mail.svg";
import InstImg from "../styles/img/contacts/inst.svg";
import FbImg from "../styles/img/contacts/fb.svg";
import TgImg from "../styles/img/contacts/tg.svg";
import YtImg from "../styles/img/contacts/yt.svg";

type State = {
  photoHovered: boolean;
};

class About extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      photoHovered: false,
    };
  }

  handlePhotoMouseEnter = () => {
    this.setState({ photoHovered: true });
  };

  handlePhotoMouseLeave = () => {
    this.setState({ photoHovered: false });
  };

  render = () => (
    <div className={`About${this.state.photoHovered ? " photo-hovered" : ""}`}>
      <div className="About__main">
        <div className="About__content">
          <div className="About__name">Marta Shilova</div>
          <div className="About__text">
            <p className="About__paragraph">
              Marta Shilova est artiste de nouveaux médias et chercheuse à
              l'INREV ( équipe de recherche Image Numérique et Réalité Virtuelle
              de l'Université Paris 8).
            </p>
            <p className="About__paragraph">
              À l'intersection de l'art, de la technologie et de la recherche,
              elle conçoit des paysages visuels pour ses installations et
              performances, intégrant son, capteurs et interaction.
            </p>
            <p className="About__paragraph">
              Sa pratique explore l'intermédialité et les relations sensibles
              entre corps, matière et technologies, dans une approche
              interdisciplinaire et collaborative.
            </p>
          </div>
          <div className="About__contact">
            <div className="About__social-links">
              <ExternalLink
                newTab
                to="mailto:martashilova@gmail.com"
                className="About__social-item"
              >
                <img src={MailImg} alt="Email" />
              </ExternalLink>
              <ExternalLink
                newTab
                to="https://www.instagram.com/slipper0"
                className="About__social-item"
              >
                <img src={InstImg} alt="Instagram" />
              </ExternalLink>
              <ExternalLink
                newTab
                to="https://www.facebook.com/sssmarta"
                className="About__social-item"
              >
                <img src={FbImg} alt="Facebook" />
              </ExternalLink>
              <ExternalLink
                newTab
                to="https://t.me/ssmarta"
                className="About__social-item"
              >
                <img src={TgImg} alt="Telegram" />
              </ExternalLink>
              <ExternalLink
                newTab
                to="https://www.youtube.com/channel/UCKQpivpLQOIo2AHrwzsu2-g/videos?view_as=subscriber"
                className="About__social-item"
              >
                <img src={YtImg} alt="YouTube" />
              </ExternalLink>
            </div>
          </div>
        </div>

        <div className="About__photo">
          <div
            className="About__photo-wrapper"
            onMouseEnter={this.handlePhotoMouseEnter}
            onMouseLeave={this.handlePhotoMouseLeave}
          >
            <img src={contactImg} alt="Marta Shilova" />
          </div>
        </div>
      </div>

      <div className="About__footer">
        <div className="About__credits">
          site by:{" "}
          <ExternalLink newTab to="https://t.me/the_sociophobic">
            @the_sociophobic
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}

export default About;
