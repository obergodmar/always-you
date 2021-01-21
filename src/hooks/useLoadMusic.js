import { useCallback, useEffect, useRef, useState } from "react"

import { Byte } from "../utils"

export function useLoadMusic({ url }) {
  const audio = useRef(new AudioContext())
  const buffer = useRef(null)
  const [status, setStatus] = useState(0)
  const [state, setState] = useState("not started")
  const [time, setTime] = useState(0)

  const handleEvent = useCallback(e => {
    const totalBytes = new Byte(e.total)
    const loadedBytes = new Byte(e.loaded)

    setStatus((loadedBytes.value / totalBytes.value) * 100)
    console.log(`${loadedBytes.toMb()}/${totalBytes.toMb()}`)
  }, [])

  const load = useCallback(() => {
    const request = new XMLHttpRequest()
    request.addEventListener("progress", handleEvent)
    request.open("GET", url)
    request.responseType = "arraybuffer"
    request.onload = function () {
      let undecodedAudio = request.response
      audio.current
        .decodeAudioData(undecodedAudio, data => (buffer.current = data))
        .catch(err => console.error(err))
    }
    request.send()
  }, [url, handleEvent])

  useEffect(() => {
    if (state === "not started") {
      return
    }
    const durationInterval = setInterval(() => {
      setTime(time => {
        const audioState = audio.current.state
        if (audioState !== "running") {
          return time
        }

        return time + 1
      })
    }, 1000)

    return () => clearInterval(durationInterval)
  }, [state, audio])

  const start = useCallback(() => {
    console.log("start")
    const source = audio.current.createBufferSource()
    source.buffer = buffer.current
    source.connect(audio.current.destination)
    source.loop = true
    source.start()
    setState(audio.current.state)
  }, [audio, buffer])

  const playPause = useCallback(() => {
    const audioState = audio.current.state
    if (audioState === "running") {
      audio.current.suspend().then(() => setState(audioState))
    } else if (audioState === "suspended") {
      audio.current.resume().then(() => setState(audioState))
    }
  }, [audio])

  return {
    handlers: {
      load,
      start,
      playPause,
    },
    info: {
      status,
      state,
      time,
    },
  }
}
