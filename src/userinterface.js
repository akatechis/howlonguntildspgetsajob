/// Implements ui related logic
export function updateUI (diffs, tiles) {
  Object.keys(diffs).forEach(key => {
    setTileValue(tiles[key], diffs[key])
  })
}

/// Every tile element has the following prop with some state
/// tile.__dsp = {
///   toggle: false,
///   val: null,
///   aElem: tile.querySelector('.value.a'),
///   bElem: tile.querySelector('.value.b')
/// }

function setValue (elem, value) {
  (elem[0] || elem).textContent = value.toString()
}

export default function setTileValue (tile, value) {
  const ctx = tile.__dsp

  /// bail early if no diff
  if (ctx.val === value) {
    return
  }

  ctx.val = value

  /// odd call
  if (ctx.toggle) {
    setValue(ctx.aElem, value)

    ctx.aElem.classList.add('entering')
    ctx.aElem.classList.remove('exiting')

    ctx.bElem.classList.add('exiting')
    ctx.bElem.classList.remove('entering')
  } else {
    setValue(ctx.bElem, value)
    ctx.aElem.classList.add('exiting')
    ctx.aElem.classList.remove('entering')

    ctx.bElem.classList.add('entering')
    ctx.bElem.classList.remove('exiting')
  }
  ctx.toggle = !ctx.toggle
}
