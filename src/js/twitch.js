let streamers = ['freecodecamp', 'epicnamebro', 'quill18', 'florryworry', 'shenryyr', 'Arumba07', 'Robbaz', 'ESL_SC2']

let popStreamers = function (numStreamers) {
  for (let i = 0; i < numStreamers; i++) {
    let streamer = streamers[i]
    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/' + streamer + '?callback=?', function (data) {
      if (data['stream'] !== null) {
        let s = $("<div class='row streamerOnline'></div>")
        $('#main').append(s)
        let streamerLogo = $('<div class="col-sm-4">').html('<img src=' + data.stream.channel.logo + '></div>')
        let streamerName = $('<div class="col-sm-4"></div>').html(streamer)
        let streamerGame = $('<div class="col-sm-4"></div>').html(data.stream.channel.status)
        $(s).append(streamerLogo)
        $(s).append(streamerName)
        $(s).append(streamerGame)
      } else {
        $.getJSON('https://wind-bow.hyperdev.space/twitch-api/users/' + streamer + '?callback=?', function (data) { 
          let s = $("<div class='row streamerOffline'></div>")
          $('#main').append(s)
          let streamerLogo = $('<div class="col-sm-4">').html('<img src=' + data.logo + '></div>')
          let streamerName = $('<div class="col-sm-4"></div>').html(streamer)
          let streamerGame = $('<div class="col-sm-4"></div>').html('Offline')
          $(s).append(streamerLogo)
          $(s).append(streamerName)
          $(s).append(streamerGame)
        })
      }
    })
  }
}

$(function () {
  popStreamers(streamers.length)
})
