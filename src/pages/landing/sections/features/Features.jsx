import { Eye, Clock, BarChart3, TestTube, TrendingUp } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Quick Insights",
      description: "See how your processes actually work",
      icon: Eye,
    },
    {
      title: "Cost & Delay Detection",
      description: "Identify bottlenecks and waiting times instantly",
      icon: Clock,
    },
    {
      title: "Clear Visuals",
      description: "No more complicated spreadsheets or endless reports",
      icon: BarChart3,
    },
    {
      title: "Scenario Testing",
      description: "Simulate process changes before you invest",
      icon: TestTube,
    },
    {
      title: "Continous Improvement",
      description: "Monitor results and measure success",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="feature"
      className="py-16 px-6"
      style={{ backgroundColor: "var(--color-main-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Benefits of Alevio Process Mining
          </h2>
          <p
            className="text-lg"
            style={{ color: "var(--color-text-notActive)" }}
          >
            Clarity, efficiency, and smarter decisions.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="flex flex-wrap items-stretch justify-center gap-5">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="landing-shadow p-6 rounded-lg border w-full sm:w-1/2 md:w-[28%] flex-grow-0 flex-shrink-0 h-[150px] bg-black border-gray-button-bg"
              >
                <div className="flex items-start gap-4 h-full">
                  <div className="p-3 rounded-lg flex-shrink-0 bg-gradient-to-tr from-[#090909] to-[#1F1F1F]">
                    <IconComponent
                      size={24}
                      style={{ color: "var(--color-landing-icon)" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3
                      className="text-lg font-semibold mb-2 line-clamp-1"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed line-clamp-3"
                      style={{ color: "var(--color-main-text)" }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
