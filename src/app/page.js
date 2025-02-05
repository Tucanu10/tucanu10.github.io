// src/App.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faProjectDiagram,
  faBriefcase,
  faCogs,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const render = () => {
      const time = Date.now() / 1000;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const amplitudeX = canvas.width * 0.2;
      const amplitudeY = canvas.height * 0.2;

      const x0 = centerX + amplitudeX * Math.sin(time * 0.5);
      const y0 = centerY + amplitudeY * Math.cos(time * 0.5);
      const x1 = centerX + amplitudeX * Math.cos(time * 0.3);
      const y1 = centerY + amplitudeY * Math.sin(time * 0.3);

      const r0 = 0;
      const r1 = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2;

      const gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
      gradient.addColorStop(0, "#680d25");
      gradient.addColorStop(0.5, "#111825");
      gradient.addColorStop(1, "#000000");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");

      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setIsVisible(heroRect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-[#680d25]/80 rounded-xl z-50 px-6 py-3 transition-all duration-500 backdrop-blur-sm shadow-lg ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Tucanu</div>
        <div className="text-white flex space-x-4">
          <a href="#home" className="flex items-center hover:underline">
            <FontAwesomeIcon icon={faHome} className="mr-1" /> Home
          </a>
          <a href="#projects" className="flex items-center hover:underline">
            <FontAwesomeIcon icon={faProjectDiagram} className="mr-1" /> Projects
          </a>
          <a href="#experience" className="flex items-center hover:underline">
            <FontAwesomeIcon icon={faBriefcase} className="mr-1" /> Experience
          </a>
          <a href="#skills" className="flex items-center hover:underline">
            <FontAwesomeIcon icon={faCogs} className="mr-1" /> Skills
          </a>
          <a href="#contact" className="flex items-center hover:underline">
            <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function calculateAge(birthDate) {
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const m = now.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function HeroAbout() {
  const birthDate = new Date(2006, 10, 30);
  const age = calculateAge(birthDate);

  return (
    <section id="hero" className="flex flex-col items-center justify-center h-screen space-y-10 px-4">
      <div className="bg-[#680d25]/30 backdrop-blur-md border border-[#680d25]/40 rounded-xl p-8 max-w-2xl text-center shadow-2xl">
        <h1 className="text-5xl font-bold text-white mb-4">Hi, I&apos;m Tucanu</h1>
        <p className="text-xl text-gray-200 mb-6">
          A passionate programmer and creative thinker. I build modern, responsive, and engaging digital experiences.
        </p>
      </div>
      <div className="bg-[#680d25]/30 backdrop-blur-md border border-[#680d25]/40 rounded-xl p-8 flex flex-col md:flex-row items-center max-w-3xl shadow-2xl">
        <img
          src="/images/index/icon.png"
          alt="Tucanu"
          className="w-40 h-40 rounded-full mb-6 md:mb-0 md:mr-8 shadow-lg"
        />
        <div className="text-white text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg">
            I am {age} years old with a genuine passion for programming and technology. I enjoy turning ideas into reality,
            whether through web development, game design, or innovative side projects.
          </p>
        </div>
      </div>
    </section>
  );
}

function CarouselItem({ project }) {
  const backgroundStyle =
    project.image && project.image !== ""
      ? { backgroundImage: `url(${project.image})` }
      : { backgroundColor: "#680d25/30" };

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-full flex-shrink-0 flex justify-center p-4 group"
    >
      <div
        className="w-[90%] relative h-96 bg-cover bg-center rounded-xl overflow-hidden shadow-xl cursor-pointer"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-[#680d25]/30 backdrop-blur-md flex flex-col justify-end p-4">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-200">{project.description}</p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-black/70 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md">
            View Project
          </span>
        </div>
      </div>
    </a>
  );
}

function ProjectsCarousel({ projects }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {projects.map((project, index) => (
            <CarouselItem key={index} project={project} />
          ))}
        </div>
      </div>
      <div className="mt-4 mx-auto w-[90%]">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-full p-2">
          <div className="flex gap-1 h-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(-1)}
                className={`relative flex-1 transition-all ease-in-out duration-300 rounded-full ${
                  index === currentSlide
                    ? "bg-zinc-300"
                    : hoveredSegment === index
                    ? "bg-[#a82145]"
                    : "bg-zinc-300/20"
                }`}
                style={{ width: `${100 / projects.length}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio built with React and TailwindCSS.",
      image: "",
      link: "#home",
    },
    {
      title: "ROBOSMART #19110",
      description: "Landing page for robotics team.",
      image: "",
      link: "https://robosmart-cnim.vercel.app/",
    },
    {
      title: "Contribution to Robot Code",
      description: "Autonomous and teleop functions for robot code.",
      image: "",
      link: "https://github.com/coco21coco/cod-oficial",
    },
    {
      title: "Dawn of Ragnarok",
      description: "An immersive project exploring myth and adventure.",
      image: "",
      link: "/dawn-of-ragnarok.html",
    },
    {
      title: "GoonCraft",
      description: "Basic operating system for ComputerCraft.",
      image: "",
      link: "https://github.com/Tucanu10/GoonOS",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Projects</h2>
        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Experience</h2>
        <div className="flex flex-col gap-8 items-center">
          <div className="bg-[#680d25]/30 backdrop-blur-md border border-[#680d25]/40 rounded-xl p-8 w-full text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-2 text-white">Freelance Web Developer</h3>
            <p className="text-gray-200">
              Developed custom web applications for local businesses and personal projects with a focus on responsive design and user experience.
            </p>
          </div>
          <div className="bg-[#680d25]/30 backdrop-blur-md border border-[#680d25]/40 rounded-xl p-8 w-full text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-2 text-white">Open Source Contributor</h3>
            <p className="text-gray-200">
              Contributed to open source projects, honing collaborative development skills and learning modern best practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Skills</h2>
        <div className="flex justify-center">
          <div className="bg-[#680d25]/30 backdrop-blur-md border border-[#680d25]/40 rounded-xl p-8 w-full text-center shadow-xl">
            <p className="text-xl text-white mb-4">Technical Skills:</p>
            <p className="text-gray-200 text-lg">
              • Programming: C++, C#, Java, JavaScript <br />
              • Web Development: React, Node.js, TailwindCSS <br />
              • Tools: Git, VS Code, Canvas API
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer className="relative py-12 mt-10 flex justify-center">
      <div className="bg-[#680d25]/30 backdrop-blur-md border border-[#680d25]/40 rounded-xl p-8 max-w-lg w-full text-center shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-200 mb-4">
          Let’s connect! Feel free to reach out for opportunities or collaborations.
        </p>
        
        <div className="text-gray-200 space-y-2">
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-300" />
            Email:{" "}
            <a href="mailto:your.email@example.com" className="hover:underline text-blue-300">
              your.email@example.com
            </a>
          </p>
          <p>
            <FontAwesomeIcon icon={faDiscord} className="mr-2 text-blue-300" />
            Discord: Tucanu#8185
          </p>
          <p>
            <FontAwesomeIcon icon={faTwitter} className="mr-2 text-blue-300" />
            <a href="https://twitter.com/_Tucanu" className="hover:underline text-blue-300">
              Twitter
            </a>
          </p>
          <p>
            <FontAwesomeIcon icon={faGithub} className="mr-2 text-blue-300" />
            <a href="https://github.com/Tucanu10" className="hover:underline text-blue-300">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <HeroAbout />
      <Projects />
      <Experience />
      <Skills />
      <ContactFooter />
    </>
  );
}
