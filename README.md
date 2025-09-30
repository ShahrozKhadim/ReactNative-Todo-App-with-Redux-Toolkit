# 📱 React Native Todo App

A **feature-based React Native Todo App** built with **JavaScript**, **Redux Toolkit**, **redux-persist**, **Formik + Yup**, **Axios**, and **date-fns**.  
The app supports **CRUD operations, sorting, filtering, local persistence, and API integration**.

---

## 🚀 Tech Stack

### **Core Framework:**
- **React Native 0.81.4** - Cross-platform mobile development
- **React 19.1.0** - Latest React with concurrent features
- **JavaScript ES6+** - Modern JavaScript features

### **State Management:**
- **Redux Toolkit 2.9.0** - Modern Redux with less boilerplate
- **React Redux 9.2.0** - React bindings for Redux
- **Redux Persist 6.0.0** - State persistence across app restarts
- **AsyncStorage 2.2.0** - Local storage for React Native

### **Navigation & UI:**
- **React Navigation 7.x** - Stack navigator for screen navigation
- **React Native Gesture Handler 2.28.0** - Touch gesture handling
- **React Native Screens 4.16.0** - Native screen optimization
- **React Native Safe Area Context 5.6.1** - Safe area handling

### **Forms & Validation:**
- **Formik 2.4.6** - Form state management
- **Yup 1.7.1** - Schema validation
- **@react-native-community/datetimepicker 8.4.5** - Native date/time pickers

### **API & Data:**
- **Axios 1.12.2** - HTTP client for API requests
- **date-fns 4.1.0** - Modern date utility library
- **JSONPlaceholder API** - Demo API for testing

### **Design System:**
- **react-native-responsive-screen 1.4.2** - Responsive design utilities
- **Custom Design System** - Centralized colors, responsive, and shadows
- **No inline styles** - All styles use StyleSheet.create()

---

## 📂 Folder Structure (Feature-Based)

```
ReactNativeTodoApp/
 ├── src/
 │   ├── app/                # App-level setup
 │   │   ├── store.js        # Redux store config
 │   │   ├── rootReducer.js  # Combine feature slices
 │   │   └── App.js          # Root component
 │   │
 │   ├── navigation/         # App navigation
 │   │   └── AppNavigator.js
 │   │
 │   ├── features/
 │   │   └── todos/          # Todo feature
 │   │       ├── components/
 │   │       │   ├── TodoItem.js
 │   │       │   └── TodoForm.js
 │   │       ├── screens/
 │   │       │   ├── TodoListScreen.js
 │   │       │   ├── TodoDetailScreen.js
 │   │       │   └── AddTodoScreen.js
 │   │       ├── slices/
 │   │       │   └── todosSlice.js
 │   │       └── services/
 │   │           └── todoApi.js
 │   │
 │   ├── components/         # Reusable shared UI components
 │   │   ├── Button.js
 │   │   ├── Input.js
 │   │   ├── DatePicker.js
 │   │   ├── TimePicker.js
 │   │   ├── EmptyState.js
 │   │   └── AdvancedFilter.js
 │   │
 │   ├── utils/              # Helpers and utilities
 │   │   ├── filterUtils.js  # Advanced filtering logic
 │   │   └── index.js        # Barrel exports
 │   │
 │   ├── hooks/              # Custom hooks
 │   │   └── useOptimisticTodos.js
 │   │
 │   ├── data/               # Dummy data and test data
 │   │   └── dummyTodos.js
 │   │
 │   └── styles/             # Design system (no inline styles)
 │       ├── responsive.js   # Responsive utilities
 │       ├── colors.js      # Color palette
 │       └── shadows.js     # Shadow system
 │
 ├── android/               # Android-specific files
 ├── ios/                   # iOS-specific files
 ├── package.json
 ├── README.md
 └── index.js               # App entry point
```

---

## 🛠️ Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

