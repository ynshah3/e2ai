function random(quantity, max){
  const set = new Set()
  while(set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1)
  }
  return set
}

export async function reluImage(N) {
  const set = random(N, 40000)
  
  const inctx = document.getElementById("inrelu").getContext('2d');
  const pix = inctx.getImageData(0, 0, 200, 200)
  
  const outctx = document.getElementById("outrelu").getContext('2d', {willReadFrequently: true});
  const resultpix = outctx.getImageData(0,0,200,200)

  for (let i = 0; i < 160000; ++i) {
    resultpix.data[i] = pix.data[i];
  }

  for (const address of set) {
    resultpix.data[address*4] = 0
    resultpix.data[address*4 + 1] = 0
    resultpix.data[address*4 + 2] = 0
    resultpix.data[address*4 + 3] = 255
  }

  outctx.putImageData(resultpix,0,0);

  document.getElementById("spnrelu").style.display = "none";
  document.getElementById("outrelu").style.display = "block";
}