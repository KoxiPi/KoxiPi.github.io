'use client';

import { useEffect, useState } from 'react';

const projects = [
  {
    index: '01', title: 'Distributed RESTful Task Microservice', eyebrow: 'Backend · Distributed Systems',
    summary: 'A containerized, production-minded task API designed around secure ownership, predictable latency, and safe delivery.',
    problem: 'Task services need to remain secure and dependable as concurrent traffic and deployment complexity grow.',
    solution: 'Built user-scoped CRUD flows with JWT authentication, PostgreSQL persistence, containerized environments, automated tests, linting, and CI.',
    challenge: 'Balancing authentication, database consistency, and a sub-150ms tail-latency target under 200+ concurrent requests.',
    impact: 'Created a repeatable backend foundation with safer merges and explicit reliability targets.',
    tech: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'SQLAlchemy', 'JWT', 'Pytest', 'GitHub Actions'],
    href: 'https://github.com/KoxiPi/distributed-task-microservice', kind: 'queue'
  },
  {
    index: '02', title: 'Cloud-Ready Management Platform', eyebrow: 'Cloud · Data Architecture',
    summary: 'A transaction-aware Java management system built to keep complex relational workflows correct, testable, and cloud ready.',
    problem: 'Multi-entity operations create fragile edge cases when domain rules and data integrity live in the wrong layer.',
    solution: 'Separated domain, repository, and service concerns through a custom JDBC persistence layer, database constraints, and triggers.',
    challenge: 'Preserving integrity across interdependent operations while keeping the architecture maintainable.',
    impact: '50+ JUnit tests surfaced critical integration edge cases before final delivery.',
    tech: ['Java', 'SQL', 'JDBC', 'JUnit 5', 'AWS', 'Transactions', 'Schema Design'],
    href: 'https://github.com/KoxiPi/Cloud-Ready-Management-Platform', kind: 'cloud'
  },
  {
    index: '03', title: 'Autonomous Arduino Robot', eyebrow: 'Robotics · Embedded Systems',
    summary: 'Software meeting the physical world: a sensor-driven robot built to navigate changing, imperfect environments.',
    problem: 'Reliable motion requires interpreting noisy sensors and correcting behavior in real time.',
    solution: 'Integrated ultrasonic and infrared sensors with motor drivers for line following, wall following, and maze solving.',
    challenge: 'Tuning feedback loops and calibration against real-world latency, surface variation, and hardware constraints.',
    impact: 'Improved stability and response through iterative debugging, calibration, and live testing.',
    tech: ['Arduino', 'C / C++', 'Ultrasonic Sensors', 'Infrared Sensors', 'Motor Control', 'Calibration'],
    href: 'https://www.youtube.com/shorts/LMwMyqVCKbk', kind: 'robot'
  },
  {
    index: '04', title: 'AI Heuristic Solver Engine', eyebrow: 'Algorithms · Intelligent Systems',
    summary: 'A performance-focused N-Queens solver that combines advanced search techniques with a responsive desktop interface.',
    problem: 'Naive search becomes impractical as the board grows and blocks the interface during long-running work.',
    solution: 'Combined recursive backtracking, heuristic pruning, memoization, and bitmask state encoding with a decoupled runtime UI.',
    challenge: 'Improving search efficiency without tying algorithm logic to presentation or losing real-time visibility.',
    impact: 'Reduced search time by roughly 60% through custom move ordering and pruning.',
    tech: ['Java', 'Swing', 'Heuristic Search', 'Backtracking', 'Memoization', 'OOP', 'Strategy', 'Observer'],
    href: 'https://github.com/KoxiPi/AI-Heuristic-Solver-Engine', kind: 'ai'
  },
  {
    index: '05', title: 'Pet Shelter Application', eyebrow: 'Desktop · Product Engineering',
    summary: 'A polished Java desktop dashboard for shelter intake, adoption tracking, and persistent local record management.',
    problem: 'Shelter staff need a dependable way to manage pets, images, and records without fragile file paths or confusing operator flows.',
    solution: 'Built snapshot-driven management flows, dedicated update dialogs, image previews, internal image storage, and validated import/export actions.',
    challenge: 'Keeping desktop UI state, persisted records, and internally managed images consistent across intake and adoption workflows.',
    impact: 'Delivered operator-friendly workflows with confirmation prompts and smoke-tested service and persistence behavior.',
    tech: ['Java', 'Swing', 'Desktop UI', 'Persistence', 'Java NIO', 'Properties', 'Testing', 'UX Flows'],
    href: 'https://github.com/KoxiPi/Pet-Shelter-Application', kind: 'desktop'
  },
  {
    index: '06', title: 'Spider Solitaire', eyebrow: 'Functional Programming · Game AI',
    summary: 'A one-suit Spider Solitaire desktop game built in Haskell with a responsive card interface and heuristic auto-solver.',
    problem: 'A playable solitaire engine must keep card movement, reserve deals, completed runs, and win conditions consistent across every interaction.',
    solution: 'Modeled immutable game state and rule-driven transitions, then added move hints and a heuristic search that can apply a full solution.',
    challenge: 'Balancing fast solver decisions with legal move generation and clear visual feedback in a desktop game loop.',
    impact: 'Delivered a complete 104-card game with automatic foundation completion, one-step hints, and full-game heuristic solving.',
    tech: ['Haskell', 'Gloss', 'Cabal', 'Functional Programming', 'Game State', 'Heuristic Search', 'OpenGL'],
    href: 'https://github.com/KoxiPi/spider-solitaire', kind: 'game'
  },
];

