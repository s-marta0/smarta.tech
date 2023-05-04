const getVideoId = (src: string | undefined): string =>
  typeof src === 'undefined' ?
    ''
    :
    src.includes('youtube') ?
      src.includes('watch?v=') ?
        src.split('watch?v=')[1].split('&')[0]
        :
        src.split('shorts/')[1].split('?')[0]
      :
      src.split('/')[src.split('/').length - 1]


export default getVideoId