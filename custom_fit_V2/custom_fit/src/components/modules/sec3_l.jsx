import React from 'react';
import '../../scss/sec3_l.scss';
import styled from 'styled-components';

const Section3 = () => {
    return (
        <StyledWrapper>
            <div className="large-card">
                <div className="card-container">
                    <div className="card">
                        <div className="card-image" />
                        <div className="category">Ver</div>
                        <div className="heading">
                            A heading that must span over two lines
                            <div className="author">
                                By <span className="name">Abi</span> 4 days ago
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image" />
                        <div className="category">Illustration</div>
                        <div className="heading">
                            A heading that must span over two lines
                            <div className="author">
                                By <span className="name">Abi</span> 4 days ago
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image" />
                        <div className="category">Illustration</div>
                        <div className="heading">
                            A heading that must span over two lines
                            <div className="author">
                                By <span className="name">Abi</span> 4 days ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .large-card {
    width: 100%; /* Ancho completo para la tarjeta principal */
    background: white;
    padding: 1em;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .card-container {
    display: flex; /* Flexbox para organizar las tarjetas */
    flex-wrap: wrap; /* Permitir que las tarjetas se ajusten */
    gap: 20px; /* Espacio entre las tarjetas */
  }

  .card {
    width: 30%;
    background: white;
    
    border-radius: 6px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }

  .card-image {
    
    width: 100%;
    height: 200px;
    border-radius: 6px 6px 0 0;

  }

  .card-image:hover {
    transform: scale(0.98);
  }

  .category {
    text-transform: uppercase;
    font-size: 0.7em;
    font-weight: 600;
    color: rgb(63, 121, 230);
    padding: 10px 7px 0;
  }

  .category:hover {
    cursor: pointer;
  }

  .heading {
    font-weight: 600;
    color: rgb(88, 87, 87);
    padding: 7px;
  }

  .heading:hover {
    cursor: pointer;
  }

  .author {
    color: gray;
    font-weight: 400;
    font-size: 11px;
    padding-top: 20px;
  }

  .name {
    font-weight: 600;
  }

  .name:hover {
    cursor: pointer;
  }
`;

export default Section3;
