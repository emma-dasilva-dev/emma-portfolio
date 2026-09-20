"use client";

import { motion } from "motion/react";

export default function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <motion.div
        className="contact-top"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">06 · Contact</p>
        <div className="contact-message">
          <h2>Interested in working together?</h2>
        </div>
      </motion.div>

      <div className="contact-footer">
        <span>© 2026 Emma Da Silva. All rights reserved.</span>
      </div>
    </footer>
  );
}
