# 📱 React Native Todo App

A **feature-based React Native Todo App** built with **JavaScript**, **Redux Toolkit**, **redux-persist**, **Formik + Yup**, **Axios**, and **date-fns**.  
The app supports **CRUD operations, sorting, filtering, local persistence, and API integration**.

---

## 🚀 Tech Stack

- **React Native CLI**
- **Redux Toolkit + React Redux** (state management)
- **redux-persist + AsyncStorage** (local persistence)
- **Axios** (API requests)
- **Formik + Yup** (form handling + validation)
- **date-fns** (date/time formatting)
- **react-native-responsive-screen** (responsive sizing)
- **@react-native-community/datetimepicker** (native date/time pickers)
- **Custom Design System** (`responsive.js`, `colors.js`, `shadows.js`)

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
- **Full CRUD Operations** - Create, read, update, and delete todos
- **Optimistic Updates** - Instant UI feedback with API synchronization
- **Local Persistence** - Data persists across app restarts using `redux-persist`
- **Real-time Updates** - Live data synchronization

### **🔍 Advanced Features**
- **Smart Search** - Search todos by name and description
- **Advanced Filtering** - Filter by date (today, this week, this month, overdue, custom range)
- **Time Filtering** - Filter by time (morning, afternoon, evening, night, custom range)
- **Multi-level Sorting** - Sort by name, date, time (ascending/descending)
- **Pagination** - Efficient handling of large datasets

### **📱 User Experience**
- **Native Date/Time Pickers** - Platform-specific date and time selection
- **Responsive Design** - Works perfectly on all screen sizes
- **Modern UI** - Clean, intuitive interface with native feel
- **Performance Optimized** - FlatList optimizations for large datasets
- **Error Handling** - Graceful error management with silent fallbacks

### **🛠️ Technical Features**
- **API Integration** - Fetch todos from [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos)
- **Redux Toolkit** - Modern state management with slices
- **Form Validation** - Formik + Yup for robust form handling
- **Custom Hooks** - Reusable logic for optimistic updates
- **Design System** - Centralized colors, responsive utilities, and shadows
- **TypeScript Ready** - Well-structured for easy TypeScript migration

---

## 🧑‍💻 Code Implementation Guidelines

### 1. **State Management**
- Use **Redux Toolkit slices** inside each feature.
- `todosSlice.js` handles actions:
  - `addTodo`
  - `updateTodo`
  - `deleteTodo`
  - `sortTodos`
  - `filterTodos`
  - `fetchTodos` (API integration)

### 2. **Forms & Validation**
- Use **Formik** for input handling.
- Validate using **Yup** (e.g., name required, due date valid, etc).

### 3. **Responsive UI**
- Use `responsive.js` helpers for **font sizes, padding, margins**.
- Use `colors.js` for **all color references**.
- Use `shadows.js` for **consistent elevations**.
- **Never use inline styles.** Always use `StyleSheet.create()`.

### 4. **API Calls**
- Create API functions in `todoApi.js` using **Axios**.
- Use **createAsyncThunk** in `todosSlice.js` to handle async logic.
- Store fetched todos in Redux state.

### 5. **Persistence**
- Use `redux-persist` + `AsyncStorage` to persist Redux state.
- Define persist config in `store.js`.

### 6. **Service Architecture**
- **`apiService.js`**: Real API calls to JSONPlaceholder
- **`dummyService.js`**: Dummy data service for development
- **`todoService.js`**: Service selector (switches between real/dummy)
- **Configuration**: Set `USE_DUMMY_SERVICE` in `todoService.js`

### 7. **Navigation**
- Use **React Navigation** (Stack Navigator).
- Example:
  - `TodoListScreen`
  - `TodoDetailScreen`
  - `AddTodoScreen`

### 8. **Code Style**
- Use **ESLint + Prettier** for consistency.
- Add **JSDoc comments** for complex functions and slices.

---

## ✅ Best Practices

- Organize by **feature** (not type).
- Keep slices, screens, services, and components **inside the feature folder**.
- Use **shared components** for generic UI (Button, Input).
- Use `StyleSheet.create()` and centralized style system.
- Avoid **inline styling** and **magic numbers**.
- Keep functions **small, reusable, and testable**.
- Always handle **errors and empty states** gracefully.
- Error boundary implementation

---

## 📌 Example Todo Object

```json
{
  "id": "1",
  "name": "Finish project",
  "description": "Complete the React Native assessment",
  "dueDate": "2025-10-01",
  "time": "15:30",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

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