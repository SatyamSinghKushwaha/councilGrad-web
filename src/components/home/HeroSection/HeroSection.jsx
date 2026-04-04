import React, { useState } from "react";
import EligibilityFormModal from "../../common/EligibilityFormModal/EligibilityFormModal";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Discover Your Perfect{" "}
          <span className={styles.accent}>College Match</span>
        </h1>

        <p className={styles.subtitle}>
          Explore with confidence - every result is personalized for you.
        </p>

        <button className={styles.cta} onClick={() => setOpen(true)}>
          Check Your Eligibility
          <span className={styles.ctaGlow}></span>
        </button>
      </div>

      {open && <EligibilityFormModal onClose={() => setOpen(false)} />}
    </section>
  );
};

export default HeroSection;
