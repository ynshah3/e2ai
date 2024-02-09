import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';


export async function loadDataset(classifier) {
  let classes = ['church', 'face', 'fish', 'dog', 'parachute'];
  let images = []
  let targets = []
  
  classes.forEach((cls, idx) => {
    for (let i=0; i < 100; i++) {
      const im = new Image();
      im.src = 'images/' + cls + '/' + i.toString() + '.jpeg';
      im.onload = () => {
        let imgFeature = tf.tidy(function() {
          let imgTensor = tf.browser.fromPixels(im);
          imgTensor = tf.div(imgTensor, 255.0);
          return classifier.predict(imgTensor.expandDims()).squeeze();
        });

        images.push(imgFeature);
        targets.push(idx);
      }
    }
  });

  return [images, targets];
}


export async function loadClassifier() {
  const URL = 
    'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1';
  
  let mobilenet = await tf.loadGraphModel(URL, {fromTFHub: true});

  tf.tidy(function () {
    mobilenet.predict(tf.zeros([1, 224, 224, 3]));
  });

  return mobilenet;
}


export async function train(images, targets, batchSize=32, epochs=15, learningRate=0.001) {
  let logDiv = document.getElementById("train-logs");
  logDiv.innerHTML = "Training...";

  let head = tf.sequential();
  head.add(tf.layers.dense({inputShape: [1024], units: 16, activation: 'relu'}));
  head.add(tf.layers.dense({units: 5, activation: 'softmax'}));

  head.compile({
    optimizer: tf.train.adam(parseFloat(learningRate)),
    loss: 'categoricalCrossentropy', 
    metrics: ['accuracy']  
  });
  
  tf.util.shuffleCombo(images, targets);
  let outputsAsTensor = tf.tensor1d(targets, 'int32');
  let oneHotOutputs = tf.oneHot(outputsAsTensor, 5);
  let inputsAsTensor = tf.stack(images);
  
  try {
    var results = await head.fit(inputsAsTensor, oneHotOutputs, {shuffle: true, batchSize: parseInt(batchSize), epochs: parseInt(epochs), validationSplit: 0.2 });
  } catch(err) {
    console.log(err);
  }

  logDiv.innerHTML += " Done<br>\nVisualizing...";

  const trainLoss = results.history.loss.map((y, x) => ({ x, y, }));
  const trainAcc = results.history.acc.map((y, x) => ({ x, y, }));
  const valLoss = results.history.val_loss.map((y, x) => ({ x, y, }));
  const valAcc = results.history.val_acc.map((y, x) => ({ x, y, }));

  const labels = ['training', 'validation'];
  const losses = { values: [trainLoss, valLoss], series: labels }
  const surface1 = { name: 'Loss versus Epochs', tab: 'Training' };
  tfvis.render.linechart(surface1, losses, {xLabel: 'Epochs', yLabel: 'Loss', zoomToFit: true});

  const accs = { values: [trainAcc, valAcc], series: labels }
  const surface2 = { name: 'Accuracy versus Epochs', tab: 'Training' };
  tfvis.render.linechart(surface2, accs, {xLabel: 'Epochs', yLabel: 'Accuracy', zoomToFit: true});

  const prediction = head.predict(inputsAsTensor).squeeze();
  let highestIndex = prediction.argMax(1)

  const matrix = await tfvis.metrics.confusionMatrix(outputsAsTensor, highestIndex, 5);

  const surface3 = { name: 'Confusion Matrix', tab: 'Evaluation' };
  tfvis.render.confusionMatrix(surface3, {values: matrix, tickLabels: ['church', 'face', 'fish', 'dog', 'parachute']});
      
  tfvis.visor().setActiveTab('Training');
  if (!tfvis.visor().isOpen()) {
    tfvis.visor().open();
  }
  logDiv.innerHTML += " Done";
  outputsAsTensor.dispose();
  oneHotOutputs.dispose();
  inputsAsTensor.dispose();
  
  // await head.save('localstorage://model_head')

  return head;
}
