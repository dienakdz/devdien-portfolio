import React from 'react';
import { motion } from 'framer-motion';
import { Boxes, Layers3, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const icons = [Layers3, Boxes, Sparkles];

const Approach = () => {
  const { t } = useLanguage();

  return (
    <section id="focus" className="px-6 pb-10 md:px-10 lg:px-20 xl:px-24">
      <div className="container mx-auto">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div className="content-plane-strong rounded-[32px] p-8 md:p-10 lg:p-12">
            <div className="max-w-2xl">
              <p className="section-kicker mb-4">{t.approach.eyebrow}</p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-title max-w-xl"
              >
                {t.approach.title1} <span className="text-gradient">{t.approach.title2}</span>
              </motion.h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {t.approach.description}
              </p>

              <div className="content-plane mt-10 rounded-[24px] p-6 md:p-7">
                <p className="section-kicker">{t.approach.noteLabel}</p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t.approach.note}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
            {t.approach.items.map((item, index) => {
              const Icon = icons[index] || Sparkles;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: index * 0.06 }}
                  className="content-plane rounded-[28px] p-6 md:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-primary/12 text-primary">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary/82">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-3xl font-black tracking-[-0.05em]">{item.title}</h3>
                  <p className="mt-4 max-w-[34rem] text-sm leading-7 text-muted-foreground md:text-base">
                    {item.copy}
                  </p>

                  <div className="mt-8 h-px w-full bg-gradient-to-r from-primary/34 via-border to-transparent" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
