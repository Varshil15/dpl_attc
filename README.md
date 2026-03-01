# 📚 Attendance Planner - Smart Attendance Forecasting System

A fully responsive and animated web application to help college students track, manage, and predict their attendance throughout the semester.

## 📁 File Structure

```
Attendance-Planner/
├── index.html                  # Main HTML structure
├── styles.css                  # All CSS styles and animations
├── script.js                   # JavaScript functionality
├── supabase-config.js         # Supabase configuration (with your credentials)
├── supabase-config.example.js # Example template for configuration
├── vercel.json                # Vercel deployment configuration
├── .gitignore                 # Git ignore file (protects credentials)
└── README.md                  # Project documentation
```

## ✨ Features

### 📊 Dashboard
- Real-time attendance percentage
- Total conducted & attended lectures
- Subject count tracking
- Animated progress bars
- Smart alerts and suggestions

### 📅 Timetable Management
- Add lectures with day, subject, and time
- Weekly schedule view
- Edit/Delete functionality
- Automatic weekly repetition

### ✅ Mark Attendance
- Date selector for any day
- Four attendance modes:
  - ✅ Attended
  - ❌ Absent
  - 🚫 Not Conducted
  - 🌐 Online Attended

### 🔮 Future Attendance Planner
- Select date range simulation
- Multiple attendance scenarios (100%, 80%, 50%, 0%)
- Real-time percentage calculation
- Day-wise breakdown

### 📖 Subject-wise Analytics
- Individual subject tracking
- Color-coded percentages
- Progress visualization

## 🎨 Design Features

- ✅ **Fully Responsive** - Mobile, tablet, and desktop
- ✅ **Smooth Animations** - Fade-ins, slides, hover effects
- ✅ **Modern UI** - Gradient backgrounds, card layouts
- ✅ **Interactive** - Hover effects, smooth transitions
- ✅ **Color-coded** - Visual feedback based on status
- ✅ **Local Storage** - Data persists in browser

## 🚀 How to Use

1. Open `index.html` in any modern web browser
2. **Sign in with Google** - Sync your data across devices
3. **Add Timetable** - Create your weekly lecture schedule
4. **Mark Attendance** - Select date and mark attendance for each lecture
5. **Plan Future** - Simulate future attendance for trips/leaves
6. **Track Progress** - View Dashboard and Subject-wise analytics

## 🌐 Deploy to Vercel

### Prerequisites
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable Google OAuth in Supabase Authentication settings
3. Get your Supabase URL and Anon Key from Project Settings → API

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy" (no build configuration needed)

3. **Configure Supabase OAuth**
   - Copy your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add to "Redirect URLs": `https://your-app.vercel.app`
   - Also add: `https://your-app.vercel.app/`
   - Click "Save"

4. **Test the Deployment**
   - Visit your Vercel URL
   - Click "Sign in with Google"
   - You should be redirected back after authentication

### Important Notes
- ✅ The `supabase-config.js` file contains your credentials
- ✅ Supabase Anon Key is safe to expose (protected by Row Level Security)
- ✅ Make sure RLS policies are enabled on your Supabase tables
- ✅ The `.gitignore` file is configured to protect sensitive files

### Custom Domain (Optional)
- In Vercel project settings, go to "Domains"
- Add your custom domain
- Update Supabase Redirect URLs with your custom domain

## 💻 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations, flexbox, and grid
- **JavaScript (ES6+)** - Vanilla JS for functionality
- **Supabase** - Backend-as-a-Service for authentication and data storage
- **Google OAuth** - Secure user authentication
- **LocalStorage API** - Data persistence and caching
- **Vercel** - Deployment platform

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
✅ **Cloud Sync** - Data syncs across all your devices via Supabase
- ✅ **Google Sign-In** - Secure authentication with your Google account
- ✅ **Offline Capable** - Works offline with LocalStorage caching
- ✅ **No Build Step** - Pure HTML, CSS, and JavaScript
- ✅ **Fast & Lightweight** - Optimized for performance
- ✅ **Production Ready** - Includes security headers and error handling
- ✅ **Clean Code** - ML, CSS, and JavaScript
- Offline-capable (LocalStorage)
- Fast and lightweight
- Clean, maintainable code structure

## 🔧 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
}
```

### Minimum Attendance Percentage
Edit the thresholds in `script.js`:
```javascript
if (percentage >= 75) { /* Good */ }
else if (percentage >= 65) { /* Warning */ }
else { /* Danger */ }
```

## 📄 License

Free to use for personal and educational purposes.

## 🙋‍♂️ Support

For issues or questions, refer to the inline code comments in each file.

---

Made with ❤️ for students who want to manage their attendance smartly!
