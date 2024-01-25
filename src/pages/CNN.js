import React from "react";


const CNN = () => {
  return (
    <div className="container-sm" style={{maxWidth: 1000}}>
      <div className="frame" style={{backgroundColor: "#ffddc1"}}>
        <h1 className="display-4">Image Classification Using<br />Convolutional Neural Networks</h1>
        <p style={{marginTop: 50}}>The task of Image Classification is concerned with categorizing (labelling) images into different classes based on what those images depict. For example, an image of a cat would be classified as belonging to the "cat" class. Convolutional Neural Networks (CNNs)... </p>
        <h3 className="display-6" style={{marginTop: 30}}>References</h3>
      </div>
      <hr style={{margin: 0}} className="border border-2 "/>
      <div className="footer">
        Designed and Developed by <a href="https://ynshah3.github.io" className="link-offset-3 footer-link">Yash Shah</a>
      </div>
    </div>
  );
};

export default CNN;
