import React, { useEffect } from "react";
import { Button, Spinner, ButtonGroup } from 'react-bootstrap';
import { checkedImage, poolImage } from "../functions/applyPooling";


const CNNModelPooling = () => {
  useEffect(() => {
    checkedImage();
  }, [])

  const handleClick = (e) => {
    document.getElementById("spnpool").style.display = "inline-block";
    document.getElementById("outpool").style.display = "none";
    setTimeout(() => poolImage(e), 1000);
  }


  return (
    <div>
      <div style={{textAlign: "justify", marginBottom: 20}}>
        Pooling is a way in which information from an input is gradually aggregated so that convolutional layers downstream can learn a more global representation. It is equivalent to spatially downsampling the input, and can be thought of as allowing the model to learn low-level features such as edges in the earlier layers, and more high-level features like eyes, faces, hands, etc. in the later layers [1].<br /><br />
        Max pooling, Min Pooling, and Average Pooling compute the <tt>maximum</tt>, <tt>minimum</tt>, and <tt>average</tt> over some pre-defined window as a way of aggregation. See how these work below! (Windows are <tt>2 x 2</tt> in size). The image below is checkered; it has an alternating black (0) and white (255) pixel pattern. Why do the following results make sense? Hint: Think about what value you get after applying each of the below pooling operations to the <tt>2 x 2</tt> square window [[255, 0], [0, 255]].
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