import React from "react";
import { Carousel } from "react-bootstrap";

const VetSlider = ({ vets }) => {
  return (
    <main>
      <Carousel interval={5000} indicators={true} controls={true}>
        {vets &&
          vets.map((vet, index) => 
            <Carousel.Item key={index}>
                
            </Carousel.Item>)}
      </Carousel>
    </main>
  );
};

export default VetSlider;
