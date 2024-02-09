import React, { useEffect, useState } from "react";
import { Spinner, Button, Row, Col } from 'react-bootstrap';
import { detectFaces } from "../functions/detectFaces";
import { classifyImage } from "../functions/classifyImage";
import { loadDetector } from "../functions/detectFaces";


const CNNTest = ({classifier, head}) => {
  const [detector, setDetector] = useState(undefined);

  useEffect(() => {
    if (detector) {
      document.getElementById("random").disabled = false;
      document.getElementById("user").disabled = false;
    } else {
      document.getElementById("random").disabled = true;
      document.getElementById("user").disabled = true;
    }
  }, [detector])

  useEffect(() => {
    if (classifier && head) {
      document.getElementById("loadfd").disabled = false;
    } else {
      document.getElementById("loadfd").disabled = true;
    }
  }, [classifier, head])

  function common(src) {
    document.getElementById("output-spn").style.display = "none";
    document.getElementById("has-faces").style.display = "none";
    document.getElementById("pred").style.display = "none";
    let ctx = document.getElementById('source-img').getContext('2d', {willReadFrequently: true});
    let img = new Image();
    document.getElementById("source-spn").style.display = "inline-block";
    document.getElementById("source-img").style.display = "none";
    img.src = src;
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 224, 224);
    }
    document.getElementById("source-spn").style.display = "none";
    document.getElementById("source-img").style.display = "inline-block";
    document.getElementById("output-spn").style.display = "inline-block";
    document.getElementById("has-faces").style.display = "none";
    document.getElementById("pred").style.display = "none";
    setTimeout(() => detectAndClassify(), 1000)
  }

  async function handleLoad() {
    document.getElementById("loadfdspn").style.display = "block";
    document.getElementById("loadfd").disabled = true;
    loadDetector().then((detector) => {
      setDetector(detector);
      document.getElementById("loadfdspn").style.display = "none";
    });
  }

  async function detectAndClassify() {
    let img = document.getElementById('source-img').getContext('2d').getImageData(0, 0, 224, 224);
    await detectFaces(detector, img);
    await classifyImage(classifier, head, img);
  }

  async function handleClick(e) {
    e.preventDefault();
    common('random/' + Math.floor(Math.random() * 10).toString() + '.jpeg');
  }

  function handleChange(e) {
    common(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">How Does The Model Perform?</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Now that we've learned how the model works "under-the-hood" and what dataset it was trained on, let's see how it performs on unseen samples. Over-reliance on model predictions can do more harm than good, especially because these models are not always right! Sometimes, models can be extremely wrong with very high confidence. AI systems should keep humans in the loop, since humans are ultimately responsible and accountable for the tasks [5].
          <br /><br />
          How does the model do on an unseen image? The pipeline that we will be following is:<br />
          <div className="emph">
            [1] Get an input image<br/>
            [2] Detect faces in the image<br/>
            [3] Pass image through the model to get predictions!</div>
          <br/>
        </div>
        <div>
          <div style={{marginBottom: 15, textAlign: "left"}}>
            <Row>
              <Col xs lg="3"><Button id="loadfd" onClick={handleLoad}>Load Face Detector</Button></Col>
              <Col xs lg="2" style={{justifyContent: "left"}}><Spinner id="loadfdspn" style={{display: "none"}} /></Col>
            </Row>
          </div>
          <button id="random" className="random-img-gen" onClick={handleClick}>Use Random Image</button>
          <span style={{margin: "0 20px"}}>OR</span>
          <input id="user" type="file" accept="image/*" onChange={handleChange} style={{marginBottom: 20, justifyContent: "center", cursor: "pointer"}} /><br/>
          <canvas id="source-img" width={224} height={224} style={{display: "none"}} />
          <Spinner id="source-spn" style={{display: "none"}} />
        </div>
        <div>
          <Spinner id="output-spn" style={{display: "none", marginTop: 10}} />
          <div id="has-faces" style={{display: "none", color: "red", marginTop: 20, textAlign: "left"}}>BlazeFace has detected presence of faces (sometimes even dog faces &#128542;) in the provided image. As detailed above, always keep in mind concerns around privacy and data protection!</div>
          <div id="pred" style={{display: "none", marginTop: 20}}>
            <span style={{textDecoration: "underline"}}>Prediction</span><br />
            Church: <span id="church"></span><br />
            Dog: <span id="dog"></span><br />
            Face: <span id="face"></span><br />
            Fish: <span id="fish"></span><br />
            Parachute: <span id="parachute"></span>
          </div>
          <div id="ps" style={{textAlign: "justify", marginTop: 20, display: "none"}}>Two of the many reasons why a model might incorrectly classify a test image, given that it performs decently well on the training and validation sets, are: (1) the image is out-of-distribution (image styles not present in the dataset; for example, a face at a different angle, a different dog breed, etc.), or (2) the image is out-of-domain (images from classes the model might not have seen during training). Always have humans in the loop!</div>
        </div>
      </div>
    </div>
  );
};

export default CNNTest;