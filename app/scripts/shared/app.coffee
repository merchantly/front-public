$ ->
  # Touch detect
  if 'ontouchstart' of document
    $("html").addClass "feature_touch"
  else
    $("html").addClass "feature_no-touch"

  # Это bootstrap tooltip, не нашел где он используется
  # $('[tooltip]').tooltip()

  if $("[range_slider]").length
    true

  bPage = $('.b-page')

  $('[ks-design]').on 'click', ()->
    className = $(@).data 'classname'
    bPage.addClass className
    return false

  if $("[ks-opacity_slider]").length
    lenta = $('.b-page__content__inner')

    $("[ks-opacity_slider]").on
      slide: ->
        opacity = $("[ks-opacity_slider]").val()
        lenta.css 'background-color', 'rgba(236, 208, 120,'+opacity+')'

  if $("[ks-fontsize_slider]").length
    page = $('html')

    $("[ks-fontsize_slider]").on
      slide: ->
        fontSize = $("[ks-fontsize_slider]").val()
        fontSize = fontSize.substring(0, fontSize.length - 2)
        page.css 'font-size', fontSize+'px'

  thisPage = $('.b-page')

  if $("[ks-row_slider]").length
    $("[ks-row_slider]").on
      slide: ->
        inRow = $("[ks-row_slider]").val()
        inRow = inRow.substring(0, inRow.length - 3)
        thisPage.attr 'data-in-row', inRow

  $('[ks-show-slider]').on 'click', ()->
    thisPage.toggleClass 'b-page_hide-slider'

  $('[ks-show-filter]').on 'click', ()->
    thisPage.toggleClass 'b-page_hide-catalog'

  $('[ks-layout-change]').on 'click', ()->
    thisPage.addClass 'b-page_layout-l1'
