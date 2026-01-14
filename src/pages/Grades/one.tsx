"use client";

import { useState, useEffect, type Key } from "react";
import type { AdmissionType } from "../../assets/types";
import { createAdmission } from "../../assets/graphql/Controllers";
import { useParams } from "react-router-dom";
import axios from "axios";


interface Teacher {
  id: number;
  name: string;
  email: string;
  age: string;
  phone: string;
  gender: string;
  role: string;
  grade: string;
  academic_year: string;
  profile: string;
  created_at: string;
  updated_at: string;
}

interface ExamMark {
  student_id: number;
  student_name: string;
  total_got_marks: string;
  result: string;
  [subject: string]: number | string | undefined;
}

interface Exam {
  id: number;
  exam_name: string;
  exam_type: string;
  exam_start_date: string;
  exam_end_date: string;
  grade: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ExamResult {
  exam: Exam;
  data: ExamMark[];
}



interface FacilitiesData {
  classrooms: string[];
  laboratories: string[];
  sports: string[];
  others: string[];
}

export default function GradePage() {
  const backend_domain_name = import.meta.env.VITE_BACKEND_DOMAIN_NAME;
  const { grade } = useParams<{ grade: string }>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isAdmissionPeriod, setIsAdmissionPeriod] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "open" | "closed" | "review"
  >("open");
  const [activeTab, setActiveTab] = useState("overview");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const admin_backend_domain_name = import.meta.env.VITE_ADMIN_BACKEND_DOMAIN_NAME;
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Banner data for different grades
  const bannerData: Record<string, { 
    title: string; 
    description: string;
    image: string;
    tagline: string;
  }> = {
    "1": {
      title: "Grade 1: The Beginning of a Beautiful Journey",
      description: "Where young minds blossom through play-based learning, creative exploration, and foundational skill development in a nurturing environment.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Where Learning Begins with Joy"
    },
    "2": {
      title: "Grade 2: Building Confidence Through Discovery",
      description: "Developing curiosity, critical thinking, and academic confidence through structured learning, interactive activities, and enhanced foundational skills.",
      image: "https://images.unsplash.com/photo-1524178234883-043d5c3f3cf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Exploring Knowledge with Confidence"
    },
    "3": {
      title: "Grade 3: Expanding Horizons of Knowledge",
      description: "Fostering independent learning with advanced literacy, numeracy, scientific thinking, and creative expression in a supportive environment.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Where Curiosity Meets Knowledge"
    },
    "4": {
      title: "Grade 4: Mastering Core Academic Excellence",
      description: "Building academic excellence through comprehensive curriculum, enhanced problem-solving skills, critical thinking, and subject mastery.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Excellence in Every Subject"
    },
    "5": {
      title: "Grade 5: Preparing for Advanced Learning",
      description: "Transitioning to complex concepts with emphasis on analytical skills, research methods, comprehensive subject mastery, and leadership development.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Preparing for Academic Excellence"
    },
    "6": {
      title: "Grade 6: Elementary Excellence Culmination",
      description: "Culminating elementary education with advanced academic preparation, leadership skills, research abilities, and readiness for middle school challenges.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Graduating with Distinction"
    },
    "7": {
      title: "Grade 7: Middle School Excellence Begins",
      description: "Transition to specialized subjects with strong academic foundation, enhanced critical thinking, personal development, and scientific inquiry.",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Beginning the Middle School Journey"
    },
    "8": {
      title: "Grade 8: Developing Academic Specialization",
      description: "Advanced subject exploration with emphasis on analytical skills, scientific inquiry, comprehensive academic growth, and research methodology.",
      image: "https://images.unsplash.com/photo-1524178234883-043d5c3f3cf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Specializing in Excellence"
    },
    "9": {
      title: "Grade 9: Building Towards High School Success",
      description: "Preparing for high school with rigorous academics, advanced research skills, focused subject specialization, and college preparation.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Building Future Success"
    },
    "10": {
      title: "Grade 10: High School Excellence and Leadership",
      description: "Comprehensive academic program with advanced coursework, leadership development, university preparation, and career guidance.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Leading with Academic Excellence"
    },
    "11": {
      title: "Grade 11: University Preparation and Specialization",
      description: "Advanced academic specialization, research projects, comprehensive preparation for higher education, and professional development.",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "Preparing for University Life"
    },
    "12": {
      title: "Grade 12: Graduating with Academic Distinction",
      description: "Final year excellence with university entrance preparation, advanced research, leadership development, and readiness for future success.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tagline: "The Final Step to Greatness"
    }
  };

  // Facilities data for different grades
  const facilitiesData: Record<string, FacilitiesData> = {
    "1": {
      classrooms: ["Interactive Smart Classrooms", "Reading Corners", "Play Areas", "Art Stations"],
      laboratories: ["Basic Science Exploration Lab", "Discovery Center"],
      sports: ["Outdoor Play Area", "Indoor Games Room", "Mini Sports Field"],
      others: ["Art Studio", "Music Room", "Computer Lab with Educational Software", "Storytelling Corner"]
    },
    "2": {
      classrooms: ["Digital Classrooms", "Project-Based Learning Areas", "Reading Nooks"],
      laboratories: ["Science Discovery Lab", "Math Manipulatives Center"],
      sports: ["Mini Sports Field", "Swimming Pool (Supervised)", "Playground"],
      others: ["Art & Craft Studio", "Music Room", "Computer Lab", "Library Corner"]
    },
    "3": {
      classrooms: ["Advanced Smart Classrooms", "Group Study Areas", "Presentation Zones"],
      laboratories: ["Science Lab", "Math Lab", "Technology Corner"],
      sports: ["Sports Complex", "Swimming Pool", "Indoor Games"],
      others: ["Art Gallery", "Music Studio", "Computer Programming Lab", "Reading Lounge"]
    },
    "4": {
      classrooms: ["Technology-Enabled Classrooms", "Research Corners", "Collaboration Spaces"],
      laboratories: ["Physics Lab", "Chemistry Lab", "Biology Lab", "Robotics Corner"],
      sports: ["Full Sports Complex", "Gymnasium", "Athletics Track"],
      others: ["Advanced Computer Lab", "Library with Digital Resources", "Auditorium", "Media Center"]
    },
    "5": {
      classrooms: ["Interactive Digital Classrooms", "Seminar Rooms", "Research Pods"],
      laboratories: ["Advanced Science Labs", "Robotics Lab", "Technology Lab"],
      sports: ["Olympic-size Swimming Pool", "Indoor Stadium", "Sports Fields"],
      others: ["Digital Library", "Art Gallery", "Recording Studio", "Innovation Hub"]
    },
    "6": {
      classrooms: ["University-style Lecture Halls", "Research Centers", "Conference Rooms"],
      laboratories: ["Advanced Research Labs", "Technology Labs", "Science Center"],
      sports: ["International Standard Sports Complex", "Fitness Center", "Swimming Complex"],
      others: ["Innovation Center", "Conference Hall", "Career Counseling Center", "Media Production Studio"]
    },
    "7": {
      classrooms: ["Interactive Digital Classrooms", "Seminar Rooms", "Study Lounges"],
      laboratories: ["Science Lab", "Computer Lab", "Technology Center"],
      sports: ["Sports Complex", "Swimming Pool", "Fitness Room"],
      others: ["Library", "Art Room", "Music Room", "Computer Center"]
    },
    "8": {
      classrooms: ["Advanced Digital Classrooms", "Research Rooms", "Discussion Areas"],
      laboratories: ["Physics Lab", "Chemistry Lab", "Biology Lab"],
      sports: ["Full Sports Complex", "Gymnasium", "Outdoor Fields"],
      others: ["Computer Programming Lab", "Library", "Auditorium", "Study Center"]
    },
    "9": {
      classrooms: ["University-style Classrooms", "Group Study Rooms", "Presentation Theaters"],
      laboratories: ["Advanced Science Labs", "Robotics Lab", "Research Center"],
      sports: ["Indoor Stadium", "Athletics Track", "Fitness Complex"],
      others: ["Digital Library", "Art Studio", "Music Recording Studio", "Career Center"]
    },
    "10": {
      classrooms: ["Smart Lecture Halls", "Research Centers", "Seminar Suites"],
      laboratories: ["Advanced Research Labs", "Technology Labs", "Innovation Center"],
      sports: ["International Standard Sports Complex", "Swimming Arena", "Fitness Hub"],
      others: ["Innovation Hub", "Conference Facilities", "Career Center", "Leadership Lounge"]
    },
    "11": {
      classrooms: ["University-style Seminar Rooms", "Research Pods", "Collaboration Zones"],
      laboratories: ["Specialized Research Labs", "Computer Centers", "Advanced Technology Labs"],
      sports: ["Professional Sports Facilities", "Wellness Center", "Recreation Complex"],
      others: ["Advanced Library", "Exhibition Hall", "Student Innovation Center", "Career Development Suite"]
    },
    "12": {
      classrooms: ["Advanced Lecture Theaters", "Research Laboratories", "Graduate Study Rooms"],
      laboratories: ["University-level Research Labs", "Technology Innovation Centers", "Advanced Computing Labs"],
      sports: ["International Competition Facilities", "Elite Training Center", "Wellness Complex"],
      others: ["Graduate Research Center", "Conference Complex", "Alumni Networking Center", "Career Launchpad"]
    }
  };

