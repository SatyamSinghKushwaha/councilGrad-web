import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EligibilityFormModal.module.css";

const EligibilityFormModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    tenthMarks: "",
    twelfthMarks: "",
    course: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/students/eligible-colleges`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            tenthMarks: Number(formData.tenthMarks),
            twelfthMarks: Number(formData.twelfthMarks),
            desiredCourse: formData.course,
            budget: Number(formData.budget),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch colleges");

      const data = await response.json();
      navigate("/eligible", { state: { colleges: data, student: formData } });
      onClose();
    } catch (err) {
      setError("Something went wrong while fetching results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.modalOverlay} fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50`}
    >
      <div
        className={`${styles.modal} bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md relative`}
      >
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
            className={styles.formInput}
            required
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />

          <input
            className={styles.formInput}
            required
            type="number"
            placeholder="10th Marks (%)"
            name="tenthMarks"
            onChange={handleChange}
          />

          <input
            className={styles.formInput}
            required
            type="number"
            placeholder="12th Marks (%)"
            name="twelfthMarks"
            onChange={handleChange}
          />

          <input
            className={styles.formInput}
            required
            placeholder="Desired Course"
            name="course"
            onChange={handleChange}
          />

          <input
            className={styles.formInput}
            required
            type="number"
            placeholder="Budget (₹)"
            name="budget"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            {loading ? "Checking..." : "Submit"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default EligibilityFormModal;
