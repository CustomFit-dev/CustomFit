import React from 'react';
import { Card, CardContent, CardMedia, Grid, Box, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Tarjeta de producto individual
function ProductCard({ title, price, color, image }) {
  return (
    <Card sx={{ maxWidth: 250, backgroundColor: '#4a4a4a', color: 'white' }}>
      <CardMedia component="img" height="250" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">Camiseta Con Estampado Color {color}</Typography> {/* Mostrar color */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h5">${price}</Typography>
          <IconButton sx={{ color: 'white' }}>
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

// Cuadrícula de productos
function ProductGrid() {
  const products = [
    { title: 'Camiseta Sencilla', price: 30000, color: 'Violeta', image: 'https://via.placeholder.com/200' },
    { title: 'Camiseta Estampada', price: 45000, color: 'Naranja', image: 'https://via.placeholder.com/200' },
    { title: 'Camiseta Premium', price: 35000, color: 'Negra', image: 'https://via.placeholder.com/200' },
    { title: 'Camiseta Exclusiva', price: 60000, color: 'Roja', image: 'https://via.placeholder.com/200' },
    { title: 'Camiseta Deportiva', price: 38000, color: 'Verde', image: 'https://via.placeholder.com/200' },
    { title: 'Camiseta Colorida', price: 25000, color: 'Amarilla', image: 'https://via.placeholder.com/200' },
    { title: 'Camiseta Premium', price: 35000, color: 'Gris', image: 'https://via.placeholder.com/200' },
    { title: 'Camiseta Temporada', price: 150000, color: 'Azul', image: 'https://via.placeholder.com/200' },
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: 'center', my: 4, color: '#00F0FF' }}>
        ¡Te Encantará Comprar Aquí!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product, index) => (
          <Grid item key={index}>
            <ProductCard title={product.title} price={product.price} color={product.color} image={product.image} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <Box sx={{ backgroundColor: '#000', color: 'white', p: 3, textAlign: 'center', marginTop: 5 }}>
      <Typography variant="body2">© 2024 CustomFit. Todos los derechos reservados.</Typography>
    </Box>
  );
}

// Componente principal de la aplicación
function App() {
  return (
    <div>
      <ProductGrid />
      <Footer />
    </div>
  );
}

export default App;
