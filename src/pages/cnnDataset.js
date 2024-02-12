import React, { useState } from "react";
import {Tab, Tabs, Form} from 'react-bootstrap';


const CNNDataset = () => {
  const classes = [
    ['Church', 'church'],
    [' Dog', 'dog'],
    ['Face', 'face'],
    ['Fish', 'fish'],
    ['Parachute', 'parachute'],
  ]

  const images = [...Array(100).keys()]

  const [isBlurred, setIsBlurred] = useState("")

  const handleChange = (e) => {
    if (isBlurred === "") {
      setIsBlurred("_blurred")
    } else {
      setIsBlurred("")
    }
  }

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="display-6">Explore The Dataset!</h2>
      <div className="container-sm" style={{marginTop: 50, maxWidth: 800}}>
        <figure className="text-center">
          <blockquote className="blockquote">
            <p>AI brings educational technology to an inflection point. We can either increase disparities or shrink them, depending on what we do now</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Dr. Russell Shilling
          </figcaption>
        </figure>
        <div style={{textAlign: "justify"}}>
          The first step towards using AI for any task is to "<a href="http://karpathy.github.io/2019/04/25/recipe/">become one with the data</a>". Not only does a diverse training dataset help the model learn more discriminatory features that generalize better and more accurately to the <a href="http://dx.doi.org/10.1109/ACCESS.2019.2917620">diversity</a> found in the real world, but it also addresses issues around racial equity and unfair bias ("<a href="https://www2.ed.gov/documents/ai-report/ai-report.pdf">algorithmic bias</a>"). Exploring the dataset--the different categories, and human or machine-generated annotations--is critical, especially when we use "off-the-shelf" models not trained by us. Detailing "A Human Rights Approach to AI", <a href="https://www.unesco.org/en/artificial-intelligence">UNESCO</a> advocates for <em>Right to Privacy and Data Protection</em>, <em>Transparency and Explainability</em>, and <em>Fairness and Non-Discrimination</em>, among others. One way in which privacy can be established is by blurring identifiable facial features prior to training, although a more robust-to-attacks solution would require addressing <a href="http://dx.doi.org/10.1007/978-3-031-19772-7_19">privacy in the camera hardware itself</a>.
          <br /><br />
          Below are 100 out of the 500 images (representative) from every category, taken from <a href="https://image-net.org/static_files/papers/imagenet_cvpr09.pdf">ImageNet</a> and <a href="https://openaccess.thecvf.com/content_CVPR_2019/papers/Karras_A_Style-Based_Generator_Architecture_for_Generative_Adversarial_Networks_CVPR_2019_paper.pdf">Flickr-Faces-HQ</a>:
        </div>
        <Form.Check
          type="switch"
          id="blur-switch"
          label={isBlurred === "" ? "Blur Faces" : "Un-Blur Faces"}
          onClick={handleChange}
          style={{textAlign: "left", fontSize: "1.3rem", color: "#751ae3", margin: "20px 0 0 0"}}
        />
        <Tabs
          defaultActiveKey="face"
          id="dataset-tabs"
          className="mb-3"
          style={{alignContent: "center", marginTop: 30}}
        >
          {classes.map((cls, i) => 
            <Tab eventKey={cls[1]} title={cls[0]} key={"tab-" + (i + 1)}>
              <div>
                {images.map((img, j) =>
                  <img src={"images/" + cls[1] + isBlurred + "/" + j + ".jpeg"} className="img-fluid zoom" alt={cls[0] + " image " + j} key={cls[0] + "-image-" + j} width="50" />
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