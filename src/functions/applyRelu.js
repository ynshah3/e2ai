export async function reluImage(N) {
  const inctx = document.getElementById("inrelu").getContext('2d');
  const pix = inctx.getImageData(0, 0, 200, 200)
  
  const outctx = document.getElementById("outrelu").getContext('2d', {willReadFrequently: true});
  const resultpix = outctx.getImageData(0,0,200,200)

  for (let i = 0; i < 160000; ++i) {
    if (pix.data[i] < N) {
      resultpix.data[i] = N
    } else {
      resultpix.data[i] = pix.data[i];
    }
  }

  outctx.putImageData(resultpix,0,0);

  document.getElementById("spnrelu").style.display = "none";
  document.getElementById("outrelu").style.display = "block";
}