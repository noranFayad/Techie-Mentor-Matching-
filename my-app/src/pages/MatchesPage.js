import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MatchesPage.css";

const mentorProfiles = [
  {
    id: "mentor-avery",
    name: "Avery Johnson",
    avatar: "https://i.pravatar.cc/160?img=47",
    headline: "Staff Software Engineer @ Aurora Labs",
    location: "San Francisco, USA",
    tagline:
      "11 years scaling distributed systems. Helps teams move from brittle monoliths to resilient platforms.",
    expertise: [
      "Backend Architecture",
      "Observability",
      "Mentoring engineering teams",
    ],
    mentoringTopics:
      "Designing resilient microservices, building pragmatic observability, navigating senior IC career paths.",
    experience: "10+ years",
    mentorshipStyle: "Goal-setting & accountability",
    menteeQuestions:
      "Bring the gnarly production incidents, tough architectural forks, or career plateaus you can’t quite get past.",
    availability: "Bi-weekly deep dives with async check-ins.",
    accomplishment:
      "Led a zero-downtime migration from a legacy monolith to event-driven services that handle 5x scale.",
    earlyLesson:
      "Ship small, learn fast. Long review cycles quietly kill momentum and confidence in teams.",
    funFact:
      "Collects vintage synthesizers and makes ambient music on weekends.",
  },
  {
    id: "mentor-celine",
    name: "Celine Park",
    avatar: "https://i.pravatar.cc/160?img=64",
    headline: "Director of Product Design @ HeyOrbit",
    location: "Toronto, Canada",
    tagline:
      "Design leader who has grown mentorship programs across 3 startups and a Series D unicorn.",
    expertise: ["Design Systems", "Product Discovery", "Inclusive Design"],
    mentoringTopics:
      "Upleveling UX storytelling, facilitating user interviews, and collaborating tightly with PM/Eng.",
    experience: "8+ years",
    mentorshipStyle: "Guidance & Q&A sessions",
    menteeQuestions:
      "Love when mentees bring messy prototypes, tough stakeholder feedback, or tricky user insights to unpack.",
    availability: "Weekly office hours with async Loom reviews.",
    accomplishment:
      "Built a cross-product design system adopted by 9 teams, cutting design-to-build time by 35%.",
    earlyLesson:
      "Good design ops beat hero designers. Processes that empower teams scale better than pixel-perfect files.",
    funFact:
      "Runs a neighborhood supper club sourcing ingredients from local urban farms.",
  },
  {
    id: "mentor-omar",
    name: "Omar Siddiqui",
    avatar: "https://i.pravatar.cc/160?img=12",
    headline: "Principal Cloud Architect @ NimbusWorks",
    location: "Austin, USA",
    tagline:
      "Cloud and DevOps strategist helping companies tame infrastructure costs without slowing delivery.",
    expertise: ["Cloud Cost Optimization", "Kubernetes", "Team Enablement"],
    mentoringTopics:
      "Infrastructure as code patterns, platform squads, and preparing staff+ engineers for architecture panels.",
    experience: "10+ years",
    mentorshipStyle: "Hands-on pairing & feedback",
    menteeQuestions:
      "Bring Terraform modules, incident retros, or your promotion packet—let’s make it sharper together.",
    availability: "Monthly strategy sessions plus Slack support.",
    accomplishment:
      "Reduced AWS spend by 42% while improving deployment frequency for a 60-engineer org.",
    earlyLesson:
      "Documentation is your future self’s best teammate. Automate it or it won’t happen.",
    funFact:
      "Certified barbecue judge who travels for smokehouse competitions.",
  },
  {
    id: "mentor-lucia",
    name: "Lucía Fernández",
    avatar: "https://i.pravatar.cc/160?img=32",
    headline: "Engineering Manager @ TempoAI",
    location: "Madrid, Spain",
    tagline:
      "People-first engineering manager coaching leads on feedback, hiring, and inclusive leadership.",
    expertise: [
      "Leadership Development",
      "Hiring Playbooks",
      "Career Frameworks",
    ],
    mentoringTopics:
      "Crafting growth plans, running effective 1:1s, and establishing calm, high performing teams.",
    experience: "7+ years",
    mentorshipStyle: "Strategic advising & planning",
    menteeQuestions:
      "Let’s workshop real feedback conversations, restructure your team rituals, or map your next promotion.",
    availability: "Every other week with async notes & templates.",
    accomplishment:
      "Scaled TempoAI’s engineering org from 12 to 70 with a 95% retention rate over 3 years.",
    earlyLesson:
      "Feedback lands when it is specific, kind, and timely—delay makes everything harder.",
    funFact: "Trains for long-distance cycling tours and journals every ride.",
    isMutualMatch: true,
  },
];

