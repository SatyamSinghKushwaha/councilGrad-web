import React from "react";
import PageWrapper from "../../common/PageWrapper";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <PageWrapper>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>About CouncilGrad</h1>
        <p className={styles.text}>
          We help students explore and compare colleges based on marks, budget,
          courses, specializations, and more. Our mission is to simplify the
          college selection process.
        </p>
      </div>
    </PageWrapper>
  );
};

export default AboutPage;
