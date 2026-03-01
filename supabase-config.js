// ============================================
// Supabase Configuration
// ============================================
// ⚠️ REPLACE these with your actual Supabase project values
// Find them at: Supabase Dashboard → Settings → API
const SUPABASE_URL = 'https://pvxhmedzpmlygxxkwmtb.supabase.co';       // e.g., 'https://xxxx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eGhtZWR6cG1seWd4eGt3bXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MzU0NTEsImV4cCI6MjA4NzMxMTQ1MX0.rXpq_vwI_LEOOmz8TZ2bw9m5JkMagr9ByeN7AL8Q-W4'; // e.g., 'eyJhbGciOi...'

// Initialize Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Verify initialization
console.log('✅ Supabase client initialized:', {
    url: SUPABASE_URL,
    hasClient: !!supabaseClient
});

// ============================================
// Auth Functions
// ============================================

async function signInWithGoogle() {
    try {
        console.log('🔵 Sign in button clicked');
        console.log('🔵 Current URL:', window.location.href);
        
        // Dynamic redirect URL that works on any domain (localhost, Vercel, custom domain)
        const redirectUrl = `${window.location.origin}${window.location.pathname}`;
        console.log('🔵 Redirect URL:', redirectUrl);
        
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent'
                }
            }
        });
        
        if (error) {
            console.error('❌ Login error:', error);
            showToast ? showToast('Login failed: ' + error.message, 'error') : alert('Login failed: ' + error.message);
        } else {
            console.log('✅ OAuth initiated:', data);
        }
    } catch (err) {
        console.error('❌ Unexpected login error:', err);
        showToast ? showToast('An unexpected error occurred during login', 'error') : alert('An unexpected error occurred');
    }
}

async function signOutUser() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Logout error:', error.message);
            showToast ? showToast('Logout failed: ' + error.message, 'error') : alert('Logout failed: ' + error.message);
        }
    } catch (err) {
        console.error('Unexpected logout error:', err);
        showToast ? showToast('An unexpected error occurred during logout', 'error') : alert('An unexpected error occurred');
    }
}

async function getCurrentUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

function onAuthStateChange(callback) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

// ============================================
// Database Functions
// ============================================

async function upsertUserProfile(user) {
    const { error } = await supabaseClient.from('user_profiles').upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email,
        avatar_url: user.user_metadata?.avatar_url || '',
        updated_at: new Date().toISOString()
    }, { onConflict: 'id' });

    if (error) console.error('Profile upsert error:', error);
}

async function loadUserData(userId) {
    try {
        const { data, error } = await supabaseClient
            .from('user_data')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') {
            // PGRST116 = no rows found (first time user)
            console.error('Load data error:', error);
        }
        return data;
    } catch (err) {
        console.error('Unexpected error loading data:', err);
        return null;
    }
}

async function saveUserData(userId, dataObj) {
    const { error } = await supabaseClient.from('user_data').upsert({
        user_id: userId,
        timetable: dataObj.timetable || {},
        attendance: dataObj.attendance || {},
        extra_lectures: dataObj.extraLectures || {},
        initial_attendance: dataObj.initialAttendance || {},
        updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });

    if (error) console.error('Save data error:', error);
}

// Debounced save to avoid spamming Supabase on rapid changes
let saveTimeout = null;
function debouncedSaveUserData(userId, dataObj) {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveUserData(userId, dataObj);
    }, 1000);
}
