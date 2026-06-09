import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AsciiFooter } from "@/components/ascii-footer";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import macHelperImg from "@/assets/mac-helper.jpg";

const AvatarBust = lazy(() =>
  import("@/components/avatar-bust").then((m) => ({ default: m.AvatarBust })),
);

const CONTACT_EMAIL = "jaink9576@gmail.com";
const CONTACT_PHONE = "+91 9301708745";
// Set to a static resume file in the `src/assets` folder. Place `khushi_resume.pdf` there.
// If you prefer a mailto fallback, keep a mailto link elsewhere or remove the download attributes.
const RESUME_URL = "/assets/khushi_resume.pdf";
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/khushijain16",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/khushijain",
    icon: Linkedin,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khushi Jain — B.Tech AI Portfolio" },
      {
        name: "description",
        content:
          "Khushi Jain — B.Tech AI student with C/C++, frontend development, Python automation, and portfolio experience.",
      },
      { property: "og:title", content: "Khushi Jain — B.Tech AI Portfolio" },
      {
        property: "og:description",
        content: "Resume-driven portfolio for a final-year AI student with internship experience and project work.",
      },
    ],
  }),
  component: Index,
});

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-xl tracking-wider text-foreground">
          Khushi<span className="text-muted-foreground">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
          <li><a href="#work" className="hover:text-foreground transition-colors">Work</a></li>
          <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
          <li><a href="#skills" className="hover:text-foreground transition-colors">Skills</a></li>
          <li><a href="#resume" className="hover:text-foreground transition-colors">Resume</a></li>
          <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
        </ul>
        <a
          href={RESUME_URL}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-[0.2em] border border-foreground/60 text-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Get resume
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center min-h-[80vh]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            B.Tech · Artificial Intelligence · Final Year
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6">
            I'm <em className="not-italic text-gradient-gold">Khushi Jain</em>
            <br />
            Full Stack Developer
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
            Building intelligent, user-focused solutions with modern tech.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="text-sm uppercase tracking-[0.2em] border border-foreground text-background bg-foreground px-6 py-3 hover:bg-transparent hover:text-foreground transition-colors"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="text-sm uppercase tracking-[0.2em] border border-border text-foreground/80 px-6 py-3 hover:border-foreground hover:text-foreground transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
        <div className="relative h-[420px] md:h-[560px] rounded-sm overflow-hidden border border-border/40">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-card">
                <div className="w-24 h-px bg-foreground animate-pulse" />
              </div>
            }
          >
            <AvatarBust />
          </Suspense>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60 font-mono">
            <span>humanoid_v1</span>
            <span>cursor-reactive · live</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">About</h2>
        <div className="md:col-span-2 space-y-6">
          <p className="text-2xl md:text-3xl font-display leading-snug text-foreground">
            Motivated B.Tech Artificial Intelligence student with internship experience in C/C++ and frontend development.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            I am passionate about turning programming, problem-solving, and Python skills into intelligent, efficient solutions.
            My work combines clean UI, strong algorithms, and hands-on systems knowledge to deliver polished digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups: { title: string; items: string[] }[] = [
    { title: "Technical Skills", items: ["Python", "C++", "HTML", "CSS", "JavaScript"] },
    {
      title: "Frameworks & Tools",
      items: ["Android", "tkinter", "sqlite3", "pandas", "matplotlib", "VSCode"],
    },
    {
      title: "Core Concepts",
      items: ["OOP", "File Handling", "Structures & Classes", "Functions", "Problem Solving"],
    },
  ];
  return (
    <section id="skills" className="py-24 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Skills</h2>
        <div className="md:col-span-2 grid sm:grid-cols-3 gap-10">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="font-display text-xl mb-4 text-foreground">{g.title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {g.items.map((s) => (
                  <li key={s} className="text-sm">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section id="resume" className="py-24 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Education</p>
            <div className="mt-6 rounded-3xl border border-border/40 bg-card p-8">
              <h3 className="font-display text-2xl text-foreground">B.Tech in Computer Science</h3>
              <p className="text-muted-foreground mt-2">Specialising in Artificial Intelligence</p>
              <p className="mt-4 text-sm text-muted-foreground">Mahaveer University, 2023–2027</p>
              <p className="mt-3 text-sm text-muted-foreground">Higher Secondary School (12th), Central Academy Higher Secondary School, Joura</p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Internship</p>
            <div className="mt-6 rounded-3xl border border-border/40 bg-card p-8">
              <h3 className="font-display text-2xl text-foreground">Code Alpha Intern</h3>
              <p className="mt-2 text-sm text-muted-foreground">20 June to 20 July</p>
              <ul className="mt-5 space-y-3 text-muted-foreground text-sm">
                <li>Built web interfaces using HTML, CSS, and JavaScript.</li>
                <li>Worked on real-world projects with tight delivery cycles.</li>
                <li>Gained strong hands-on experience in frontend development.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Certifications</p>
            <ul className="mt-6 space-y-3 rounded-3xl border border-border/40 bg-card p-8 text-muted-foreground text-sm">
              <li>NPTEL Certificate IBM - Big Data Beginner</li>
              <li>InternShala Certificate (C/C++)</li>
              <li>CodeAlpha Certificate (Frontend Development)</li>
              <li>ISRO Certificate</li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Activities</p>
            <ul className="mt-6 space-y-3 rounded-3xl border border-border/40 bg-card p-8 text-muted-foreground text-sm">
              <li>IEEE Quiz Competition — secured 4th position</li>
              <li>Pariyushan SMART Conference — participant</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="py-24 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Projects</h2>
          <p className="md:col-span-2 text-muted-foreground">
            Work from my resume: a portfolio website, a Python automation assistant, and a C/C++ application.
          </p>
        </div>

        <article className="grid md:grid-cols-5 gap-10 items-center group">
          <div className="md:col-span-3 relative overflow-hidden border border-border/40 bg-card">
            <img
              src={macHelperImg}
              alt="Mac the Helper app — interface for scheduling birthday and special-day messages"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full h-auto grayscale transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
              Project · Python · Automation
            </p>
            <h3 className="font-display text-4xl md:text-5xl mb-4">MAC — The Helper</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A desktop assistant built with Python, PyWhatKit, and speech recognition.
              It automates messaging, answers voice queries, and connects to WhatsApp workflows.
            </p>
            <ul className="space-y-2 text-sm text-foreground/80 mb-8">
              <li className="flex gap-3"><span className="text-foreground">·</span> Desktop automation with voice inputs</li>
              <li className="flex gap-3"><span className="text-foreground">·</span> WhatsApp message automation and query handling</li>
              <li className="flex gap-3"><span className="text-foreground">·</span> Rapid prototype built using Python and speech recognition</li>
            </ul>
            <a
              href="#contact"
              className="inline-block text-sm uppercase tracking-[0.2em] border-b border-foreground text-foreground pb-1 hover:opacity-70 transition-opacity"
            >
              Reach out →
            </a>
          </div>
        </article>

        <div className="mt-20 grid lg:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-border/40 bg-card p-8">
            <h3 className="font-display text-2xl text-foreground mb-4">Portfolio Website</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Designed and developed a responsive personal portfolio using HTML, CSS, and JavaScript.
              Optimized navigation and layout for a polished user experience.
            </p>
          </div>
          <div className="rounded-3xl border border-border/40 bg-card p-8">
            <h3 className="font-display text-2xl text-foreground mb-4">Cricket Game App</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built a cricket game application using C and C++, exploring object-oriented programming and game logic design.
            </p>
          </div>
          <div className="rounded-3xl border border-border/40 bg-card p-8">
            <h3 className="font-display text-2xl text-foreground mb-4">Frontend & UI</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delivered web interface features during internship with HTML, CSS, and JavaScript, and worked on real client-facing experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">Contact</p>
        <h2 className="font-display text-5xl md:text-7xl mb-10 leading-tight">
          Let's <em className="not-italic text-gradient-gold">build</em> something.
        </h2>
        <div className="flex flex-col items-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 font-display text-2xl md:text-3xl text-foreground border-b border-foreground/50 pb-2 hover:opacity-70 transition-opacity"
          >
            <Mail className="h-5 w-5" />
            {CONTACT_EMAIL}
          </a>
          <p className="text-muted-foreground">{CONTACT_PHONE}</p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {social.name}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <ResumeSection />
      <Work />
      <Contact />
      <AsciiFooter />
      <footer className="bg-background/90 py-8 border-t border-border/30" aria-label="Page footer">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-display tracking-[0.28em] uppercase text-foreground text-[0.7rem]">Khushi Jain</p>
            <p className="max-w-md leading-relaxed">
              Final-year B.Tech AI student building full-stack applications, machine learning systems, and polished user experiences.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/50 hover:border-foreground/70 hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {social.name}
                </a>
              );
            })}
            <a
              href={RESUME_URL}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/50 hover:border-foreground/70 hover:text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              Résumé
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Khushi Jain — Built for AI, product, and polished interactions.
        </div>
      </footer>
    </main>
  );
}
