import React from "react";
import { useState, useEffect } from "react";

const ImageShowing = ({img,imageUpdated}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    imageUpdated && setImage(`https://rice-kernel-app-6n5m5gz56q-el.a.run.app/${img}`);
  }, [imageUpdated]);

  return (
    <>
      <img className="img_fit" src={image} alt="" loading="lazy" />
    </>
  );
};

export default ImageShowing;
