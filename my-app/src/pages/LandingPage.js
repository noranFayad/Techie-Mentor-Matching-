import { useNavigate } from 'react-router-dom';
import '../App.css';

const steps = [
  {
    icon: 'person_add',
    title: '1. Create Your Profile',
    description:
      'Sign up as a mentor or mentee and highlight your expertise or goals.',
  },
  {
    icon: 'manage_search',
    title: '2. Find a Match',
    description:
      'Browse profiles and find the right person to connect with based on industry and interests.',
  },
  {
    icon: 'video_chat',
    title: '3. Start Chatting',
    description:
      'Schedule and join quick, 15-minute video calls to exchange knowledge.',
  },
];

const faqs = [
  {
    question: 'What is Mentor Speed Dating?',
    answer:
      "It's a platform designed to facilitate quick, 15-minute introductory chats between mentors and mentees, allowing for rapid networking and knowledge sharing in a structured, efficient way.",
    open: true,
  },
  {
    question: 'How long is each session?',
    answer:
      "Each speed dating session is strictly timed to 15 minutes. This ensures that conversations are focused, productive, and respectful of everyone's time.",
  },
  {
    question: 'Is this service free?',
    answer:
      'Yes, signing up and participating in sessions is completely free for both mentors and mentees. We believe in making mentorship accessible to everyone.',
  },
  {
    question: 'How do I prepare for a session?',
    answer:
      "Come prepared with specific questions you want to ask or topics you'd like to discuss. Review the other person's profile beforehand to make the most of your 15 minutes.",
  },
];

function LandingPage() {
  const navigate = useNavigate();

  const handleFindMentorClick = () => {
    navigate('/find-a-mentor');
  };

  const handleBecomeMentorClick = () => {
    navigate('/become-a-mentor');
  };

  return (
    <div className="landing-page">
      <div className="content-wrapper">
        <header className="top-nav">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </span>
            <span className="brand-name">Mentor Speed Dating</span>
          </div>
          <nav className="top-nav-links">
            <a href="#faq">FAQ</a>
          </nav>
        </header>

        <main className="hero" id="hero">
            <div className="hero-text">
              <div className="hero-headline">
                <h1>Mentor Speed Dating</h1>
                <p>
                  Connect with experienced professionals for quick, impactful
                  conversations.
                </p>
              </div>
              <div className="action-buttons">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleFindMentorClick}
                >
                  Find a Mentor
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleBecomeMentorClick}
                >
                  Become a Mentor
                </button>
                <button type="button" className="btn btn-ghost">
                  How it Works?
                </button>
              </div>
            </div>
          <div
            className="hero-illustration"
            role="img"
            aria-label="Illustration of people networking and having conversations in a welcoming environment."
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5QWN52R7oyu2tKVMwa8Xg9lUeFh62hPZDI0_mpBYTLSgUeiJi__yeaxdiKKnfShClZZP3dGE_RQiRrz1baICoJRYHle2PTjVBGuiPVQLMxRxLGJLIDZZvJAWnKhBQOJQvlAgiXbuY3Cla5FJkK3u0co1S1YHll58TBeID15y-434GEkTx2LQzM2IMJqJgxtN5GhDPO7VrBswouy8aVx8fSvkKS2nvTrJ8QBgchcrCCjzYeRWAWihQSYu4J0bB33gbscjNtzAR_cDR"
              alt=""
            />
          </div>
        </main>

        <section className="section how-it-works" id="how-it-works">
          <div className="section-heading">
            <h2>How It Works</h2>
            <p>
              A simple and effective way to gain insights, get advice, and
              expand your professional network in minutes.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article key={step.title} className="step-card">
                <div className="step-icon">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {step.icon}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="section-heading">
            <h2>Frequently Asked Questions</h2>
            <p>
              Have questions? We've got answers. If you can't find what you're
              looking for, feel free to contact us.
            </p>
          </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question} className="faq-item" open={faq.open}>
                  <summary>
                    <span>{faq.question}</span>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      expand_more
                    </span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="section cta">
            <div className="section-heading">
              <h2>Ready to connect?</h2>
              <p>
                Join our community today and start making meaningful professional
                connections that can accelerate your career.
              </p>
            </div>
            <div className="cta-buttons">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFindMentorClick}
              >
                Find a Mentor
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBecomeMentorClick}
              >
                Become a Mentor
              </button>
            </div>
          </section>
      </div>
    </div>
  );
}

export default LandingPage;