#### **Required Software:**
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **React Native CLI** - Install globally: `npm install -g @react-native-community/cli`
- **Java Development Kit (JDK)** (v11 or higher) - [Download here](https://adoptium.net/)

#### **For iOS Development:**
- **Xcode** (v12 or higher) - [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **Xcode Command Line Tools** - Run: `xcode-select --install`
- **CocoaPods** - Install: `sudo gem install cocoapods`
- **iOS Simulator** (comes with Xcode)

#### **For Android Development:**
- **Android Studio** - [Download here](https://developer.android.com/studio)
- **Android SDK** (API level 28 or higher)
- **Android Emulator** or physical Android device
- **Java Development Kit (JDK)** (v11 or higher)

### 📱 Installation Steps

#### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/react-native-todo-app.git
cd react-native-todo-app
```

#### **2. Install Dependencies**

```bash
# Install Node.js dependencies
npm install

# For iOS: Install CocoaPods dependencies
cd ios && pod install && cd ..
```

#### **3. Environment Setup**

##### **Android Setup:**
1. Open Android Studio
2. Go to **Tools > SDK Manager**
3. Install **Android SDK Platform 28** and **Android SDK Build-Tools 28.0.3**
4. Set up **ANDROID_HOME** environment variable:
   ```bash
   # Add to your ~/.bashrc or ~/.zshrc
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

##### **iOS Setup:**
1. Open Xcode
2. Accept Xcode license: `sudo xcodebuild -license accept`
3. Install iOS Simulator from Xcode preferences

#### **4. Run the Application**

##### **For Android:**
```bash
# Start Metro bundler
npm start

# In a new terminal, run Android app
npm run android

# Or run directly
npx react-native run-android
```

##### **For iOS:**
```bash
# Start Metro bundler
npm start

# In a new terminal, run iOS app
npm run ios

# Or run directly
npx react-native run-ios
```

### 🔧 Troubleshooting

#### **Common Issues & Solutions:**

##### **Metro bundler issues:**
```bash
# Clear Metro cache
npm run reset-cache

# Or manually
npx react-native start --reset-cache
```

##### **Android build issues:**
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Reset Android cache
npx react-native start --reset-cache
```

##### **iOS build issues:**
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Reset iOS cache
npx react-native start --reset-cache
```

##### **Node modules issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# For iOS, also reinstall pods
cd ios && pod install && cd ..
```

##### **Port already in use:**
```bash
# Kill Metro bundler
npx react-native start --port 8081

# Or kill process on port 8081
lsof -ti:8081 | xargs kill -9
```

### 📱 Device Setup

#### **Android Device/Emulator:**
1. **Enable Developer Options** on your Android device
2. **Enable USB Debugging**
3. **Connect device** via USB or start Android emulator
4. **Verify connection**: `adb devices`

#### **iOS Device/Simulator:**
1. **Open iOS Simulator** from Xcode
2. **Or connect physical device** and trust the developer certificate
3. **Run the app** and trust the developer profile when prompted

### 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Start development server
npm start

# Run on Android (in new terminal)
npm run android

# Run on iOS (in new terminal)
npm run ios

# Clean and reset everything
npm run clean
npm run reset-cache
```

### 📋 Verification Checklist

Before running the app, ensure:

- [ ] Node.js v16+ installed
- [ ] React Native CLI installed globally
- [ ] Android Studio/Xcode installed
- [ ] Android SDK/Java JDK configured
- [ ] iOS Simulator available (for iOS)
- [ ] Android Emulator/Device connected (for Android)
- [ ] Dependencies installed (`npm install`)
- [ ] iOS pods installed (`pod install`)
- [ ] Environment variables set (Android)

### 🆘 Getting Help

If you encounter issues:

1. **Check React Native documentation**: [React Native Setup](https://reactnative.dev/docs/environment-setup)
2. **Clear all caches**: `npm run clean && npm run reset-cache`
3. **Reinstall dependencies**: `rm -rf node_modules && npm install`
4. **Check Metro bundler logs** for specific error messages
5. **Verify your development environment** matches the requirements

---

## ✨ Features

### **📝 Core Functionality**
- **Full CRUD Operations** - Create, read, update, and delete todos with instant UI feedback
- **Optimistic Updates** - Immediate UI updates with API synchronization and rollback capability
- **Local Persistence** - Data persists across app restarts using Redux Persist + AsyncStorage
- **Real-time State Management** - Live data synchronization with Redux Toolkit

### **🔍 Advanced Search & Filtering**
- **Smart Text Search** - Search todos by name and description with debounced input
- **Date Filtering** - Filter by today, this week, this month, overdue, or custom date range
- **Time Filtering** - Filter by morning, afternoon, evening, night, or custom time range
- **Advanced Filter Modal** - Comprehensive filtering interface with multiple options
- **Filter Summary** - Visual indication of active filters with clear all option

### **📊 Sorting & Organization**
- **Multi-level Sorting** - Sort by name, date, time, or creation date
- **Ascending/Descending** - Toggle sort order for all fields
- **Pagination** - Efficient handling of large datasets with infinite scroll
- **Performance Optimization** - FlatList optimizations for smooth scrolling

### **📱 User Experience**
- **Native Date/Time Pickers** - Platform-specific date and time selection components
- **Responsive Design** - Works perfectly on all screen sizes using responsive utilities
- **Modern UI Components** - Custom Button, Input, DatePicker, TimePicker components
- **Empty States** - Helpful empty state components with actionable CTAs
- **Loading States** - Smooth loading indicators and skeleton screens

### **🛠️ Technical Architecture**
- **Redux Toolkit Slices** - Modern state management with createSlice and createAsyncThunk
- **Custom Hooks** - useOptimisticTodos hook for reusable optimistic update logic
- **Service Layer** - Clean API integration with JSONPlaceholder
- **Form Handling** - Formik + Yup for robust form validation and state management
- **Design System** - Centralized colors, responsive utilities, and shadow system
- **Error Handling** - Silent error handling with graceful fallbacks
- **Performance** - Memoized components and optimized re-renders

---

## 🧑‍💻 Code Implementation Guidelines

### 1. **State Management with Redux Toolkit**
- **Slices**: Use `createSlice` for synchronous actions and `createAsyncThunk` for API calls
- **Optimistic Updates**: Immediate UI updates with rollback capability
- **Persistence**: Redux Persist + AsyncStorage for data persistence
- **Actions**: `addTodo`, `updateTodo`, `deleteTodo`, `sortTodos`, `filterTodos`, `searchTodos`

### 2. **Custom Hooks Pattern**
- **useOptimisticTodos**: Centralized optimistic update logic
- **Reusable Logic**: Custom hooks for complex state operations
- **Separation of Concerns**: Business logic separated from UI components

### 3. **Form Handling & Validation**
- **Formik**: Form state management with built-in validation
- **Yup Schemas**: Comprehensive validation rules for all form fields
- **Native Pickers**: DatePicker and TimePicker components with validation
- **Error Handling**: User-friendly error messages and validation feedback

### 4. **Advanced Filtering System**
- **filterUtils.js**: Centralized filtering logic for complex queries
- **Date Filtering**: Today, this week, this month, overdue, custom ranges
- **Time Filtering**: Morning, afternoon, evening, night, custom ranges
- **Text Search**: Debounced search with name and description matching

### 5. **Performance Optimization**
- **FlatList Optimizations**: `removeClippedSubviews`, `getItemLayout`, `maxToRenderPerBatch`
- **Memoization**: `React.memo`, `useCallback`, `useMemo` for preventing unnecessary re-renders
- **Pagination**: Efficient handling of large datasets with infinite scroll
- **Debounced Search**: Optimized search with 300ms debounce

### 6. **Design System Architecture**
- **Centralized Styling**: `colors.js`, `responsive.js`, `shadows.js`
- **No Inline Styles**: All styles use `StyleSheet.create()`
- **Responsive Design**: Percentage-based sizing with `react-native-responsive-screen`
- **Consistent Theming**: Unified color palette and spacing system

### 7. **API Integration**
- **Service Layer**: Clean separation with `todoApi.js`
- **Error Handling**: Silent error handling with graceful fallbacks
- **Data Transformation**: Consistent data structure between API and app
- **JSONPlaceholder**: Demo API for testing and development

### 8. **Navigation & Routing**
- **React Navigation**: Stack navigator with proper screen configuration
- **Screen Options**: Dynamic titles and styling based on route params
- **Navigation Flow**: TodoList → TodoDetail → AddTodo seamless navigation

### 9. **Code Quality & Standards**
- **ESLint + Prettier**: Automated code formatting and linting
- **JSDoc Comments**: Comprehensive documentation for complex functions
- **Feature-based Architecture**: Organized by features, not file types
- **Clean Code**: No console logs, minimal comments, production-ready

---

## ✅ Best Practices

### **🏗️ Architecture Patterns**
- **Feature-based Organization**: Group related files by feature, not file type
- **Separation of Concerns**: Business logic in hooks, UI logic in components
- **Single Responsibility**: Each component and hook has one clear purpose
- **DRY Principle**: Reusable components and utilities to avoid code duplication

### **📱 React Native Best Practices**
- **Performance First**: Use FlatList optimizations, memoization, and lazy loading
- **Responsive Design**: Always use responsive utilities, never hardcoded values
- **Native Components**: Leverage native date/time pickers for better UX
- **Memory Management**: Proper cleanup of listeners and subscriptions

### **🔧 Code Quality Standards**
- **No Inline Styles**: All styles use `StyleSheet.create()` with centralized design system
- **No Magic Numbers**: Use responsive utilities and design system constants
- **Clean Code**: No console logs, minimal comments, production-ready code
- **Error Handling**: Silent error handling with graceful fallbacks

### **📊 State Management**
- **Redux Toolkit**: Modern Redux patterns with less boilerplate
- **Optimistic Updates**: Immediate UI feedback with rollback capability
- **Persistence**: Automatic state persistence across app restarts
- **Normalized State**: Efficient data structure for complex operations

### **🎨 Design System**
- **Centralized Styling**: Single source of truth for colors, spacing, and typography
- **Consistent UI**: Reusable components with consistent behavior
- **Accessibility**: Proper touch targets and screen reader support
- **Platform Consistency**: iOS and Android specific optimizations

### **⚡ Performance Optimization**
- **Memoization**: Prevent unnecessary re-renders with React.memo and hooks
- **Lazy Loading**: Load components and data only when needed
- **Efficient Lists**: FlatList optimizations for large datasets
- **Debounced Operations**: Optimize search and filtering operations

---

## 📌 Example Todo Object

```json
{
  "id": "1",
  "name": "Complete React Native Todo App",
  "description": "Finish implementing all features including CRUD operations, sorting, and filtering",
  "dueDate": "2024-01-15",
  "time": "18:00",
  "completed": false,
  "createdAt": "2024-01-10T10:00:00.000Z",
  "updatedAt": "2024-01-10T10:00:00.000Z"
}
```

### **📊 Redux State Structure**

```javascript
{
  "todos": {
    "todos": [...], // Array of todo objects
    "loading": false,
    "error": null,
    "searchQuery": "",
    "filterBy": "all",
    "sortBy": "createdAt",
    "sortOrder": "desc",
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalItems": 0,
      "hasNextPage": false,
      "hasPreviousPage": false,
      "isLoadingMore": false
    },
    "filters": {
      "dateFilter": "all",
      "timeFilter": "all",
      "customDateRange": { "start": null, "end": null },
      "customTimeRange": { "start": null, "end": null }
    }
  }
}
```

---

## 🎯 Current Project Status

### **✅ Completed Features**
- **Full CRUD Operations** with optimistic updates
- **Advanced Search & Filtering** with debounced input
- **Multi-level Sorting** with pagination support
- **Native Date/Time Pickers** with validation
- **Responsive Design** with centralized styling
- **Redux Toolkit** state management with persistence
- **API Integration** with JSONPlaceholder
- **Performance Optimizations** for large datasets
- **Clean Codebase** with no console logs or unnecessary comments

### **🔧 Technical Implementation**
- **76 files** with **22,052+ lines** of production-ready code
- **Feature-based architecture** with clean separation of concerns
- **Custom hooks** for reusable business logic
- **Advanced filtering system** with complex date/time queries
- **Optimistic updates** with silent error handling
- **FlatList optimizations** for smooth performance
- **Comprehensive documentation** with setup instructions

### **📱 User Experience**
- **Intuitive Navigation** between screens
- **Instant UI Feedback** with optimistic updates
- **Smooth Performance** with optimized rendering
- **Responsive Design** across all screen sizes
- **Native Feel** with platform-specific components
- **Error Handling** with graceful fallbacks

---

## 🚀 Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run clean` - Clean build cache
- `npm run reset-cache` - Reset Metro cache
- `npm run build:android` - Build Android release
- `npm run build:ios` - Build iOS release

---

## 📝 Submission Guidelines

- Push your code to GitHub/GitLab.
- Include this README.
- Make sure your code follows the folder structure and best practices.
- Ensure the app runs on both Android and iOS.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [Formik](https://formik.org/)
- [date-fns](https://date-fns.org/)