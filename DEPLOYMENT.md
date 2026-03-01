# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment (Already Done)
- [x] Created `.gitignore` file (supabase-config.js is now INCLUDED for deployment)
- [x] Created `vercel.json` configuration
- [x] Improved OAuth redirect handling for production
- [x] Added error handling and debugging logs
- [x] Added security headers in vercel.json

**IMPORTANT:** The `supabase-config.js` file IS included in deployment because:
- Supabase anon key is designed to be used client-side
- It's protected by Row Level Security (RLS) on the database
- This is the standard and secure way to use Supabase in web apps

## 📋 What You Need to Do

### 1. Configure Supabase (IMPORTANT!)
After deploying to Vercel, you MUST update your Supabase settings:

1. Deploy your site to Vercel first (see step 2)
2. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
3. Go to [Supabase Dashboard](https://app.supabase.com)
4. Navigate to: **Authentication** → **URL Configuration**
5. Under **Redirect URLs**, add these URLs:
   - `https://your-app.vercel.app`
   - `https://your-app.vercel.app/`
   - `http://localhost:5500` (for local testing)
   - `http://localhost:5500/` (for local testing)
   
6. Click **Save**

❗ **Without this step, Google login will NOT work on Vercel!**

### 2. Deploy to Vercel

#### Option A: Via GitHub (Recommended)
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Create a GitHub repo and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy" (no configuration needed)
5. Wait for deployment to complete
6. Copy your deployment URL

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (run in project directory)
vercel

# Follow the prompts
# For production deployment:
vercel --prod
```

### 3. Update Supabase Redirect URLs
- Use the URL from step 2
- Add it to Supabase as described in step 1

### 4. Test Your Deployment
1. Visit your Vercel URL
2. **Open browser console** (F12 → Console tab)
3. Look for these messages:
   - ✅ `Supabase client initialized`
   - ✅ `Checking Supabase: {supabaseExists: true}`
4. Click "Sign in with Google"
5. Check console for: `🔵 Sign in button clicked`
6. If you see errors, check the error messages in console
7. Verify you're redirected to Google for sign-in
8. After signing in, you should be redirected back to your app
9. Test adding timetable and marking attendance
10. Sign out and sign back in to verify data persistence

### Common Issues & Solutions

#### Issue 1: Button Click Does Nothing
**Symptoms:** Button doesn't respond, no console logs
**Solution:**
- Open browser console (F12)
- Check if there's a red error about `signInWithGoogle is not defined`
- This means `supabase-config.js` didn't load
- Verify the file is deployed (check Vercel deployment logs)

#### Issue 2: "Invalid Redirect URL" Error
**Symptoms:** Error message about redirect URL
**Solution:**
1. Copy your exact Vercel URL (e.g., `https://dpl-attc.vercel.app`)
2. Go to Supabase → Authentication → URL Configuration
3. Add these EXACTLY:
   - `https://dpl-attc.vercel.app`
   - `https://dpl-attc.vercel.app/`
   - `https://dpl-attc-*.vercel.app` (for preview deployments)
4. Click Save and try again

#### Issue 3: Google OAuth Not Enabled
**Symptoms:** Error about provider not enabled
**Solution:**
1. Go to Supabase → Authentication → Providers
2. Find "Google" and click to expand
3. Toggle "Enable Sign in with Google"
4. Add your Google OAuth Client ID and Secret
5. For testing, you can use Supabase's development credentials
6. Click Save

## 🔒 Security Checklist

- [x] `.gitignore` includes `supabase-config.js`
- [x] Security headers configured in `vercel.json`
- [ ] Verify Supabase Row Level Security (RLS) is enabled
- [ ] Test that users can only access their own data

### To Enable RLS (If Not Already):
1. Go to Supabase Dashboard → **Table Editor**
2. For tables `user_profiles` and `user_data`:
   - Click the table
   - Enable RLS
   - Add policy: Users can only read/write their own rows
   
Example RLS Policy:
```sql
-- For user_data table
CREATE POLICY "Users can view own data"
ON user_data
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data"
ON user_data
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data"
ON user_data
FOR UPDATE
USING (auth.uid() = user_id);
```

## 🎉 After Successful Deployment

Your app is now live! Share your URL with others.

### Optional Enhancements:
- [ ] Add custom domain in Vercel settings
- [ ] Update Supabase redirect URLs with custom domain
- [ ] Set up analytics (Vercel Analytics)
- [ ] Enable Vercel Speed Insights

## 🐛 Troubleshooting

### Login Redirects to Supabase and Doesn't Come Back
- **Fix**: Add your Vercel URL to Supabase Redirect URLs (step 1)

### "Invalid Redirect URL" Error
- **Fix**: Make sure the URL in Supabase exactly matches your Vercel URL
- Include both with and without trailing slash

### Data Not Syncing
- **Fix**: Check browser console for errors
- Verify Supabase RLS policies allow user access

### Can't See Tables in Supabase
- **Fix**: The tables are created automatically on first use
- Or create them manually using the SQL editor

## 📞 Need Help?
- Check Vercel deployment logs
- Check browser console for errors
- Review Supabase logs in Dashboard → Logs
