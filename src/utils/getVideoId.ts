const getVideoId = (src : string) : string =>
  src.includes('youtube') ?
    src.split('watch?v=')[1].split('&')[0]
    :
    src.split('/')[src.split('/').length - 1]

export default getVideoId