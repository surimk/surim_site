"use client";
import React, { useTransition, useState } from "react";
import TabButton from "./TabButton";
import { motion } from "framer-motion";

const programmingLanguages = [
  { name: "Python", url: "https://www.python.org/" },
  { name: "Golang", url: "https://golang.org/" },
  { name: "Groovy", url: "https://groovy-lang.org/" },
  { name: "Java", url: "https://www.java.com/" },
  { name: "JavaScript", url: "https://www.javascript.com/" },
  { name: "Bash", url: "https://www.gnu.org/software/bash/" },
  { name: "R", url: "https://www.r-project.org/" },
  { name: "SQL", url: "https://www.sql.org/" },
];

const frameworks = [
  { name: "React", url: "https://reactjs.org/" },
  { name: "Next.js", url: "https://nextjs.org/" },
  { name: "Flask", url: "https://flask.palletsprojects.com/" },
  { name: "Django", url: "https://www.djangoproject.com/" },
];

const bioinformaticsTools = [
  { name: "Nextflow", url: "https://www.nextflow.io/" },
  { name: "Seqera Platform", url: "https://www.seqera.io/" },
  { name: "Schrodinger Maestro", url: "https://www.schrodinger.com/maestro" },
  { name: "Antismash", url: "https://antismash.secondarymetabolites.org/" },
  { name: "Conda", url: "https://conda.io/" },
];

const cloudPlatforms = [
  { name: "Amazon Web Services", url: "https://aws.amazon.com/" },
  { name: "Google Cloud Platform", url: "https://cloud.google.com/" },
];

const ciTools = [
  { name: "GitHub Actions", url: "https://github.com/features/actions" },
  { name: "GitLab CI", url: "https://docs.gitlab.com/ee/ci/" },
  { name: "Jenkins", url: "https://www.jenkins.io/" },
];

const infrastructureAsCodeTools = [
  { name: "Terraform", url: "https://www.terraform.io/" },
  { name: "Packer", url: "https://www.packer.io/" },
];

const containerizationTools = [
  { name: "Docker", url: "https://www.docker.com/" },
  { name: "Kubernetes", url: "https://kubernetes.io/" },
];

function renderToolList(tools: { name: string; url: string }[]) {
  return (
    <div>
      {tools.map((item, index) => (
        <a
          key={index}
          href={item.url}
          className="hover:text-purple-500"
          target="_blank"
        >
          {item.name} &nbsp;
        </a>
      ))}
    </div>
  );
}

const TAB_DATA = [
  {
    title: "Software Development",
    id: "software",
    content: (
      <ul className="pl-2">
        <p className="font-bold">Programming & Scripting</p>
        {renderToolList(programmingLanguages)}
        <br></br>
        <p className="font-bold">Frameworks</p>
        {renderToolList(frameworks)}
        <br></br>
        <p className="font-bold">Bioinformatics</p>
        {renderToolList(bioinformaticsTools)}
      </ul>
    ),
  },
  {
    title: "Cloud & DevOps",
    id: "devops",
    content: (
      <ul className="pl-2">
        <p className="font-bold">Cloud Platforms</p>
        {renderToolList(cloudPlatforms)}
        <br></br>
        <p className="font-bold">CI/CD</p>
        {renderToolList(ciTools)}
        <br></br>
        <p className="font-bold">Infrastructure-As-Code</p>
        {renderToolList(infrastructureAsCodeTools)}
        <br></br>
        <p className="font-bold">Containerization & Orchestration</p>
        {renderToolList(containerizationTools)}
      </ul>
    ),
  },
  {
    title: "Bioinformatics",
    id: "bioinformatics",
    content: (
      <ul className="pl-2">
        <li>Nextflow</li>
        <li>Seqera Platform</li>
        <li>Schrodinger Maestro</li>
        <li>Antismash</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul>
        <li>BSc. in Bioinformatics</li>
        <li className="font-bold">University of Pittsburgh</li>
        <li className="font-bold">2018</li>
      </ul>
    ),
  },
  {
    title: "Publications",
    id: "publications",
    content: (
      <ul className="pl-2">
        <li>
          <a
            className="font-bold text-white hover:text-gray-400"
            href="https://doi.org/10.1021/acs.jcim.3c00209"
            target="_blank"
          >
            BMaps: A Web Application for Fragment-Based Drug Design and Compound
            Binding Evaluation
          </a>
        </li>
        <li>
          Journal of Chemical Information and Modeling 2023 63 (14), 4229-4236
        </li>
        <li>DOI: 10.1021/acs.jcim.3c00209</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("software");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white">
      <div className="md:grid md:grid-cols-1 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:py-16">
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text=base lg:text-lg">
              With a strong foundation in bioinformatics and cloud
              infrastructure management, I excel in designing scalable cloud
              solutions, developing advanced bioinformatic pipelines, building
              efficient CI/CD workflows, and overseeing the management of
              compute clusters. My work is centered on driving automation and
              enhancing efficiency in software engineering.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.25 }}
          >
            <div className="flex flex-row justify-start mt-8">
              <TabButton
                selectTab={() => handleTabChange("software")}
                active={tab === "software"}
              >
                {" "}
                Software Development{" "}
              </TabButton>
              <TabButton
                selectTab={() => handleTabChange("devops")}
                active={tab === "devops"}
              >
                {" "}
                Cloud & DevOps{" "}
              </TabButton>
              <TabButton
                selectTab={() => handleTabChange("education")}
                active={tab === "education"}
              >
                {" "}
                Education{" "}
              </TabButton>
              <TabButton
                selectTab={() => handleTabChange("publications")}
                active={tab === "publications"}
              >
                {" "}
                Publications{" "}
              </TabButton>
            </div>
            <div className="mt-8">
              {TAB_DATA.find((t) => t.id === tab)?.content}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
