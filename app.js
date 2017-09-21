// DO NOT EVER STORE YOUR API KEYS LIKE THIS
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_KEY = 'AIzaSyBYJymdEVZfFljKBGip48WreCgIx7GWJqw'


const state = {
  videos: [],
  currentVideo: 0,

}

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      key: YOUTUBE_KEY,
      part: 'snippet',
      q: searchTerm,
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
 
  };

  $.ajax(settings);
}


function noResults(){
  $('.television__screen').replaceWith('<div class="inside-div">No Results</div');
}


function renderResult(result) {
  console.log('in render result function');
  $('.television__screen').css('background-image', 'none');
  $('.television__screen').css('overflow', 'hidden');
  $('.inside-div').remove();
  console.log(state.currentVideo)
  const currentVideoUrl = state.videos[state.currentVideo].embed_url
  $('#current_video').attr('src', currentVideoUrl);
  console.log(state.videos);
  showLinks();
}


function nextVideo() {
  console.log('next question')
  console.log(state.currentVideo)
  if (state.currentVideo < state.videos.length - 1){
      state.currentVideo++;
      console.log('count up')
    renderResult();

  }
  else {
    showLinks();
   
  }
}

function showLinks(){
  $('.next-result').removeClass('hidden');
}


function displayYoutubeSearchData(data) {
  console.log(data.items.length)
  if (data.length != 0) {
    console.log(data.items);
    console.log(data.items[0].id.videoId)
    const videos = data.items.map(item => ({
      video_url : 'https://www.youtube.com/watch?v=' + item.id.videoId,
      embed_url : 'https://www.youtube.com/embed/' + item.id.videoId,
      video_id : item.id.videoId,
      screen_shot: item.snippet.thumbnails.high.url,
    }));
    state.videos = videos
    renderResult();
  }
  else {
    noResults();
  }

}


function watchLink(){
  console.log('watch link');
  $('.next-result').on("click", e => {
    e.preventDefault();
    console.log('next video click');
    nextVideo();
  });
}


function watchSubmit() {
  $('#search-form').submit(event => {
    event.preventDefault();
    console.log('clicked');
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(query);
    queryTarget.val("");
    $('.television__screen').append('<div class="inside-div"> Loading...</div>');
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
$(watchLink);



