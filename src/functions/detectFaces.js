import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';


export async function detectFaces(img) {
  const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
  const detectorConfig = {
    runtime: 'tfjs',
  }

  const detector = await faceDetection.createDetector(model, detectorConfig);

  const faces = await detector.estimateFaces(img);
  
  if (faces.length > 0) {
    document.getElementById("has-faces").style.display = 'block';
  }
}