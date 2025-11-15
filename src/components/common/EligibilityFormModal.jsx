import React, { useState } from "react";

const EligibilityFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    tenthMarks: "",
    twelfthMarks: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Submitted:\nName: ${formData.name}\n10th Marks: ${formData.tenthMarks}\n12th Marks: ${formData.twelfthMarks}\nCourse: ${formData.course}`
    );
    onClose();
  };

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fade-in">
      <div className="modal bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md relative animate-slide-up">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Check Your Eligibility
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="number"
            name="tenthMarks"
            placeholder="10th Marks (%)"
            value={formData.tenthMarks}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="number"
            name="twelfthMarks"
            placeholder="12th Marks (%)"
            value={formData.twelfthMarks}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="course"
            placeholder="Desired Course"
            value={formData.course}
            onChange={handleChange}
            required
            className="form-input"
          />

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EligibilityFormModal;
