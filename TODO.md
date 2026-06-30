## Google OAuth (Vue 3 + Laravel 12 + Sanctum) - Implementation Checklist

- [x] Step 1: Update/extend DB migration so `users` has `google_id` and `avatar`, keeping compatibility with existing `provider/provider_id`.

- [x] Step 2: Update `User` model fillable attributes if needed.

- [x] Step 3: Refactor `GoogleAuthController` to have `redirect()` and `callback()` methods (and improve error messaging).

- [x] Step 4: Ensure callback finds existing user by Google email OR google_id/provider_id (per requirement) and logs in automatically via Sanctum token.

- [x] Step 5: Update frontend Register page to render the Google button matching Login theme, including loading state.

- [x] Step 6: Verify frontend `GoogleCallback.vue` correctly stores Sanctum token and fetches profile.

- [x] Step 7: Run migrations and perform manual OAuth tests:
  - [x] Added `google_id` column migration (already applied)
  - [x] Fix `GOOGLE_CLIENT_SECRET` env var (had leading space)
  - [x] Add `FRONTEND_URL` to backend `.env`
  - [x] Add `frontend_url` to `config/app.php`
  - [x] Add `/auth` path to Vite proxy config
  - [x] Fix `GoogleCallback.vue` to remove sweetalert2 dependency (not installed)
  - [x] New user with new Google email
  - [x] Existing user with same Google email
  - [x] Error case (missing email / denied consent)

### FIX: Google OAuth session cookie mismatch (June 30, 2026)

- [x] **Root cause**: `continueWithGoogle()` redirected to `/auth/google/redirect` via the Vite proxy (port 5173), which set a session cookie for `localhost:5173`. Google then redirected back to `localhost:8000/auth/google/callback` (the real Laravel URL per `GOOGLE_REDIRECT_URI`), but the browser wouldn't send the session cookie to port 8000, causing Socialite to fail state validation.

- [x] **Fix**: Redirect directly to the Laravel backend (`http://localhost:8000/auth/google/redirect`) so the session cookie is scoped to `localhost:8000`. On the callback, the browser correctly sends the cookie, and Socialite validates the state successfully.

- [x] **Configuration**: Added `VITE_BACKEND_URL=http://localhost:8000` to `frontend/.env`. Both `Login.vue` and `Register.vue` use this variable for the Google redirect URL, falling back to `http://localhost:8000` if not set.