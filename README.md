# KisanVerse-v2 🌾

**Empowering Indian Farmers through Technology & Financial Literacy**

KisanVerse is a comprehensive, voice-first mobile application designed specifically for Indian farmers. It bridges the gap between traditional farming and modern agricultural technology by providing tools for farm management, market access, government schemes, and financial services in a simple, accessible, and bilingual (English/Hindi) interface.

---

## 🚀 Key Features

### 🌍 Bilingual & Voice-First
- **Language Support**: Full support for **English** and **Hindi**, with easy switching.
- **Voice Navigation**: Navigate the app hands-free using voice commands (e.g., "Market", "Farm").
- **Text-to-Speech**: App reads out critical information for better accessibility.

### 🚜 Farm Management
- **My Farm**: Track crop stages, health, and expected yield.
- **Task Reminders**: Get timely alerts for watering, fertilizing, and insurance.
- **Crop Doctor**: AI-powered disease detection and advice (Coming Soon).

### 💰 Financial Services & Market
- **Smart Marketplace**: View real-time Mandi rates (APMC) and sell produce directly.
- **Cooperative**: Manage savings, view reputation scores, and apply for low-interest loans.
- **Scheme Mitra**: Discover and apply for government schemes like PM-KISAN.
- **Digital Locker**: Securely store land records (7/12), Aadhar, and other documents.

### 🚚 Logistics & Services
- **On-Demand Services**: Book **Drones** for spraying, **Trucks** for transport, or hire **Farm Labor**.
- **Transparent Pricing**: Upfront cost estimates for all services.

### 🏆 Gamified Rewards
- **Earn Coins**: Complete tasks and learn financial concepts to earn rewards.
- **Redeem**: Use coins to buy seeds, fertilizers, or tools in the app.

---

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 54)
- **Language**: JavaScript (ES6+)
- **Navigation**: [React Navigation 7](https://reactnavigation.org/)
- **State Management**: React Hooks & Context API
- **Local Storage**: `@react-native-async-storage/async-storage`
- **Backend/Auth**: Firebase (Configured)
- **UI/UX**: `expo-linear-gradient`, Custom Components
- **Speech**: `expo-speech`

---

## 📱 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- **Expo Go** app on your Android/iOS device (for testing)

---

## ⚙️ Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/KisanVerse-v2.git
    cd KisanVerse-v2
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

---

## ▶️ Running the App

1.  **Start the development server**:
    ```bash
    npm start
    # or
    npx expo start
    ```

2.  **Run on Device**:
    - Open the **Expo Go** app on your phone.
    - Scan the **QR code** displayed in the terminal.

3.  **Run on Emulator**:
    - Press `a` for Android Emulator.
    - Press `i` for iOS Simulator (macOS only).

---

## 📦 Building the APK

To generate a standalone APK for Android devices:

1.  **Install EAS CLI** (if not already installed):
    ```bash
    npm install -g eas-cli
    ```

2.  **Login to Expo**:
    ```bash
    eas login
    ```

3.  **Build the APK**:
    ```bash
    eas build -p android --profile preview
    ```
    *Note: The `eas.json` file is already configured with a `preview` profile for APK generation.*

4.  **Download**:
    Use the link provided in the terminal to download and install the APK.

---

## 📂 Project Structure

```
KisanVerse-v2/
├── assets/                 # Images, icons, and static assets
├── src/
│   ├── components/         # Reusable UI components (VoiceNav, Cards)
│   ├── screens/            # Application screens (Home, Farm, Market, etc.)
│   ├── services/           # Business logic (TranslationService, API calls)
│   └── navigation/         # Navigation configuration (if separated)
├── App.js                  # Main entry point & Navigation Setup
├── app.json                # Expo configuration
├── eas.json                # EAS Build configuration
└── package.json            # Dependencies and scripts
```

---

## 📝 Releases

### **v1.0.0 (Initial Release) - 2026-02-08**
- **Core Features**:
    - Complete Bilingual UI (English/Hindi).
    - Fully functional navigation (Stack Navigator).
    - Integrated Voice Navigation component.
- **New Modules**:
    - **Digital Locker**: Document storage and verification status.
    - **Logistics**: Booking flow for Drones, Trucks, and Labor.
    - **Settings**: Language switching and Profile management.
- **Improvements**:
    - Enhanced `TranslationService` with comprehensive keys.
    - Refactored `HomeScreen` for better modularity.
    - Fixed navigation bugs for "Digi Locker" and "Settings".

### **Upcoming Features (Roadmap)**
- **v1.1.0**: Backend integration for real-time market data.
- **v1.2.0**: Integration of Crop Doctor diagnostic AI model.
- **v1.3.0**: Payment gateway integration for Marketplace.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

## 📄 License

This project is licensed under the MIT License.
