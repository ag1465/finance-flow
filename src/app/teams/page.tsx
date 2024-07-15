'use client';

import { FC } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Allen Guo',
    role: 'Software Developer',
    imageUrl: 'https://media.licdn.com/dms/image/C4E03AQEz2Dx4dAloFQ/profile-displayphoto-shrink_800_800/0/1571089219944?e=1726704000&v=beta&t=vnXP-54weQ7rblEIcRF62L88dW-409_3ap2yrfKhQvM',
    githubUrl: 'https://github.com/ag1465',
    linkedinUrl: 'https://www.linkedin.com/in/ag1465/',
  },
];

const TeamPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Our Team</h1>
        <div className="flex justify-center">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
              <img
                src={member.imageUrl}
                alt={`${member.name}'s photo`}
                className="h-40 w-40 rounded-full mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-gray-400 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaGithub size={24} />
                </a>
                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaLinkedin size={24} />
                </a>
              </div>
              <p className="text-gray-200 mb-4">"I am a Software Developer with over 4 years of experience in building web applications, particularly using React and Vue.js."</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
