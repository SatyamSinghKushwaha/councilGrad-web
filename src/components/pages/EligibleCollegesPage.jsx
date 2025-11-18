import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EligibleCollegesPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.colleges) {
    return (
      <section className="empty-wrapper">
        <div className="empty-card">
          <div className="empty-icon">📄</div>
  
          <h2 className="empty-title">No Data Found</h2>
  
          <p className="empty-text">
            We couldn’t find your submitted details.  
            Please fill the form again to view eligible colleges.
          </p>
  
          <button
            onClick={() => navigate("/")}
            className="empty-btn"
          >
            Fill Form Again
          </button>
        </div>
      </section>
    );
  }
  

  const { colleges, student } = state;

  return (
    <section className="eligible-wrapper">

      {/* Heading */}
      <h1 className="eligible-heading">Eligible Colleges</h1>

      {/* Enhanced Subheading */}
      <p className="eligible-sub">
        Based on your provided academic details:
        <br />
        <span className="eligible-highlight">
          {student.course} • {student.tenthMarks}% (10th) • {" "}
          {student.twelfthMarks}% (12th) • Budget ₹{student.budget}
        </span>
      </p>

      {/* FLEX WRAPPER FOR COLLEGE CARDS */}
      <div className="eligible-flex">
        {colleges.map((college, index) => (
          <div
            key={college.id}
            className="college-card flex-card"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <h3 className="college-title">{college.name}</h3>
            <p className="college-sub">{college.course}</p>

            <div className="college-details">
              <p>Min 10th: {college.minTenthMarks}%</p>
              <p>Min 12th: {college.minTwelfthMarks}%</p>
              <p>Max Budget: ₹{college.maxBudget}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="cta-box">
        <p className="cta-title">Want personalized admission guidance?</p>
        <button className="cta-btn">📞 Enquire Now</button>
        <p className="cta-note">
          Our team will contact you with available seats, fees & scholarship options.
        </p>
      </div>

      {/* TnC */}
      <p className="tnc-text">
        *TnC: All eligibility data is collected from publicly available sources and may vary with college updates.
      </p>

    </section>
  );
};

export default EligibleCollegesPage;
