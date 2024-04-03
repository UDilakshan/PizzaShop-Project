import React, { useState } from 'react';
import { contact_types } from '../utils/data';

const ContactUs = () => {
  // Define state variables for form fields
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all details are filled correctly
    if (fname && lname && email && phone && message && !emailError) {
      console.log("Form submitted!");
      console.log("First Name:", fname);
      console.log("Last Name:", lname);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("Message:", message);
      
      // Reset form fields and show success message
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setMessage("");
      setEmailError("");
      setFormSubmitted(true);
    } else {
      // Show error message if details are not filled correctly
      setFormSubmitted(false);
      console.log("Please fill in all details correctly.");
    }
  };

  const validateEmailFormat = (input) => {
    return pattern.test(input);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    if (!validateEmailFormat(inputValue) && inputValue !== "") {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="flex items-center justify-center bg-cyan-900 p-20 mt-12 pb-40">
      <form className="w-full max-w-lg bg-white rounded-lg p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-semibold mb-6">FEEDBACK FORM</h2>

        <div className='w-full mb-6'>
          <div className='flex items-center gap-2'>
            <select className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
              <option value="other" className='bg-white'>Contact</option>
              { contact_types && contact_types.map(item => (
                <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor' value={item.urlParamName}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" htmlFor="grid-first-name">First Name</label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder=""
              value={fname}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/[^A-Za-z]/ig, '').substring(0, 20);
                setFname(inputValue);
              }}
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" htmlFor="grid-last-name">Last Name</label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={lname}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/[^A-Za-z]/ig, '').substring(0, 20);
                setLname(inputValue);
              }}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" htmlFor="grid-email">Email</label>
            <input
              className={`appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${emailError ? 'border-red-500' : ''}`}
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" htmlFor="grid-phone">Phone Number</label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="tel"
              placeholder=""
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D+/g, '').substring(0, 10))}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" htmlFor="grid-message">Message</label>
            <textarea
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value.replace(/[^A-Za-z0-9\s]/ig, ''))}
              required
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-pink-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>

        {formSubmitted && (
          <div className="text-green-500 text-center mt-4">Thank you for your feedback.</div>
        )}
      </form>
    </div>
  );
};

export default ContactUs;