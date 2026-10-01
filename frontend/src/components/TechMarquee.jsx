import {
  AppWindow,
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  Layers3,
  ServerCog,
  Terminal,
  Workflow,
} from 'lucide-react';

const TechMarquee = () => {
  const techRow = [
    { label: 'Python', icon: Code2 },
    { label: 'FastAPI', icon: ServerCog },
    { label: 'PostgreSQL', icon: Database },
    { label: 'Redis & Cache', icon: Cpu },
    { label: 'Docker', icon: Boxes },
    { label: 'Kubernetes', icon: Boxes },
    { label: 'Linux OS', icon: Terminal },
    { label: 'Nginx', icon: ServerCog },
    { label: 'Laravel', icon: Layers3 },
    { label: 'CI/CD Pipelines', icon: Workflow },
    { label: 'AWS Cloud', icon: Boxes },
    { label: 'Git & GitHub', icon: Braces },
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
