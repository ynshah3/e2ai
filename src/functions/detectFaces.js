import * as faceDetection from '@tensorflow-models/face-detection';


export async function loadDetector() {
  const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      runtime: 'tfjs',
    }

    return await faceDetection.createDetector(model, detectorConfig);
}

export async function detectFaces(detector, img) {

  const faces = await detector.estimateFaces(img);
  
  if (faces.length > 0) {
    document.getElementById("has-faces").style.display = 'block';
  }
}