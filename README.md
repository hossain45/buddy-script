# Social Feed Platform

A lightweight social platform built with a production-style approach. The project includes authentication, protected feed browsing, posting with text/images, likes, comments, replies, and privacy controls — all implemented with scalability and clean architecture in mind.

## 🚀 Tech Stack

### Frontend
- **React**
- **TypeScript**
- **TailwindCSS**
- **Redux Toolkit**
- **RTK Query**

### Backend
- **AdonisJS**
- **MVC Architecture**
- **Lucid ORM**

### Database
- **MySQL**

### Deployment
- **Backend + MySQL** → Railway (https://buddy-script-production.up.railway.app/)
- **Frontend** → Netlify (https://buddyscript45.netlify.app/)

---

## 🧩 Architecture Overview

### Frontend
The frontend follows a clean, predictable structure built around strong typing and consistent state flow.

**Why this stack works well:**
- **React + TypeScript** keeps UI logic strongly typed and predictable, with centralized type utilities to avoid duplication.
- **TailwindCSS** enables fast, mobile-first styling without scattering custom CSS.
- **Redux Toolkit** provides structured global state with minimal boilerplate and good scalability.
- **RTK Query** handles API caching, invalidation, and request lifecycles far more elegantly than manual axios usage.

The app is organized around small, responsibility-focused components and a unified type system that grows cleanly with the application.

### Backend (AdonisJS + MVC)
The backend is implemented with AdonisJS, which offers a well-structured, batteries-included framework for Node.js development.

**Why AdonisJS:**
- **Compared to Express:** Adonis ships with routing, validation, authentication, ORM, and conventions out of the box. Express is minimal and becomes fragmented once you start assembling your own tooling.
- **Compared to NestJS:** Nest is powerful but heavy and verbose. Adonis gives structure without unnecessary architectural overhead, making it easier to maintain for projects of this size.

**MVC Architecture:**
The backend uses the Model–View–Controller pattern.

**Why MVC works better here:**
- Clean separation of concerns (models for data, controllers for logic, views/serializers for shaping output).
- Highly predictable structure as the app grows.
- Plays naturally with relational data modeling via Lucid ORM.
- Makes testing and extending backend features far easier.

### Database (MySQL)
MySQL suits the domain because the data is inherently relational:
- Users ↔ Posts
- Posts ↔ Comments
- Comments ↔ Replies
- Posts/Comments/Replies ↔ Likes

**Why MySQL instead of NoSQL:**
- Strong consistency matters for interactions like likes, comments, and privacy-controlled content.
- Relational modeling avoids the data duplication required in NoSQL systems.
- MySQL supports joins, transactions, and referential integrity out of the box.
- More predictable long-term behavior for this type of application.

Indexes were added to frequently queried fields (timestamps, user references, parent IDs) to keep queries efficient at scale.

---

## 🌐 Deployment

### Backend + Database
Deployed on **Railway**, which provides:
- Smooth provisioning
- Managed MySQL
- Environment variable handling
- Logs and simple CI/CD

### Frontend
Deployed on **Netlify**, offering:
- Fast builds
- Instant deploy previews
- Reliable static hosting

This separation keeps services modular and easy to scale individually.

---

## 📦 Summary

This project is intentionally built using practices that mirror real production systems:
- A typed, predictable, scalable frontend
- An MVC-structured backend using a full-featured framework
- A relational schema that matches the domain
- A clean deployment workflow across Railway and Netlify

Even with a relatively small feature set, the architecture is designed to grow without becoming brittle or disorganized.
