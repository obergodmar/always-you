import React, { useCallback, useEffect, useState } from "react"
import url from "../../assets/music.mp3"

import { useDelayedHandler, useLoadMusic } from "../../hooks"
import { Loading } from "../Loading"
import text from "../Lyrics/text.json"
import { Lyrics } from "../Lyrics"

export function Music() {
  const {
    handlers: { load, playPause, start },
    info: { state, status, time },
  } = useLoadMusic({ url })
  const [textTime, setTextTime] = useState(undefined)

  const { handle: handleStart } = useDelayedHandler({ handler: start })

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!text[time]) {
      return
    }

    setTextTime(text[time])
  }, [time])

  const handleStartPause = useCallback(
    e => {
      if (state === "not started") {
        return
      }
      if (e.code === "Space") {
        playPause()
      }
    },
    [playPause, state]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleStartPause)
    return () => window.removeEventListener("keydown", handleStartPause)
  }, [handleStartPause])

  return state === "not started" ? (
    <Loading status={status} handleStart={handleStart} />
  ) : (
    <Lyrics text={textTime} />
  )
}
