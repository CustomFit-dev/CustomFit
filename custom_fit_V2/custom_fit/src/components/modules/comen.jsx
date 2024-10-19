import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import '../../scss/comen.scss'; // Asegúrate de importar el CSS

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyUserName, setReplyUserName] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  // Cargar los comentarios desde Local Storage cuando se inicia el componente
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(storedComments);
  }, []);

  // Guardar comentarios en Local Storage cada vez que se actualizan
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && userName.trim()) {
      const newComment = {
        userId: userName,
        text: commentText,
        timestamp: new Date().toISOString(),
        replies: []
      };
      const updatedComments = [...comments, newComment]; // Actualizamos el estado
      setComments(updatedComments); // Guardamos en el estado
      setCommentText('');
      setUserName('');
    }
  };

  const handleReplySubmit = (e, index) => {
    e.preventDefault();
    if (replyText.trim() && replyUserName.trim()) {
      const updatedComments = [...comments];
      const newReply = {
        userId: replyUserName,
        text: replyText,
        timestamp: new Date().toISOString()
      };
      updatedComments[index].replies.push(newReply);
      setComments(updatedComments); // Actualizamos el estado
      setReplyText('');
      setReplyUserName('');
      setReplyIndex(null);
    }
  };

  const handleReplyClose = () => {
    setReplyIndex(null); // Cierra la respuesta
  };

  // Calcular los comentarios que se deben mostrar en la página actual
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <div className="comment-section">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ color: '#00a99d' }}>Comentarios de nuestros clientes</h1>
      </div>

      <form onSubmit={handleCommentSubmit}>
        <TextField
          id="user-name"
          label="Ingresa tu nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <TextField
          id="comment-text"
          label="Escribe un comentario"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <Button type="submit" variant="contained" color="primary">Enviar</Button>
      </form>
      <hr style={{ border: '2px solid #00a99d', margin: '20px 0' }} />
      <h2 style={{ color: 'white' }}>Total de Comentarios: {comments.length}</h2>
      <hr style={{ border: '2px solid #00a99d', margin: '20px 0' }} />

      <div>
        {currentComments.map((comment, index) => (
          <div key={index} className="comment">
            <p>
              <strong style={{ fontSize: '1.9rem', color: '#00a99d' }}>{comment.userId}</strong>
              <span style={{ fontSize: '0.7rem', marginLeft: '10px', margin: '8px' }}>• {new Date(comment.timestamp).toLocaleString()}</span>
            </p>
            <p style={{ fontSize: '0.9rem' }}>{comment.text}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button variant="outlined" onClick={() => setReplyIndex(index)}>Responder</Button>
              {replyIndex === index && (
                <Button variant="outlined" onClick={handleReplyClose} style={{ marginLeft: '8px' }}>X</Button>
              )}
            </div>
            {replyIndex === index && (
              <form className="reply-form" onSubmit={(e) => handleReplySubmit(e, index)}>
                <TextField
                  id={`reply-user-name-${index}`}
                  label="Ingresa tu nombre"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={replyUserName}
                  onChange={(e) => setReplyUserName(e.target.value)}
                  required
                  InputProps={{
                    style: { color: 'white' },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                />
                <TextField
                  id={`reply-text-${index}`}
                  label="Escribe una respuesta"
                  variant="outlined"
                  multiline
                  rows={2}
                  fullWidth
                  margin="normal"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                  InputProps={{
                    style: { color: 'white' },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                />
                <Button type="submit" variant="contained" color="primary">Enviar Respuesta</Button>
              </form>
            )}
            <div style={{ paddingLeft: '20px' }}>
              {comment.replies.map((reply, replyIndex) => (
                <div key={replyIndex} className="reply">
                  <p style={{ fontSize: '1rem' }}>
                    <strong>{reply.userId}</strong>
                    <span style={{ fontSize: '0.8rem', marginLeft: '8px', marginRight: '8px' }}>•</span>
                    {new Date(reply.timestamp).toLocaleString()}
                  </p>
                  <p style={{ fontSize: '0.8rem' }}>{reply.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handlePageChange(index + 1)}
            style={{ color: 'white', margin: '0 5px', backgroundColor: currentPage === index + 1 ? '#00a99d' : 'transparent', color: currentPage === index + 1 ? 'white' : 'black' }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
