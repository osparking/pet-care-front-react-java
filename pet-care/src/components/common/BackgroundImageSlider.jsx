import React from "react";
import Carousel from "react-bootstrap";
import bg from "../../assets/images/bg.png";
import bg1 from "../../assets/images/bg1.png";
import bg3 from "../../assets/images/bg3.png";

const BackgroundImageSlider = () => {
  const backgrounds = [bg1, bg, bg3];
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="background-slider">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={2000}>
        {backgrounds.map((background, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={background}
              alt={`슬라이드 번호: ${index}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BackgroundImageSlider;
