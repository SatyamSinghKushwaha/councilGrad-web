import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "../common/TestimonialCard";

const TestimonialsCarousel = () => {
    // State to track current slide
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Array of testimonials data
    const testimonials = [
      {
        quote: "A terrific piece of praise",
        name: "Name",
        description: "Description",
        avatarColor: "#EF4444"
      },
      {
        quote: "A fantastic bit of feedback",
        name: "Name",
        description: "Description",
        avatarColor: "#8B7355"
      },
      {
        quote: "A genuinely glowing review",
        name: "Name",
        description: "Description",
        avatarColor: "#3B82F6"
      }
    ];
    
    // Function to go to next slide
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };
    
    // Function to go to previous slide
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };
    
    return (
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl font-bold mb-12 text-left">
            Student Voices, Real Stories
          </h2>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Testimonials Slider */}
            <div className="flex gap-6 overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    quote={testimonial.quote}
                    name={testimonial.name}
                    description={testimonial.description}
                    avatarColor={testimonial.avatarColor}
                  />
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    currentSlide === index ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
export default TestimonialsCarousel;  