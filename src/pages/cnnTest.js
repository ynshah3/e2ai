import React, { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { detectFaces, loadDetector } from "../functions/detectFaces";
import { classifyImage } from "../functions/classifyImage";


const CNNTest = () => {
  const [detector, setDetector] = useState(undefined);
  const [classifier, setClassifier] = useState(undefined);

  useEffect(() => {
    loadDetector().then((detector) => {
      console.log('detector loaded');
      setDetector(detector)
    });
  }, [])

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
    setTimeout(() => detectAndClassify(), 1000)
  }

  function handleClick(e) {
    e.preventDefault();
    common('random/' + Math.floor(Math.random() * 10).toString() + '.jpeg');
  }

  function handleChange(e) {
    common(URL.createObjectURL(e.target.files[0]));
  }

  async function detectAndClassify() {
    document.getElementById("output-spn").style.display = "inline-block";
    document.getElementById("has-faces").style.display = "none";
    document.getElementById("pred").style.display = "none";
    let img = document.getElementById('source-img').getContext('2d').getImageData(0, 0, 224, 224);
    await detectFaces(detector, img);
    await classifyImage(classifier, img);
  }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">How Does The Model Perform?</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Now that we've learned how the model works "under-the-hood" and what dataset it was trained on, let's see how it performs on unseen samples. Over-reliance on model predictions can do more harm than good, especially because these models are not always right! Sometimes, models can be extremely wrong with very high confidence. AI systems should keep humans in the loop, since humans are ultimately responsible and accountable for the tasks [5].
          <br /><br />
          How does the model do on an unseen image? The pipeline that we will be following is:<br />
          <div style={{color: "#7b34ec"}}>
            [1] Get an input image<br/>
            [2] Detect faces in the image<br/>
            [3] Pass image through the model to get predictions!</div>
          <br/>
        </div>
        <div>
          <button id="random" className="random-img-gen" onClick={handleClick}>Use Random Image</button>
          <span style={{margin: "0 20px"}}>OR</span>
          <input id="user" type="file" accept="image/*" onChange={handleChange} style={{marginBottom: 20, justifyContent: "center", cursor: "pointer"}} /><br/>
          <canvas id="source-img" width={224} height={224} style={{display: "none"}} />
          <Spinner id="source-spn" style={{display: "none"}} />
        </div>
        <div>
          <Spinner id="output-spn" style={{display: "none", marginTop: 10}} />
          <div id="has-faces" style={{display: "none", color: "red", marginTop: 20, textAlign: "left"}}>BlazeFace has detected presence of faces in the provided image. As detailed above, always keep in mind concerns around privacy and data protection!</div>
          <div id="pred" style={{display: "none", marginTop: 20}}>
            <span style={{textDecoration: "underline"}}>Prediction</span><br />
            Church: <span id="church"></span><br />
            Dog: <span id="dog"></span><br />
            Face: <span id="face"></span><br />
            Fish: <span id="fish"></span><br />
            Parachute: <span id="parachute"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CNNTest;