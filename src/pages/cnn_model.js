import React, { useState } from "react";
import {Tab, Tabs} from 'react-bootstrap';


const CNNModel = () => {

  // const [face_path, set_face_path] = useState("face_original")

  // const handleChange = (e) => {
  //   if (face_path === "face") {
  //     set_face_path("face_original")
  //   } else {
  //     set_face_path("face")
  //   }
  // }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Inside the Model!</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <div style={{textAlign: "justify"}}>
          AI Literacy necessitates understanding of how models work "under-the-hood" so we can critically examine and address areas of issues and needs for improvement, and question the model's interaction with people, society, and the environment.
          <br /><br />
          <img src="arch.png" alt="model architecture" className="img-fluid" width="100%" />
          <br /><br />
          Here, YuNet is an efficient millisecond-level face detector designed specifically for edge devices, with its authors claiming that it has the best accuracy-speed tradeoff [7].<br/><br/>
          Number of learnable parameters in the AlexNet model: 61,100,840<br />
          Number of parameters in the pre-trained YuNet model: 75, 856<br />
        </div>
        <Tabs
          defaultActiveKey="convolution"
          id="dataset-tabs"
          className="mb-3"
          style={{alignContent: "center", marginTop: 30}}
        >
          <Tab eventKey="convolution" title="Convolution" key={"tab-0"}>
            <div>
              
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
