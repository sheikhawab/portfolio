/// google ai sutdio
// 1. Ensure this CSS import is correct and the file exists at this path
import "./contact.css";

// 2. Ensure these image paths are correct relative to this Contact.js file
import github from "../../assets/github2.png";
import linkdin from "../../assets/linkdin.png";
import whatsapp from "../../assets/whatsapp.png";
import call from "../../assets/call.png";

import React, { useRef, useState } from "react"; // Added useState
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // --- Replace with your ACTUAL EmailJS Details ---
  const EMAILJS_SERVICE_ID = "awab"; // Your Service ID
  const EMAILJS_ADMIN_TEMPLATE_ID = "template_stzovci"; // Your Template ID for emails TO YOU
  // VVVV IMPORTANT: Create a NEW template in EmailJS for auto-response TO USER VVVV
  const EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID =
    "YOUR_NEW_USER_AUTORESPONSE_TEMPLATE_ID"; // <<== REPLACE THIS
  const EMAILJS_PUBLIC_KEY = "Gi4YSpcgNXagkOR5y"; // Your Public Key
  // --- End of EmailJS Details ---

  const sendEmail = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    const formData = new FormData(form.current);
    const name = formData.get("from_name");
    const userEmail = formData.get("from_email"); // Using userEmail for clarity

    // 1. Send email to Admin
    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        form.current, // form.current sends all form fields to your admin template
        EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Admin email sent:", result.text);

          // 2. Send auto-response email to User
          const autoresponseParams = {
            from_name: name, // For "Hi {{from_name}}" in user template
            to_email: userEmail, // User's email for "To Email" field in user template
            // Ensure your NEW user auto-response template uses {{to_email}} in its "To Email" setting.
          };

          // Check if a user auto-response template ID is provided
          if (
            EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID &&
            EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID !==
              "YOUR_NEW_USER_AUTORESPONSE_TEMPLATE_ID"
          ) {
            emailjs
              .send(
                EMAILJS_SERVICE_ID,
                EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID, // Use the NEW template ID for user
                autoresponseParams,
                EMAILJS_PUBLIC_KEY
              )
              .then(
                (res) => {
                  console.log("User auto-response sent:", res.text);
                  setSubmitStatus(
                    "Email sent successfully! Check your inbox for a confirmation. 📩"
                  );
                  form.current.reset();
                },
                (err) => {
                  console.error("User auto-response failed:", err.text);
                  setSubmitStatus(
                    "Your message was sent, but we couldn't send a confirmation email."
                  );
                  form.current.reset(); // Still reset form as admin email was sent
                }
              );
          } else {
            // If no user auto-response template is set up, just show success for admin email
            console.log(
              "User auto-response template not configured. Skipping auto-response."
            );
            setSubmitStatus("Email sent successfully! 📩");
            form.current.reset();
          }
        },
        (error) => {
          console.error("Admin email failed to send:", error.text);
          setSubmitStatus(
            "Failed to send your message. Please try again later."
          );
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    // id="contact" for react-scroll (Navbar link `to="contact"`)
    // className="contactPage" agar aapki CSS #contactPage ko target kar rahi hai.
    // Agar CSS #contactPage se styling hai toh section ka id "contactPage" rakhein aur
    // Navbar mein Link to="contactPage" karein.
    // Main yahan id="contact" rakh raha hoon, maan kar ki aap Navbar mein to="contact" use kar rahe hain.
    <section id="contact" className="contactPage">
      {" "}
      {/* Added className for CSS if #contactPage is used */}
      {/* This inner div can be used if your CSS expects #contactPage > div structure */}
      {/* Removed id=" clients" as it had a leading space and might not be the correct target for react-scroll */}
      <div className="contactContentWrapper">
        {" "}
        {/* Added a class for potential inner styling */}
        <h1 className="contactPageTitle">Contact Me</h1>
        <span className="contactDesc">
          Feel free to contact through the form below to discuss any work
          opportunities.
        </span>
        <form className="contactForm" ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            className="name" // CSS: .name
            placeholder="Your name"
            name="from_name" // For EmailJS template: {{from_name}}
            required
            disabled={isSubmitting}
          />
          <input
            type="email"
            className="email" // CSS: .email
            placeholder="Your Email"
            name="from_email" // For EmailJS template: {{from_email}}
            required
            disabled={isSubmitting}
          />
          <textarea
            name="message" // For EmailJS template: {{message}}
            placeholder="Your Message"
            rows={5}
            className="msg" // CSS: .msg
            required
            disabled={isSubmitting}
          ></textarea>
          <button
            type="submit"
            className="submitBtn btn" // CSS: .submitBtn and .btn
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
          {submitStatus && (
            // You can style this paragraph based on success/error
            <p
              className={`formStatus ${
                submitStatus.includes("Failed") ||
                submitStatus.includes("couldn't")
                  ? "error"
                  : "success"
              }`}
            >
              {submitStatus}
            </p>
          )}
        </form>
        <div className="links">
          {" "}
          {/* CSS: .links */}
          {/* GitHub Link */}
          <a
            href="https://github.com/sheikhawab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="GitHub Profile" className="link" />{" "}
            {/* CSS: .link */}
          </a>
          {/* LinkedIn Link */}
          <a
            href="https://linkedin.com/in/sheikhawaab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkdin} alt="LinkedIn Profile" className="link" />
          </a>
          {/* WhatsApp Link */}
          <a
            href="https://wa.me/966546343458?text=Hi%20there!%20I%20found%20you%20through%20your%20website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={whatsapp} alt="WhatsApp Me" className="link" />
          </a>
          {/* Instagram Link */}
          <a href="tel:+966546343458" target="_blank" rel="noopener noreferrer">
            <img src={call} alt="+966546343458" className="link" />
          </a>
        </div>
      </div>
      {/* "Call Me" button - iski styling .phone class se honi chahiye */}
      {/* Isko maine contactContentWrapper div se bahar rakha hai */}
      {/* <a href="tel:+966546343458" className="phone">📞 Call Me</a> */}
    </section>
  );
};

