# 🚀 MandiPro Platform

MandiPro is a **full-stack platform** designed to power modern digital marketplaces with a scalable backend and a responsive frontend.

The platform provides a robust API layer, secure authentication, and a clean user interface for interacting with marketplace data.

---

## 🏗 Architecture Overview

```text
Frontend Application
        │
        ▼
REST API (Spring Boot)
        │
        ▼
PostgreSQL Database
```

The system uses **stateless JWT authentication** and communicates through **RESTful APIs** between the frontend and backend services.

---

## 📦 Repository Structure

```
mandipro/

├── backend/
│   Spring Boot application
│
└── frontend/
    Web client application
```

---

## 📚 Documentation

Full documentation for the platform is available in the **Project Wiki**.

👉 **[Open the Wiki](../../wiki)**

The wiki includes:

- Platform architecture
- Backend documentation
- Frontend documentation
- Development setup
- Authentication flow
- Database migrations
- Contribution guidelines

---

## ⚡ Quick Start (Development)

### Backend

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Backend runs at:

```
http://localhost:8080
```

Swagger API documentation:

```
http://localhost:8080/swagger-ui/index.html
```

---

### Frontend

```bash
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🛠 Development Status

🚧 **Project Status:** Active Development

Some features and documentation are still in progress.

---

## 🤝 Contributing

Contributions are welcome.

Please read the **[Contributing Guide](../../wiki/Contributing-Guide)** before submitting pull requests.

---

## 📄 License

(TO BE UPDATED)

---

<p align="center">

Built with ❤️ by the **Build-Grid Engineering Team**

</p>
