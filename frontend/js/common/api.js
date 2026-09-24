/**
 * TalentHunt Reusable API Client
 * Centralized API integration layer for TalentHunt platform frontend
 */

const API_BASE_URL = window.TALENTHUNT_API_URL || "http://localhost:5000/api";

/**
 * Core HTTP Request Wrapper
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("talentHuntToken") || sessionStorage.getItem("talentHuntToken");

  const headers = {
    ...(options.headers || {})
  };

  // Add Authorization Bearer header if token exists and not already provided
  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Only set Content-Type to application/json if not sending FormData
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const fetchOptions = {
    ...options,
    credentials: "include", // Send HTTP-only cookies
    headers
  };

  try {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, fetchOptions);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (!response.ok) {
      const errorMessage = data.message || (data.errors && data.errors[0]?.message) || `Error ${response.status}: Request failed`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${options.method || "GET"} ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * Authentication Services
 */
const auth = {
  async register(userData) {
    const response = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData)
    });
    if (response.data && response.data.token) {
      localStorage.setItem("talentHuntToken", response.data.token);
      localStorage.setItem("talentHuntUser", JSON.stringify(response.data.user));
    }
    return response;
  },

  async login(email, password) {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    if (response.data && response.data.token) {
      localStorage.setItem("talentHuntToken", response.data.token);
      localStorage.setItem("talentHuntUser", JSON.stringify(response.data.user));
    }
    return response;
  },

  async getMe() {
    try {
      const response = await apiRequest("/auth/me");
      if (response.data && response.data.user) {
        localStorage.setItem("talentHuntUser", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (err) {
      // Clear expired local token on 401
      if (err.status === 401) {
        localStorage.removeItem("talentHuntToken");
        localStorage.removeItem("talentHuntUser");
      }
      throw err;
    }
  },

  async logout() {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
    } catch (e) {
      // Ignore network errors during logout
    } finally {
      localStorage.removeItem("talentHuntToken");
      localStorage.removeItem("talentHuntUser");
      sessionStorage.removeItem("talentHuntToken");
    }
  },

  getToken() {
    return localStorage.getItem("talentHuntToken") || sessionStorage.getItem("talentHuntToken");
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem("talentHuntUser"));
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return Boolean(auth.getToken());
  }
};

/**
 * Student Services
 */
const students = {
  getProfile() {
    return apiRequest("/students/profile");
  },
  updateProfile(data) {
    return apiRequest("/students/profile", {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },
  getSkills() {
    return apiRequest("/students/skills");
  },
  updateSkills(data) {
    return apiRequest("/students/skills", {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },
  getAchievements() {
    return apiRequest("/students/achievements");
  },
  addAchievement(data) {
    return apiRequest("/students/achievements", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },
  getResults() {
    return apiRequest("/students/results");
  },
  getTalentScore() {
    return apiRequest("/students/talent-score");
  },
  getSkillGap(role = "software-developer") {
    return apiRequest(`/students/skill-gap?role=${encodeURIComponent(role)}`);
  }
};

/**
 * Teacher Services
 */
const teachers = {
  getProfile() {
    return apiRequest("/teachers/profile");
  },
  updateProfile(data) {
    return apiRequest("/teachers/profile", {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },
  getClasses() {
    return apiRequest("/teachers/classes");
  },
  getStudents() {
    return apiRequest("/teachers/students");
  },
  getSchedule() {
    return apiRequest("/teachers/schedule");
  },
  getEarnings() {
    return apiRequest("/teachers/earnings");
  }
};

/**
 * Opportunities Services
 */
const opportunities = {
  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/opportunities${query ? `?${query}` : ""}`);
  },
  getById(id) {
    return apiRequest(`/opportunities/${id}`);
  },
  create(data) {
    return apiRequest("/opportunities", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },
  update(id, data) {
    return apiRequest(`/opportunities/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },
  delete(id) {
    return apiRequest(`/opportunities/${id}`, {
      method: "DELETE"
    });
  },
  apply(id, data = {}) {
    return apiRequest(`/opportunities/${id}/apply`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
};

/**
 * Applications Services
 */
const applications = {
  getAll() {
    return apiRequest("/applications");
  },
  getById(id) {
    return apiRequest(`/applications/${id}`);
  },
  withdraw(id) {
    return apiRequest(`/applications/${id}`, {
      method: "DELETE"
    });
  },
  updateStatus(id, status) {
    return apiRequest(`/applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status })
    });
  }
};

/**
 * Assessment Services
 */
const assessments = {
  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/assessments${query ? `?${query}` : ""}`);
  },
  getById(id) {
    return apiRequest(`/assessments/${id}`);
  },
  submit(id, answers) {
    return apiRequest(`/assessments/${id}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers })
    });
  },
  getResults(id) {
    return apiRequest(`/assessments/${id}/results`);
  }
};

/**
 * Resume Services
 */
const resumes = {
  upload(file) {
    const formData = new FormData();
    formData.append("resume", file);
    return apiRequest("/resumes", {
      method: "POST",
      body: formData
    });
  },
  getAll() {
    return apiRequest("/resumes");
  },
  getById(id) {
    return apiRequest(`/resumes/${id}`);
  },
  analyze(id) {
    return apiRequest(`/resumes/${id}/analyze`, {
      method: "POST"
    });
  },
  delete(id) {
    return apiRequest(`/resumes/${id}`, {
      method: "DELETE"
    });
  }
};

/**
 * Notification Services
 */
const notifications = {
  getAll() {
    return apiRequest("/notifications");
  },
  markAsRead(id) {
    return apiRequest(`/notifications/${id}/read`, {
      method: "PUT"
    });
  },
  markAllAsRead() {
    return apiRequest("/notifications/read-all", {
      method: "PUT"
    });
  }
};

// Global export for vanilla frontend scripts
window.TalentHuntAPI = {
  API_BASE_URL,
  apiRequest,
  auth,
  students,
  teachers,
  opportunities,
  applications,
  assessments,
  resumes,
  notifications
};
