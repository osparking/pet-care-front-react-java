import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import placeholder from "../../assets/images/placeholder.jpg";

const ImageUser = ({ photoUser, altText = "수의사 얼굴" }) => {
  return (
    <Fragment>
      {photoUser ? (
        <Card.Img
          src={`data:image/png;base64, ${photoUser}`}
          clasName="user-image"
          alt={altText}
        />
      ) : (
        <Card.Img src={placeholder} className="user-image" alt={altText} />
      )}
    </Fragment>
  );
};

export default ImageUser;
