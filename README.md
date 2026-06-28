# 🚀 CiviSync – AI-Powered Civic Issue Reporting Platform

CiviSync is an AI-powered civic engagement platform that enables citizens to report local infrastructure and public service issues while helping authorities prioritize and resolve them efficiently.

The platform leverages **Google Gemini AI** for intelligent issue analysis, **Firebase** for authentication and cloud database management, and **React** for a fast, responsive user experience.

---

## 🌟 Features

### 🔐 Authentication

* Google Sign-In
* Email & Password Authentication
* Anonymous Guest Login
* Secure Logout

### 📸 AI-Powered Issue Reporting

* Upload an image of a civic issue
* Add description and location
* Gemini AI automatically analyzes:

  * Issue Category
  * Severity
  * Responsible Department
  * Confidence Score
  * Suggested Action

### 📊 Community Dashboard

* Total Reports
* High Severity Reports
* Pending Reports
* Resolved Reports
* AI-generated Community Insights
* Community Feed

### 🗺️ Live Issue Map

* Interactive map using Leaflet
* Displays reported civic issues
* Dynamic markers from Firestore
* Easy visualization of nearby problems

### 🗑️ Report Management

* Submit new reports
* Delete your own reports
* Secure Firestore rules prevent unauthorized deletion

### 🔒 Secure Backend

* Firebase Authentication
* Firestore Database
* Firestore Security Rules
* User-specific permissions

---

# 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TanStack Router
* React Query
* Tailwind CSS

### Backend & Cloud

* Firebase Authentication
* Cloud Firestore

### AI

* Google Gemini 2.5 Flash
* Google GenAI SDK

### Maps

* React Leaflet
* Leaflet.js

### UI

* Lucide Icons
* Sonner Toasts

---

# 📌 Workflow

1. Login (Google / Email / Guest)
2. Report a civic issue
3. Upload image
4. Gemini AI analyzes the issue
5. Submit report
6. Store report in Firestore
7. Dashboard updates instantly
8. Issue appears on Live Map
9. Report owner can delete their report

---

# 💡 Future Enhancements

- Image storage using Firebase Storage
- Real-time Firestore listeners
- Report filtering and search
- Admin dashboard
- Report status updates by authorities
- Push notifications
- Analytics dashboard
- Community voting system

---

# 👨‍💻 Developed By

**Mannat**

Built using **React, TypeScript, Firebase, Google Gemini AI, Leaflet, TanStack Router, and Tailwind CSS.**
