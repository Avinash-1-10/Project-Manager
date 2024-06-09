import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { SiSkillshare } from "react-icons/si";
import Layout from "../Layout";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full shadow-lg rounded-lg overflow-hidden">
          <div
            className="bg-cover bg-center h-56 p-4"
            style={{
              backgroundImage: `url('https://source.unsplash.com/random/800x600')`,
            }}
          >
            <div className="flex justify-end">
              <button className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex justify-center -mt-16">
              <img
                className="w-32 h-32 object-cover rounded-full border-4 border-white"
                src="https://source.unsplash.com/random/200x200"
                alt="User avatar"
              />
            </div>
            <div className="text-center mt-2">
              <h2 className="text-2xl font-semibold text-gray-800">Jane Doe</h2>
              <p className="text-gray-600">Project Manager</p>
            </div>
            <div className="text-center mt-2">
              <p className="text-gray-600">
                Experienced project manager with over 10 years in the industry.
                Skilled in Agile methodologies, team leadership, and
                communication.
              </p>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
              <div className="flex flex-wrap justify-center mt-2">
                {[
                  "Agile",
                  "Scrum",
                  "Leadership",
                  "Communication",
                  "Risk Management",
                  "Team Building",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
                  >
                    <SiSkillshare className="inline-block mr-1" /> {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary mx-2">Follow</button>
              <button className="btn btn-secondary mx-2">Message</button>
            </div>
          </div>
          <div className="px-6 py-4 ">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
            </div>
            <div className="flex justify-center mt-2 space-x-6">
              <a href="mailto:jane.doe@example.com" className="text-gray-600">
                <FaEnvelope className="w-6 h-6" />
              </a>
              <a href="tel:+123456789" className="text-gray-600">
                <FaPhone className="w-6 h-6" />
              </a>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Social Media
              </h3>
            </div>
            <div className="flex justify-center mt-2 space-x-6">
              <a href="#" className="text-gray-600">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
