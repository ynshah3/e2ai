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
        Rectified Linear Unit (ReLU) is a nonlinear activation function that allows neural networks to model nonlinear relationships between variables in the dataset. Rectifiers are also biologically-plausible because they introduce sparsity in activations, similar to <a href="https://proceedings.mlr.press/v15/glorot11a.html">sparse neuronal coding</a> observed in the brain.<br /><br />
        For any input <tt>x</tt>, <tt>ReLU(x) = max(0, x)</tt><br/><br/>
        To see this in action, choose a threshold <tt>T</tt> between 0 and 255. All pixels lesser than <tt>T</tt> will be clipped to equal <tt>T</tt>, effectively preventing the model from learning anything useful from them. This is implemented through the expression: <tt>pixel = ReLU(pixel - T) + T</tt>.
      </div>
      <Form style={{display: "flex", justifyContent: "center"}}>
        <Form.Control type="number" name="N" value={value} onChange={handleChange} min={0} max={255} style={{width: 100, margin: 20}} />
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