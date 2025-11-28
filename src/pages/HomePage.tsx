"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import CTASection from "./Cta";

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
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

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
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

  const activities = [
    {
      name: "Robotics Club",
      image:
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
    },
    {
      name: "Debate Tournament",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Science Fair",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Sports Festival",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Cultural Week",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Tech Summit",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  const galleries = [
    {
      name: "Campus Views",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
    },
    {
      name: "Classrooms",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    },
    {
      name: "Labs",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Events",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Library",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2056&q=80",
    },
    {
      name: "Facilities",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  return (
    <div className="landing-page">
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

          <div className="activities-grid">
            {activities.map((activity, idx) => (
              <div key={idx} className="activity-card">
                <div className="activity-image">
                  <img src={activity.image} alt={activity.name} />
                </div>
                <div className="activity-content">
                  <h3 className="activity-title">{activity.name}</h3>
                </div>
              </div>
            ))}
          </div>
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

          <div className="gallery-grid">
            {galleries.map((gallery, idx) => (
              <div key={idx} className="gallery-card">
                <div className="gallery-image">
                  <img src={gallery.image} alt={gallery.name} />
                </div>
                <div className="gallery-content">
                  <h3 className="gallery-title">{gallery.name}</h3>
                </div>
              </div>
            ))}
          </div>
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
        }

        .grade-number {
          font-size: 1.8rem;
          font-weight: bold;
          color: #3fa7a3;
        }

        .grade-label {
          font-size: 0.8rem;
          color: #aaa;
          margin-top: 8px;
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

        /* CTA Section */
        .cta-section {
          background-color: #3fa7a3;
          color: #fff;
          padding: 60px 0;
          text-align: center;
          border-bottom-color: #000;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 24px;
          letter-spacing: 1px;
        }

        .cta-text {
          font-size: 1.1rem;
          margin-bottom: 40px;
          line-height: 1.6;
          opacity: 0.95;
        }

        .cta-button {
          padding: 16px 48px;
          background-color: #fff;
          color: #3fa7a3;
          border: none;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s;
          letter-spacing: 1px;
        }

        .cta-button:hover {
          background-color: #1a1a1a;
          color: #3fa7a3;
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

          .cta-title {
            font-size: 2rem;
          }

          .cta-text {
            font-size: 1rem;
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

          .primary-button,
          .cta-button {
            padding: 12px 24px;
            font-size: 0.9rem;
          }

          .cta-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}
