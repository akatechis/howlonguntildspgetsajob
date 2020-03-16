/// Implements the main logic for computing the countdown timer.
/// How it works:
/// We start with the "larget" of the date components: years. We compute
/// the diff, and subtract that from a running total so that the next component
/// in the chain computes the remainder of the distance.

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
  subSeconds
} from 'date-fns'

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

export function computeDiffs (now, targetDate) {
  let remainder = targetDate
  return Props.reduce((state, { prop, diffFn, subFn }) => {
    /// for the current prop, compute the diff
    const thisdiff = diffFn(remainder, now)
    state[prop] = thisdiff

    /// then subtract it from the remaining
    remainder = subFn(remainder, thisdiff)

    return state
  }, {})
}
