    import React from 'react';
    import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
    import CloseIcon from '@mui/icons-material/Close';
    import '../../scss/ChatbotModal.scss';

    const ChatbotModal = ({ open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="chatbot-modal">
        <Box className="chatbot-box">
            <div className="chatbot-header">
            <Typography variant="h6" component="h2" className="chatbot-title">
                🤖 Chatbot
            </Typography>
            <IconButton onClick={handleClose} className="close-button">
                <CloseIcon />
            </IconButton>
            </div>
            <div className="chatbot-body">
            <Typography variant="body1">Hola, ¿en qué puedo ayudarte?</Typography>
            {/* Aquí pondrías los mensajes del chatbot dinámicamente */}
            </div>
            <div className="chatbot-footer">
            <TextField
                size="small"
                variant="outlined"
                placeholder="Escribe tu mensaje..."
                className="chatbot-input"
            />
            <Button variant="contained" color="primary" className="send-button">
                Enviar
            </Button>
            </div>
        </Box>
        </Modal>
    );
    };

    export default ChatbotModal;
