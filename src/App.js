import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="container-sm" style={{maxWidth: 1000}}>
      <div className="frame">
        <h1 className="display-1">
          <div className="display-5" style={{marginBottom: 10}}>
            <img src="megaphone-fill.svg" alt="megaphone" height="40px" className="megaphone" />
            <span style={{color: "#fd7e14"}}>Et Toi</span> (
              <span style={{color: "#065f71"}}>French</span>: "<span style={{color: "#105e3a"}}>And You</span>")
          </div>
          <img src="favicon.ico" alt="logo with letters E2AI" height="70px" className="logo-align" />
          The <span className="title-underline">E2AI</span> Project:
        </h1>
        <h2 className="display-5" style={{color: '#646161', padding: "0 20px"}} >
          Introducing Ethical and Explainable AI Literacy to Students
        </h2>
        <h2 className="display-6" style={{marginTop: 70, marginBottom: 20}}>Objectives</h2>
        <div className="container-sm" style={{justifyContent: 'center', display: 'flex'}}>
          <ol>
            <li>Advocating for <span className="link-offset-2 underline">AI Literacy for anyone interacting with AI</span>, especially inclusion in K-12 curriculum along with other literacy teachings like financial, sex, nutrition, health, etc.</li>
            <li>Gaining competence in not just using and applying “off-the-shelf” pre-trained models developed by large corporations and organizations and treating them as “black boxes”, but <span className="link-offset-2 underline">learning to understand the data, AI's interaction with that data, interpreting how it works, and keeping in mind ethical considerations around privacy, diversity and inclusion, equal access, bias, and sustainability</span>.</li>
            <li>With the prevalence of large foundational text models (at least among people with privileged access to electricity, the internet, and computer literacy, among others) and the ushering into a digital era, learning AI competencies that make <span className="link-offset-2 underline">mindful, inquiring, and practical student leaders</span>.</li>
          </ol>
        </div>
        <h2 className="display-6" style={{marginTop: 50, marginBottom: 30}}>Modules</h2>
        <div className="container-sm" style={{justifyContent: 'center', display: 'flex'}}>
          <a href='/cnn' className="link-offset-3 module-link">Image Classification with CNNs</a>
        </div>
      </div>
      <hr style={{margin: 0}} className="border border-2 "/>
      <div className="footer">
        Designed and Developed by <a href="https://ynshah3.github.io" className="link-offset-3 footer-link">Yash Shah</a>
      </div>
    </div>
  );
}

export default App;
