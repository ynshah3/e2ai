import React, { useEffect, useState } from "react";
import { Button, Spinner, ButtonGroup } from 'react-bootstrap';
import { poolImage } from "../functions/applyPooling";


const CNNModelPooling = () => {
  const [method, setMethod] = useState(undefined)

  const draw = async (context) => {
    const image = new Image();
    image.src = "test.jpg";
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
  };

  useEffect(() => {
    const context = document.getElementById("inpool").getContext('2d', {willReadFrequently: true});
    draw(context);
  }, [])

  const handleClick = (e) => {
    setMethod(e);
    document.getElementById("spnpool").style.display = "inline-block";
    document.getElementById("outpool").style.display = "none";
    setTimeout(() => poolImage(method), 1000);
  }


  return (
    <div>
      <div style={{textAlign: "justify", marginBottom: 20}}>
        Pooling is a way in which information from an input is gradually aggregated so that convolutional layers downstream can learn a more global representation. It is equivalent to spatially downsampling the input, and can be thought of as allowing the model to learn low-level features such as edges in the earlier layers, and more high-level features like eyes, faces, hands, etc. in the later layers [1].<br /><br />
        Max pooling, Min Pooling, and Average Pooling compute the <tt>maximum</tt>, <tt>minimum</tt>, and <tt>average</tt> over some pre-defined window as a way of aggregation. See how these work below! (Windows are <tt>2 x 2</tt> in size). While the differences are subtle, pay attention to the eyes and to the ends of the dog's ears...
      </div>
      <ButtonGroup>
        <Button variant="secondary" onClick={() => handleClick("max")}>Max Pooling</Button>
        <Button variant="secondary" onClick={() => handleClick("min")}>Min Pooling</Button>
        <Button variant="secondary" onClick={() => handleClick("avg")}>Average Pooling</Button>
      </ButtonGroup>
      <br /><br />
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
        <canvas id="inpool" height={200} width={200} style={{margin: "0 20px 30px 20px"}} />
        <canvas id="outpool" height={100} width={100} style={{display: "none", margin: "0 20px 30px 20px", padding: "auto"}} />
        <Spinner id="spnpool" style={{display: "none"}} />
      </div>
    </div>
  );
};

export default CNNModelPooling;