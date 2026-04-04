import React from "react";
import PageWrapper from "../../common/PageWrapper";
import styles from "./AboutPage.module.css";

const pillars = [
  {
    title: "Discovery that starts with the student",
    text:
      "CouncilGrad is built around the way students actually search. Some start with a dream course, some start with marks, and some begin with a college name they already know. The platform supports all three journeys so shortlisting feels natural instead of scattered.",
  },
  {
    title: "Operational clarity for admissions teams",
    text:
      "Behind the student experience, CouncilGrad also acts like a lightweight operations workspace. Colleges, programs, course offerings, specializations, and student enquiries can all be maintained from one admin dashboard so the public data stays useful and current.",
  },
  {
    title: "Practical support, not information overload",
    text:
      "We keep the student journey focused on the essentials first: eligibility fit, available courses, available colleges, and the right time to raise an enquiry. That means less friction in the early phase and cleaner lead capture once someone is genuinely interested.",
  },
];

const roadmap = [
  "Eligibility-led discovery using academic filters and course intent.",
  "College-first and course-first exploration so students can search from either direction.",
  "Structured enquiry capture for high-intent students who want guidance or a callback.",
  "Admin-side data management for colleges, courses, specializations, and lead status tracking.",
];

const AboutPage = () => {
  return (
    <PageWrapper>
      <section className={styles.hero}>
        <div className={styles.heroPanel}>
          <p className={styles.eyebrow}>About CouncilGrad</p>
          <h1 className={styles.title}>
            A cleaner college discovery experience for students, parents, and admissions teams
          </h1>
          <p className={styles.text}>
            CouncilGrad brings the early admission journey into one guided flow.
            Instead of asking students to compare scattered PDFs, inconsistent
            websites, and incomplete cut-off lists, the platform helps them move
            from curiosity to shortlist with more confidence and much less noise.
          </p>
          <p className={styles.text}>
            On the student side, that means faster eligibility checks, clearer
            course exploration, and a simpler path to asking for help. On the
            admin side, it means keeping institutional data and incoming
            enquiries organized from one place.
          </p>
        </div>
      </section>

      <section className={styles.featureGrid}>
        {pillars.map((item) => (
          <article key={item.title} className={styles.card}>
            <h2 className={styles.cardTitle}>{item.title}</h2>
            <p className={styles.cardText}>{item.text}</p>
          </article>
        ))}
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyCard}>
          <div>
            <p className={styles.sectionLabel}>What the platform is solving</p>
            <h2 className={styles.sectionTitle}>A fragmented search process</h2>
            <p className={styles.cardText}>
              Students often lose momentum because the information they need is
              spread across too many places. Even when the right college is
              available, it may be difficult to understand which courses it
              offers, which specialization paths exist, how a student’s marks
              align, or when to reach out for help. CouncilGrad reduces that
              fragmentation by organizing these steps into one consistent system.
            </p>
          </div>

          <div>
            <p className={styles.sectionLabel}>How the platform works today</p>
            <ul className={styles.list}>
              {roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <article className={styles.card}>
          <p className={styles.sectionLabel}>Who it is for</p>
          <h2 className={styles.cardTitle}>Students, families, and counselors</h2>
          <p className={styles.cardText}>
            Whether someone is exploring options for the first time, comparing a
            shortlist with family, or helping students as a counselor, the
            platform is designed to make the early decision stage feel structured,
            understandable, and low-stress.
          </p>
        </article>

        <article className={styles.card}>
          <p className={styles.sectionLabel}>Where it can grow</p>
          <h2 className={styles.cardTitle}>A stronger admissions workflow</h2>
          <p className={styles.cardText}>
            As more institutions and records are added, CouncilGrad can expand
            from discovery into a stronger admissions support layer with richer
            lead handling, better follow-up workflows, and more detailed
            comparison data for students who are close to applying.
          </p>
        </article>
      </section>
    </PageWrapper>
  );
};

export default AboutPage;
