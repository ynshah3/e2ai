// Taken from https://blog.j2i.net/2017/11/25/kernel-filters-in-htmljavascript/

export async function convolveImage(kernelFilter) {
  const inctx = document.getElementById("inconv").getContext('2d');
  const pix = inctx.getImageData(0, 0, 200, 200)
  var getPix = async function(x,y) {
    x = Math.max(0, Math.min(x, 200-1));
    y = Math.max(0, Math.min(y, 200-1));
    var address = (y*200+x)*4;
    return [pix.data[address+0], pix.data[address+1], pix.data[address+2], pix.data[address+3]];
  }

  var getFilteredPix = async function(x,y) {
    var retVal = [0,0,0,0];
    for(var fy=0;fy<kernelFilter.height;++fy) {
      for(var fx=0;fx<kernelFilter.width;++fx) {
        var m = kernelFilter.weightArray[fy][fx];
        var pix = await getPix(x+fx-kernelFilter.centerX, y+fy-kernelFilter.centerY);
        retVal[0]+=pix[0]*m;
        retVal[1]+=pix[1]*m;
        retVal[2]+=pix[2]*m;
      }
    }
    retVal[3]=255;
    return retVal;
  }

  const outctx = document.getElementById("outconv").getContext('2d', {willReadFrequently: true});
  const resultpix = outctx.getImageData(0,0,200,200)

  for(var yPos=0;yPos<200;++yPos) {
    for(var xPos=0;xPos<200;++xPos) {
      var modifiedPix = await getFilteredPix(xPos, yPos);
      var address = (yPos*200+xPos)*4;
      resultpix.data[address+0]=Math.floor(modifiedPix[0+0]);
      resultpix.data[address+1]=Math.floor(modifiedPix[0+1]);
      resultpix.data[address+2]=Math.floor(modifiedPix[0+2]);
      resultpix.data[address+3]=Math.floor(modifiedPix[0+3]);
    }
  }

  outctx.putImageData(resultpix,0,0);

  document.getElementById("spnconv").style.display = "none";
  document.getElementById("outconv").style.display = "block";
}