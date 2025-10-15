import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Testimonials Section Component
const TestimonialsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    { quote: "A terrific piece of praise", name: "Name", description: "Description", avatarColor: "#EF4444" },
    { quote: "A fantastic bit of feedback", name: "Name", description: "Description", avatarColor: "#8B7355" },
    { quote: "A genuinely glowing review", name: "Name", description: "Description", avatarColor: "#3B82F6" }
  ];
  
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  
  return (
    <section className="relative py-24 sm:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 bg-red-500 ${i % 2 === 1 ? 'rotate-45' : ''} animate-pulse`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Student Voices,
            <br />
            <span className="text-red-600">Real Stories</span>
          </h2>
        </div>
        
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-8 min-w-full md:min-w-[350px]
                            shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                            hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                            transition-all duration-500 transform hover:-translate-y-2
                            border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl" />
                  
                  <div className="relative z-10">
                    <p className="text-gray-800 mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>
                    
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        <div 
                          className="relative w-12 h-12 rounded-full transform group-hover:scale-110 transition-transform duration-500" 
                          style={{ backgroundColor: testimonial.avatarColor }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.description}</p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="group p-3 rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_15px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgb(239,68,68,0.3)] transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors duration-300" />
            </button>
            <button
              onClick={nextSlide}
              className="group p-3 rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_15px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgb(239,68,68,0.3)] transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors duration-300" />
            </button>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-gradient-to-r from-red-500 to-orange-500' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;