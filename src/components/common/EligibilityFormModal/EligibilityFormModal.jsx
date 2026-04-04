import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EligibilityFormModal.module.css";
import {
  COURSE_OPTIONS,
  formatAcademicLabel,
  getSpecializationsForCourse,
} from "../../../constants/academics";

const ELIGIBILITY_RESULTS_KEY = "councilgrad.eligibilityResults";

const EligibilityFormModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tenthMarks: "",
    twelfthMarks: "",
    course: COURSE_OPTIONS[0],
    specialization: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const specializationOptions = getSpecializationsForCourse(formData.course);

  useEffect(() => {
    if (
      formData.specialization &&
      !specializationOptions.includes(formData.specialization)
    ) {
      setFormData((prev) => ({ ...prev, specialization: "" }));
    }
  }, [formData.specialization, specializationOptions]);

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
            tenthMarks: Number(formData.tenthMarks),
            twelfthMarks: Number(formData.twelfthMarks),
            desiredCourse: formData.course,
            desiredSpecialization: formData.specialization || null,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch colleges");

      const data = await response.json();
      const resultState = {
        colleges: data,
        student: {
          ...formData,
          course: formData.course,
          specialization: formData.specialization,
        },
      };

      try {
        sessionStorage.setItem(
          ELIGIBILITY_RESULTS_KEY,
          JSON.stringify(resultState)
        );
      } catch {
        // Ignore storage failures and continue with route state.
      }

      navigate("/eligible", { state: resultState });
      onClose();
    } catch {
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
          type="button"
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close eligibility form"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Check Your Eligibility
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className={styles.formInput}
            required
            type="number"
            min="0"
            max="100"
            placeholder="10th Marks (%)"
            name="tenthMarks"
            value={formData.tenthMarks}
            onChange={handleChange}
          />

          <input
            className={styles.formInput}
            required
            type="number"
            min="0"
            max="100"
            placeholder="12th Marks (%)"
            name="twelfthMarks"
            value={formData.twelfthMarks}
            onChange={handleChange}
          />

          <select
            className={styles.formInput}
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            {COURSE_OPTIONS.map((course) => (
              <option key={course} value={course}>
                {formatAcademicLabel(course)}
              </option>
            ))}
          </select>

          <select
            className={styles.formInput}
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option value="">Any specialization</option>
            {specializationOptions.map((specialization) => (
              <option key={specialization} value={specialization}>
                {formatAcademicLabel(specialization)}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-70"
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
