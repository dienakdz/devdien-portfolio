import React from 'react';
import {
  AppWindow,
  Boxes,
  Braces,
  Code2,
  Database,
  Layers3,
  ServerCog,
  Workflow,
} from 'lucide-react';

const TechMarquee = () => {
  const techRow = [
    { label: 'Python', icon: Code2 },
    { label: 'FastAPI', icon: ServerCog },
    { label: 'Laravel', icon: Layers3 },
    { label: 'PostgreSQL', icon: Database },
    { label: 'MySQL', icon: Database },
    { label: 'Docker', icon: Boxes },
    { label: 'Nginx', icon: ServerCog },
    { label: 'AWS', icon: Boxes },
    { label: 'CI/CD', icon: Workflow },
    { label: 'VS Code', icon: AppWindow },
    { label: 'Postman', icon: Workflow },
    { label: 'Git', icon: Braces },
  ];

  return (
    <section className="relative -mt-4 px-6 pb-8 md:-mt-6 md:px-10 md:pb-10 lg:px-20 xl:px-24">
      <div className="container mx-auto">
        <div className="stack-marquee-frame rounded-[24px] px-3 py-3.5 md:px-4">
          <div className="stack-marquee-shell">
            <div className="stack-marquee-track">
              {[0, 1].map((copyIndex) => (
                <div
                  key={`copy-${copyIndex}`}
                  className="stack-marquee-sequence"
                  aria-hidden={copyIndex === 1}
                >
                  {techRow.map((tech) => {
                    const Icon = tech.icon;

                    return (
                      <span key={`${copyIndex}-${tech.label}`} className="stack-capsule">
                        <span className="stack-capsule-icon">
                          <Icon size={16} />
                        </span>
                        {tech.label}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
