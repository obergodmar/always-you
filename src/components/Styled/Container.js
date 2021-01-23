import styled from "styled-components"

export const Container = styled.div`
  position: fixed;
  user-select: none;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  font-family: "Yusei Magic", sans-serif;
  transition: opacity 100ms ease, transform 100ms ease;

  transform: ${({ shown }) => shown ? 'scale(1, 1)' : 'scale(0.9, 0.9)'};
  opacity: ${({ shown }) => Number(shown)};
`
