import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { textShadow } from "../Styled"

const TextLine = styled.p`
  font-size: 10vmin;
  color: ${({ light }) => (light ? "white" : "black")};
  ${({ light }) => light && textShadow()}
  text-align: center;
  width: 100%;
  transition: opacity 100ms ease, transform 100ms ease, color 100ms ease, text-shadow 100ms ease;

  transform: ${({ shown }) => (shown ? "scale(1, 1)" : "scale(0.9, 0.9)")};
  opacity: ${({ shown }) => Number(shown)};
`

export function Line({ text, light }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!text) {
      return
    }
    const showTimer = setTimeout(() => {
      setShown(true)
    }, 100)

    const hideTimer = setTimeout(() => {
      setShown(false)
    }, text.duration * 1000 - 100)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [text])

  return text ? (
    <TextLine shown={shown} light={light}>
      {text.line}
    </TextLine>
  ) : null
}
