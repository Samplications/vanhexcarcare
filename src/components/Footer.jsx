import React from 'react'
import styled from 'styled-components'

const FooterDiv = styled.div`
    background-color: var(--c-primary);
    font-size: 0.5rem;
    padding: 0.5rem;

    display: flex;
    justify-content: center;
    flex-direction: row;

    p{margin:0;}
`;

const Footer = () => {
  return (
    <FooterDiv>
      <p>Vanhex Carcare © 2024</p>
    </FooterDiv>
  )
}

export default Footer
