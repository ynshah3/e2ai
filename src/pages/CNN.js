import React, { useEffect } from "react";
import CNNDataset from "./cnn_dataset";
import CNNModel from "./cnn_model";


const CNN = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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