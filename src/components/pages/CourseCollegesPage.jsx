import React, { useEffect, useState } from "react";
import DropdownField from "../common/DropdownField";
import CollegeCard from "../common/CollegeCard";
import PageWrapper from "../common/PageWrapper";

const CourseCollegesPage = () => {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [colleges, setColleges] = useState([]);

  const [loadingMeta, setLoadingMeta] = useState(false);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [error, setError] = useState("");

  // Load programs on mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoadingMeta(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/programs`);
        if (!res.ok) throw new Error("Failed to load programs");

        const data = await res.json();
        setPrograms(data);
      } catch {
        setError("Unable to load programs.");
      } finally {
        setLoadingMeta(false);
      }
    };
    fetchPrograms();
  }, []);

  // Load courses when program changes
  useEffect(() => {
    if (!selectedProgramId) {
      setCourses([]);
      setSelectedCourseId("");
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoadingMeta(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/courses?programId=${selectedProgramId}`
        );
        if (!res.ok) throw new Error("Failed to load courses");

        const data = await res.json();
        setCourses(data);
      } catch {
        setError("Unable to load courses for this program.");
      } finally {
        setLoadingMeta(false);
      }
    };
    fetchCourses();
  }, [selectedProgramId]);

  // Load colleges when course changes
  useEffect(() => {
    if (!selectedCourseId) {
      setColleges([]);
      return;
    }

    const fetchColleges = async () => {
      try {
        setLoadingColleges(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/courses/${selectedCourseId}/colleges`
        );
        if (!res.ok) throw new Error("Failed to load colleges");

        const data = await res.json();
        setColleges(data);
      } catch {
        setError("Unable to load colleges for this course.");
      } finally {
        setLoadingColleges(false);
      }
    };
    fetchColleges();
  }, [selectedCourseId]);

  return (
    <PageWrapper>
      <h1 className="hero-heading text-center text-3xl md:text-4xl font-extrabold mb-4">
        Colleges Offering a Course
      </h1>

      <p className="hero-subtext text-center mb-8 text-gray-700">
        Choose a program and course to discover all colleges that offer it.
      </p>

      <div className="bg-white/85 rounded-2xl shadow-lg p-6 md:p-8 mb-10 backdrop-blur-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DropdownField
            label="Program"
            value={selectedProgramId}
            onChange={(v) => {
              setSelectedProgramId(v);
              setSelectedCourseId("");
              setColleges([]);
            }}
            options={programs}
            placeholder={loadingMeta ? "Loading programs..." : "Select program"}
          />

          <DropdownField
            label="Course"
            value={selectedCourseId}
            onChange={setSelectedCourseId}
            options={courses}
            disabled={!selectedProgramId || courses.length === 0}
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

      {/* Colleges list */}
      {selectedCourseId && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loadingColleges ? (
            <p className="text-center text-gray-600">Loading colleges…</p>
          ) : colleges.length === 0 ? (
            <p className="text-center text-gray-600">
              No colleges found for this course yet.
            </p>
          ) : (
            colleges.map((college, idx) => (
              <div
                key={college.id || idx}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <CollegeCard
                  college={college}
                  extra={
                    college.feePerYear && (
                      <p>Approx. Fee / year: ₹{college.feePerYear}</p>
                    )
                  }
                />
              </div>
            ))
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default CourseCollegesPage;
