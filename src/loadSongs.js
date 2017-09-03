function loadSongs(){

  getSongs().then(fillSongs, function (error) {
    alert('获取歌曲失败')
  })


  function getSongs(){
    var query = new AV.Query('Song'); 
    return query.find()
  }

  function fillSongs(results){
    $('#songs-loading').remove()
    for (var i=0; i<results.length; i++){
      let song = results[i].attributes
      let li = template(song)
      $('ol#songs').append(li)
    }
  }
}

loadSongs()

function template(song){
  return`<li>
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
    </li>`
}