  const fetchExamResult = async() => {
    try {
      setLoadingProgress(30);
      const response = await axios.get(`${admin_backend_domain_name}api/gradeManager/getMarksByGrade/${grade}`);
      if(response.status == 200){
        setExamResult(response.data);
        setLoadingProgress(60);
      } else if(response.status == 404) {
        setExamResult(null);
        setLoadingProgress(60);
      }
    } catch(err) {
      console.log(err, 'error occured');
      setExamResult(null);
      setLoadingProgress(60);
    }
  }

  const fetchAdmissionStatus = async () => {
    try {
      setLoadingProgress(10);
      const response = await axios.get(
        `${admin_backend_domain_name}api/gradeManager/getAdmissionStatus/${grade}`
      );
      if (response.status === 200) {
        setIsAdmissionPeriod(response.data.data === 'opened');
        setSubmissionStatus(response.data.data === 'opened' ? 'open' : 'closed');
        setLoadingProgress(40);
      }
    } catch (err) {
      console.error("Error fetching admission status:", err);
      setIsAdmissionPeriod(false);
      setSubmissionStatus('closed');
      setLoadingProgress(40);
    }
  };

  const fetchTeachers = async() => {
    try {
      setLoadingProgress(70);
      const response = await axios.get(`${backend_domain_name}api/user/getTeachersByGrade/${grade}`);
      if(response.status == 200) {
        setTeachers(response.data.data);
        setLoadingProgress(90);
      }
    } catch(err) {
      console.log(err);
      setTeachers([]);
      setLoadingProgress(90);
    }
  }

  useEffect(() => {
    const loadAllData = async () => {
      setLoadingProgress(0);
      await fetchAdmissionStatus();
      await fetchExamResult();
      await fetchTeachers();
      setLoadingProgress(100);
      setTimeout(() => {
        setIsPageLoading(false);
      }, 500);
    };

    loadAllData();
  }, [grade]);

