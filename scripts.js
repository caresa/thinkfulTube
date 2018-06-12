const YOU_TUBE_ENDPOINT =
'https://www.googleapis.com/youtube/v3/search';

// reaches out to api
function getData(searchTerm, callback){
  //console.log('called');
  const query = {
    part: 'snippet',
    key: 'AIzaSyAggyv93Bs6-7JYWDKsJWTGGaHCALrOCM4',
    q:`${searchTerm} in:name`,
    maxResults: '25',
    type: 'video'
  }
  $.getJSON(YOU_TUBE_ENDPOINT, query, callback);
}

//renders result
function renderResult(result) {
  //console.log(result);
  let item = result.snippet;
  return `
    <div class="contain">
      <p class="title-text">${item.title}</p>
      <br>
      <a class="js-result-name" href= "https://www.youtube.com/embed/${result.id.videoId}" target="_blank" 
        data-featherlight="iframe" data-featherlight-iframe-frameborder="0" 
        data-featherlight-iframe-allow="autoplay; encrypted-media" data-featherlight-iframe-allowfullscreen="true" 
        data-featherlight-iframe-style="display:block;border:none;height:85vh;width:85vw;">
          <img src="${item.thumbnails.medium.url}" alt="snippet title"/>
      </a> 
    </div>
  `;
}


//gets data and flattens array
function youTubeData (data) {
  console.log(data.items.length); 
  const results = data.items.map((item, index) => renderResult(item));
  if(data.items.length == 0) {
    $('.js-results').html(`Please enter a valid query`);
      } 
      else
      {
        $('.title-text').hide();
        $(document).find('.title-text').hide();
        $('.js-results').html(results); 
      }
} 



// watches for submit
function watchSubmit () {
  $('.js-form').submit(event =>{
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('#name-entry');
    const queryVal = queryTarget.val();
    if (queryVal == ""){
      $('.js-results').html(`Please enter a valid query`);
      }
      else {
        //clear input
        queryTarget.val("");
        getData(queryVal, youTubeData);
      }   
  });
}



$(watchSubmit);
//$(document).ready(function () {
  //watchSubmit();
//})
