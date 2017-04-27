let popRemovedStreamers = function (streamers) {
  for (let i = 0; i < streamers.length; i++) {
    let streamer = streamers[i]
    $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/'+streamer, function (data, status) {
      if (data.status === null || data.status === 404) {
        let s = $("<div class='row streamerRemoved'></div>")
        $('#removedStreamers').append(s)
        let streamerLogo = $('<div class="col-sm-4"></div>').html('')
        let streamerName = $('<div class="col-sm-4"></div>').html(streamer)
        let streamerGame = $('<div class="col-sm-4"></div>').html('Channel Removed')
        $(s).append(streamerLogo)
        $(s).append(streamerName)
        $(s).append(streamerGame)
      }
    })
  }
}

let popOnlineStreamers = function (streamers) {
  for (let i = 0; i < streamers.length; i++) {
    let streamer = streamers[i]
    $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+streamer, function (data, status) {
			if (data.stream !== null) {
        let s = $("<div class='row streamerOnline'></div>")
        $('#onlineStreamers').append(s)
        let streamerLogo = $('<div class="col-sm-4">').html('<img src=' + data.stream.channel.logo + '></div>')
        let streamerName = $('<div class="col-sm-4"></div>').html(streamer)
        let streamerGame = $('<div class="col-sm-4"></div>').html(data.stream.channel.status)
        $(s).append(streamerLogo)
        $(s).append(streamerName)
        $(s).append(streamerGame)
        $(s).wrap(function () {
          let link = $('<a/>')
          link.attr('href', 'https://twitch.tv/' + streamer)
          return link
        })
      }
    })
  }
}

let popOfflineStreamers = function (streamers) {
  for (let i = 0; i < streamers.length; i++) {
    let streamer = streamers[i]
    $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+streamer, function (data, status) {
      if (data.stream === null) {
        $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + streamer + '?callback=?', function (data) {
          if (data.status !== null && data.status !== 404) {
            let s = $("<div class='row streamerOffline'></div>")
            $('#offlineStreamers').append(s)
            let streamerLogo = $('<div class="col-sm-4">').html('<img src=' + data.logo + '></div>')
            let streamerName = $('<div class="col-sm-4"></div>').html(streamer)
            let streamerGame = $('<div class="col-sm-4"></div>').html('Offline')
            $(s).append(streamerLogo)
            $(s).append(streamerName)
            $(s).append(streamerGame)
            $(s).wrap(function () {
              let link = $('<a/>')
              link.attr('href', 'https://twitch.tv/' + streamer)
              return link
            })
          }
        })
      }
    })
  }
}

let filterStreamers = function (status) {
  switch (status) {
    case 'online':
      $('div.streamerOnline').show()
      $('div.streamerOffline').hide()
      $('div.streamerRemoved').hide()
      break
    case 'offline':
      $('div.streamerOnline').hide()
      $('div.streamerOffline').show()
      $('div.streamerRemoved').hide()
      break
    default:
      $('div.streamerOnline').show()
      $('div.streamerOffline').show()
      $('div.streamerRemoved').show()
      break
  }
}

let popAllStreamers = function (streamers) {
	popOnlineStreamers(streamers)
  popOfflineStreamers(streamers)
  popRemovedStreamers(streamers)

}

$(document).ready(function () {
  let defaultStreamers = [
    'ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp',
    'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas',
    'comster404'
  ]
  popAllStreamers(defaultStreamers)
  $('#allButton').on('click', function () {
    filterStreamers('all')
  })
  $('#onlineButton').on('click', function () {
    filterStreamers('online')
  })
  $('#offlineButton').on('click', function () {
    filterStreamers('offline')
  })
})
