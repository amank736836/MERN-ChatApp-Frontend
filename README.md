````markdown
# MERN ChatApp Frontend

A React.js & Vite powered client for **ChatChamp**, the real‑time anonymous chat application. Features a responsive Material‑UI interface, Redux state management, and Socket.IO integration for live messaging.

---

## 🚀 Features

- **Client‑Side Routing** with React Router v7  
- **Real‑Time Chat** via Socket.IO Client  
- **Protected Routes** for user and admin areas  
- **Global State** managed by Redux Toolkit  
- **Lazy Loading & Suspense** for optimized bundle size  
- **Responsive UI** built with Material‑UI and Framer Motion  
- **Notifications** via react‑hot‑toast  
- **Charting & Analytics** with Chart.js & moment.js  
- **Performance Insights** via Vercel Analytics & Speed Insights

---

## 🛠️ Tech Stack & Dependencies

- **Framework & Tooling**  
  - React 19.0.0  
  - Vite  
  - @vitejs/plugin-react-swc  
- **State & Data**  
  - @reduxjs/toolkit  
  - react‑redux  
  - axios  
- **UI & Styling**  
  - @mui/material, @mui/icons‑material, @mui/x‑data‑grid  
  - @emotion/react, @emotion/styled  
  - framer‑motion  
- **Routing & Utilities**  
  - react‑router-dom v7.4.0  
  - moment  
  - chart.js, react‑chartjs‑2  
- **Real‑Time & Networking**  
  - socket.io‑client  
  - 6pp (pagination helper)  
- **Notifications & Feedback**  
  - react‑hot‑toast  
- **Vercel Integrations**  
  - @vercel/analytics  
  - @vercel/speed‑insights  
- **Dev & Lint**  
  - eslint, @eslint/js, eslint‑plugin‑react‑hooks, eslint‑plugin‑react‑refresh  
  - globals  
  - types for React & React‑DOM

---

## 📦 Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/amank736836/MERN-ChatApp-Frontend.git
   cd MERN-ChatApp-Frontend
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` (or `.env.local`) file in the project root:

   ```bash
   VITE_SERVER_URL=http://localhost:5000
   VITE_SOCKET_SERVER_URL=http://localhost:5000
   ```

4. **Run in development**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**

   ```bash
   npm run preview
   ```

---

## 🚩 Available Scripts

* `npm run dev` — start Vite dev server (HMR)
* `npm run build` — bundle for production
* `npm run preview` — locally preview production build
* `npm run lint` — run ESLint across the codebase

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/xyz`)
3. Commit your changes (`git commit -m "Add xyz feature"`)
4. Push to the branch (`git push origin feature/xyz`)
5. Open a Pull Request

Please follow existing code style and include tests where appropriate.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
```
