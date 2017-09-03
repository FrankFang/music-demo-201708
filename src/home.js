let $olSongs = $('ol#songs')

var query = new AV.Query('Song');
query.find().then(function (results) {
  $('#songs-loading').remove()
  for (var i=0; i<results.length; i++){
    let song = results[i].attributes
    let li = `
            <li>
              <h3>${song.name}</h3>
              <p>
                <svg class="icon icon-sq">
                  <use xlink:href="#icon-sq"></use>
                </svg>
                ${song.singer}
              </p>
              <a class="playButton" href="#">
                <svg class="icon icon-play">
                  <use xlink:href="#icon-play"></use>
                </svg>
              </a>
            </li>
    `

    $olSongs.append(li)
  }
}, function (error) {
  console.log(error)
  alert('获取歌曲失败')
})

let timer = null

$('input#search').on('input', function(e){
  if(timer){ window.clearTimeout(timer) }  
  timer = setTimeout(function(){
    timer = null

    let $input = $(e.currentTarget)
    let value = $input.val().trim()
    if(value===''){return}
    var query1 = new AV.Query('Song');
    query1.contains('name', value);
    var query2 = new AV.Query('Song')
    query2.contains('singer', value);
    var query = AV.Query.or(query1, query2)
    query.find().then(function(results){
      $('#searchResult').empty()
      if(results.length === 0){
        $('#searchResult').html('没有结果')
      }else{
        for(var i=0; i<results.length; i++){
          let song = results[i].attributes
          let li = `
          <li data-id="${results[i].id}">
            <a href="./song.html?id=${results[i].id}">
              ${song.name} - ${song.singer}
            </a>
          </li>
        `
          $('#searchResult').append(li)
        }
      }
    })
  },400)
})

  
