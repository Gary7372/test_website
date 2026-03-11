"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the TS Types
interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQData {
  [category: string]: FAQItemData[];
}

interface Categories {
  [key: string]: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  categories: Categories;
  faqData: FAQData;
  className?: string;
}

// Main reusable FAQ component
export const FAQ = ({ 
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  categories,
  faqData,
  className,
  ...props 
}: FAQProps) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section 
      className={cn(
        "relative overflow-hidden bg-brand-bg px-4 pb-24 pt-12 md:pb-32 md:pt-16 text-brand-fg min-h-screen",
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs 
        categories={categories}
        selected={selectedCategory} 
        setSelected={setSelectedCategory} 
      />
      <FAQList 
        faqData={faqData}
        selected={selectedCategory} 
      />
    </section>
  );
};

const FAQHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative z-10 flex flex-col items-center justify-center text-center">
    <span className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-brand-accent">
      {subtitle}
    </span>
    <h2 className="mb-12 font-serif text-5xl md:text-7xl font-bold tracking-tight">{title}</h2>
    <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />
  </div>
);

const FAQTabs = ({ categories, selected, setSelected }: { categories: Categories; selected: string; setSelected: (k: string) => void }) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cn(
          "relative overflow-hidden whitespace-nowrap rounded-md border px-6 py-2.5 text-xs font-mono tracking-widest uppercase transition-colors duration-500",
          selected === key
            ? "border-brand-accent text-brand-bg"
            : "border-brand-fg/20 bg-transparent text-brand-fg/60 hover:text-brand-fg hover:border-brand-fg/40"
        )}
      >
        <span className="relative z-10">{label}</span>
        <AnimatePresence>
          {selected === key && (
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "backIn" }}
              className="absolute inset-0 z-0 bg-brand-accent"
            />
          )}
        </AnimatePresence>
      </button>
    ))}
  </div>
);

const FAQList = ({ faqData, selected }: { faqData: FAQData; selected: string }) => (
  <div className="mx-auto mt-16 max-w-3xl relative z-10">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected === category) {
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "backIn" }}
              className="space-y-4"
            >
              {questions.map((faq, index) => (
                <FAQItem key={index} {...faq} index={index} />
              ))}
            </motion.div>
          );
        }
        return null;
      })}
    </AnimatePresence>
  </div>
);

interface ExtendedFAQItemData extends FAQItemData {
  index: number;
}

const FAQItem = ({ question, answer, index }: ExtendedFAQItemData) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-2xl border transition-colors",
        isOpen ? "bg-brand-fg/[0.03] border-brand-accent/30" : "bg-transparent border-brand-fg/10 hover:border-brand-fg/30"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span
          className={cn(
            "text-lg font-serif transition-colors md:text-xl",
            isOpen ? "text-brand-fg" : "text-brand-fg/80"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: "45deg" },
            closed: { rotate: "0deg" },
          }}
          transition={{ duration: 0.2 }}
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-colors shrink-0",
              isOpen ? "text-brand-accent" : "text-brand-fg/50"
            )}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : "0px", 
          marginBottom: isOpen ? "24px" : "0px",
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-6"
      >
        <p className="text-brand-beige/70 text-base leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
};
