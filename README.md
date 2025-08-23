# Secure File Storage - A Full-Stack Web Application

A complete, secure, and modern web application that allows users to register, log in, and manage their personal file uploads. This project demonstrates a full-stack development workflow, from a secure Java backend API to a polished, responsive React frontend, all deployed to a live cloud environment.

### Live Demos
* **Live Frontend (GitHub Pages):** [https://BrodyT159.github.io/User-registration](https://BrodyT159.github.io/User-registration)
* **Live Backend API (Render):** [https://user-registration-1-vx30.onrender.com](https://user-registration-1-vx30.onrender.com)

---

## Features

* **Secure User Authentication:** Full registration and login system with password hashing (BCrypt).
* **Token-Based Authorization:** Uses JSON Web Tokens (JWT) for secure, stateless API communication.
* **Complete File Management:** Users can upload, list, download, and delete their own files.
* **Protected Endpoints:** API routes are secured, ensuring users can only access their own data.
* **Light/Dark Mode:** A theme toggle for user preference.
* **Cloud Deployed:** The backend and database are deployed on Render, with the frontend hosted on GitHub Pages.

---

#### **Backend**
* **Java 17** & **Spring Boot 3:** For the core application logic.
* **Spring Security 6:** Handled all authentication and authorization, including JWT filter chains.
* **Spring Data JPA (Hibernate):** For database interaction and object-relational mapping.
* **PostgreSQL:** As the persistent relational database.
* **Maven:** For project build and dependency management.
* **Docker:** For containerizing the application for reliable deployment.

#### **Frontend**
* **React:** For building the dynamic, single-page application.
* **React Router:** For handling client-side routing and navigation.
* **JavaScript (ES6+) & CSS3:** For application logic and modern, responsive styling.

#### **Deployment & DevOps**
* **Git & GitHub:** For version control.
* **Render:** For hosting the live Java backend and PostgreSQL database.
* **GitHub Pages:** For hosting the static React frontend.
* **Postman:** Used for API testing and validation.

---

## Getting Started Locally

To run this project on your local machine:

### Prerequisites
* Java (JDK 17+)
* Maven
* Node.js & npm
* A local PostgreSQL instance
* Git

### Backend Setup
1.  Clone the repository: `git clone https://github.com/BrodyT159/User-registration.git`
2.  Navigate to the project root: `cd User-registration`
3.  Set up your local `application.properties` file with your local database credentials.
4.  Run the application: `mvn spring-boot:run`
    * The backend will be running at `http://localhost:8080`.

### Frontend Setup
1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Run the development server: `npm start`
    * The frontend will be running at `http://localhost:3000`.

---

## Project by
**BrodyT159**
