import React, { useEffect, useState } from "react";
import { Form, Button, Image } from 'react-bootstrap';
import { loadDataset, train } from "../functions/trainClassifier";
import { loadSmall, loadBase, loadLeNet, loadAlexNet } from "../functions/trainClassifier";


const CNNTrain = ({setClassifier, setDataset}) => {
  const [data, setData] = useState(undefined)
  const [batchSize, setBatchSize] = useState(32);
  const [epochs, setEpochs] = useState(10);
  const [lr, setLr] = useState(0.001);
  const [model, setModel] = useState("small")

  useEffect(() => {
    document.getElementById("train").disabled = true;
    document.getElementById("select-model").disabled = true;
    document.getElementById("select-lr").disabled = true;
    document.getElementById("select-bz").disabled = true;
    document.getElementById("select-epochs").disabled = true;
  }, [])

  async function handleLoad() {
    loadDataset().then((dataset) => {
      setData(dataset);
      setDataset(dataset);
      document.getElementById("train").disabled = false;
      document.getElementById("select-model").disabled = false;
      document.getElementById("select-lr").disabled = false;
      document.getElementById("select-bz").disabled = false;
      document.getElementById("select-epochs").disabled = false;
      document.getElementById("loaddm").disabled = true;
    });
  }

  async function handleClick(e) {
    e.preventDefault();
    document.getElementById("train").disabled = true;

    let clf;
    if (model === "small") clf = await loadSmall();
    else if (model === "base") clf = await loadBase();
    else if (model === "lenet") clf = await loadLeNet();
    else clf = await loadAlexNet();

    clf = await train(data, clf, batchSize, epochs, lr);
    setClassifier(clf);
    document.getElementById("train").disabled = false;
  }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Training the Model</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          Now that we have looked over the dataset and understood how different layers in the model work, let's finally train a classifier on it! We will be working with four different models: a 2 convolutional-layered network, a 3 convolutional-layered network, <a href="http://vision.stanford.edu/cs598_spring07/papers/Lecun98.pdf">LeNet</a>, and <a href="https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf">AlexNet</a>; and three <a href="https://d2l.ai/chapter_hyperparameter-optimization/hyperopt-intro.html">hyperparameters</a>, i.e., variables that we will try to find the best values for so that the classifier performs best on unseen images according to some metric: <span className="emph">learning rate</span> of the optimizer, <span className="emph">batch size</span> for inputs, and <span className="emph">number of epochs</span> (complete passes over the dataset while training). Since our dataset comprises of a total of 500 images, we will randomly choose 400 of them for training and the rest for validating classifier performance (which will be unseen during training and be an indicator of performance generalization).
          <br /><br />
        </div>
        <div>
          <Form style={{textAlign: "left"}}>
            <button id="loaddm" className="random-img-gen" onClick={handleLoad}>Load Dataset</button><br/>
            <Image src={model + ".png"} alt="Model architecture" height={300} /><br/><br/>
            <label style={{marginRight: 15}}>Model:</label>
            <select id="select-model" aria-label="Model" value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="small">2 Convolutional Layered Model</option>
              <option value="base">3 Convolutional Layered Model</option>
              <option value="lenet">LeNet</option>
              <option value="alexnet">AlexNet</option>
            </select>
            <br/>
            <label style={{marginRight: 15, marginTop: 5}}>Learning Rate:</label>
            <select id="select-lr" aria-label="Learning rate" value={lr} onChange={(e) => setLr(e.target.value)}>
              <option value={0.01}>0.01</option>
              <option value={0.001}>0.001</option>
              <option value={0.0001}>0.0001</option>
              <option value={0.00001}>0.00001</option>
            </select>
            <br/>
            <label style={{marginRight: 15, marginTop: 5}}>Batch Size:</label>
            <select id="select-bz" aria-label="Batch Size" value={batchSize} onChange={(e) => setBatchSize(e.target.value)}>
              <option value={32}>32</option>
              <option value={64}>64</option>
              <option value={128}>128</option>
              <option value={256}>256</option>
            </select>
            <br/>
            <label style={{marginRight: 15, marginTop: 5}}>Epochs:</label>
            <select id="select-epochs" aria-label="Epochs" value={epochs} onChange={(e) => setEpochs(e.target.value)}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <br/>
          </Form>
        </div>
        <div style={{textAlign: "justify", marginTop: 30}}>
          Metrics that we will look at are:
          <div>
            [1] <span className="emph">Loss</span>: Measure of the "cost" associated with trying to bring classifier predictions closer to actual image labels. Loss values should go down while training!<br/>
            [2] <span className="emph">Accuracy</span>: Fraction of images the classifier gets correct. Accuracy should go up while training!<br/>
          </div>
          <br/>
          When analyzing model performance, pay attention to how the validation set loss and accuracy curves behave. Do they behave similarly as the training set curves? Is there a prominent gap between the two? The closer the validation loss and accuracy curves are to their training set counterparts, the better the model performs&#8212;it hasn't <a href="https://docs.aws.amazon.com/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html">overfit</a> (started to memorized training data) or <a href="https://docs.aws.amazon.com/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html">underfit</a> (too simple to learn training data features)!
          <br /><br/>
          To open or close the visualization pane, press <tt>~</tt>. It might take a moment before you see anything happen after clicking on the "Train" button.
          <br/>
          <Button id="train" onClick={handleClick} style={{marginTop: 20}}>Train Classifier!</Button>
        </div>
      </div>
    </div>
  );
};

export default CNNTrain;