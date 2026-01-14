"use client";

import { useState } from "react";

interface AdmissionFormProps {
  grade: string;
  submissionStatus: "open" | "closed" | "review";
}

export default function AdmissionForm({
  grade,
  submissionStatus,
}: AdmissionFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    prevSchool_doc: "",
    grade: grade,
    gender: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    profile: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");

    // You can add API call here later
    // try {
    //   const response = await fetch('/api/admissions', {
    //     method: 'POST',
    //     body: JSON.stringify(formData)
    //   });
    //   // Handle response
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (submissionStatus !== "open") {
    return (
      <div className="review-section">
        <h2>APPLICATIONS UNDER REVIEW</h2>
        <p>
          Thank you for your interest in {grade} at ASWEDAUL ED. The submission
          period has ended and our team is currently reviewing all applications.
        </p>
        <p>
          The selected students list will be published on{" "}
          <strong>January 15th, 2025</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="admission-layout">
      <div className="admission-sidebar">
        <div className="sidebar-card">
          <h3>Admission Timeline</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">Dec 1-31, 2024</div>
              <div className="timeline-content">Application Period</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Jan 5-10, 2025</div>
              <div className="timeline-content">Entrance Exams</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Jan 15, 2025</div>
              <div className="timeline-content">Results Announcement</div>
            </div>
          </div>
        </div>

        <div className="sidebar-card">
          <h3>Quick Information</h3>
          <div className="quick-info">
            <div className="info-item">
              <span>Age Requirement:</span>
              <strong>
                {grade === "1"
                  ? "5-6 years"
                  : grade === "7"
                  ? "11-12 years"
                  : "16-17 years"}
              </strong>
            </div>
            <div className="info-item">
              <span>Documents Needed:</span>
              <strong>
                {grade === "1"
                  ? "4 items"
                  : grade === "7"
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
      </div>

      <div className="admission-main">
        <div className="form-container">
          <div className="form-header">
            <h2>ADMISSION APPLICATION FORM</h2>
            <p>Complete all fields below to apply for {grade} at ASWEDAUL ED</p>
          </div>

          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-section">
              <h4 className="form-section-title">STUDENT INFORMATION</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name (English) *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Full Name (Myanmar)</label>
                  <input type="text" placeholder="Enter name in Myanmar" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4 className="form-section-title">EDUCATIONAL BACKGROUND</h4>
              <div className="form-group">
                <label>Previous School Name</label>
                <input
                  type="text"
                  placeholder="Name of previous school attended"
                />
              </div>
              <div className="form-group">
                <label>Previous School Document URL</label>
                <input
                  type="url"
                  name="prevSchool_doc"
                  value={formData.prevSchool_doc}
                  onChange={handleInputChange}
                  placeholder="https://example.com/transcript.pdf"
                />
              </div>
              <div className="form-group">
                <label>Student Profile / Cover Letter *</label>
                <textarea
                  name="profile"
                  value={formData.profile}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us about your academic achievements, extracurricular activities, interests, and why you want to join ASWEDAUL ED..."
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h4 className="form-section-title">GUARDIAN INFORMATION</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Guardian Name *</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Relationship to Student *</label>
                  <select required>
                    <option value="">Select Relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Legal Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Guardian Phone *</label>
                  <input
                    type="tel"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Guardian Email</label>
                  <input
                    type="email"
                    name="guardianEmail"
                    value={formData.guardianEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="declaration">
                <label className="declaration-checkbox">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>I declare that all
                  information provided is true and accurate to the best of my
                  knowledge.
                </label>
                <label className="declaration-checkbox">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>I understand that
                  submitting false information may result in application
                  rejection.
                </label>
              </div>
            </div>

            <button type="submit" className="submit-button">
              SUBMIT APPLICATION
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
