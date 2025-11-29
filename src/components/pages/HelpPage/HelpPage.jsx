import React from "react";
import PageWrapper from "../../common/PageWrapper";
import styles from "./HelpPage.module.css";

const HelpPage = () => {
  return (
    <PageWrapper>
      <div className={styles.wrapper}>
        <h1 className="page-heading text-center mb-6">Help Center</h1>

        <div className={styles.faqItem}>
          <p className={styles.question}>How do I find eligible colleges?</p>
          <p className={styles.answer}>
            Use our Eligibility Checker on the home page to instantly see
            colleges that match your marks and budget.
          </p>
        </div>

        <div className={styles.faqItem}>
          <p className={styles.question}>Can I compare courses?</p>
          <p className={styles.answer}>
            Yes. Visit “Courses → Colleges” to explore all colleges offering a
            particular course.
          </p>
        </div>

        <div className={styles.faqItem}>
          <p className={styles.question}>Is this service free?</p>
          <p className={styles.answer}>
            Yes, CouncilGrad’s tools are completely free for students.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HelpPage;
