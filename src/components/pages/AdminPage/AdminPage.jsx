import React, { useEffect, useMemo, useState } from "react";
import PageWrapper from "../../common/PageWrapper";
import styles from "./AdminPage.module.css";
import {
  COURSE_OPTIONS,
  LEAD_STATUS_OPTIONS,
  PROGRAM_OPTIONS,
  formatAcademicLabel,
  getSpecializationsForCourse,
} from "../../../constants/academics";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialCollege = {
  name: "",
  location: "",
  website: "",
  description: "",
};

const initialProgram = {
  name: "UG",
  description: "",
};

const initialCourse = {
  programId: "",
  name: "B_TECH",
  level: "",
};

const initialSpecialization = {
  courseId: "",
  name: "AI_ML",
  description: "",
};

const initialCollegeCourse = {
  collegeId: "",
  courseId: "",
  feePerYear: "",
  durationYears: "",
  seats: "",
};

const AdminPage = () => {
  const [session, setSession] = useState({
    authenticated: false,
    username: null,
  });
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [interestedStudents, setInterestedStudents] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const [collegeForm, setCollegeForm] = useState(initialCollege);
  const [programForm, setProgramForm] = useState(initialProgram);
  const [courseForm, setCourseForm] = useState(initialCourse);
  const [specializationForm, setSpecializationForm] = useState(
    initialSpecialization
  );
  const [collegeCourseForm, setCollegeCourseForm] = useState(
    initialCollegeCourse
  );
  const [editingCollegeId, setEditingCollegeId] = useState(null);
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingSpecializationId, setEditingSpecializationId] = useState(null);
  const [editingMappingId, setEditingMappingId] = useState(null);

  const counts = useMemo(
    () => [
      { label: "Programs", value: programs.length },
      { label: "Courses", value: courses.length },
      { label: "Colleges", value: colleges.length },
      { label: "Specializations", value: specializations.length },
      { label: "Offerings", value: mappings.length },
      { label: "Interested Students", value: interestedStudents.length },
    ],
    [programs, courses, colleges, specializations, mappings, interestedStudents]
  );

  const selectedSpecializationCourse = useMemo(
    () => courses.find((course) => String(course.id) === specializationForm.courseId),
    [courses, specializationForm.courseId]
  );

  const specializationNameOptions = getSpecializationsForCourse(
    selectedSpecializationCourse?.name
  );

  useEffect(() => {
    if (
      specializationForm.name &&
      !specializationNameOptions.includes(specializationForm.name)
    ) {
      setSpecializationForm((prev) => ({ ...prev, name: "" }));
    }
  }, [specializationForm.name, specializationNameOptions]);

  const fetchJson = async (path, options = {}) => {
    const response = await fetch(`${backendUrl}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      let bodyText = "";
      try {
        bodyText = await response.text();
      } catch {
        bodyText = "";
      }

      throw new Error(bodyText || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  };

  const loadAdminData = React.useCallback(async () => {
    setLoadingData(true);
    setError("");

    try {
      const [
        programData,
        courseData,
        collegeData,
        specializationData,
        mappingData,
        interestedStudentsData,
      ] =
        await Promise.all([
          fetchJson("/api/programs"),
          fetchJson("/api/courses"),
          fetchJson("/api/colleges"),
          fetchJson("/api/specializations"),
          fetchJson("/api/college-courses"),
          fetchJson("/api/interested-students"),
        ]);

      setPrograms(programData);
      setCourses(courseData);
      setColleges(collegeData);
      setSpecializations(specializationData);
      setMappings(mappingData);
      setInterestedStudents(interestedStudentsData);
    } catch {
      setError("Unable to load admin data.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await fetchJson("/api/admin/session", {
          headers: {},
        });
        setSession(data);
      } catch {
        setSession({ authenticated: false, username: null });
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (session.authenticated) {
      loadAdminData();
    }
  }, [session.authenticated, loadAdminData]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    setMessage("");

    try {
      const data = await fetchJson("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(loginForm),
      });
      setSession(data);
      setLoginForm({ username: "", password: "" });
      setMessage("Admin login successful.");
    } catch {
      setLoginError("Invalid credentials. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetchJson("/api/admin/logout", { method: "POST" });
    } catch {
      // Ignore logout errors and clear local state anyway.
    }

    setSession({ authenticated: false, username: null });
    setPrograms([]);
    setCourses([]);
    setColleges([]);
    setSpecializations([]);
    setMappings([]);
    setInterestedStudents([]);
    setMessage("");
    setError("");
  };

  const submitForm = async ({
    path,
    method = "POST",
    payload,
    successMessage,
    reset,
  }) => {
    setError("");
    setMessage("");

    try {
      await fetchJson(path, {
        method,
        body: JSON.stringify(payload),
      });
      setMessage(successMessage);
      reset();
      await loadAdminData();
    } catch {
      setError("Could not save this record. Please verify the fields and login status.");
    }
  };

  const updateLeadTag = async (id, statusTag) => {
    setError("");
    setMessage("");

    try {
      await fetchJson(`/api/interested-students/${id}/tag`, {
        method: "PUT",
        body: JSON.stringify({ statusTag }),
      });
      setMessage("Lead tag updated.");
      await loadAdminData();
    } catch {
      setError("Could not update the lead tag.");
    }
  };

  const deleteEntity = async (path, successMessage) => {
    setError("");
    setMessage("");

    try {
      await fetchJson(path, { method: "DELETE" });
      setMessage(successMessage);
      await loadAdminData();
    } catch {
      setError("Could not delete this record. It may still be linked to other data.");
    }
  };

  const startCollegeEdit = (college) => {
    setEditingCollegeId(college.id);
    setCollegeForm({
      name: college.name || "",
      location: college.location || "",
      website: college.website || "",
      description: college.description || "",
    });
  };

  const startProgramEdit = (program) => {
    setEditingProgramId(program.id);
    setProgramForm({
      name: program.name || "UG",
      description: program.description || "",
    });
  };

  const startCourseEdit = (course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      programId: String(course.programId || ""),
      name: course.name || "B_TECH",
      level: course.level || "",
    });
  };

  const startSpecializationEdit = (specialization) => {
    setEditingSpecializationId(specialization.id);
    setSpecializationForm({
      courseId: String(specialization.courseId || ""),
      name: specialization.name || "AI_ML",
      description: specialization.description || "",
    });
  };

  const startMappingEdit = (mapping) => {
    setEditingMappingId(mapping.id);
    setCollegeCourseForm({
      collegeId: String(mapping.collegeId || ""),
      courseId: String(mapping.courseId || ""),
      feePerYear: String(mapping.feePerYear ?? ""),
      durationYears: String(mapping.durationYears ?? ""),
      seats: String(mapping.seats ?? ""),
    });
  };

  const resetCollegeForm = () => {
    setEditingCollegeId(null);
    setCollegeForm(initialCollege);
  };

  const resetProgramForm = () => {
    setEditingProgramId(null);
    setProgramForm(initialProgram);
  };

  const resetCourseForm = () => {
    setEditingCourseId(null);
    setCourseForm(initialCourse);
  };

  const resetSpecializationForm = () => {
    setEditingSpecializationId(null);
    setSpecializationForm(initialSpecialization);
  };

  const resetMappingForm = () => {
    setEditingMappingId(null);
    setCollegeCourseForm(initialCollegeCourse);
  };

  if (checkingSession) {
    return (
      <PageWrapper>
        <p className={styles.centerText}>Checking admin session...</p>
      </PageWrapper>
    );
  }

  if (!session.authenticated) {
    return (
      <PageWrapper>
        <section className={styles.loginShell}>
          <div className={styles.loginCard}>
            <p className={styles.eyebrow}>Admin Access</p>
            <h1 className={styles.heading}>Sign in to manage CouncilGrad data</h1>
            <p className={styles.subtext}>
              Use your admin credentials to add colleges, programs, courses,
              specializations, course offerings, and track student interest.
            </p>

            <form className={styles.loginForm} onSubmit={handleLogin}>
              <input
                className={styles.input}
                type="text"
                placeholder="Username"
                value={loginForm.username}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                required
              />
              <button
                className={styles.primaryButton}
                type="submit"
                disabled={loginLoading}
              >
                {loginLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {loginError && <p className={styles.error}>{loginError}</p>}
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className={styles.topBar}>
        <div>
          <p className={styles.eyebrow}>Admin Panel</p>
          <h1 className={styles.heading}>Manage database content</h1>
          <p className={styles.subtext}>
            Signed in as <strong>{session.username}</strong>
          </p>
        </div>
        <button className={styles.secondaryButton} type="button" onClick={handleLogout}>
          Logout
        </button>
      </section>

      <section className={styles.statsGrid}>
        {counts.map((item) => (
          <div key={item.label} className={styles.statCard}>
            <p className={styles.statValue}>{item.value}</p>
            <p className={styles.statLabel}>{item.label}</p>
          </div>
        ))}
      </section>

      {(message || error) && (
        <div className={message ? styles.successBanner : styles.errorBanner}>
          {message || error}
        </div>
      )}

      {loadingData ? (
        <p className={styles.centerText}>Loading admin data...</p>
      ) : (
        <div className={styles.formsGrid}>
          <section className={`${styles.panel} ${styles.panelWide}`}>
            <h2 className={styles.panelTitle}>Interested Students</h2>
            {interestedStudents.length === 0 ? (
              <p className={styles.emptyText}>No enquiries submitted yet.</p>
            ) : (
              <div className={styles.leadGrid}>
                {interestedStudents.map((lead) => (
                  <article key={lead.id} className={styles.leadCard}>
                    <div className={styles.leadHeader}>
                      <div>
                        <h3 className={styles.leadName}>{lead.name}</h3>
                        <p className={styles.leadMeta}>
                          {lead.phone}
                          {lead.email ? ` | ${lead.email}` : ""}
                        </p>
                      </div>
                      <span className={styles.tagPill}>{lead.sourcePage}</span>
                    </div>
                    <p className={styles.leadMeta}>
                      {lead.city || "City not shared"}
                    </p>
                    <p className={styles.leadMeta}>
                      Course: {lead.desiredCourse || "Not specified"}
                    </p>
                    <p className={styles.leadMeta}>
                      Specialization: {lead.desiredSpecialization || "Open"}
                    </p>
                    {lead.notes && <p className={styles.leadNotes}>{lead.notes}</p>}
                    <div className={styles.leadActions}>
                      <span className={styles.statusLabel}>Tag</span>
                      <select
                        className={styles.select}
                        value={lead.statusTag}
                        onChange={(event) => updateLeadTag(lead.id, event.target.value)}
                      >
                        {LEAD_STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>
                {editingCollegeId ? "Edit College" : "Add College"}
              </h2>
              {editingCollegeId && (
                <button className={styles.inlineButton} type="button" onClick={resetCollegeForm}>
                  Cancel
                </button>
              )}
            </div>
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                submitForm({
                  path: editingCollegeId ? `/api/colleges/${editingCollegeId}` : "/api/colleges",
                  method: editingCollegeId ? "PUT" : "POST",
                  payload: collegeForm,
                  successMessage: editingCollegeId
                    ? "College updated successfully."
                    : "College added successfully.",
                  reset: resetCollegeForm,
                });
              }}
            >
              <input
                className={styles.input}
                placeholder="College name"
                value={collegeForm.name}
                onChange={(event) =>
                  setCollegeForm((prev) => ({ ...prev, name: event.target.value }))
                }
                required
              />
              <input
                className={styles.input}
                placeholder="Location"
                value={collegeForm.location}
                onChange={(event) =>
                  setCollegeForm((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
              />
              <input
                className={styles.input}
                placeholder="Website"
                value={collegeForm.website}
                onChange={(event) =>
                  setCollegeForm((prev) => ({ ...prev, website: event.target.value }))
                }
              />
              <textarea
                className={styles.textarea}
                placeholder="Description"
                value={collegeForm.description}
                onChange={(event) =>
                  setCollegeForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
              />
              <button className={styles.primaryButton} type="submit">
                {editingCollegeId ? "Update college" : "Save college"}
              </button>
            </form>
            <div className={styles.recordList}>
              {colleges.map((college) => (
                <div key={college.id} className={styles.recordCard}>
                  <div>
                    <p className={styles.recordTitle}>{college.name}</p>
                    <p className={styles.recordMeta}>
                      {college.location || "Location not set"}
                    </p>
                  </div>
                  <div className={styles.recordActions}>
                    <button className={styles.inlineButton} type="button" onClick={() => startCollegeEdit(college)}>
                      Edit
                    </button>
                    <button className={styles.dangerButton} type="button" onClick={() => deleteEntity(`/api/colleges/${college.id}`, "College deleted.")}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>
                {editingProgramId ? "Edit Program" : "Add Program"}
              </h2>
              {editingProgramId && (
                <button className={styles.inlineButton} type="button" onClick={resetProgramForm}>
                  Cancel
                </button>
              )}
            </div>
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                submitForm({
                  path: editingProgramId ? `/api/programs/${editingProgramId}` : "/api/programs",
                  method: editingProgramId ? "PUT" : "POST",
                  payload: programForm,
                  successMessage: editingProgramId
                    ? "Program updated successfully."
                    : "Program added successfully.",
                  reset: resetProgramForm,
                });
              }}
            >
              <select
                className={styles.select}
                value={programForm.name}
                onChange={(event) =>
                  setProgramForm((prev) => ({ ...prev, name: event.target.value }))
                }
              >
                {PROGRAM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <textarea
                className={styles.textarea}
                placeholder="Description"
                value={programForm.description}
                onChange={(event) =>
                  setProgramForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
              />
              <button className={styles.primaryButton} type="submit">
                {editingProgramId ? "Update program" : "Save program"}
              </button>
            </form>
            <div className={styles.recordList}>
              {programs.map((program) => (
                <div key={program.id} className={styles.recordCard}>
                  <div>
                    <p className={styles.recordTitle}>{program.name}</p>
                    <p className={styles.recordMeta}>
                      {program.description || "No description yet"}
                    </p>
                  </div>
                  <div className={styles.recordActions}>
                    <button className={styles.inlineButton} type="button" onClick={() => startProgramEdit(program)}>
                      Edit
                    </button>
                    <button className={styles.dangerButton} type="button" onClick={() => deleteEntity(`/api/programs/${program.id}`, "Program deleted.")}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>
                {editingCourseId ? "Edit Course" : "Add Course"}
              </h2>
              {editingCourseId && (
                <button className={styles.inlineButton} type="button" onClick={resetCourseForm}>
                  Cancel
                </button>
              )}
            </div>
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                submitForm({
                  path: editingCourseId ? `/api/courses/${editingCourseId}` : "/api/courses",
                  method: editingCourseId ? "PUT" : "POST",
                  payload: {
                    ...courseForm,
                    programId: Number(courseForm.programId),
                  },
                  successMessage: editingCourseId
                    ? "Course updated successfully."
                    : "Course added successfully.",
                  reset: resetCourseForm,
                });
              }}
            >
              <select
                className={styles.select}
                value={courseForm.programId}
                onChange={(event) =>
                  setCourseForm((prev) => ({
                    ...prev,
                    programId: event.target.value,
                  }))
                }
                required
              >
                <option value="">Select program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
              <select
                className={styles.select}
                value={courseForm.name}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, name: event.target.value }))
                }
              >
                {COURSE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                className={styles.input}
                placeholder="Level"
                value={courseForm.level}
                onChange={(event) =>
                  setCourseForm((prev) => ({ ...prev, level: event.target.value }))
                }
              />
              <button className={styles.primaryButton} type="submit">
                {editingCourseId ? "Update course" : "Save course"}
              </button>
            </form>
            <div className={styles.recordList}>
              {courses.map((course) => (
                <div key={course.id} className={styles.recordCard}>
                  <div>
                    <p className={styles.recordTitle}>{course.name}</p>
                    <p className={styles.recordMeta}>
                      {course.programName || "Program not set"}
                      {course.level ? ` | ${course.level}` : ""}
                    </p>
                  </div>
                  <div className={styles.recordActions}>
                    <button className={styles.inlineButton} type="button" onClick={() => startCourseEdit(course)}>
                      Edit
                    </button>
                    <button className={styles.dangerButton} type="button" onClick={() => deleteEntity(`/api/courses/${course.id}`, "Course deleted.")}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>
                {editingSpecializationId ? "Edit Specialization" : "Add Specialization"}
              </h2>
              {editingSpecializationId && (
                <button className={styles.inlineButton} type="button" onClick={resetSpecializationForm}>
                  Cancel
                </button>
              )}
            </div>
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                submitForm({
                  path: editingSpecializationId
                    ? `/api/specializations/${editingSpecializationId}`
                    : "/api/specializations",
                  method: editingSpecializationId ? "PUT" : "POST",
                  payload: {
                    ...specializationForm,
                    courseId: Number(specializationForm.courseId),
                  },
                  successMessage: editingSpecializationId
                    ? "Specialization updated successfully."
                    : "Specialization added successfully.",
                  reset: resetSpecializationForm,
                });
              }}
            >
              <select
                className={styles.select}
                value={specializationForm.courseId}
                onChange={(event) =>
                  setSpecializationForm((prev) => ({
                    ...prev,
                    courseId: event.target.value,
                  }))
                }
                required
              >
                <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {formatAcademicLabel(course.name)}
                  </option>
                ))}
              </select>
              <select
                className={styles.select}
                value={specializationForm.name}
                onChange={(event) =>
                  setSpecializationForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
              >
                <option value="">
                  {selectedSpecializationCourse
                    ? "Select specialization"
                    : "Select course first"}
                </option>
                {specializationNameOptions.map((option) => (
                  <option key={option} value={option}>
                    {formatAcademicLabel(option)}
                  </option>
                ))}
              </select>
              <textarea
                className={styles.textarea}
                placeholder="Description"
                value={specializationForm.description}
                onChange={(event) =>
                  setSpecializationForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
              />
              <button className={styles.primaryButton} type="submit">
                {editingSpecializationId ? "Update specialization" : "Save specialization"}
              </button>
            </form>
            <div className={styles.recordList}>
              {specializations.map((specialization) => (
                <div key={specialization.id} className={styles.recordCard}>
                  <div>
                    <p className={styles.recordTitle}>{specialization.name}</p>
                    <p className={styles.recordMeta}>
                      {specialization.description || "No description yet"}
                    </p>
                  </div>
                  <div className={styles.recordActions}>
                    <button className={styles.inlineButton} type="button" onClick={() => startSpecializationEdit(specialization)}>
                      Edit
                    </button>
                    <button className={styles.dangerButton} type="button" onClick={() => deleteEntity(`/api/specializations/${specialization.id}`, "Specialization deleted.")}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.panel} ${styles.panelWide}`}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>
                {editingMappingId ? "Edit Course Offering" : "Link Course to College"}
              </h2>
              {editingMappingId && (
                <button className={styles.inlineButton} type="button" onClick={resetMappingForm}>
                  Cancel
                </button>
              )}
            </div>
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                submitForm({
                  path: editingMappingId
                    ? `/api/college-courses/${editingMappingId}`
                    : "/api/college-courses",
                  method: editingMappingId ? "PUT" : "POST",
                  payload: {
                    collegeId: Number(collegeCourseForm.collegeId),
                    courseId: Number(collegeCourseForm.courseId),
                    feePerYear: Number(collegeCourseForm.feePerYear),
                    durationYears: Number(collegeCourseForm.durationYears),
                    seats: Number(collegeCourseForm.seats),
                  },
                  successMessage: editingMappingId
                    ? "Course offering updated successfully."
                    : "Course offering linked successfully.",
                  reset: resetMappingForm,
                });
              }}
            >
              <div className={styles.twoCol}>
                <select
                  className={styles.select}
                  value={collegeCourseForm.collegeId}
                  onChange={(event) =>
                    setCollegeCourseForm((prev) => ({
                      ...prev,
                      collegeId: event.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Select college</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.select}
                  value={collegeCourseForm.courseId}
                  onChange={(event) =>
                    setCollegeCourseForm((prev) => ({
                      ...prev,
                      courseId: event.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.threeCol}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Fee per year"
                  value={collegeCourseForm.feePerYear}
                  onChange={(event) =>
                    setCollegeCourseForm((prev) => ({
                      ...prev,
                      feePerYear: event.target.value,
                    }))
                  }
                  required
                />
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Duration (years)"
                  value={collegeCourseForm.durationYears}
                  onChange={(event) =>
                    setCollegeCourseForm((prev) => ({
                      ...prev,
                      durationYears: event.target.value,
                    }))
                  }
                  required
                />
              </div>
              <input
                className={styles.input}
                type="number"
                placeholder="Seats"
                value={collegeCourseForm.seats}
                onChange={(event) =>
                  setCollegeCourseForm((prev) => ({
                    ...prev,
                    seats: event.target.value,
                  }))
                }
              />
              <button className={styles.primaryButton} type="submit">
                {editingMappingId ? "Update offering" : "Save offering"}
              </button>
            </form>
            <div className={styles.recordList}>
              {mappings.map((mapping) => (
                <div key={mapping.id} className={styles.recordCard}>
                  <div>
                    <p className={styles.recordTitle}>
                      {mapping.collegeName} - {mapping.courseName}
                    </p>
                    <p className={styles.recordMeta}>
                      Rs. {mapping.feePerYear} / year | {mapping.durationYears} years
                      {mapping.seats ? ` | ${mapping.seats} seats` : ""}
                    </p>
                  </div>
                  <div className={styles.recordActions}>
                    <button className={styles.inlineButton} type="button" onClick={() => startMappingEdit(mapping)}>
                      Edit
                    </button>
                    <button className={styles.dangerButton} type="button" onClick={() => deleteEntity(`/api/college-courses/${mapping.id}`, "Course offering deleted.")}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </PageWrapper>
  );
};

export default AdminPage;
