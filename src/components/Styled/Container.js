import styled from "styled-components"

export const Container = styled.div`
  user-select: none;
  width: 100vw;
  height: 100vh;
  background-color: black;
  font-family: "Yusei Magic", sans-serif;
  transition: opacity 100ms ease-in-out;

  opacity: ${({ shown }) => Number(shown)};
`
