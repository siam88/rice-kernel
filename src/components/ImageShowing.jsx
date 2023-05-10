import React from "react";
import { useState, useEffect } from "react";

const ImageShowing = ({img,imageUpdated}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    imageUpdated && setImage(`https://riceapi.appswind.com/${img}`);
  }, [imageUpdated]);

  return (
    <>
      <img className="img_fit" src={image} alt="" loading="lazy" />
    </>
  );
};

export default ImageShowing;
