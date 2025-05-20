import React, { useState } from "react";
import "./navbar.css";
// import awablogo from "../../assets/Awablogo.png";
import awablogo from "../../assets/yellowlogo.jpg";
import { Link } from "react-scroll";
import menu from "../../assets/menu.png";
import btnImg from "../../assets/hireme.png";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="navbar">
      <img src={awablogo} alt="Logo" className="logo" />
      <div className="desktopMenu">
        <Link
          activeClass="active"
          to="intro"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className="desktopMenuListItem"
        >
          Home
        </Link>
        <Link
          activeClass="active"
          to="skills"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          About
        </Link>
        <Link
          activeClass="active"
          to="works"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          Projects
        </Link>
        <Link
          activeClass="active"
          to="contactPage"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          Contact Me
        </Link>

        {/* <Link activeClass='active' to='clients' spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItem">Clients</Link> */}
        {/* <Link activeClass='active' to='contact' spy={true} smooth={true} offset={-50} duration={500} className="btn">My Resume</Link> */}
      </div>
      {/* <button className="desktopMenuBtn btn" onClick={() => {
                    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});}}>
                    <img src={btnImg} alt="Resume" className="desktopMenuImg btnImg" />My Resume</button> */}

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="Awab_MERN_Developer_Resume.pdf"
        className="desktopMenuBtn" // Aapki button wali classes
      >
        <img src={btnImg} alt="Download Resume" className="desktopMenuImg" />
        My Resume
      </a>

      <img
        src={menu}
        alt="Menu"
        className="mobMenu"
        onClick={() => setShowMenu(!showMenu)}
      />
      {/* ////// mobile class  */}
      <div className="navMenu" style={{ display: showMenu ? "flex" : "none" }}>
        <Link
          activeClass="active"
          to="intro"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          Home
        </Link>
        <Link
          activeClass="active"
          to="skills"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          About
        </Link>
        <Link
          activeClass="active"
          to="works"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          Portfolio
        </Link>
        <Link
          activeClass="active"
          to="contactPage"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          Contact
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Awab_MERN_Developer_Resume.pdf"
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          My Resume
        </a>

        {/* <Link activeClass='active' to='clients' spy={true} smooth={true} offset={-50} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>Clients</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
