(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{32:function(t,e,o){},33:function(t,e,o){"use strict";o.r(e);var a=o(0),i=o.n(a),n=o(17),c=o.n(n),l=o(2),s=o(4),p=o(3),u=o(9),r=o(5),b=o(15),y=o(1),h=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(t){var a;return Object(l.a)(this,o),(a=e.call(this,t)).render=function(){return Object(y.jsx)("div",{className:"video ".concat(a.props.className),children:a.props.autoplay?Object(y.jsx)("iframe",{src:a.state.needsLoad?"https://www.youtube.com/embed/".concat(a.props.src,"?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;playlist=").concat(a.props.src,"&amp;mute=1"):"",className:"video__iframe",title:a.props.src,frameBorder:"0",allow:"autoplay",id:"widget2"}):Object(y.jsx)("iframe",{src:"https://www.youtube.com/embed/".concat(a.props.src),className:"video__iframe",title:a.props.src,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})})},a.state={needsLoad:!0},a}return o}(i.a.Component),w=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return Object(y.jsx)("img",{alt:"",className:"custom-img ".concat(t.props.className),src:t.props.src})},t}return o}(i.a.Component),m=function(t){return t.includes("youtube")?t.split("watch?v=")[1].split("&")[0]:t.split("/")[t.split("/").length-1]},d=function(){return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)},k=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return!t.props.src.includes("youtu")||d()&&t.props.mobile?Object(y.jsx)(w,{src:d()&&t.props.mobile?t.props.mobile:t.props.src}):Object(y.jsx)(h,Object(b.a)(Object(b.a)({},t.props),{},{src:m(t.props.src)}))},t}return o}(i.a.Component),j=function(t){var e=t.projects;return Object(y.jsx)("div",{className:"Layout",children:e.map((function(t){return Object(y.jsxs)("div",{className:"Layout__project",children:[Object(y.jsx)("div",{className:"Layout__project__video",children:t.blocks.map((function(t){return Object(y.jsx)("div",{className:"Layout__project__video__item",children:Object(y.jsx)(k,{src:t.link,autoplay:t.autoplay,mobile:t.mobile})})}))}),Object(y.jsx)("h1",{className:"Layout__project__h1",children:t.title}),Object(y.jsx)("div",{className:"Layout__project__description",children:t.description})]})}))})},v=[{title:"CoronaRhytmus",description:"printemps 2020",blocks:[{link:"https://youtu.be/F69Y9cdugAI",autoplay:!0,mobile:"https://media.giphy.com/media/5z3TWlFerNgrPgx1mH/giphy.gif"}]},{title:"#BullRun2021 NFT Cryptoart collection",description:"hiver 2021",blocks:[{link:"https://youtu.be/02tdnN6M6cI",autoplay:!0},{link:"https://youtu.be/L93qbj61zPg",autoplay:!0},{link:"https://youtu.be/5W2C_pPNZaQ",autoplay:!0}]},{title:"Self isolation \u26d3\ud83d\udda4 Introspection\ud83d\udd73",description:"printemps 2020",blocks:[{link:"https://www.youtube.com/watch?v=R-gpe9G6ZUI",autoplay:!0},{link:"https://www.youtube.com/watch?v=py5K3ZjmASU",autoplay:!0},{link:"https://www.youtube.com/watch?v=pkN7i85rV4g",autoplay:!0}]},{title:"#Rassvet",description:"logo creation & animation Digital Assets & Art Fund #Rassvet. hiver 2021",blocks:[{link:" https://youtu.be/dmlUQXkQ5J4",autoplay:!1}]},{title:"11.d",description:"logo animation pour marque des v\xeatements",blocks:[{link:"https://youtu.be/9Aa--gTAKeM",autoplay:!0},{link:"https://youtu.be/frf83HiRU_s",autoplay:!0},{link:"https://youtu.be/LARp-BHzr7c",autoplay:!0}]},{title:"TrainFeel visualising",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=ljzm4yCfvs4",autoplay:!0}]},{title:"Mandelbrot fractal floating",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=L4HTShP16iI",autoplay:!0}]},{title:"HumanDesign",description:"automne 2019",blocks:[{link:"https://www.youtube.com/watch?v=YO2wMTL4SAc",autoplay:!0},{link:"https://www.youtube.com/watch?v=faow_zaMD4Y",autoplay:!0},{link:"https://www.youtube.com/watch?v=UisWdaaRkuM&t=3s",autoplay:!0}]},{title:"Liquid chess cr\xe9ation & animation",description:"printemps 2019",blocks:[{link:"https://www.youtube.com/watch?v=qyiGFyeaY_k",autoplay:!0},{link:"https://youtu.be/TMSguQKt4Ac",autoplay:!0}]},{title:"Mantra font development, poster animation",description:"printemps 2020",blocks:[{link:"https://youtu.be/zdoDvcr7BtA",autoplay:!0},{link:"https://youtu.be/_dLRvB74Hxw",autoplay:!0},{link:"https://youtu.be/dcBBUG1VNxI",autoplay:!0}]},{title:"",description:"",blocks:[{link:"https://www.youtube.com/watch?v=kNV0_WZcso0",autoplay:!0}]}],f=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return Object(y.jsx)("div",{className:"MediaArt",children:Object(y.jsx)(j,{projects:v})})},t}return o}(i.a.Component),g=[{title:"CoronaRhytmus",description:"printemps 2020",blocks:[{link:"https://sun9-11.userapi.com/impf/J5MbH-2MZOxSZ9uexwicmmiyEWGu2EDDhrqFrg/VHam0gcOYqo.jpg?size=1528x2160&quality=96&proxy=1&sign=b6434b35835b3ae9f7726d070ba7672b&type=album",autoplay:!0}]},{title:"#BullRun2021 NFT Cryptoart collection",description:"hiver 2021",blocks:[{link:"https://youtu.be/02tdnN6M6cI",autoplay:!0},{link:"https://youtu.be/L93qbj61zPg",autoplay:!0},{link:"https://youtu.be/5W2C_pPNZaQ",autoplay:!0}]},{title:"Self isolation \u26d3\ud83d\udda4 Introspection\ud83d\udd73",description:"printemps 2020",blocks:[{link:"https://www.youtube.com/watch?v=R-gpe9G6ZUI",autoplay:!0},{link:"https://www.youtube.com/watch?v=py5K3ZjmASU",autoplay:!0},{link:"https://www.youtube.com/watch?v=pkN7i85rV4g",autoplay:!0}]},{title:"#Rassvet",description:"logo creation & animation Digital Assets & Art Fund #Rassvet. hiver 2021",blocks:[{link:" https://youtu.be/dmlUQXkQ5J4",autoplay:!1}]},{title:"11.d",description:"logo animation pour marque des v\xeatements",blocks:[{link:"https://youtu.be/9Aa--gTAKeM",autoplay:!0},{link:"https://youtu.be/frf83HiRU_s",autoplay:!0},{link:"https://youtu.be/LARp-BHzr7c",autoplay:!0}]},{title:"TrainFeel visualising",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=ljzm4yCfvs4",autoplay:!0}]},{title:"Mandelbrot fractal floating",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=L4HTShP16iI",autoplay:!0}]},{title:"HumanDesign",description:"automne 2019",blocks:[{link:"https://www.youtube.com/watch?v=YO2wMTL4SAc",autoplay:!0},{link:"https://www.youtube.com/watch?v=faow_zaMD4Y",autoplay:!0},{link:"https://www.youtube.com/watch?v=UisWdaaRkuM&t=3s",autoplay:!0}]},{title:"Liquid chess cr\xe9ation & animation",description:"printemps 2019",blocks:[{link:"https://www.youtube.com/watch?v=qyiGFyeaY_k",autoplay:!0},{link:"https://youtu.be/TMSguQKt4Ac",autoplay:!0}]},{title:"Mantra font development, poster animation",description:"printemps 2020",blocks:[{link:"https://youtu.be/zdoDvcr7BtA",autoplay:!0},{link:"https://youtu.be/_dLRvB74Hxw",autoplay:!0},{link:"https://youtu.be/dcBBUG1VNxI",autoplay:!0}]},{title:"",description:"",blocks:[{link:"https://www.youtube.com/watch?v=kNV0_WZcso0",autoplay:!0}]}],O=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return Object(y.jsx)("div",{className:"ClassicArt",children:Object(y.jsx)(j,{projects:g})})},t}return o}(i.a.Component),x=[{title:"CoronaRhytmus",description:"printemps 2020",blocks:[{link:"https://youtu.be/F69Y9cdugAI",autoplay:!0}]},{title:"#BullRun2021 NFT Cryptoart collection",description:"hiver 2021",blocks:[{link:"https://youtu.be/02tdnN6M6cI",autoplay:!0},{link:"https://youtu.be/L93qbj61zPg",autoplay:!0},{link:"https://youtu.be/5W2C_pPNZaQ",autoplay:!0}]},{title:"Self isolation \u26d3\ud83d\udda4 Introspection\ud83d\udd73",description:"printemps 2020",blocks:[{link:"https://www.youtube.com/watch?v=R-gpe9G6ZUI",autoplay:!0},{link:"https://www.youtube.com/watch?v=py5K3ZjmASU",autoplay:!0},{link:"https://www.youtube.com/watch?v=pkN7i85rV4g",autoplay:!0}]},{title:"#Rassvet",description:"logo creation & animation Digital Assets & Art Fund #Rassvet. hiver 2021",blocks:[{link:" https://youtu.be/dmlUQXkQ5J4",autoplay:!1}]},{title:"11.d",description:"logo animation pour marque des v\xeatements",blocks:[{link:"https://youtu.be/9Aa--gTAKeM",autoplay:!0},{link:"https://youtu.be/frf83HiRU_s",autoplay:!0},{link:"https://youtu.be/LARp-BHzr7c",autoplay:!0}]},{title:"TrainFeel visualising",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=ljzm4yCfvs4",autoplay:!0}]},{title:"Mandelbrot fractal floating",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=L4HTShP16iI",autoplay:!0}]},{title:"HumanDesign",description:"automne 2019",blocks:[{link:"https://www.youtube.com/watch?v=YO2wMTL4SAc",autoplay:!0},{link:"https://www.youtube.com/watch?v=faow_zaMD4Y",autoplay:!0},{link:"https://www.youtube.com/watch?v=UisWdaaRkuM&t=3s",autoplay:!0}]},{title:"Liquid chess cr\xe9ation & animation",description:"printemps 2019",blocks:[{link:"https://www.youtube.com/watch?v=qyiGFyeaY_k",autoplay:!0},{link:"https://youtu.be/TMSguQKt4Ac",autoplay:!0}]},{title:"Mantra font development, poster animation",description:"printemps 2020",blocks:[{link:"https://youtu.be/zdoDvcr7BtA",autoplay:!0},{link:"https://youtu.be/_dLRvB74Hxw",autoplay:!0},{link:"https://youtu.be/dcBBUG1VNxI",autoplay:!0}]},{title:"",description:"",blocks:[{link:"https://www.youtube.com/watch?v=kNV0_WZcso0",autoplay:!0}]}],_=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return Object(y.jsx)("div",{className:"MotionDesign",children:Object(y.jsx)(j,{projects:x})})},t}return o}(i.a.Component),A=[{title:"CoronaRhytmus",description:"printemps 2020",blocks:[{link:"https://youtu.be/F69Y9cdugAI",autoplay:!0}]},{title:"#BullRun2021 NFT Cryptoart collection",description:"hiver 2021",blocks:[{link:"https://youtu.be/02tdnN6M6cI",autoplay:!0},{link:"https://youtu.be/L93qbj61zPg",autoplay:!0},{link:"https://youtu.be/5W2C_pPNZaQ",autoplay:!0}]},{title:"Self isolation \u26d3\ud83d\udda4 Introspection\ud83d\udd73",description:"printemps 2020",blocks:[{link:"https://www.youtube.com/watch?v=R-gpe9G6ZUI",autoplay:!0},{link:"https://www.youtube.com/watch?v=py5K3ZjmASU",autoplay:!0},{link:"https://www.youtube.com/watch?v=pkN7i85rV4g",autoplay:!0}]},{title:"#Rassvet",description:"logo creation & animation Digital Assets & Art Fund #Rassvet. hiver 2021",blocks:[{link:" https://youtu.be/dmlUQXkQ5J4",autoplay:!1}]},{title:"11.d",description:"logo animation pour marque des v\xeatements",blocks:[{link:"https://youtu.be/9Aa--gTAKeM",autoplay:!0},{link:"https://youtu.be/frf83HiRU_s",autoplay:!0},{link:"https://youtu.be/LARp-BHzr7c",autoplay:!0}]},{title:"TrainFeel visualising",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=ljzm4yCfvs4",autoplay:!0}]},{title:"Mandelbrot fractal floating",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=L4HTShP16iI",autoplay:!0}]},{title:"HumanDesign",description:"automne 2019",blocks:[{link:"https://www.youtube.com/watch?v=YO2wMTL4SAc",autoplay:!0},{link:"https://www.youtube.com/watch?v=faow_zaMD4Y",autoplay:!0},{link:"https://www.youtube.com/watch?v=UisWdaaRkuM&t=3s",autoplay:!0}]},{title:"Liquid chess cr\xe9ation & animation",description:"printemps 2019",blocks:[{link:"https://www.youtube.com/watch?v=qyiGFyeaY_k",autoplay:!0},{link:"https://youtu.be/TMSguQKt4Ac",autoplay:!0}]},{title:"Mantra font development, poster animation",description:"printemps 2020",blocks:[{link:"https://youtu.be/zdoDvcr7BtA",autoplay:!0},{link:"https://youtu.be/_dLRvB74Hxw",autoplay:!0},{link:"https://youtu.be/dcBBUG1VNxI",autoplay:!0}]},{title:"",description:"",blocks:[{link:"https://www.youtube.com/watch?v=kNV0_WZcso0",autoplay:!0}]}],N=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return Object(y.jsx)("div",{className:"GraphicDesign",children:Object(y.jsx)(j,{projects:A})})},t}return o}(i.a.Component),M=[{title:"CoronaRhytmus",description:"printemps 2020",blocks:[{link:"https://youtu.be/F69Y9cdugAI",autoplay:!0}]},{title:"#BullRun2021 NFT Cryptoart collection",description:"hiver 2021",blocks:[{link:"https://youtu.be/02tdnN6M6cI",autoplay:!0},{link:"https://youtu.be/L93qbj61zPg",autoplay:!0},{link:"https://youtu.be/5W2C_pPNZaQ",autoplay:!0}]},{title:"Self isolation \u26d3\ud83d\udda4 Introspection\ud83d\udd73",description:"printemps 2020",blocks:[{link:"https://www.youtube.com/watch?v=R-gpe9G6ZUI",autoplay:!0},{link:"https://www.youtube.com/watch?v=py5K3ZjmASU",autoplay:!0},{link:"https://www.youtube.com/watch?v=pkN7i85rV4g",autoplay:!0}]},{title:"#Rassvet",description:"logo creation & animation Digital Assets & Art Fund #Rassvet. hiver 2021",blocks:[{link:" https://youtu.be/dmlUQXkQ5J4",autoplay:!1}]},{title:"11.d",description:"logo animation pour marque des v\xeatements",blocks:[{link:"https://youtu.be/9Aa--gTAKeM",autoplay:!0},{link:"https://youtu.be/frf83HiRU_s",autoplay:!0},{link:"https://youtu.be/LARp-BHzr7c",autoplay:!0}]},{title:"TrainFeel visualising",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=ljzm4yCfvs4",autoplay:!0}]},{title:"Mandelbrot fractal floating",description:"\xe9t\xe9 2020",blocks:[{link:"https://www.youtube.com/watch?v=L4HTShP16iI",autoplay:!0}]},{title:"HumanDesign",description:"automne 2019",blocks:[{link:"https://www.youtube.com/watch?v=YO2wMTL4SAc",autoplay:!0},{link:"https://www.youtube.com/watch?v=faow_zaMD4Y",autoplay:!0},{link:"https://www.youtube.com/watch?v=UisWdaaRkuM&t=3s",autoplay:!0}]},{title:"Liquid chess cr\xe9ation & animation",description:"printemps 2019",blocks:[{link:"https://www.youtube.com/watch?v=qyiGFyeaY_k",autoplay:!0},{link:"https://youtu.be/TMSguQKt4Ac",autoplay:!0}]},{title:"Mantra font development, poster animation",description:"printemps 2020",blocks:[{link:"https://youtu.be/zdoDvcr7BtA",autoplay:!0},{link:"https://youtu.be/_dLRvB74Hxw",autoplay:!0},{link:"https://youtu.be/dcBBUG1VNxI",autoplay:!0}]},{title:"",description:"",blocks:[{link:"https://www.youtube.com/watch?v=kNV0_WZcso0",autoplay:!0}]}],R=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return Object(y.jsx)("div",{className:"Photography",children:Object(y.jsx)(j,{projects:M})})},t}return o}(i.a.Component),L=function(t){var e=t.className,o=t.to,a=t.newTab,i=t.children;return Object(y.jsx)("a",{className:e,href:o,target:a?"_blank":"",rel:"noopener noreferrer",children:i})},C=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return Object(y.jsxs)("div",{className:"Contacts",children:[Object(y.jsx)(L,{newTab:!0,to:"https://t.me/ssmarta",children:"Telegram"}),",",Object(y.jsx)(L,{newTab:!0,to:"https://t.me/ssmarta",children:"VK"}),",",Object(y.jsx)(L,{newTab:!0,to:"https://www.instagram.com/slipper0",children:"Instagram"}),Object(y.jsx)("br",{}),Object(y.jsx)("br",{}),"site by: ",Object(y.jsx)(L,{newTab:!0,to:"https://t.me/the_sociophobic",children:"@the_sociophobic"})]})},t}return o}(i.a.Component),T=[{label:"New Media Art",link:"/",comp:Object(y.jsx)(f,{})},{label:"Classic Art",link:"/classic",comp:Object(y.jsx)(O,{})},{label:"Motion Design",link:"/motion",comp:Object(y.jsx)(_,{})},{label:"Graphic Design",link:"/graphic",comp:Object(y.jsx)(N,{})},{label:"Photography",link:"/photo",comp:Object(y.jsx)(R,{})},{label:"Contacts",link:"/contacts",comp:Object(y.jsx)(C,{})}],B=o.p+"static/media/logo.be79d48b.svg",H=function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(t){var a;return Object(l.a)(this,o),(a=e.call(this,t)).render=function(){return Object(y.jsxs)("header",{className:"Header",children:[Object(y.jsx)("img",{className:"Header__logo",src:B}),Object(y.jsx)("div",{className:"Header__burger",onClick:function(){return a.setState({opened:!a.state.opened})}}),Object(y.jsx)("div",{className:"Header__links ".concat(a.state.opened&&"Header__links--opened"),children:T.map((function(t){return Object(y.jsx)(u.b,{exact:"/"===t.link,to:t.link,className:"Link",activeClassName:"Link--active",onClick:function(){return a.setState({opened:!1})},children:t.label})}))})]})},a.state={opened:!1},a}return o}(i.a.Component),I=(o(32),function(t){Object(s.a)(o,t);var e=Object(p.a)(o);function o(){var t;Object(l.a)(this,o);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(t=e.call.apply(e,[this].concat(i))).render=function(){return Object(y.jsx)("div",{className:"App",children:Object(y.jsxs)(u.a,{children:[Object(y.jsx)(H,{}),Object(y.jsx)("div",{className:"content",children:Object(y.jsx)("div",{className:"container",children:Object(y.jsx)(r.c,{children:T.map((function(t){return Object(y.jsx)(r.a,{path:t.link,exact:"/"===t.link,children:t.comp})}))})})})]})})},t}return o}(i.a.Component));c.a.render(Object(y.jsx)(i.a.StrictMode,{children:Object(y.jsx)(I,{})}),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.0bd11948.chunk.js.map