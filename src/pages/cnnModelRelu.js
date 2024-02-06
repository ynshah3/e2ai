import React, { useEffect, useState } from "react";
import { Button, Spinner, Form } from 'react-bootstrap';
import { reluImage } from "../functions/applyRelu";


const CNNModelRelu = () => {
  const [value, setValue] = useState(0)

  const draw = async (context) => {
    const image = new Image();
    image.src = "test.jpg";
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
  };

  useEffect(() => {
    const context = document.getElementById("inrelu").getContext('2d', {willReadFrequently: true});
    draw(context);
  }, [])

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("spnrelu").style.display = "inline-block";
    document.getElementById("outrelu").style.display = "none";
    setTimeout(() => reluImage(value), 1000)
  }


  return (
    <div>
      <div style={{textAlign: "justify"}}>
        Rectified Linear Unit (ReLU) is a nonlinear activation function that allows neural networks to model nonlinear relationships between variables in the dataset. Rectifiers are also biologically-plausible because they introduce sparsity in activations, similar to sparse neuronal coding observed in the brain [10].<br /><br />
        For any input <tt>x</tt>, <tt>ReLU(x) = max(0, x)</tt><br/><br/>
        To see this in action, choose a number <tt>N</tt> between 0 and 40000 (larger the better to see a more pronounced effect). This will randomly turn <tt>N</tt> pixels in the below <tt>200 x 200</tt> image negative. Applying the ReLU function on it should then just zero out the negative pixels and keep the positive ones as they are.
      </div>
      <Form style={{display: "flex", justifyContent: "center"}}>
        <Form.Control type="number" name="N" value={value} onChange={handleChange} min={0} max={40000} style={{width: 100, margin: 20}} />
        <Button variant="primary" type="submit" onClick={handleSubmit} style={{margin: 20}}>
          ReLU!
        </Button>
      </Form>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
        <canvas id="inrelu" height={200} width={200} style={{margin: "0 20px 30px 20px"}} />
        <canvas id="outrelu" height={200} width={200} style={{display: "none", margin: "0 20px 30px 20px"}} />
        <Spinner id="spnrelu" style={{display: "none"}} />
      </div>
    </div>
  );
};

export default CNNModelRelu;