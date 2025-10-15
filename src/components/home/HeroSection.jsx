import React from "react";

const HeroSection = () => {
  const leftFeatures = [
    { id: 1, name: "AUDIT" },
    { id: 2, name: "EXTRACT" },
    { id: 3, name: "ANALYZE" },
    { id: 4, name: "VERIFY" },
  ];

  const rightFeatures = [
    { id: 1, name: "ACTION" },
    { id: 2, name: "INSIGHTS" },
    { id: 3, name: "DOCS" },
    { id: 4, name: "REPORTS" },
  ];

  return (
    <section className="relative py-20 flex items-center min-h-screen">
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="absolute hidden md:block left-10 top-1/2 -translate-y-1/2 space-y-6">
          {leftFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`px-6 py-2 rounded-lg backdrop-blur-sm ${
                feature.name === "AUDIT" || feature.name === "VERIFY"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50/80 text-blue-600"
              } font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer hover:shadow-lg opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
              {feature.name}
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        <div className="absolute hidden md:block right-10 top-1/2 -translate-y-1/2 space-y-6">
          {rightFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`px-6 py-2 rounded-lg backdrop-blur-sm ${
                feature.name === "INSIGHTS" || feature.name === "DOCS"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50/80 text-blue-600"
              } font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer hover:shadow-lg opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
              {feature.name}
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 bg-blue-500 ${i % 2 === 1 ? 'rotate-45' : ''} animate-pulse`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl leading-tight font-bold tracking-tight text-gray-800 mb-8">
            Why wander through many doors,
            <br />
            when your <span className="text-blue-600">future opens here?</span>
          </h1>

          <div className="mt-12">
            <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              <span>Start Your Journey</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 15L15 5M15 5H5M15 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;