import React, { useState } from "react"
import { Reset } from "styled-reset"
import styled from "styled-components"
import { GiClick } from "react-icons/all"

import { centered, Container, Music } from "../components"
import { useDelayedHandler, useInteraction, useTransition } from "../hooks"

const Note = styled.span`
  color: white;
  ${centered()};
  font-family: inherit;
  font-size: 7vmin;
`

export default function Home() {
  const { isMounted, isShown, hide } = useTransition()
  const [isStartLoading, setStartLoading] = useState(false)
  const { handle: handleStartLoading } = useDelayedHandler({
    handler: () => setStartLoading(true),
  })

  const { eventProps } = useInteraction({
    handlers: [hide, handleStartLoading],
  })

  return (
    <div>
      <Reset />
      {isStartLoading ? (
        <Music />
      ) : (
        <Container shown={isMounted && isShown} {...eventProps}>
          <Note>
            Do <GiClick /> to start
          </Note>
        </Container>
      )}
    </div>
  )
}
