# Firebase Setup Guide for Prodigy Pathways

## 🚀 Quick Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/project/prodigy-pathways/overview)
2. Click "Create a project"
3. Project name: `prodigy-pathways`
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

### 3. Create Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

### 4. Get Firebase Configuration
1. In Firebase Console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web" icon (`</>`)
4. App nickname: `prodigy-pathways-web`
5. Click "Register app"
6. Copy the configuration object

### 5. Update Configuration
Replace the placeholder values in `firebase-config.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "prodigy-pathways.firebaseapp.com",
    projectId: "prodigy-pathways",
    storageBucket: "prodigy-pathways.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 6. Set Up Security Rules (Important!)
In Firestore Database → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Quiz results - users can read/write their own
    match /quiz_results/{resultId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Questions - read-only for authenticated users
    match /questions/{questionId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write questions
    }
    
    // User progress - users can read/write their own
    match /user_progress/{progressId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Learning paths - users can read/write their own
    match /learning_paths/{pathId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### 7. Seed the Database
1. Open your website in browser
2. Open browser console (F12)
3. Run: `seedDatabase()`
4. Wait for "Database seeded successfully!" message

## 📁 File Structure

```
D:\srm\
├── html/
│   └── index.html          # Main HTML file
├── css/
│   └── style.css           # Styles
├── js/
│   └── script.js           # Main JavaScript
├── firebase-config.js      # Firebase configuration
├── database-schema.js      # Database structure & functions
├── seed-database.js        # Sample questions
└── FIREBASE_SETUP.md       # This guide
```

## 🔧 Testing the Setup

### 1. Test Firebase Connection
Open browser console and run:
```javascript
checkDatabaseStatus()
```

Expected output:
```javascript
{
  initialized: true,
  hasQuestions: true,
  questionCount: 15,
  message: "Database has questions"
}
```

### 2. Test User Registration
1. Go to Register page
2. Fill in the form
3. Submit
4. Check Firebase Console → Authentication for new user

### 3. Test Quiz Functionality
1. Login with registered user
2. Select domain and difficulty
3. Take a quiz
4. Check Firebase Console → Firestore for quiz results

## 🚨 Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**
   - Check if all script files are loaded
   - Verify Firebase config is correct
   - Check browser console for errors

2. **"Permission denied"**
   - Check Firestore security rules
   - Ensure user is authenticated
   - Verify user has proper permissions

3. **"No questions found"**
   - Run `seedDatabase()` in console
   - Check if questions were added to Firestore
   - Verify domain and difficulty match

4. **Authentication errors**
   - Check if Email/Password is enabled
   - Verify user exists in Firebase Console
   - Check for typos in email/password

5. **"Identity Toolkit API has not been used"**
   - Enable Identity Toolkit API: https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview?project=73987949987
   - Or enable Email/Password in Firebase Console → Authentication → Sign-in method
   - Wait 2-3 minutes for API to propagate

6. **"requests-to-this-api-identitytoolkit-method-are-blocked"**
   - Enable billing for your Firebase project: https://console.cloud.google.com/billing/projects?project=73987949987
   - Go to Firebase Console → Authentication → Settings → Advanced
   - Ensure "Sign-in method" is enabled and not restricted
   - Check if you're on free plan and quotas are exceeded

### Debug Commands:
```javascript
// Check Firebase status
checkDatabaseStatus()

// Seed database with questions
seedDatabase()

// Check current user
console.log(window.firebase.auth.currentUser)

// Check database manager
console.log(window.dbManager)
```

## 📊 Database Collections

### Users Collection
```javascript
{
  uid: "user123",
  name: "John Doe",
  email: "john@example.com",
  age: 25,
  phone: "+1234567890",
  domain: "programming",
  createdAt: "2025-01-01T00:00:00Z",
  totalQuizzes: 5,
  averageScore: 85.5,
  learningStreak: 3
}
```

### Quiz Results Collection
```javascript
{
  userId: "user123",
  domain: "programming",
  difficulty: "medium",
  totalQuestions: 10,
  correctAnswers: 8,
  percentage: 80,
  topics: [...],
  weakAreas: [...],
  completedAt: "2025-01-01T00:00:00Z"
}
```

### Questions Collection
```javascript
{
  domain: "programming",
  topic: "Algorithms",
  difficulty: "medium",
  question: "What is the time complexity of binary search?",
  options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
  correctAnswer: 1,
  explanation: "...",
  resources: {...}
}
```

## 🔐 Security Best Practices

1. **Never expose API keys in client-side code** (for production)
2. **Use environment variables** for sensitive data
3. **Implement proper Firestore security rules**
4. **Validate data on both client and server**
5. **Use HTTPS in production**

## 🚀 Production Deployment

1. **Update security rules** for production
2. **Set up proper authentication flows**
3. **Implement data validation**
4. **Add error handling and logging**
5. **Set up monitoring and analytics**

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify Firebase Console settings
3. Test with the debug commands above
4. Check this guide for common solutions

---

**Last Updated**: January 2025
**Version**: 1.0.0
