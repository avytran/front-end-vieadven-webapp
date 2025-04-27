# 🎮 VieAdven - Trò chơi giáo dục văn hóa lịch sử Việt Nam

Welcome to the **VieAdven** front-end repository! This project is an interactive web-based game designed to educate players about Vietnam's rich history and culture. Inspired by gamified learning platforms, **VieAdven** takes players on a journey across Vietnam’s provinces, from North to South, through engaging challenges tied to cultural landmarks, historical sites, and intangible heritage.

---

# 🚀 Installation and Project Running Guide
## 📦 1. Install dependencies
After cloning the project, open your terminal and run:

```bash
npm install
```

##🖥️ 2. Run the application in Local environment
```bash
npm start
```

##🛠️ 3. Run the application in Development mode
```bash
npm run start:dev
```

## 🌟 Features

- 🗺️ Interactive Vietnam Map: Navigate through a dynamic map of Vietnam, with each province representing a unique stage filled with challenges.
- 📚 Educational Challenges: Answer multiple-choice or fill-in-the-blank questions about Vietnam’s historical sites, cultural landmarks, and traditions.
- 🤖 Practice Room with RAG Chatbot: Hone your skills with a chatbot powered by Retrieval-Augmented Generation (RAG), offering dynamic questions, detailed explanations, and source references.
- 🏆 Daily Missions & Leaderboards: Complete daily tasks to earn rewards and compete with friends or other players on weekly and monthly leaderboards.
- 🔊 Customizable Audio: Adjust overall volume, background music, and sound effects to personalize your gaming experience.

---

## 🚀 Tech Stack

- **ReactJS**: Robust, flexible front-end library for a responsive, fast, interactive UI.

---

## 📂 Branch Naming Convention

Branches should be named according to their purpose and task:

```plaintext
<prefix>/<WDA-XX>-<task-name>
```

- **Prefix** options:
  - `feature/` – for new features
  - `fix/` – for bug fixes
  - `chore/` – for non-functional tasks
  - `refactor/` – for code restructuring

> Example: If your task is `[WDA-1][FE]Set up Github repository`, your branch name would be `feature/WDA-1-setup-github-repository`.

---

## 💾 Commit Message Convention

Follow a structured commit message format to maintain a clear history:

```plaintext
<prefix>(<WDA-XX>): <commit message>
```

- **Prefix** options:
  - `feat` – for new features
  - `fix` – for bug fixes
  - `chore` – for maintenance tasks
  - `refactor` – for code restructuring

> Example: If your branch is `[WDA-5][FE]create header and footer`, your commit message would be `feat(WDA-5): create header and footer`.

---

## 🔄 Development Workflow

The development process is organized for efficiency and consistency:

1. **Pull** the latest code from the main branch.
2. **Create a new branch** from the main branch.
3. **Code** your assigned task.
4. **Commit** changes and **stash** if needed.
5. **Switch to main branch** and pull any new updates.
6. **Switch back to your working branch** and merge any updates from `main` into it.
7. **Resolve conflicts** if any.
8. **Push** your branch to the remote repository.
9. **Create a pull request** and request reviews.
10. After approval, **squash and merge** the pull request.

```plaintext
┌───────────────────────────────┐
│        Pull from Main         │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│    Create New Branch from     │
│           Main                │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│             Code              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│     Commit and Stash if       │
│           Needed              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Switch to Main Branch and   │
│         Pull Updates          │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Switch to Working Branch    │
│    and Merge Updates from     │
│            Main               │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Resolve Conflicts if Any    │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│          Push to Remote       │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│      Create Pull Request      │
│   and Request Review from     │
│            Others             │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  After Approval, Squash and   │
│            Merge              │
└───────────────────────────────┘
```

---

### 📌 Notes for Enhanced Development Progress

- **Consistency**: Adhere strictly to naming and commit conventions to maintain a clear, readable history.
- **Frequent Pulls**: Regularly pull updates from the main branch to avoid large conflicts.
- **Communication**: Keep the team informed about your progress and any blockers to ensure a smooth workflow.
- **Review Requests**: Aim for timely reviews by tagging appropriate reviewers, especially for critical features.

---

## 📊 Project Graph

Here's an example of the high-level structure of this project:

```plaintext
.
├── src
│   ├── components     # Reusable components
│   ├── pages          # Main views/pages
│   ├── services       # API calls and services
│   ├── styles         # Global and component-specific styles
│   └── utils          # Helper functions and utilities
├── public
│   └── index.html     # Main HTML file
└── README.md
```

---

> **Happy Coding!** 🎉 Keep innovating and contributing to make VieAdven the go-to platform for exploring Vietnam’s rich cultural and historical heritage.
