import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const teamMembers = [
  {
    id: 1,
    name: "Deepak Chandrasekhar",
    role: "Team Lead",
    description:
      "Computer Science and Buisness Systems | PSG Institute of Technology and Applied Research",
    image: "/images/d.jpg",
    accent: "purple-50",
  },
  {
    id: 2,
    name: "Kovarthan Manikandan",
    role: "Team Member",
    description:
      "Mechanical Engineering | PSG Institute of Technology and Applied Research",
    image: "/images/k.jpg",
    accent: "bg-green-50",
  },
  {
    id: 3,
    name: "Abhimanya S",
    role: "",
    description:
      "Computer Science and Buisness Systems | PSG Institute of Technology and Applied Research",
    image: "/images/m.jpg",

    accent: "bg-blue-50",
  },
  {
    id: 4,
    name: "Muthu Harish T",
    role: "Team Member",
    description:
      "Computer Science and Buisness Systems | PSG Institute of Technology and Applied Research",
    image: "/images/ab.jpg",
    accent: "bg-red-50",
  },
  {
    id: 5,
    name: "Ajay C",
    role: "Team Member",
    description:
      "Computer Science Engineering | PSG Institute of Technology and Applied Research",
    image: "/images/a.jpg",
    accent: "bg-yellow-50",
  },
  {
    id: 6,
    name: "Shyam Gokul S",
    role: "Team Member ",
    description:
      "Computer Science Engineering | PSG Institute of Technology and Applied Research",
    image: "/images/ab.jpg",
    accent: "bg-pink-50",
  },
];

const TeamMemberSection = ({ member, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale, x }}
      className={`flex items-center min-h-screen w-full ${member.accent} p-12`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="order-2 md:order-1"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="order-1 md:order-2"
        >
          <h2 className="text-5xl font-bold mb-4 text-gray-900">
            {member.name}
          </h2>
          <h3 className="text-3xl mb-6 text-gray-600 font-semibold">
            {member.role}
          </h3>
          <p className="text-xl text-gray-800 leading-relaxed">
            {member.description}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

const TeamPage = () => {
  return (
    <div>
      {teamMembers.map((member, index) => (
        <TeamMemberSection key={member.id} member={member} index={index} />
      ))}
    </div>
  );
};

export default TeamPage;
