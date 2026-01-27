import React from 'react'

import Projects from './pages/Projects'
import PublicationsTalks from './pages/PublicationsTalks'
import About from './pages/About'
import Main from './pages/Main'


type Route = {
  label: string,
  link: string;
  comp: any;
}


const routes: Route[] = [
  {
    label: "",
    link: "/",
    comp: <Main />
  },
  {
    label: "Projects",
    link: "/projects",
    comp: <Projects />
  },
  {
    label: "Publications/Talks",
    link: "/publications-talks",
    comp: <PublicationsTalks />
  },
  {
    label: "About/Contact",
    link: "/about-contact",
    comp: <About />
  },
]


export default routes