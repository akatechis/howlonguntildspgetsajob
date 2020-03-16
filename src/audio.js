/// This package contains code for playing audio files on demand.
/// Because the triggers for these are time-sensitive, we don't lazy load
/// the audio asset. Instead, we eagerly load on startup. If we call
/// playSound() with an asset that has not finished loading, we dont
/// queue it up, to avoid having desynced audio, and signal to the caller it
/// was ignored.
import { sample } from 'lodash'

const AudioContext = window.AudioContext || window.webkitAudioContext
const ctx = new AudioContext()

window.addEventListener('mousemove', () => {
  ctx.resume()
})

export function playAudio (diffs) {
  /// Once per minute, play a random goat
  if (diffs.seconds % 2 === 0) {
    const signature = signDiffs(diffs)
    playRandomGoat(signature)
  }
}

function playRandomGoat (signature) {
  const goats = [1, 2, 3]
  const selected = sample(goats)
  playAudioByKey(`goat${selected}`, signature)
}

let played = {}

function playAudioByKey (key, signature) {
  const file = AudioFiles[key]
  if (!played[signature]) {
    played[signature] = true
    const src = ctx.createBufferSource()
    src.buffer = file.buf
    src.connect(ctx.destination)
    src.start()
  } else if (Object.keys(played).length > 100) {
    /// If this cache gets too large, dump it.
    played = {}
  }
}

const AudioFiles = {
}

loadSound('goat1')
loadSound('goat2')
loadSound('goat3')
loadSound('snake')
loadSound('alala')

async function loadSound (key) {
  AudioFiles[key] = { loaded: false }

  const resp = await window.fetch(`./sounds/${key}.mp3`)
  if (resp.ok) {
    const abuf = await resp.arrayBuffer()
    const buf = await ctx.decodeAudioData(abuf)

    AudioFiles[key] = {
      loaded: true,
      buf
    }
  }
}

function signDiffs ({ years, months, days, hours, minutes, seconds }) {
  return `${years}_${months}_${days}_${hours}_${minutes}_${seconds}`
}