const menteeProfiles = [
  {
    id: "mentee-isa",
    name: "Isabella Chen",
    avatar: "https://i.pravatar.cc/160?img=5",
    headline: "Mid-level Frontend Developer @ Marketly",
    location: "Seattle, USA",
    tagline:
      "React developer levelling up on system design to step into a senior engineer scope this year.",
    techRole: "Mid-level Developer",
    careerGoals:
      "Own the technical design for a cross-team initiative and mentor new hires with confidence.",
    mentorshipFocus: "System Design & Architecture",
    learningStyle: "Hands-on practice & projects",
    techChallenge:
      "Translating product requirements into scalable front-end architecture without over-engineering.",
    frequency: "Bi-weekly",
    mentorshipPreference: "Long-term mentorship",
    projectHighlight:
      "Leading a revamp of our dashboard filters to support custom queries—need feedback on data modelling.",
    motivation:
      "I love empowering teammates with great developer experience and seeing adoption metrics climb.",
    funFact:
      "I host a Sunday dinner club that experiments with regional noodle recipes.",
  },
  {
    id: "mentee-raj",
    name: "Raj Mehta",
    avatar: "https://i.pravatar.cc/160?img=25",
    headline: "Career Switcher • Former Mechanical Engineer",
    location: "Chicago, USA",
    tagline:
      "Transitioning into backend development after completing a part-time coding bootcamp.",
    techRole: "Career Switcher",
    careerGoals:
      "Ship two portfolio-ready backend projects and land my first software engineering role.",
    mentorshipFocus: "Backend & APIs",
    learningStyle: "Step-by-step walkthroughs",
    techChallenge:
      "Understanding how to design clean REST APIs and choose the right data layer trade-offs.",
    frequency: "Weekly",
    mentorshipPreference: "Long-term mentorship",
    projectHighlight:
      "Building a mechanical workshop booking tool and need guidance on authentication & deployment.",
    motivation:
      "I love solving real-world problems and want to bring my manufacturing ops mindset into tech.",
    funFact:
      "Weekend guitarist who performs at open mic nights around the city.",
  },
  {
    id: "mentee-alia",
    name: "Alia Hussein",
    avatar: "https://i.pravatar.cc/160?img=49",
    headline: "Junior Data Analyst @ InsightLoop",
    location: "Dubai, UAE",
    tagline:
      "Analyst moving toward machine learning engineering with a focus on responsible AI.",
    techRole: "Junior Developer",
    careerGoals:
      "Design my first end-to-end ML experiment and present findings to leadership.",
    mentorshipFocus: "Data & AI / Machine Learning",
    learningStyle: "Solving problems together",
    techChallenge:
      "Struggling with structuring MLOps pipelines and choosing evaluation metrics that matter.",
    frequency: "As needed",
    mentorshipPreference: "Quick, one-off advice",
    projectHighlight:
      "Prototyping a churn prediction model; looking for review on feature engineering approach.",
    motivation:
      "Curious about how thoughtful data use can positively impact customer experience.",
    funFact:
      "I completed a freediving certification and love underwater photography.",
  },
  {
    id: "mentee-luca",
    name: "Luca Romano",
    avatar: "https://i.pravatar.cc/160?img=60",
    headline: "Student • Computer Science (Final Year)",
    location: "Milan, Italy",
    tagline:
      "Preparing for my first internship while finishing a thesis on AR-assisted manufacturing.",
    techRole: "Student",
    careerGoals:
      "Gain practical experience in mobile development and craft a standout capstone project.",
    mentorshipFocus: "Frontend (React, Vue, etc.)",
    learningStyle: "Live Q&A or office hours",
    techChallenge:
      "Balancing academic theory with real-world code structure; need help scoping MVP features.",
    frequency: "Monthly",
    mentorshipPreference: "Quick, one-off advice",
    projectHighlight:
      "Building a React Native proof-of-concept for AR assembly instructions with limited time.",
    motivation:
      "Driven by creating tools that make complex industrial workflows feel intuitive.",
    funFact: "Semi-pro saxophonist who plays at local jazz bars on weekends.",
  },
];

