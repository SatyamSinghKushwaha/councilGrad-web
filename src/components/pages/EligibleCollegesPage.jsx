import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EligibleCollegesPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.colleges) {
    return (
      <div className="container py-24 text-center">
        <p className="text-gray-600">No data found. Please fill the form again.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { colleges, student } = state;

  return (
    <section className="container py-24">
      <h1 className="page-heading mb-6">Eligible Colleges</h1>

      <p className="text-gray-600 text-center mb-12">
        Based on your profile: <strong>{student.course}</strong> • {student.tenthMarks}% (10th) • {student.twelfthMarks}% (12th) • Budget ₹{student.budget}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="p-5 bg-white/70 backdrop-blur rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-xl">{college.name}</h3>
            <p className="text-gray-600 mt-1">{college.course}</p>

            <div className="mt-4 text-sm text-gray-700">
              <p>Min 10th: {college.minTenthMarks}%</p>
              <p>Min 12th: {college.minTwelfthMarks}%</p>
              <p>Max Budget: ₹{college.maxBudget}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EligibleCollegesPage;
