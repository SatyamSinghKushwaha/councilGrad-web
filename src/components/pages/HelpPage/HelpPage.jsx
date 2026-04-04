import React from "react";
import PageWrapper from "../../common/PageWrapper";
import styles from "./HelpPage.module.css";

const faqs = [
  {
    question: "How should I use the eligibility checker?",
    answer:
      "Start with the academic inputs that actually affect shortlisting: your 10th marks, 12th marks, target course, and optional specialization. The checker is meant to reduce the search space quickly so you can focus on likely-fit colleges before comparing details.",
  },
  {
    question: "What is the difference between Find Colleges and Colleges & Courses?",
    answer:
      "Find Colleges is course-first. You already know the direction you want, such as B.Tech, MBA, or MCA, and want to see which colleges offer that option. Colleges & Courses is college-first. It helps you inspect the academic options available inside a specific college.",
  },
  {
    question: "Why do I not need to submit personal details for eligibility?",
    answer:
      "The eligibility step is intentionally lightweight. We only ask for the essentials needed to estimate fit. Personal contact information is collected later when a student chooses to enquire, which keeps the early journey faster and reduces unnecessary form friction.",
  },
  {
    question: "What happens after I submit an enquiry?",
    answer:
      "Your details are stored as an interested student lead in the admin dashboard. The admissions team can then review your preferred course or specialization, mark the lead with a useful status tag such as NEW or FOLLOW_UP, and respond with the next steps.",
  },
  {
    question: "Are the displayed results final admission guarantees?",
    answer:
      "No. The platform helps with discovery and shortlisting, not final admission confirmation. Colleges may change intake, fee structure, eligibility thresholds, specialization availability, or document requirements, so the final decision always depends on the latest institution rules.",
  },
  {
    question: "What if I am still unsure about the right course or specialization?",
    answer:
      "A good starting point is to first shortlist broad-fit colleges using the course you are leaning toward, then review the available specializations and course offerings inside those colleges. If you are still undecided, submitting an enquiry is the best way to ask for guided help.",
  },
];

const steps = [
  "Use the eligibility checker to narrow the search to realistic options.",
  "Review colleges and course offerings from either the course-first or college-first pages.",
  "Submit an enquiry only when you want follow-up support or more specific guidance.",
];

const HelpPage = () => {
  return (
    <PageWrapper>
      <section className={styles.hero}>
        <div className={styles.heroPanel}>
          <p className={styles.eyebrow}>Help Center</p>
          <h1 className={styles.title}>A simple guide to using CouncilGrad well</h1>
          <p className={styles.intro}>
            CouncilGrad is designed to make exploration feel clearer, not more
            crowded. The sections below explain what each part of the platform is
            for, how the student journey is structured, and where personal
            enquiries fit in.
          </p>
        </div>
      </section>

      <section className={styles.overview}>
        <article className={styles.infoCard}>
          <p className={styles.sectionLabel}>Best way to use the platform</p>
          <h2 className={styles.sectionTitle}>Start broad, then get specific</h2>
          <ol className={styles.stepList}>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article className={styles.infoCard}>
          <p className={styles.sectionLabel}>What the forms are doing</p>
          <h2 className={styles.sectionTitle}>Eligibility and enquiry serve different jobs</h2>
          <p className={styles.answer}>
            The eligibility form is for fast academic filtering. The enquiry form
            is for serious interest and follow-up. Keeping those two steps
            separate makes the student experience lighter while still giving the
            admin team useful lead information when a student actively requests help.
          </p>
        </article>
      </section>

      <section className={styles.wrapper}>
        {faqs.map((item) => (
          <article key={item.question} className={styles.faqItem}>
            <p className={styles.question}>{item.question}</p>
            <p className={styles.answer}>{item.answer}</p>
          </article>
        ))}
      </section>
    </PageWrapper>
  );
};

export default HelpPage;