export default Contact;
// import "./contact.css";
// import github from "../../assets/github2.png";
// import linkdin from "../../assets/linkdin.png";
// import whatsapp from "../../assets/whatsapp.png";
// import instagramIcon from "../../assets/instagram.png";
// import React, { useRef } from "react";
// import emailjs from "@emailjs/browser";

// const Contact = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     const formData = new FormData(form.current);
//     const name = formData.get("from_name");
//     const email = formData.get("from_email");

//     // Admin ko message bhejna
//     emailjs
//       .sendForm("awab", "template_stzovci", form.current, "Gi4YSpcgNXagkOR5y")
//       .then((result) => {
//         console.log("Admin email sent:", result.text);

//         // Auto-response user ko bhejna
//         emailjs
//           .send(
//             "awab",
//             "template_stzovci",
//             {
//               from_name: name,
//               to_email: email,
//             },
//             "Gi4YSpcgNXagkOR5y"
//           )
//           .then((res) => {
//             console.log("User auto-response sent:", res.text);
//             alert("Email Sent! Check your inbox 📩");
//             e.target.reset();
//           })
//           .catch((err) => console.log("Auto-response error:", err.text));
//       })
//       .catch((error) => {
//         console.log("Admin email error:", error.text);
//       });
//   };

//   return (
//     <section id="contactPage">
//      <div id=" clients">
//         <h1 className="contactPageTitle">Contact Me</h1>
//         <span className="contactDesc">
//           Please fill out the form below to discuss any work opportunities.
//         </span>
//         <form className="contactForm" ref={form} onSubmit={sendEmail}>
//           <input
//             type="text"
//             className="name"
//             placeholder="Your name"
//             name="from_name"
//             required
//           />
//           <input
//             type="email"
//             className="email"
//             placeholder="Your Email"
//             name="from_email"
//             required
//           />
//           <textarea
//             name="message"
//             placeholder="Your Message"
//             rows={5}
//             className="msg"
//             required
//           ></textarea>
//           <button type="submit" value="Send" className="submitBtn btn ">
//             Submit
//           </button>
//           <div className="links">
//             <img src={github} alt="github" className="link" />
//             <img src={linkdin} alt="linkdin" className="link" />
//             <a
//               href="https://wa.me/966546343458?text=Hi%20there!%20I%20found%20you%20through%20your%20website"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <img src={whatsapp} alt="WhatsApp" className="link" />
//             </a>
//             <a href="tel:+966546343458" className="phone">
//               📞 Call Me
//             </a>

//             <img src={instagramIcon} alt="Instagram" className="link" />
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Contact;

// ///// readymade component ///////////
// import './contact.css';
// import Walmart from '../../assets/walmart.png';
// import Adobe from '../../assets/adobe.png';
// import Microsoft from '../../assets/microsoft.png';
// import Facebook from '../../assets/facebook.png';
// import facebookIcon from '../../assets/facebook-icon.png';
// import twitterIcon from '../../assets/twitter.png';
// import youtubeIcon from '../../assets/youtube.png';
// import instagramIcon from '../../assets/instagram.png';
// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';

// const Contact = () => {
//     const form = useRef();

//     const sendEmail = (e) => {
//         e.preventDefault();

//         // emailjs.sendForm('service_6phm4ar', 'template_zcxds5a', form.current, 'blaHt_5KIJ711DfGH')
//         emailjs.sendForm('awab', 'template_zcxds5a', form.current, 'blaHt_5KIJ711DfGH')
//             .then((result) => {
//                 console.log(result.text);
//                 e.target.reset();
//                 alert('Email Sent !');
//             }, (error) => {
//                 console.log(error.text);
//             });
//     };

//     return (
//         <div id='contactPage'>
//             <div id="clients">
//                 <h1 className="contactPageTitle">My clients</h1>
//                 <span className="clientDesc">
//                     I have had the opportunity to work with a diverse group of companies.
//                     Some of the notable companies I have worked with includes
//                 </span>
//                 <div className="clientImgs">
//                     <img src={Walmart} alt="Client" className="clientImg" />
//                     <img src={Adobe} alt="Client" className="clientImg" />
//                     <img src={Microsoft} alt="Client" className="clientImg" />
//                     <img src={Facebook} alt="Client" className="clientImg" />
//                 </div>
//             </div>
//             <div id="contact">
//                 <h1 className="contactPageTitle">Contact Me</h1>
//                 <span className="contactDesc">Please fill out the form below to discuss any work opportunities.</span>
//                 <form className="contactForm" ref={form} onSubmit={sendEmail}>
//                     <input type="text" className="name" placeholder='Your name' name='from_name' />
//                     <input type="text" className="email" placeholder='Your Email' name='from_email' />
//                     <textarea name="message" placeholder='Your Message' rows={5} className='msg' ></textarea>
//                     <button type="submit" value="Send" className='submitBtn'>Submit</button>
//                     <div className="links">
//                         <img src={facebookIcon} alt="Facebook" className="link" />
//                         <img src={twitterIcon} alt="Twitter" className="link" />
//                         <img src={youtubeIcon} alt="YouTube" className="link" />
//                         <img src={instagramIcon} alt="Instagram" className="link" />
//                     </div>
//                 </form>
//             </div>
//         </section>
//     );
// }

// export default Contact;
