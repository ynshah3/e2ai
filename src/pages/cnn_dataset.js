import React, { useState } from "react";
import {Tab, Tabs, Form} from 'react-bootstrap';


const CNNDataset = () => {
  const classes = [
    ['Goldfish', 'goldfish'],
    ['Bullet Train', 'bullet_train'],
    ['Chihuahua', 'chihuahua'],
    ['Lemon', 'lemon'],
    ['Comic Book', 'comic_book'],
    ['Lion', 'lion'],
    ['Dinner Table', 'dinner_table'],
    ['Pizza', 'pizza'],
    ['School Bus', 'school_bus'],
  ]

  const images = [...Array(100).keys()]

  const [face_path, set_face_path] = useState("face_original")

  const handleChange = (e) => {
    if (face_path === "face") {
      set_face_path("face_original")
    } else {
      set_face_path("face")
    }
  }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Explore The Dataset</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <figure class="text-center">
          <blockquote class="blockquote">
            <p>AI brings educational technology to an inflection point. We can either increase disparities or shrink them, depending on what we do now</p>
          </blockquote>
          <figcaption class="blockquote-footer">
            Dr. Russell Shilling
          </figcaption>
        </figure>
        <div style={{textAlign: "justify"}}>
          The first step towards using AI for any task is to "become one with the data" [2]. Not only does a diverse training dataset help the model learn more discriminatory features that generalize better and more accurately to the diversity found in the real world [3], but it also addresses issues around racial equity and unfair bias ("algorithmic bias") [4]. Exploring the dataset--the different categories, and human or machine-generated annotations--is critical, especially when we use "off-the-shelf" models not trained by us. Detailing "A Human Rights Approach to AI", UNESCO advocates for <em>Right to Privacy and Data Protection</em>, <em>Transparency and Explainability</em>, and <em>Fairness and Non-Discrimination</em>, among others [5]. One way in which privacy can be established is by blurring identifiable facial features prior to training, although a more robust-to-attacks solution would require addressing privacy in the camera hardware itself [6].
          <br /><br />
          Below are 100 out of the 500 images (representative) from every category:
        </div>
        <Tabs
          defaultActiveKey="face"
          id="dataset-tabs"
          className="mb-3"
          style={{alignContent: "center", marginTop: 30}}
        >
          <Tab eventKey="face" title="Face" key={"tab-0"}>
            <div>
              <Form.Check
                type="switch"
                id="blur-switch"
                label={face_path === "face_original" ? "Blur Faces" : "Un-Blur Faces"}
                onClick={handleChange}
                style={{textAlign: "left", margin: 20}}
              />
              {images.map((img, j) =>
                <img src={"images/" + face_path + "/" + j + ".jpg"} className="img-fluid" alt={"Face image " + j} key={"Face-image-" + j} width="50" />
              )}
            </div>
          </Tab>
          {classes.map((cls, i) => 
            <Tab eventKey={cls[1]} title={cls[0]} key={"tab-" + (i + 1)}>
              <div>
                {images.map((img, j) =>
                  <img src={"images/" + cls[1] + "/" + j + ".jpg"} className="img-fluid" alt={cls[0] + " image " + j} key={cls[0] + "-image-" + j} width="50" />
                )}
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default CNNDataset;
