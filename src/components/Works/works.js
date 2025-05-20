import React from 'react';
import './works.css';
import Portfolio4 from '../../assets/portfolio-4.png';
import Portfolio5 from '../../assets/portfolio-5.png';
import Portfolio6 from '../../assets/portfolio-6.png';
import resturant from '../../assets/my-resturant.png.png'
import resturant2 from '../../assets/my-resturant-checkin.png'
import nexskillstore from '../../assets/nexskillstore.png'
import my_resturant_marks from '../../assets/my-resturant-marks.png'

const Works = () => {
    return (    
        <section id='works'>
            <h2 className="worksTitle">My Projects</h2>
            <span className="worksDesc">I take pride in paying attention to the smallest details and making sure that my work is pixel perfect. I am excited to bring my skills and experience to help businesses achieve their goals and create a strong online presence.</span>
            <div className="worksImgs">
                <img src={resturant} alt="My-Resturant" className="worksImg" />
                <img src={my_resturant_marks} alt="my_resturant_marks" className="worksImg" />
                <img src={resturant2} alt="My-Resturant2" className="worksImg" />
                <img src={nexskillstore} alt="nexskillstore" className="worksImg" />
                <img src={Portfolio4} alt="" className="worksImg" />
                <img src={Portfolio5} alt="" className="worksImg" />
                <img src={Portfolio6} alt="" className="worksImg" />
            </div>
            {/* <button className="workBtn">See More</button> */}
        </section>
    );
}

export default Works;