const ROLE_COPY = {
  mentor: {
    heading: "Meet your potential mentees",
    subheading:
      "Review mentee profiles tailored to your expertise. Approve to save, or pass to see who’s next.",
    personaLabel: "Mentee persona",
  },
  mentee: {
    heading: "Browse mentors ready to support you",
    subheading:
      "Explore mentor profiles matched to your growth goals. Approve to bookmark, or pass to keep browsing.",
    personaLabel: "Mentor persona",
  },
};

const ACTION_COPY = {
  approve: "Saved to Matches",
  reject: "Skipped this profile",
};

const DRAG_THRESHOLD = 140;

function getMentorSections(profile) {
  if (!profile) return [];
  return [
    {
      label: "Expertise Areas",
      value: profile.expertise.join(", "),
    },
    {
      label: "Mentoring Focus",
      value: profile.mentoringTopics,
    },
    {
      label: "Current Role",
      value: `${profile.headline}`,
    },
    {
      label: "Experience",
      value: profile.experience,
    },
    {
      label: "Mentorship Style",
      value: profile.mentorshipStyle,
    },
    {
      label: "Questions They Love",
      value: profile.menteeQuestions,
    },
    {
      label: "Availability",
      value: profile.availability,
    },
    {
      label: "Proudest Accomplishment",
      value: profile.accomplishment,
    },
    {
      label: "Early Lesson",
      value: profile.earlyLesson,
    },
    {
      label: "Fun Fact",
      value: profile.funFact,
    },
  ];
}

function getMenteeSections(profile) {
  if (!profile) return [];
  return [
    {
      label: "Current Role / Level",
      value: profile.techRole,
    },
    {
      label: "Top Goals",
      value: profile.careerGoals,
    },
    {
      label: "Focus Area",
      value: profile.mentorshipFocus,
    },
    {
      label: "Preferred Learning Style",
      value: profile.learningStyle,
    },
    {
      label: "Biggest Challenge",
      value: profile.techChallenge,
    },
    {
      label: "Check-in Frequency",
      value: profile.frequency,
    },
    {
      label: "Mentorship Preference",
      value: profile.mentorshipPreference,
    },
    {
      label: "Project Spotlight",
      value: profile.projectHighlight,
    },
    {
      label: "What Drives Them",
      value: profile.motivation,
    },
    {
      label: "Fun Fact",
      value: profile.funFact,
    },
  ];
}

function MatchesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const roleFromState = location.state?.role;
  const userRole =
    roleFromState === "mentor"
      ? "mentor"
      : roleFromState === "mentee"
        ? "mentee"
        : "mentee";

  const profiles = useMemo(
    () => (userRole === "mentor" ? menteeProfiles : mentorProfiles),
    [userRole],
  );

  const copy = ROLE_COPY[userRole];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationState, setAnimationState] = useState("enter");
  const [toast, setToast] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragOffsetRef = useRef(0);
  const draggingRef = useRef(false);
  const [showMutualMatch, setShowMutualMatch] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setAnimationState("enter");
  }, [profiles]);

  useEffect(() => {
    if (animationState !== "enter") {
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setAnimationState(null);
    }, 380);
    return () => window.clearTimeout(timeout);
  }, [animationState]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const currentProfile = profiles[activeIndex];
  const sections =
    userRole === "mentor"
      ? getMenteeSections(currentProfile)
      : getMentorSections(currentProfile);

  const handleDecision = useCallback(
    (decision) => {
      if (
        !currentProfile ||
        animationState === "approve" ||
        animationState === "reject"
      ) {
        return;
      }

      const isLastCard = activeIndex + 1 >= profiles.length;
      const shouldShowMutual =
        decision === "approve" && currentProfile.isMutualMatch;

      setAnimationState(decision);
      setToast(decision);

      window.setTimeout(() => {
        const nextIndex = activeIndex + 1;
        setActiveIndex((prev) => prev + 1);

        if (shouldShowMutual) {
          setShowMutualMatch(true);
        }

        if (!isLastCard) {
          setAnimationState("enter");
        } else {
          setAnimationState(null);
        }
      }, 320);
    },
    [activeIndex, animationState, currentProfile, profiles, userRole],
  );

  const handleBackToForm = () => {
    navigate(userRole === "mentor" ? "/become-a-mentor" : "/find-a-mentor");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    draggingRef.current = false;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  }, [currentProfile]);

  const handleCardPointerDown = useCallback(
    (event) => {
      if (
        !currentProfile ||
        animationState === "approve" ||
        animationState === "reject"
      ) {
        return;
      }
      const target = event.target;
      if (target instanceof Element) {
        const interactiveAncestor = target.closest("button, a");
        if (interactiveAncestor) {
          return;
        }
      }
      event.preventDefault();
      draggingRef.current = true;
      dragStartX.current = event.clientX;
      dragOffsetRef.current = 0;
      setIsDragging(true);
      setDragOffset(0);
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [animationState, currentProfile],
  );

  const handleCardPointerMove = useCallback((event) => {
    if (!draggingRef.current) {
      return;
    }
    event.preventDefault();
    const delta = event.clientX - dragStartX.current;
    dragOffsetRef.current = delta;
    setDragOffset(delta);
  }, []);

  const handleCardPointerUp = useCallback(
    (event) => {
      if (!draggingRef.current) {
        return;
      }
      event.preventDefault();
      draggingRef.current = false;
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      const delta = dragOffsetRef.current;
      setIsDragging(false);
      if (Math.abs(delta) >= DRAG_THRESHOLD) {
        setDragOffset(0);
        handleDecision(delta > 0 ? "approve" : "reject");
      } else {
        setDragOffset(0);
      }
    },
    [handleDecision],
  );

  const progressLabel = currentProfile
    ? `Profile ${activeIndex + 1} of ${profiles.length}`
    : "You’re all caught up";

  const cardStyle = animationState
    ? undefined
    : {
        transform: `translate3d(${dragOffset}px, 0, 0) rotate(${Math.max(
          -12,
          Math.min(12, dragOffset * 0.02),
        )}deg)`,
      };

  return (
    <div className={`matches-page matches-page--${userRole}`}>
      <header className="matches-header">
        <div className="matches-header__brand" role="presentation">
          <button
            type="button"
            className="matches-header__avatar"
            onClick={handleGoHome}
            aria-label="Back to home"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              diversity_3
            </span>
          </button>
          <div className="matches-header__title-group">
            <Link to="/" className="matches-header__title">
              ConnectSphere
            </Link>
            <span className="matches-header__subtitle">Matches</span>
          </div>
        </div>
        <nav className="matches-header__nav">
          <Link to="/" className="is-active">
            Browse &amp; Match
          </Link>
          <Link to="/">My Sessions</Link>
          <Link to="/">Resources</Link>
        </nav>
        <div className="matches-header__profile">
          <button type="button" onClick={handleBackToForm}>
            Edit questionnaire
          </button>
          <div className="matches-header__initials" aria-hidden="true">
            {userRole === "mentor" ? "MN" : "MT"}
          </div>
        </div>
      </header>

      <main className="matches-main">
        <section className="matches-hero" aria-live="polite">
          <p className="matches-hero__eyebrow">{copy.personaLabel}</p>
          <h1>{copy.heading}</h1>
          <p className="matches-hero__body">{copy.subheading}</p>
          <div className="matches-hero__progress">{progressLabel}</div>
        </section>

        {toast && (
          <div
            className={`matches-toast matches-toast--${toast}`}
            role="status"
            aria-live="assertive"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {toast === "approve" ? "favorite" : "block"}
            </span>
            <span>{ACTION_COPY[toast]}</span>
          </div>
        )}

        {showMutualMatch && currentProfile?.isMutualMatch && (
          <div
            className="matches-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mutual-match-heading"
          >
            <div
              className="matches-modal__backdrop"
              onClick={() => setShowMutualMatch(false)}
              aria-hidden="true"
            />
            <div className="matches-modal__content">
              <h2 id="mutual-match-heading">It’s a mutual match!</h2>
              <p>
                {currentProfile.name} has already approved you. Book a “Get to
                Know You” call to keep the momentum going.
              </p>
              <div className="matches-modal__actions">
                <a
                  className="matches-modal__button matches-modal__button--primary"
                  href="/book-gtk-call"
                  onClick={() => setShowMutualMatch(false)}
                >
                  Book a GTK call
                </a>
                <button
                  type="button"
                  className="matches-modal__button"
                  onClick={() => setShowMutualMatch(false)}
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="matches-card-area">
          {currentProfile ? (
            <div
              className="matches-card-shell"
              role="group"
              aria-label="Match actions"
            >
              <button
                type="button"
                className="matches-actions__button matches-actions__button--reject"
                onClick={() => handleDecision("reject")}
                disabled={!currentProfile}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  thumb_down
                </span>
                <span>Pass</span>
              </button>
              <article
                className={`match-card${animationState ? ` match-card--${animationState}` : ""}${
                  isDragging ? " match-card--dragging" : ""
                }`}
                aria-describedby={`profile-${currentProfile.id}`}
                style={cardStyle}
                onPointerDown={handleCardPointerDown}
                onPointerMove={handleCardPointerMove}
                onPointerUp={handleCardPointerUp}
                onPointerCancel={handleCardPointerUp}
              >
                <div className="match-card__content">
                  <div className="match-card__header">
                    <div
                      className="match-card__avatar"
                      style={{
                        backgroundImage: `url(${currentProfile.avatar})`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="match-card__identity">
                      <div className="match-card__meta">
                        <span className="match-card__badge">
                          {userRole === "mentor" ? "Mentee" : "Mentor"}
                        </span>
                        <span className="match-card__location">
                          {currentProfile.location}
                        </span>
                      </div>
                      <h2 id={`profile-${currentProfile.id}`}>
                        {currentProfile.name}
                      </h2>
                      <p className="match-card__headline">
                        {currentProfile.headline}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="match-card__menu"
                      aria-label="More actions"
                    >
                      <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                      >
                        more_horiz
                      </span>
                    </button>
                  </div>

                  <p className="match-card__tagline">
                    {currentProfile.tagline}
                  </p>

                  <ul className="match-card__sections">
                    {sections.map((section) => (
                      <li key={section.label}>
                        <h3>{section.label}</h3>
                        <p>{section.value}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <button
                type="button"
                className="matches-actions__button matches-actions__button--approve"
                onClick={() => handleDecision("approve")}
                disabled={!currentProfile}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  favorite
                </span>
                <span>Approve</span>
              </button>
            </div>
          ) : (
            <div className="matches-empty">
              <div className="matches-empty__illustration" aria-hidden="true">
                <span className="material-symbols-outlined">
                  hourglass_empty
                </span>
              </div>
              <h2>You’re caught up for now</h2>
              <p>
                We’ll notify you when new{" "}
                {userRole === "mentor" ? "mentees" : "mentors"} are ready to
                review. In the meantime, invite others to join your network.
              </p>
              <div className="matches-empty__actions">
                <button type="button" onClick={handleGoHome}>
                  Back to dashboard
                </button>
                <button type="button" className="secondary">
                  Invite someone
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MatchesPage;
