import styled from "styled-components"

export const Container = styled.div`
  position: absolute;
  user-select: none;
  width: 100vw;
  height: 100vh;
  background-color: black;
  font-family: "Yusei Magic", sans-serif;
  transition: opacity 100ms ease, transform 100ms ease;

  transform: ${({ shown }) => shown ? 'scale(1, 1)' : 'scale(0.9, 0.9)'};
  opacity: ${({ shown }) => Number(shown)};
`
