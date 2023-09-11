import "./Homepage.css";
import choose from "../../images/choose-grey.svg";
import secure from "../../images/secure-grey.svg";
import online from "../../images/online-grey.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useEffect, useState } from "react";
import Footer from "../Footer/footer";
import { Navigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
export default function Homepage() {
  const [url, setUrl] = useState("");
  const [navigate, setNavigate] = useState(false);
  const hiw1 = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNavigate(true);
  };

  useEffect(() => {
    const el = hiw1.current;
    gsap.fromTo(
      el,
      { translateX: "-50%" },
      {
        translateX: "0%",
        duration: 2,
        scrollTrigger: {
          trigger: el,
        },
      }
    );
  }, []);
  const hiw2 = useRef(null);
  useEffect(() => {
    const el = hiw2.current;
    gsap.fromTo(
      el,
      { translateX: "50%" },
      {
        translateX: "0%",
        duration: 2,
        scrollTrigger: {
          trigger: el,
        },
      }
    );
  }, []);
  const hiw3 = useRef(null);
  useEffect(() => {
    const el = hiw3.current;
    gsap.fromTo(
      el,
      { translateX: "-50%" },
      {
        translateX: "0%",
        duration: 2,
        scrollTrigger: {
          trigger: el,
        },
      }
    );
  }, []);
  return (
    <>
      <div className="custom-container">
        <div className="search">
          <span id="hero_txt">
            <b>Secure-Txt</b>
            <span id="slash">/</span>
          </span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={url}
              id="dir"
              onChange={(e) => setUrl(e.target.value)}
            />
          </form>
        </div>
        <div className="explain">
          <div className="explain_block">
            <img src={choose} alt="" />
            <span>check sub-site availability</span>
          </div>
          <div className="explain_block">
            <img src={online} alt="" />
            <span>Your notepad is now online</span>
          </div>
          <div className="explain_block">
            <img src={secure} alt="" />
            <span>Secure it with a password</span>
          </div>
        </div>
      </div>
      <div className="how-it-works">
        <h1>Your notepad secured in 3 steps</h1>

        <div className="notes" id="hiw1" ref={hiw1}>
          <span>Step 1</span>
          <hr></hr>
          Any Sub-site which is not yet taken is available for you to make it
          your own online notepad. The Sub-site can be accessed either via the
          search feature or by directly accessing the sub-site using the URL.
          Once you get hold of the sub-site, you can simply store your notes
          there.
        </div>

        <div className="notes" id="hiw2" ref={hiw2}>
          <span>Step 2</span>
          <hr></hr>
          We encrypt the note entered by you with the password that you provide,
          the best part is that all this happens at the browser itself, thereby
          your note doesn't get to the server directly instead only the
          encrypted cipher of the message is stored in the server.
        </div>

        <div className="notes" id="hiw3" ref={hiw3}>
          <span>Step 3</span>
          <hr></hr>
          When you need to retrieve your note, you simply need to navigate to
          the url where your note has been saved, the server returns the
          encrypted cipher to your browser, and upon entering the correct
          password to decrypt it, the note is decrypted and rendered in the
          browser.
        </div>
      </div>
      <h4 id="FAQ-header">Frequently Asked Questions</h4>
      <div className="FAQ">
        <div className="questions">
          <h5>How is "Secure-txt" different ?</h5>
          <span>
            We don't store your notes on our servers, we only store the
            encrypted ciphers on our servers, so your information doesn't leave
            your browser.
          </span>
        </div>
        <div className="questions">
          <h5>Can I access my notes across devices ?</h5>
          <span>
            Yes you can access your notes across devices by just visting the
            sub-site url on your browser and entering your password gets your
            message decrypted in your browser.
          </span>
        </div>
        <div className="questions">
          <h5>How strong should my password be ?</h5>
          <span>
            We do recommend you to have a password with uppercase and lowercase
            letters with numbers and special characters taking the length of the
            password to a minimum of 8 characters.
          </span>
        </div>
      </div>
      <Footer></Footer>
      {navigate && <Navigate to={`/${url}`} />}
    </>
  );
}
