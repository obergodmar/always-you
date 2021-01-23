import React, { useState } from "react"
import { graphql } from "gatsby"
import { Reset } from "styled-reset"
import styled from "styled-components"
import { GiClick } from "react-icons/all"

import { centered, Container, Img, Music, textShadow } from "../components"
import { useDelayedHandler, useInteraction, useTransition } from "../hooks"

const Note = styled.p`
  color: white;
  ${centered()};
  ${textShadow()};
  text-align: center;
  width: 100%;
  font-family: inherit;
  font-size: 10vmin;
`

export default function Home({ data }) {
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
        <Music data={data} />
      ) : (
        <Container shown={isMounted && isShown} {...eventProps}>
          <Img fluid={data.startImage.childImageSharp.fluid} />
          <Note>
            Do <GiClick /> to start
          </Note>
        </Container>
      )}
    </div>
  )
}

export const query = graphql`
  query ImagesQuery {
    lyricsImages: allFile(filter: { relativePath: { regex: "/(lyrics)/" } }) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    startImage: file(relativePath: { eq: "start.JPEG" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    loadingImage: file(relativePath: { eq: "loading.JPEG" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
