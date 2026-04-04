import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";

const REVIEWS = [
  {
    quote:
      "CouncilGrad helped me shortlist colleges based on my actual marks instead of generic suggestions.",
    name: "Rohan Sharma",
    role: "B.Tech Aspirant (Delhi)",
  },
  {
    quote:
      "The eligibility check feels super reliable. It's the first time a platform reflected realistic cutoffs.",
    name: "Aditi Verma",
    role: "BBA Student (Lucknow)",
  },
  {
    quote:
      "Loved how quick the process was. No confusing filters - just clean results that make sense.",
    name: "Ananya Gupta",
    role: "Class 12 (CBSE)",
  },
  {
    quote:
      "Finally found colleges I hadn't even heard of, but they matched my score really well.",
    name: "Mohammed Arif",
    role: "Engineering Aspirant (Hyderabad)",
  },
  {
    quote:
      "My daughter and I used this together. Very transparent and easy for parents too.",
    name: "Sunita Naik",
    role: "Parent (Mumbai)",
  },
  {
    quote:
      "Loved the UI - calm, modern and student-friendly. No clutter like other portals.",
    name: "Kritika Jain",
    role: "NEET Dropper",
  },
  {
    quote:
      "Helped me decide between CS and IT by clearly showing colleges for both.",
    name: "Sarthak Mehta",
    role: "PCM Student (Ahmedabad)",
  },
  {
    quote:
      "The course-first search is genuinely useful. Other sites make this part feel much harder.",
    name: "Rajveer Singh",
    role: "BCA Aspirant (Punjab)",
  },
  {
    quote:
      "The whole experience feels trustworthy. No random ads or forced suggestions.",
    name: "Simran Kaur",
    role: "Commerce Student (Delhi)",
  },
  {
    quote:
      "Using it on my phone was smooth. Did my entire search during coaching breaks.",
    name: "Vishal Patil",
    role: "JEE Coaching Student",
  },
  {
    quote:
      "Shows private + govt options clearly. Very helpful for middle-class families.",
    name: "Pranay Kulkarni",
    role: "Parent (Nagpur)",
  },
  {
    quote:
      "The layout is clean and calming. Perfect for a stressful phase like admissions.",
    name: "Ishita Bose",
    role: "Humanities Student (Kolkata)",
  },
  {
    quote:
      "Cutoff-based filtering is very helpful while applying during late rounds.",
    name: "Karan Malhotra",
    role: "B.Tech 1st Year",
  },
  {
    quote:
      "My counsellor recommended this tool and it genuinely helped me shortlist properly.",
    name: "Sara Khan",
    role: "MBA Aspirant",
  },
  {
    quote:
      "Fast, accurate and looks premium. Easily the best college-finding experience online.",
    name: "Harshvardhan",
    role: "Science Stream (Bihar)",
  },
];

const EXTENDED = [...REVIEWS, ...REVIEWS, ...REVIEWS];

const Reviews = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Students <span className={styles.accent}>Love</span> CouncilGrad
      </h2>

      <p className={styles.sub}>
        Honest experiences from students and parents across India.
      </p>

      <div className={styles.carousel}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${index * (100 / 3)}%)`,
          }}
        >
          {EXTENDED.map((item, i) => (
            <div key={i} className={styles.slide}>
              <div className={styles.card}>
                <p className={styles.quote}>"{item.quote}"</p>

                <div className={styles.user}>
                  <div className={styles.avatar}></div>
                  <div>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.role}>{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
