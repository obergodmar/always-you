import React, { useEffect, useState } from "react"
import url from "../../assets/music.mp3"

import { useDelayedHandler, useLoadMusic } from "../../hooks"
import { Loading } from "../Loading"
import text from "../Lyrics/text.json"
import { Lyrics } from "../Lyrics"

export function Music({ data }) {
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

  useEffect(() => {
    if (time <= 192) {
      return
    }

    setTextTime(undefined)
  }, [time])

  return !isStarted || time > 192 ? (
    <Loading status={status} handleStart={handleStart} data={data} />
  ) : (
    <Lyrics text={textTime} data={data} />
  )
}
