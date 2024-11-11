import { useState } from 'react'
import styled from 'styled-components'
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import { BrowserView, MobileView } from 'react-device-detect';
import Slideshow from './components/Slideshow';
import ContactModal from './components/ContactModal';

import vid_bmw_inzepen from './assets/videos/bmw_inzepen.mp4'
import vid_bmw_foam from './assets/videos/bmw_foam.mp4'
import vid_bmw_wassen from './assets/videos/bmw_wassen.mp4'
import vid_bmw_afspoelen from './assets/videos/bmw_afspoelen.mp4'
import vid_bmw_afdrogen from './assets/videos/bmw_afdrogen.mp4'

import vid_bmx_x5_foamen from './assets/videos/bmx_x5_foamen.mp4'
import vid_bmx_x5_afspuiten from './assets/videos/bmx_x5_afspuiten.mp4'
import vid_polijsten from './assets/videos/polijsten.mp4'
import vid_koffer_stofzuigen from './assets/videos/koffer_stofzuigen.mp4'
import vid_koffer_borstelen from './assets/videos/koffer_borstelen_e.mp4'
import vid_matten_strepen from './assets/videos/matten_strepen.mp4'

import pkt_list_ext from './assets/pakketten/ext_pkt_list.jpg'
import pkt_list_int from './assets/pakketten/int_pkt_list.jpg'
import pkt_list_pol from './assets/pakketten/polijst_pkt_list.jpg'
import pkt_list_keram from './assets/pakketten/keram_coat_pkt_list.jpg'
import pkt_list_keram_plus from './assets/pakketten/keram_coat_plus_pkt_list.jpg'

import pkt_expl_ext from './assets/pakketten/ext_pkt_expl.jpg'
import pkt_expl_int from './assets/pakketten/int_pkt_expl.jpg'
import pkt_expl_pol from './assets/pakketten/polijst_pkt_expl.jpg'
import pkt_expl_keram from './assets/pakketten/keram_coat_pkt_expl.jpg'
import pkt_expl_keram_plus from './assets/pakketten/keram_coat_plus_pkt_list.jpg' 
// TODO Get keram coat plust needs expl part

import img_flank_before from './assets/beforeNafter/flank_before/flank_before.jpg'
import img_flank_after from './assets/beforeNafter/flank_after/flank_after.jpg'

import img_mat_before from './assets/beforeNafter/mat_before/mat_before.jpg'
import img_mat_after from './assets/beforeNafter/mat_after/mat_after.jpg'

import img_wiel_before from './assets/beforeNafter/wiel_before/wiel_before.jpg'
import img_wiel_after from './assets/beforeNafter/wiel_after/wiel_after.jpg'
import InstagramEmbed from './components/InstagramEmbed';


const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-top: 7vw;

  @media (max-width: 767px) {
     margin-top: 45vw; 
  };
`;

const PageContentDiv = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h2{
    margin: 1.2rem 0 0.75rem 0
  }

  p{
    margin: 0 0 0.75rem 0;
    padding: 0;
  }

  @media (max-width: 767px) {
     p{
    margin: 0 0 1rem 0;}
  };
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const TopSection = styled(Section)`
  display: flex;
  justify-content: center;
  flex-direction: row;

  color: var(--c-black);

  padding: 2em 0 1em 0;
`;

const BookBtn = styled.button`
  font-size: 1.4rem;
`;

const TopVidsDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  wrap: no-wrap;
`;

const TopVids = styled.video`
  width: 16.9%;
  height: auto;
  pointer-events: none;
`;

const PakketSection = styled(Section)`
  color: var(--c-black);
  padding: 0 0 2rem 0;
`;

const PakketDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4%;

  @media (max-width: 767px) {
    flex-direction: column;
  };
`;

const PakketImg = styled.img`
  width: 30%;
  height: auto;
  margin-bottom: 3.33%;

   @media (max-width: 767px) {
    width: 100%;
  };
`;

const IntroTextDiv = styled.div`
  margin: 1rem 0;

  @media (max-width: 767px) {
    margin: 0;
  };
`;

const BeforeNAfterSection = styled(Section)`
  background-color: var(--c-primary);
  padding: 2rem 0 2.5rem 0;
  color: var(--c-white);
`;

const BeforeNAfterDiv = styled(BrowserView)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 2em;
`;

const BeforeNAfterDivMobile = styled(MobileView)`
  // display: flex;
  // justify-content: center;
  // flex-direction: row;
  
`;

const BeforeAfterSliderDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width:100%;

  p{
    margin: 0.2rem;
    text-align: center;
  }
`;

const InstaSection = styled(Section)`
  background-color: var(--c-white);

  padding: 2rem 0 2.5rem 0;

  color: var(--c-black);
