import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { loadDataset, train, loadClassifier } from "../functions/trainClassifier";


const CNNTrain = ({setClassifier, setHead}) => {
  const [images, setImages] = useState(undefined)
  const [targets, setTargets] = useState(undefined)
  const [batchSize, setBatchSize] = useState(128);
  const [epochs, setEpochs] = useState(20);
  const [lr, setLr] = useState(0.0001);

  useEffect(() => {
    document.getElementById("train").disabled = true;
    document.getElementById("select-lr").disabled = true;
    document.getElementById("select-bz").disabled = true;
    document.getElementById("select-epochs").disabled = true;
  }, [])

  async function handleLoad() {
    document.getElementById("loaddmspn").style.display = "inline";
    loadClassifier().then((classifier) => {
      setClassifier(classifier);
      loadDataset(classifier).then((dataset) => {
        setImages(dataset[0]);
        setTargets(dataset[1]);
        document.getElementById("loaddmspn").style.display = "none";
        document.getElementById("train").disabled = false;
        document.getElementById("select-lr").disabled = false;
        document.getElementById("select-bz").disabled = false;
        document.getElementById("select-epochs").disabled = false;
      });
    });
    document.getElementById("loaddm").disabled = true;
  }

  async function handleClick(e) {
    e.preventDefault();
    document.getElementById("train").disabled = true;
    let head = await train(images, targets, batchSize, epochs, lr);
    setHead(head);
    document.getElementById("train").disabled = false;
  }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Training the Model</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Now that we have looked over the dataset and understood how different layers in the model work, let's finally train a classifier on it! We will be working with three hyperparameters, i.e., variables that we will try to find the best values for so that the classifier performs best on unseen images according to some metric: <span className="emph">learning rate</span> of the optimizer, <span className="emph">batch size</span> for inputs, and <span className="emph">number of epochs</span> (complete passes over the dataset while training). Since our dataset comprises of a total of 500 images, we will randomly choose 400 of them for training and the rest for validating classifier performance (unseen during training).
          <br /><br />
          Metrics that we will look at are:
          <div>
            [1] <span className="emph">Loss</span>: Measure of the "cost" associated with trying to bring classifier predictions closer to actual image labels. Loss values should go down while training!<br/>
            [2] <span className="emph">Accuracy</span>: Fraction of images the classifier gets correct. Accuracy should go up while training!<br/>
            [3] <span className="emph">Confusion Matrix</span>: A square matrix that quantifies how "confused" the model gets on various classes. For example, the "face" row tells us about the number of images the model predicts as belonging to classes listed as columns when they were, in actuality, images of "faces". Think about why having large numbers along the diagonal make sense!<br/>
          </div>
          <br/>
          When analyzing model performance, keep in mind that you should be focusing more on the validation set loss and accuracy since these inputs were unseen by the model during training, revealing if the model has generalization capabilities. The closer the validation loss and accuracy curves are to their training set counterparts, the better the model performs (it hasn't overfit or underfit)!
          <br /><br/>
          To open or close the visualization pane, press <tt>~</tt>. It might take a moment before you see anything happen after clicking on the "Train" button.
          <br/><br/>
        </div>
        <div>
          <Form style={{textAlign: "left"}}>
            <Row>
              <Col xs lg="4"><Button id="loaddm" onClick={handleLoad}>Load Dataset and MobileNet</Button></Col>
              <Col xs lg="2" style={{justifyContent: "left"}}><Spinner id="loaddmspn" style={{display: "none"}} /></Col>
            </Row>
            <Row style={{marginTop: 15}}>
              <Col xs lg="2">
                <Form.Group controlId="select-lr">
                  <Form.Label>Learning Rate</Form.Label>
                  <Form.Select aria-label="Learning rate" value={lr} onChange={(e) => setLr(e.target.value)}>
                    <option value={0.01}>0.01</option>
                    <option value={0.001}>0.001</option>
                    <option value={0.0001}>0.0001</option>
                    <option value={0.00001}>0.00001</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs lg="2">
                <Form.Group controlId="select-bz">
                  <Form.Label>Batch Size</Form.Label>
                  <Form.Select aria-label="Learning rate" value={batchSize} onChange={(e) => setBatchSize(e.target.value)}>
                    <option value={32}>32</option>
                    <option value={64}>64</option>
                    <option value={128}>128</option>
                    <option value={256}>256</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs lg="2">
                <Form.Group controlId="select-epochs">
                  <Form.Label>Epochs</Form.Label>
                  <Form.Select aria-label="Learning rate" value={epochs} onChange={(e) => setEpochs(e.target.value)}>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs lg="3" style={{alignItems: "flex-end"}}>
                <Button id="train" onClick={handleClick}>Train Classifier Head!</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div id="train-logs" style={{marginTop: 30, textAlign: "left", color: "#226c1f", fontWeight: 500}}>
        </div>
      </div>
    </div>
  );
};

export default CNNTrain;