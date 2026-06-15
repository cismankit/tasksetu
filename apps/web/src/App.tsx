import { useState } from 'react';
import { Button } from '@tasksetu/ui';
import { APP_TAGLINE, APP_TAGLINE_HI } from '@tasksetu/core';
import './index.css';

const FAQ_ITEMS = [
  {
    q: 'What is TaskSetu?',
    a: 'An app that helps you manage documents, government-form prep, reminders, receipts, and follow-ups — with regional checklists for India.',
  },
  {
    q: 'Is TaskSetu a government app?',
    a: 'No. TaskSetu is an independent tool that helps you prepare and organize. We do not submit forms on your behalf or impersonate official portals.',
  },
  {
    q: 'Is my data safe?',
    a: 'Documents are stored in private cloud storage with access controls. We do not sell your data.',
  },
  {
    q: 'Which regions are supported?',
    a: 'MVP focuses on India national templates plus a Madhya Pradesh regional pack. More states coming.',
  },
  {
    q: 'Does TaskSetu use AI?',
    a: 'Optional and modular. MVP uses rule-based recommendations, not a chatbot interface.',
  },
  {
    q: 'Is it free?',
    a: 'MVP beta is free. Future Plus/Business tiers planned for advanced family and shop features.',
  },
  {
    q: 'Android or iPhone?',
    a: 'Both via Expo. Android prioritized for beta.',
  },
  {
    q: 'Can I use Hindi?',
    a: 'Yes — Hindi and English from day one.',
  },
];

const USER_TYPES = [
  'Students',
  'Parents',
  'Shopkeepers',
  'Farmers',
  'Gig workers',
  'Families',
  'Seniors',
];

const MVP_FEATURES = [
  'Regional task templates (MP pilot)',
  'Document vault',
  'Smart reminders',
  'Receipt organizer',
  'Rule-based recommendations',
  'Hindi + English',
];

export default function App() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [userType, setUserType] = useState('student');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleBetaSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="page">
      <header className="hero" id="top">
        <p className="badge">Beta coming soon</p>
        <h1>TaskSetu</h1>
        <p className="tagline">{APP_TAGLINE}</p>
        <p className="tagline-hi">{APP_TAGLINE_HI}</p>
        <div className="cta-row">
          <a href="#beta">
            <Button variant="primary">Join the beta</Button>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="ghost">View roadmap</Button>
          </a>
        </div>
      </header>

      <section className="section" id="problem">
        <h2>The problem</h2>
        <p>
          Life admin in India is scattered — forms on portals, documents in WhatsApp,
          receipts in screenshots, deadlines in memory. TaskSetu brings it together in one calm app.
        </p>
      </section>

      <section className="section" id="how">
        <h2>How it works</h2>
        <ol className="steps">
          <li><strong>Pick your region</strong> — Start with Madhya Pradesh packs, expanding across India</li>
          <li><strong>Get guided checklists</strong> — Income certificates, scholarships, admissions, and more</li>
          <li><strong>Store documents safely</strong> — Private vault with expiry reminders</li>
          <li><strong>Track and follow up</strong> — Status cards and reminders so nothing slips</li>
        </ol>
      </section>

      <section className="section" id="users">
        <h2>Who it&apos;s for</h2>
        <div className="chip-row">
          {USER_TYPES.map((type) => (
            <span key={type} className="chip">{type}</span>
          ))}
        </div>
      </section>

      <section className="section" id="features">
        <h2>MVP features</h2>
        <ul className="feature-list">
          {MVP_FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="section highlight" id="regional">
        <h2>Regional intelligence</h2>
        <p>
          TaskSetu is built India-first with state-specific workflow packs — not generic AI answers.
        </p>
      </section>

      <section className="section beta-section" id="beta">
        <h2>Be first in MP beta</h2>
        <p>
          We&apos;re testing with students, parents, and shopkeepers in Madhya Pradesh.
          Leave your email — no spam.
        </p>
        {submitted ? (
          <p className="success">You&apos;re on the list! We&apos;ll email you when the MP beta opens.</p>
        ) : (
          <form className="beta-form" onSubmit={handleBetaSignup}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City in MP">
              <option value="">City in MP (optional)</option>
              <option value="bhopal">Bhopal</option>
              <option value="indore">Indore</option>
              <option value="gwalior">Gwalior</option>
              <option value="other">Other</option>
            </select>
            <select value={userType} onChange={(e) => setUserType(e.target.value)} aria-label="I am a">
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="shopkeeper">Shopkeeper</option>
              <option value="farmer">Farmer</option>
              <option value="other">Other</option>
            </select>
            {error ? <p className="form-error">{error}</p> : null}
            <Button variant="primary">Join waitlist</Button>
            <p className="consent">
              By joining, you agree to receive beta updates. We won&apos;t share your email with third parties.
            </p>
          </form>
        )}
      </section>

      <section className="section" id="faq">
        <h2>FAQ</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <p>
          Open source on GitHub · Privacy-first · Not affiliated with any government portal
        </p>
        <p>© {new Date().getFullYear()} TaskSetu</p>
      </footer>
    </div>
  );
}
