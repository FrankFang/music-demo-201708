require(['./tabs', './load-songs', './search', './av-init'], function(tabs, loadSongs, search,AVInit){
  AVInit()
  tabs('.tabs')
  loadSongs()
  search()
})
