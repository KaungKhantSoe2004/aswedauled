"use client";

import { useState, useEffect } from "react";
import type { AdmissionType } from "../../assets/types";
import { createAdmission } from "../../assets/graphql/Controllers";
import { useParams } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  email: string;
  age: string;
  phone: string;
  prevSchool_doc: string;
  grade: string;
  gender: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  profile: string;
  created_at: string;
  updated_at: string;
}

export default function GradePage() {
  const [isSubmissionPeriod, setIsSubmissionPeriod] = useState(true);
  const { grade } = useParams<{ grade: string }>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState<
    "open" | "closed" | "review"
  >("open");
  const [students, setStudents] = useState<Student[]>([]);
  const [showStudentList, setShowStudentList] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // Simulate page loading for 3 seconds
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 3000);

    const currentDate = new Date();
    const submissionStart = new Date("2024-12-01");
    const submissionEnd = new Date("2024-12-31");
    const resultsDate = new Date("2025-01-15");

    if (currentDate > resultsDate) {
      setShowStudentList(true);
      setIsSubmissionPeriod(true);
      setSubmissionStatus("open");
    } else if (currentDate > submissionEnd) {
      setIsSubmissionPeriod(true);
      setSubmissionStatus("open");
    } else {
      setIsSubmissionPeriod(true);
      setSubmissionStatus("open");
    }

    return () => clearTimeout(timer);
  }, []);

  const curriculumData = {
    "Grade 1": {
      coreSubjects: [
        {
          name: "Myanmar Language",
          description:
            "Basic reading, writing, and comprehension skills in Myanmar language",
          topics: [
            "Alphabet recognition",
            "Basic vocabulary",
            "Simple sentence formation",
            "Story reading",
          ],
        },
        {
          name: "English Language",
          description:
            "Introduction to English alphabet and basic communication",
          topics: [
            "ABC recognition",
            "Basic phonics",
            "Simple greetings",
            "Color and number names",
          ],
        },
        {
          name: "Mathematics",
          description: "Fundamental numeracy and basic arithmetic operations",
          topics: [
            "Numbers 1-100",
            "Basic addition/subtraction",
            "Shape recognition",
            "Simple measurements",
          ],
        },
        {
          name: "General Science",
          description:
            "Introduction to natural world and basic scientific concepts",
          topics: [
            "Living things",
            "Weather and seasons",
            "Basic health",
            "Environmental awareness",
          ],
        },
      ],
      extraActivities: [
        {
          name: "Art & Craft",
          description:
            "Creative expression through drawing, coloring, and simple crafts",
        },
        {
          name: "Music & Movement",
          description:
            "Basic rhythm, songs, and physical coordination activities",
        },
        {
          name: "Physical Education",
          description: "Basic motor skills development and team games",
        },
        {
          name: "Computer Basics",
          description: "Introduction to computers and educational software",
        },
      ],
    },
    "Grade 7": {
      coreSubjects: [
        {
          name: "Myanmar Language",
          description: "Advanced reading comprehension and composition writing",
          topics: [
            "Essay writing",
            "Poetry analysis",
            "Grammar rules",
            "Literature appreciation",
          ],
        },
        {
          name: "English Language",
          description: "Intermediate English grammar and communication skills",
          topics: [
            "Grammar structures",
            "Reading comprehension",
            "Paragraph writing",
            "Vocabulary building",
          ],
        },
        {
          name: "Mathematics",
          description: "Algebra, geometry, and problem-solving skills",
          topics: [
            "Basic algebra",
            "Geometry concepts",
            "Fractions/decimals",
            "Word problems",
          ],
        },
        {
          name: "Science",
          description:
            "Integrated science covering physics, chemistry, and biology basics",
          topics: [
            "Scientific method",
            "Basic physics",
            "Chemistry concepts",
            "Biology fundamentals",
          ],
        },
        {
          name: "History & Geography",
          description: "Myanmar history and world geography fundamentals",
          topics: [
            "Myanmar history",
            "World geography",
            "Map skills",
            "Cultural studies",
          ],
        },
      ],
      extraActivities: [
        {
          name: "Computer Programming",
          description:
            "Introduction to coding with Scratch and basic programming concepts",
        },
        {
          name: "Robotics Club",
          description:
            "Hands-on experience with basic robotics and engineering principles",
        },
        {
          name: "Art & Design",
          description: "Advanced drawing, painting, and digital art techniques",
        },
        {
          name: "Sports Program",
          description:
            "Team sports including football, basketball, and traditional games",
        },
      ],
    },
    "Grade 12": {
      coreSubjects: [
        {
          name: "Advanced Myanmar Studies",
          description: "Comprehensive Myanmar literature and language mastery",
          topics: [
            "Literary analysis",
            "Advanced composition",
            "Myanmar culture",
            "Critical thinking",
          ],
        },
        {
          name: "English Literature",
          description:
            "University-preparatory English literature and composition",
          topics: [
            "Literary analysis",
            "Research writing",
            "Critical essays",
            "Advanced grammar",
          ],
        },
        {
          name: "Advanced Mathematics",
          description: "Calculus, statistics, and university-level mathematics",
          topics: ["Calculus", "Statistics", "Algebra II", "Trigonometry"],
        },
        {
          name: "Physics",
          description:
            "Comprehensive physics curriculum for university preparation",
          topics: [
            "Mechanics",
            "Electricity",
            "Thermodynamics",
            "Modern physics",
          ],
        },
        {
          name: "Chemistry",
          description: "Advanced chemistry with laboratory experiments",
          topics: [
            "Organic chemistry",
            "Chemical reactions",
            "Laboratory techniques",
            "Analytical chemistry",
          ],
        },
        {
          name: "Biology",
          description:
            "University-level biology with emphasis on life sciences",
          topics: ["Cell biology", "Genetics", "Human anatomy", "Ecology"],
        },
      ],
      extraActivities: [
        {
          name: "Advanced Programming",
          description:
            "Python, web development, and software engineering principles",
        },
        {
          name: "Robotics Engineering",
          description:
            "Advanced robotics with Arduino and engineering projects",
        },
        {
          name: "Business Studies",
          description: "Entrepreneurship, economics, and business management",
        },
        {
          name: "Leadership Program",
          description:
            "Public speaking, team leadership, and community service",
        },
      ],
    },
  };

  const facultyData = {
    "Grade 1": [
      {
        name: "Daw Khin Mar Aye",
        subject: "Myanmar Language & Primary Education",
        image:
          "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "M.Ed in Primary Education, Yangon University",
        experience: "10 years teaching experience",
        specialization: "Early childhood education and literacy development",
      },
      {
        name: "U Myo Min Htet",
        subject: "Mathematics & Science",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "B.Sc in Mathematics, Mandalay University",
        experience: "8 years teaching experience",
        specialization: "Primary mathematics and hands-on science activities",
      },
      {
        name: "Daw Hla Hla Win",
        subject: "English Language",
        image:
          "https://images.unsplash.com/photo-1551836026-d5c2e0c113b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "BA in English, Yangon University of Foreign Languages",
        experience: "7 years teaching experience",
        specialization: "ESL teaching and phonics instruction",
      },
    ],
    "Grade 7": [
      {
        name: "Daw Su Su Hlaing",
        subject: "Myanmar Literature",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "MA in Myanmar Literature, Yangon University",
        experience: "12 years teaching experience",
        specialization: "Myanmar poetry and literary analysis",
      },
      {
        name: "Mr. David Chen",
        subject: "English Language",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "MA in English Literature, University of London",
        experience: "8 years teaching experience",
        specialization: "Grammar and composition writing",
      },
      {
        name: "U Zaw Min Oo",
        subject: "Mathematics",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "M.Sc in Mathematics, Yangon University",
        experience: "10 years teaching experience",
        specialization: "Algebra and geometry",
      },
      {
        name: "Daw Thida Nyunt",
        subject: "Science",
        image:
          "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "M.Sc in Physics, University of Mandalay",
        experience: "9 years teaching experience",
        specialization: "Integrated science and laboratory experiments",
      },
    ],
    "Grade 12": [
      {
        name: "Dr. Aung Kyaw Moe",
        subject: "Advanced Myanmar Studies",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "PhD in Myanmar Literature, Yangon University",
        experience: "15 years teaching experience",
        specialization: "Myanmar literary criticism and research methodology",
      },
      {
        name: "Ms. Sarah Johnson",
        subject: "English Literature",
        image:
          "https://images.unsplash.com/photo-1551836026-d5c2e0c113b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "PhD in English Literature, Cambridge University",
        experience: "12 years teaching experience",
        specialization: "British literature and academic writing",
      },
      {
        name: "Dr. Htay Lwin",
        subject: "Advanced Mathematics",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "PhD in Mathematics, Stanford University",
        experience: "14 years teaching experience",
        specialization: "Calculus and advanced mathematical theory",
      },
      {
        name: "Dr. Mya Mya Khin",
        subject: "Physics & Chemistry",
        image:
          "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        qualifications: "PhD in Chemistry, Tokyo University",
        experience: "13 years teaching experience",
        specialization: "Physical chemistry and laboratory research",
      },
    ],
  };

  const currentCurriculum =
    curriculumData[grade as keyof typeof curriculumData] ||
    curriculumData["Grade 7"];
  const currentFaculty =
    facultyData[grade as keyof typeof facultyData] || facultyData["Grade 7"];

  const [formData, setFormData] = useState<AdmissionType>({
    name: "",
    email: "",
    age: "",
    phone: "",
    prevSchool_doc: null,
    gender: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    profile: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      const response = await createAdmission(formData, grade);
      console.log(response);
      if (response.status === true) {
        setSubmitSuccess(true);
        // Clear form
        setFormData({
          name: "",
          email: "",
          age: "",
          phone: "",
          prevSchool_doc: null,
          gender: "",
          guardianName: "",
          guardianPhone: "",
          guardianEmail: "",
          profile: null,
        });

        // Clear file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((input) => {
          (input as HTMLInputElement).value = "";
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (!files) return;

    if (name === "prevSchool_doc") {
      if (files.length > 4) {
        alert("You can upload a maximum of 4 files.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        prevSchool_doc: Array.from(files),
      }));
      return;
    }

    if (name === "profile") {
      setFormData((prev) => ({
        ...prev,
        profile: files[0],
      }));
      return;
    }
  };

  // Success Notification Component
  const SuccessNotification = () => (
    <div className="success-notification">
      <div className="success-content">
        <div className="success-icon">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <div className="success-text">
          <h3>Application Submitted Successfully!</h3>
          <p>
            Your admission application for {grade} has been received. We'll
            contact you soon.
          </p>
        </div>
        <button
          className="close-notification"
          onClick={() => setSubmitSuccess(false)}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );

  return (
    <div className="grade-page">
      {/* Page Loading Overlay */}
      {isPageLoading && (
        <div className="page-loading-overlay">
          <div className="loader-container">
            <div className="academic-loader">
              <div className="book">
                <div className="book__pg-shadow"></div>
                <div className="book__pg"></div>
                <div className="book__pg book__pg--2"></div>
                <div className="book__pg book__pg--3"></div>
                <div className="book__pg book__pg--4"></div>
                <div className="book__pg book__pg--5"></div>
              </div>
              <div className="loading-text">
                <span className="letter">L</span>
                <span className="letter">O</span>
                <span className="letter">A</span>
                <span className="letter">D</span>
                <span className="letter">I</span>
                <span className="letter">N</span>
                <span className="letter">G</span>
                <span className="letter">.</span>
                <span className="letter">.</span>
                <span className="letter">.</span>
              </div>
              <div className="school-name">ASWEDAUL ED</div>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {submitSuccess && <SuccessNotification />}

      {/* Professional Banner Section */}
      <section className="banner-section">
        <div className="banner-background">
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <div className="banner-text">
              <div className="grade-badge">{grade}</div>
              <h1 className="banner-title">
                Academic Excellence at ASWEDAUL ED
              </h1>
              <p className="banner-description">
                Comprehensive educational program designed to nurture young
                minds and prepare students for academic success and personal
                growth in a supportive learning environment.
              </p>
              <div className="banner-stats">
                <div className="stat-item">
                  <div className="stat-number">98.7%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15:1</div>
                  <div className="stat-label">Student-Teacher Ratio</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">25</div>
                  <div className="stat-label">Class Size</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Tabs */}
      <section className="bg-[#f5f5f5] border-b-4 border-[#3fa7a3]/60 shadow-sm sticky top-0 z-20">
        <div className="w-full overflow-x-auto no-scrollbar md:overflow-visible">
          <div
            className="
        grid grid-cols-2 w-full
        md:flex md:w-full
        whitespace-nowrap
        divide-y md:divide-y-0 md:divide-x 
        divide-gray-300/60
      "
          >
            {[
              "Overview",
              "Requirements",
              "Admission",
              "Curriculum",
              "Faculty",
            ].map((tab) => (
              <div
                key={tab}
                className={`
              px-6 py-5 
              cursor-pointer
              flex justify-center items-center
              transition-all duration-200
              md:flex-1
              ${
                activeTab === tab.toLowerCase()
                  ? "bg-[#3fa7a3]/15"
                  : "hover:bg-[#3fa7a3]/10"
              }
            `}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={`
                  text-[0.9rem] md:text-[0.95rem] 
                  font-semibold uppercase tracking-wide 
                  transition-colors
                  ${
                    activeTab === tab.toLowerCase()
                      ? "text-[#2d8986] font-bold"
                      : "text-gray-700 hover:text-[#3fa7a3]"
                  }
                `}
                  >
                    {tab}
                  </span>

                  <div
                    className={`
                  h-[3px] bg-[#3fa7a3] rounded-full transition-all duration-300
                  ${
                    activeTab === tab.toLowerCase()
                      ? "w-10 opacity-100"
                      : "w-0 opacity-0"
                  }
                `}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
      </section>

      {/* Main Content */}
      <div className="container">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">GRADE OVERVIEW</h2>
              <div className="title-underline"></div>
            </div>

            <div className="mission-card">
              <h3>Educational Mission</h3>
              <p>
                {grade === "Grade 1"
                  ? "Build strong foundation in literacy, numeracy, and social skills through interactive learning"
                  : grade === "Grade 7"
                  ? "Transition to specialized subjects with strong foundation in core academic areas"
                  : "Achieve university readiness with A-Level standards and leadership development"}
              </p>
            </div>

            <div className="overview-grid">
              <div className="overview-card">
                <div className="card-image">
                  <img
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Classroom Learning"
                  />
                </div>
                <div className="card-content">
                  <h4>Academic Excellence</h4>
                  <p>
                    Comprehensive curriculum designed to meet international
                    standards while preserving Myanmar cultural values and
                    educational traditions.
                  </p>
                  <ul>
                    <li>Modern teaching methodologies</li>
                    <li>Individualized learning paths</li>
                    <li>Regular progress assessments</li>
                    <li>Technology-integrated classrooms</li>
                  </ul>
                </div>
              </div>

              <div className="overview-card">
                <div className="card-image">
                  <img
                    src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Science Laboratory"
                  />
                </div>
                <div className="card-content">
                  <h4>Advanced Facilities</h4>
                  <p>
                    State-of-the-art facilities to support holistic development
                    and innovative learning experiences.
                  </p>
                  <ul>
                    <li>Advanced science laboratories</li>
                    <li>Computer and technology labs</li>
                    <li>Comprehensive library resources</li>
                    <li>Sports and arts facilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Requirements Tab */}
        {activeTab === "requirements" && (
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">ADMISSION REQUIREMENTS</h2>
              <div className="title-underline"></div>
            </div>

            <div className="requirements-grid">
              <div className="requirement-card">
                <h3>Basic Requirements</h3>
                <div className="requirement-details">
                  <div className="requirement-item">
                    <strong>Age Range:</strong>
                    <span>
                      {grade === "Grade 1"
                        ? "5-6 years"
                        : grade === "Grade 7"
                        ? "11-12 years"
                        : "16-17 years"}
                    </span>
                  </div>
                  <div className="requirement-item">
                    <strong>Previous Education:</strong>
                    <span>Completed previous grade</span>
                  </div>
                  <div className="requirement-item">
                    <strong>Health Requirement:</strong>
                    <span>Medically fit for school</span>
                  </div>
                </div>
              </div>

              <div className="requirement-card">
                <h3>Academic Prerequisites</h3>
                <ul className="prerequisites-list">
                  {grade === "Grade 1" ? (
                    <>
                      <li>Basic Myanmar language recognition</li>
                      <li>Number counting 1-50</li>
                      <li>Social interaction skills</li>
                    </>
                  ) : grade === "Grade 7" ? (
                    <>
                      <li>Myanmar literature appreciation</li>
                      <li>Algebra introduction</li>
                      <li>English fluency</li>
                      <li>Scientific method</li>
                    </>
                  ) : (
                    <>
                      <li>A-Level readiness</li>
                      <li>Advanced critical thinking</li>
                      <li>Research project experience</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="requirement-card">
                <h3>Required Documents</h3>
                <ul className="documents-list">
                  {grade === "Grade 1" ? (
                    <>
                      <li>Birth Certificate</li>
                      <li>Kindergarten Completion Certificate</li>
                      <li>Medical Certificate</li>
                      <li>4 Photos</li>
                    </>
                  ) : grade === "Grade 7" ? (
                    <>
                      <li>Birth Certificate</li>
                      <li>Grade 6 Report Card</li>
                      <li>Medical Certificate</li>
                      <li>Recommendation Letter</li>
                      <li>4 Photos</li>
                    </>
                  ) : (
                    <>
                      <li>Birth Certificate</li>
                      <li>Grade 11 Transcript</li>
                      <li>Medical Certificate</li>
                      <li>Recommendation Letters (2)</li>
                      <li>ID Photos</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="exam-section">
              <h3>ENTRANCE EXAMINATION SUBJECTS</h3>
              <div className="subjects-grid">
                <div className="subject-card">
                  <h4>Myanmar Language</h4>
                  <p>
                    Reading comprehension, writing skills, and language
                    proficiency
                  </p>
                </div>
                <div className="subject-card">
                  <h4>English Language</h4>
                  <p>Grammar, vocabulary, reading, and writing skills</p>
                </div>
                <div className="subject-card">
                  <h4>Mathematics</h4>
                  <p>Problem-solving and analytical thinking skills</p>
                </div>
                <div className="subject-card">
                  <h4>Science</h4>
                  <p>General science knowledge and scientific thinking</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Admission Tab */}
        {activeTab === "admission" && (
          <section className="content-section">
            {isSubmissionPeriod ? (
              <div className="admission-layout">
                <div className="admission-sidebar">
                  <div className="sidebar-card">
                    <h3>Admission Timeline</h3>
                    <div className="timeline">
                      <div className="timeline-item">
                        <div className="timeline-date">Dec 1-31, 2024</div>
                        <div className="timeline-content">
                          Application Period
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-date">Jan 5-10, 2025</div>
                        <div className="timeline-content">Entrance Exams</div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-date">Jan 15, 2025</div>
                        <div className="timeline-content">
                          Results Announcement
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-card">
                    <h3>Quick Information</h3>
                    <div className="quick-info">
                      <div className="info-item">
                        <span>Age Requirement:</span>
                        <strong>
                          {grade === "Grade 1"
                            ? "5-6 years"
                            : grade === "Grade 7"
                            ? "11-12 years"
                            : "16-17 years"}
                        </strong>
                      </div>
                      <div className="info-item">
                        <span>Documents Needed:</span>
                        <strong>
                          {grade === "Grade 1"
                            ? "4 items"
                            : grade === "Grade 7"
                            ? "5 items"
                            : "5 items"}
                        </strong>
                      </div>
                      <div className="info-item">
                        <span>Exam Subjects:</span>
                        <strong>4 Subjects</strong>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-card">
                    <h3>Application Status</h3>
                    <div className="status-info">
                      <div className={`status-badge ${submissionStatus}`}>
                        <span className="status-dot"></span>
                        <span className="status-text">
                          {submissionStatus === "open" && "Admissions Open"}
                          {submissionStatus === "review" && "Under Review"}
                          {submissionStatus === "closed" &&
                            "Selection Complete"}
                        </span>
                      </div>
                      <p className="status-message">
                        {submissionStatus === "open" &&
                          "Submit your application before December 31, 2024"}
                        {submissionStatus === "review" &&
                          "Applications are being reviewed"}
                        {submissionStatus === "closed" &&
                          "Admission process completed"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-10">
                  <div className="w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
                    <div className="p-8 sm:p-12">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 tracking-wide">
                          ADMISSION APPLICATION FORM
                        </h2>
                        <p className="mt-3 text-lg text-gray-600 font-light">
                          Applying for{" "}
                          <span className="font-medium text-cyan-700">
                            {grade}
                          </span>{" "}
                          at
                          <strong className="text-cyan-900 font-semibold border-b border-indigo-200 pb-0.5">
                            ASWEDAUL ED
                          </strong>
                        </p>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center text-sm font-medium text-red-600 px-4 py-1 rounded-md bg-red-50">
                            * All fields are required for application submission
                          </span>
                        </div>
                      </div>

                      {submitError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-600 text-sm">{submitError}</p>
                        </div>
                      )}

                      <form
                        onSubmit={handleSubmit}
                        className="space-y-12"
                        encType="multipart/form-data"
                      >
                        {/* Student Information Section */}
                        <div className="pb-6 border-b border-gray-200">
                          <div className="mb-6">
                            <div className="flex items-center space-x-2">
                              <svg
                                className="h-6 w-6 text-cyan-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <h4 className="text-xl font-semibold text-gray-900 tracking-tight">
                                1. STUDENT INFORMATION
                              </h4>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Provide the primary applicant's personal details.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Name */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Full Name{" "}
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Student Full Name"
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              />
                            </div>

                            {/* Gender */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Gender <span className="text-red-600">*</span>
                              </label>
                              <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Email Address{" "}
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="student@example.com"
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              />
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Phone Number{" "}
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                placeholder="+95 9 123 456 789"
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              />
                            </div>

                            {/* Age */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Age <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., 14"
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Educational Background */}
                        <div className="pb-6 border-b border-gray-200">
                          <div className="mb-6">
                            <div className="flex items-center space-x-2">
                              <svg
                                className="h-6 w-6 text-cyan-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                                />
                              </svg>
                              <h4 className="text-xl font-semibold text-gray-900 tracking-tight">
                                2. EDUCATIONAL BACKGROUND
                              </h4>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Previous School Documents */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Previous School Documents (up to 4 files)
                              </label>
                              <input
                                type="file"
                                name="prevSchool_doc"
                                multiple
                                onChange={handleFileChange}
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              />
                              <p className="text-xs text-gray-500">
                                Upload report cards, transcripts, etc.
                              </p>
                            </div>
                          </div>

                          {/* Profile Image Upload */}
                          <div className="mt-6 space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                              Student Profile Image{" "}
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="file"
                              name="profile"
                              accept="image/*"
                              required
                              onChange={handleFileChange}
                              className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        {/* Guardian Contact Details */}
                        <div className="pb-6 border-b border-gray-200">
                          <div className="mb-6">
                            <div className="flex items-center space-x-2">
                              <svg
                                className="h-6 w-6 text-cyan-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17 20h5m-1-10v5"
                                />
                              </svg>
                              <h4 className="text-xl font-semibold text-gray-900 tracking-tight">
                                3. GUARDIAN CONTACT DETAILS
                              </h4>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Guardian Name */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Guardian Name{" "}
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                name="guardianName"
                                value={formData.guardianName}
                                onChange={handleInputChange}
                                required
                                placeholder="Guardian's Full Name"
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              />
                            </div>

                            {/* Guardian Phone */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Guardian Phone{" "}
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="tel"
                                name="guardianPhone"
                                value={formData.guardianPhone}
                                onChange={handleInputChange}
                                required
                                placeholder="+95 9 123 456 789"
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              />
                            </div>

                            {/* Guardian Email */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Guardian Email
                              </label>
                              <input
                                type="email"
                                name="guardianEmail"
                                value={formData.guardianEmail}
                                onChange={handleInputChange}
                                placeholder="guardian@example.com"
                                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-700 rounded-lg shadow-sm"
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700 transition-all duration-300 flex items-center justify-center min-w-[180px] disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              "Submit Application"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : showStudentList ? (
              <div className="students-section">
                <h2>SELECTED STUDENTS - {grade}</h2>
                <div className="students-placeholder">
                  <p>
                    Student list will be displayed here after selection process
                    is complete.
                  </p>
                  <p>Check back on January 15th, 2025 for the final list.</p>
                </div>
              </div>
            ) : (
              <div className="review-section">
                <h2>APPLICATIONS UNDER REVIEW</h2>
                <p>
                  Thank you for your interest in {grade} at ASWEDAUL ED. The
                  submission period has ended and our team is currently
                  reviewing all applications.
                </p>
                <p>
                  The selected students list will be published on{" "}
                  <strong>January 15th, 2025</strong>.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Curriculum Tab */}
        {activeTab === "curriculum" && (
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">ACADEMIC CURRICULUM</h2>
              <div className="title-underline"></div>
            </div>

            <div className="curriculum-content">
              <div className="core-subjects-section">
                <h3>Core Academic Subjects</h3>
                <div className="subjects-grid">
                  {currentCurriculum.coreSubjects.map((subject, index) => (
                    <div key={index} className="subject-card">
                      <h4>{subject.name}</h4>
                      <p className="subject-description">
                        {subject.description}
                      </p>
                      <div className="topics-list">
                        <h5>Key Topics:</h5>
                        <ul>
                          {subject.topics.map((topic, topicIndex) => (
                            <li key={topicIndex}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="extra-activities-section">
                <h3>Extra-Curricular Activities</h3>
                <div className="activities-grid">
                  {currentCurriculum.extraActivities.map((activity, index) => (
                    <div key={index} className="activity-card">
                      <h4>{activity.name}</h4>
                      <p>{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="schedule-section">
                <h3>Weekly Schedule Overview</h3>
                <div className="schedule-card">
                  <div className="schedule-days">
                    <div className="schedule-day">
                      <strong>Monday - Friday</strong>
                      <span>8:00 AM - 2:30 PM</span>
                    </div>
                    <div className="schedule-breakdown">
                      <div className="schedule-item">
                        <span>Core Subjects</span>
                        <span>4-5 hours daily</span>
                      </div>
                      <div className="schedule-item">
                        <span>Extra Activities</span>
                        <span>1-2 hours daily</span>
                      </div>
                      <div className="schedule-item">
                        <span>Lunch Break</span>
                        <span>45 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Faculty Tab */}
        {activeTab === "faculty" && (
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">TEACHING FACULTY</h2>
              <div className="title-underline"></div>
            </div>

            <div className="faculty-intro">
              <p>
                Our dedicated team of experienced educators is committed to
                providing the highest quality education and personalized
                attention to each student.
              </p>
            </div>

            <div className="faculty-grid">
              {currentFaculty.map((teacher, index) => (
                <div key={index} className="teacher-card">
                  <div className="teacher-image">
                    <img src={teacher.image} alt={teacher.name} />
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>
                    <p className="teacher-subject">{teacher.subject}</p>
                    <p className="teacher-qualifications">
                      {teacher.qualifications}
                    </p>
                    <p className="teacher-experience">{teacher.experience}</p>
                    <p className="teacher-specialization">
                      <strong>Specialization:</strong> {teacher.specialization}
                    </p>
                    <div className="teacher-contact">
                      <span>
                        Email: {teacher.name.split(" ")[0].toLowerCase()}
                        @aswedauled.edu
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="faculty-stats">
              <div className="stat-card">
                <div className="stat-number">{currentFaculty.length}</div>
                <div className="stat-label">Dedicated Teachers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">15:1</div>
                <div className="stat-label">Student-Teacher Ratio</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Average Years Experience</div>
              </div>
            </div>
          </section>
        )}
      </div>

      <style>{`
        .grade-page {
          background: #d4d4d4;
          min-height: 100vh;
          font-family: "Bebas Neue", Arial, sans-serif;
        }

        /* Page Loading Overlay */
        .page-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .academic-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        /* Book Loader Animation */
        .book {
          --color: #3fa7a3;
          --duration: 6.8s;
          width: 32px;
          height: 12px;
          position: relative;
          margin: 32px 0 0 0;
          zoom: 1.5;
        }

        .book .book__pg {
          animation: var(--duration) book ease infinite;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform-origin: top left;
          border-radius: 2px 4px 4px 2px;
          background: linear-gradient(var(--color), var(--color)) 0 0 / 5px 12px,
            linear-gradient(var(--color), var(--color)) 2px 0 / 3px 12px,
            linear-gradient(var(--color), var(--color)) 4px 0 / 2px 12px,
            linear-gradient(var(--color), var(--color)) 6px 0 / 1px 12px,
            linear-gradient(var(--color), var(--color)) 8px 0 / 0.5px 12px;
          background-repeat: no-repeat;
        }

        .book .book__pg:nth-child(2) {
          animation-name: book-2;
        }

        .book .book__pg:nth-child(3) {
          animation-name: book-3;
        }

        .book .book__pg:nth-child(4) {
          animation-name: book-4;
        }

        .book .book__pg:nth-child(5) {
          animation-name: book-5;
        }

        .book .book__pg-shadow {
          animation: var(--duration) book-shadow ease infinite;
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          background: #000;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
          z-index: -1;
        }

        @keyframes book {
          4% {
            transform: rotate(0) translateY(0);
          }
          13% {
            transform: rotate(0) translateY(0);
          }
          17% {
            transform: rotate(15deg) translateY(0);
          }
          23% {
            transform: rotate(0) translateY(-20px);
          }
          27% {
            transform: rotate(0) translateY(0);
          }
          96% {
            transform: rotate(0) translateY(0);
          }
        }

        @keyframes book-2 {
          4% {
            transform: rotate(0) translateY(0);
          }
          13% {
            transform: rotate(0) translateY(0);
          }
          17% {
            transform: rotate(9deg) translateY(0);
          }
          23% {
            transform: rotate(0) translateY(-16px);
          }
          27% {
            transform: rotate(0) translateY(0);
          }
          96% {
            transform: rotate(0) translateY(0);
          }
        }

        @keyframes book-3 {
          4% {
            transform: rotate(0) translateY(0);
          }
          13% {
            transform: rotate(0) translateY(0);
          }
          17% {
            transform: rotate(6deg) translateY(0);
          }
          23% {
            transform: rotate(0) translateY(-12px);
          }
          27% {
            transform: rotate(0) translateY(0);
          }
          96% {
            transform: rotate(0) translateY(0);
          }
        }

        @keyframes book-4 {
          4% {
            transform: rotate(0) translateY(0);
          }
          13% {
            transform: rotate(0) translateY(0);
          }
          17% {
            transform: rotate(3deg) translateY(0);
          }
          23% {
            transform: rotate(0) translateY(-8px);
          }
          27% {
            transform: rotate(0) translateY(0);
          }
          96% {
            transform: rotate(0) translateY(0);
          }
        }

        @keyframes book-5 {
          4% {
            transform: rotate(0) translateY(0);
          }
          13% {
            transform: rotate(0) translateY(0);
          }
          17% {
            transform: rotate(1.5deg) translateY(0);
          }
          23% {
            transform: rotate(0) translateY(-4px);
          }
          27% {
            transform: rotate(0) translateY(0);
          }
          96% {
            transform: rotate(0) translateY(0);
          }
        }

        @keyframes book-shadow {
          4% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          13% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          23% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          27% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          35% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          96% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Loading Text Animation */
        .loading-text {
          display: flex;
          gap: 4px;
        }

        .letter {
          color: #3fa7a3;
          font-size: 28px;
          font-weight: bold;
          animation: bounce 2s infinite ease-in-out;
        }

        .letter:nth-child(1) { animation-delay: 0.1s; }
        .letter:nth-child(2) { animation-delay: 0.2s; }
        .letter:nth-child(3) { animation-delay: 0.3s; }
        .letter:nth-child(4) { animation-delay: 0.4s; }
        .letter:nth-child(5) { animation-delay: 0.5s; }
        .letter:nth-child(6) { animation-delay: 0.6s; }
        .letter:nth-child(7) { animation-delay: 0.7s; }
        .letter:nth-child(8) { animation-delay: 0.8s; }
        .letter:nth-child(9) { animation-delay: 0.9s; }
        .letter:nth-child(10) { animation-delay: 1s; }

        @keyframes bounce {
          0%, 40%, 100% {
            transform: translateY(0);
          }
          20% {
            transform: translateY(-10px);
          }
        }

        .school-name {
          color: white;
          font-size: 18px;
          letter-spacing: 2px;
          opacity: 0.8;
          animation: fadeInOut 2s infinite;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Success Notification */
        .success-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border-left: 5px solid #28a745;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
          max-width: 400px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .success-content {
          display: flex;
          align-items: center;
          padding: 20px;
          gap: 15px;
        }

        .success-icon {
          flex-shrink: 0;
        }

        .checkmark {
          width: 40px;
          height: 40px;
        }

        .checkmark__circle {
          stroke: #28a745;
          stroke-width: 2;
        }

        .checkmark__check {
          transform-origin: 50% 50%;
          stroke: #28a745;
          stroke-width: 2;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }

        .success-text h3 {
          color: #28a745;
          margin: 0 0 5px 0;
          font-size: 16px;
        }

        .success-text p {
          color: #666;
          margin: 0;
          font-size: 14px;
        }

        .close-notification {
          background: none;
          border: none;
          font-size: 24px;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.3s;
        }

        .close-notification:hover {
          background: #f8f9fa;
          color: #666;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Banner Section */
        .banner-section {
          position: relative;
          height: 70vh;
          min-height: 500px;
          overflow: hidden;
          border-bottom: 6px solid #3fa7a3;
        }

        .banner-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(60%);
        }

        .banner-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40%;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0)
          );
        }

        .banner-content {
          position: absolute;
          bottom: 60px;
          left: 60px;
          max-width: 600px;
          color: #fff;
          z-index: 10;
        }

        .grade-badge {
          display: inline-block;
          background: #3fa7a3;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .banner-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.9);
        }

        .banner-description {
          font-size: 1.2rem;
          line-height: 1.7;
          margin-bottom: 30px;
          text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9);
          opacity: 0.95;
        }

        .banner-stats {
          display: flex;
          gap: 40px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #3fa7a3;
          margin-bottom: 5px;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
        }

        .stat-label {
          font-size: 0.9rem;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .content-section {
          background: #d4d4d4;
          padding: 60px 0;
          border-bottom: 6px solid #000;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 20px;
          color: #000;
          letter-spacing: 2px;
        }

        .title-underline {
          width: 80px;
          height: 6px;
          background: #3fa7a3;
          margin: 0 auto;
        }

        /* Mission Card */
        .mission-card {
          background: #1a1a1a;
          color: #fff;
          padding: 40px;
          border-radius: 10px;
          border: 3px solid #3fa7a3;
          margin-bottom: 50px;
          text-align: center;
        }

        .mission-card h3 {
          color: #3fa7a3;
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        .mission-card p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Overview Grid */
        .overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .overview-card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .overview-card:hover {
          transform: translateY(-10px);
        }

        .card-image {
          height: 250px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          padding: 30px;
        }

        .card-content h4 {
          color: #3fa7a3;
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .card-content p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .card-content ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .card-content li {
          padding: 8px 0;
          border-bottom: 1px solid #eee;
          color: #333;
        }

        .card-content li:before {
          content: "✓ ";
          color: #3fa7a3;
          font-weight: bold;
        }

        /* Requirements Grid */
        .requirements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .requirement-card {
          background: #fff;
          border: 3px solid #3fa7a3;
          padding: 30px;
          border-radius: 10px;
          text-align: center;
        }

        .requirement-card h3 {
          color: #3fa7a3;
          font-size: 1.4rem;
          margin-bottom: 20px;
        }

        .requirement-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .requirement-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .prerequisites-list,
        .documents-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }

        .prerequisites-list li,
        .documents-list li {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .exam-section {
          background: #fff;
          border: 3px solid #3fa7a3;
          padding: 40px;
          border-radius: 10px;
        }

        .exam-section h3 {
          color: #3fa7a3;
          font-size: 2rem;
          margin-bottom: 30px;
          text-align: center;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .subject-card {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
          border-left: 4px solid #3fa7a3;
        }

        .subject-card h4 {
          color: #3fa7a3;
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .subject-card p {
          color: #666;
          margin: 0;
          line-height: 1.5;
        }

        /* Admission Layout */
        .admission-layout {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 40px;
        }

        .admission-sidebar {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .sidebar-card {
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .sidebar-card h3 {
          color: #3fa7a3;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .timeline-item {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #3fa7a3;
        }

        .timeline-date {
          font-weight: bold;
          color: #3fa7a3;
          margin-bottom: 5px;
        }

        .quick-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .status-info {
          text-align: center;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .status-badge.open {
          background: rgba(40, 167, 69, 0.15);
          color: #28a745;
          border: 2px solid rgba(40, 167, 69, 0.3);
        }

        .status-badge.review {
          background: rgba(255, 193, 7, 0.15);
          color: #ffc107;
          border: 2px solid rgba(255, 193, 7, 0.3);
        }

        .status-badge.closed {
          background: rgba(108, 117, 125, 0.15);
          color: #6c757d;
          border: 2px solid rgba(108, 117, 125, 0.3);
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .status-badge.open .status-dot {
          background: #28a745;
          box-shadow: 0 0 10px rgba(40, 167, 69, 0.5);
        }

        .status-badge.review .status-dot {
          background: #ffc107;
          box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
        }

        .status-badge.closed .status-dot {
          background: #6c757d;
          box-shadow: 0 0 10px rgba(108, 117, 125, 0.5);
        }

        .status-message {
          color: #666;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        .students-section,
        .review-section {
          background: #fff;
          padding: 60px 40px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin: 40px 0;
        }

        .students-section h2,
        .review-section h2 {
          color: #333;
          margin-bottom: 20px;
          font-size: 2.2rem;
        }

        .students-placeholder p,
        .review-section p {
          color: #666;
          line-height: 1.6;
          margin: 10px 0;
          font-size: 1.1rem;
        }

        /* Curriculum Section */
        .curriculum-content {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .core-subjects-section h3,
        .extra-activities-section h3,
        .schedule-section h3 {
          color: #3fa7a3;
          font-size: 2rem;
          margin-bottom: 30px;
          text-align: center;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .subject-card {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          border-top: 4px solid #3fa7a3;
        }

        .subject-card h4 {
          color: #3fa7a3;
          font-size: 1.4rem;
          margin-bottom: 15px;
        }

        .subject-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .topics-list h5 {
          color: #333;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }

        .topics-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .topics-list li {
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
          color: #555;
          position: relative;
          padding-left: 20px;
        }

        .topics-list li:before {
          content: "•";
          color: #3fa7a3;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .activity-card {
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #3fa7a3;
        }

        .activity-card h4 {
          color: #3fa7a3;
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .activity-card p {
          color: #666;
          line-height: 1.5;
          margin: 0;
        }

        .schedule-card {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 0 auto;
        }

        .schedule-days {
          text-align: center;
        }

        .schedule-day {
          margin-bottom: 20px;
        }

        .schedule-day strong {
          display: block;
          font-size: 1.2rem;
          color: #3fa7a3;
          margin-bottom: 5px;
        }

        .schedule-breakdown {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .schedule-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        /* Faculty Section */
        .faculty-intro {
          text-align: center;
          margin-bottom: 40px;
          font-size: 1.1rem;
          color: #666;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }

        .teacher-card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .teacher-card:hover {
          transform: translateY(-10px);
        }

        .teacher-image {
          height: 300px;
          overflow: hidden;
        }

        .teacher-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .teacher-info {
          padding: 25px;
        }

        .teacher-info h3 {
          color: #333;
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        .teacher-subject {
          color: #3fa7a3;
          font-weight: bold;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }

        .teacher-qualifications,
        .teacher-experience,
        .teacher-specialization {
          color: #666;
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .teacher-contact {
          border-top: 1px solid #f0f0f0;
          padding-top: 15px;
          margin-top: 15px;
          color: #888;
        }

        .faculty-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 40px;
        }

        .faculty-stats .stat-card {
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          min-width: 150px;
        }

        .faculty-stats .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #3fa7a3;
          margin-bottom: 5px;
        }

        .faculty-stats .stat-label {
          color: #666;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .admission-layout {
            grid-template-columns: 1fr;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .faculty-stats {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 768px) {
          .banner-title {
            font-size: 2.5rem;
          }

          .banner-content {
            left: 30px;
            right: 30px;
            bottom: 40px;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .banner-stats {
            gap: 20px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .subjects-grid {
            grid-template-columns: 1fr;
          }

          .activities-grid {
            grid-template-columns: 1fr;
          }

          .success-notification {
            left: 20px;
            right: 20px;
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .banner-title {
            font-size: 2rem;
          }

          .container {
            padding: 0 15px;
          }

          .section-title {
            font-size: 2.2rem;
          }

          .banner-stats {
            flex-direction: column;
            gap: 20px;
          }

          .faculty-grid {
            grid-template-columns: 1fr;
          }

          .letter {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}
