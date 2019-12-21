const SemanticUIColors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown'
]

function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}

function initTags() {
  $('.dream-tags')
    .children()
    .map(function() {
      const title = $(this).attr('title')
      let tagColor = localStorage.getItem(title)

      if (tagColor) {
        $(this).css('background', `#${tagColor}`)
      } else {
        tagColor = SemanticUIColors[randomInt(0, SemanticUIColors.length)]
        $(this).addClass(tagColor)
      }
    })
}

function initAccordion() {
  $('.dream-categories .ui.accordion').accordion({
    selector: {
      trigger: '.title .icon'
    },
    onChange() {
      $('.flip-container').height(Math.max(...getFilpHeights()))
      $('.dream-grid').masonry('layout')
    }
  })
}