const skillGroups = [
  { name: 'Languages', hint: 'Core tools', items: ['Python', 'Java', 'SQL', 'R'] },
  { name: 'Backend & Systems', hint: 'Services & systems', items: ['FastAPI', 'Spring Boot', 'REST APIs', 'Redis', 'PostgreSQL', 'Distributed Systems', 'Concurrency'] },
  { name: 'Cloud', hint: 'AWS ecosystem', items: ['AWS', 'Lambda', 'EC2', 'S3', 'RDS', 'CloudWatch'] },
  { name: 'Engineering & Reliability', hint: 'Ship reliably', items: ['Docker', 'GitHub Actions', 'CI/CD', 'k6', 'Locust', 'Observability', 'TDD'] },
  { name: 'AI & Data Systems', hint: 'Learn from data', items: ['Agentic Workflows', 'RAG', 'PyTorch', 'Vector Databases', 'MLflow', 'LLM Observability', 'Data Pipelines'] },
];

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem('shenglong-intro-seen');
    const timer = window.setTimeout(() => {
      setIntroVisible(false);
      window.sessionStorage.setItem('shenglong-intro-seen', 'true');
    }, seen ? 0 : 2800);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, []);

  const dismissIntro = () => {
    setIntroVisible(false);
    window.sessionStorage.setItem('shenglong-intro-seen', 'true');
  };

  return (
    <main id="top">
      <a className="skip-link" href="#content">Skip to content</a>
      <div className={`intro ${introVisible ? '' : 'intro--done'}`} aria-hidden={!introVisible} onClick={dismissIntro}>
        <button className="intro-skip" type="button" onClick={dismissIntro}>Skip intro</button>
        <div className="intro-network" aria-hidden="true">
          <i className="intro-line line-a" /><i className="intro-line line-b" /><i className="intro-line line-c" />
          <i className="intro-node node-a" /><i className="intro-node node-b" /><i className="intro-node node-c" /><i className="intro-node node-d" />
        </div>
        <div className="intro-copy">
          <p className="intro-greeting">Hi, Welcome <span>👋</span></p>
          <p className="intro-name">I&apos;m Shenglong.</p>
          <p className="intro-note">Nice to meet you.</p>
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Shenglong Chen, home"><span className="brand-dot" aria-hidden="true" />Shenglong Chen</a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation" onClick={() => setMenuOpen(false)}>
          <a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#contact">Contact</a>
        </nav>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <a className="resume-button" href="/Shenglong_Chen_Resume.pdf" target="_blank">Résumé <span>↗</span></a>
      </header>

      <section className="hero" id="content">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Software Engineer · Vancouver, Canada</div>
          <h1>Hi, I&apos;m Shenglong <span className="wave">👋</span></h1>
          <p className="hero-lede">Building reliable, scalable, and <em>intelligent</em> systems.</p>
          <p className="hero-description">I enjoy turning ideas into real products — from backend systems and cloud infrastructure to AI-powered applications.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View my work <span>↓</span></a>
            <a className="button button-secondary" href="#contact">Get in touch <span>↗</span></a>
          </div>
          <div className="social-links" aria-label="Social links">
            <a href="https://github.com/KoxiPi" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            <a href="https://www.linkedin.com/in/chenshenglong" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
            <a href="mailto:shenglongcc@gmail.com">Email <span>↗</span></a>
          </div>
        </div>

        <div className="system-visual" aria-label="Animated distributed systems architecture">
          <div className="visual-glow" />
          <div className="architecture">
            <div className="arch-node client"><span className="node-icon">●</span><small>CLIENT</small><strong>Request</strong></div>
            <div className="arch-node api"><span className="node-icon">↯</span><small>API GATEWAY</small><strong>FastAPI</strong></div>
            <div className="arch-node service"><span className="node-icon">⌁</span><small>SERVICE</small><strong>Workers</strong></div>
            <div className="arch-node database"><span className="node-icon">▱</span><small>DATABASE</small><strong>PostgreSQL</strong></div>
            <div className="arch-node cloud"><span className="node-icon">☁</span><small>CLOUD</small><strong>AWS</strong></div>
            <i className="connector c1"><b /></i><i className="connector c2"><b /></i><i className="connector c3"><b /></i><i className="connector c4"><b /></i>
          </div>
          <div className="visual-status"><span /> All systems operational <b>24ms</b></div>
        </div>
      </section>

      <section className="section reveal" id="about">
        <div className="section-heading">
          <p className="section-kicker">01 · About</p>
          <h2>A little about me.</h2>
          <p>I like the part of software engineering where a complicated system starts to feel simple.</p>
        </div>
        <div className="about-layout">
          <article className="about-copy surface">
            <p className="about-lede">I&apos;m a Vancouver-based software engineer and UBC Cognitive Systems graduate, drawn to the systems working quietly behind the product.</p>
            <p>I enjoy understanding how things work behind the scenes, asking the right questions, and finding clear ways to solve complex problems — whether that means shaping an API, optimizing a query, or designing a reliable data workflow.</p>
            <p>I care about thoughtful architecture, measurable performance, and software that teammates can confidently build on.</p>
            <div className="about-facts"><span><b>Based in</b>Vancouver, BC</span><span><b>Education</b>UBC · Cognitive Systems</span><span><b>Open to</b>Engineering opportunities</span></div>
          </article>
          <div className="thinking-map surface" aria-label="Engineering approach diagram">
            <div className="map-header"><span>ENGINEERING LOOP</span><b>IDEA → IMPACT</b></div>
            <div className="map-core">Build<br/><strong>with intent</strong></div>
            <span className="map-chip chip-1">Understand</span><span className="map-chip chip-2">Design</span><span className="map-chip chip-3">Measure</span><span className="map-chip chip-4">Improve</span>
            <i className="orbit orbit-a"/><i className="orbit orbit-b"/>
          </div>
        </div>
      </section>

      <section className="section reveal" id="experience">
        <div className="section-heading single-line-heading">
          <div><p className="section-kicker">02 · Experience</p><h2>Engineering in practice.</h2></div>
        </div>
        <article className="experience-card surface">
          <div className="experience-rail"><span>2025</span><i/><b>SFU</b></div>
          <div className="experience-main">
            <div className="experience-title"><div><p>Simon Fraser University</p><h3>Machine Learning Engineering Intern <span>Software Engineering</span></h3></div><time>May — Oct 2025</time></div>
            <p className="experience-summary">Built and integrated scalable backend data workflows for financial analysis, focusing on throughput, database performance, and dependable software delivery.</p>
            <div className="impact-grid">
              <div><strong>10K+</strong><span>financial records processed through Python data pipelines</span></div>
              <div><strong>4×</strong><span>higher throughput with multiprocessing and optimized I/O</span></div>
              <div><strong>35%</strong><span>faster PostgreSQL execution through indexing and query-plan analysis</span></div>
            </div>
            <div className="tag-row"><span>Python</span><span>PostgreSQL</span><span>Data Pipelines</span><span>Multiprocessing</span><span>API Design</span><span>Agile</span></div>
          </div>
        </article>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-heading single-line-heading reveal">
          <div><p className="section-kicker">03 · Selected work</p><h2>Projects with a point of view.</h2></div>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card surface reveal" key={project.title}>
              <div className="project-top"><span>{project.index}</span><p>{project.eyebrow}</p><a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>↗</a></div>
              <div className="project-grid">
                <div className="project-overview"><h3>{project.title}</h3><p>{project.summary}</p><div className="tag-row">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
                <div className={`project-diagram diagram-${project.kind}`} aria-hidden="true">
                  <span className="diagram-label label-a">{project.kind === 'robot' ? 'Sensors' : project.kind === 'ai' ? 'State' : project.kind === 'desktop' ? 'Intake' : project.kind === 'game' ? 'Input / AI' : 'Client'}</span>
                  <span className="diagram-label label-b">{project.kind === 'robot' ? 'Logic' : project.kind === 'ai' ? 'Search' : project.kind === 'cloud' ? 'Service' : project.kind === 'desktop' ? 'Records' : project.kind === 'game' ? 'Game Logic' : 'API'}</span>
                  <span className="diagram-label label-c">{project.kind === 'robot' ? 'Motion' : project.kind === 'ai' ? 'Solution' : project.kind === 'cloud' ? 'Data' : project.kind === 'desktop' ? 'Storage' : project.kind === 'game' ? 'Game State' : 'Database'}</span>
                  <i/><i/><b className="diagram-pulse"/>
                </div>
              </div>
              <div className="project-details"><div><b>Problem</b><p>{project.problem}</p></div><div><b>Solution</b><p>{project.solution}</p></div><div><b>Engineering challenge</b><p>{project.challenge}</p></div><div><b>Result</b><p>{project.impact}</p></div></div>
              <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.kind === 'robot' ? 'Watch the demo' : 'View repository'} <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal" id="skills">
        <div className="section-heading single-line-heading">
          <div><p className="section-kicker">04 · Toolkit</p><h2>Skills, organized by how I build.</h2></div>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => <article className="skill-card surface" key={group.name}><div><span>0{index + 1}</span><small>{group.hint}</small></div><h3>{group.name}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
        </div>
        <div className="credential-strip surface"><div><span>✓</span><p><small>AWS CERTIFIED</small>Cloud Practitioner</p></div><div><span>✓</span><p><small>AWS CERTIFIED</small>Solutions Architect — Associate</p></div><p>Cloud concepts backed by hands-on engineering.</p></div>
      </section>

      <section className="section contact-section reveal" id="contact">
        <div className="contact-glow" />
        <p className="section-kicker">05 · Let&apos;s connect</p>
        <h2>Let&apos;s build something <em>great.</em></h2>
        <p>I&apos;m always happy to connect, talk about software, or explore interesting engineering opportunities.</p>
        <a className="button button-primary contact-button" href="mailto:shenglongcc@gmail.com">Say hello <span>👋</span></a>
        <div className="contact-links"><a href="mailto:shenglongcc@gmail.com">shenglongcc@gmail.com <span>↗</span></a><a href="https://www.linkedin.com/in/chenshenglong" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/KoxiPi" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div>
      </section>

      <footer><p>Designed &amp; built by Shenglong Chen</p><span>Software Engineer · Vancouver, Canada</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
