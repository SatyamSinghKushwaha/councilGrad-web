import React, { useEffect, useState } from "react";
import DropdownField from "../common/DropdownField";
import PageWrapper from "../common/PageWrapper";

const SpecializationsExplorerPage = () => {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [allSpecializations, setAllSpecializations] = useState([]);

  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [loadingMeta, setLoadingMeta] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgramsAndSpecializations = async () => {
      try {
        setLoadingMeta(true);
        setError("");
        const [programsRes, specializationsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/programs`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/specializations`),
        ]);
        if (!programsRes.ok || !specializationsRes.ok) {
          throw new Error("Failed to load data");
        }

        setPrograms(await programsRes.json());
        const specializationsData = await specializationsRes.json();
        setAllSpecializations(specializationsData);
        setSpecializations(specializationsData);
      } catch {
        setError("Unable to load specializations right now.");
      } finally {
        setLoadingMeta(false);
      }
    };

    fetchProgramsAndSpecializations();
  }, []);

  useEffect(() => {
    if (!selectedProgramId) {
      setCourses([]);
      setSelectedCourseId("");
      setSpecializations(allSpecializations);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoadingMeta(true);
        setError("");
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
  }, [selectedProgramId, allSpecializations]);

  useEffect(() => {
    if (!selectedCourseId) {
      setSpecializations(allSpecializations);
      return;
    }

    const fetchSpecializations = async () => {
      try {
        setLoadingMeta(true);
        setError("");
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
  }, [selectedCourseId, allSpecializations]);

  return (
    <PageWrapper>
      <h1 className="hero-heading text-center text-3xl md:text-4xl font-extrabold mb-4">
        Explore Specializations
      </h1>

      <p className="hero-subtext text-center mb-8 text-gray-700">
        Browse every specialization immediately, or narrow it down by program
        and course.
      </p>

      <div className="bg-white/85 rounded-2xl shadow-lg p-6 md:p-8 mb-10 backdrop-blur-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DropdownField
            label="Program"
            value={selectedProgramId}
            onChange={(value) => {
              setSelectedProgramId(value);
              setSelectedCourseId("");
              setSpecializations([]);
              setError("");
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

      {selectedCourseId && (
        <div className="grid gap-4 md:grid-cols-2">
          {loadingMeta ? (
            <p className="text-center text-gray-600">
              Loading specializations...
            </p>
          ) : specializations.length === 0 ? (
            <p className="text-center text-gray-600">
              No specializations found for this selection.
            </p>
          ) : (
            specializations.map((spec, idx) => (
              <div
                key={spec.id || idx}
                className="college-card p-4 rounded-2xl shadow-md bg-white/90 border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {spec.name}
                </h3>
                {spec.description && (
                  <p className="mt-1 text-sm text-gray-700">
                    {spec.description}
                  </p>
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
