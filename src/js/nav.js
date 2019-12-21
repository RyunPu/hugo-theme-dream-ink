function initFilp() {
  const $container = $('.flip-container')
  const heightArr = []

  $container.height(Math.max(...getFilpHeights()))

  $('.dream-flip-toggle').click(() => {
    const [frontHeight, backHeight] = getFilpHeights()
    $container.toggleClass('flip-it')

    if ($container.hasClass('flip-it')) {
      $container.height(backHeight)
    } else {
      $container.height(frontHeight)
    }
  })

  $container.on('transitionend', () => {
    if ($('.dream-column').length === 0) return
    $('.dream-grid').masonry('layout')
  })
}

function getFilpHeights() {
  let frontHeight = 0
  let backHeight = 0

  $('.flipper-block').each((index, ele) => {
    if (index === 0) frontHeight = $(ele).height()
    if (index === 1) backHeight = $(ele).height()
  })

  return [frontHeight, backHeight]
}
