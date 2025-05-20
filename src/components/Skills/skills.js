import React from "react";
import "./skills.css";
import webdevelopment from "../../assets/awablogo.jpg";
import WebDesign from "../../assets/website-design.png";
import AppDesign from "../../assets/speed.jpg";
const Skills = () => {
  return (
    <section id="skills">
      <span className="skillTitle">What I do</span>
      {/* <span className="skillDesc">I am a skilled and passionate web designer with experience in creating visually appealing and user-friendly websites. I have a strong understanding of design and a keen eye for detail. I am proficient in HTML, CSS, and JavaScript, as well as design software such as Adobe Photoshop and Illustrator.</span> */}
      <span className="skillDesc">
        I design and develop dynamic, responsive, and high-performance web
        applications that deliver real value to users. With a strong focus on
        functionality and user experience, I bring ideas to life through clean
        code, scalable architecture, and modern development practices. Whether
        it’s building full-stack applications, integrating APIs, or optimizing
        frontend performance, I aim to create solutions that are not only
        technically sound but also intuitive and user-friendly. I’m passionate
        about continuous learning and turning complex problems into simple,
        elegant web experiences..
      </span>
      <div className="skillBars">
        <div className="skillBar">
          <img src={webdevelopment} alt="development" className="skillBarImg" />
          <div className="skillBarText">
            <h2>Web Development</h2>
            <p>Creating clean, responsive websites with modern web tech.</p>
          </div>
        </div>
        <div className="skillBar">
          <img src={WebDesign} alt="WebDesign" className="skillBarImg" />
          <div className="skillBarText">
            <h2> Bug Fixing & Optimization </h2>
            <p>
              Maintaining high-performance websites through intelligent bug
              fixes and code optimization.
            </p>
          </div>
        </div>
        <div className="skillBar">
          <img src={AppDesign} alt="AppDesign" className="skillBarImg" />
          <div className="skillBarText">
            <h2>Speed & Performance Tuning</h2>
            <p>
              Reducing load times and optimizing resources to keep your site
              fast and efficient.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
