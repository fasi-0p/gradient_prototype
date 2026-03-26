import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/content';
import PageTransition from '../components/ui/PageTransition';

const achievements = [
  { icon: Calendar, value: "43+", label: "Events Conducted" },
  { icon: Users, value: "3300+", label: "Participants" },
  { icon: Award, value: "200+", label: "Members" },
  { icon: MapPin, value: "5.3L+", label: "Sponsorship"}
];

const milestones = [
  {
    year: 2022,
    title: "The Genesis",
    description: "Gradient was established with a bold vision: to cultivate a thriving, inclusive ecosystem for AI and machine learning enthusiasts.",
    image: "https://gradient-content-server.vercel.app/content/inaugration.png"
  },
  {
    year: 2023,
    title: "Laying the Foundation",
    description: "The inaugural core team took the helm, establishing the core values, community structures, and early initiatives that set the stage for our future.",
    image: "https://gradient-content-server.vercel.app/content/founding%20core.jpg"
  },
  {
    year: 2024,
    title: "The Expansion Era",
    description: "A year of unprecedented growth, featuring our flagship hackathons, specialized workshops, and a rapidly expanding community of over 200 active members.",
    image: "https://gradient-content-server.vercel.app/content/core24.jpg"
  },
  {
    year: 2025,
    title: "Pinnacle of Innovation",
    description: "We reached new heights through the launch of Gradient Week, strategic Utsav collaborations, and hosting groundbreaking technical symposiums.",
    image: "https://gradient-content-server.vercel.app/content/core25.jpeg"
  },
  {
    year: 2026,
    title: "Redefining the Future",
    description: "Pushing the boundaries of student-led AI development, we are currently pioneering interdisciplinary projects and focusing on real-world technological impact.",
    image: "https://gradient-content-server.vercel.app/content/core26/Group.JPG"
  }
];

const AboutPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // CSS for the gradient text based on your palette
  const gradientTextStyle = {
    background: 'linear-gradient(to right, #8B5CFB, #3B82F6, #A855F7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <PageTransition variant="slideUp">
      <main
        data-testid="about-page"
        className="pt-20 md:pt-0 bg-[#0F172A] text-white"
      >
        {/* Hero */}
        <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12 lg:px-24 py-24">
          {/* Background Gradient using #8B5CFB (Primary) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CFB]/10 via-transparent to-transparent" />
          
          <div className="max-w-7xl mx-auto relative z-10 w-full">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Link
                to="/"
                data-testid="back-home"
                className="inline-flex items-center gap-2 text-white/40 hover:text-[#3B82F6] transition-colors font-mono text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-[#8B5CFB]"
                >
                  About Gradient
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-heading font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9] mt-4 mb-6"
                >
                  <span style={gradientTextStyle}>Who</span> We Are
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white/60 text-lg leading-relaxed mb-6"
                >
                  Gradient is a vibrant student community at B.M.S. College of Engineering 
                  that embraces the dynamic field of AI and Machine Learning. We focus on 
                  fostering innovation, collaboration, and knowledge sharing among aspiring 
                  machine learning enthusiasts.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white/60 text-lg leading-relaxed"
                >
                  Our mission is to create a platform where passion for technology thrives, 
                  and groundbreaking ideas flourish. Founded in {siteConfig.founded}, we've 
                  grown into one of the most active tech communities in the college.
                </motion.p>
              </div>

              {/* Image Container with Tertiary Shadow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#A855F7]/10"
              >
                <img
                  src="https://gradient-content-server.vercel.app/content/core26/Group.JPG"
                  alt="Gradient Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                  data-testid={`about-stat-${index}`}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#3B82F6]" />
                  <div 
                    className="font-heading font-bold text-4xl mb-2"
                    style={gradientTextStyle}
                  >
                    {stat.value}
                  </div>
                  <p className="text-white/50 text-sm uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Roots */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A855F7]">
                Our Journey
              </span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl tracking-tight mt-4">
                From <span style={gradientTextStyle}>Roots</span> to{' '}
                <span style={gradientTextStyle}>Stars</span>
              </h2>
            </motion.div>

            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                  data-testid={`milestone-${milestone.year}`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div 
                      className="font-heading font-black text-6xl md:text-8xl opacity-30 mb-4"
                      style={gradientTextStyle}
                    >
                      {milestone.year}
                    </div>
                    <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-white">
                      {milestone.title}
                    </h3>
                    <p className="text-white/60 text-lg leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                  <div className={`relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default AboutPage;