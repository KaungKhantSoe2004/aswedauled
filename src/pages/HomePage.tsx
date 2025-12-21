"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import CTASection from "./Cta";
import { getActivities, getGalleries } from "../assets/graphql/Controllers";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setGallery } from "../features/gallerySlice";
import { setActivity } from "../features/activitySlice";

export default function Page() {
  const backend_domain_name = import.meta.env.VITE_BACKEND_DOMAIN_NAME;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const ReduxGalleries = useSelector((state: RootState) => state.galleries);
  const ReduxActivities = useSelector((state: RootState) => state.activities);
  const [activities, setActivities] = useState(ReduxActivities);
  const [galleries, setGalleries] = useState(ReduxGalleries);
  const [loading, setLoading] = useState({
    activities: true,
    galleries: true,
    allData: true,
  });
  const dispatch = useDispatch();
  const bannerTexts = [
    {
      title: "Welcome to ASWEDAUL ED",
      desc: "A modern school environment helping students grow academically and personally.",
    },
    {
      title: "Empowering Teenagers",
      desc: "We prepare young learners for real-world success with passion and care.",
    },
    {
      title: "Active Learning Environment",
      desc: "Our students participate in hands-on activities and real educational experiences.",
    },
    {
      title: "Building Future Leaders",
      desc: "We guide every student to discover their strengths and reach their potential.",
    },
  ];

  const [textIndex, setTextIndex] = useState(0);
  const fetchData = async () => {
    try {
      setLoading((prev) => ({ ...prev, allData: true }));

      const [activitiesResponse, galleriesResponse] = await Promise.all([
        getActivities(),
        getGalleries(),
      ]);

      dispatch(setGallery(galleriesResponse.galleries.data));
      dispatch(setActivity(activitiesResponse.activities.data));

      setGalleries(galleriesResponse.galleries.data);
      setActivities(activitiesResponse.activities.data);

      setLoading({
        activities: false,
        galleries: false,
        allData: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading({
        activities: false,
        galleries: false,
        allData: false,
      });
    }
  };

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
      setTextIndex((prev) => (prev + 1) % bannerTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bannerSlides = [
    {
      bg: "url('lib1.jpg')",
      label: "Slide 1",
    },
    {
      bg: "url('lib2.jpg')",
      label: "Slide 2",
    },
    {
      bg: "url('class1.jpg')",
      label: "Slide 3",
    },
    {
      bg: "url('mainBuilding1.jpg')",
      label: "Slide 4",
    },
    {
      bg: "url('mainBuilding2.jpg')",
      label: "Slide 5",
    },
  ];

  const grades = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`);

  const offerings = [
    {
      title: "Advanced STEM",
      description:
        "Cutting-edge science, technology, engineering and mathematics curriculum designed to prepare students for the digital future.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Creative Arts",
      description:
        "Comprehensive programs in visual arts, music, and performing arts to nurture creative expression and cultural awareness.",
      image:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
    },
    {
      title: "Sports Excellence",
      description:
        "Championship-level athletic programs developing discipline, teamwork, and physical excellence in our students.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  return (
    <div className="landing-page">
      {/* Initial Loading Overlay */}
      {loading.allData && (
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

      {/* ===== HERO BANNER SLIDER ===== */}
      <section
        className="hero-banner"
        style={{ height: "100vh", minHeight: "800px" }}
      >
        {/* Background Image */}
        <div
          className="banner-background"
          style={{
            backgroundImage: bannerSlides[currentSlide].bg,
            height: "100%",
          }}
        ></div>

        {/* Bottom Gradient Overlay */}
        <div className="banner-gradient" style={{ height: "100%" }}></div>

        {/* TEXT BLOCK */}
        <div className="banner-text">
          <h1 className="banner-title">{bannerTexts[textIndex].title}</h1>
          <p className="banner-description">{bannerTexts[textIndex].desc}</p>
        </div>
      </section>

      {/* ===== WHAT IS ASWEDAUL ED ===== */}
      <section className="section about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">WHAT IS ASWEDAUL ED?</h2>
              <div className="title-underline"></div>
              <p className="section-text">
                Aswedaul Ed is a premier educational institution dedicated to
                excellence in academic achievement and character development. We
                believe in nurturing young minds through innovative teaching
                methods and a supportive learning environment.
              </p>
              <p className="section-text">
                Our mission is to empower students with knowledge, skills, and
                values that prepare them for success in higher education and
                beyond. With a focus on holistic development, we foster critical
                thinking, creativity, and leadership qualities.
              </p>
              <div className="button-group">
                <button className="primary-button">LEARN MORE</button>
              </div>
            </div>
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
                alt="Aswedaul Ed Campus"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE OFFER ===== */}
      <section className="section offerings-section">
        <div className="container">
          <h2 className="section-title center">WHAT WE OFFER</h2>
          <div className="title-underline center"></div>

          <div className="offerings-grid">
            {offerings.map((offer, idx) => (
              <div key={idx} className="offering-card">
                <div className="offering-image">
                  <img src={offer.image} alt={offer.title} />
                </div>
                <div className="offering-content">
                  <h3 className="offering-title">{offer.title}</h3>
                  <p className="offering-description">{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACTIVITIES ===== */}
      <section className="section activities-section">
        <div className="container">
          <h2 className="section-title center">ACTIVITIES & EVENTS</h2>
          <div className="title-underline center"></div>

          {loading.activities ? (
            <div className="grade-loading-container">
              <div className="grade-spinner">
                <div className="spinner-ring">
                  <div className="spinner-ring-inner"></div>
                  <div className="spinner-ring-outer"></div>
                </div>
                <div className="spinner-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
              <p className="grade-loading-text">Loading Activities</p>
              <p className="grade-loading-subtext">
                Please wait while we fetch the latest activities...
              </p>
            </div>
          ) : activities.length === 0 ? (
            <div className="grade-empty-state">
              <div className="empty-state-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-11h-2v4H8v2h4v4h2v-4h4v-2h-4V9z" />
                </svg>
              </div>
              <h3 className="empty-state-title">No Activities Available</h3>
              <p className="empty-state-text">
                Check back soon for upcoming events and activities.
              </p>
            </div>
          ) : (
            <div className="activities-grid">
              {activities.map((activity, idx) => (
                <div key={idx} className="activity-card">
                  <div className="activity-image">
                    <img
                      src={`${backend_domain_name}${activity.image}`}
                      alt={activity.activityName}
                    />
                  </div>
                  <div className="activity-content">
                    <h3 className="activity-title">{activity.activityName}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="section achievements-section">
        <div className="container">
          <h2 className="section-title center">OUR ACHIEVEMENTS</h2>
          <div className="title-underline center"></div>

          <div className="achievements-grid">
            <div className="achievement-card">
              <h3 className="achievement-title">🏆 OLYMPIC MATH CHAMPIONS</h3>
              <p className="achievement-text">
                37 Gold Medals | 24 Silver Medals | 19 Bronze Medals
              </p>
            </div>

            <div className="achievement-card">
              <h3 className="achievement-title">⭐ OUTSTANDING STUDENTS</h3>
              <p className="achievement-text">
                156 National Recognition Awards | 89 Scholarship Holders
              </p>
            </div>

            <div className="achievement-card full-width">
              <h3 className="achievement-title">📊 STUDENT DISTINCTION</h3>
              <div className="grades-grid">
                {[245, 312, 287, 298, 156, 203].map((count, idx) => (
                  <div key={idx} className="grade-stat">
                    <div className="grade-number">{count}</div>
                    <div className="grade-label">
                      {idx + 1} Subject Distinction
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="achievement-card full-width">
              <h3 className="achievement-title">
                🎓 12TH GRADE (UNIVERSITY) PASS RATE
              </h3>
              <p className="pass-rate">98.7%</p>
              <p className="achievement-text">
                567 students passed with distinction | 89 top universities
                admission
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section gallery-section">
        <div className="container">
          <h2 className="section-title center">GALLERY</h2>
          <div className="title-underline center"></div>

          {loading.galleries ? (
            <div className="grade-loading-container">
              <div className="grade-spinner">
                <div className="spinner-ring">
                  <div className="spinner-ring-inner"></div>
                  <div className="spinner-ring-outer"></div>
                </div>
                <div className="spinner-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
              <p className="grade-loading-text">Loading Gallery</p>
              <p className="grade-loading-subtext">
                Fetching images from our collection...
              </p>
            </div>
          ) : galleries.length === 0 ? (
            <div className="grade-empty-state">
              <div className="empty-state-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm1 4v10h14V8H5zm4.5 6.5l2.5 3 3.5-4.5 4.5 6H5l4.5-6z" />
                </svg>
              </div>
              <h3 className="empty-state-title">Gallery Coming Soon</h3>
              <p className="empty-state-text">
                We're preparing amazing photos from our campus.
              </p>
            </div>
          ) : (
            <div className="gallery-grid">
              {galleries.map((gallery, idx) => (
                <div key={idx} className="gallery-card">
                  <div className="gallery-image">
                    <img
                      src={`${backend_domain_name}${gallery.image}`}
                      alt={gallery.galleryName}
                    />
                  </div>
                  <div className="gallery-content">
                    <h3 className="gallery-title">{gallery.galleryName}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section why-choose-section">
        <div className="container">
          <h2 className="section-title center">WHY CHOOSE ASWEDAUL ED?</h2>
          <div className="title-underline center"></div>

          <div className="features-grid">
            {[
              {
                title: "Expert Faculty",
                desc: "Highly qualified educators with decades of experience",
              },
              {
                title: "Modern Facilities",
                desc: "State-of-the-art labs, library, and sports complex",
              },
              {
                title: "Holistic Development",
                desc: "Academics, sports, arts, and character building",
              },
              {
                title: "Innovation Focus",
                desc: "Latest teaching methodologies and technology",
              },
              {
                title: "Success Track Record",
                desc: "98.7% university pass rate and scholarships",
              },
            ].map((item, idx) => (
              <div key={idx} className="feature-card">
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-description">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="section mission-section">
        <div className="container">
          <h2 className="section-title">MISSION & VISION</h2>

          <div className="mission-grid">
            <div className="mission-card">
              <h3 className="mission-title">🎯 OUR MISSION</h3>
              <p className="mission-text">
                To provide exceptional education that develops intellectually
                rigorous, emotionally intelligent, and morally grounded
                individuals who contribute positively to society.
              </p>
            </div>

            <div className="mission-card">
              <h3 className="mission-title">🌟 OUR VISION</h3>
              <p className="mission-text">
                To be the leading educational institution recognized for
                academic excellence, innovation, and producing leaders who
                transform the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <CTASection />

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h4 className="footer-title">ABOUT US</h4>
              <p className="footer-text">
                Aswedaul Ed is committed to delivering world-class education and
                developing future leaders through innovation and excellence.
              </p>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">QUICK LINKS</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Admissions</a>
                </li>
                <li>
                  <a href="#">Academics</a>
                </li>
                <li>
                  <a href="#">Events</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">CONTACT</h4>
              <p className="footer-text">
                📧 info@aswedauled.edu
                <br />
                📞 +1 (555) 123-4567
                <br />
                📍 City Center, Metro City
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2025 Aswedaul Ed. All Rights Reserved. | Designed for
              Excellence
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .landing-page {
          background-color: #d4d4d4;
          color: #000;
          min-height: 100vh;
          font-family: "Bebas Neue", Arial, sans-serif;
          position: relative;
        }

        /* Initial Loading Overlay - Grade Page Style */
        .initial-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeOut 0.8s ease forwards 2s;
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        .loading-content {
          text-align: center;
          padding: 40px;
          background: rgba(26, 26, 26, 0.8);
          border: 3px solid #3fa7a3;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          min-width: 400px;
        }

        .grade-page-spinner {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 30px;
        }

        .spinner-circle {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .spinner-inner-circle {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 4px solid transparent;
          border-top: 4px solid #3fa7a3;
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        .spinner-outer-circle {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 4px solid rgba(63, 167, 163, 0.2);
          border-radius: 50%;
        }

        .spinner-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: radial-gradient(circle, rgba(63, 167, 163, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(10px);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .loading-title {
          color: #fff;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .loading-subtitle {
          color: #3fa7a3;
          font-size: 1.1rem;
          margin-bottom: 30px;
          letter-spacing: 1px;
        }

        .loading-progress {
          margin-top: 30px;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3fa7a3 0%, #2d8986 100%);
          border-radius: 3px;
          animation: progress 2s ease-in-out infinite;
        }

        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        .progress-text {
          color: #aaa;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        /* Section Loading States - Grade Page Style */
        .grade-loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          background: rgba(26, 26, 26, 0.9);
          border: 3px solid #3fa7a3;
          border-radius: 12px;
          margin: 20px 0;
          min-height: 300px;
        }

        .grade-spinner {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 25px;
        }

        .spinner-ring {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .spinner-ring-inner {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 3px solid transparent;
          border-top: 3px solid #3fa7a3;
          border-radius: 50%;
          animation: ringSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        .spinner-ring-outer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 3px solid rgba(63, 167, 163, 0.2);
          border-radius: 50%;
        }

        @keyframes ringSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinner-dots {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 5px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #3fa7a3;
          border-radius: 50%;
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .grade-loading-text {
          color: #fff;
          font-size: 1.4rem;
          font-weight: bold;
          margin-bottom: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .grade-loading-subtext {
          color: #aaa;
          font-size: 1rem;
          text-align: center;
          max-width: 300px;
          line-height: 1.5;
        }

        /* Empty State - Grade Page Style */
        .grade-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          background: rgba(26, 26, 26, 0.9);
          border: 2px solid #3fa7a3;
          border-radius: 10px;
          text-align: center;
          margin: 20px 0;
          min-height: 250px;
        }

        .empty-state-icon {
          width: 80px;
          height: 80px;
          background: rgba(63, 167, 163, 0.1);
          border: 2px solid #3fa7a3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .empty-state-icon svg {
          width: 40px;
          height: 40px;
          color: #3fa7a3;
        }

        .empty-state-title {
          color: #fff;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .empty-state-text {
          color: #aaa;
          font-size: 1rem;
          max-width: 300px;
          line-height: 1.5;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section {
          padding: 60px 0;
          border-bottom: 6px solid;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 16px;
          color: inherit;
          letter-spacing: 1px;
        }

        .center {
          text-align: center;
        }

        .title-underline {
          width: 80px;
          height: 6px;
          background-color: #3fa7a3;
          margin-bottom: 40px;
        }

        .center.title-underline {
          margin-left: auto;
          margin-right: auto;
        }

        /* Hero Banner */
        .hero-banner {
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
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(60%);
          transition: background-image 1s ease-in-out;
        }

        .banner-gradient {
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

        .banner-text {
          position: absolute;
          bottom: 40px;
          left: 40px;
          max-width: 550px;
          color: #fff;
          z-index: 10;
        }

        .banner-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 15px;
          text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.9);
          transition: opacity 1s ease-in-out;
        }

        .banner-description {
          font-size: 1.2rem;
          line-height: 1.7;
          text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9);
          opacity: 0.95;
          transition: opacity 1s ease-in-out;
        }

        /* About Section */
        .about-section {
          background-color: #d4d4d4;
          border-bottom-color: #000;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .about-content {
          padding-right: 20px;
        }

        .section-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 16px;
        }

        .button-group {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }

        .primary-button {
          padding: 14px 32px;
          background-color: #3fa7a3;
          color: #fff;
          border: none;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          letter-spacing: 1px;
          transition: all 0.3s;
        }

        .primary-button:hover {
          background-color: #2d8a83;
        }

        .about-image {
          height: 400px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Offerings Section */
        .offerings-section {
          background-color: #1a1a1a;
          color: #fff;
          border-bottom-color: #3fa7a3;
        }

        .offerings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .offering-card {
          background-color: #2d2d2d;
          border: 3px solid #3fa7a3;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .offering-card:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(63, 167, 163, 0.3);
        }

        .offering-image {
          height: 220px;
          overflow: hidden;
        }

        .offering-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .offering-content {
          padding: 24px;
        }

        .offering-title {
          font-size: 1.4rem;
          font-weight: bold;
          margin-bottom: 12px;
          color: #3fa7a3;
          letter-spacing: 1px;
        }

        .offering-description {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #ddd;
        }

        /* Activities Section */
        .activities-section {
          background-color: #d4d4d4;
          border-bottom-color: #000;
        }

        .activities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .activity-card {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
        }

        .activity-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .activity-image {
          height: 200px;
          overflow: hidden;
        }

        .activity-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .activity-card:hover .activity-image img {
          transform: scale(1.1);
        }

        .activity-content {
          padding: 20px;
          text-align: center;
        }

        .activity-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: #000;
          letter-spacing: 0.5px;
        }

        /* Achievements Section */
        .achievements-section {
          background-color: #000;
          color: #fff;
          border-bottom-color: #3fa7a3;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .achievement-card {
          background-color: #1a1a1a;
          border: 3px solid #3fa7a3;
          padding: 30px;
          border-radius: 8px;
          text-align: center;
          transition: all 0.3s;
        }

        .achievement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(63, 167, 163, 0.2);
        }

        .achievement-card.full-width {
          grid-column: span 2;
        }

        .achievement-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 12px;
          color: #3fa7a3;
          letter-spacing: 1px;
        }

        .achievement-text {
          font-size: 1.1rem;
          color: #ddd;
        }

        .grades-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 15px;
          text-align: center;
        }

        .grade-stat {
          background-color: #2d2d2d;
          padding: 20px;
          border-radius: 4px;
          transition: all 0.3s;
        }

        .grade-stat:hover {
          background-color: #3fa7a3;
          transform: scale(1.05);
        }

        .grade-stat:hover .grade-number {
          color: #fff;
        }

        .grade-stat:hover .grade-label {
          color: #e0e0e0;
        }

        .grade-number {
          font-size: 1.8rem;
          font-weight: bold;
          color: #3fa7a3;
          transition: color 0.3s;
        }

        .grade-label {
          font-size: 0.8rem;
          color: #aaa;
          margin-top: 8px;
          transition: color 0.3s;
        }

        .pass-rate {
          font-size: 3rem;
          font-weight: bold;
          color: #3fa7a3;
          margin: 16px 0;
        }

        /* Gallery Section */
        .gallery-section {
          background-color: #d4d4d4;
          border-bottom-color: #000;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .gallery-card {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
        }

        .gallery-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .gallery-image {
          height: 200px;
          overflow: hidden;
        }

        .gallery-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-card:hover .gallery-image img {
          transform: scale(1.1);
        }

        .gallery-content {
          padding: 20px;
          text-align: center;
        }

        .gallery-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: #000;
          letter-spacing: 0.5px;
        }

        /* Why Choose Section */
        .why-choose-section {
          background-color: #1a1a1a;
          color: #fff;
          border-bottom-color: #3fa7a3;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 15px;
        }

        .feature-card {
          background-color: #2d2d2d;
          border: 2px solid #3fa7a3;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          transition: all 0.3s;
        }

        .feature-card:hover {
          background-color: #3fa7a3;
          transform: translateY(-5px);
        }

        .feature-title {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 12px;
          color: #fff;
          letter-spacing: 0.5px;
        }

        .feature-description {
          font-size: 0.8rem;
          line-height: 1.5;
          color: #ddd;
        }

        /* Mission Section */
        .mission-section {
          background-color: #d4d4d4;
          border-bottom-color: #000;
        }

        .mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .mission-card {
          background-color: #1a1a1a;
          color: #fff;
          padding: 30px;
          border-radius: 8px;
          border: 3px solid #3fa7a3;
          transition: all 0.3s;
        }

        .mission-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(63, 167, 163, 0.2);
        }

        .mission-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 20px;
          color: #3fa7a3;
          letter-spacing: 1px;
        }

        .mission-text {
          font-size: 1rem;
          line-height: 1.8;
          color: #ddd;
        }

        /* Footer */
        .footer {
          background-color: #000;
          color: #fff;
          padding: 50px 0 20px;
          border-top: 3px solid #3fa7a3;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 40px;
          text-align: left;
        }

        .footer-title {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 16px;
          color: #3fa7a3;
          letter-spacing: 1px;
        }

        .footer-text {
          font-size: 0.8rem;
          color: #aaa;
          line-height: 1.6;
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-links a {
          color: #ddd;
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: #3fa7a3;
        }

        .footer-bottom {
          border-top: 1px solid #333;
          padding-top: 20px;
          font-size: 0.7rem;
          color: #666;
          text-align: center;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .section-title {
            font-size: 2.2rem;
          }

          .offerings-grid,
          .activities-grid,
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .grades-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .section {
            padding: 40px 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .hero-banner {
            height: 60vh;
            min-height: 400px;
          }

          .banner-text {
            bottom: 30px;
            left: 30px;
            right: 30px;
            max-width: none;
          }

          .banner-title {
            font-size: 2rem;
          }

          .banner-description {
            font-size: 1rem;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .about-content {
            padding-right: 0;
          }

          .about-image {
            height: 300px;
          }

          .offerings-grid,
          .activities-grid,
          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .achievement-card.full-width {
            grid-column: span 1;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .mission-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }

          /* Loading Responsive */
          .loading-content {
            min-width: 300px;
            padding: 30px;
          }

          .grade-page-spinner {
            width: 100px;
            height: 100px;
          }

          .loading-title {
            font-size: 2rem;
          }

          .grade-loading-container {
            padding: 60px 0;
            min-height: 250px;
          }

          .grade-spinner {
            width: 70px;
            height: 70px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 15px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .hero-banner {
            height: 50vh;
            min-height: 350px;
          }

          .banner-text {
            bottom: 20px;
            left: 20px;
            right: 20px;
          }

          .banner-title {
            font-size: 1.6rem;
          }

          .banner-description {
            font-size: 0.9rem;
          }

          .about-image {
            height: 250px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .grades-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .primary-button {
            padding: 12px 24px;
            font-size: 0.9rem;
          }

          /* Loading Responsive */
          .loading-content {
            min-width: 280px;
            padding: 20px;
            margin: 0 15px;
          }

          .grade-page-spinner {
            width: 80px;
            height: 80px;
          }

          .loading-title {
            font-size: 1.8rem;
          }

          .loading-subtitle {
            font-size: 1rem;
          }

          .grade-loading-text {
            font-size: 1.2rem;
          }

          .grade-loading-subtext {
            font-size: 0.9rem;
            padding: 0 10px;
          }

          .grade-empty-state {
            padding: 40px 15px;
          }

          .empty-state-icon {
            width: 60px;
            height: 60px;
          }

          .empty-state-icon svg {
            width: 30px;
            height: 30px;
          }

          .empty-state-title {
            font-size: 1.3rem;
          }

          .empty-state-text {
            font-size: 0.9rem;
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

        }
      `}</style>
    </div>
  );
}
