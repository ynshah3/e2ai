import React, { useState } from "react";
import { Container, Row, Stack, Col, Button, Spinner } from 'react-bootstrap';
import { blurImage } from "../functions/blurImage";


const CNNTest = () => {
  const [img, setImg] = useState(undefined)
  const [blurredImg, setBlurredImg] = useState(undefined);

  function handleChange(e) {
    document.getElementById("blurred-spn").style.display = "none";
    document.getElementById("blurred-img").style.display = "none";
    var ctx = document.getElementById('source-img').getContext('2d', {willReadFrequently: true});
    const img = new Image();
    document.getElementById("source-spn").style.display = "inline-block";
    document.getElementById("source-img").style.display = "none";
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 224, 224);
    }
    document.getElementById("source-spn").style.display = "none";
    document.getElementById("source-img").style.display = "inline-block";
    setTimeout(() => blur(), 1000)
  }

  async function blur() {
    document.getElementById("blurred-spn").style.display = "inline-block";
    document.getElementById("blurred-img").style.display = "none";
    const img = document.getElementById('source-img').getContext('2d').getImageData(0, 0, 224, 224);
    setImg(img);
    blurImage(img, setBlurredImg);
  }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">How Does The Model Perform?</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Now that we've learned how the model works "under-the-hood" and what dataset it was trained on, let's see how it performs on unseen samples. Over-reliance on model predictions can do more harm than good, especially because these models are not always right! Sometimes, models can be extremely wrong with very high confidence. AI systems should keep humans in the loop, since humans are ultimately responsible and accountable for the tasks [5].
          <br /><br />
          How does the model do on an unseen image?<br/><br/>
        </div>
        <Container fluid>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={12} md={6} lg={4}><Stack>
              <input type="file" accept="image/*" onChange={handleChange} style={{marginBottom: 20, justifyContent: "center"}} />
              <canvas id="source-img" width={224} height={224} style={{display: "none"}} />
              <Spinner id="source-spn" style={{display: "none"}} />
            </Stack></Col>
            <Col xs={12} md={6} lg={4}><Stack>
              <span className="col-blurred" style={{marginBottom: 25}}>Image after blurring faces...</span>
              <canvas id="blurred-img" width={224} height={224} style={{display: "none"}} />
              <Spinner id="blurred-spn" style={{display: "none"}} />
            </Stack></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CNNTest;