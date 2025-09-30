# 📱 React Native Todo App

A modern, feature-rich React Native Todo App with **CRUD operations**, **advanced filtering**, **search**, **sorting**, and **local persistence**.

## 🚀 Quick Start

### Prerequisites
- Node.js (v22 or higher)
- React Native CLI
- iOS Simulator (for iOS) or Android Studio (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShahrozKhadim/React-Native-Todo-App-with-Redux-Toolkit.git
   cd ReactNativeTodoApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## ✨ Core Features

### 📝 **Todo Management**
- **Create** new todos with name, description, due date, and time
- **Edit** existing todos with real-time updates
- **Delete** todos with confirmation
- **Toggle** completion status
- **Optimistic updates** for instant UI feedback

### 🔍 **Advanced Search & Filtering**
- **Text search** by name and description
- **Date filtering** (Today, This Week, This Month, Overdue, Custom Range)
- **Time filtering** (Morning, Afternoon, Evening, Night, Custom Range)
- **Status filtering** (All, Completed, Pending)
- **Real-time filtering** with debounced search

### 📊 **Sorting & Organization**
- **Sort by** Name, Due Date, Created Date, Time
- **Sort order** Ascending/Descending
- **Smart defaults** (newest first)
- **Persistent sorting** during session

### 📱 **User Experience**
- **Native date/time pickers** with Done/Cancel buttons
- **Responsive design** that works on all screen sizes
- **Pull-to-refresh** for data updates
- **Empty states** with helpful messages
- **Loading indicators** for better UX

### 💾 **Data Persistence**
- **Local storage** with AsyncStorage
- **Automatic sync** - todos persist across app restarts
- **Smart persistence** - filters reset on app launch for fresh experience
- **Optimistic updates** with rollback on API failures

### 🎨 **Modern Design**
- **Clean, intuitive interface**
- **Consistent design system**
- **Responsive layouts**
- **Smooth animations**
- **Platform-specific styling**

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Redux Toolkit** - State management
- **Redux Persist** - Data persistence
- **Formik + Yup** - Form handling and validation
- **React Navigation** - Screen navigation
- **Axios** - API requests
- **date-fns** - Date utilities

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React Native**