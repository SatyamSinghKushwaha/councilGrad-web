import React from "react";

const TestimonialCard = ({ quote, name, description, avatarColor }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm min-w-full md:min-w-[350px]">
        {/* Quote */}
        <p className="text-gray-800 mb-6 text-lg">"{quote}"</p>
        
        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* Avatar Circle */}
          <div 
            className="w-10 h-10 rounded-full" 
            style={{ backgroundColor: avatarColor }}
          />
          
          {/* Name and Description */}
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    );
  };

export default TestimonialCard;
  