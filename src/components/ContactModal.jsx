import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import icon_instagram from '../assets/icons/instagram.png'
import icon_phone from '../assets/icons/phone-call.png'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px 30px 40px 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  text-align: center;
  color: var(--c-black);

  h2{
    margin-bottom:0;
  };

  p{
    margin-top:0.5rem;
  };
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--c-black);
`;

const ItemDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Icon = styled.img`
  height: 1.4rem;
  width: auto;
  opacity:0.87;

  @media (max-width: 767px) {
      height: 0.8rem;
  };
`;

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  button{
    font-size: 1.4rem;
  };
  

  @media (max-width: 767px) {
    
    margin: 0.4rem 0;

    p{
      margin: 0;
    }

    button{
      font-size: 1rem;
    };
  };

  }
`;

const NavLink = styled(Link)`
  font-weight: 700;
  text-decoration: none;
  font-size: 1.4rem;

    color: var(--c-black);

  &:hover{
      color: var(--c-black);
  }

  @media (max-width: 767px) {
    font-size: 0.8rem;
  };
`;

const Telref = styled.a`
  font-weight: 700;
  text-decoration: none;
  font-size: 1.4rem;

  color: var(--c-black);

  &:hover{
      color: var(--c-black);
  }

  @media (max-width: 767px) {
    font-size: 0.8rem;
  };
`;

function ContactModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Handle click outside modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay  onClick={handleOverlayClick}>
      <ModalContent  onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Contacteer ons!</h2>
        <p>Nog vragen, of kunnen we er direct invliegen? U kan ons contacteren via instagram of door rechtstreeks te bellen.</p>
        
        <ItemDiv>
            <CenterDiv>
              <Icon src={icon_phone} alt="telefoon icoon" loading='lazy'/>
              <Telref href="tel:+324 89 717 066">+324 89 717 066</Telref>
            </CenterDiv>
          </ItemDiv>

          <ItemDiv>
            <CenterDiv>
              <Icon src={icon_instagram} alt="instagram icoon" loading='lazy'/>
              <NavLink to="https://www.instagram.com/vanhexcarcare/" target="_blank" rel="noopener noreferrer">@vanhexcarcare</NavLink>
            </CenterDiv>
          </ItemDiv>

      </ModalContent>
    </Overlay>
  );
}

export default ContactModal;
