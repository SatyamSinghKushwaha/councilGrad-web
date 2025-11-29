import React, { useEffect, useState } from "react";
import styles from "./UnifiedBackground.module.css";

// SVG icons
import hat from "../../../assets/icons/edu/hat.svg";
import graduate from "../../../assets/icons/edu/graduate.svg";
import books from "../../../assets/icons/edu/bag.svg";
import award from "../../../assets/icons/edu/award.svg";
import search from "../../../assets/icons/edu/search.svg";
import frograd from "../../../assets/icons/edu/frog-grad.svg";
import edgrad from "../../../assets/icons/edu/education-graduate.svg";
import bulb from "../../../assets/icons/edu/bulb.svg";

const ICONS = [hat, graduate, books, award, search, frograd, edgrad, bulb];

const SIZES = ["scale(0.75)", "scale(0.9)", "scale(1)", "scale(1.2)"];
const ANIMS = [styles.animateSlow, styles.animateDelayed, styles.animateSpin];

const generateIcons = () =>
  Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 85 + 5}%`,
    top: `${Math.random() * 85 + 5}%`,
    icon: ICONS[Math.floor(Math.random() * ICONS.length)],
    size: SIZES[i % SIZES.length],
    anim: ANIMS[i % ANIMS.length],
    delay: `${Math.random() * 8}s`,
  }));

const UnifiedBackground = () => {
  const [items] = useState(generateIcons);

  return (
    <div className={styles.bgUnified}>
      {/* Floating Neon Blobs */}
      <div className={styles.blobBlue}></div>
      <div className={styles.blobPink}></div>

      {/* Floating Icons */}
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.float} ${item.anim}`}
          style={{
            left: item.left,
            top: item.top,
            transform: item.size,
            animationDelay: item.delay,
          }}
        >
          <div className={styles.glass}>
            <img src={item.icon} className={styles.icon} alt="decor" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnifiedBackground;
