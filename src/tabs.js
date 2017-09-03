define(['jquery'],function($){
  function tabs(selectorOrDom){
    let $tabs = $(selectorOrDom)

    $tabs.on('click', '.tabs-nav>li', function(e){
      let $li = $(e.currentTarget)
      let index = $li.index()
      $li.addClass('active').siblings().removeClass('active')
      $li.closest('.tabs').find('.tab-content').children().eq(index)
        .addClass('active').siblings().removeClass('active')
    })
  }
  return tabs
})
