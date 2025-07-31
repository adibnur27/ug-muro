// components/OrganizationStructure.jsx
import React from "react";
import organizationStructure from "../../data/organizationStructure";

const OrganizationStructure = () => {
  return (
    <div className="bg-deepBlend p-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-5 text-white font-orbitron">Our Team Structure</h2>
      <div className=" grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-items-center">
        {organizationStructure.map((member) => (
          <div
            key={member.id}
            className="group flex flex-col justify-end bg-blue-50 shadow-md mt-4 rounded-xl w-full max-w-48 h-52"
            style={{ backgroundImage: `url(${member.photo})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            {/* <img src={member.photo} alt={member.name} className="w-28 h-28 object-cover mx-auto mb-4 rounded-xl" /> */}
            <div className="bg-white/10 group-hover:bg-white/70 text-center transition-all duration-300 rounded-b-xl">
              <h3 className="text-lg font-semibold text-black group-hover:text-deepBlend transition-all duration-300 font-rajdhani">{member.name}</h3>
              <p className="text-sm text-gray-900 group-hover:text-black transition-all duration-300">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationStructure;
