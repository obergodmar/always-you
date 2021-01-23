import { useCallback, useEffect, useRef, useState } from "react"

import { Byte } from "../utils"

export function useLoadMusic({ url }) {
  const audio = useRef(null)
  const buffer = useRef(null)
  const durationIntervalRef = useRef(null)
  const [status, setStatus] = useState(0)
  const [state, setState] = useState("not started")
  const [time, setTime] = useState(0)

  const handleEvent = useCallback(e => {
    const totalBytes = new Byte(e.total)
    const loadedBytes = new Byte(e.loaded)

    setStatus((loadedBytes.value / totalBytes.value) * 100)
  }, [])

  const load = useCallback(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    audio.current = new AudioContext()
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

    durationIntervalRef.current = setInterval(() => {
      setTime(time => {
        return time + 1
      })
    }, 1000)

    return () => clearInterval(durationIntervalRef.current)
  }, [state, audio])

  useEffect(() => {
    if (time <= 192) {
      return
    }

    clearInterval(durationIntervalRef.current)
    setTime(0)
    setState("not started")
  }, [time])

  const start = useCallback(() => {
    const source = audio.current.createBufferSource()
    source.buffer = buffer.current
    source.connect(audio.current.destination)
    source.loop = false
    source.start()
    setState(audio.current.state)
  }, [audio, buffer])

  return {
    handlers: {
      load,
      start,
    },
    info: {
      status,
      state,
      time,
    },
  }
}
