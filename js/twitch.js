let popRemovedStreamers = function (streamers) {
  $('div.streamerOnline').remove()
  $('div.streamerOffline').remove()
  $('div.streamerRemoved').remove()
  for (let i = 0; i < streamers.length; i++) {
    let streamer = streamers[i]
    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/' + streamer + '?callback=?', function (data) {
      if (data['stream'] === undefined) {
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
  $('div.streamerOnline').remove()
  $('div.streamerOffline').remove()
  $('div.streamerRemoved').remove()
  for (let i = 0; i < streamers.length; i++) {
    let streamer = streamers[i]
    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/' + streamer + '?callback=?', function (data) {
      if (data['stream'] !== null && data['stream'] !== undefined) {
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
  $('div.streamerOnline').remove()
  $('div.streamerOffline').remove()
  $('div.streamerRemoved').remove()
  for (let i = 0; i < streamers.length; i++) {
    let streamer = streamers[i]
    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/' + streamer + '?callback=?', function (data) {
      if (data['stream'] === null && data['stream'] !== undefined) {
        $.getJSON('https://wind-bow.hyperdev.space/twitch-api/users/' + streamer + '?callback=?', function (data) {
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
        })
      } 
    })
  }
}

let popAllStreamers = function (streamers) {
  $('div.streamerOnline').remove()
  $('div.streamerOffline').remove()
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
    popAllStreamers(defaultStreamers)
  })
  $('#onlineButton').on('click', function () {
    popOnlineStreamers(defaultStreamers)
  })
  $('#offlineButton').on('click', function () {
    popOfflineStreamers(defaultStreamers)
  })
})
