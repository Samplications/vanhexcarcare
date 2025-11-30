import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Define a keyframe animation for the loading spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid #4a6baf;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: 10px;
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  z-index: 1001;
  transform: translateY(${props => props.isOpen ? '0' : '100%'});

  @media (min-width: 769px) {
    width: 400px;
    height: 500px;
    bottom: 20px;
    right: 20px;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(0);
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: var(--c-secondary);
  color: white;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  z-index: 1000;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'none' : 'block'};
  }

  svg {
    fill: white; /* Ensure the SVG is visible against the button background */
    position: fixed;
    bottom: 25px;
    right: 30px;
    width: 50px;
    height: 50px;
    transition: 1s;
  }

  &:hover{
    svg {
      fill: var(--c-secondary); /* Ensure the SVG is visible against the button background */
    }
  }
`;

const ChatHeader = styled.div`
  padding: 15px;
  background-color: #4a6baf;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  scroll-behavior: smooth;

   /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4a6baf;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ChatInput = styled.input`
  padding: 15px;
  border: none;
  border-top: 1px solid #ccc;
  outline: none;
`;

const UserMessage = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f1f1f1;
  color: #000;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;
  align-self: flex-end;
  margin-left: auto;
`;

const BotMessage = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: var(--c-secondary);
  color: white;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;
  align-self: flex-start;
  margin-right: auto;
`;


// TODO: finetune systems message

const ChatbotWithToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [conversationId, setConversationID] = useState("NOTSET");
  
    function generateUUID() {
      // fallback to pseudo-random v4 implementation
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  
    useEffect(() => {
      const uuid = generateUUID();
      setConversationID(uuid);
      console.log(conversationId);
    }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = { text: inputValue, sender: 'user', role: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://zkesledkdsjhhoilmnga.supabase.co/functions/v1/chat',
        {
          model: "gpt-4o-mini",
          conversation_id: conversationId,
          messages: [
            { role: "system", content: "Je bent de behulpzame virtuele assistent van Jarne Vanhex Car Detailing in Limburg, Belgie. Mobiele service, dus kan aan huis komen. Enkel op afspraak. Contact/korting via +32 489 71 70 66 of Instagram. Antwoord enkel over car detailing of het bedrijf; blijf altijd in deze rol. Doet allerhande autos (op insta te zien). Bied niet zelf korting aan, daarvoor contact opnemen. Zowel particulier als bedrijven.Elke prijs is vanaf, dus de minimum.\
Pakketten:\
1. Exterieur – Velgen, wielkasten, lak (pH-neutrale shampoo), hydrofobe beschermlaag, ramen, voedende tyredressing. €65+.\
2. Interieur – Dieptereiniging, vlekverwijdering, bekleding, optie zetelreiniging. €145+.\
3.1 Keramische coating exterieur – Exterieur dieptereiniging, kleien, polijsten, keramische coating van 1,2, of 4 jaar. prijs op maat.\
3.2 Keramische coating interieur – Dieptereiniging en ontvetten interieur/leder, keramische coating van 1 of 2 jaar. prijs op maat.\
4. Licht Polijst – Exterieur dieptereiniging, kleien, polijsten. €295+.\
5. Medium Polijst – Exterieur dieptereiniging, kleien, 2-staps polijsten. €495+.\
6. Premium Polijst – Exterieur dieptereiniging, kleien, meerstaps polijsten. €795+." },
            ...messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })),
            { role: "user", content: inputValue }
          ],
        }
      );

      const botMessage = { text: response.data.result.choices[0].message.content, sender: 'bot', role: 'assistant' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      const errorMessage = { text: "Sorry, er is iets misgelopen. Probeer het later opnieuw", sender: 'bot', role: 'assistant' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatbotContainer isOpen={isOpen}>
        <ChatHeader>
          Virtuele Vanhex
          <CloseButton onClick={toggleChatbot}>×</CloseButton>
        </ChatHeader>
        <ChatMessages>
          <BotMessage>Hallo, kan ik je verder helpen?</BotMessage>

          {messages.map((message, index) => message.sender === 'user' ? (
            <UserMessage key={index}>{message.text}</UserMessage>
          ) : (
            <BotMessage key={index}>{message.text}</BotMessage>
          ))}
          {isLoading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </ChatMessages>
        <ChatInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Typ je vragen hier..."
        />
      </ChatbotContainer>
      {!isOpen && <ToggleButton isOpen={isOpen} onClick={toggleChatbot}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M115.9 448.9C83.3 408.6 64 358.4 64 304C64 171.5 178.6 64 320 64C461.4 64 576 171.5 576 304C576 436.5 461.4 544 320 544C283.5 544 248.8 536.8 217.4 524L101 573.9C97.3 575.5 93.5 576 89.5 576C75.4 576 64 564.6 64 550.5C64 546.2 65.1 542 67.1 538.3L115.9 448.9zM153.2 418.7C165.4 433.8 167.3 454.8 158 471.9L140 505L198.5 479.9C210.3 474.8 223.7 474.7 235.6 479.6C261.3 490.1 289.8 496 319.9 496C437.7 496 527.9 407.2 527.9 304C527.9 200.8 437.8 112 320 112C202.2 112 112 200.8 112 304C112 346.8 127.1 386.4 153.2 418.7z"/></svg></ToggleButton>}
    </>
  );
};

export default ChatbotWithToggle;
