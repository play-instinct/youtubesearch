// DO NOT EVER STORE YOUR API KEYS LIKE THIS, PLZ DON'T USE MY KEY
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_KEY = 'AIzaSyBYJymdEVZfFljKBGip48WreCgIx7GWJqw'

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
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
    <div>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  console.log(data);
}

function watchSubmit() {
  $('#search-form').submit(event => {
    event.preventDefault();
    console.log('clicked');
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(query);
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);