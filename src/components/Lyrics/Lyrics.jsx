import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Container } from "../Styled"
import { useTransition } from "../../hooks"
import { Line } from "./Line"

const TextContainer = styled(Container)`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export function Lyrics({ text }) {
  const { isMounted, isShown } = useTransition()
  const [isSecondShown, setSecondShown] = useState(false)

  useEffect(() => {
    if (!text || !text.next) {
      return
    }

    setSecondShown(false)
    const timer = setTimeout(() => {
      setSecondShown(true)
    }, text.next.after * 1000 - 100)

    return () => clearTimeout(timer)
  }, [text])

  return (
    <TextContainer shown={isMounted && isShown}>
      {<Line text={text} />}
      {isSecondShown && <Line text={text.next} />}
    </TextContainer>
  )
}
