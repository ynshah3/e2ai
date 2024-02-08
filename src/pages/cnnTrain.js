import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { train } from "../functions/trainClassifier";


const CNNTrain = ({classifier, images, targets, setHead}) => {
  const [batchSize, setBatchSize] = useState(32);
  const [epochs, setEpochs] = useState(10);
  const [lr, setLr] = useState(0.0001);

  useEffect(() => {
    if (classifier && images && targets) {
      document.getElementById("train").disabled = false;
      document.getElementById("select-lr").disabled = false;
      document.getElementById("select-bz").disabled = false;
      document.getElementById("select-epochs").disabled = false;
    } else {
      document.getElementById("train").disabled = true;
      document.getElementById("select-lr").disabled = true;
      document.getElementById("select-bz").disabled = true;
      document.getElementById("select-epochs").disabled = true;
    }
  }, [classifier, images, targets])

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
          Now that we have looked over the dataset and understood how different layers in the model work, let's finally train a classifier on it! We will be working with three hyperparameters, i.e., variables that we will try to find the best values for so that the classifier performs best on unseen images according to some metric: <span className="emph">learning rate</span>, <span className="emph">batch size</span>, and <span className="emph">number of epochs</span>. Since our dataset comprises of a total of 500 images, we will randomly choose 400 of them for training and the rest for validating classifier performance.
          <br /><br />
          Three metrics that we will look at are:
          <div>
            [1] <span className="emph">Accuracy</span>: Fraction of validation images the classifier got correct.<br/>
            [2] <span className="emph">Precision</span>: Out of all validation images the classifier deemed as belonging to a certain class, the fraction of images that indeed belong to that class.<br/>
            [3] <span className="emph">Recall</span>: Out of all validation images belonging to a certain class, the fraction of images the classifier deemed as belonging to that class.<br/>
          </div>
          <br/>
        </div>
        <div>
          <Form>
            <Row>
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
              <Col xs lg="2">
                <Button id="train" onClick={handleClick}>Train!</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div id="train-logs" style={{marginTop: 30, textAlign: "left", color: "#226c1f", display: "none", fontWeight: 500}}>
        </div>
      </div>
    </div>
  );
};

export default CNNTrain;