import React from "react";
import "./intro.css";
import awab from "../../assets/awab2.jpg";
import btnImg from "../../assets/hireme.png";
import { Link } from "react-scroll";
const Intro = () => {
  return (
    <section id="intro">
      <div className="introContent">
        
        <span className="introText">
            <span className="introText">Hi, </span>
          I'm <span className="introName">Awab</span> <br />
          Web Developer
        </span>
        {/* <p className="introPara">I am a skilled web designer with experience in creating<br />visually appealing and user friendly websites.</p> */}
        <p className="introPara">
          "I build full-stack web applications that solve real problems — using
          MongoDB,
          <br /> Express, React, and Node to turn concepts into code that
          works.".
        </p>
        <Link>
          <button className="btn"  onClick={() => {
                document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
            }}>
            <img src={btnImg} alt="Hire" className="btnImg" /> Hire Me
          </button>
          {/* <button className="btn">
            <img src={btnImg} alt="Hire" className="btnImg" /> My Resume
          </button> */}
        </Link>
      </div>
      {/* <img src={bg} alt="Profile" className="bg" /> */}
      <img src={awab} alt="Profile" className="bg" />
    </section>
  );
};

export default Intro;
