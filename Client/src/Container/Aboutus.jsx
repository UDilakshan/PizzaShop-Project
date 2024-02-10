import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import About from "../images/About.gif";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center bg-cyan-700 py-20">
      <div className="max-w-4xl px-8 py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl text-center font-semibold mb-6">Welcome to O'Pizza</h2>
        <div className="flex justify-center mb-8">
          <img
            src={About}
            alt="About"
            className="w-96 h-auto rounded-md shadow-2xl"
          />
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mt-4 mb-8">
          <span className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            Visit us on Google Maps:&nbsp;&nbsp;&nbsp; <a href="https://maps.app.goo.gl/bsn3BgkRqAiap26v6" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>Find us here</a>
          </span>
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to O'Pizza, where every slice tells a story of passion and taste. Since our inception on December 5, 2020, we've been dedicated to crafting the finest pizzas in Thirunelvely, Jaffna, Sri Lanka, using traditional cultural methods. At O'Pizza, we pride ourselves on our commitment to authenticity and quality. We do not use conventional ovens to bake our pizzas; instead, we employ <strong><span style={{ color: 'red' }}>fire foods and cultural techniques</span></strong> passed down through generations.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Nestled at <strong><span style={{ color: 'red' }}>15/2, 10th Lane, Thalankavil Pillayar Road</span></strong>, our cozy pizzeria offers a warm ambiance for dine-in guests, while also catering to those on the go with our convenient take-away service. However, our heart lies in delivery, as we strive to bring the irresistible flavors of O'Pizza to doorsteps across Jaffna city, all at no extra charge. With a commitment to quality and satisfaction, we invite you to experience the essence of authentic pizza. For inquiries or orders, simply reach out to us at <strong><span style={{ color: 'red' }}>0777134777</span></strong>. O'Pizza - where every bite is a taste of perfection.
        </p>
      
      </div>
    </div>
  );
}

export default AboutUs;