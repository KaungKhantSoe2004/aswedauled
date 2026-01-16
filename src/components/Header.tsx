import { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiHome,
  FiInfo,
  FiMail,
  FiBook,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [gradesOpen, setGradesOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const grades = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setGradesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", icon: FiHome, path: "/" },
    { label: "About", icon: FiInfo, path: "/about" },
    { label: "Contact", icon: FiMail, path: "/contact" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleGradeSelection = (grade: string) => {
    setSelectedGrade(grade);
    setGradesOpen(false);
    setIsOpen(false);
    navigate(`/grades/${grade}`);
  };

  if (!isMobile) {
    return (
      <header
        style={{
          background: "linear-gradient(to bottom, #2a2a2a, #1a1a1a)",
          borderBottom: "2px solid #3FA7A3",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <style>{`
          @keyframes slideDownDesktop {
            from {
              opacity: 0;
              transform: translateY(-12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        <div
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.5rem 0",
            }}
          >
            {/* Logo Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  background: "#3FA7A3",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                  border: "2px solid #52b5b0",
                  fontFamily: "BeBas Neue, sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                AE
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <h1
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 900,
                    color: "#CBCBCC",
                    margin: 0,
                    fontFamily: "BeBas Neue, sans-serif",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Aswedaul Ed
                </h1>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#3FA7A3",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    margin: 0,
                    textTransform: "uppercase",
                    fontFamily: "Orbitron, sans-serif",
                  }}
                >
                  Excellence in Education
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#CBCBCC",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    padding: "0.75rem 1.5rem",
                    border: "1px solid rgba(63, 167, 163, 0.3)",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                    fontFamily: "BeBas Neue, sans-serif",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "white";
                    (e.currentTarget as HTMLElement).style.background =
                      "#3FA7A3";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#3FA7A3";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#CBCBCC";
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(63, 167, 163, 0.3)";
                  }}
                >
                  {item.label}
                </button>
              ))}

              {/* Desktop Grades Dropdown */}
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setGradesOpen(!gradesOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#CBCBCC",
                    fontSize: "1rem",
                    fontWeight: 700,
                    padding: "0.75rem 1.5rem",
                    border: "1px solid rgba(63, 167, 163, 0.3)",
                    borderRadius: "4px",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "BeBas Neue, sans-serif",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "white";
                    (e.currentTarget as HTMLElement).style.background =
                      "#3FA7A3";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#3FA7A3";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#CBCBCC";
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(63, 167, 163, 0.3)";
                  }}
                >
                  GRADES
                  <FiChevronDown
                    style={{
                      transform: gradesOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>

                {gradesOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      marginTop: "0.5rem",
                      display: "grid",
                      gridTemplateColumns: "repeat(4, minmax(80px, 1fr))",
                      gap: "0.5rem",
                      padding: "1rem",
                      background: "#1a1a1a",
                      border: "2px solid #3FA7A3",
                      borderRadius: "4px",
                      minWidth: "300px",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {grades.map((grade, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleGradeSelection(grade)}
                        style={{
                          padding: "0.75rem",
                          background:
                            selectedGrade === grade
                              ? "#3FA7A3"
                              : "rgba(63, 167, 163, 0.15)",
                          color: selectedGrade === grade ? "white" : "#CBCBCC",
                          border:
                            selectedGrade === grade
                              ? "2px solid #3FA7A3"
                              : "1px solid rgba(63, 167, 163, 0.3)",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: 700,
                          transition: "all 0.2s ease",
                          fontFamily: "BeBas Neue, sans-serif",
                          letterSpacing: "0.5px",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedGrade !== grade) {
                            (e.currentTarget as HTMLElement).style.background =
                              "#3FA7A3";
                            (e.currentTarget as HTMLElement).style.color =
                              "white";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedGrade !== grade) {
                            (e.currentTarget as HTMLElement).style.background =
                              "rgba(63, 167, 163, 0.15)";
                            (e.currentTarget as HTMLElement).style.color =
                              "#CBCBCC";
                          }
                        }}
                      >
                       G-{grade}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      style={{
        background:
          "linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(14, 15, 15, 0.98) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(63, 167, 163, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInGrades {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.25rem 0",
          }}
        >
          {/* Logo Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onClick={() => navigate("/")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
            }}
          >
            <div
              style={{
                width: "2.75rem",
                height: "2.75rem",
                background: "linear-gradient(135deg, #3FA7A3 0%, #52b5b0 100%)",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "900",
                fontSize: "1.1rem",
                border: "2px solid rgba(63, 167, 163, 0.4)",
                boxShadow:
                  "0 8px 24px rgba(63, 167, 163, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
                fontFamily: "Orbitron, sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              AE
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.15rem",
              }}
            >
              <h1
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 900,
                  color: "#e2e8f0",
                  margin: 0,
                  fontFamily: "BeBas Neue, sans-serif",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, #e2e8f0, #3FA7A3)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Aswedaul Ed
              </h1>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#3FA7A3",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  margin: 0,
                  textTransform: "uppercase",
                  fontFamily: "Orbitron, sans-serif",
                }}
              >
                Excellence
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              background: "rgba(63, 167, 163, 0.12)",
              border: "1.5px solid rgba(63, 167, 163, 0.25)",
              borderRadius: "12px",
              color: "#3FA7A3",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              fontSize: "1.3rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#3FA7A3";
              (e.currentTarget as HTMLElement).style.color = "white";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 20px rgba(63, 167, 163, 0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(63, 167, 163, 0.12)";
              (e.currentTarget as HTMLElement).style.color = "#3FA7A3";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            style={{
              animation: "slideDown 0.4s ease-out",
              borderTop: "1px solid rgba(63, 167, 163, 0.15)",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
              maxHeight: "calc(100vh - 80px)",
              overflowY: "auto",
            }}
          >
            {/* Mobile Nav Links */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {navItems.map((item) => (
                <div
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "rgba(63, 167, 163, 0.08)",
                    border: "1px solid rgba(63, 167, 163, 0.15)",
                    borderRadius: "8px",
                    color: "#cbd5e1",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    fontFamily: "Orbitron, sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(63, 167, 163, 0.18)";
                    (e.currentTarget as HTMLElement).style.color = "#3FA7A3";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(63, 167, 163, 0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#cbd5e1";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateX(0)";
                  }}
                >
                  <item.icon size={18} />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Grades Dropdown */}
            <div ref={dropdownRef}>
              <button
                onClick={() => setGradesOpen(!gradesOpen)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  background:
                    "linear-gradient(135deg, #3FA7A3 0%, #52b5b0 100%)",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(63, 167, 163, 0.3)",
                  fontFamily: "BeBas Neue, sans-serif",
                  letterSpacing: "0.5px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 16px rgba(63, 167, 163, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 12px rgba(63, 167, 163, 0.3)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FiBook size={18} />
                  <span>SELECT GRADE</span>
                </div>
                <FiChevronDown
                  size={18}
                  style={{
                    transform: gradesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition:
                      "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                />
              </button>

              {/* Compact Grades Grid */}
              {gradesOpen && (
                <div
                  style={{
                    animation: "slideInGrades 0.3s ease-out",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.4rem",
                    marginTop: "0.75rem",
                    padding: "0.75rem",
                    background:
                      "linear-gradient(135deg, rgba(63, 167, 163, 0.08) 0%, rgba(63, 167, 163, 0.04) 100%)",
                    border: "1px solid rgba(63, 167, 163, 0.2)",
                    borderRadius: "8px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {grades.map((grade, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleGradeSelection(grade)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.25rem",
                        padding: "0.5rem 0.25rem",
                        background:
                          selectedGrade === grade
                            ? "rgba(63, 167, 163, 0.25)"
                            : "rgba(255, 255, 255, 0.05)",
                        border:
                          selectedGrade === grade
                            ? "1.5px solid #3FA7A3"
                            : "1px solid rgba(63, 167, 163, 0.15)",
                        borderRadius: "6px",
                        color: selectedGrade === grade ? "#3FA7A3" : "#cbd5e1",
                        cursor: "pointer",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        transition: "all 0.2s ease",
                        fontFamily: "Orbitron, sans-serif",
                        minHeight: "auto",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedGrade !== grade) {
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(63, 167, 163, 0.15)";
                          (e.currentTarget as HTMLElement).style.color =
                            "#3FA7A3";
                          (e.currentTarget as HTMLElement).style.transform =
                            "translateY(-2px)";
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 3px 8px rgba(63, 167, 163, 0.2)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedGrade !== grade) {
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(255, 255, 255, 0.05)";
                          (e.currentTarget as HTMLElement).style.color =
                            "#cbd5e1";
                          (e.currentTarget as HTMLElement).style.transform =
                            "translateY(0)";
                          (e.currentTarget as HTMLElement).style.boxShadow =
                            "none";
                        }
                      }}
                    >
                      <div
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            selectedGrade === grade
                              ? "linear-gradient(135deg, #3FA7A3, #52b5b0)"
                              : "rgba(63, 167, 163, 0.15)",
                          color: selectedGrade === grade ? "white" : "#3FA7A3",
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          transition: "all 0.2s ease",
                          fontFamily: "Orbitron, sans-serif",
                        }}
                      >
                        {idx + 1}
                      </div>
                      <span style={{ fontSize: "0.6rem" }}>G{idx + 1}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
