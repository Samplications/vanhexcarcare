import React from 'react'
import styled from 'styled-components'

const FooterDiv = styled.div`
    background-color: var(--c-primary);
    padding: 0.5rem;

    display: flex;
    justify-content: center;
    flex-direction: row;

    p{margin:0;
    font-size: 0.7rem;}
`;

const Footer = () => {
  return (
    <FooterDiv>
      <p>Vanhex Carcare © 2025</p>
    </FooterDiv>
  )
}

export default Footer
