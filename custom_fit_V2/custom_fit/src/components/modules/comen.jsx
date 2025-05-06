import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Divider, 
  Box, 
  Container, 
  Rating, 
  Avatar, 
  Pagination,
  IconButton,
  Tooltip,
  Fade
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import AddCommentIcon from '@mui/icons-material/AddComment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../../scss/comen.scss'; // Importar el archivo SCSS para estilos personalizados

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const reviewsPerPage = 6;

  // Cargar las reseñas desde Local Storage cuando se inicia el componente
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  // Guardar reseñas en Local Storage cada vez que se actualizan
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() && userName.trim()) {
      const newReview = {
        userId: userName,
        text: reviewText,
        rating: rating,
        timestamp: new Date().toISOString()
      };
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setReviewText('');
      setUserName('');
      setRating(5);
      setShowForm(false);
    }
  };

  // Calcular las reseñas que se deben mostrar en la página actual
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Cambiar de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Función para generar color basado en el nombre de usuario
  const generateUserColor = (username) => {
    const colors = ['#00a99d', '#00d4c3', '#008b7f', '#00e6d2', '#006b63'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Función para obtener iniciales del nombre de usuario
  const getUserInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="lg" className="review-section">
      <Box className="reviews-header">
        <Typography variant="h3" component="h1" align="center" className="title-gradient">
          Opiniones de nuestros clientes
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={4}>
          <Typography variant="h6" component="h3">
            {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'} publicadas
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddCommentIcon />}
            onClick={() => setShowForm(!showForm)}
            className="neon-button"
          >
            {showForm ? 'Ocultar formulario' : 'Escribir reseña'}
          </Button>
        </Box>
      </Box>

      <Fade in={showForm}>
        <Card sx={{ mb: 5, backgroundColor: '#262a33', color: 'white', borderRadius: '16px', overflow: 'visible', display: showForm ? 'block' : 'none' }} className="glass-card">
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom color="primary" className="form-title">
              Comparte tu experiencia
            </Typography>
            <form onSubmit={handleReviewSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tu nombre"
                    variant="outlined"
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    InputProps={{ className: "custom-input" }}
                    InputLabelProps={{ className: "custom-input-label" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" className="rating-container">
                    <Typography component="legend" sx={{ mr: 2 }}>Calificación:</Typography>
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={(e, newValue) => setRating(newValue)}
                      size="large"
                      icon={<StarIcon fontSize="inherit" className="star-icon" />}
                      emptyIcon={<StarIcon fontSize="inherit" className="star-icon-empty" />}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Tu opinión"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    InputProps={{ className: "custom-input" }}
                    InputLabelProps={{ className: "custom-input-label" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className="submit-button"
                  >
                    Publicar reseña
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Fade>

      {reviews.length === 0 ? (
        <Box textAlign="center" py={5} className="no-reviews">
          <VisibilityIcon sx={{ fontSize: 60, opacity: 0.5, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Todavía no hay reseñas
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            ¡Sé el primero en compartir tu opinión!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setShowForm(true)}
            className="neon-button"
          >
            Escribir una reseña
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentReviews.map((review, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="review-card" elevation={3}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box display="flex" alignItems="center">
                        <Avatar 
                          sx={{ 
                            bgcolor: generateUserColor(review.userId),
                            width: 50, 
                            height: 50,
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {getUserInitials(review.userId)}
                        </Avatar>
                        <Box ml={2}>
                          <Typography variant="h6" component="div" className="user-name">
                            {review.userId}
                          </Typography>
                          <Typography variant="caption" className="review-date">
                            {formatDate(review.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="rating-display">
                        <Rating value={review.rating} readOnly precision={0.5} size="small" />
                      </Box>
                    </Box>
                    
                    <Divider className="divider-glow" />
                    
                    <Typography variant="body1" component="p" className="review-message">
                      {review.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                className="custom-pagination"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ReviewSection;