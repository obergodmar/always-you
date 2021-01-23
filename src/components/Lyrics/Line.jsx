import React, { useEffect, useState } from "react"
import styled from "styled-components"

const TextLine = styled.p`
  font-size: 10vmin;
  color: black;
  text-align: center;
  width: 100%;
  transition: opacity 100ms ease-in-out;

  opacity: ${({ isShown }) => Number(isShown)};
`

export function Line({ text }) {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (!text) {
      return
    }
    const showTimer = setTimeout(() => {
      setIsShown(true)
    }, 100)

    const hideTimer = setTimeout(() => {
      setIsShown(false)
    }, text.duration * 1000 - 100)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [text])

  return text ? <TextLine isShown={isShown}>{text.line}</TextLine> : null
}
