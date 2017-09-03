define(['jquery','av'],function($, AV){

  let timer = null

  function xxx(){
    $('input#search').on('input', function(e){
      throttle(function(){
        let inputValue = $(e.currentTarget).val().trim()
        search(inputValue)
      },400)
    })
  }
  return xxx

  function throttle(callback, time){
    if(timer){ window.clearTimeout(timer) }  
    timer = setTimeout(function(){
      timer = null
      callback()
    },time)
  }

  function search(value){
    if(value===''){
      return
    }else{
      searchSongs(value)
        .then(generateSearchResult)
    }
  }

  function template(result){ 
    let song = result.attributes
    return `
    <li data-id="${result.id}">
      <a href="./song.html?id=${result.id}">
        ${song.name} - ${song.singer}
      </a>
    </li>
  `

  }
  function searchSongs(value){ 
    var query1 = new AV.Query('Song');
    query1.contains('name', value);
    var query2 = new AV.Query('Song')
    query2.contains('singer', value);
    return AV.Query.or(query1, query2).find()
  }

  function generateSearchResult(results){
    $('#searchResult').empty()
    if(results.length === 0){
      $('#searchResult').html('没有结果')
    }else{
      for(var i=0; i<results.length; i++){
        let li = template(results[i])
        $('#searchResult').append(li)
      }
    }
  }
})
