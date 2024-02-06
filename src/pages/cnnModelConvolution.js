import React, { useEffect, useState } from "react";
import { Button, Spinner, Form, Col, Row } from 'react-bootstrap';
import { convolveImage } from "../functions/applyConvolution";
import { VerticalFilter, LineFilter, DiagonalFilter, CircularFilter, Kernel } from "../functions/filterBank";


const CNNModelConvolution = () => {
  const [filter, setFilter] = useState(undefined)
  const [values, setValues] = useState({
    a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0
  })
  const [userKernel, setUserKernel] = useState(undefined);

  const draw = async (context) => {
    const image = new Image();
    image.src = "test.jpg";
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
  };

  useEffect(() => {
    const context = document.getElementById("inconv").getContext('2d', {willReadFrequently: true});
    draw(context);
  }, [])

  const handleClick = (e) => {
    setFilter(e);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var kernel = new Kernel(3, 3);
    kernel.weightArray[0] = [values.a, values.b, values.c];
    kernel.weightArray[1] = [values.d, values.e, values.f];
    kernel.weightArray[2] = [values.g, values.h, values.i];
    setUserKernel(kernel);
    setFilter("custom");
  }

  useEffect(() => {
    if (filter) {
      var kernel;
      if (filter === 'filter1') {
        kernel = VerticalFilter;
      } else if (filter === 'filter2') {
        kernel = LineFilter;
      } else if (filter === 'filter3') {
        kernel = DiagonalFilter;
      } else if (filter === 'filter4') {
        kernel = CircularFilter;
      } else {
        kernel = userKernel;
      }
      document.getElementById("spnconv").style.display = "inline-block";
      document.getElementById("outconv").style.display = "none";
      setTimeout(() => convolveImage(kernel), 1000);
    }
  }, [filter, userKernel])

  const Matrix = (kernel, e) => {
    const arr = kernel.weightArray;
    return <table onClick={() => handleClick(e)}><tbody>
      <tr><td>{arr[0][0]}</td><td>{arr[0][1]}</td><td>{arr[0][2]}</td></tr>
      <tr><td>{arr[1][0]}</td><td>{arr[1][1]}</td><td>{arr[1][2]}</td></tr>
      <tr><td>{arr[2][0]}</td><td>{arr[2][1]}</td><td>{arr[2][2]}</td></tr>
      </tbody></table>
  }


  return (
    <div>
      <div style={{textAlign: "justify", marginBottom: 20}}>
        A convolution between an image and a filter is defined as the sliding of the filter over the image from left to right and top to bottom, with elementwise multiplication of the part of the image contained in the convolution window with the filter and summing up the resulting values to give a single scalar value [1].<br /><br />
        Click on the below <tt>3 x 3</tt> filters to see what happens when they are convolved over the image:
      </div>
      <Button variant="secondary" onClick={() => handleClick("filter1")}>{Matrix(VerticalFilter, "filter1")}</Button>
      <Button variant="secondary" onClick={() => handleClick("filter2")}>{Matrix(LineFilter, "filter2")}</Button>
      <Button variant="secondary" onClick={() => handleClick("filter3")}>{Matrix(DiagonalFilter, "filter3")}</Button>
      <Button variant="secondary" onClick={() => handleClick("filter4")}>{Matrix(CircularFilter, "filter4")}</Button>
      <br /><br />
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
        <canvas id="inconv" height={200} width={200} style={{margin: "0 20px 30px 20px"}} />
        <canvas id="outconv" height={200} width={200} style={{display: "none", margin: "0 20px 30px 20px"}} />
        <Spinner id="spnconv" style={{display: "none"}} />
        <div style={{textAlign: "justify", marginBottom: 20}}>
          Now here's a challenge... the first filter above represents a <em>vertical</em> edge detector (which can be verified from the vertical lines extracted from the image). Try to design a horizontal edge detector and check if the convolved image (shown above) match your expectations!
        </div>
        <Form>
          <Row>
            <Col><Form.Control type="number" name="a" value={values.a} onChange={handleChange} min={-200} max={200} /></Col>
            <Col><Form.Control type="number" name="b" value={values.b} onChange={handleChange} min={-200} max={200} /></Col>
            <Col><Form.Control type="number" name="c" value={values.c} onChange={handleChange} min={-200} max={200} /></Col>
          </Row>
          <Row>
            <Col><Form.Control type="number" name="d" value={values.d} onChange={handleChange} min={-200} max={200} /></Col>
            <Col><Form.Control type="number" name="e" value={values.e} onChange={handleChange} min={-200} max={200} /></Col>
            <Col><Form.Control type="number" name="f" value={values.f} onChange={handleChange} min={-200} max={200} /></Col>
          </Row>
          <Row>
            <Col><Form.Control type="number" name="g" value={values.g} onChange={handleChange} min={-200} max={200} /></Col>
            <Col><Form.Control type="number" name="h" value={values.h} onChange={handleChange} min={-200} max={200} /></Col>
            <Col><Form.Control type="number" name="i" value={values.i} onChange={handleChange} min={-200} max={200} /></Col>
          </Row>
          <Button variant="primary" type="submit" style={{marginTop: 20}} onClick={handleSubmit}>
            Convolve!
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CNNModelConvolution;