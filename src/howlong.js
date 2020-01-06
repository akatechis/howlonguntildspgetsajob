import 'milligram'
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  subYears,
  subMonths,
  subDays,
  subHours,
  subMinutes,
  subSeconds,
  addDays
} from 'date-fns'
import setTileValue from './setTileValue'

const Props = [{
  prop: 'years',
  diffFn: differenceInYears,
  subFn: subYears
}, {
  prop: 'months',
  diffFn: differenceInMonths,
  subFn: subMonths
}, {
  prop: 'days',
  diffFn: differenceInDays,
  subFn: subDays
}, {
  prop: 'hours',
  diffFn: differenceInHours,
  subFn: subHours
}, {
  prop: 'minutes',
  diffFn: differenceInMinutes,
  subFn: subMinutes
}, {
  prop: 'seconds',
  diffFn: differenceInSeconds,
  subFn: subSeconds
}]

function renderDiffs (diffs, tiles) {
  Props.forEach(({ prop }) => setTileValue(tiles[prop], diffs[prop]))
}

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

function initCountdown (targetDate) {
  const tiles = getTiles()

  function frameLoop () {
    const now = new Date();

    const diffs = Props.reduce((state, { prop, diffFn, subFn }) => {
      // for the current prop, compute the diff
      const thisdiff = diffFn(state.remainder, now)
      state[prop] = thisdiff

      // then subtract it from the remaining
      state.remainder = subFn(state.remainder, thisdiff)

      return state
    }, { remainder: targetDate })

    renderDiffs(diffs, tiles)

    window.requestAnimationFrame(frameLoop)
  }

  window.requestAnimationFrame(frameLoop)
}

function main () {
  const targetDate = dspGetsAJob()
  // const targetDate = tomorrow()
  initCountdown(targetDate);
}

// April 2nd, 2029
function dspGetsAJob () {
  return new Date(2029, 3, 2)
}

function tomorrow () {
  return addDays(new Date(), 3)
}

main()
