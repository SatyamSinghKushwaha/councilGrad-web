import React, { useEffect, useState } from "react";
import DropdownField from "../common/DropdownField";
import PageWrapper from "../common/PageWrapper";

const SpecializationsExplorerPage = () => {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [loadingMeta, setLoadingMeta] = useState(false);
  const [error, setError] = useState("");

  // Load programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoadingMeta(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/programs`);
        if (!res.ok) throw new Error("Failed to load programs");

        setPrograms(await res.json());
      } catch {
        setError("Unable to load programs.");
      } finally {
        setLoadingMeta(false);
      }
    };
    fetchPrograms();
  }, []);

  // Load courses for program
  useEffect(() => {
    if (!selectedProgramId) {
      setCourses([]);
      setSelectedCourseId("");
      setSpecializations([]);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoadingMeta(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/courses?programId=${selectedProgramId}`
        );
        if (!res.ok) throw new Error("Failed to load courses");

        setCourses(await res.json());
      } catch {
        setError("Unable to load courses.");
      } finally {
        setLoadingMeta(false);
      }
    };
    fetchCourses();
  }, [selectedProgramId]);

  // Load specializations for course
  useEffect(() => {
    if (!selectedCourseId) {
      setSpecializations([]);
      return;
    }

    const fetchSpecializations = async () => {
      try {
        setLoadingMeta(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/courses/${selectedCourseId}/specializations`
        );
        if (!res.ok) throw new Error("Failed to load specializations");

        setSpecializations(await res.json());
      } catch {
        setError("Unable to load specializations.");
      } finally {
        setLoadingMeta(false);
      }
    };
    fetchSpecializations();
  }, [selectedCourseId]);

  return (
    <PageWrapper>
      <h1 className="hero-heading text-center text-3xl md:text-4xl font-extrabold mb-4">
        Explore Specializations
      </h1>

      <p className="hero-subtext text-center mb-8 text-gray-700">
        Drill down from program → course → specialization.
      </p>

      <div className="bg-white/85 rounded-2xl shadow-lg p-6 md:p-8 mb-10 backdrop-blur-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DropdownField
            label="Program"
            value={selectedProgramId}
            onChange={(v) => {
              setSelectedProgramId(v);
              setSelectedCourseId("");
              setSpecializations([]);
            }}
            options={programs}
            placeholder={loadingMeta ? "Loading programs..." : "Select program"}
          />

          <DropdownField
            label="Course"
            value={selectedCourseId}
            onChange={setSelectedCourseId}
            options={courses}
            disabled={!selectedProgramId}
            placeholder={
              !selectedProgramId
                ? "Select program first"
                : loadingMeta
                ? "Loading courses..."
                : "Select course"
            }
          />
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>

      {/* Specializations list */}
      {selectedCourseId && (
        <div className="grid gap-4 md:grid-cols-2">
          {loadingMeta ? (
            <p className="text-center text-gray-600">Loading specializations…</p>
          ) : specializations.length === 0 ? (
            <p className="text-center text-gray-600">
              No specializations found for this course.
            </p>
          ) : (
            specializations.map((spec, idx) => (
              <div
                key={spec.id || idx}
                className="college-card p-4 rounded-2xl shadow-md bg-white/90 border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <h3 className="text-lg font-semibold text-gray-900">{spec.name}</h3>
                {spec.description && (
                  <p className="mt-1 text-sm text-gray-700">{spec.description}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default SpecializationsExplorerPage;
