import { Tensor, InferenceSession } from "onnxruntime-web";


export async function blurImage(img, setBlurredImg) {
  const yunetUrl = 'yunet.onnx';

  const session = await InferenceSession.create(
    yunetUrl,
    {
      executionProviders: ["webgl"],
    }
  );

  console.log(session);

  const outctx = document.getElementById("blurred-img").getContext('2d', {willReadFrequently: true});
  const resultpix = outctx.getImageData(0,0,224,224)

  for (let i = 0; i < img.data.length; ++i) {
    resultpix.data[i] = img.data[i];
  }

  outctx.putImageData(resultpix,0,0);
  setBlurredImg(resultpix)
  
  document.getElementById("blurred-spn").style.display = "none";
  document.getElementById("blurred-img").style.display = "inline-block";
}