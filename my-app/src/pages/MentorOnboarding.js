import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MentorOnboarding.css';

const expertiseOptions = [
  'Frontend Development',
  'Backend Development',
  'Full-stack Engineering',
  'Data Science / AI',
  'DevOps & Cloud',
  'Mobile Development',
  'Product Management',
  'UX / Product Design',
  'Cybersecurity',
  'Quality Engineering',
];

const experienceOptions = [
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years',
];

const mentorshipStyles = [
  { value: 'hands-on', label: 'Hands-on pairing & feedback' },
  { value: 'guidance', label: 'Guidance & Q&A sessions' },
  { value: 'goal-setting', label: 'Goal-setting & accountability' },
  { value: 'strategy', label: 'Strategic advising & planning' },
];

const availabilityOptions = [
  { value: 'weekly', label: 'Weekly catchups' },
  { value: 'bi-weekly', label: 'Every other week' },
  { value: 'monthly', label: 'Monthly sessions' },
  { value: 'ad-hoc', label: 'Ad hoc / as needed' },
];

const MAX_EXPERTISE_SELECTION = 3;

function MentorOnboarding() {
  const navigate = useNavigate();
  const [expertise, setExpertise] = useState([]);
  const [mentoringTopics, setMentoringTopics] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [mentorshipStyle, setMentorshipStyle] = useState('');
  const [menteeQuestions, setMenteeQuestions] = useState('');
  const [availability, setAvailability] = useState('');
  const [accomplishment, setAccomplishment] = useState('');
  const [earlyLesson, setEarlyLesson] = useState('');
  const [funFact, setFunFact] = useState('');

  const totalQuestions = 10;

  const answeredCount = useMemo(() => {
    return [
      expertise.length > 0,
      mentoringTopics.trim().length > 0,
      jobTitle.trim().length > 0,
      Boolean(experience),
      Boolean(mentorshipStyle),
      menteeQuestions.trim().length > 0,
      Boolean(availability),
      accomplishment.trim().length > 0,
      earlyLesson.trim().length > 0,
      funFact.trim().length > 0,
    ].filter(Boolean).length;
  }, [
    accomplishment,
    earlyLesson,
    expertise.length,
    experience,
    funFact,
    jobTitle,
    availability,
    mentoringTopics,
    menteeQuestions,
    mentorshipStyle,
  ]);

  const progressPercent =
    totalQuestions === 0
      ? 0
      : Math.min(100, (answeredCount / totalQuestions) * 100);
  const progressDisplay = Math.round(progressPercent);
  const isComplete = answeredCount === totalQuestions;

  const handleToggleExpertise = (option) => {
    setExpertise((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }

      if (prev.length >= MAX_EXPERTISE_SELECTION) {
        return prev;
      }

      return [...prev, option];
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isComplete) {
      return;
    }

    // Placeholder: integrate with submission flow when backend is ready.
    navigate('/'); // Temporary success path.
  };

  return (
    <div className="mentor-page">
      <header className="mentor-header">
        <div className="mentor-header__brand">
          <button
            type="button"
            className="mentor-header__logo"
            onClick={() => navigate('/')}
            aria-label="Back to home"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              workspace_premium
            </span>
          </button>
          <Link to="/" className="mentor-header__title">
            MentorConnect
          </Link>
        </div>
        <nav className="mentor-header__nav">
          <Link to="/">Dashboard</Link>
          <Link to="/">My Sessions</Link>
          <Link to="/">Resources</Link>
          <Link to="/">Profile</Link>
        </nav>
      </header>

      <main className="mentor-main">
        <section className="mentor-card" aria-labelledby="mentor-heading">
          <div className="mentor-card__heading">
            <p className="mentor-tag">Mentor onboarding</p>
            <h1 id="mentor-heading">
              Tell us about yourself to get the best matches
            </h1>
            <p>
              Share your experience and mentoring style so we can connect you
              with mentees who will benefit most from your expertise.
            </p>
          </div>

          <div className="mentor-progress">
            <div className="mentor-progress__top">
              <span className="mentor-progress__label">Profile completion</span>
              <span className="mentor-progress__count">
                {answeredCount}/{totalQuestions} answered
              </span>
            </div>
            <div
              className="mentor-progress__bar"
              role="progressbar"
              aria-valuenow={progressDisplay}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuetext={`${progressDisplay}%`}
            >
              <span style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <form className="mentor-form" onSubmit={handleSubmit}>
            <fieldset className="mentor-field">
              <legend>
                What’s your main area of expertise in tech?
                <span> Select up to {MAX_EXPERTISE_SELECTION}.</span>
              </legend>
              <div className="mentor-chip-grid">
                {expertiseOptions.map((option) => {
                  const isSelected = expertise.includes(option);
                  const disableUnselected =
                    !isSelected && expertise.length >= MAX_EXPERTISE_SELECTION;

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`mentor-chip ${
                        isSelected ? 'mentor-chip--selected' : ''
                      } ${disableUnselected ? 'mentor-chip--disabled' : ''}`}
                      onClick={() => handleToggleExpertise(option)}
                      aria-pressed={isSelected}
                      disabled={disableUnselected}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mentor-field">
              <label htmlFor="mentoring-topics">
                Which topics or skills do you enjoy mentoring on most?
              </label>
              <textarea
                id="mentoring-topics"
                value={mentoringTopics}
                onChange={(event) => setMentoringTopics(event.target.value)}
                placeholder="Tell us what you love helping others with..."
                rows={4}
              />
            </div>

            <div className="mentor-field">
              <label htmlFor="job-title">
                What’s your current or most recent tech job role/title?
              </label>
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder='E.g., "Principal Backend Engineer"'
              />
            </div>

            <fieldset className="mentor-field">
              <legend>How many years have you worked in tech?</legend>
              <div className="mentor-pill-grid">
                {experienceOptions.map((option) => (
                  <label
                    key={option}
                    className={`mentor-pill ${
                      experience === option ? 'mentor-pill--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={option}
                      checked={experience === option}
                      onChange={(event) => setExperience(event.target.value)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mentor-field">
              <legend>
                What’s your preferred mentorship style? (e.g. Hands-on,
                Guidance/Q&amp;A, Goal-setting)
              </legend>
              <div className="mentor-pill-grid columns-2">
                {mentorshipStyles.map((option) => (
                  <label
                    key={option.value}
                    className={`mentor-pill ${
                      mentorshipStyle === option.value
                        ? 'mentor-pill--active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="mentorship-style"
                      value={option.value}
                      checked={mentorshipStyle === option.value}
                      onChange={(event) => setMentorshipStyle(event.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mentor-field">
              <label htmlFor="mentee-questions">
                What type of questions do you hope mentees bring?
              </label>
              <textarea
                id="mentee-questions"
                value={menteeQuestions}
                onChange={(event) => setMenteeQuestions(event.target.value)}
                placeholder="Share the kinds of challenges or topics you love diving into with mentees."
                rows={4}
              />
            </div>

            <fieldset className="mentor-field">
              <legend>How often are you available for quick catchups or sessions?</legend>
              <div className="mentor-pill-grid columns-2">
                {availabilityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`mentor-pill ${
                      availability === option.value ? 'mentor-pill--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="availability"
                      value={option.value}
                      checked={availability === option.value}
                      onChange={(event) => setAvailability(event.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mentor-field">
              <label htmlFor="accomplishment">
                Share one accomplishment or project you’re most proud of.
              </label>
              <textarea
                id="accomplishment"
                value={accomplishment}
                onChange={(event) => setAccomplishment(event.target.value)}
                placeholder="Highlight a project, launch, or milestone that showcases your strengths."
                rows={4}
              />
            </div>

            <div className="mentor-field">
              <label htmlFor="early-lesson">
                What do you wish you had known earlier in your tech journey?
              </label>
              <textarea
                id="early-lesson"
                value={earlyLesson}
                onChange={(event) => setEarlyLesson(event.target.value)}
                placeholder="Share the advice or insight you’d pass on to your earlier self."
                rows={4}
              />
            </div>

            <div className="mentor-field">
              <label htmlFor="fun-fact">
                Fun fact or interest outside tech? (for icebreaking)
              </label>
              <input
                id="fun-fact"
                type="text"
                value={funFact}
                onChange={(event) => setFunFact(event.target.value)}
                placeholder="E.g., I host a monthly jazz night."
              />
            </div>

            <div className="mentor-actions">
              <Link to="/" className="mentor-actions__secondary">
                Save for later
              </Link>
              <button
                type="submit"
                className="mentor-actions__primary"
                disabled={!isComplete}
              >
                Save &amp; Continue
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default MentorOnboarding;
