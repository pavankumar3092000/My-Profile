import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#04080F",
  surface: "#0A1628",
  surfaceHov: "#0F2040",
  accent: "#00C8FF",
  accentDim: "rgba(0,200,255,0.12)",
  gold: "#F5A623",
  goldDim: "rgba(245,166,35,0.12)",
  text: "#CCD6F6",
  muted: "#8892B0",
  border: "#172A45",
  borderHov: "#1E3A5F",
};

const ROLES = [
  "SQL Engineer",
  "Backend Developer",
  "AI & Automation Engineer",
];

const SKILLS_DATA = [
  { cat: "Languages", color: C.accent, items: ["Java", "Python", "SQL", "PL/SQL", "Bash", "PHP"] },
  { cat: "Databases", color: C.gold, items: ["Oracle", "PostgreSQL", "MySQL"] },
  { cat: "DevOps & Cloud", color: C.accent, items: ["Docker", "Jenkins", "GitLab CI", "AWS", "Git"] },
  { cat: "AI & Automation", color: C.gold, items: ["LangChain", "LangGraph", "Machine Learning", "Fine-tuning", "Agentic AI", "Custom LLM"] },
  { cat: "Backend & APIs", color: C.accent, items: ["Django", "Spring Boot", "FastAPI", "RESTful APIs", "JWT / RBAC"] },
  { cat: "Monitoring & Tools", color: C.gold, items: ["Prometheus", "Apache Airflow", "Cacti", "Jira", "Remedy"] },
];

