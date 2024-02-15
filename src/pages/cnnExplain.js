import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { clfParams, confMatrix, conv2d1ActivationTable, denseActivationTable, getExamples } from "../functions/explainClassifier";


const CNNExplain = ({classifier, dataset}) => {
  const [layers, setLayers] = useState([]);
  const [examples, setExamples] = useState(undefined);

  useEffect(() => {
    if (classifier) {
      for (let i = 1; i <= 5; i++) {
        document.getElementById("conv" + i.toString() + "-act").style.display = "none";
      }
      document.getElementById("dense-act").style.display = "none";

      getExamples(dataset).then(ex => setExamples(ex));

      let l = []
      for (let i = 0; i < classifier.layers.length; i++) {
        const layerName = classifier.layers[i].name;
        if (layerName.startsWith('conv')) {
          l.push(layerName);
          document.getElementById("conv" + (l.length).toString() + "-act").style.display = "block";
        }
      }
      l.push(classifier.layers[classifier.layers.length - 1].name);
      setLayers(l);

      document.getElementById("model-params").disabled = false;
      document.getElementById("conf-matrix").disabled = false;
      document.getElementById("dense-act").style.display = "block";
    } else {
      document.getElementById("model-params").disabled = true;
      document.getElementById("conf-matrix").disabled = true;
    }
  }, [classifier, dataset, layers.length])

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Model Explainability</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          We've trained a model, and maybe it performs decently well. But what exactly has it learned? How "good" is it? Can we try to interpret the decisions/predictions that the model makes? We'll try to answer these in this section!<br /><br />
        </div>
        <h4 className="display-8">Model Parameters</h4>
        <div style={{textAlign: "justify"}}>
          Model size, especially <a href="https://arxiv.org/pdf/1409.4842.pdf">model depth</a>, has a huge impact on model performance. This is because more parameters are at the model's disposal for learning useful information from the dataset. However, training huge models with millions or billions of parameters requires access to a large number of GPUs and compute power, often accessible to large corporations only. <a href="https://www.unesco.org/en/artificial-intelligence">UNESCO</a> stresses on assessing AI technologies "against their impacts on sustainability, understood as a set of constantly evolving goals including those set out in the UN's Sustainable Development Goals".
          Click on the button below to see the number of parameters in every layer of the model you trained above.<br/><br/>
          <button id="model-params" className="random-img-gen" onClick={() => clfParams(classifier)}>Model Summary</button>
        </div>
        <h4 className="display-8">Confusion Matrix</h4>
        <div style={{textAlign: "justify"}}>
          A confusion matrix is a square matrix that quantifies how "confused" the model gets on various classes. Each row represents the number of images belonging to an actual category, whereas each column represents the number of images belonging to a category predicted by the model. For example, the "face" row and "dog" column denotes the number of images that belong to the "face" category but the model predicted as belonging to the "dog" category. Stop and think about why having large numbers along the main diagonal of the matrix makes sense! Is there a category the model gets most confused on? And why might that be now that you know the dataset it was trained on?<br/><br/>
          <button id="conf-matrix" className="random-img-gen" onClick={() => confMatrix(classifier, dataset)}>Confusion Matrix</button>
        </div>
        <h4 className="display-8">Model Activations</h4>
        <div style={{textAlign: "justify"}}>
          Similar to how neurons in the brain get excited/activated by certain stimuli, units in the convolutional layers of our model also get activated by different parts of an image, capturing various information from them. We can visualize the activations of the units in these different convolutional layers and try to make sense of what the model might be doing "behind-the-scene".<br/><br/> As a reference, below visualized are the filters and activations of the first convolutional layer of AlexNet that has been trained on the entire 1000 classes of ImageNet for hundreds of epochs. How do the filters and activations differ from the filters we saw when we learned about convolutions above?<br/><br/>
          <Image src='activations.png' className='img-fluid' alt='activations and filters' /><br/><br/>
          <button id="conv1-act" className="random-img-gen" onClick={() => conv2d1ActivationTable(classifier, examples, layers[0])} style={{display: "none", marginBottom: 5}}>Convolutional Layer #1</button>
          <button id="conv2-act" className="random-img-gen" onClick={() => conv2d1ActivationTable(classifier, examples, layers[1])} style={{display: "none", marginBottom: 5}}>Convolutional Layer #2</button>
          <button id="conv3-act" className="random-img-gen" onClick={() => conv2d1ActivationTable(classifier, examples, layers[2])} style={{display: "none", marginBottom: 5}}>Convolutional Layer #3</button>
          <button id="conv4-act" className="random-img-gen" onClick={() => conv2d1ActivationTable(classifier, examples, layers[3])} style={{display: "none", marginBottom: 5}}>Convolutional Layer #4</button>
          <button id="conv5-act" className="random-img-gen" onClick={() => conv2d1ActivationTable(classifier, examples, layers[4])} style={{display: "none", marginBottom: 5}}>Convolutional Layer #5</button>
          <button id="dense-act" className="random-img-gen" onClick={() => denseActivationTable(classifier, examples, layers[layers.length - 1])} style={{display: "none"}}>Final Dense Layer</button>
        </div>
      </div>
    </div>
  );
};

export default CNNExplain;