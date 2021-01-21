import React from "react"
import styled from "styled-components"
import { GiClick, ImMusic, ImVolumeHigh } from "react-icons/all"

import { useInteraction, useTransition } from "../../hooks"
import { centered, Container } from "../Styled"

const TextCentered = styled.h1`
  font-family: inherit;
  font-size: 20vmin;
  line-height: 1;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${centered()};
  transition: opacity 100ms ease-in-out;

  opacity: ${({ status }) => status / 100};
`

const TextPartOne = styled.span`
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  height: 16vmin;
`

const TextPartTwo = styled(TextPartOne)`
  align-self: flex-end;
`

const Loader = styled.div`
  font-family: inherit;
  font-size: 4.5vmin;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-bottom: 0.6vmin;
  background-color: white;
  transition: width 100ms ease-in-out;

  height: 5vmin;
  width: ${({ status }) => `${status}vw`};
`

const HelpNote = styled.div`
  position: fixed;
  top: 0.6vmin;
  left: 0;
  text-align: center;
  vertical-align: middle;
  font-family: inherit;
  color: white;
  font-size: 4.5vmin;
  height: 5vmin;
  width: 100%;
`

export function Loading({ status, handleStart }) {
  const isReady = status === 100

  const { isMounted, isShown, hide } = useTransition()
  const { eventProps } = useInteraction({
    handlers: [handleStart, hide],
    when: isReady,
  })

  return (
    <Container shown={isMounted && isShown} {...eventProps}>
      <TextCentered status={status}>
        <TextPartOne>Always</TextPartOne>
        <TextPartTwo>You</TextPartTwo>
      </TextCentered>
      <Loader status={status}>{isReady && "Ready"}</Loader>
      {isReady && (
        <HelpNote>
          (Prepare your <ImVolumeHigh /> for <ImMusic /> and make <GiClick />)
        </HelpNote>
      )}
    </Container>
  )
}
