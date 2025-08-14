import React, { useState } from 'react'; 
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../../scss/FloatingButton.scss';

const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleButtons = () => {
    setOpen(!open);
  };

  const openChatbot = () => {
    setChatOpen(true);
    setOpen(false); // Opcional: cerrar los botones flotantes cuando abren el chat
  };

  return (
    <div className="fab-container">
      {open && (
        <div className="fab-options">

          {/* Tooltip para Instagram */}
          <Tooltip 
            title="Instagram" 
            placement="left"
            PopperProps={{
              disableInteractive: true
            }}
            sx={{
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'white',
                color: 'black',
                fontSize: '1.2rem',
                padding: '8px 12px',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Fab
              className="fab-option instagram"
              size="small"
              style={{ backgroundColor: '#e1306c', color: 'white' }} // Fondo oficial de Instagram
              aria-label="Instagram"
              onClick={() => window.open('https://instagram.com', '_blank')}
            >
              <InstagramIcon />
            </Fab>
          </Tooltip>

          {/* Tooltip para Facebook */}
          <Tooltip 
            title="Facebook" 
            placement="left"
            PopperProps={{
              disableInteractive: true
            }}
            sx={{
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'white',
                color: 'black',
                fontSize: '1.2rem',
                padding: '8px 12px',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Fab
              className="fab-option facebook"
              size="small"
              style={{ backgroundColor: '#3b5998', color: 'white' }} // Fondo oficial de Facebook
              aria-label="Facebook"
              onClick={() => window.open('https://facebook.com', '_blank')}
            >
              <FacebookIcon />
            </Fab>
          </Tooltip>

          {/* Tooltip para WhatsApp */}
          <Tooltip 
            title="WhatsApp" 
            placement="left"
            PopperProps={{
              disableInteractive: true
            }}
            sx={{
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'white',
                color: 'black',
                fontSize: '1.2rem',
                padding: '8px 12px',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Fab
              className="fab-option whatsapp"
              size="small"
              style={{ backgroundColor: '#25d366', color: 'white' }} // Fondo oficial de WhatsApp
              aria-label="WhatsApp"
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
            >
              <WhatsAppIcon />
            </Fab>
          </Tooltip>
        </div>
      )}
      <Fab color="primary" className="fab-button" onClick={toggleButtons}>
        {open ? <CloseIcon /> : <AddIcon />}
      </Fab>

    </div>
  );
};

export default FloatingButton;
