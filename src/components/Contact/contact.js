import "./contact.css";

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

  // --- Updated EmailJS Details ---
  const EMAILJS_SERVICE_ID = "service_adtg7in"; // Your Service ID
  const EMAILJS_ADMIN_TEMPLATE_ID = "template_i5p8fbp"; // Your Template ID for emails TO YOU
  // VVVV IMPORTANT: Create a NEW template in EmailJS for auto-response TO USER VVVV
  const EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID = "template_zywgvdd"; // <<== Aapki sahi user auto-response ID
  const EMAILJS_PUBLIC_KEY = "Gi4YSpcgNXagkOR5y"; // Your Public Key
  // --- End of EmailJS Details ---

  const sendEmail = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    const formData = new FormData(form.current);
    const userName = formData.get("from_name"); // Form se 'from_name' field -> userName variable
    const userEmailAddress = formData.get("from_email"); // Form se 'from_email' field -> userEmailAddress variable
    const userMessage = formData.get("message"); // Form se 'message' field -> userMessage variable

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

          // 2. Prepare parameters for User Auto-Response
          // Match these parameter names with variables in your EmailJS user auto-response template
          const autoresponseParams = {
            // Agar aapke user auto-response template mein {{name}} hai:
            name: userName, // Aapke EmailJS template mein "Hi {{name}}" hai
            // Agar aapke user auto-response template mein {{from_name}} hai:
            // from_name: userName,

            // Screenshot ke "To Email" field mein {{email}} tha,
            // isliye hum yahan 'email' naam ka parameter bhej rahe hain
            email: userEmailAddress, // Aapke EmailJS template ke "To Email" field mein {{email}} hai
            // Agar "To Email" field mein {{to_email}} hota, toh hum bhejte:
            // to_email: userEmailAddress,

            // Agar aapke user auto-response template mein {{title}} hai (screenshot mein dikh raha tha), aur aap
            // subject line ya kuch bhejna chahte hain:
            // title: "Regarding your inquiry", // Example static title
            // Ya agar form mein 'title' field hota toh: formData.get("title")
            // ABHI KE LIYE, AGAR AAPKE TEMPLATE MEIN {{title}} HAI AUR AAP CODE SE NAHI BHEJ RAHE,
            // TOH WOH EMAIL MEIN KHAALI AAYEGA. AGAR ZAROORI NAHI TOH TEMPLATE SE HATA DEIN.

            // Agar user auto-response template mein user ka message {{message}} dikhana hai
            message: userMessage, // Agar aapke template mein user ka message dikhana hai
          };

          // --- THEEK KI HUI IF CONDITION ---
          // Check if a user auto-response template ID is valid and not a placeholder
          // Hum yeh maan rahe hain ki agar ID "template_" se shuru hoti hai toh woh valid hai.
          // Aur woh original placeholder "YOUR_NEW_USER_AUTORESPONSE_TEMPLATE_ID" nahi honi chahiye.
          const placeholderForUserTemplateID = "YOUR_NEW_USER_AUTORESPONSE_TEMPLATE_ID"; // Original placeholder value
          const isValidUserTemplateId =
            EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID && // ID maujood ho
            EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID.startsWith("template_") && // 'template_' se shuru ho
            EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID !== placeholderForUserTemplateID; // Aur placeholder na ho

          if (isValidUserTemplateId) {
            emailjs
              .send( // Using .send() for specific parameters
                EMAILJS_SERVICE_ID,
                EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID,
                autoresponseParams, // Parameters for the user's email
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
            // Agar ID valid nahi hai ya placeholder hai
            console.warn( // Changed to warn
              "User auto-response template ID is not configured correctly or is a placeholder. Skipping auto-response. Current ID:",
              EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID
            );
            setSubmitStatus("Message sent! We'll be in touch. 📩 (Auto-reply skipped)"); // User ko batayein
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
                submitStatus.includes("couldn't") ||
                submitStatus.includes("skipped") // "skipped" wala message error/warning jaisa dikh sakta hai
                  ? "error" // Aap "warning" class bhi bana sakte hain
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
          {/* Call Link */}
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

// ///////// pahley wala code //////////


// import "./contact.css";

// import github from "../../assets/github2.png";
// import linkdin from "../../assets/linkdin.png";
// import whatsapp from "../../assets/whatsapp.png";
// import call from "../../assets/call.png";

// import React, { useRef, useState } from "react"; // Added useState
// import emailjs from "@emailjs/browser";

// const Contact = () => {
//   const form = useRef();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState("");

//   // --- Replace with your ACTUAL EmailJS Details ---
//   const EMAILJS_SERVICE_ID = "service_adtg7in"; // Your Service ID
//   const EMAILJS_ADMIN_TEMPLATE_ID = "template_i5p8fbp"; // Your Template ID for emails TO YOU
//   // VVVV IMPORTANT: Create a NEW template in EmailJS for auto-response TO USER VVVV
//   const EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID =
//     "template_zywgvdd"; // <<== REPLACE THIS
//   const EMAILJS_PUBLIC_KEY = "Gi4YSpcgNXagkOR5y"; // Your Public Key
//   // --- End of EmailJS Details ---

//   const sendEmail = (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);
//     setSubmitStatus("");

//     const formData = new FormData(form.current);
//     const name = formData.get("from_name");
//     const userEmail = formData.get("from_email"); // Using userEmail for clarity
      //  const userMessage = formData.get("message");
//     // 1. Send email to Admin
//     emailjs
//       .sendForm(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_ADMIN_TEMPLATE_ID,
//         form.current, // form.current sends all form fields to your admin template
//         EMAILJS_PUBLIC_KEY
//       )
//       .then(
//         (result) => {
//           console.log("Admin email sent:", result.text);

//           // 2. Send auto-response email to User
//           const autoresponseParams = {
//             from_name: name, // For "Hi {{from_name}}" in user template
//             to_email: userEmail, // User's email for "To Email" field in user template
//             // Ensure your NEW user auto-response template uses {{to_email}} in its "To Email" setting.
//           };

//           // Check if a user auto-response template ID is provided
//           if (
//             EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID &&
//             EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID !==
//               "YOUR_NEW_USER_AUTORESPONSE_TEMPLATE_ID"
//           ) {
//             emailjs
//               .send(
//                 EMAILJS_SERVICE_ID,
//                 EMAILJS_USER_AUTORESPONSE_TEMPLATE_ID, // Use the NEW template ID for user
//                 autoresponseParams,
//                 EMAILJS_PUBLIC_KEY
//               )
//               .then(
//                 (res) => {
//                   console.log("User auto-response sent:", res.text);
//                   setSubmitStatus(
//                     "Email sent successfully! Check your inbox for a confirmation. 📩"
//                   );
//                   form.current.reset();
//                 },
//                 (err) => {
//                   console.error("User auto-response failed:", err.text);
//                   setSubmitStatus(
//                     "Your message was sent, but we couldn't send a confirmation email."
//                   );
//                   form.current.reset(); // Still reset form as admin email was sent
//                 }
//               );
//           } else {
//             // If no user auto-response template is set up, just show success for admin email
//             console.log(
//               "User auto-response template not configured. Skipping auto-response."
//             );
//             setSubmitStatus("Email sent successfully! 📩");
//             form.current.reset();
//           }
//         },
//         (error) => {
//           console.error("Admin email failed to send:", error.text);
//           setSubmitStatus(
//             "Failed to send your message. Please try again later."
//           );
//         }
//       )
//       .finally(() => {
//         setIsSubmitting(false);
//       });
//   };

//   return (
//     // id="contact" for react-scroll (Navbar link `to="contact"`)
//     // className="contactPage" agar aapki CSS #contactPage ko target kar rahi hai.
//     // Agar CSS #contactPage se styling hai toh section ka id "contactPage" rakhein aur
//     // Navbar mein Link to="contactPage" karein.
//     // Main yahan id="contact" rakh raha hoon, maan kar ki aap Navbar mein to="contact" use kar rahe hain.
//     <section id="contact" className="contactPage">
//       {" "}
//       {/* Added className for CSS if #contactPage is used */}
//       {/* This inner div can be used if your CSS expects #contactPage > div structure */}
//       {/* Removed id=" clients" as it had a leading space and might not be the correct target for react-scroll */}
//       <div className="contactContentWrapper">
//         {" "}
//         {/* Added a class for potential inner styling */}
//         <h1 className="contactPageTitle">Contact Me</h1>
//         <span className="contactDesc">
//           Feel free to contact through the form below to discuss any work
//           opportunities.
//         </span>
//         <form className="contactForm" ref={form} onSubmit={sendEmail}>
//           <input
//             type="text"
//             className="name" // CSS: .name
//             placeholder="Your name"
//             name="from_name" // For EmailJS template: {{from_name}}
//             required
//             disabled={isSubmitting}
//           />
//           <input
//             type="email"
//             className="email" // CSS: .email
//             placeholder="Your Email"
//             name="from_email" // For EmailJS template: {{from_email}}
//             required
//             disabled={isSubmitting}
//           />
//           <textarea
//             name="message" // For EmailJS template: {{message}}
//             placeholder="Your Message"
//             rows={5}
//             className="msg" // CSS: .msg
//             required
//             disabled={isSubmitting}
//           ></textarea>
//           <button
//             type="submit"
//             className="submitBtn btn" // CSS: .submitBtn and .btn
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Sending..." : "Submit"}
//           </button>
//           {submitStatus && (
//             // You can style this paragraph based on success/error
//             <p
//               className={`formStatus ${
//                 submitStatus.includes("Failed") ||
//                 submitStatus.includes("couldn't")
//                   ? "error"
//                   : "success"
//               }`}
//             >
//               {submitStatus}
//             </p>
//           )}
//         </form>
//         <div className="links">
//           {" "}
//           {/* CSS: .links */}
//           {/* GitHub Link */}
//           <a
//             href="https://github.com/sheikhawab"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img src={github} alt="GitHub Profile" className="link" />{" "}
//             {/* CSS: .link */}
//           </a>
//           {/* LinkedIn Link */}
//           <a
//             href="https://linkedin.com/in/sheikhawaab"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img src={linkdin} alt="LinkedIn Profile" className="link" />
//           </a>
//           {/* WhatsApp Link */}
//           <a
//             href="https://wa.me/966546343458?text=Hi%20there!%20I%20found%20you%20through%20your%20website"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img src={whatsapp} alt="WhatsApp Me" className="link" />
//           </a>
//           {/* Instagram Link */}
//           <a href="tel:+966546343458" target="_blank" rel="noopener noreferrer">
//             <img src={call} alt="+966546343458" className="link" />
//           </a>
//         </div>
//       </div>
//       {/* "Call Me" button - iski styling .phone class se honi chahiye */}
//       {/* Isko maine contactContentWrapper div se bahar rakha hai */}
//       {/* <a href="tel:+966546343458" className="phone">📞 Call Me</a> */}
//     </section>
//   );
// };

// export default Contact;
