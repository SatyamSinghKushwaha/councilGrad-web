import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <section className="relative z-10 pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-5">
        {children}
      </div>
    </section>
  );
};

export default PageWrapper;
