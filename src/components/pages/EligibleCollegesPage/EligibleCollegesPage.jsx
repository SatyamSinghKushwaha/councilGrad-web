import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageWrapper from "../../common/PageWrapper";
import CollegeCard from "../../common/CollegeCard";
import styles from "./EligibleCollegesPage.module.css";

const EligibleCollegesPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.colleges) {
    return (
      <section className={styles.emptyWrapper}>
        <div className={styles.emptyCard}>
          <div className={styles.emptyIcon}>📄</div>
          <h2 className={styles.emptyTitle}>No Data Found</h2>
          <p className={styles.emptyText}>
            We couldn’t find your submitted details.
            Please fill the form again to view eligible colleges.
          </p>
          <button
            onClick={() => navigate("/")}
            className={styles.emptyBtn}
          >
            Fill Form Again
          </button>
        </div>
      </section>
    );
  }

  const { colleges, student } = state;

  return (
    <PageWrapper>
      <h1 className={styles.heading}>Eligible Colleges</h1>

      <p className={styles.sub}>
        Based on your academic details:
        <br />
        <span className={styles.highlight}>
          {student.course} • {student.tenthMarks}% (10th) •{" "}
          {student.twelfthMarks}% (12th) • Budget ₹{student.budget}
        </span>
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {colleges.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">
            No eligible colleges found.
          </p>
        ) : (
          colleges.map((college, index) => (
            <div
              key={college.id || index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CollegeCard
                college={college}
                extra={
                  <div className="text-xs leading-relaxed space-y-1">
                    <p>Course: {college.course}</p>
                    <p>Min 10th Marks: {college.minTenthMarks}%</p>
                    <p>Min 12th Marks: {college.minTwelfthMarks}%</p>
                    <p>Max Budget: ₹{college.maxBudget}</p>
                  </div>
                }
              />
            </div>
          ))
        )}
      </div>

      <div className={styles.ctaBox}>
        <p className={styles.ctaTitle}>Need personalized admission guidance?</p>
        <button className={styles.ctaBtn}>📞 Enquire Now</button>
        <p className={styles.ctaNote}>
          Our team will contact you with seat availability, fee details and scholarships.
        </p>
      </div>

      <p className={styles.tnc}>
        *TnC: Eligibility data is based on publicly available sources and may change as colleges update criteria.
      </p>
    </PageWrapper>
  );
};

export default EligibleCollegesPage;
