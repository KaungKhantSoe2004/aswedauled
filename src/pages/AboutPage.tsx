"use client";

import { useState } from "react";
import CTASection from "./Cta";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("history");

  const leadershipTeam = [
    {
      name: "Dr. Sarah Johnson",
      position: "Principal & Director",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description:
        "20+ years in educational leadership, PhD in Educational Management",
    },
    {
      name: "Prof. Michael Chen",
      position: "Academic Dean",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description:
        "Former university professor specializing in curriculum development",
    },
    {
      name: "Ms. Elena Rodriguez",
      position: "Head of Student Affairs",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description:
        "15 years experience in student counseling and holistic development",
    },
  ];

  const milestones = [
    {
      year: "2005",
      event: "Aswedaul Ed Founded",
      description: "Started with 50 students and 8 teachers",
    },
    {
      year: "2010",
      event: "First University Placements",
      description: "20 students admitted to top universities",
    },
    {
      year: "2015",
      event: "New Campus Inauguration",
      description: "State-of-the-art facilities opened",
    },
    {
      year: "2020",
      event: "Digital Learning Initiative",
      description: "Implemented comprehensive online education",
    },
    {
      year: "2023",
      event: "International Recognition",
      description: "Awarded Best Educational Institution",
    },
  ];

  const facilities = [
    {
      title: "Modern Classrooms",
      description:
        "Smart classrooms with interactive technology and comfortable learning environments",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Science Laboratories",
      description:
        "Fully equipped labs for physics, chemistry, and biology with latest equipment",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Sports Complex",
      description:
        "Olympic-sized swimming pool, basketball courts, and athletic tracks",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Digital Library",
      description:
        "20,000+ books with online resources and research facilities",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="about-page">
      {/* ===== HERO BANNER ===== */}
      <section
        className="section about-hero"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80')",
          height: "60vh",
          minHeight: "500px",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          }}
        ></div>

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="hero-text">
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "900",
                color: "#fff",
                marginBottom: "1rem",
                fontFamily: "BeBas Neue, sans-serif",
                letterSpacing: "2px",
              }}
            >
              ABOUT ASWEDAUL ED
            </h1>
            <p
              style={{
                fontSize: "1.4rem",
                color: "#fff",
                maxWidth: "600px",
                lineHeight: "1.6",
              }}
            >
              Two decades of excellence in shaping future leaders through
              innovative education
            </p>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY SECTION ===== */}
      <section
        className="section"
        style={{
          backgroundColor: "#d4d4d4",
          padding: "6rem 0",
          borderBottom: "6px solid #000",
        }}
      >
        <div className="container">
          <div
            className="story-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  marginBottom: "1.5rem",
                  fontFamily: "BeBas Neue, sans-serif",
                  letterSpacing: "1px",
                }}
              >
                OUR STORY
              </h2>
              <div
                style={{
                  width: "80px",
                  height: "6px",
                  backgroundColor: "#3FA7A3",
                  marginBottom: "2rem",
                }}
              ></div>

              <div
                className="tab-buttons"
                style={{
                  display: "flex",
                  gap: "2rem",
                  marginBottom: "2rem",
                }}
              >
                <button
                  onClick={() => setActiveTab("history")}
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor:
                      activeTab === "history" ? "#3FA7A3" : "transparent",
                    color: activeTab === "history" ? "#fff" : "#000",
                    border: "2px solid #3FA7A3",
                    fontSize: "1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontFamily: "BeBas Neue, sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  HISTORY
                </button>
                <button
                  onClick={() => setActiveTab("mission")}
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor:
                      activeTab === "mission" ? "#3FA7A3" : "transparent",
                    color: activeTab === "mission" ? "#fff" : "#000",
                    border: "2px solid #3FA7A3",
                    fontSize: "1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontFamily: "BeBas Neue, sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  MISSION & VISION
                </button>
              </div>

              {activeTab === "history" && (
                <div>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.8",
                      color: "#333",
                      marginBottom: "2rem",
                    }}
                  >
                    Founded in 2005, Aswedaul Ed began as a small educational
                    initiative with a big vision. What started with just 50
                    students has grown into a premier institution serving over
                    2,000 students across Grades 1-12.
                  </p>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.8",
                      color: "#333",
                    }}
                  >
                    Our journey has been marked by continuous innovation in
                    teaching methodologies, infrastructure development, and a
                    relentless pursuit of academic excellence. Today, we stand
                    as a beacon of quality education in the region.
                  </p>
                </div>
              )}

              {activeTab === "mission" && (
                <div>
                  <div style={{ marginBottom: "2rem" }}>
                    <h3
                      style={{
                        color: "#3FA7A3",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        fontFamily: "BeBas Neue, sans-serif",
                      }}
                    >
                      OUR MISSION
                    </h3>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: "1.8",
                        color: "#333",
                      }}
                    >
                      To provide exceptional education that develops
                      intellectually rigorous, emotionally intelligent, and
                      morally grounded individuals who contribute positively to
                      society through innovation and excellence.
                    </p>
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "#3FA7A3",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        fontFamily: "BeBas Neue, sans-serif",
                      }}
                    >
                      OUR VISION
                    </h3>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: "1.8",
                        color: "#333",
                      }}
                    >
                      To be the leading educational institution recognized for
                      academic excellence, innovation, and producing leaders who
                      transform their communities and the world.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div
              className="story-images"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="School History"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="School Mission"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="School Vision"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  gridColumn: "span 2",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP TEAM ===== */}
      <section
        className="section"
        style={{
          backgroundColor: "#1a1a1a",
          padding: "6rem 0",
          borderBottom: "6px solid #3FA7A3",
          color: "#fff",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              marginBottom: "1rem",
              textAlign: "center",
              fontFamily: "BeBas Neue, sans-serif",
              letterSpacing: "1px",
            }}
          >
            LEADERSHIP TEAM
          </h2>
          <div
            style={{
              width: "80px",
              height: "6px",
              backgroundColor: "#3FA7A3",
              margin: "0 auto 4rem auto",
            }}
          ></div>

          <div
            className="leadership-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {leadershipTeam.map((member, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#2d2d2d",
                  border: "3px solid #3FA7A3",
                  borderRadius: "12px",
                  overflow: "hidden",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    height: "250px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      marginBottom: "0.5rem",
                      color: "#3FA7A3",
                      fontFamily: "BeBas Neue, sans-serif",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      color: "#fff",
                    }}
                  >
                    {member.position}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#ddd",
                      lineHeight: "1.6",
                    }}
                  >
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MILESTONES TIMELINE ===== */}
      <section
        className="section"
        style={{
          backgroundColor: "#d4d4d4",
          padding: "6rem 0",
          borderBottom: "6px solid #000",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              marginBottom: "1rem",
              textAlign: "center",
              fontFamily: "BeBas Neue, sans-serif",
              letterSpacing: "2px",
              color: "#000",
            }}
          >
            OUR JOURNEY
          </h2>
          <div
            style={{
              width: "80px",
              height: "6px",
              backgroundColor: "#3FA7A3",
              margin: "0 auto 4rem auto",
            }}
          ></div>

          <div
            className="milestones-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Year Circle */}
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#3FA7A3",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    border: "4px solid #000",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "900",
                      color: "#fff",
                      fontFamily: "Orbitron, sans-serif",
                    }}
                  >
                    {milestone.year}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "12px",
                    border: "3px solid #000",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    minHeight: "220px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                      fontFamily: "BeBas Neue, sans-serif",
                      color: "#000",
                      lineHeight: "1.3",
                    }}
                  >
                    {milestone.event}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      color: "#333",
                      margin: 0,
                    }}
                  >
                    {milestone.description}
                  </p>
                </div>

                {/* Connecting Line (except last item) */}
                {idx < milestones.length - 1 && (
                  <div
                    className="timeline-connector"
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "calc(100% - 25px)",
                      width: "calc(100% - 50px)",
                      height: "4px",
                      backgroundColor: "#3FA7A3",
                      zIndex: 1,
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FACILITIES SHOWCASE ===== */}
      <section
        className="section"
        style={{
          backgroundColor: "#1a1a1a",
          padding: "6rem 0",
          borderBottom: "6px solid #3FA7A3",
          color: "#fff",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              marginBottom: "1rem",
              textAlign: "center",
              fontFamily: "BeBas Neue, sans-serif",
              letterSpacing: "1px",
            }}
          >
            WORLD-CLASS FACILITIES
          </h2>
          <div
            style={{
              width: "80px",
              height: "6px",
              backgroundColor: "#3FA7A3",
              margin: "0 auto 4rem auto",
            }}
          ></div>

          <div
            className="facilities-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            {facilities.map((facility, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#2d2d2d",
                  border: "3px solid #3FA7A3",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div
                  style={{
                    height: "250px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={facility.image}
                    alt={facility.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                      color: "#3FA7A3",
                      fontFamily: "BeBas Neue, sans-serif",
                    }}
                  >
                    {facility.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#ddd",
                      lineHeight: "1.6",
                    }}
                  >
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACADEMIC EXCELLENCE ===== */}
      <section
        className="section"
        style={{
          backgroundColor: "#d4d4d4",
          padding: "6rem 0",
          borderBottom: "6px solid #000",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              marginBottom: "1rem",
              textAlign: "center",
              fontFamily: "BeBas Neue, sans-serif",
              letterSpacing: "1px",
              color: "#000",
            }}
          >
            ACADEMIC EXCELLENCE
          </h2>
          <div
            style={{
              width: "80px",
              height: "6px",
              backgroundColor: "#3FA7A3",
              margin: "0 auto 4rem auto",
            }}
          ></div>

          {/* Main Stats Grid */}
          <div
            className="main-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            {[
              {
                number: "98.7%",
                label: "University Pass Rate",
                desc: "Grade 12 Results 2024",
              },
              {
                number: "2,000+",
                label: "Students",
                desc: "Currently Enrolled",
              },
              {
                number: "150+",
                label: "Faculty Members",
                desc: "Qualified Educators",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#fff",
                  padding: "3rem 2rem",
                  borderRadius: "8px",
                  border: "3px solid #000",
                  textAlign: "center",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: "900",
                    color: "#3FA7A3",
                    marginBottom: "1rem",
                    fontFamily: "Orbitron, sans-serif",
                    lineHeight: "1",
                  }}
                >
                  {stat.number}
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                    fontFamily: "BeBas Neue, sans-serif",
                    color: "#000",
                  }}
                >
                  {stat.label}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#666",
                    margin: 0,
                  }}
                >
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Secondary Stats Row */}
          <div
            className="secondary-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {[
              {
                number: "89",
                label: "Top Universities",
                desc: "Student Placements",
              },
              {
                number: "95%",
                label: "Parent Satisfaction",
                desc: "Annual Survey Results",
              },
              {
                number: "20+",
                label: "Years Excellence",
                desc: "Since 2005",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#1a1a1a",
                  padding: "2rem 1.5rem",
                  borderRadius: "8px",
                  border: "3px solid #3FA7A3",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "900",
                    color: "#3FA7A3",
                    marginBottom: "0.5rem",
                    fontFamily: "Orbitron, sans-serif",
                    lineHeight: "1",
                  }}
                >
                  {stat.number}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    marginBottom: "0.25rem",
                    fontFamily: "BeBas Neue, sans-serif",
                    color: "#fff",
                  }}
                >
                  {stat.label}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#ccc",
                    margin: 0,
                  }}
                >
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <CTASection />

      <style>{`
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .container {
            padding: 0 1.5rem;
          }

          /* Hero Section */
          .about-hero {
            height: 50vh !important;
            min-height: 400px !important;
          }

          .about-hero h1 {
            font-size: 2.5rem !important;
            text-align: center;
            letter-spacing: 1px !important;
          }

          .about-hero p {
            font-size: 1.1rem !important;
            text-align: center;
            max-width: 100% !important;
          }

          /* Our Story Section */
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }

          .story-grid h2 {
            font-size: 2.5rem !important;
            text-align: center;
          }

          .tab-buttons {
            flex-direction: column !important;
            gap: 1rem !important;
          }

          .tab-buttons button {
            width: 100% !important;
            padding: 1rem !important;
          }

          .story-images {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }

          .story-images img {
            height: 200px !important;
            grid-column: 1 !important;
          }

          /* Leadership Team */
          .leadership-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .leadership-grid h2 {
            font-size: 2.5rem !important;
          }

          /* Milestones Timeline */
          .milestones-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }

          .timeline-connector {
            display: none !important;
          }

          .milestones-grid h2 {
            font-size: 2.5rem !important;
          }

          /* Facilities */
          .facilities-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .facilities-grid h2 {
            font-size: 2.5rem !important;
          }

          /* Academic Excellence */
          .main-stats-grid,
          .secondary-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          .main-stats-grid h2 {
            font-size: 2.5rem !important;
          }

          .main-stats-grid div,
          .secondary-stats-grid div {
            padding: 2rem 1.5rem !important;
          }

          .main-stats-grid div div {
            font-size: 2.5rem !important;
          }
        }

        /* Tablet Responsive Styles */
        @media (min-width: 769px) and (max-width: 1024px) {
          .container {
            padding: 0 2rem;
          }

          /* Hero Section */
          .about-hero h1 {
            font-size: 3rem !important;
          }

          .about-hero p {
            font-size: 1.2rem !important;
          }

          /* Our Story Section */
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }

          .tab-buttons {
            justify-content: center;
          }

          .story-images {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Leadership Team */
          .leadership-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }

          .leadership-grid > div:last-child {
            grid-column: 1 / -1;
            max-width: 400px;
            margin: 0 auto;
          }

          /* Milestones Timeline */
          .milestones-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 3rem !important;
          }

          .timeline-connector {
            display: none !important;
          }

          /* Facilities */
          .facilities-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Academic Excellence */
          .main-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .main-stats-grid > div:last-child {
            grid-column: 1 / -1;
            max-width: 400px;
            margin: 0 auto;
          }

          .secondary-stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        /* Small Mobile Devices */
        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }

          .about-hero h1 {
            font-size: 2rem !important;
          }

          .about-hero p {
            font-size: 1rem !important;
          }

          .story-grid h2,
          .leadership-grid h2,
          .milestones-grid h2,
          .facilities-grid h2,
          .main-stats-grid h2 {
            font-size: 2rem !important;
          }

          .main-stats-grid div div {
            font-size: 2rem !important;
          }

          .secondary-stats-grid div div {
            font-size: 2rem !important;
          }
        }

        /* Section Padding Adjustments for Mobile */
        @media (max-width: 768px) {
          .section {
            padding: 4rem 0 !important;
          }
        }

        @media (max-width: 480px) {
          .section {
            padding: 3rem 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
