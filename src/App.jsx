import { useState } from 'react'
import styled from 'styled-components'
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import { BrowserView, MobileView } from 'react-device-detect';
import Slideshow from './components/Slideshow';
import ContactModal from './components/ContactModal';

import vid_bmx_x5_foamen from './assets/videos/bmx_x5_foamen.mp4'
import vid_bmx_x5_afspuiten from './assets/videos/bmx_x5_afspuiten.mp4'
import vid_polijsten from './assets/videos/polijsten.mp4'
import vid_koffer_stofzuigen from './assets/videos/koffer_stofzuigen.mp4'
import vid_koffer_borstelen from './assets/videos/koffer_borstelen_e.mp4'
import vid_matten_strepen from './assets/videos/matten_strepen.mp4'

import pkt_list_ext from './assets/pakketten/ext_pkt_list.jpg'
import pkt_list_int from './assets/pakketten/int_pkt_list.jpg'
import pkt_list_pol_licht from './assets/pakketten/polijst_pkt_licht.jpg'
import pkt_list_pol_medium from './assets/pakketten/polijst_pkt_medium.jpg'
import pkt_list_pol_premium from './assets/pakketten/polijst_pkt_premium.jpg'
import pkt_list_keram_ext from './assets/pakketten/keram_coat_ext.jpg'

import pkt_list_keram_int from './assets/pakketten/keram_coat_int.jpg'

import pkt_expl_ext from './assets/pakketten/ext_pkt_expl.jpg'
import pkt_expl_int from './assets/pakketten/int_pkt_expl.jpg'
import pkt_expl_pol from './assets/pakketten/polijst_pkt_expl.jpg'

import img_flank_before from './assets/beforeNafter/flank_before/flank_before.jpg'
import img_flank_after from './assets/beforeNafter/flank_after/flank_after.jpg'

import img_mat_before from './assets/beforeNafter/mat_before/mat_before.jpg'
import img_mat_after from './assets/beforeNafter/mat_after/mat_after.jpg'

import img_wiel_before from './assets/beforeNafter/wiel_before/wiel_before.jpg'
import img_wiel_after from './assets/beforeNafter/wiel_after/wiel_after.jpg'
import InstagramEmbed from './components/InstagramEmbed';
import Carousel from './components/Carousel';
import Carousel_3piece from './components/Carousel_3piece';
import ChatbotWithToggle from './components/ChatbotWithToggle';

// Load images
const images = import.meta.glob('/src/assets/slideshow/*.{jpg,jpeg,png,gif}', { eager: true });
const imageUrls = Object.values(images).map((mod) => mod.default);

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

  h1{
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
  padding: 0 0 3em 0;
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
  padding: 4em 0 7em 0;
  color: var(--c-white);
`;

const BeforeNAfterDiv = styled(BrowserView)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 2em;
  margin-top: 0.50em;
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
    margin: 0.5rem;
    text-align: center;
  }
`;

const ShowcaseSection = styled(Section)`
  color: var(--c-black);
  padding: 4em 0 0 0;
`;

const InstaSection = styled(Section)`
  background-color: var(--c-white);

  padding: 3em 0 0.5em 0;

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
  const [polijsLichttImage, setPolijsLichtImage] = useState(pkt_list_pol_licht);
  const [polijsMediumtImage, setPolijsMediumImage] = useState(pkt_list_pol_medium);
  const [polijsPremiumtImage, setPolijsPremiumImage] = useState(pkt_list_pol_premium);
  const [keramExtImage, setKeramExtImage] = useState(pkt_list_keram_ext);

  const beforenafterpics = [
    img_flank_before,
    img_flank_after,
    img_mat_before,
    img_mat_after,
    img_wiel_before,
    img_wiel_after
  ];

  preloadImages([pkt_expl_ext, pkt_expl_int, pkt_list_pol_licht, pkt_list_pol_medium, pkt_list_pol_premium, pkt_list_keram_ext]);

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
            <h1>Welkom bij Vanhex Car Care - Uw Specialist in Auto Detailing!</h1>
            <p>
            Wij brengen uw auto weer in showroomstaat, zowel van binnen als van buiten. Onze diensten omvatten professionele dieptereiniging, krasvrije wasbeurten, polijsten, en duurzame keramische coatings voor een langdurige bescherming en glans. Of het nu gaat om het grondig reinigen van het interieur of het herstellen van de lak, we leveren vakwerk tot in de kleinste details.
            <br/><br/>
            En het beste van alles? Wij komen naar u toe! Dankzij onze mobiele service ervaart u de topkwaliteit van onze detailing-diensten gewoon bij u op locatie. Ontdek hoe we uw auto de zorg kunnen geven die het verdient!</p>
          </IntroTextDiv>
          </PageContentDiv>
      </TopSection>

      <PakketSection>
        <PageContentDiv>
          <h1>Pakketten</h1>
          <PakketDiv>
            <PakketImg src={extImage} alt='Exterieur pakket' loading='lazy' onMouseOver={() => setExtImage(pkt_expl_ext)} onMouseOut={() => setExtImage(pkt_list_ext)}/>
            <PakketImg src={intImage} alt='Interieur pakket' loading='lazy' onMouseOver={() => setIntImage(pkt_expl_int)} onMouseOut={() => setIntImage(pkt_list_int)}/>
            <PakketImg src={keramExtImage} alt='Keramiek pakket' loading='lazy' onMouseOver={() => setKeramExtImage(pkt_list_keram_int)} onMouseOut={() => setKeramExtImage(pkt_list_keram_ext)}/>
            <PakketImg src={polijsLichttImage} alt='Polijst pakket licht' loading='lazy' onMouseOver={() => setPolijsLichtImage(pkt_expl_pol)} onMouseOut={() => setPolijsLichtImage(pkt_list_pol_licht)}/>
            <PakketImg src={polijsMediumtImage} alt='Keramiek pakket Medium' loading='lazy' onMouseOver={() => setPolijsMediumImage(pkt_expl_pol)} onMouseOut={() => setPolijsMediumImage(pkt_list_pol_medium)}/>
            <PakketImg src={polijsPremiumtImage} alt='Keramiek pakket Premium' loading='lazy' onMouseOver={() => setPolijsPremiumImage(pkt_expl_pol)} onMouseOut={() => setPolijsPremiumImage(pkt_list_pol_premium)}/>
            
          </PakketDiv>
          
          <BookBtn onClick={handleOpenModal}>Boek nu!</BookBtn>
        </PageContentDiv>
      </PakketSection>

      
      <BeforeNAfterSection>
        <PageContentDiv>
          
            <h1>Wat u kan verwachten</h1>
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



      <ShowcaseSection>
        <PageContentDiv>
            <h1>Gegarandeerd een prachtig resultaat!</h1>
            <p>Mocht u nog steeds niet overtuigd zijn dan hebben wij hier voor u wat fotos op een rij gezet. </p>
            <MobileView>
              <Carousel images={imageUrls}/>
            </MobileView>
            <BrowserView>
              <Carousel_3piece images={imageUrls}/>
            </BrowserView>
        </PageContentDiv>
      </ShowcaseSection>

      <InstaSection>
        <PageContentDiv>
            <h1>Meer zien?</h1>
            <p>Volg ons dan ook op instagram om altijd op de hoogte te blijven van de laatste nieuwigheden.</p>
            <InstagramEmbed postUrl="https://www.instagram.com/vanhexcarcare/"/>
        </PageContentDiv>
      </InstaSection>

      <ChatbotWithToggle/>
    </PageDiv>
  )
}

export default App
