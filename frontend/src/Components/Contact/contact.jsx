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
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
      <h1>Send Message</h1>
        </h2>
        {responseMessage && (
          <p className="mb-4 text-sm text-center text-green-500">
            {responseMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name:</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message:</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
