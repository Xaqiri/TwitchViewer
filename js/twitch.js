let popStreamers = function (streamers, numStreamers) {
  for (let i = 0; i < numStreamers; i++) {
    let streamer = streamers[i]
    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/' + streamer + '?callback=?', function (data) {
      if (data['stream'] !== null) {
        let s = $("<div class='row streamerOnline'></div>")
        $('#streamers').append(s)
        let streamerLogo = $('<div class="col-sm-4">').html('<img src=' + data.stream.channel.logo + '></div>')
        let streamerName = $('<div class="col-sm-4"></div>').html(data.stream.channel.display_name)
        let streamerGame = $('<div class="col-sm-4"></div>').html(data.stream.channel.status)
        $(s).append(streamerLogo)
        $(s).append(streamerName)
        $(s).append(streamerGame)
      } else {
        $.getJSON('https://wind-bow.hyperdev.space/twitch-api/users/' + streamer + '?callback=?', function (data) {
          let s = $("<div class='row streamerOffline'></div>")
          $('#streamers').append(s)
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

let getStreamers = function (user, streamers) {
  if (user) {
    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/users/' + user + '/follows/channels?callback=?', function (data) {
      console.log(streamers)
      for (let i = 0; i < data.follows.length; i++) {
        streamers.push(data.follows[i].channel.display_name)
      }
      popStreamers(streamers, streamers.length)
    })
  } else {
    streamers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
    popStreamers(streamers, streamers.length)
  }
}

$(document).ready(function () {
  let streamers = []
  let user = ''
  $('#inputButton').on('click', function () {
    if ($('#input').val() !== user) {
      user = $('#input').val()
      streamers = []
      $('#streamers').empty()
      getStreamers(user, streamers)
    }
  })
})
