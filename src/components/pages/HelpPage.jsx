import React from "react";

const HelpPage = () => {
  return (
    <section className="page-section">
      <div className="container text-center py-24">
        <h1 className="page-heading">Help Center</h1>
        
        <p className="page-text">
          Need guidance? We're here to help you understand how to check
          eligibility, choose courses, and navigate the admission process smoothly.
        </p>

        <div className="mt-8 text-left max-w-xl mx-auto space-y-6">
          <div>
            <h2 className="faq-title">How does the eligibility check work?</h2>
            <p className="faq-text">
              Simply enter your marks and preferred course. Our system compares
              them with college requirements and instantly shows your eligible options.
            </p>
          </div>

          <div>
            <h2 className="faq-title">Is CouncilGrad free?</h2>
            <p className="faq-text">
              Yes! All eligibility tools and resources are completely free for students.
            </p>
          </div>

          <div>
            <h2 className="faq-title">Will more features be added?</h2>
            <p className="faq-text">
              Absolutely — we are working on college comparison, admission timelines,
              and personalized counselling tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpPage;