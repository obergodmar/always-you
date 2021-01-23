import React, { useEffect, useState } from "react"
import url from "../../assets/music.mp3"

import { useDelayedHandler, useLoadMusic } from "../../hooks"
import { Loading } from "../Loading"
import text from "../Lyrics/text.json"
import { Lyrics } from "../Lyrics"

export function Music() {
  const {
    handlers: { load, start },
    info: { state, status, time },
  } = useLoadMusic({ url })
  const [textTime, setTextTime] = useState(undefined)

  const { handle: handleStart } = useDelayedHandler({ handler: start })

  const isStarted = state !== "not started"

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!text[time]) {
      return
    }

    setTextTime(text[time])
  }, [time])

  return !isStarted ? (
    <Loading status={status} handleStart={handleStart} />
  ) : (
    <Lyrics text={textTime} />
  )
}
