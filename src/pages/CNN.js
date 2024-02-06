import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CNNDataset from "./cnnDataset";
import CNNModel from "./cnnModel";
import CNNTest from "./cnnTest";


const CNN = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function openSurvey() { setShow(true); }

  function closeSurvey() { setShow(false); }

  return (
    <div className="container-sm" style={{maxWidth: 1000}}>
      <div className="frame" style={{backgroundColor: "#ffddc1", justifyContent: "center"}}>
        <h1 className="display-4">Image Classification Using<br />Convolutional Neural Networks</h1>
        <div className="container-sm" style={{marginTop: 50, maxWidth: 800, textAlign: "justify"}}>
          The task of Image Classification is concerned with categorizing (labelling) images into different classes based on what those images depict. For example, an image of a cat would be classified as belonging to the "cat" class. Convolutional Neural Networks (CNNs) are a family of neural networks that leverage the powerful spatial structure present in images. This spatial structure can comprise of the fact that [1]:
          <div className="container-sm" style={{justifyContent: 'center', display: 'flex'}}>
            <ul>
              <li><span className="emph">Translational Invariance</span>: A cat at different locations in an image, like sleeping on the floor or jumping over a fence, are all images of cats.</li>
              <li><span className="emph">Locality</span>: A pixel representing the sky is likely to be surrounded by pixels that also represent the sky.</li>
              <li><span className="emph">Composition</span>: Objects in images are composed of parts, like a face is composed of eyes, a nose, lips, ears, etc.</li>
            </ul>
          </div>
        </div>
        <hr style={{margin: "30px 20px"}} />
        <CNNDataset />
        <hr style={{margin: "30px 20px"}} />
        <CNNModel />
        <hr style={{margin: "30px 20px"}} />
        <CNNTest />
        <hr style={{margin: "30px 20px"}} />
        <div className="container-sm" style={{maxWidth: 750, textAlign: "justify"}}>
          Thanks for completing this module! Please fill out this exit ticket and feedback survey to self-assess learning outcomes and help improve this module!<br/><br />
        </div>
        <Button onClick={openSurvey}>Exit Ticket and Feedback Survey</Button>
        <Modal show={show} onHide={closeSurvey} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <iframe title="E2AI: Exit Ticket and Feedback Survey" src="https://docs.google.com/forms/d/e/1FAIpQLScNfuLRDLLNNKRSLZqzP1l3QLdC-4XfNw31JNyr6MaRGOEtXQ/viewform?embedded=true" width="100%" height="100%" position="relative">Loading…</iframe>
        </Modal>
        <hr style={{margin: "30px 20px"}} />
        <h3 className="display-8" style={{marginTop: 30}}>References</h3>
        <div className="container-sm" style={{maxWidth: 750, textAlign: "justify", fontSize: "0.9rem"}}>
          [1] Aston Zhang, Zachary C. Lipton, Mu Li, and Alexander J. Smola. <em>Dive into Deep Learning</em>. Cambridge University Press, 2023. <a href="https://D2L.ai">https://D2L.ai</a>.<br />
          [2] <a href="http://karpathy.github.io/2019/04/25/recipe/">http://karpathy.github.io/2019/04/25/recipe/</a><br />
          [3] Zhiqiang Gong, Ping Zhong, and Weidong Hu. Diversity in machine learning. <em>IEEE Access</em>, 7:64323-64350, 2019. <a href="http://dx.doi.org/10.1109/ACCESS.2019.2917620">http://dx.doi.org/10.1109/ACCESS.2019.2917620</a>.<br />
          [4] U.S. Department of Education, Office of Educational Technology, <em>Artificial Intelligence and Future of Teaching and Learning: Insights and Recommendations</em>, Washington, DC, 2023.<br />
          [5] <a href="https://www.unesco.org/en/artificial-intelligence">https://www.unesco.org/en/artificial-intelligence</a><br />
          [6] Carlos Hinojosa, Miguel Marquez, Henry Arguello, Ehsan Adeli, Li Fei-Fei, and Juan Carlos Niebles. <em>PrivHAR: Recognizing Human Actions from Privacy-Preserving Lens</em>, pp. 314-332. Springer Nature Switzerland, 2022. ISBN 9783031197727. <a href="http://dx.doi.org/10.1007/978-3-031-19772-7_19">http://dx.doi.org/10.1007/978-3-031-19772-7_19</a>.<br />
          [7] Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li, and Li Fei-Fei, "ImageNet: A large-scale hierarchical image database," <em>2009 IEEE Conference on Computer Vision and Pattern Recognition</em>, Miami, FL, USA, 2009, pp. 248-255, doi: 10.1109/CVPR.2009.5206848.<br />
          [8] Tero Karras, Samuli Laine, and Timo Aila. "A style-based generator architecture for generative adversarial networks." <em>Proceedings of the IEEE/CVF conference on computer vision and pattern recognition</em>. 2019.<br />
          [9] Wei Wu, Hanyang Peng, and Shiqi Yu. YuNet: A Tiny Millisecond-level Face Detector. <em>Machine Intelligence Research</em> 20, 656-665 (2023). <a href="https://doi.org/10.1007/s11633-023-1423-y">https://doi.org/10.1007/s11633-023-1423-y</a>.<br/>
          [10] Xavier Glorot, Antonie Bordes, and Yoshua Bengio. Deep Sparse Rectifier Neural Networks. <i>Proceedings of the Fourteenth International Conference on Artificial Intelligence and Statistics</i>, in <i>Proceedings of Machine Learning Research</i> 15:315-323 (2011). <a href="https://proceedings.mlr.press/v15/glorot11a.html">https://proceedings.mlr.press/v15/glorot11a.html</a>.<br/>
        </div>
      </div>
      <hr style={{margin: 0}} className="border border-2 "/>
      <div className="footer">
        Designed and Developed by <a href="https://ynshah3.github.io" className="link-offset-3 footer-link">Yash Shah</a>
      </div>
    </div>
  );
};

export default CNN;