import React, { useEffect, useState } from "react";
import DropdownField from "../common/DropdownField";
import PageWrapper from "../common/PageWrapper";   // <-- NEW

const CollegeCoursesPage = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState("");
  const [courses, setCourses] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [error, setError] = useState("");

  // Fetch all colleges
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoadingColleges(true);
        setError("");
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/colleges`
        );
        if (!res.ok) throw new Error("Failed to load colleges");
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        setError("Unable to load colleges. Please try again later.");
      } finally {
        setLoadingColleges(false);
      }
    };

    fetchColleges();
  }, []);

  // Fetch courses for selected college
  useEffect(() => {
    if (!selectedCollegeId) {
      setCourses([]);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        setError("");
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/colleges/${selectedCollegeId}/courses`
        );
        if (!res.ok) throw new Error("Failed to load courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError("Unable to load courses for this college.");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [selectedCollegeId]);

  return (
    <PageWrapper>
      <h1 className="hero-heading text-center text-3xl md:text-4xl font-extrabold mb-4">
        Courses Offered by Colleges
      </h1>

      <p className="hero-subtext text-center text-gray-700 mb-8">
        Select a college to see all programs, courses and specializations it provides.
      </p>

      <div className="bg-white/80 rounded-2xl shadow-lg p-6 md:p-8 mb-10 backdrop-blur-md border border-gray-200">
        <DropdownField
          label="College"
          value={selectedCollegeId}
          onChange={setSelectedCollegeId}
          options={colleges}
          placeholder={
            loadingColleges ? "Loading colleges..." : "Choose a college"
          }
        />

        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* Courses list */}
      {selectedCollegeId && (
        <div className="grid gap-4 md:grid-cols-2">
          {loadingCourses ? (
            <p className="text-center text-gray-600">Loading courses…</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-600">
              No courses found for this college.
            </p>
          ) : (
            courses.map((item, index) => (
              <div
                key={item.id || index}
                className="college-card p-4 rounded-2xl shadow-md bg-white/90 border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.courseName}
                </h3>

                {item.programName && (
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {item.programName}
                  </p>
                )}

                {item.specializationName && (
                  <p className="text-sm text-gray-700">
                    Specialization: {item.specializationName}
                  </p>
                )}

                {item.feePerYear && (
                  <p className="text-sm text-gray-700">
                    Fee / year: ₹{item.feePerYear}
                  </p>
                )}

                {item.durationYears && (
                  <p className="text-xs text-gray-500">
                    Duration: {item.durationYears} years
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

export default CollegeCoursesPage;
