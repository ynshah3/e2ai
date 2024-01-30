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
          AI Literacy necessitates understanding of how models work "under-the-hood" so we can critically examine and question areas of issues, needs for improvement, and the model's interaction with people, society, and the environment.

        </div>
        <Tabs
          defaultActiveKey="face"
          id="dataset-tabs"
          className="mb-3"
          style={{alignContent: "center", marginTop: 30}}
        >
          <Tab eventKey="face" title="Face" key={"tab-0"}>
            <div>
              
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CNNModel;
