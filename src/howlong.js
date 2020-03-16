import 'babel-polyfill'
import 'milligram'
import { computeDiffs } from './counter'
import { updateUI } from './userinterface'
import { playAudio } from './audio'

function getTile (id) {
  const tile = document.getElementById(id)
  tile.__dsp = {
    toggle: false,
    val: null,
    aElem: tile.querySelector('.value.a'),
    bElem: tile.querySelector('.value.b')
  }

  return tile
}

function getTiles () {
  const tiles = {
    years: getTile('years-tile'),
    months: getTile('months-tile'),
    days: getTile('days-tile'),
    hours: getTile('hours-tile'),
    minutes: getTile('minutes-tile'),
    seconds: getTile('seconds-tile')
  }
  return tiles
}

function beginCountdown (targetDate) {
  const tiles = getTiles()

  function frameLoop () {
    const now = new Date()

    const diffs = computeDiffs(now, targetDate)
    updateUI(diffs, tiles)

    playAudio(diffs)

    window.requestAnimationFrame(frameLoop)
  }

  window.requestAnimationFrame(frameLoop)
}

// April 2nd, 2029
function dspGetsAJob () {
  return new Date(2029, 3, 2)
}

function main () {
  const targetDate = dspGetsAJob()
  // const targetDate = testDate()
  beginCountdown(targetDate)
}

main()
