export const PROGRAM_OPTIONS = ["UG", "PG", "Diploma"];

export const COURSE_OPTIONS = ["B_TECH", "BBA", "BCA", "MBA", "MCA"];

export const COURSE_SPECIALIZATION_MAP = {
  B_TECH: [
    "AI_ML",
    "DATA_SCIENCE",
    "CYBER_SECURITY",
    "CLOUD_COMPUTING",
    "COMPUTER_SCIENCE",
    "INFORMATION_TECHNOLOGY",
    "MECHANICAL",
    "CIVIL",
    "ELECTRONICS",
  ],
  BBA: [
    "BUSINESS_ADMINISTRATION",
    "BUSINESS_ANALYTICS",
    "FINANCE",
    "MARKETING",
    "HUMAN_RESOURCES",
  ],
  BCA: [
    "COMPUTER_APPLICATIONS",
    "COMPUTER_SCIENCE",
    "INFORMATION_TECHNOLOGY",
    "DATA_SCIENCE",
    "CYBER_SECURITY",
    "CLOUD_COMPUTING",
  ],
  MBA: [
    "BUSINESS_ADMINISTRATION",
    "BUSINESS_ANALYTICS",
    "FINANCE",
    "MARKETING",
    "HUMAN_RESOURCES",
  ],
  MCA: [
    "COMPUTER_APPLICATIONS",
    "COMPUTER_SCIENCE",
    "INFORMATION_TECHNOLOGY",
    "AI_ML",
    "DATA_SCIENCE",
    "CYBER_SECURITY",
    "CLOUD_COMPUTING",
  ],
};

export const SPECIALIZATION_OPTIONS = [
  ...new Set(Object.values(COURSE_SPECIALIZATION_MAP).flat()),
];

export const LEAD_STATUS_OPTIONS = [
  "NEW",
  "CONTACTED",
  "FOLLOW_UP",
  "HIGH_INTENT",
  "CLOSED",
];

export const formatAcademicLabel = (value) =>
  value
    ? value
        .split("_")
        .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
        .join(" ")
    : "";

export const getSpecializationsForCourse = (courseName) =>
  COURSE_SPECIALIZATION_MAP[courseName] || [];
