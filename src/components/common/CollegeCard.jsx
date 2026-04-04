import React from "react";

const CollegeCard = ({ college, extra }) => {
  const locationLabel = college.location
    ? `Location: ${college.location}`
    : null;

  return (
    <div className="college-card flex flex-col gap-2 p-4 rounded-2xl shadow-md bg-white/80 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      <h3 className="text-lg font-semibold text-gray-900">{college.name}</h3>
      {locationLabel && <p className="text-sm text-gray-600">{locationLabel}</p>}
      {typeof college.ranking !== "undefined" && (
        <p className="text-xs text-gray-500">Ranking: {college.ranking}</p>
      )}

      {extra && (
        <div className="mt-2 text-xs text-gray-700 space-y-1">{extra}</div>
      )}
    </div>
  );
};

export default CollegeCard;
