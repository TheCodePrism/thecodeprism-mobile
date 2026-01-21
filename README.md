# TheCodePrism Admin Mobile

A premium mobile administration dashboard built with React Native and Expo, designed for managing TheCodePrism platform on the go.

## ✨ Features

- **🔒 Premium Authentication**: Secure login flow with sleek UI.
- **🛡️ Biometric Security**: FaceID/TouchID/Passcode verification for admin actions.
- **📸 QR Scanner**: Integrated scanner for session authorization and management.
- **📊 Admin Dashboard**: Real-time view of platform statistics and active sessions.
- **🔔 Smart Notifications**: Stay updated with push notifications for critical events.
- **🎨 Elite UI/UX**: Glassmorphism effects, smooth animations, and a rich dark-themed interface.

## 🚀 Tech Stack

- **Framework**: React Native with [Expo](https://expo.dev/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore, Auth, Cloud Messaging)
- **UI Components**: 
  - `expo-linear-gradient` for premium aesthetics
  - `@expo/vector-icons` for rich iconography
- **Security**: `expo-local-authentication`
- **Interactions**: `expo-camera`, `expo-barcode-scanner`

## 🛠️ Getting Started

### Prerequisites

- Node.js (LTS)
- npm or yarn
- Expo Go app on your mobile device (for development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TheCodePrism/thecodeprism-mobile.git
   cd thecodeprism-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a `.env` file based on your Firebase configuration.
   - Ensure `firebase.js` is correctly configured with your environment variables.

### Running the App

```bash
npx expo start
```

Use the Expo Go app to scan the QR code and start exploring!

## 📁 Project Structure

- `src/components`: UI components (Login, Dashboard, Scanner).
- `src/hooks`: Custom React hooks for auth and data.
- `src/services`: API and business logic (Firebase, Notifications).
- `src/styles`: Theme and global styling tokens.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by [TheCodePrism Team](https://github.com/TheCodePrism)
