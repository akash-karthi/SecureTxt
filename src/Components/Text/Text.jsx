import { React, Component, useState } from "react";
import CryptoJS from "crypto-js";
import Alerts from "../Alerts/Alerts";
import "./Text.css";

export default class Text extends Component {
  constructor() {
    super();
    this.state = {
      decryptMsgHash: "",
      urlInUse: false,
      data: {},
      alertMessage: "",
      alertType: "",
    };
  }

  showForm = (encrypt) => {
    // console.log("me called");
    document.querySelector(".container").style.opacity = "0.5";
    document.querySelector(".container").style.pointerEvents = "none";
    document.querySelector(".form-floating").style.display = "flex";
  };

  hideForm() {
    document.querySelector(".container").style = "";
    document.querySelector(".form-floating").style.display = "";
    document.getElementById("password").value = "";
    document.getElementById("reEnterPassword").value = "";
  }

  postData = async () => {
    await fetch("http://192.168.14.59:8080", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(this.state.data),
    });
  };

  passwordPrompt = () => {
    let encrypt = !this.state.urlInUse || this.state.decryptMsgHash != "";
    console.log("me called", encrypt, this.state.decryptMsgHash);
    if (encrypt) {
      // let password = prompt("Enter password");
      let password = document.getElementById("password").value;
      let message = document.getElementById("message").value;
      let messagehash = CryptoJS.SHA512(message).toString();
      var ciphertext = CryptoJS.AES.encrypt(
        message.trim(),
        password.trim()
      ).toString();
      let url = document.location["href"].toString();
      let urlHash = CryptoJS.SHA512(url).toString();
      if (this.state.urlInUse == true) {
        this.setState(
          {
            data: {
              encNote: ciphertext,
              hashOfContent: messagehash,
              urlHash: urlHash,
              oldMsgHash: this.state.decryptMsgHash,
            },
          },
          async () => {
            await this.postData();
            this.setState({ oldMsgHash: this.state.hashOfContent });
            this.setState({
              alertType: "success",
              alertMessage: "Sucessfully Updated the content",
            });
          }
        );
      } else {
        this.setState(
          {
            data: {
              encNote: ciphertext,
              hashOfContent: messagehash,
              urlHash: urlHash,
              oldMsgHash: null,
            },
          },
          async () => {
            await this.postData();
            this.setState({
              alertType: "success",
              alertMessage: "Sucessfully encrypted and saved",
            });
          }
        );
      }
    } else {
      console.log("here");
      let password = document.querySelector("#password").value;
      console.log(password);
      let clearText = CryptoJS.AES.decrypt(
        this.state.data["encNote"],
        password
      ).toString(CryptoJS.enc.Utf8);
      if (clearText != "") {
        document.getElementById("message").value = clearText;
        let oldmsgHash = CryptoJS.SHA512(clearText).toString();
        this.setState({ decryptMsgHash: oldmsgHash });
        this.hideForm();
        this.setState({
          alertType: "success",
          alertMessage: "Sucessfully decrypted",
        });
      } else {
        document.getElementById("password").value = "";
        document.getElementById("reEnterPassword").value = "";
        this.setState({
          alertType: "danger",
          alertMessage: "Incorrect Password",
        });
      }
    }
  };

  async componentDidMount() {
    let url =
      "http://192.168.14.59:8080/" + document.location["href"].split("/")[3];
    await fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((Json) => {
        if (Json["encNote"] != "none") {
          this.setState({ urlInUse: true });
          this.setState({ data: Json });
          this.showForm(false);
          console.log("in true part");
        }
      });
  }

  callPasswordPrompt = (encrypt) => {
    console.log(
      document.getElementById("password").value ==
        document.getElementById("reEnterPassword").value
    );
    if (
      document.getElementById("password").value ==
      document.getElementById("reEnterPassword").value
    )
      this.passwordPrompt(encrypt);
    console.log("Password Prompt called");
  };
  render() {
    return (
      <>
        <Alerts
          type={this.state.alertType}
          msg={this.state.alertMessage}
        ></Alerts>
        <div>
          <div className="form-floating">
            <span id="decrypt-txt">
              Enter password to{" "}
              {this.state.urlInUse && this.state.decryptMsgHash == ""
                ? "decrypt"
                : "encrypt"}{" "}
            </span>
            <div>
              <span>Password:</span>
              <input
                type="password"
                className="floatingPassword"
                id="password"
                placeholder="Password"
              />
            </div>
            <div>
              <span>Re-enter Password:</span>
              <input
                type="password"
                className="floatingPassword"
                id="reEnterPassword"
                placeholder="Password"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              id="encryptDecrypt"
              onClick={this.passwordPrompt}
            >
              {this.state.urlInUse && this.state.decryptMsgHash == ""
                ? "Decrypt"
                : "Encrypt"}
            </button>
            <button
              type="button"
              id="encryptClose"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={this.hideForm}
            ></button>
          </div>
          <div className="container">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Sub-site URI
              </label>
              <input
                type="URI"
                className="form-control"
                id="exampleFormControlInput1"
                value={document.location.toString().split("/")[3]}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Drop in your text here
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="8"
              ></textarea>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.showForm();
              }}
            >
              Secure-it
            </button>
          </div>
        </div>
      </>
    );
  }
}
