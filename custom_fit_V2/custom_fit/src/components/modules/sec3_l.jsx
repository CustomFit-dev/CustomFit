import React from 'react';
import '../../scss/sec3_l.scss';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

import image1 from '../../img/paso1.png';
import image2 from '../../img/paso2.png';
import image3 from '../../img/paso3.png';

// Estilo personalizado para el StepConnector para que las líneas sean blancas
const CustomConnector = styled(StepConnector)({
  '& .MuiStepConnector-line': {
    borderColor: '#ffffff', // Color blanco para las líneas
  },
});

// Componente personalizado de StepIcon para mostrar "1", "2" y "3"
const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;

  return (
    <div className='sece31'>
      {icon} {/* Muestra el número del paso */}
    </div>
  );
};

// Sección 3 que acepta textos personalizados
const Section3 = ({ steps }) => {
    return (
      <section className='sec3l' id='prod'>
          <div  className="sec3texto1">
              <h1>¿Cómo personalizar tus camisetas con CustomFit?</h1>
              <p style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '8px',fontFamily: 'rubik' }}>
                  Sigue los pasos a continuación para diseñar tus camisetas de forma sencilla y rápida.
              </p>
          </div>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              '& > :not(style)': {
                m: 6,
                width: 390,
                height: 300,
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                
              },
            }}
          >
            <Paper className="paper"  elevation={0} style={{ backgroundImage: `url(${image1})` }} />
            <Paper className="paper"  style={{ backgroundImage: `url(${image2})` }} />
            <Paper className="paper"  elevation={3} style={{ backgroundImage: `url(${image3})` }} />
          </Box>
          <Box sx={{ width: '100%', marginTop: 4 }}>
            <Stepper 
              activeStep={1} 
              alternativeLabel 
              connector={<CustomConnector />}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel 
                    StepIconComponent={CustomStepIcon} 
                    sx={{ 
                      '& .MuiStepLabel-label': { color: '#ffffff' },
                      '& .MuiStepLabel-labelContainer': {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontFamily: 'rubik',
                      }
                    }} // Color blanco para el texto
                  >
                    <h2 style={{ margin: 0, color: '#ffffff' }}>{step.label}</h2>
                    <h3 style={{ fontSize: '0.8rem', color: '#ffffff99', marginTop: '4px', margin: 0 }}>
                      {step.description}
                    </h3>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
      </section>
    );
};

// Ejemplo de cómo utilizar el componente con los textos actualizados
const stepsData = [
  {
    label: 'Elige una camiseta',
    description: 'Elige el modelo, tipo de manga, talla y color de la camiseta que quieras personalizar',
  },
  {
    label: 'Sube tu diseño',
    description: 'Sube tu diseño o crea uno con el Creador de diseños gratuito',
  },
  {
    label: 'Recibe tu pedido',
    description: '¡Todo listo! Haz tu pedido y nosotros nos encargamos del resto',
  },
];

export default function App() {
  return <Section3 steps={stepsData} />;
}