const EXPERIENCE = [
  {
    role: "SQL Engineer",
    company: "iBasis India Pvt Ltd",
    period: "Apr 2023 - Present",
    location: "Hyderabad",
    badge: "Promoted",
    color: C.accent,
    highlights: [
      "Engineered backend services with Java, Spring Boot, and Python + Oracle/PostgreSQL, boosting resiliency by 30%",
      "Automated data pipelines, cutting manual operations by 10-12 hrs/week",
      "Advanced CI/CD via GitLab & Jenkins, shortening release cycles by 40%",
      "Drove query optimization improving SQL execution time by 45%",
      "Scaled data workloads for 3x growth with retention and indexing strategies",
      "Enhanced observability with Prometheus, reducing incident MTTR by 30%",
    ],
  },
  {
    role: "Build Engineer",
    company: "PragmaEdge Software Services",
    period: "Sep 2021 - Apr 2023",
    location: "Hyderabad",
    badge: "",
    color: C.gold,
    highlights: [
      "Standardized Jenkins + GitLab pipelines, reducing build durations by 35%",
      "Implemented Ansible automation, decreasing config errors by 45%",
      "Established Infrastructure as Code, cutting setup time by 6 hours",
      "Reduced production defect rate by 40% through rigorous code reviews",
      "Cut incident window from ~2.5 hrs to ~28 min via automated rollbacks",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Outshade",
    period: "Mar 2019 - May 2019",
    location: "Hyderabad",
    badge: "",
    color: C.muted,
    highlights: [
      "Built responsive PHP web interfaces, enhancing usability by 25%",
      "Contributed to code reviews, reducing defects by 20%",
    ],
  },
];

const PROJECTS = [
  {
    name: "Voice Management Tool",
    company: "iBasis India",
    desc: "Enterprise React - Spring Boot and Oracle DB platform managing global voice traffic, pricing, floor costs, and bilateral deals across microservices.",
    tags: ["Java", "Spring Boot" ,"Oracle", "PL/SQL", "Microservices", "Materialized Views"],
    metric: "45% faster queries",
    icon: "satellite",
    color: C.accent,
  },
  {
    name: "Customer Service Desk AI",
    company: "iBasis India",
    desc: "AI-driven automation suite with Copilot agent + custom LLM to auto-triage and create tickets from emails and calls.",
    tags: ["Python", "LangChain", "LLM", "AI Agents"],
    metric: "12-15 hrs/week saved",
    icon: "bot",
    color: C.gold,
  },
  {
    name: "PSX Data Automation Suite",
    company: "iBasis India",
    desc: "Python + Flask web app automating PSX deployments in Linux with tuned DB queries and scalable API integrations.",
    tags: ["Python", "Flask", "PostgreSQL", "Linux"],
    metric: "45% faster retrieval",
    icon: "bolt",
    color: C.accent,
  },
  {
    name: "Build Automation Platform",
    company: "PragmaEdge",
    desc: "Automated IBM application deployments across AWS EC2, Lambda, OpenShift, and ECS using Terraform and Ansible IaC.",
    tags: ["Terraform", "Ansible", "AWS", "OpenShift"],
    metric: "70% faster deployments",
    icon: "crane",
    color: C.gold,
  },
  {
    name: "UPS Logistics Integration",
    company: "PragmaEdge",
    desc: "Automated Sterling Integrator deployments with secure trading partner onboarding via FTP, SFTP, AS2, HTTP/HTTPS.",
    tags: ["Sterling Integrator", "SFTP", "AS2", "Automation"],
    metric: "99% compliance rate",
    icon: "truck",
    color: C.accent,
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.8,
    }));

    const onMouse = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        const glow = md < 160;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow ? p.r + 2 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = glow ? `rgba(0,200,255,${0.9 * (1 - md / 160)})` : "rgba(0,200,255,0.45)";
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i += 1) {
        for (let j = i + 1; j < pts.length; j += 1) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,200,255,${0.18 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}

function Typewriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = texts[idx];
    let timer;

    if (!deleting && display === full) {
      timer = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && display === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    } else {
      timer = setTimeout(
        () => setDisplay((d) => (deleting ? d.slice(0, -1) : full.slice(0, d.length + 1))),
        deleting ? 38 : 75
      );
    }

    return () => clearTimeout(timer);
  }, [display, deleting, idx, texts]);

  return (
    <span style={{ color: C.accent, fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(16px,2.5vw,22px)" }}>
      {display}
      <span style={{ animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
}

function Section({ id, children, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: "clamp(60px,8vw,110px) 0",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(44px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
        position: "relative",
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function Container({ children }) {
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(20px,4vw,40px)" }}>{children}</div>;
}

function SectionLabel({ label, title }) {
  return (
    <div style={{ marginBottom: "clamp(40px,5vw,64px)", textAlign: "center" }}>
      <p style={{ fontFamily: "JetBrains Mono, monospace", color: C.accent, fontSize: 12, letterSpacing: 5, textTransform: "uppercase", marginBottom: 14 }}>{label}</p>
      <h2 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(24px,4vw,40px)", color: C.text, margin: 0 }}>{title}</h2>
      <div style={{ width: 56, height: 3, background: `linear-gradient(90deg, ${C.accent}, ${C.gold})`, margin: "16px auto 0", borderRadius: 2 }} />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 clamp(20px,4vw,48px)",
        height: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(4,8,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.4s",
      }}
    >
      <span style={{ fontFamily: "Orbitron, sans-serif", color: C.accent, fontSize: 20, fontWeight: 900, letterSpacing: 3 }}>MPK</span>
      <div style={{ display: "flex", gap: "clamp(12px,2.5vw,36px)", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              color: C.muted,
              textDecoration: "none",
              fontSize: 12,
              letterSpacing: 1.5,
              fontFamily: "JetBrains Mono, monospace",
              transition: "color 0.2s",
              textTransform: "uppercase",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = C.accent;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = C.muted;
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    ["4.9+", "Years Exp"],
    ["5", "Projects"],
    ["2024", "Best Employee"],
    ["3x", "Scale Growth"],
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "82px 24px 40px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "70vw",
          height: "70vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div>
        <p
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: C.accent,
            fontSize: 13,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 28,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s 0.15s",
          }}
        >
          Hello, World! - I'm
        </p>

        <h1
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(42px,9vw,96px)",
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 28px",
            background: `linear-gradient(135deg, ${C.text} 0%, ${C.accent} 45%, ${C.gold} 90%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s 0.3s",
          }}
        >
          Medi
          <br />
          Pavan Kumar
        </h1>

        <div
          style={{
            marginBottom: 44,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s 0.45s",
          }}
        >
          <Typewriter texts={ROLES} />
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 60,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s 0.6s",
          }}
        >
          <GlowBtn href="#projects" variant="outline">
            View Projects
          </GlowBtn>
          <GlowBtn href="#contact" variant="filled">
            Get In Touch
          </GlowBtn>
          <GlowBtn href="/Pavan_Kumar_Medi.pdf" variant="outline" download="Pavan_Kumar_Medi.pdf">
            Resume
          </GlowBtn>
          <GlowBtn href="/Pavan_Kumar_Cover_Letter.pdf" variant="outline" download="Pavan_Kumar_Cover_Letter.pdf">
            Cover Letter
          </GlowBtn>
        </div>

        <div
          style={{
            display: "flex",
            gap: "clamp(28px,5vw,60px)",
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s 0.75s",
          }}
        >
          {stats.map(([number, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 700, color: C.accent, lineHeight: 1.1 }}>{number}</div>
              <div style={{ color: C.muted, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlowBtn({ href, variant, children, download }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-block",
    padding: "13px 36px",
    textDecoration: "none",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: 12,
    letterSpacing: 2,
    borderRadius: 4,
    transition: "all 0.3s",
    fontWeight: 600,
    textTransform: "uppercase",
  };

  if (variant === "filled") {
    return (
      <a
        href={href}
        download={download}
        style={{
          ...base,
          background: hov ? "linear-gradient(135deg, #00e5ff, #0060ff)" : `linear-gradient(135deg, ${C.accent}, #0070ff)`,
          color: "#000",
          boxShadow: hov ? "0 8px 30px rgba(0,200,255,0.5)" : "none",
          transform: hov ? "translateY(-3px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      download={download}
      style={{
        ...base,
        border: `1.5px solid ${hov ? C.accent : "rgba(0,200,255,0.4)"}`,
        color: hov ? "#fff" : C.accent,
        background: hov ? C.accentDim : "transparent",
        boxShadow: hov ? "0 0 24px rgba(0,200,255,0.2)" : "none",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
}

function DownloadLink({ href, download, children, tone = "accent" }) {
  const [hov, setHov] = useState(false);
  const color = tone === "gold" ? C.gold : C.accent;

  return (
    <a
      href={href}
      download={download}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block",
        padding: "11px 18px",
        color: hov ? "#000" : color,
        background: hov ? color : "transparent",
        border: `1px solid ${color}`,
        borderRadius: 5,
        textDecoration: "none",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        transition: "all 0.25s",
      }}
    >
      {children}
    </a>
  );
}

function About() {
  return (
    <Section id="about">
      <Container>
        <SectionLabel label="// 01. introduction" title="About Me" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ color: C.text, fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>
              I'm a <span style={{ color: C.accent, fontWeight: 600 }}>SQL & Backend Engineer</span> based in Hyderabad with nearly 5 years of experience building resilient data platforms and backend systems that actually scale.
            </p>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>
              My work spans Oracle & PostgreSQL at enterprise scale, Spring Boot APIs, Python automation, Kubernetes deployments, and more recently - AI-powered systems using LangChain, LangGraph, and custom LLMs.
            </p>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
              I care deeply about performance, observability, and building things that don't fall apart at 3 AM. Recognized as <span style={{ color: C.gold, fontWeight: 600 }}>Best Employee of the Year (2024)</span> at iBasis India.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Hyderabad, India", "Open to Work", "English / Telugu / Hindi"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "7px 18px",
                    border: `1px solid ${C.border}`,
                    borderRadius: 24,
                    fontSize: 12,
                    color: C.muted,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <DownloadLink href="/Pavan_Kumar_Medi.pdf" download="Pavan_Kumar_Medi.pdf">
                Download Resume
              </DownloadLink>
              <DownloadLink href="/Pavan_Kumar_Cover_Letter.pdf" download="Pavan_Kumar_Cover_Letter.pdf" tone="gold">
                Download Cover Letter
              </DownloadLink>
            </div>
          </div>
          <InfoCard />
        </div>
      </Container>
    </Section>
  );
}

function InfoCard() {
  const rows = [
    ["Role", "SQL Engineer"],
    ["Company", "iBasis India Pvt Ltd"],
    ["Experience", "4 Years 9 Months"],
    ["Email", "kumar2042000@gmail.com"],
    ["Phone", "+91-9392149379"],
    ["Education", "B.Tech CSE (2021)"],
  ];

  return (
    <div
      style={{
        background: C.surface,
        borderRadius: 16,
        padding: 32,
        border: `1px solid ${C.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.accent}, ${C.gold})` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${C.accent}, #0060ff)`,
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 900,
            fontSize: 18,
            color: "#000",
          }}
        >
          MPK
        </div>
        <div>
          <p style={{ color: C.text, fontWeight: 600, margin: 0, fontFamily: "Orbitron, sans-serif", fontSize: 15 }}>Medi Pavan Kumar</p>
          <p style={{ color: C.accent, fontSize: 12, margin: 0, fontFamily: "JetBrains Mono, monospace" }}>SQL Engineer - iBasis India</p>
        </div>
      </div>
      {rows.map(([key, value]) => (
        <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ color: C.muted, fontSize: 12, fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap" }}>{key}</span>
          <span style={{ color: C.text, fontSize: 13, textAlign: "right", wordBreak: "break-all" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills" style={{ background: "linear-gradient(180deg,transparent,rgba(0,200,255,0.025),transparent)" }}>
      <Container>
        <SectionLabel label="// 02. expertise" title="Technical Skills" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {SKILLS_DATA.map((skill) => (
            <SkillCard key={skill.cat} {...skill} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function SkillCard({ cat, color, items }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.surface,
        borderRadius: 12,
        padding: 26,
        border: `1px solid ${hov ? color : C.border}`,
        transition: "all 0.35s",
        cursor: "default",
        boxShadow: hov ? `0 8px 32px ${color === C.accent ? "rgba(0,200,255,0.15)" : "rgba(245,166,35,0.12)"}` : "none",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      <h3 style={{ fontFamily: "Orbitron, sans-serif", color, fontSize: 11, letterSpacing: 3, margin: "0 0 18px", textTransform: "uppercase" }}>{cat}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((item) => (
          <span
            key={item}
            style={{
              padding: "5px 13px",
              background: color === C.accent ? "rgba(0,200,255,0.07)" : "rgba(245,166,35,0.07)",
              border: `1px solid ${color === C.accent ? "rgba(0,200,255,0.2)" : "rgba(245,166,35,0.2)"}`,
              borderRadius: 4,
              fontSize: 12,
              color: C.text,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <Container>
        <SectionLabel label="// 03. journey" title="Work Experience" />
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 12,
              bottom: 12,
              width: 2,
              background: `linear-gradient(180deg, ${C.accent}, ${C.gold}, rgba(245,166,35,0.1))`,
              borderRadius: 2,
            }}
          />
          {EXPERIENCE.map((exp, i) => (
            <ExpCard key={`${exp.company}-${exp.role}`} exp={exp} i={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ExpCard({ exp }) {
  const [hov, setHov] = useState(false);

  return (
    <div style={{ marginLeft: 60, marginBottom: 32, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: -48,
          top: 28,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: exp.color,
          boxShadow: `0 0 ${hov ? 22 : 8}px ${exp.color}`,
          transition: "box-shadow 0.3s",
          border: `2px solid ${C.bg}`,
        }}
      />
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: C.surface,
          borderRadius: 12,
          padding: "clamp(18px,2.5vw,28px)",
          border: `1px solid ${hov ? exp.color : C.border}`,
          transition: "all 0.35s",
          boxShadow: hov ? "0 6px 28px rgba(0,200,255,0.1)" : "none",
          transform: hov ? "translateX(6px)" : "translateX(0)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
          <h3 style={{ fontFamily: "Orbitron, sans-serif", color: C.text, fontSize: "clamp(14px,2vw,18px)", margin: 0, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {exp.role}
            {exp.badge && <span style={{ fontSize: 11, color: C.gold, background: "rgba(245,166,35,0.15)", padding: "3px 12px", borderRadius: 20 }}>{exp.badge}</span>}
          </h3>
          <span style={{ color: exp.color, fontFamily: "JetBrains Mono, monospace", fontSize: 12, whiteSpace: "nowrap" }}>{exp.period}</span>
        </div>
        <p style={{ color: C.muted, fontSize: 13, marginBottom: 16 }}>
          {exp.company} - {exp.location}
        </p>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {exp.highlights.map((highlight) => (
            <li key={highlight} style={{ color: C.muted, fontSize: 14, lineHeight: 1.75, marginBottom: 5 }}>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <Section id="projects" style={{ background: "linear-gradient(180deg,transparent,rgba(245,166,35,0.025),transparent)" }}>
      <Container>
        <SectionLabel label="// 04. work" title="Featured Projects" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} p={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.surface,
        borderRadius: 14,
        padding: 26,
        border: `1px solid ${hov ? p.color : C.border}`,
        transition: "all 0.35s",
        cursor: "default",
        boxShadow: hov ? `0 14px 44px ${p.color === C.accent ? "rgba(0,200,255,0.13)" : "rgba(245,166,35,0.1)"}` : "none",
        transform: hov ? "translateY(-7px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.color},transparent)`, opacity: hov ? 1 : 0, transition: "opacity 0.35s" }} />
      <IconBadge icon={p.icon} color={p.color} />
      <h3 style={{ fontFamily: "Orbitron, sans-serif", color: C.text, fontSize: 15, marginBottom: 4 }}>{p.name}</h3>
      <p style={{ color: p.color, fontSize: 11, fontFamily: "JetBrains Mono, monospace", marginBottom: 14 }}>{p.company}</p>
      <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75, marginBottom: 18, flex: 1 }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {p.tags.map((tag) => (
          <span key={tag} style={{ padding: "4px 10px", fontSize: 11, color: C.muted, background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.14)", borderRadius: 3, fontFamily: "JetBrains Mono, monospace" }}>
            {tag}
          </span>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
        <span style={{ color: C.gold, fontSize: 13, fontWeight: 600 }}>{p.metric}</span>
      </div>
    </div>
  );
}

function IconBadge({ icon, color }) {
  const labels = {
    satellite: "SAT",
    bot: "AI",
    bolt: "API",
    crane: "IAC",
    truck: "EDI",
  };

  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        border: `1px solid ${color}`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: 700,
        fontSize: 12,
        marginBottom: 14,
        background: color === C.accent ? "rgba(0,200,255,0.07)" : "rgba(245,166,35,0.07)",
      }}
    >
      {labels[icon]}
    </div>
  );
}

function Education() {
  const edu = [
    { deg: "B.Tech - Computer Science Engineering", inst: "Sri Indu College of Engineering & Technology", year: "2021" },
    { deg: "Class XII - PCM", inst: "Narayana Junior College", year: "2017" },
    { deg: "Class X - SSC", inst: "Holy Mother High School", year: "2015" },
  ];
  const certs = [
    { title: "Oracle APEX: Foundations", gold: false },
    { title: "Oracle SQL Performance Tuning", year: "2025", gold: false },
    { title: "Generative AI SQL Database Specialist", year: "2025", gold: false },
    { title: "Best Employee of the Year - iBASIS", year: "2024", gold: true },
    { title: "Event Organizer - NASA Space Apps India", year: "2018", gold: false },
    { title: "Social Media Volunteer - GES", year: "2017", gold: false },
  ];

  return (
    <Section id="education">
      <Container>
        <SectionLabel label="// 05. learning" title="Education & Certifications" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 40 }}>
          <div>
            <p style={{ fontFamily: "JetBrains Mono, monospace", color: C.accent, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 22 }}>Education</p>
            {edu.map((item) => (
              <EduRow key={item.deg} {...item} />
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "JetBrains Mono, monospace", color: C.gold, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 22 }}>Certifications & Achievements</p>
            {certs.map((cert) => (
              <CertRow key={cert.title} {...cert} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function EduRow({ deg, inst, year }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        gap: 14,
        marginBottom: 18,
        padding: "18px 20px",
        background: C.surface,
        borderRadius: 10,
        border: `1px solid ${hov ? C.accent : C.border}`,
        transition: "all 0.3s",
        transform: hov ? "translateX(5px)" : "translateX(0)",
      }}
    >
      <span style={{ color: C.accent, fontFamily: "JetBrains Mono, monospace", fontSize: 12, paddingTop: 3 }}>&gt;</span>
      <div>
        <p style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: "0 0 3px" }}>{deg}</p>
        <p style={{ color: C.muted, fontSize: 12, margin: "0 0 4px" }}>{inst}</p>
        <p style={{ color: C.accent, fontSize: 11, fontFamily: "JetBrains Mono, monospace", margin: 0 }}>{year}</p>
      </div>
    </div>
  );
}

function CertRow({ title, year, gold }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
        padding: "13px 18px",
        background: C.surface,
        borderRadius: 8,
        border: `1px solid ${gold ? (hov ? "#FFD700" : C.gold) : hov ? C.accent : C.border}`,
        boxShadow: gold ? `0 0 ${hov ? 24 : 12}px rgba(245,166,35,0.12)` : "none",
        transition: "all 0.3s",
        transform: hov ? "translateX(5px)" : "translateX(0)",
      }}
    >
      <span style={{ color: gold ? C.gold : C.accent, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>&gt;</span>
      <div>
        <p style={{ color: gold ? C.gold : C.text, fontSize: 13, margin: 0, fontWeight: gold ? 600 : 400 }}>{title}</p>
        {year && <p style={{ color: C.muted, fontSize: 11, margin: 0, fontFamily: "JetBrains Mono, monospace" }}>{year}</p>}
      </div>
    </div>
  );
}

function Contact() {
  const contacts = [
    { label: "Email", val: "kumar2042000@gmail.com", href: "mailto:kumar2042000@gmail.com" },
    { label: "Phone", val: "+91-9392149379", href: "tel:+919392149379" },
    { label: "Location", val: "Hyderabad, India", href: null },
    { label: "LinkedIn", val: "View Profile", href: "#" },
  ];

  return (
    <Section id="contact">
      <Container>
        <SectionLabel label="// 06. connect" title="Get In Touch" />
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.85, marginBottom: 44 }}>
            I'm open to new opportunities. Whether you have a project in mind, a role that fits, or just want to talk data engineering and AI - I'd love to hear from you.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginBottom: 36 }}>
            {contacts.map((contact) => (
              <ContactCard key={contact.label} {...contact} />
            ))}
          </div>
          <a
            href="mailto:kumar2042000@gmail.com"
            style={{
              display: "inline-block",
              padding: "15px 52px",
              background: `linear-gradient(135deg, ${C.accent}, #0070ff)`,
              color: "#000",
              textDecoration: "none",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              borderRadius: 6,
              transition: "all 0.3s",
              textTransform: "uppercase",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.boxShadow = "0 10px 36px rgba(0,200,255,0.5)";
              event.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.boxShadow = "none";
              event.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Say Hello
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <DownloadLink href="/Pavan_Kumar_Medi.pdf" download="Pavan_Kumar_Medi.pdf">
              Download Resume
            </DownloadLink>
            <DownloadLink href="/Pavan_Kumar_Cover_Letter.pdf" download="Pavan_Kumar_Cover_Letter.pdf" tone="gold">
              Download Cover Letter
            </DownloadLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ContactCard({ label, val, href }) {
  const [hov, setHov] = useState(false);
  const Tag = href ? "a" : "div";

  return (
    <Tag
      href={href || undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "22px 18px",
        background: C.surface,
        borderRadius: 12,
        border: `1px solid ${hov ? C.accent : C.border}`,
        textDecoration: "none",
        display: "block",
        transition: "all 0.3s",
        boxShadow: hov ? "0 6px 24px rgba(0,200,255,0.1)" : "none",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ color: C.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 5, fontFamily: "JetBrains Mono, monospace" }}>{label}</div>
      <div style={{ color: hov ? C.accent : C.text, fontSize: 13, transition: "color 0.3s", wordBreak: "break-all" }}>{val}</div>
    </Tag>
  );
}

function Footer() {
  return (
    <div style={{ textAlign: "center", padding: "32px 24px", borderTop: `1px solid ${C.border}`, position: "relative", zIndex: 1 }}>
      <p style={{ color: C.muted, fontSize: 12, fontFamily: "JetBrains Mono, monospace", margin: 0 }}>
        Designed & Built by <span style={{ color: C.accent }}>Medi Pavan Kumar</span> - 2026 - Hyderabad
      </p>
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; }
      @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      @keyframes scrollPulse { 0%,100%{opacity:0.3;transform:scaleY(0.7)} 50%{opacity:1;transform:scaleY(1)} }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #04080F; }
      ::-webkit-scrollbar-thumb { background: rgba(0,200,255,0.35); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(0,200,255,0.6); }
      ::selection { background: rgba(0,200,255,0.25); color: #fff; }
      @media (max-width: 720px) {
        nav { height: auto !important; min-height: 64px; align-items: flex-start !important; padding-top: 16px !important; padding-bottom: 12px !important; gap: 12px; }
        nav > div { max-width: 250px; row-gap: 8px !important; }
        nav a { font-size: 10px !important; }
      }
      @media (max-width: 430px) {
        nav > div { display: none !important; }
      }
    `}</style>
  );
}

export default function App() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "Outfit, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyles />
      <ParticleCanvas />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
