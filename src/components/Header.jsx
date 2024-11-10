import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import ContactModal from './ContactModal.jsx';

import logo from '../assets/logo_trans_bg_cropped.png'
import icon_instagram from '../assets/icons/instagram_w.png'
import icon_phone from '../assets/icons/phone-call_w.png'

import {BrowserView, MobileView} from 'react-device-detect';
import { Link } from 'react-router-dom';

const NavLink = styled(Link)`
  font-weight: 400;
  text-decoration: none;
  font-size: 1.4rem;

  opacity:0.87;
  color: var(--c-white);

  &:hover{
      color: var(--c-white);
  }

  @media (max-width: 767px) {
    font-size: 0.8rem;
  };
`;

const Telref = styled.a`
  font-weight: 400;
  text-decoration: none;
  font-size: 1.4rem;

  opacity:0.87;
  color: var(--c-white);

  &:hover{
      color: var(--c-white);
  }

  @media (max-width: 767px) {
    font-size: 0.8rem;
  };
`;

const HeadDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000; /* Ensures header stays on top of other elements */

  background-color: var(--c-primary);
  display: flex;
  justify-content: center;

  box-shadow: 0 1px 3px var(--c-black);
`;


const InfoDiv = styled.div`
  flex-wrap: no-wrap;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  font-size: 2rem;

  p{font-size: 1.4rem;}

  @media (max-width: 767px) {
    gap: 1rem;
    p{font-size: 0.8rem;}
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

const LogoCenterDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media (max-width: 767px) {
    
    margin: 0;

  }
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  @media (max-width: 767px) {
     margin: 0.5em 0 0 0;
  };
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-size: 1.4rem;

  @media (max-width: 767px) {
     margin-bottom: 0.5rem;
  };
}
`;

const LogoImg = styled.img`
  width: 7vw;
  height: auto;
  padding: 1em;

  @media (max-width: 767px) {
     width: 20vw;
     margin-top: 1rem;
     padding:0;
  };
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

const Bview = styled(BrowserView)`
  width: 70%;
  flex-wrap: no-wrap;
  display: flex;
  justify-content: space-between;
`;

const Mview = styled(MobileView)`
  width: 70%;
  flex-wrap: no-wrap;
  display: flex;
  flex-direction: column;
`;

const Header = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HeadDiv>
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal}/>
      <Bview>
        <NavLink to="/">
          <LogoImg src={logo} alt='logo' loading='lazy'/>
        </NavLink>

        <InfoDiv>

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
          
          <ButtonDiv>
            <CenterDiv>
              <button onClick={handleOpenModal}>Contact</button>
            </CenterDiv>
          </ButtonDiv>
        </InfoDiv>
      </Bview>

      <Mview>
      <LogoDiv>
         <LogoCenterDiv>
            <NavLink to="/">
              <LogoImg src={logo} alt='logo' loading='lazy'/>
            </NavLink>
          </LogoCenterDiv>
          </LogoDiv>

        <InfoDiv>
          <ItemDiv>
            <CenterDiv>
              <Icon src={icon_phone}/>
              <Telref href="tel:+324 89 717 066">+324 89 717 066</Telref>
            </CenterDiv>
          </ItemDiv>

          <ItemDiv>
            <CenterDiv>
              <Icon src={icon_instagram}/>
              <NavLink to="https://www.instagram.com/vanhexcarcare/" target="_blank" rel="noopener noreferrer">@vanhexcarcare</NavLink>
            </CenterDiv>
          </ItemDiv>
        </InfoDiv>

        <ButtonDiv>
          <CenterDiv>
            <button  onClick={handleOpenModal}>Contact</button>
          </CenterDiv>
        </ButtonDiv>

      </Mview>
    </HeadDiv>
  )
}

export default Header
