import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '../common/TestimonialCard';

const testimonials = [
  {
    quote:
      "This website made it so easy to check which colleges I was eligible for. I didn't have to visit multiple sites—everything was right here!",
    name: 'Ananya Sharma',
    description: 'BBA Aspirant, Noida',
    avatarColor: '#3B82F6',
  },
  {
    quote:
      'I was really confused about where I could apply with my Class 12 marks, but this platform helped me shortlist the right colleges in my range.',
    name: 'Rohan Mehta',
    description: 'B.Com Student, Gurugram',
    avatarColor: '#8B7355',
  },
  {
    quote:
      'Very useful tool for students like me! I got a clear idea about my eligibility for different universities in NCR within minutes.',
    name: 'Priya Nair',
    description: 'BCA Student, Ghaziabad',
    avatarColor: '#EF4444',
  },
  {
    quote:
      'The eligibility checker saved me so much time. I quickly found colleges offering my preferred course in my budget.',
    name: 'Vikram Singh',
    description: 'BA Aspirant, Faridabad',
    avatarColor: '#10B981',
  },
  {
    quote:
      'I loved how simple the site was to use. Just entered my marks and instantly got a list of colleges I could actually apply to.',
    name: 'Sneha Patel',
    description: 'B.Sc Candidate, Delhi',
    avatarColor: '#F59E0B',
  },
  {
    quote:
      "I wasn't sure where to start after my board results, but this site gave me clarity and confidence about my options.",
    name: 'Aditya Rao',
    description: 'BBA Aspirant, Noida',
    avatarColor: '#6366F1',
  },
  {
    quote:
      "I shared this tool with my classmates too—it's perfect for checking realistic college options based on 12th marks.",
    name: 'Kavya Joshi',
    description: 'B.Com Student, Greater Noida',
    avatarColor: '#EC4899',
  },
  {
    quote:
      'I liked how the results were customized. It showed colleges that matched both my marks and my preferred course.',
    name: 'Arjun Das',
    description: 'BCA Student, Gurugram',
    avatarColor: '#84CC16',
  },
  {
    quote:
      'This platform reduced my stress before admissions. It helped me find good colleges around Delhi that matched my profile.',
    name: 'Meera Thomas',
    description: 'BA Aspirant, Delhi',
    avatarColor: '#0EA5E9',
  },
];


const Reviews = () => {
const [current, setCurrent] = useState(0);
const len = testimonials.length;


const next = () => setCurrent((c) => (c + 1) % len);
const prev = () => setCurrent((c) => (c - 1 + len) % len);


return (
<section className="reviews-section py-24 sm:py-32">
<div className="container">
<header className="reviews-header">
<div className="pulses">
{[0, 1, 2, 3, 4].map((i) => (
<span key={i} className="dot" style={{ animationDelay: `${i * 0.08}s` }} />
))}
</div>


<h2 className="reviews-title">Student Voices,<br /><span className="accent">Real Stories</span></h2>
</header>


<div className="carousel">
<div className="track" style={{ transform: `translateX(calc(-${current} * (360px + 1rem)))` }}>
{testimonials.map((t, idx) => (
<div className="slide" key={idx} onClick={() => setCurrent(idx)}>
<TestimonialCard {...t} />
</div>
))}
</div>
</div>


<div className="controls">
<button onClick={prev} aria-label="Previous" className="control-btn">
<ChevronLeft />
</button>
<div className="dots">
{testimonials.map((_, i) => (
<button key={i} onClick={() => setCurrent(i)} className={`dot-btn ${current === i ? 'active' : ''}`} aria-label={`Go to slide ${i + 1}`} />
))}
</div>
<button onClick={next} aria-label="Next" className="control-btn">
<ChevronRight />
</button>
</div>
</div>
</section>
);
};


export default Reviews;