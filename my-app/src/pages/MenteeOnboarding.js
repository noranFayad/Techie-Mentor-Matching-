import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MenteeOnboarding.css';

const roleOptions = [
  'Student',
  'Junior Developer',
  'Mid-level Developer',
  'Senior Developer',
  'Team Lead / Manager',
  'Career Switcher',
  'Entrepreneur / Founder',
];

const mentorshipAreaOptions = [
  'Frontend (React, Vue, etc.)',
  'Backend & APIs',
  'System Design & Architecture',
  'Data & AI / Machine Learning',
  'Product & UX Strategy',
  'Leadership & Career Growth',
];

const learningStyleOptions = [
  { value: 'hands-on', label: 'Hands-on practice & projects' },
  { value: 'step-by-step', label: 'Step-by-step walkthroughs' },
  { value: 'problem-solving', label: 'Solving problems together' },
  { value: 'qa', label: 'Live Q&A or office hours' },
];

const frequencyOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'as-needed', label: 'As needed' },
];

const mentorshipPreferenceOptions = [
  { value: 'long-term', label: 'Long-term mentorship' },
  { value: 'quick-advice', label: 'Quick, one-off advice' },
];

function MenteeOnboarding() {
  const navigate = useNavigate();
  const [learningStyle, setLearningStyle] = useState('');
  const [frequency, setFrequency] = useState('');
  const [mentorshipPreference, setMentorshipPreference] = useState('');
  const [techRole, setTechRole] = useState('');
  const [mentorshipFocus, setMentorshipFocus] = useState('');
  const [customMentorshipFocus, setCustomMentorshipFocus] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [techChallenge, setTechChallenge] = useState('');
  const [projectHighlight, setProjectHighlight] = useState('');
  const [motivation, setMotivation] = useState('');
  const [funFact, setFunFact] = useState('');

  const totalQuestions = 10;
  const hasCareerGoals = careerGoals.trim().length > 0;
  const hasMentorshipSelect = mentorshipFocus && mentorshipFocus !== 'custom';
  const hasMentorshipCustom = customMentorshipFocus.trim().length > 0;
  const mentorshipQuestionAnswered = hasMentorshipSelect || hasMentorshipCustom;
  const hasTechChallenge = techChallenge.trim().length > 0;
  const hasProjectHighlight = projectHighlight.trim().length > 0;
  const hasMotivation = motivation.trim().length > 0;
  const hasFunFact = funFact.trim().length > 0;

  const answeredQuestions = [
    Boolean(techRole),
    hasCareerGoals,
    mentorshipQuestionAnswered,
    Boolean(learningStyle),
    hasTechChallenge,
    Boolean(frequency),
    Boolean(mentorshipPreference),
    hasProjectHighlight,
    hasMotivation,
    hasFunFact,
  ];

  const answeredCount = answeredQuestions.filter(Boolean).length;
  const progressValue =
    totalQuestions === 0
      ? 0
      : Math.min(100, (answeredCount / totalQuestions) * 100);
  const displayedProgress = Math.round(progressValue);
  const isComplete = answeredCount === totalQuestions;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isComplete) {
      return;
    }

    const resolvedFocus =
      mentorshipFocus === 'custom' && customMentorshipFocus.trim().length > 0
        ? customMentorshipFocus.trim()
        : mentorshipFocus;

    const learningStyleLabel =
      learningStyleOptions.find((option) => option.value === learningStyle)?.label || '';
    const frequencyLabel =
      frequencyOptions.find((option) => option.value === frequency)?.label || '';
    const mentorshipPreferenceLabel =
      mentorshipPreferenceOptions.find((option) => option.value === mentorshipPreference)?.label ||
      '';

    const profileSnapshot = {
      techRole,
      careerGoals,
      mentorshipFocus: resolvedFocus,
      learningStyle: learningStyleLabel,
      techChallenge,
      frequency: frequencyLabel,
      mentorshipPreference: mentorshipPreferenceLabel,
      projectHighlight,
      motivation,
      funFact,
    };

    navigate('/matches', { state: { role: 'mentee', viewerProfile: profileSnapshot } });
  };

  return (
    <div className="mentee-page">
      <header className="mentee-header">
        <div className="mentee-header__brand">
          <div className="mentee-header__icon" aria-hidden="true">
            <span className="material-symbols-outlined">auto_fix_high</span>
          </div>
          <Link to="/" className="mentee-header__title">
            QuickChat
          </Link>
        </div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/">Find a Mentor</Link>
          <Link to="/">Sessions</Link>
          <Link to="/">Messages</Link>
        </nav>
      </header>

      <main className="mentee-main">
        <section className="mentee-card" aria-labelledby="mentee-heading">
          <div className="mentee-card__heading">
            <h1 id="mentee-heading">Tell us about yourself to get the best matches</h1>
            <p>
              Sharing a bit more about your goals helps mentors tailor the guidance you
              receive. Answer what you can now—you can always update it later.
            </p>
          </div>

          <div className="mentee-progress">
            <div className="mentee-progress__top">
              <span className="mentee-progress__label">Profile Completion</span>
              <span className="mentee-progress__value">
                {answeredCount}/{totalQuestions} answered
              </span>
            </div>
            <div
              className="mentee-progress__bar"
              role="progressbar"
              aria-valuenow={displayedProgress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuetext={`${displayedProgress}% complete`}
            >
              <span style={{ width: `${progressValue}%` }} />
            </div>
          </div>

          <form className="mentee-form" onSubmit={handleSubmit}>
            <div className="mentee-field">
              <label htmlFor="tech-role">
                What’s your current tech role or level?
              </label>
              <select
                id="tech-role"
                className="mentee-select"
                value={techRole}
                onChange={(event) => setTechRole(event.target.value)}
              >
                <option value="">Select your role</option>
                {roleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mentee-field">
              <label htmlFor="career-goals">
                What are your top 1–2 learning or career goals this year?
              </label>
              <textarea
                id="career-goals"
                className="mentee-textarea"
                placeholder="e.g., Get promoted, learn a new framework"
                value={careerGoals}
                onChange={(event) => setCareerGoals(event.target.value)}
              />
            </div>

            <div className="mentee-field mentee-field--dual">
              <label htmlFor="mentorship-focus">
                Which specific skill/area do you want mentorship in?
              </label>
              <select
                id="mentorship-focus"
                className="mentee-select"
                value={mentorshipFocus}
                onChange={(event) => setMentorshipFocus(event.target.value)}
              >
                <option value="">Select a focus area</option>
                {mentorshipAreaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value="custom">Other (describe below)</option>
              </select>
              <input
                type="text"
                className="mentee-input"
                placeholder="Or describe another skill/topic you want to grow"
                value={customMentorshipFocus}
                onChange={(event) => setCustomMentorshipFocus(event.target.value)}
              />
            </div>

            <fieldset className="mentee-field">
              <legend>How do you learn best?</legend>
              <div className="option-grid columns-2">
                {learningStyleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`option-card ${
                      learningStyle === option.value ? 'option-card--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="learning-style"
                      value={option.value}
                      checked={learningStyle === option.value}
                      onChange={(event) => setLearningStyle(event.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mentee-field">
              <label htmlFor="tech-challenge">
                What’s your biggest tech challenge right now?
              </label>
              <textarea
                id="tech-challenge"
                className="mentee-textarea"
                placeholder="Describe a problem or concept you're wrestling with"
                value={techChallenge}
                onChange={(event) => setTechChallenge(event.target.value)}
              />
            </div>

            <fieldset className="mentee-field">
              <legend>How often do you hope to connect with a mentor?</legend>
              <div className="option-grid columns-2">
                {frequencyOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`option-card ${
                      frequency === option.value ? 'option-card--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={option.value}
                      checked={frequency === option.value}
                      onChange={(event) => setFrequency(event.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mentee-field">
              <legend>Are you hoping for long-term mentorship or quick advice?</legend>
              <div className="option-grid columns-2">
                {mentorshipPreferenceOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`option-card ${
                      mentorshipPreference === option.value ? 'option-card--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="mentorship-type"
                      value={option.value}
                      checked={mentorshipPreference === option.value}
                      onChange={(event) => setMentorshipPreference(event.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mentee-field">
              <label htmlFor="project-highlight">
                Tell us about a project you’re working on or want to build.
              </label>
              <textarea
                id="project-highlight"
                className="mentee-textarea"
                placeholder="Briefly describe your project"
                value={projectHighlight}
                onChange={(event) => setProjectHighlight(event.target.value)}
              />
            </div>

            <div className="mentee-field">
              <label htmlFor="motivation">
                What motivates you to grow in tech?
              </label>
              <textarea
                id="motivation"
                className="mentee-textarea"
                placeholder="e.g., Solving complex problems, building cool products..."
                value={motivation}
                onChange={(event) => setMotivation(event.target.value)}
              />
            </div>

            <div className="mentee-field">
              <label htmlFor="fun-fact">
                Fun fact or passion outside coding? (for icebreaking)
              </label>
              <textarea
                id="fun-fact"
                className="mentee-textarea short"
                placeholder="e.g., I'm a competitive rock climber."
                value={funFact}
                onChange={(event) => setFunFact(event.target.value)}
              />
            </div>

            <div className="mentee-action-bar">
              <Link to="/">I'll do this later</Link>
              <button type="submit" disabled={!isComplete}>
                Save &amp; Continue
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default MenteeOnboarding;

