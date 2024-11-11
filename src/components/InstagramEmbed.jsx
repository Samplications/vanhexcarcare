import React, { useEffect } from 'react';

const InstagramEmbed = ({ postUrl }) => {
  useEffect(() => {
    // Load Instagram Embed Script
    const script = document.createElement('script');
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="12"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px rgba(0,0,0,0.5), 0 1px 10px rgba(0,0,0,0.15)',
          margin: '0 auto', // Centers it within the flex container
          width: '100%', // Full width within its container
          padding: '0',
        }}
      ></blockquote>
    </div>
  );
};

export default InstagramEmbed;