  // Get current grade display
  const displayGrade = grade || "7";
  const currentBanner = bannerData[displayGrade] || bannerData["7"];
  const currentFacilities = facilitiesData[displayGrade] || facilitiesData["7"];

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
      const response = await createAdmission(formData, displayGrade);
      console.log(response);
      if (response.status === true) {
        setSubmitSuccess(true);
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

        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((input) => {
          (input as HTMLInputElement).value = "";
        });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError("Failed to submit application. Please try again.");
      }
    } catch (error: unknown) {
      console.error("Submission error:", error);
      if (axios.isAxiosError(error)) {
       if(error.response?.status == 409){
        setSubmitError(error.response.data.message);
        return;
       }
      }
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
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <div className="success-text">
          <h3>Application Submitted Successfully!</h3>
          <p>
            Your admission application for Grade {displayGrade} has been received. We'll
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

  // Enhanced Loading Component
  const EnhancedLoading = () => (
    <div className="enhanced-loading-overlay">
      <div className="loading-container">
        <div className="academic-theme-loader">
          {/* Animated Pencil */}
          <div className="pencil">
            <div className="pencil-body">
              <div className="pencil-tip"></div>
              <div className="pencil-wood"></div>
              <div className="pencil-eraser"></div>
            </div>
          </div>
          
          {/* Animated Notebook */}
          <div className="notebook">
            <div className="notebook-cover"></div>
            <div className="notebook-page page1"></div>
            <div className="notebook-page page2"></div>
            <div className="notebook-page page3"></div>
          </div>
          
          {/* Progress Bar */}
          <div className="loading-progress-container">
            <div className="progress-text">
              Loading Grade {displayGrade} Information...
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="progress-percentage">{loadingProgress}%</div>
            <div className="loading-details">
              <div className="detail-item">
                <div className="detail-dot"></div>
                <span>Loading admission status...</span>
              </div>
              <div className="detail-item">
                <div className="detail-dot"></div>
                <span>Fetching exam results...</span>
              </div>
              <div className="detail-item">
                <div className="detail-dot"></div>
                <span>Loading faculty information...</span>
              </div>
            </div>
          </div>
          
          {/* School Logo and Name */}
          <div className="school-brand">
            <div className="logo-holder">
              <div className="logo-book"></div>
              <div className="logo-pen"></div>
            </div>
            <div className="school-name">
              ASWEDAUL <span className="highlight">ED</span>
            </div>
            <div className="school-tagline">Excellence in Education</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (isPageLoading) {
    return <EnhancedLoading />;
  }

  // Determine which tabs to show
  const tabs = ["overview", "requirements"];
  if (isAdmissionPeriod) {
    tabs.push("admission");
  }
  if (examResult) {
    tabs.push("exam-results");
  }
  tabs.push("faculty");

  return (
    <div className="grade-page">
      {/* Success Notification */}
      {submitSuccess && <SuccessNotification />}

      {/* Enhanced Professional Banner Section */}
      <section className="banner-section">
        <div 
          className="banner-background"
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75)), url(${currentBanner.image})` }}
        >
          <div className="banner-content-wrapper">
            <div className="banner-content">
              <div className="banner-badge">
                <span className="badge-grade">GRADE {displayGrade}</span>
                <div className="badge-divider"></div>
                <span className="badge-tagline">{currentBanner.tagline}</span>
              </div>
              
              <h1 className="banner-title">
                <span className="title-highlight">{currentBanner.title.split(':')[0]}:</span>
                <span className="title-main">{currentBanner.title.split(':')[1]}</span>
              </h1>
              
              <p className="banner-description">
                {currentBanner.description}
              </p>
              
              <div className="banner-cta">
                <div className="cta-badge">
                  <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Admissions {isAdmissionPeriod ? 'Open' : 'Closed'}</span>
                </div>
              </div>
            </div>
            
 
          </div>
          
          <div className="banner-scroll">
            <div className="scroll-indicator">
              <span>Explore More</span>
              <div className="scroll-line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Tabs */}
      <nav className="navigation-tabs">
        <div className="tab-container">
          <div className="tab-scroll">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="tab-icon">
                  {tab === "overview" && "🏫"}
                  {tab === "requirements" && "📋"}
                  {tab === "admission" && "📝"}
                  {tab === "exam-results" && "📊"}
                  {tab === "faculty" && "👨‍🏫"}
                </span>
                <span className="tab-text">
                  {tab === "overview" ? "Overview" : 
                   tab === "exam-results" ? "Exam Results" :
                   tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
                <div className="tab-indicator"></div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="main-container">
        {/* Overview & Facilities Tab */}
        {activeTab === "overview" && (
          <section className="content-section">
            <div className="section-header">
              <div className="section-badge">CURRICULUM</div>
              <h2 className="section-title">Grade {displayGrade} Overview & Facilities</h2>
              <div className="section-subtitle">
                Comprehensive educational program designed for academic excellence
              </div>
            </div>

            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <div className="mission-content">
                <h3>Educational Mission Statement</h3>
                <p>
                  {parseInt(displayGrade) <= 3
                    ? "Build strong foundation in literacy, numeracy, and social skills through interactive learning and creative exploration in a nurturing environment."
                    : parseInt(displayGrade) <= 6
                    ? "Develop critical thinking, advanced academic skills, research abilities, and prepare for middle school challenges with comprehensive curriculum."
                    : parseInt(displayGrade) <= 9
                    ? "Transition to specialized subjects with strong foundation in core academic areas, scientific inquiry, and leadership development."
                    : "Achieve university readiness with advanced academic standards, research projects, leadership development, and career preparation."}
                </p>
              </div>
            </div>

            <div className="overview-cards">
              <div className="overview-card">
                <div className="card-header">
                  <div className="card-icon">📚</div>
                  <h3>Academic Excellence</h3>
                </div>
                <div className="card-image">
                  <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Classroom Learning" />
                  <div className="image-overlay"></div>
                </div>
                <div className="card-content">
                  <p>Comprehensive curriculum designed to meet international standards while preserving Myanmar cultural values and educational traditions.</p>
                  <ul className="feature-list">
                    <li>
                      <span className="feature-icon">✓</span>
                      <span>Modern teaching methodologies</span>
                    </li>
                    <li>
                      <span className="feature-icon">✓</span>
                      <span>Individualized learning paths</span>
                    </li>
                    <li>
                      <span className="feature-icon">✓</span>
                      <span>Regular progress assessments</span>
                    </li>
                    <li>
                      <span className="feature-icon">✓</span>
                      <span>Technology-integrated classrooms</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="overview-card">
                <div className="card-header">
                  <div className="card-icon">🔬</div>
                  <h3>Learning Environment</h3>
                </div>
                <div className="card-image">
                  <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Science Laboratory" />
                  <div className="image-overlay"></div>
                </div>
                <div className="card-content">
                  <p>State-of-the-art facilities and resources designed to support holistic development and innovative learning experiences.</p>
                  <ul className="feature-list">
                    <li>
                      <span className="feature-icon">✓</span>
                      <span>Advanced learning technologies</span>
                    </li>
                    <li>
                      <span className="feature-icon">✓</span>
                      <span>Collaborative learning spaces</span>
                    </li>
                    <li>
                      <span className="feature-icon">✓</span>
                      <span>Research and innovation centers</span>
                    </li>
                    <li>
                      <span className="feature-icon">✓</span>
                      <span>Personalized attention and support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enhanced Facilities Section */}
            <div className="facilities-section">
              <div className="section-header">
                <div className="section-badge">INFRASTRUCTURE</div>
                <h2 className="section-title">School Facilities for Grade {displayGrade}</h2>
              </div>
              
              <div className="facilities-grid">
                {Object.entries(currentFacilities).map(([category, items]) => (
                  <div key={category} className="facility-card">
                    <div className="facility-header">
                      <div className="facility-icon">
                        {category === 'classrooms' && '🏫'}
                        {category === 'laboratories' && '🔬'}
                        {category === 'sports' && '⚽'}
                        {category === 'others' && '🎨'}
                      </div>
                      <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    </div>
                    <ul className="facility-list">
                      {items.map((item: String, index: Key) => (
                        <li key={index}>
                          <span className="list-bullet"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Requirements Tab */}
        {activeTab === "requirements" && (
          <section className="content-section">
            <div className="section-header">
              <div className="section-badge">REQUIREMENTS</div>
              <h2 className="section-title">Admission Requirements for Grade {displayGrade}</h2>
              <div className="section-subtitle">
                Everything you need to know before applying
              </div>
            </div>

            <div className="requirements-cards">
              <div className="requirement-card">
                <div className="card-badge">01</div>
                <div className="card-icon">📋</div>
                <h3>Basic Requirements</h3>
                <div className="requirement-list">
                  <div className="requirement-item">
                    <div className="item-label">Age Range:</div>
                    <div className="item-value">
                      {parseInt(displayGrade) <= 3
                        ? "5-8 years"
                        : parseInt(displayGrade) <= 6
                        ? "9-12 years"
                        : parseInt(displayGrade) <= 9
                        ? "12-15 years"
                        : "15-18 years"}
                    </div>
                  </div>
                  <div className="requirement-item">
                    <div className="item-label">Previous Education:</div>
                    <div className="item-value">Completed previous grade</div>
                  </div>
                  <div className="requirement-item">
                    <div className="item-label">Health Requirement:</div>
                    <div className="item-value">Medically fit for school</div>
                  </div>
                </div>
              </div>

              <div className="requirement-card">
                <div className="card-badge">02</div>
                <div className="card-icon">🎓</div>
                <h3>Academic Prerequisites</h3>
                <ul className="prerequisites-list">
                  {parseInt(displayGrade) <= 3 ? (
                    <>
                      <li>Basic Myanmar language recognition</li>
                      <li>Number counting skills</li>
                      <li>Social interaction skills</li>
                      <li>Basic English alphabet knowledge</li>
                    </>
                  ) : parseInt(displayGrade) <= 6 ? (
                    <>
                      <li>Myanmar literature appreciation</li>
                      <li>Basic mathematics operations</li>
                      <li>English reading comprehension</li>
                      <li>General science knowledge</li>
                    </>
                  ) : parseInt(displayGrade) <= 9 ? (
                    <>
                      <li>Myanmar literature comprehension</li>
                      <li>Algebra and geometry basics</li>
                      <li>English fluency</li>
                      <li>Scientific method understanding</li>
                    </>
                  ) : (
                    <>
                      <li>Advanced critical thinking</li>
                      <li>Research project experience</li>
                      <li>Subject specialization readiness</li>
                      <li>University entrance preparation</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="requirement-card">
                <div className="card-badge">03</div>
                <div className="card-icon">📄</div>
                <h3>Required Documents</h3>
                <ul className="documents-list">
                  {parseInt(displayGrade) <= 3 ? (
                    <>
                      <li>Birth Certificate (Original + Copy)</li>
                      <li>Previous Grade Completion Certificate</li>
                      <li>Medical Certificate</li>
                      <li>4 Recent Passport Photos</li>
                    </>
                  ) : parseInt(displayGrade) <= 6 ? (
                    <>
                      <li>Birth Certificate (Original + Copy)</li>
                      <li>Previous Grade Report Card</li>
                      <li>Medical Certificate</li>
                      <li>Recommendation Letter</li>
                      <li>4 Recent Passport Photos</li>
                    </>
                  ) : parseInt(displayGrade) <= 9 ? (
                    <>
                      <li>Birth Certificate (Original + Copy)</li>
                      <li>Previous Transcript</li>
                      <li>Medical Certificate</li>
                      <li>Recommendation Letters (2)</li>
                      <li>4 Recent Passport Photos</li>
                    </>
                  ) : (
                    <>
                      <li>Birth Certificate (Original + Copy)</li>
                      <li>Previous Transcript</li>
                      <li>Medical Certificate</li>
                      <li>Recommendation Letters (2)</li>
                      <li>Recent ID Photos</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Enhanced Exam Section */}
            <div className="exam-section">
              <div className="section-header">
                <div className="section-badge">EXAMINATION</div>
                <h2 className="section-title">Entrance Examination Subjects</h2>
              </div>
              
              <div className="subjects-grid">
                <div className="subject-card">
                  <div className="subject-icon">🇲🇲</div>
                  <div className="subject-content">
                    <h4>Myanmar Language</h4>
                    <p>Reading comprehension, writing skills, grammar, and language proficiency assessment</p>
                    <div className="subject-duration">Duration: 2 Hours</div>
                  </div>
                </div>
                
                <div className="subject-card">
                  <div className="subject-icon">🇬🇧</div>
                  <div className="subject-content">
                    <h4>English Language</h4>
                    <p>Grammar, vocabulary, reading comprehension, and writing skills evaluation</p>
                    <div className="subject-duration">Duration: 2 Hours</div>
                  </div>
                </div>
                
                <div className="subject-card">
                  <div className="subject-icon">🔢</div>
                  <div className="subject-content">
                    <h4>Mathematics</h4>
                    <p>Problem-solving, analytical thinking, and mathematical reasoning skills</p>
                    <div className="subject-duration">Duration: 2.5 Hours</div>
                  </div>
                </div>
                
                {parseInt(displayGrade) >= 4 && (
                  <div className="subject-card">
                    <div className="subject-icon">🔬</div>
                    <div className="subject-content">
                      <h4>Science</h4>
                      <p>General science knowledge, scientific thinking, and basic concepts</p>
                      <div className="subject-duration">Duration: 2 Hours</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Admission Tab - Enhanced wrapper with existing form */}
        {activeTab === "admission" && isAdmissionPeriod && (
          <section className="content-section">
            <div className="admission-header">
              <div className="section-header">
                <div className="section-badge">APPLICATION</div>
                <h2 className="section-title">Apply for Grade {displayGrade} Admission</h2>
                <div className="section-subtitle">
                  Complete the form below to start your application process
                </div>
              </div>
              
              <div className="admission-status">
                <div className="status-indicator">
                  <div className={`status-dot ${submissionStatus}`}></div>
                  <span className="status-text">
                    {submissionStatus === "open" ? "Admissions Open" : 
                     submissionStatus === "review" ? "Under Review" : 
                     "Selection Complete"}
                  </span>
                </div>
                <div className="status-deadline">
                  <svg className="clock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Deadline: December 31, 2024
                </div>
              </div>
            </div>

            <div className="admission-layout">
              <div className="admission-sidebar">
                <div className="sidebar-card">
                  <div className="sidebar-header">
                    <div className="sidebar-icon">📅</div>
                    <h3>Admission Timeline</h3>
                  </div>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-date">Dec 1-31, 2024</div>
                        <div className="timeline-title">Application Period</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-date">Jan 5-10, 2025</div>
                        <div className="timeline-title">Entrance Exams</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-date">Jan 15, 2025</div>
                        <div className="timeline-title">Results Announcement</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-card">
                  <div className="sidebar-header">
                    <div className="sidebar-icon">ℹ️</div>
                    <h3>Quick Information</h3>
                  </div>
                  <div className="quick-info">
                    <div className="info-item">
                      <span className="info-label">Age Requirement:</span>
                      <span className="info-value">
                        {parseInt(displayGrade) <= 3
                          ? "5-8 years"
                          : parseInt(displayGrade) <= 6
                          ? "9-12 years"
                          : parseInt(displayGrade) <= 9
                          ? "12-15 years"
                          : "15-18 years"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Documents Needed:</span>
                      <span className="info-value">
                        {parseInt(displayGrade) <= 3
                          ? "4 items"
                          : parseInt(displayGrade) <= 6
                          ? "5 items"
                          : "5 items"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Exam Subjects:</span>
                      <span className="info-value">
                        {parseInt(displayGrade) >= 4 ? "4 Subjects" : "3 Subjects"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-card">
                  <div className="sidebar-header">
                    <div className="sidebar-icon">📞</div>
                    <h3>Need Help?</h3>
                  </div>
                  <div className="help-info">
                    <p>Contact our admission office for assistance:</p>
                    <div className="contact-item">
                      <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+95 1 234 5678</span>
                    </div>
                    <div className="contact-item">
                      <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>admissions@aswedaul.edu</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Original Form (Kept exactly as is) */}
              <div className="admission-form-container">
                <div className="form-wrapper">
                  {submitError && (
                    <div className="error-banner">
                      <div className="error-content">
                        <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p>{submitError}</p>
                      </div>
                    </div>
                  )}
                  
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
                              Grade {displayGrade}
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
                                  placeholder={`e.g., ${parseInt(displayGrade) <= 3 ? "6" : parseInt(displayGrade) <= 6 ? "10" : parseInt(displayGrade) <= 9 ? "13" : "16"}`}
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
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Exam Results Tab */}
        {activeTab === "exam-results" && examResult && (
          <section className="content-section">
            <div className="section-header">
              <div className="section-badge">ACADEMICS</div>
              <h2 className="section-title">Exam Results - Grade {displayGrade}</h2>
              <div className="section-subtitle">
                Comprehensive performance analysis and student rankings
              </div>
            </div>

            <div className="exam-header">
              <div className="exam-info-card">
                <div className="exam-badge">📊 {examResult.exam.exam_type.replace('_', ' ').toUpperCase()}</div>
                <h3>{examResult.exam.exam_name}</h3>
                <div className="exam-details-grid">
                  <div className="exam-detail">
                    <div className="detail-icon">📅</div>
                    <div className="detail-content">
                      <div className="detail-label">Exam Dates</div>
                      <div className="detail-value">
                        {new Date(examResult.exam.exam_start_date).toLocaleDateString()} - {new Date(examResult.exam.exam_end_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="exam-detail">
                    <div className="detail-icon">👥</div>
                    <div className="detail-content">
                      <div className="detail-label">Total Students</div>
                      <div className="detail-value">{examResult.data.length} Students</div>
                    </div>
                  </div>
                  <div className="exam-detail">
                    <div className="detail-icon">📈</div>
                    <div className="detail-content">
                      <div className="detail-label">Status</div>
                      <div className={`status-badge ${examResult.exam.status}`}>
                        {examResult.exam.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="results-summary-section">
              <div className="summary-header">
                <h3>Performance Overview</h3>
                <p>Comprehensive analysis of student performance across all subjects</p>
              </div>
              
              <div className="summary-grid">
                <div className="summary-card">
                  <div className="summary-icon">🎯</div>
                  <div className="summary-content">
                    <div className="summary-value">{examResult.data.filter(m => m.result === 'pass').length}</div>
                    <div className="summary-label">Students Passed</div>
                    <div className="summary-percentage">
                      {((examResult.data.filter(m => m.result === 'pass').length / examResult.data.length) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="summary-card">
                  <div className="summary-icon">📉</div>
                  <div className="summary-content">
                    <div className="summary-value">{examResult.data.filter(m => m.result === 'fail').length}</div>
                    <div className="summary-label">Students Failed</div>
                    <div className="summary-percentage">
                      {((examResult.data.filter(m => m.result === 'fail').length / examResult.data.length) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="summary-card">
                  <div className="summary-icon">📊</div>
                  <div className="summary-content">
                    <div className="summary-value">
                      {examResult.data.length > 0 
                        ? (examResult.data.reduce((acc, m) => acc + parseFloat(m.total_got_marks), 0) / examResult.data.length).toFixed(2)
                        : '0.00'
                      }
                    </div>
 
                  </div>
                </div>
                
                <div className="summary-card">
                  <div className="summary-icon">🏆</div>
                  <div className="summary-content">
                    <div className="summary-value">
                      {examResult.data.length > 0 
                        ? Math.max(...examResult.data.map(m => parseFloat(m.total_got_marks))).toFixed(2)
                        : '0.00'
                      }
                    </div>
                    <div className="summary-label">Highest Score</div>
                    <div className="summary-rank">Top Performer</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="results-table-section">
              <div className="table-header">
                <h3>Student Performance Rankings</h3>
                <div className="table-actions">
                  <div className="sort-indicator">
                    <svg className="sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                    Sorted by Total Marks
                  </div>
                </div>
              </div>

              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th className="rank-header">Rank</th>
                      <th className="student-header">Student Name</th>
                      <th className="subject-header">Myanmar</th>
                      <th className="subject-header">English</th>
                      <th className="subject-header">Mathematics</th>
                      {examResult.data[0]?.Physics && <th className="subject-header">Physics</th>}
                      {examResult.data[0]?.Chemistry && <th className="subject-header">Chemistry</th>}
                      {examResult.data[0]?.Biology && <th className="subject-header">Biology</th>}
                      <th className="total-header">Total Marks</th>
                      <th className="result-header">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examResult.data
                      .sort((a, b) => parseFloat(b.total_got_marks) - parseFloat(a.total_got_marks))
                      .map((mark, index) => (
                        <tr key={mark.student_id} className={index < 3 ? 'top-performer' : ''}>
                          <td className="rank-cell">
                            <div className={`rank-badge rank-${index + 1}`}>
                              {index + 1}
                              {index < 3 && <span className="rank-medal">🏆</span>}
                            </div>
                          </td>
                          <td className="student-cell">
                            <div className="student-info">
                              <div className="student-name">{mark.student_name}</div>
                              <div className="student-id">ID: {mark.student_id}</div>
                            </div>
                          </td>
                          <td className={`score-cell ${parseInt(mark.Myanmar as string) < 40 ? 'fail' : 'pass'}`}>
                            {mark.Myanmar || 'N/A'}
                            <div className="score-bar">
                              <div className="bar-fill" style={{ width: `${parseInt(mark.Myanmar as string) || 0}%` }}></div>
                            </div>
                          </td>
                          <td className={`score-cell ${parseInt(mark.English as string) < 40 ? 'fail' : 'pass'}`}>
                            {mark.English || 'N/A'}
                            <div className="score-bar">
                              <div className="bar-fill" style={{ width: `${parseInt(mark.English as string) || 0}%` }}></div>
                            </div>
                          </td>
                          <td className={`score-cell ${parseInt(mark.Mathematics as string) < 40 ? 'fail' : 'pass'}`}>
                            {mark.Mathematics || 'N/A'}
                            <div className="score-bar">
                              <div className="bar-fill" style={{ width: `${parseInt(mark.Mathematics as string) || 0}%` }}></div>
                            </div>
                          </td>
                          {mark.Physics && (
                            <td className={`score-cell ${parseInt(mark.Physics as string) < 40 ? 'fail' : 'pass'}`}>
                              {mark.Physics}
                              <div className="score-bar">
                                <div className="bar-fill" style={{ width: `${parseInt(mark.Physics as string) || 0}%` }}></div>
                              </div>
                            </td>
                          )}
                          {mark.Chemistry && (
                            <td className={`score-cell ${parseInt(mark.Chemistry as string) < 40 ? 'fail' : 'pass'}`}>
                              {mark.Chemistry}
                              <div className="score-bar">
                                <div className="bar-fill" style={{ width: `${parseInt(mark.Chemistry as string) || 0}%` }}></div>
                            </div>
                            </td>
                          )}
                          {mark.Biology && (
                            <td className={`score-cell ${parseInt(mark.Biology as string) < 40 ? 'fail' : 'pass'}`}>
                              {mark.Biology}
                              <div className="score-bar">
                                <div className="bar-fill" style={{ width: `${parseInt(mark.Biology as string) || 0}%` }}></div>
                              </div>
                            </td>
                          )}
                          <td className="total-cell">
                            <div className="total-score">
                              <strong>{parseFloat(mark.total_got_marks).toFixed(2)}</strong>
                              <div className="score-progress">
                                <div className="progress-bar">
                                  <div className="progress-fill" style={{ 
                                    width: `${(parseFloat(mark.total_got_marks) / 
                                      (Object.keys(mark).filter(k => !['student_id', 'student_name', 'total_got_marks', 'result'].includes(k))
                                        .length * 100)) * 100}%`
                                  }}></div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="result-cell">
                            <span className={`result-badge ${mark.result}`}>
                              {mark.result.toUpperCase()}
                              <svg className="result-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mark.result === 'pass' ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                )}
                              </svg>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Faculty Tab */}
        {activeTab === "faculty" && (
          <section className="content-section">
            <div className="section-header">
              <div className="section-badge">FACULTY</div>
              <h2 className="section-title">Teaching Faculty - Grade {displayGrade}</h2>
              <div className="section-subtitle">
                Meet our dedicated team of experienced educators committed to excellence
              </div>
            </div>

            <div className="faculty-intro">
              <div className="intro-card">
                <div className="intro-icon">👨‍🏫</div>
                <div className="intro-content">
                  <h3>Expert Faculty Team</h3>
                  <p>
                    Our dedicated team of experienced educators is committed to providing 
                    the highest quality education and personalized attention to each student in Grade {displayGrade}.
                  </p>
                </div>
              </div>
            </div>

            {teachers.length > 0 ? (
              <>
                <div className="faculty-grid">
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="teacher-card">
                      <div className="teacher-image-container">
                        <div className="teacher-image">
                          <img 
                            src={teacher.profile ? `${backend_domain_name}${teacher.profile}` : "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                            alt={teacher.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                            }}
                          />
                        </div>
                        <div className="teacher-grade-badge">Grade {teacher.grade}</div>
                        <div className="teacher-role">{teacher.role || 'Subject Teacher'}</div>
                      </div>
                      
                      <div className="teacher-info">
                        <h3>{teacher.name}</h3>
                        
                        <div className="teacher-details">
                          <div className="detail-item">
                            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{teacher.email}</span>
                          </div>
                          <div className="detail-item">
                            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{teacher.phone}</span>
                          </div>
                          <div className="detail-item">
                            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Academic Year: {teacher.academic_year}</span>
                          </div>
                        </div>
                        
                        <div className="teacher-bio">
                          <p>
                            Dedicated to teaching Grade {teacher.grade} students with 
                            personalized attention and modern teaching methodologies.
                          </p>
                        </div>
                        
                        <div className="teacher-contact">
                          <button className="contact-button">
                            <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="faculty-stats-section">
                  <div className="stats-header">
                    <h3>Faculty Statistics</h3>
                    <p>Key metrics about our teaching staff</p>
                  </div>
                  
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">👨‍🏫</div>
                      <div className="stat-content">
                        <div className="stat-number">{teachers.length}</div>
                        <div className="stat-label">Dedicated Teachers</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">📊</div>
                      <div className="stat-content">
                        <div className="stat-number">{parseInt(displayGrade) <= 3 ? "20:1" : "15:1"}</div>
                        <div className="stat-label">Student-Teacher Ratio</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">🎓</div>
                      <div className="stat-content">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Qualified Faculty</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">⏰</div>
                      <div className="stat-content">
                        <div className="stat-number">5+</div>
                        <div className="stat-label">Average Years Experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-teachers-message">
                <div className="no-teachers-icon">👨‍🏫</div>
                <h3>Faculty Information Coming Soon</h3>
                <p>Teacher information for Grade {displayGrade} will be updated soon.</p>
                <p>Please check back later for faculty details.</p>
              </div>
            )}
          </section>
        )}
      </main>

      <style>{`
        /* Base Styles */
        .grade-page {
          background: #d4d4d4;
          min-height: 100vh;
          font-family: "Bebas Neue", Arial, sans-serif;
        }

        /* Enhanced Loading Overlay */
        .enhanced-loading-overlay {
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
          overflow: hidden;
        }

        .loading-container {
          width: 100%;
          max-width: 600px;
          padding: 40px;
        }

        .academic-theme-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        /* Animated Pencil */
        .pencil {
          width: 200px;
          height: 30px;
          position: relative;
          animation: pencil-write 3s ease-in-out infinite;
        }

        .pencil-body {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
        }

        .pencil-tip {
          width: 20px;
          height: 100%;
          background: linear-gradient(45deg, #ff6b6b, #ffa8a8);
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          position: absolute;
          left: 0;
        }

        .pencil-wood {
          width: 160px;
          height: 100%;
          background: linear-gradient(90deg, #d4a574, #f8e3c8);
          position: absolute;
          left: 20px;
          border-radius: 0 15px 15px 0;
        }

        .pencil-eraser {
          width: 20px;
          height: 100%;
          background: #ff6b6b;
          position: absolute;
          right: 0;
          border-radius: 0 15px 15px 0;
        }

        @keyframes pencil-write {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(100px) rotate(5deg);
          }
          50% {
            transform: translateX(200px) rotate(0deg);
          }
          75% {
            transform: translateX(100px) rotate(-5deg);
          }
        }

        /* Animated Notebook */
        .notebook {
          width: 200px;
          height: 150px;
          position: relative;
          perspective: 1000px;
        }

        .notebook-cover {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #3fa7a3, #2d8986);
          border-radius: 8px;
          position: absolute;
          transform-origin: left;
          animation: notebook-open 3s ease-in-out infinite;
        }

        .notebook-page {
          position: absolute;
          width: 95%;
          height: 95%;
          background: white;
          border-radius: 4px;
          left: 2.5%;
          top: 2.5%;
          transform-origin: left;
        }

        .notebook-page.page1 {
          animation: page-flip-1 3s ease-in-out infinite;
          z-index: 3;
        }

        .notebook-page.page2 {
          animation: page-flip-2 3s ease-in-out infinite;
          z-index: 2;
        }

        .notebook-page.page3 {
          animation: page-flip-3 3s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes notebook-open {
          0%, 100% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-20deg);
          }
        }

        @keyframes page-flip-1 {
          0%, 100% {
            transform: rotateY(0deg);
          }
          33% {
            transform: rotateY(-180deg);
          }
          66%, 100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes page-flip-2 {
          0%, 33% {
            transform: rotateY(0deg);
          }
          66% {
            transform: rotateY(-180deg);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes page-flip-3 {
          0%, 66% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }

        /* Progress Bar */
        .loading-progress-container {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          padding: 30px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .progress-text {
          color: white;
          font-size: 18px;
          text-align: center;
          margin-bottom: 20px;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3fa7a3, #2d8986);
          border-radius: 6px;
          transition: width 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .progress-percentage {
          color: #3fa7a3;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 20px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .loading-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .detail-item:nth-child(1) {
          animation-delay: 0.2s;
        }
        .detail-item:nth-child(2) {
          animation-delay: 0.4s;
        }
        .detail-item:nth-child(3) {
          animation-delay: 0.6s;
        }

        .detail-dot {
          width: 8px;
          height: 8px;
          background: #3fa7a3;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* School Brand */
        .school-brand {
          text-align: center;
          margin-top: 30px;
          animation: fadeIn 1s ease-out;
        }

        .logo-holder {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          position: relative;
        }

        .logo-book {
          width: 60px;
          height: 40px;
          background: #3fa7a3;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 4px;
          animation: book-float 3s ease-in-out infinite;
        }

        .logo-book::before {
          content: '';
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          bottom: 5px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .logo-pen {
          width: 40px;
          height: 4px;
          background: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          animation: pen-float 3s ease-in-out infinite;
        }

        @keyframes book-float {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -55%) rotate(5deg);
          }
        }

        @keyframes pen-float {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(45deg);
          }
          50% {
            transform: translate(-45%, -55%) rotate(40deg);
          }
        }

        .school-name {
          color: white;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }

        .school-name .highlight {
          color: #3fa7a3;
        }

        .school-tagline {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Enhanced Banner Styles */
        .banner-section {
          position: relative;
          height: 85vh;
          min-height: 600px;
          overflow: hidden;
        }

        .banner-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .banner-content-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 80px 60px 40px;
          height: 100%;
        }

        .banner-content {
          flex: 1;
          max-width: 65%;
          color: white;
          padding-top: 40px;
        }

        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 40px;
          background: rgba(63, 167, 163, 0.2);
          backdrop-filter: blur(10px);
          padding: 12px 25px;
          border-radius: 30px;
          border: 1px solid rgba(63, 167, 163, 0.3);
        }

        .badge-grade {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #3fa7a3;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .badge-divider {
          width: 2px;
          height: 20px;
          background: rgba(255, 255, 255, 0.3);
        }

        .badge-tagline {
          font-size: 1.1rem;
          font-style: italic;
          opacity: 0.9;
        }

        .banner-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 25px;
          line-height: 1.1;
          text-shadow: 2px 4px 12px rgba(0, 0, 0, 0.6);
        }

        .title-highlight {
          color: #3fa7a3;
          display: block;
          font-size: 3.5rem;
          margin-bottom: 5px;
        }

        .title-main {
          display: block;
          font-size: 3rem;
          color: white;
        }

        .banner-description {
          font-size: 1.3rem;
          line-height: 1.8;
          margin-bottom: 40px;
          max-width: 600px;
          opacity: 0.95;
          font-weight: 300;
        }

        .banner-cta {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(63, 167, 163, 0.15);
          padding: 12px 25px;
          border-radius: 25px;
          border: 2px solid rgba(63, 167, 163, 0.3);
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .cta-badge:hover {
          background: rgba(63, 167, 163, 0.25);
          transform: translateY(-2px);
        }

        .cta-icon {
          width: 20px;
          height: 20px;
        }

        .banner-stats {
          flex: 0 0 350px;
          margin-left: 40px;
        }

        .stats-grid {
          display: grid;
          gap: 20px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }

        .stat-card.highlight {
          background: rgba(255, 107, 107, 0.15);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .stat-value {
          font-size: 2.8rem;
          font-weight: 800;
          color: #3fa7a3;
          margin-bottom: 8px;
          display: flex;
          align-items: baseline;
          gap: 5px;
        }

        .stat-card.highlight .stat-value {
          color: #ff6b6b;
        }

        .stat-percent {
          font-size: 1.5rem;
          opacity: 0.8;
        }

        .stat-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 10px;
          font-weight: 500;
        }

        .stat-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #3fa7a3, #2d8986);
          border-radius: 2px;
        }

        .new-badge {
          background: #ff6b6b;
          color: white;
          font-size: 0.9rem;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .stat-link {
          font-size: 0.9rem;
          color: #3fa7a3;
          margin-top: 10px;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover .stat-link {
          opacity: 1;
        }

        .banner-scroll {
          padding: 30px;
          text-align: center;
        }

        .scroll-indicator {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          letter-spacing: 1px;
          animation: bounce 2s infinite;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #3fa7a3, transparent);
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        /* Enhanced Navigation Tabs */
        .navigation-tabs {
          background: #fff;
          border-bottom: 2px solid #f0f0f0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
        }

        .tab-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .tab-scroll {
          display: flex;
          overflow-x: auto;
          padding: 15px 0;
          gap: 1px;
        }

        .tab-scroll::-webkit-scrollbar {
          display: none;
        }

        .tab-item {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 15px 25px;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .tab-item:hover {
          background: rgba(63, 167, 163, 0.05);
        }

        .tab-item.active {
          background: rgba(63, 167, 163, 0.1);
        }

        .tab-icon {
          font-size: 1.8rem;
          margin-bottom: 5px;
        }

        .tab-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #333;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .tab-item.active .tab-text {
          color: #3fa7a3;
        }

        .tab-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: #3fa7a3;
          border-radius: 2px 2px 0 0;
          transition: width 0.3s ease;
        }

        .tab-item.active .tab-indicator {
          width: 80%;
        }

        /* Main Container */
        .main-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px;
          background: #d4d4d4;
        }

        .content-section {
          margin-bottom: 80px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-badge {
          display: inline-block;
          background: #3fa7a3;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          color: #000;
          margin-bottom: 15px;
          letter-spacing: -0.5px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Mission Card */
        .mission-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
          padding: 50px;
          border-radius: 20px;
          border-left: 5px solid #3fa7a3;
          margin-bottom: 60px;
          display: flex;
          align-items: flex-start;
          gap: 30px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .mission-icon {
          font-size: 3.5rem;
          flex-shrink: 0;
        }

        .mission-content h3 {
          color: #3fa7a3;
          font-size: 1.8rem;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .mission-content p {
          font-size: 1.2rem;
          line-height: 1.8;
          margin: 0;
          font-weight: 300;
          opacity: 0.9;
        }

        /* Overview Cards */
        .overview-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        .overview-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .overview-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          padding: 30px 30px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .card-icon {
          font-size: 2rem;
        }

        .card-header h3 {
          color: #3fa7a3;
          font-size: 1.5rem;
          margin: 0;
        }

        .card-image {
          height: 250px;
          position: relative;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .overview-card:hover .card-image img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
        }

        .card-content {
          padding: 25px 30px 35px;
        }

        .card-content p {
          color: #666;
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .feature-list li:last-child {
          border-bottom: none;
        }

        .feature-icon {
          color: #3fa7a3;
          font-weight: bold;
          font-size: 1.1rem;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(63, 167, 163, 0.1);
          border-radius: 50%;
        }

        /* Facilities Section */
        .facilities-section {
          background: white;
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .facility-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 15px;
          border-left: 4px solid #3fa7a3;
          transition: transform 0.3s ease;
        }

        .facility-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .facility-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .facility-icon {
          font-size: 2.2rem;
        }

        .facility-header h4 {
          color: #3fa7a3;
          font-size: 1.3rem;
          margin: 0;
        }

        .facility-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .facility-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          color: #555;
        }

        .list-bullet {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          background: #3fa7a3;
          border-radius: 50%;
          margin-top: 8px;
        }

        /* Requirements Cards */
        .requirements-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .requirement-card {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          border: 2px solid #3fa7a3;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .requirement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .card-badge {
          position: absolute;
          top: -15px;
          left: 30px;
          background: #3fa7a3;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
          text-align: center;
        }

        .requirement-card h3 {
          color: #3fa7a3;
          font-size: 1.4rem;
          margin-bottom: 25px;
          text-align: center;
        }

        .requirement-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .requirement-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }

        .item-label {
          color: #666;
          font-weight: 500;
        }

        .item-value {
          color: #333;
          font-weight: 600;
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
          position: relative;
          padding-left: 25px;
          color: #555;
        }

        .prerequisites-list li:before,
        .documents-list li:before {
          content: "•";
          color: #3fa7a3;
          font-size: 1.5rem;
          position: absolute;
          left: 0;
          top: 5px;
        }

        /* Enhanced Exam Section */
        .exam-section {
          background: white;
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .subject-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          padding: 30px;
          border-radius: 15px;
          border: 2px solid rgba(63, 167, 163, 0.1);
          display: flex;
          align-items: flex-start;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .subject-card:hover {
          border-color: #3fa7a3;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(63, 167, 163, 0.15);
        }

        .subject-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .subject-content {
          flex: 1;
        }

        .subject-content h4 {
          color: #3fa7a3;
          font-size: 1.3rem;
          margin: 0 0 10px 0;
        }

        .subject-content p {
          color: #666;
          line-height: 1.6;
          margin: 0 0 15px 0;
          font-size: 0.95rem;
        }

        .subject-duration {
          font-size: 0.9rem;
          color: #3fa7a3;
          font-weight: 600;
          padding-top: 10px;
          border-top: 1px solid rgba(63, 167, 163, 0.2);
        }

        /* Enhanced Admission Section */
        .admission-header {
          background: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .admission-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-dot.open {
          background: #28a745;
          box-shadow: 0 0 0 4px rgba(40, 167, 69, 0.2);
        }

        .status-dot.review {
          background: #ffc107;
          box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.2);
        }

        .status-dot.closed {
          background: #dc3545;
          box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.2);
        }

        .status-text {
          font-weight: 600;
          font-size: 1.1rem;
          color: #333;
        }

        .status-deadline {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #666;
          font-weight: 500;
        }

        .clock-icon {
          width: 18px;
          height: 18px;
          color: #3fa7a3;
        }

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
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .sidebar-icon {
          font-size: 1.8rem;
        }

        .sidebar-card h3 {
          color: #3fa7a3;
          font-size: 1.2rem;
          margin: 0;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .timeline-item {
          display: flex;
          gap: 15px;
          position: relative;
        }

        .timeline-item:not(:last-child):after {
          content: '';
          position: absolute;
          left: 6px;
          top: 25px;
          bottom: -25px;
          width: 2px;
          background: #e0e0e0;
        }

        .timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #3fa7a3;
          flex-shrink: 0;
          margin-top: 5px;
          position: relative;
          z-index: 1;
        }

        .timeline-content {
          flex: 1;
        }

        .timeline-date {
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .timeline-title {
          color: #666;
          font-size: 0.95rem;
        }

        .quick-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #666;
          font-size: 0.95rem;
        }

        .info-value {
          color: #3fa7a3;
          font-weight: 600;
          font-size: 1rem;
        }

        .help-info {
          font-size: 0.95rem;
          color: #666;
        }

        .help-info p {
          margin-bottom: 20px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
        }

        .contact-icon {
          width: 18px;
          height: 18px;
          color: #3fa7a3;
          flex-shrink: 0;
        }

        .contact-item span {
          color: #333;
          font-weight: 500;
        }

        .admission-form-container {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .form-wrapper {
          padding: 0;
        }

        .error-banner {
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .error-content {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #d32f2f;
        }

        .error-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        /* Enhanced Exam Results Section */
        .exam-header {
          margin-bottom: 40px;
        }

        .exam-info-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          border: 2px solid #3fa7a3;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .exam-badge {
          display: inline-block;
          background: #3fa7a3;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .exam-info-card h3 {
          color: #3fa7a3;
          font-size: 2rem;
          margin-bottom: 30px;
        }

        .exam-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
        }

        .exam-detail {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .detail-icon {
          font-size: 2rem;
        }

        .detail-content {
          flex: 1;
        }

        .detail-label {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .detail-value {
          color: #333;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .status-badge.marked {
          background: rgba(40, 167, 69, 0.15);
          color: #28a745;
        }

        /* Results Summary Section */
        .results-summary-section {
          background: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .summary-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .summary-header h3 {
          color: #3fa7a3;
          font-size: 1.8rem;
          margin-bottom: 10px;
        }

        .summary-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .summary-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s ease;
        }

        .summary-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .summary-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .summary-content {
          flex: 1;
        }

        .summary-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #3fa7a3;
          margin-bottom: 5px;
        }

        .summary-label {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 10px;
        }

        .summary-percentage {
          color: #28a745;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .summary-rank {
          color: #ff6b6b;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .summary-progress {
          margin-top: 10px;
        }

        /* Results Table Section */
        .results-table-section {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .table-header h3 {
          color: #3fa7a3;
          font-size: 1.8rem;
          margin: 0;
        }

        .table-actions {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .sort-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .sort-icon {
          width: 16px;
          height: 16px;
        }

        .results-table-container {
          overflow-x: auto;
        }

        .results-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1000px;
        }

        .results-table th {
          background: #f8f9fa;
          padding: 20px 15px;
          text-align: left;
          font-weight: 600;
          color: #3fa7a3;
          border-bottom: 2px solid #3fa7a3;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .results-table td {
          padding: 20px 15px;
          border-bottom: 1px solid #eee;
          vertical-align: middle;
        }

        .results-table tbody tr {
          transition: background-color 0.3s ease;
        }

        .results-table tbody tr:hover {
          background-color: #f8f9fa;
        }

        .results-table tbody tr.top-performer {
          background-color: rgba(255, 215, 0, 0.05);
        }

        .rank-cell {
          width: 80px;
        }

        .rank-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1.2rem;
          color: white;
          position: relative;
        }

        .rank-1 {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
        }

        .rank-2 {
          background: linear-gradient(135deg, #C0C0C0, #A0A0A0);
          box-shadow: 0 4px 15px rgba(192, 192, 192, 0.3);
        }

        .rank-3 {
          background: linear-gradient(135deg, #CD7F32, #A0522D);
          box-shadow: 0 4px 15px rgba(205, 127, 50, 0.3);
        }

        .rank-badge:not(.rank-1):not(.rank-2):not(.rank-3) {
          background: #3fa7a3;
          box-shadow: 0 4px 15px rgba(63, 167, 163, 0.3);
        }

        .rank-medal {
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 1rem;
        }

        .student-cell {
          min-width: 200px;
        }

        .student-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .student-name {
          font-weight: 600;
          color: #333;
        }

        .student-id {
          font-size: 0.85rem;
          color: #666;
        }

        .score-cell {
          min-width: 100px;
        }

        .score-cell.pass {
          color: #28a745;
          font-weight: 600;
        }

        .score-cell.fail {
          color: #dc3545;
          font-weight: 600;
        }

        .score-bar {
          width: 100%;
          height: 4px;
          background: #f0f0f0;
          border-radius: 2px;
          margin-top: 8px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: #3fa7a3;
          border-radius: 2px;
        }

        .total-cell {
          min-width: 120px;
        }

        .total-score {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .total-score strong {
          font-size: 1.2rem;
          color: #333;
        }

        .score-progress {
          width: 100%;
        }

        .result-cell {
          min-width: 120px;
        }

        .result-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .result-badge.pass {
          background: rgba(40, 167, 69, 0.15);
          color: #28a745;
        }

        .result-badge.fail {
          background: rgba(220, 53, 69, 0.15);
          color: #dc3545;
        }

        .result-icon {
          width: 16px;
          height: 16px;
        }

        /* Enhanced Faculty Section */
        .faculty-intro {
          margin-bottom: 60px;
        }

        .intro-card {
          background: linear-gradient(135deg, #3fa7a3, #2d8986);
          color: white;
          padding: 40px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 30px;
          box-shadow: 0 15px 40px rgba(63, 167, 163, 0.2);
        }

        .intro-icon {
          font-size: 3.5rem;
          flex-shrink: 0;
        }

        .intro-content h3 {
          font-size: 1.8rem;
          margin-bottom: 15px;
        }

        .intro-content p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          margin: 0;
        }

        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .teacher-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .teacher-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .teacher-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .teacher-image {
          width: 100%;
          height: 100%;
        }

        .teacher-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .teacher-card:hover .teacher-image img {
          transform: scale(1.05);
        }

        .teacher-grade-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #3fa7a3;
          color: white;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .teacher-role {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .teacher-info {
          padding: 30px;
        }

        .teacher-info h3 {
          color: #3fa7a3;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .teacher-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #666;
          font-size: 0.95rem;
        }

        .detail-icon {
          width: 18px;
          height: 18px;
          color: #3fa7a3;
          flex-shrink: 0;
        }

        .teacher-bio {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .teacher-bio p {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        .teacher-contact {
          display: flex;
          justify-content: flex-end;
        }

        .contact-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #3fa7a3;
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          border: none;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-button:hover {
          background: #2d8986;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(63, 167, 163, 0.3);
        }

        .button-icon {
          width: 16px;
          height: 16px;
        }

        .faculty-stats-section {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .stats-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .stats-header h3 {
          color: #3fa7a3;
          font-size: 1.8rem;
          margin-bottom: 10px;
        }

        .stats-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 25px;
        }

        .stat-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #3fa7a3;
          margin-bottom: 5px;
        }

        .stat-label {
          color: #666;
          font-size: 0.95rem;
        }

        .no-teachers-message {
          background: white;
          padding: 60px 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .no-teachers-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }

        .no-teachers-message h3 {
          color: #3fa7a3;
          font-size: 1.8rem;
          margin-bottom: 15px;
        }

        .no-teachers-message p {
          color: #666;
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 5px 0;
        }

        /* Success Notification */
        .success-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          border-left: 4px solid #28a745;
          z-index: 1000;
          animation: slideIn 0.3s ease;
        }

        .success-content {
          display: flex;
          align-items: center;
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
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
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
          font-size: 1.2rem;
        }

        .success-text p {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }

        .close-notification {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .close-notification:hover {
          background-color: #f0f0f0;
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

        /* Responsive Design */
        @media (max-width: 1200px) {
          .banner-content-wrapper {
            flex-direction: column;
            gap: 40px;
          }

          .banner-content {
            max-width: 100%;
          }

          .banner-stats {
            width: 100%;
            flex: none;
            margin-left: 0;
          }

          .admission-layout {
            grid-template-columns: 1fr;
          }

          .overview-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 992px) {
          .banner-title {
            font-size: 3rem;
          }

          .title-highlight {
            font-size: 2.8rem;
          }

          .title-main {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .faculty-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .banner-content-wrapper {
            padding: 60px 30px 30px;
          }

          .banner-title {
            font-size: 2.5rem;
          }

          .title-highlight {
            font-size: 2.2rem;
          }

          .title-main {
            font-size: 2rem;
          }

          .requirements-cards {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }

          .mission-card {
            flex-direction: column;
            gap: 20px;
            padding: 30px;
          }

          .facilities-grid {
            grid-template-columns: 1fr;
          }

          .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .banner-content-wrapper {
            padding: 50px 20px 20px;
          }

          .banner-title {
            font-size: 2rem;
          }

          .banner-description {
            font-size: 1.1rem;
          }

          .banner-badge {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .badge-divider {
            display: none;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .navigation-tabs {
            overflow-x: auto;
          }

          .tab-scroll {
            gap: 0;
          }

          .tab-item {
            min-width: 100px;
            padding: 15px;
          }

          .admission-status {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .faculty-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}