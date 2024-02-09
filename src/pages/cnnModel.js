import React from "react";
import { Tab, Tabs } from 'react-bootstrap';
import CNNModelConvolution from "./cnnModelConvolution";
import CNNModelRelu from "./cnnModelRelu";
import CNNModelPooling from "./cnnPooling";


const CNNModel = () => {
  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Inside the Model!</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          AI Literacy necessitates understanding of how models work "under-the-hood" so we can critically examine and address areas of issues and needs for improvement, and question the model's interaction with people, society, and the environment. The pipeline for image classification used in this module is:
          <br /><br />
          <img src="arch.png" alt="model architecture" className="img-fluid" width="100%" />
          <br /><br />
          Here, BlazeFace is a lightweight, sub-millisecond face detector designed specifically for mobile inference [9]. We will be using a pre-trained MobileNet V3 backbone [11] and train a Classifier Head for image classification.<br/><br/>
          Go through the following tabs to learn about convolutions, non-linearities, and pooling that are used by these models:<br/>
        </div>
        <Tabs
          defaultActiveKey="convolution"
          id="dataset-tabs"
          className="mb-3"
          style={{alignContent: "center", marginTop: 20}}
        >
          <Tab eventKey="convolution" title="Convolution" key={"tab-0"}>
            <CNNModelConvolution />
          </Tab>
          <Tab eventKey="relu" title="ReLU" key={"tab-1"}>
            <CNNModelRelu />
          </Tab>
          <Tab eventKey="maxpool" title="Pooling" key={"tab-2"}>
            <CNNModelPooling />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CNNModel;