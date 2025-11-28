"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// FAQ Item Component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#2d2d2d",
        borderRadius: "8px",
        border: "2px solid #3FA7A3",
        marginBottom: "1rem",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      className="FAQItem" // Added class for mobile targeting
    >
      {/* Question Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "1.5rem 1rem",
          backgroundColor: "transparent",
          border: "none",
          color: "#fff",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "BeBas Neue, sans-serif",
          fontSize: "1.2rem",
          fontWeight: "700",
          letterSpacing: "0.5px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(63, 167, 163, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <span style={{ flex: 1, paddingRight: "1rem" }}>{question}</span>
        <div
          style={{
            color: "#3FA7A3",
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </button>

      {/* Answer Content */}
      <div
        className="answer-content" // Added class for mobile targeting
        style={{
          maxHeight: isOpen ? "500px" : "0",
          opacity: isOpen ? 1 : 0,
          padding: isOpen ? "0 1rem 1.5rem 1rem" : "0 1rem",
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            paddingTop: "1rem",
            borderTop: "1px solid rgba(63, 167, 163, 0.3)",
            color: "#ccc",
            lineHeight: "1.6",
            fontSize: "1rem",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    grade: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      grade: "",
    });
  };

  const contactDetails = [
    {
      icon: "📍",
      title: "VISIT OUR CAMPUS",
      details: ["123 Education Street", "Knowledge City", "KC 10101"],
      description: "Main Campus - Central Location",
    },
    {
      icon: "📞",
      title: "CALL US",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Mon-Fri: 8:00 AM - 5:00 PM",
    },
    {
      icon: "📧",
      title: "EMAIL US",
      details: ["admissions@aswedauled.edu", "info@aswedauled.edu"],
      description: "We respond within 24 hours",
    },
    {
      icon: "🕒",
      title: "OFFICE HOURS",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
      ],
      description: "Closed on Sundays",
    },
  ];

  const departments = [
    {
      name: "ADMISSIONS OFFICE",
      phone: "+1 (555) 123-4501",
      email: "admissions@aswedauled.edu",
      hours: "Mon-Fri: 8:00 AM - 4:00 PM",
    },
    {
      name: "ACADEMIC AFFAIRS",
      phone: "+1 (555) 123-4502",
      email: "academics@aswedauled.edu",
      hours: "Mon-Fri: 8:30 AM - 4:30 PM",
    },
    {
      name: "STUDENT SERVICES",
      phone: "+1 (555) 123-4503",
      email: "studentservices@aswedauled.edu",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
    },
    {
      name: "FINANCIAL AID",
      phone: "+1 (555) 123-4504",
      email: "financialaid@aswedauled.edu",
      hours: "Mon-Fri: 9:00 AM - 3:00 PM",
    },
  ];

  const faqData = [
    {
      question: "What are the admission requirements?",
      answer:
        "Admission requirements vary by grade level. Generally, we require academic records, recommendation letters, and a student interview. For specific grade requirements, please contact our admissions office.",
    },
    {
      question: "Do you offer financial aid or scholarships?",
      answer:
        "Yes, we offer various scholarship programs and financial aid options for qualifying students based on academic merit and financial need. Scholarships are available for academic excellence, sports, arts, and community service.",
    },
    {
      question: "What is the student-to-teacher ratio?",
      answer:
        "Our average student-to-teacher ratio is 15:1, ensuring personalized attention and quality education for every student. In specialized programs and advanced courses, the ratio is often even lower.",
    },
    {
      question: "Are there extracurricular activities available?",
      answer:
        "We offer over 30 different extracurricular activities including sports, arts, robotics, debate, and community service programs. Students are encouraged to participate in at least one extracurricular activity each semester.",
    },
    {
      question: "What curriculum do you follow?",
      answer:
        "We follow both CBSE and State Board curricula, supplemented with our own innovative teaching methodologies. Our curriculum is designed to prepare students for both national and international higher education.",
    },
    {
      question: "What are the school hours?",
      answer:
        "Regular school hours are from 8:00 AM to 3:00 PM, Monday through Friday. Extended care and after-school programs are available until 5:30 PM for working parents.",
    },
    {
      question: "Do you provide transportation?",
      answer:
        "Yes, we provide safe and reliable transportation services covering most areas in the city. Our buses are equipped with GPS tracking, CCTV cameras, and trained attendants for student safety.",
    },
    {
      question: "How can parents get involved?",
      answer:
        "We encourage parent involvement through our Parent-Teacher Association (PTA), volunteer programs, and regular parent-teacher meetings. Parents can also participate in school events and workshops.",
    },
  ];

  return (
    <div className="contact-page">
      {/* ===== HERO SECTION ===== */}
      <section
        className="section contact-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80')",
          height: "50vh",
          minHeight: "400px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "900",
              marginBottom: "1rem",
              fontFamily: "BeBas Neue, sans-serif",
              letterSpacing: "2px",
            }}
          >
            CONTACT US
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              maxWidth: "600px",
              lineHeight: "1.6",
            }}
          >
            Get in touch with Aswedaul Ed. We're here to answer your questions
            and help with admissions.
          </p>
        </div>
      </section>

      {/* ===== CONTACT DETAILS (4 CARDS & MAP) ===== */}
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
            GET IN TOUCH
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
            className="contact-details-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
              marginBottom: "4rem",
            }}
          >
            {contactDetails.map((detail, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#2d2d2d",
                  padding: "2.5rem 2rem",
                  borderRadius: "12px",
                  border: "3px solid #3FA7A3",
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
                    fontSize: "3rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {detail.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    color: "#3FA7A3",
                    fontFamily: "BeBas Neue, sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  {detail.title}
                </h3>
                <div style={{ marginBottom: "1rem" }}>
                  {detail.details.map((item, itemIdx) => (
                    <p
                      key={itemIdx}
                      style={{
                        fontSize: "1rem",
                        color: "#fff",
                        margin: "0.5rem 0",
                        lineHeight: "1.4",
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#ccc",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  {detail.description}
                </p>
              </div>
            ))}
          </div>

          {/* Campus Map Placeholder */}
          <div
            style={{
              backgroundColor: "#2d2d2d",
              padding: "3rem",
              borderRadius: "12px",
              border: "3px solid #3FA7A3",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "2rem",
                color: "#3FA7A3",
                fontFamily: "BeBas Neue, sans-serif",
              }}
            >
              CAMPUS LOCATION
            </h3>
            <div
              style={{
                height: "300px",
                backgroundColor: "#1a1a1a",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #3FA7A3",
              }}
            >
              <p style={{ fontSize: "1.2rem", color: "#ccc" }}>
                Interactive Campus Map Would Go Here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM & DEPARTMENTS ===== */}
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
            className="contact-form-grid"
            style={{
              display: "grid",
              /* Base desktop grid - 1fr 1fr */
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* Contact Form */}
            <div>
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  marginBottom: "1rem",
                  fontFamily: "BeBas Neue, sans-serif",
                  letterSpacing: "1px",
                  color: "#000",
                }}
              >
                SEND US A MESSAGE
              </h2>
              <div
                style={{
                  width: "80px",
                  height: "6px",
                  backgroundColor: "#3FA7A3",
                  marginBottom: "2rem",
                }}
              ></div>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div
                  className="form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "1rem",
                        border: "2px solid #000",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        backgroundColor: "#fff",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "1rem",
                        border: "2px solid #000",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        backgroundColor: "#fff",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        border: "2px solid #000",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        backgroundColor: "#fff",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      INTERESTED GRADE
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        border: "2px solid #000",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        backgroundColor: "#fff",
                      }}
                    >
                      <option value="">Select Grade</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={`Grade ${i + 1}`}>
                          Grade {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    SUBJECT *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #000",
                      borderRadius: "4px",
                      fontSize: "1rem",
                      backgroundColor: "#fff",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #000",
                      borderRadius: "4px",
                      fontSize: "1rem",
                      backgroundColor: "#fff",
                      resize: "vertical",
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "1.2rem 2rem",
                    backgroundColor: "#3FA7A3",
                    color: "#fff",
                    border: "none",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontFamily: "BeBas Neue, sans-serif",
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2d8a83";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#3FA7A3";
                  }}
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>

            {/* Department Contacts */}
            <div>
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  marginBottom: "1rem",
                  fontFamily: "BeBas Neue, sans-serif",
                  letterSpacing: "1px",
                  color: "#000",
                }}
              >
                DEPARTMENT CONTACTS
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
                className="departments-grid"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {departments.map((dept, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "#fff",
                      padding: "2rem",
                      borderRadius: "8px",
                      border: "3px solid #000",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        color: "#3FA7A3",
                        fontFamily: "BeBas Neue, sans-serif",
                      }}
                    >
                      {dept.name}
                    </h3>
                    <div style={{ marginBottom: "0.5rem" }}>
                      <strong>Phone:</strong> {dept.phone}
                    </div>
                    <div style={{ marginBottom: "0.5rem" }}>
                      <strong>Email:</strong> {dept.email}
                    </div>
                    <div style={{ color: "#666", fontSize: "0.9rem" }}>
                      <strong>Hours:</strong> {dept.hours}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Info */}
              <div
                style={{
                  backgroundColor: "#1a1a1a",
                  padding: "2rem",
                  borderRadius: "8px",
                  border: "3px solid #3FA7A3",
                  marginTop: "2rem",
                  color: "#fff",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    color: "#3FA7A3",
                    fontFamily: "BeBas Neue, sans-serif",
                  }}
                >
                  QUICK RESPONSE
                </h3>
                <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call our main office
                  directly.
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#ccc",
                    fontStyle: "italic",
                  }}
                >
                  Looking forward to hearing from you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION - NOW VISIBLE ON ALL SCREENS ===== */}
      <section
        className="section faq-section-desktop"
        style={{
          backgroundColor: "#1a1a1a",
          padding: "6rem 0",
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
            FREQUENTLY ASKED QUESTIONS
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
            style={{
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {faqData.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Desktop/Base Grid Settings (for form/departments) */
        .contact-form-grid {
          grid-template-columns: 1fr 1fr; /* Default to 2 columns */
        }

        /* --- MOBILE RESPONSIVE STYLES (Max-width 768px) --- */
        @media (max-width: 768px) {
          .container {
            padding: 0 1.5rem;
          }

          /* General Padding */
          .section {
            padding: 4rem 0 !important;
          }

          /* FAQ SECTION REINSTATEMENT: REMOVED display: none; */

          /* Contact Details Grid */
          .contact-details-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          /* Contact Form Section: FIX THE STACKING ORDER */
          .contact-form-grid {
            /* Force to single column layout */
            grid-template-columns: 1fr !important; 
            gap: 3rem !important;
          }
          
          /* FIX: Explicitly set order for the two main children (Form then Departments) */
          .contact-form-grid > div:nth-child(1) {
            order: 1 !important; /* Form */
          }
          .contact-form-grid > div:nth-child(2) {
            order: 2 !important; /* Department Contacts */
          }

          .contact-form-grid h2 {
            font-size: 2.5rem !important;
            text-align: center;
          }

          .form-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          /* Departments Section */
          .departments-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }

          /* Hero Section */
          .contact-hero {
            height: 40vh !important;
            min-height: 350px !important;
            text-align: center;
          }

          /* FAQ Item Styling for better mobile display */
          .FAQItem button {
            padding: 1.25rem 1rem !important;
            font-size: 1.1rem !important;
          }

          .FAQItem .answer-content div {
            font-size: 0.95rem !important;
          }
        }

        /* --- TABLET RESPONSIVE STYLES (769px to 1024px) --- */
        @media (min-width: 769px) and (max-width: 1024px) {
          .container {
            padding: 0 2rem;
          }

          /* Contact Details Grid: 2 columns */
          .contact-details-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }

          /* Contact Form Section: Keep 2 columns on tablet for max space use */
          .contact-form-grid {
            grid-template-columns: 1fr 1fr !important; 
            gap: 3rem !important;
          }

          .form-row {
            grid-template-columns: 1fr 1fr !important;
          }

          /* Departments Grid: 2 columns for better tablet layout */
          .departments-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        
        /* Small Mobile Devices (Max-width 480px) */
        @media (max-width: 480px) {
            .container {
              padding: 0 1rem;
            }
            
            .section {
              padding: 3rem 0 !important;
            }

            .contact-hero h1 {
              font-size: 2rem !important;
            }

            .contact-hero p {
              font-size: 1rem !important;
            }

            .contact-details-grid h2,
            .contact-form-grid h2,
            .faq-section-desktop h2 {
              font-size: 2rem !important;
            }

            .contact-details-grid > div {
              padding: 1.5rem 1rem !important;
            }

            .contact-form-grid input,
            .contact-form-grid select,
            .contact-form-grid textarea {
              padding: 0.8rem !important;
            }

            .departments-grid > div {
              padding: 1.25rem !important;
            }

            .departments-grid h3 {
              font-size: 1.1rem !important;
            }
        }
      `}</style>
    </div>
  );
}
