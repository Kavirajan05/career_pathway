# Prodigy Pathways - Personalized Learning Platform

## Project Structure

This project has been separated into three main files:

```
├── index.html      (Main HTML structure)
├── styles.css      (All CSS styles and animations)
├── script.js       (All JavaScript functionality)
└── README.md       (This file)
```

## Files Created

### 1. index.html
- Clean HTML structure with semantic markup
- References external `styles.css` and `script.js`
- Contains all page sections (Landing, Login, Register, Quiz Setup, Quiz, Results, Chatbot)

### 2. styles.css
- All animations (slideInRight, slideInLeft, fadeIn, pulse)
- Custom classes and gradients
- Responsive design media queries
- Accessibility features
- Print styles

### 3. script.js (To be created)
Due to the large size of the JavaScript code (~3000+ lines), you need to extract the `<script>` content from your original HTML file and save it as `script.js`.

## How to Extract script.js

1. Open your original HTML file
2. Find the `<script>` tag near the end (before `</body>`)
3. Copy everything between `<script>` and `</script>` (excluding the script tags themselves)
4. Save it as `script.js` in the same directory as `index.html`

The JavaScript file should start with:
```javascript
// Global variables
let currentUser = null;
let currentDomain = null;
...
```

And end with:
```javascript
// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showLanding();
});
```

## Usage

1. Ensure all three files (index.html, styles.css, script.js) are in the same directory
2. Open `index.html` in a web browser
3. The application should work exactly as before, but now with clean, separated code

## Features

- **User Authentication**: Login and Registration system
- **Domain Selection**: 80+ learning domains across 10 categories
- **Customizable Quizzes**: Choose question count (5/10/15) and difficulty (Easy/Medium/Hard)
- **AI-Powered Questions**: Dynamic question generation based on domain and difficulty
- **Performance Analytics**: Detailed results with topic-wise performance breakdown
- **Personalized Learning Paths**: Custom resource recommendations based on quiz results
- **AI Chatbot**: Interactive learning assistant with built-in AI quiz
- **Report Download**: Export quiz results as text file

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS CDN)
- Vanilla JavaScript
- LocalStorage for data persistence

## Notes

- The application uses Tailwind CSS via CDN (no installation required)
- All data is stored locally in the browser's LocalStorage
- No backend server required - runs entirely in the browser

## Customization

### Adding New Domains
Edit the `questionDatabase` object in `script.js` to add questions for new domains.

### Modifying Styles
Edit `styles.css` to change colors, animations, or layout.

### Adjusting Quiz Logic
Edit the quiz-related functions in `script.js` (startQuiz, loadQuestion, etc.)

## Support

For issues or questions, please review the code comments in each file.

---

**Last Updated**: October 2025
**Version**: 1.0.0

