import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Container, Img } from "../Styled"
import { useTransition } from "../../hooks"
import { Line } from "./Line"

const TextContainer = styled(Container)`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TransparentContainer = styled(Container)`
  background-color: rgba(0, 0, 0, ${({ mode }) => Number(mode)});
`

const Flip = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  left: 0;
  transition: bottom 400ms ease;
  visibility: ${({ cond }) => cond ? 'visible' : 'hidden'};

  bottom: ${({ cond }) => (cond ? "100%" : "210%")};
`

export function Lyrics({ text, data }) {
  const { isMounted, isShown } = useTransition()
  const [image, setImage] = useState(-1)
  const [previousImage, setPreviousImage] = useState(-1)
  const [isSecondShown, setSecondShown] = useState(false)
  const [light, setLight] = useState(false)

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

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(state => state + 1)
    }, 10000)

    return () => clearInterval(interval)
  }, [data])

  useEffect(() => {
    setLight(image > 0 && image < 18)

    const timer = setTimeout(() => {
      setPreviousImage(image)
    }, 400)

    return () => clearTimeout(timer)
  }, [image])

  return (
    <TextContainer shown={isMounted && isShown}>
      {previousImage >= 1 &&
        data.lyricsImages.edges[image - 1] &&
        image - 1 > 0 && (
          <Container shown>
            <Img
              fluid={
                data.lyricsImages.edges[image - 1].node.childImageSharp.fluid
              }
            />
          </Container>
        )}
      {image > 0 && data.lyricsImages.edges[image] && (
        <Flip cond={previousImage === image && image !== 0}>
          <TransparentContainer shown mode={previousImage === image}>
            <Img
              fluid={data.lyricsImages.edges[image].node.childImageSharp.fluid}
            />
          </TransparentContainer>
        </Flip>
      )}
      {<Line text={text} light={light} />}
      {isSecondShown && <Line text={text.next} light={light} />}
    </TextContainer>
  )
}
