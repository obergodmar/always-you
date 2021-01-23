import styled from "styled-components"
import { default as GatsbyImage } from "gatsby-image"

export const Img = styled(GatsbyImage)`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: blur(8px);
`
