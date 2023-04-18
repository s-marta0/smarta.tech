import React from 'react'

import MediaArt from './pages/MediaArt'
import ClassicArt from './pages/ClassicArt'
import MotionDesign from './pages/MotionDesign'
import GraphicDesign from './pages/GraphicDesign'
import Photography from './pages/Photography'
import Contacts from './pages/Contacts'
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
    label: "Motion Design",
    link: "/motion",
    comp: <MotionDesign />
  },
  {
    label: "New Media",
    link: "/media",
    comp: <MediaArt />
  },
  {
    label: "Graphic Design",
    link: "/graphics",
    comp: <GraphicDesign />
  },
  // {
  //   label: "Classic Art",
  //   link: "/classic",
  //   comp: <ClassicArt />
  // },
  // {
  //   label: "Photography",
  //   link: "/photo",
  //   comp: <Photography />
  // },
  {
    label: "Contacts",
    link: "/contacts",
    comp: <Contacts />
  },
]


export default routes