`;

function preloadImages(imageArray) {
  imageArray.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [extImage, setExtImage] = useState(pkt_list_ext);
  const [intImage, setIntImage] = useState(pkt_list_int);
  const [polijstImage, setPolijstImage] = useState(pkt_list_pol);
  const [keramImage, setKeramImage] = useState(pkt_list_keram);
  const [keramPlusImage, setKeramPlusImage] = useState(pkt_list_keram_plus);

  const beforenafterpics = [
    img_flank_before,
    img_flank_after,
    img_mat_before,
    img_mat_after,
    img_wiel_before,
    img_wiel_after
  ];

  preloadImages([pkt_expl_ext, pkt_expl_int, pkt_expl_pol, pkt_expl_keram]);

  return (
    <PageDiv>

      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal}/>
        
      <TopSection>
        <PageContentDiv>
          {/* <TopImg src={img_jarne} alt='Jarne in actie' loading='lazy'/> vids from bmw */}
          <TopVidsDiv>
            <TopVids autoPlay muted loop playsInline><source src={vid_bmx_x5_foamen} type='video/mp4' preload="none"/></TopVids>
            <TopVids autoPlay muted loop playsInline><source src={vid_bmx_x5_afspuiten} type='video/mp4' preload="none"/></TopVids>
            <TopVids autoPlay muted loop playsInline><source src={vid_polijsten} type='video/mp4' preload="none"/></TopVids>
            <TopVids autoPlay muted loop playsInline><source src={vid_koffer_borstelen} type='video/mp4' preload="none"/></TopVids>
            <TopVids autoPlay muted loop playsInline><source src={vid_koffer_stofzuigen} type='video/mp4'preload="none"/></TopVids>
            <TopVids autoPlay muted loop playsInline><source src={vid_matten_strepen} type='video/mp4' preload="none"/></TopVids>
          </TopVidsDiv>

          <IntroTextDiv>
            <h2>Welkom bij Vanhex Car Care - Uw Specialist in Auto Detailing!</h2>
            <p>
            Wij brengen uw auto weer in showroomstaat, zowel van binnen als van buiten. Onze diensten omvatten professionele dieptereiniging, krasvrije wasbeurten, polijsten, en duurzame keramische coatings voor een langdurige bescherming en glans. Of het nu gaat om het grondig reinigen van het interieur of het herstellen van de lak, we leveren vakwerk tot in de kleinste details.
            <br/><br/>
            En het beste van alles? Wij komen naar u toe! Dankzij onze mobiele service ervaart u de topkwaliteit van onze detailing-diensten gewoon bij u op locatie. Ontdek hoe we uw auto de zorg kunnen geven die het verdient!</p>
          </IntroTextDiv>
          </PageContentDiv>
      </TopSection>

      <PakketSection>
        <PageContentDiv>
          <h2>Pakketten</h2>
          <PakketDiv>
            <PakketImg src={extImage} alt='Exterieur pakket' loading='lazy' onMouseOver={() => setExtImage(pkt_expl_ext)} onMouseOut={() => setExtImage(pkt_list_ext)}/>
            <PakketImg src={intImage} alt='Interieur pakket' loading='lazy' onMouseOver={() => setIntImage(pkt_expl_int)} onMouseOut={() => setIntImage(pkt_list_int)}/>
            <PakketImg src={polijstImage} alt='Polijst pakket' loading='lazy' onMouseOver={() => setPolijstImage(pkt_expl_pol)} onMouseOut={() => setPolijstImage(pkt_list_pol)}/>
            <PakketImg src={keramImage} alt='Keramiek pakket' loading='lazy' onMouseOver={() => setKeramImage(pkt_expl_keram)} onMouseOut={() => setKeramImage(pkt_list_keram)}/>
            <PakketImg src={keramPlusImage} alt='Keramiek+ pakket' loading='lazy' onMouseOver={() => setKeramPlusImage(pkt_expl_keram_plus)} onMouseOut={() => setKeramPlusImage(pkt_list_keram_plus)}/>
          </PakketDiv>
          
          <BookBtn onClick={handleOpenModal}>Boek nu!</BookBtn>
        </PageContentDiv>
      </PakketSection>

      
      <BeforeNAfterSection>
        <PageContentDiv>
          
            <h2>Wat u kan verwachten</h2>
            <p>U kunt rekenen op een grondige, veilige reiniging van het interieur en exterieur, waarbij elke kras, vlek en onvolkomenheid wordt aangepakt. Onze polijst- en coatingtechnieken herstellen de lak en beschermen deze langdurig en dat allemaal op locatie. Wij zorgen ervoor dat uw auto er weer als nieuw uitziet</p>
            
            <BeforeNAfterDiv>
            
            <BeforeAfterSliderDiv>
              <p>vanbuiten...</p>
              <BeforeAfterSlider beforeImage={img_flank_before} afterImage={img_flank_after}/>
            </BeforeAfterSliderDiv>

            <BeforeAfterSliderDiv>
              <p>vanbinnen...</p>
              <BeforeAfterSlider beforeImage={img_mat_before} afterImage={img_mat_after}/>
            </BeforeAfterSliderDiv>

            <BeforeAfterSliderDiv>
              <p>tot in het kleinste detail!</p>
              <BeforeAfterSlider beforeImage={img_wiel_before} afterImage={img_wiel_after}/>
            </BeforeAfterSliderDiv>

          </BeforeNAfterDiv>

          <BeforeNAfterDivMobile>
              <Slideshow images={beforenafterpics} interval={3000} />
            </BeforeNAfterDivMobile>

        </PageContentDiv>
      </BeforeNAfterSection>

      <InstaSection>
        <PageContentDiv>
            <h2>Volg ons ook op instagram!</h2>
            <InstagramEmbed postUrl="https://www.instagram.com/vanhexcarcare/"/>
        </PageContentDiv>
      </InstaSection>
    </PageDiv>
  )
}

export default App
