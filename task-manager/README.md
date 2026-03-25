# Task Manager

A stunning, simple, and secure task management application featuring a glassmorphic UI, modern Vanilla CSS, Atomic Design architecture, and Firebase integration.

## Features

- **Authentication**: Email/password signup and login using Firebase Auth.
- **Task Management**: Create, read, update, and delete tasks with Firebase Firestore.
- **Task Sorting/Organization**: Kanban-style board ("To Do", "In Progress", "Done").
- **Search & Filter**: Find tasks instantly using the dashboard search bar.
- **Toasts**: Beautiful animated toast notifications for user actions.
- **Security**: Strict Firebase Security Rules (`firestore.rules`) block cross-user data access.
- **Protected Routing**: Authenticated users only.

## Tech Stack

- **Frontend Framework**: React (Vite)
- **State Management**: Redux Toolkit (Slices + Async Thunks)
- **Styling**: Vanilla CSS Variables, Glassmorphism, CSS Grid/Flexbox
- **Backend/Database**: Firebase v9 Modular SDK (Auth & Firestore)
- **Architecture**: Atomic Design (`atoms`, `molecules`, `organisms`, `templates`)

## Setup Instructions

1. **Clone the repository** (if pushed to GitHub):
   ```bash
   git clone <repository_url>
   cd task-manager
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Configuration**:
   The app uses a configuration located in `src/services/firebase.js`. To use your own Firebase project:
   - Create a Firebase project at console.firebase.google.com.
   - Enable Authentication (Email/Password) and Firestore Database.
   - Deploy the provided `firestore.rules`.
   - Update `src/services/firebase.js` with your explicit config keys.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Security Rules Deployment

To deploy the provided security rules to your own Firebase project:
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```
