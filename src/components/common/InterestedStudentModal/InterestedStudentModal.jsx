import React, { useEffect, useState } from "react";
import styles from "../EligibilityFormModal/EligibilityFormModal.module.css";
import {
  COURSE_OPTIONS,
  formatAcademicLabel,
  getSpecializationsForCourse,
} from "../../../constants/academics";

const InterestedStudentModal = ({ onClose, sourcePage = "website" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    desiredCourse: "",
    desiredSpecialization: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const specializationOptions = getSpecializationsForCourse(
    formData.desiredCourse
  );

  useEffect(() => {
    if (
      formData.desiredSpecialization &&
      !specializationOptions.includes(formData.desiredSpecialization)
    ) {
      setFormData((prev) => ({ ...prev, desiredSpecialization: "" }));
    }
  }, [formData.desiredSpecialization, specializationOptions]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/interested-students`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            sourcePage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit interest");
      }

      setSuccess("Thanks. Our team will reach out shortly.");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch {
      setError("We could not submit your enquiry right now.");
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
          aria-label="Close enquiry form"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Talk to the admissions team
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Leave your details and we will help with colleges, courses, fees, and
          next steps.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className={styles.formInput}
            required
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className={styles.formInput}
            required
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            className={styles.formInput}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className={styles.formInput}
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <select
            className={styles.formInput}
            name="desiredCourse"
            value={formData.desiredCourse}
            onChange={handleChange}
          >
            <option value="">Preferred course</option>
            {COURSE_OPTIONS.map((course) => (
              <option key={course} value={course}>
                {formatAcademicLabel(course)}
              </option>
            ))}
          </select>
          <select
            className={styles.formInput}
            name="desiredSpecialization"
            value={formData.desiredSpecialization}
            onChange={handleChange}
            disabled={!formData.desiredCourse}
          >
            <option value="">
              {formData.desiredCourse
                ? "Preferred specialization"
                : "Select course first"}
            </option>
            {specializationOptions.map((specialization) => (
              <option key={specialization} value={specialization}>
                {formatAcademicLabel(specialization)}
              </option>
            ))}
          </select>
          <textarea
            className={styles.formInput}
            name="notes"
            placeholder="Anything specific we should know?"
            value={formData.notes}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Send Enquiry"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-3">{success}</p>}
      </div>
    </div>
  );
};

export default InterestedStudentModal;
