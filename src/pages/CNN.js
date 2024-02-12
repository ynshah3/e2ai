import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CNNDataset from "./cnnDataset";
import CNNModel from "./cnnModel";
import CNNTrain from "./cnnTrain";
import CNNTest from "./cnnTest";
import CNNExplain from "./cnnExplain";


const CNN = () => {
  const [show, setShow] = useState(false);
  const [dataset, setDataset] = useState(false);
  const [classifier, setClassifier] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  function openSurvey() { setShow(true); }

  function closeSurvey() { setShow(false); }

  return (
    <div className="container-sm" style={{maxWidth: 1000}}>
      <div className="frame" style={{backgroundColor: "#ffddc1", justifyContent: "center"}}>
        <h1 className="display-4">Image Classification Using<br />Convolutional Neural Networks</h1>
        <div className="container-sm" style={{marginTop: 50, maxWidth: 800, textAlign: "justify"}}>
          The task of Image Classification is concerned with categorizing (labelling) images into different classes based on what those images depict. For example, an image of a cat would be classified as belonging to the "cat" class. Convolutional Neural Networks (CNNs) are a family of neural networks that leverage the powerful spatial structure present in images. This spatial structure can comprise of the <a href="https://d2l.ai/chapter_convolutional-neural-networks/why-conv.html">observations</a> that:
          <div className="container-sm" style={{justifyContent: 'center', display: 'flex'}}>
            <ul>
              <li><span className="emph">Translational Invariance</span>: A cat at different locations in an image, like sleeping on the floor or jumping over a fence, are all images of cats.</li>
              <li><span className="emph">Locality</span>: A pixel representing the sky is likely to be surrounded by pixels that also represent the sky.</li>
              <li><span className="emph">Composition</span>: Objects in images are composed of parts, like a face is composed of eyes, a nose, lips, ears, etc.</li>
            </ul>
          </div>
        </div>
        <hr style={{margin: "30px 20px"}} />
        <CNNDataset />
        <hr style={{margin: "30px 20px"}} />
        <CNNModel />
        <hr style={{margin: "30px 20px"}} />
        <CNNTrain setClassifier={setClassifier} setDataset={setDataset} />
        <hr style={{margin: "30px 20px"}} />
        <CNNExplain classifier={classifier} dataset={dataset} />
        <hr style={{margin: "30px 20px"}} />
        <CNNTest classifier={classifier} />
        <hr style={{margin: "30px 20px"}} />
        <div className="container-sm" style={{maxWidth: 750, textAlign: "justify"}}>
          Thanks for completing this module! Please fill out this exit ticket and feedback survey to self-assess learning outcomes and help improve this module!<br/><br />
        </div>
        <Button onClick={openSurvey}>Exit Ticket and Feedback Survey</Button>
        <Modal show={show} onHide={closeSurvey} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <iframe title="E2AI: Exit Ticket and Feedback Survey" src="https://docs.google.com/forms/d/e/1FAIpQLScNfuLRDLLNNKRSLZqzP1l3QLdC-4XfNw31JNyr6MaRGOEtXQ/viewform?embedded=true" width="100%" height="100%" position="relative">Loading…</iframe>
        </Modal>
      </div>
      <hr style={{margin: 0}} className="border border-2 "/>
      <div className="footer">
        Designed and Developed by <a href="https://ynshah3.github.io" className="link-offset-3 footer-link">Yash Shah</a>
      </div>
    </div>
  );
};

export default CNN;