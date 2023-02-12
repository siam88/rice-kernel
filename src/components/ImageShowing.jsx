import React from 'react'
import { useState, useEffect } from 'react';

const ImageShowing = (props) => {
    const [image, setImage] = useState();
    
    useEffect(() => {
        console.log("props.img", props.img)
        setImage(`https://rice-kernel-app-6n5m5gz56q-el.a.run.app/${props.img}`)
    }, [])


    return (
        <img className="img_fit" src={image} alt="" />
    )
}

export default ImageShowing