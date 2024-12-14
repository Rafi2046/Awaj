import axios from "axios";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/contact.php", formData)
      .then((response) => {
        if (response.data.message) {
          setResponseMessage(response.data.message);
          setFormData({ name: "", email: "", message: "" });
          console.log("line 25");
        } else if (response.data.error) {
          setResponseMessage(response.data.error);
          
          console.log("line 29");
        }
      })
      .catch((error) => {
        setResponseMessage("An error occurred. Please try again later.");
        console.log("line 34");
      });
  };

  return (
    <div>
      <h2>Contact Us</h2>
      {responseMessage && <p>{responseMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
