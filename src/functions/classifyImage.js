import * as tf from '@tensorflow/tfjs';


export async function classifyImage(classifier, head, img) {
  const classes = ["church", "face", "fish", "dog", "parachute"];

  for (let i = 0; i < 5; i++) {
    document.getElementById(classes[i]).classList.remove("emph");
  }
  const imgFeatures = tf.tidy(function() {
    const imgTensor = tf.browser.fromPixels(img).toFloat().div(255.0);
    return classifier.predict(imgTensor.expandDims()).squeeze();
  });

  const prediction = head.predict(imgFeatures.expandDims()).squeeze();
  const predictionArray = prediction.arraySync();
  const highestIndex = prediction.argMax().arraySync();

  for (let i = 0; i < 5; i++) {
    document.getElementById(classes[i]).innerHTML = predictionArray[i].toFixed(3);
  }
  
  document.getElementById(classes[highestIndex]).classList.add("emph");

  document.getElementById("output-spn").style.display = "none";
  document.getElementById("pred").style.display = "block";
  document.getElementById("ps").style.display = "block";
}