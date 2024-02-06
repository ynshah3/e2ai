export async function poolImage(func) {
  const inctx = document.getElementById("inpool").getContext('2d');
  const pix = inctx.getImageData(0, 0, 200, 200)

  var getFilteredPix = async function(func, a, b, c, d) {
    if (func === "max") {
      return Math.max(a, b, c, d);
    } else if (func === "min") {
      return Math.min(a, b, c, d);
    } else {
      return (a + b + c + d) / 4;
    }
  }

  const outctx = document.getElementById("outpool").getContext('2d', {willReadFrequently: true});
  const resultpix = outctx.getImageData(0,0,100,100)

  for(var yPos = 0; yPos < 200; yPos += 2) {
    for(var xPos = 0; xPos < 200; xPos += 2) {
      var address = (yPos*200 + xPos)*4;
      var newAddress = (yPos*100 + xPos)*2;
      var nextRowAddress = address + 800;
      var modifiedPix = await getFilteredPix(
        func, pix.data[address+1], pix.data[address+5], pix.data[nextRowAddress+1], pix.data[nextRowAddress+5]
      );
      resultpix.data[newAddress+0]=Math.floor(modifiedPix);
      resultpix.data[newAddress+1]=Math.floor(modifiedPix);
      resultpix.data[newAddress+2]=Math.floor(modifiedPix);
      resultpix.data[newAddress+3]=255;
    }
  }

  console.log(resultpix)

  outctx.putImageData(resultpix,0,0);

  document.getElementById("spnpool").style.display = "none";
  document.getElementById("outpool").style.display = "block";
}