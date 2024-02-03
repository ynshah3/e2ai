import React, { useEffect, useState, useRef } from "react";
import { Tab, Tabs, Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { processImage } from "../functions/applyConvolution";
import { VerticalFilter, LineFilter, DiagonalFilter, CircularFilter } from "../functions/filterBank";


const CNNModel = () => {
  const [filter, setFilter] = useState(undefined)
  const refs = useRef([]);

  const draw = async (context) => {
    const image = new Image();
    image.src = "test.jpg";
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
  };

  useEffect(() => {
    const context = refs.current[0].getContext('2d')
    draw(context);
  }, [])

  const handleClick = (e) => {
    setFilter(e)
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
      }
      document.getElementById("spn").style.display = "inline-block";
      document.getElementById("trsfm").style.display = "none";
      setTimeout(() => processImage(refs, kernel), 1000);
    }
  }, [filter])

  const Matrix = (kernel, e) => {
    const arr = kernel.weightArray;
    return <table onClick={() => handleClick(e)}><tbody>
      <tr><td>{arr[0][0]}</td><td>{arr[0][1]}</td><td>{arr[0][2]}</td></tr>
      <tr><td>{arr[1][0]}</td><td>{arr[1][1]}</td><td>{arr[1][2]}</td></tr>
      <tr><td>{arr[2][0]}</td><td>{arr[2][1]}</td><td>{arr[2][2]}</td></tr>
      </tbody></table>
  }


  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Inside the Model!</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          AI Literacy necessitates understanding of how models work "under-the-hood" so we can critically examine and address areas of issues and needs for improvement, and question the model's interaction with people, society, and the environment.
          <br /><br />
          <img src="arch.png" alt="model architecture" className="img-fluid" width="100%" />
          <br /><br />
          Here, YuNet is an efficient millisecond-level face detector designed specifically for edge devices, with its authors claiming that it has the best accuracy-speed tradeoff [9].<br/><br/>
        </div>
        <Tabs
          defaultActiveKey="convolution"
          id="dataset-tabs"
          className="mb-3"
          style={{alignContent: "center", marginTop: 30}}
        >
          <Tab eventKey="convolution" title="Convolution" key={"tab-0"}>
            <div>
              <div style={{textAlign: "justify", marginBottom: 20}}>
                A convolution between an image and a filter is defined as the sliding of the filter over the image from left to right and top to bottom, with elementwise multiplication of the part of the image contained in the convolution window with the filter and summing up the resulting values to give a single scalar value [1].<br /><br />
                Click on the below filters to see what happens when they are convolved over the image:
              </div>
              <ButtonGroup>
                <Button variant="secondary" onClick={() => handleClick("filter1")}>{Matrix(VerticalFilter, "filter1")}</Button>
                <Button variant="secondary" onClick={() => handleClick("filter2")}>{Matrix(LineFilter, "filter2")}</Button>
                <Button variant="secondary" onClick={() => handleClick("filter3")}>{Matrix(DiagonalFilter, "filter3")}</Button>
                <Button variant="secondary" onClick={() => handleClick("filter4")}>{Matrix(CircularFilter, "filter4")}</Button>
              </ButtonGroup>
              <br /><br />
              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <canvas ref={input => refs.current[0] = input} height={200} width={200} style={{marginRight: 30}} />
                <canvas id="trsfm" ref={output => refs.current[1] = output} height={200} width={200} style={{display: "none"}} />
                <Spinner id="spn" style={{display: "none"}} />
              </div>
            </div>
          </Tab>
          <Tab eventKey="relu" title="ReLU" key={"tab-1"}>
            <div>
              
            </div>
          </Tab>
          <Tab eventKey="maxpool" title="Max Pooling" key={"tab-2"}>
            <div>
              
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CNNModel;