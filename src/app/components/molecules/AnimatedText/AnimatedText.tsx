'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const sentences = [
  "Hi, I'm Craig!",
  "PARAGRAPH_BREAK",
  "I'm a front-end developer based in Chicago.",
  "PARAGRAPH_BREAK",
  "I like building things.",
  "PARAGRAPH_BREAK",
  "As a kid, it was Legos and treehouses. Later, I helped the carpenters in my family build an actual house. These days, my builds are digital — web pages, design systems, interactive experiences.",
  "PARAGRAPH_BREAK",
  "The work I do for clients? Pixel-perfect. But this site? Not so much. This is a playground. A place to experiment, break things, and test ideas — some good, some questionable. The Kruger theme? Fun, but chaotic. The Rogue Coast glassmorphism theme? Stylish, but an accessibility nightmare. (You can try them both using the 🎨 icon in the header.)",
  "PARAGRAPH_BREAK",
  "I'm an advocate of great design, clean code, and systems that scale. I've built two full-scale design systems in my career, and I'm always thinking about the next one. But this site isn't about polished case studies or perfect portfolios. It's a space to tinker, create, and see what happens.",
  "PARAGRAPH_BREAK",
  "So feel free to explore. Check out my latest photos. See what endurance challenge I'm working on. Get inspired to make something. Capture something. Go somewhere new. Push yourself.",
  "PARAGRAPH_BREAK",
  "Because nothing is ever truly finished — not the work we do, not the things we build, not even ourselves. We're all a work in progress, shaping and reshaping every day. That's both the challenge and the reward, because who we are is always ours to create."
];

export default function AnimatedText() {
  const [step, setStep] = useState<'waiting' | 'intro1' | 'intro2' | 'full'>('waiting');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep('intro1'), 1000),
      setTimeout(() => setStep('intro2'), 2000),
      setTimeout(() => setStep('full'), 3000)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  let visibleSentences: string[] = [];

  if (step === 'intro1') {
    visibleSentences = sentences.slice(0, 1);
  } else if (step === 'intro2') {
    visibleSentences = sentences.slice(0, 3);
  } else if (step === 'full') {
    visibleSentences = sentences;
  }

  return (
    <div>
      {visibleSentences.map((sentence, index) => {
        if (sentence === 'PARAGRAPH_BREAK') {
          return <div key={index} style={{ marginBottom: '1rem' }} />;
        }

        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sentence}
          </motion.p>
        );
      })}
    </div>
  );
}