import React from "react";
import "./../App.css";
//React ComposeMail Component
class ComposeMail extends React.Component {
  constructor() {
    super();
    this.state = {
      To: "",
      Subject: "",
      Message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMail = this.submitMail.bind(this);
  }

  handleChange(event) {
    //Setting state based on id and value
    this.setState({ [event.target.id]: event.target.value });
  }
  //Submit Form
  submitMail(event) {
    //Prevent default form submit and refresh
    event.preventDefault();
    let mailDetails = {
      to: this.state.To,
      subject: this.state.Subject,
      text: this.state.Message,
    };
    fetch("http://localhost:8080/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailDetails),
    })
      .then(function (response) {
        if (!response.ok) {
          //Error
          throw Error(response.statusText);
        }
        return response;
      })
      .then(function (response) {
        //Successfully sent
        alert("Mail Sent Successfully");
      })
      .catch(function (error) {
        //Caught here
        alert("Error Sending Mail");
      });
  }

  render() {
    return (
      <div>
        <form>
          <label>
            To:
            <input
              type="text"
              id="To"
              value={this.state.To}
              onChange={this.handleChange}
              placeholder="To Address"
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              id="Subject"
              value={this.state.Subject}
              onChange={this.handleChange}
              placeholder="Subject"
            />
          </label>

          <label>
            Message:
            <textarea
              id="Message"
              value={this.state.Message}
              onChange={this.handleChange}
              placeholder="Message"
            ></textarea>
          </label>
          <button type="submit" onClick={this.submitMail}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default ComposeMail;
