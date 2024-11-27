\_14 Front-End Authentication

Overview
What is Front-End Authentication?
Front-end authentication ensures that users accessing a web application are who they say they are. It's like having a bouncer at a club—only those with proper credentials (passwords, tokens) can get in. On the front end, this involves handling things like login forms, storing authentication data securely, and managing user sessions.

Key Concepts

1. Authentication vs. Authorization
   Authentication: Proving who you are. (e.g., entering your email and password to log in).
   Authorization: Proving what you’re allowed to do. (e.g., access your profile but not someone else’s).
   Think of it as:
   Authentication = Showing your ID to get into the building.
   Authorization = Determining which floors you’re allowed to visit.

2. Tokens (JWTs)
   JSON Web Tokens (JWTs) are like digital wristbands at an event—they prove you’ve paid and can stay in the venue.
   Tokens are compact, portable pieces of data the server gives you after login. They’re used to authenticate subsequent requests.
   Example: After login, your app might send your token to fetch protected resources like your dashboard.

3. Storing Tokens Securely
   Store tokens in HTTP-only cookies (safer option) or localStorage/sessionStorage (less secure). Cookies are harder to steal via cross-site scripting (XSS) attacks because JavaScript can't access them.
   Analogy: Cookies are like safe deposit boxes at a bank—accessible only under strict rules.

4. Authentication Flow
   Login: User submits their credentials.
   Server Response: Server verifies credentials and sends a token back.
   Token Storage: Front end stores the token securely.
   Authenticated Requests: Front end attaches the token to requests to access protected resources.
   Logout: Token is deleted, ending the session.

Techniques & Tools

1. React Context for Authentication
   React Context helps manage user state (e.g., whether a user is logged in) across the app.
   It’s like the master guest list at an event—you check it once and know everyone’s status.
2. Protected Routes
   Use tools like React Router to restrict access to certain routes unless the user is authenticated.
   Example: A /profile route should redirect unauthenticated users to /login.
3. API Interceptors
   Axios interceptors can automatically attach tokens to requests. They act like a diligent secretary, ensuring every message you send includes your credentials.

Best Practices
Use HTTPS: Always encrypt data in transit.
Handle Errors Gracefully: Inform users if their session expires or login fails.
Implement Refresh Tokens: These allow users to stay logged in longer without compromising security.

4. Front-End Authentication Challenges
   Token Expiry: Handle cases where the token expires—refresh it or redirect the user to login.
   State Syncing: Keep user login state synced across components/pages.
   Security Risks: Watch for XSS, CSRF, and other vulnerabilities.
   Obtained Skills

Browser Data Storage
Front-End Authorization

CryptoDucks
The CryptoDucks project provides a hands-on example for implementing authentication and authorization in a React application using React Router v6 and Vite. Here’s an overview of the project and what you’ll be working on:

Overview of CryptoDucks
Goal: Implement authentication and authorization for a React app with private and public routes.
Theme: Crypto-themed ducks 🦆 with a secure interface for viewing and managing content.

Project Components
Login:
Public page for users to log in with a username and password.
Redirects to the Ducks view after successful login.
Register:
Public page where new users can sign up.
Ducks:
Private page displaying a feed of images and information about crypto ducks.
Only accessible after successful login.
MyProfile:
Private page showing personalized information for the logged-in user.
Ensures users only see their data.

Routes and Access Control
Route
Component
Access
/login
Login
Public
/register
Register
Public
/ducks
Ducks
Private
/my-profile
MyProfile
Private

Public routes (/login and /register) are open to everyone.
Private routes (/ducks and /my-profile) require user authentication.

Key Features
Login Flow:
After logging in, the app redirects the user to /ducks.
A navigation bar becomes visible with links to:
Ducks: View crypto ducks.
My Profile: Access personal user data.
Sign Out: Log out and return to the login screen.
Authorization:
Unauthorized users are redirected to the /login page when attempting to access private routes.
MyProfile Component:
Displays user-specific information, ensuring no cross-user data leaks.

How It Works

1. Authentication Implementation
   Login credentials are verified (example credentials: Mallard / Quack42).
   On successful login:
   The server sends a token or session data.
   The front end stores this token (e.g., in cookies or local storage).
2. Routing with React Router v6
   Public Routes: Accessible without authentication.
   Private Routes:
   Use a PrivateRoute wrapper to check for authentication before rendering the component.
   Redirect unauthorized users to /login.
3. Logout Functionality
   Clears the stored token or session data.
   Redirects the user back to the login page.

What You’ll Learn
React Router v6:
Setting up routes and handling navigation.
Using features like useNavigate for redirects and route protection.
Authentication Flow:
Managing login, registration, and logout actions.
Protecting private routes using custom components.
State Management:
Handling user state and session data.
Ensuring data privacy and dynamic content updates for the logged-in user.

Practical Insights
Authentication is like giving users a badge at the door—they can’t access the building without it.
Routes act as locked doors—only those with the right badge (auth token) can open them.
Logout ensures the badge is destroyed, and users need to reauthenticate to get a new one.
This project is a great stepping stone to mastering secure and user-friendly authentication systems in real-world apps. Let me know if you'd like further explanations or help implementing specific features!
Setup
The CryptoDucks project is designed to teach the fundamentals of front-end authentication and authorization in a React application. Here’s a breakdown of what’s happening in this example project and the initial setup you'll be working with.

Initial Setup
Starting Repository:
The provided repository includes the foundational structure and components.
Fork and clone it to your local machine, install dependencies with npm install, and run the app using npm run dev.
Initial View:
By default, visiting http://localhost:3000 will show a blank screen because the root / path has no route assigned.

Current Routes in App.jsx
The App.jsx file defines four routes, each corresponding to a specific component:
jsx
Copy code
import { Routes, Route } from "react-router-dom";
import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import "./styles/App.css";

function App() {
return (
<Routes>
<Route path="/ducks" element={<Ducks />} />
<Route path="/my-profile" element={<MyProfile />} />
<Route
path="/login"
element={
<div className="loginContainer">
<Login />
</div>
}
/>
<Route
path="/register"
element={
<div className="registerContainer">
<Register />
</div>
}
/>
</Routes>
);
}

export default App;

Problem Areas
No Default Route:
When visiting /, users are met with an empty black page because no route is assigned to this path.
Unprotected Routes:
All routes are accessible, even if the user isn’t logged in. This means anyone can manually type the URL and access /ducks or /my-profile.

Current User Experience by Route
Route: /
View: Blank screen (the void).
Fix Needed: Redirect to a more meaningful route (e.g., /login).
Route: /register
View: The registration page for creating a new user account.
Status: Functional but open to all users.
Route: /login
View: The login page where users enter their credentials.
Status: Also accessible by anyone.
Route: /ducks
View: A feed of CryptoDuck data.
Problem: This should be restricted to authenticated users only.
Route: /my-profile
View: Displays placeholder data for the user’s profile.
Problem: Generic placeholder data is shown instead of user-specific information.

Behind the Scenes
Main.jsx File
The main.jsx file wraps the app with a BrowserRouter component to enable routing:
jsx
Copy code
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
</React.StrictMode>
);

Next Steps
Redirect Users:
Fix the blank / route by redirecting users to /login or /register.
Protect Routes:
Implement authentication checks to prevent unauthorized users from accessing private routes like /ducks and /my-profile.

Redirecting & Navigate
This lesson introduces redirection in React Router using the Navigate component. You’ll handle undefined routes and redirect users to the correct page based on their authentication status.

Key Concepts
Redirection for Undefined Routes:
Redirect users who visit a route not specified in the application (e.g., / or /random).
Use a wildcard path (\*) to catch all undefined routes.
Dynamic Redirects Based on Authentication:
Redirect logged-in users to /ducks.
Redirect logged-out users to /login.
Cleaner Navigation History:
Use the replace prop with Navigate to avoid stacking redirects in the browser’s history.

Implementation Steps

1. Add State for Authentication
   Add a useState variable isLoggedIn to control the user’s login status:
   jsx
   Copy code
   import { useState } from "react"; // New import

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false); // Default: not logged in
// Rest of your code...
}

2. Use Navigate for Redirection
   Import the Navigate component and add a wildcard route to handle undefined paths:
   jsx
   Copy code
   import { Routes, Route, Navigate } from "react-router-dom";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

return (
<Routes>
{/_ Existing routes _/}
<Route path="/ducks" element={<Ducks />} />
<Route path="/my-profile" element={<MyProfile />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

      {/* Wildcard route */}
      <Route
        path="*"
        element={
          isLoggedIn ? <Navigate to="/ducks" replace /> : <Navigate to="/login" replace />
        }
      />
    </Routes>

);
}

3. Test Your Redirects
   Default Test:
   Open the app at http://localhost:3000.
   You should be redirected to /login because isLoggedIn is false.
   Change isLoggedIn to true:
   jsx
   Copy code
   const [isLoggedIn, setIsLoggedIn] = useState(true);

Reload the app at http://localhost:3000.
You should now be redirected to /ducks.
Revert to isLoggedIn = false:
jsx
Copy code
const [isLoggedIn, setIsLoggedIn] = useState(false);

Why Use replace?
Using the replace prop ensures that redirects don’t clutter the browser history. This prevents users from cycling through unnecessary routes when pressing the "Back" button.

Next Steps
With this solution, users can no longer see a blank screen when visiting /. However, private routes (/ducks and /my-profile) remain accessible even when users aren’t logged in. In the next lesson, you’ll learn how to protect routes to ensure only authenticated users can access them.
Protecting Routes on the Front End
In this lesson, you learned how to restrict access to certain routes in the CryptoDucks app using a wrapper component called ProtectedRoute. This ensures users can't access sensitive or private pages unless they're logged in.

Key Concepts
Wrapper Components vs. HOCs
Higher-Order Components (HOCs):
A function that takes a component and returns a new component with enhanced functionality.
Wrapper Components:
A regular component that "wraps" another component to modify its behavior, often through conditional rendering.
ProtectedRoute is a wrapper component that conditionally renders child components based on whether the user is logged in.

Implementing Protected Routes

1. Create the ProtectedRoute Component
   The ProtectedRoute checks if the user is logged in. If they’re not, it redirects them to the /login page.
   jsx
   Copy code
   // src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
if (!isLoggedIn) {
// Redirect to /login if user isn't logged in
return <Navigate to="/login" replace />;
}

// Render the child component if the user is logged in
return children;
}

export default ProtectedRoute;

2. Use ProtectedRoute in App.jsx
   Wrap the Ducks and MyProfile components in ProtectedRoute to enforce login requirements:
   jsx
   Copy code
   // App.jsx

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute"; // New import
import "./styles/App.css";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false); // Default: not logged in

return (
<Routes>
{/_ Protected routes _/}
<Route
path="/ducks"
element={
<ProtectedRoute isLoggedIn={isLoggedIn}>
<Ducks />
</ProtectedRoute>
}
/>
<Route
path="/my-profile"
element={
<ProtectedRoute isLoggedIn={isLoggedIn}>
<MyProfile />
</ProtectedRoute>
}
/>

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

);
}

export default App;

How It Works
Logged Out:
When isLoggedIn is false, navigating to /ducks or /my-profile redirects the user to /login.
Logged In:
When isLoggedIn is true, users can access /ducks and /my-profile.

Testing Your Work
Default State (isLoggedIn = false):
Navigate to /ducks or /my-profile.
You should be redirected to /login.
Logged-In State (isLoggedIn = true):
Temporarily set isLoggedIn to true:
jsx
Copy code
const [isLoggedIn, setIsLoggedIn] = useState(true);

Reload the app and navigate to /ducks or /my-profile.
You should see the respective component.
Revert isLoggedIn to false:
Reset isLoggedIn to false after testing to prepare for the next lesson.

Next Steps
Now that the routes are secure, the next step is to let users register so they can log in and access the protected content.
Registration in CryptoDucks
This lesson focused on enabling users to register for the app by setting up the registration flow and handling successful sign-ups.

Key Concepts

1. Registration Flow Overview
   Users are redirected to the Register component via a link on the Login page.
   They fill out a form with their details (username, email, password, and password confirmation).
   On submission, the data is sent to an API endpoint to create a new user.
   After a successful registration, users are redirected to the login page.

Implementation Steps

1. Controlled Registration Form
   The Register component uses a single state object to control all form inputs:
   jsx
   Copy code
   const [data, setData] = useState({
   username: "",
   email: "",
   password: "",
   confirmPassword: "",
   });

const handleChange = (e) => {
const { name, value } = e.target;
setData((prevData) => ({
...prevData,
[name]: value,
}));
};

The form inputs update data dynamically via the handleChange function.

2. API Interaction
   A new utility file, auth.js, was created to manage API interactions. The register function sends a POST request to the registration endpoint:
   javascript
   Copy code
   // src/utils/auth.js
   export const BASE_URL = "https://api.nomoreparties.co";

export const register = (username, password, email) => {
return fetch(`${BASE_URL}/auth/local/register`, {
method: "POST",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
body: JSON.stringify({ username, password, email }),
}).then((res) => {
return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
});
};

3. Registration Handler in App.jsx
   The handleRegistration method manages registration logic, ensuring passwords match and handling the API response:
   jsx
   Copy code
   import \* as auth from "../utils/auth";
   import { useNavigate } from "react-router-dom";

function App() {
const navigate = useNavigate();

const handleRegistration = ({ username, email, password, confirmPassword }) => {
if (password === confirmPassword) {
auth
.register(username, password, email)
.then(() => {
navigate("/login"); // Redirect to login page on success
})
.catch(console.error);
}
};

return (
<Routes>
<Route
path="/register"
element={
<Register handleRegistration={handleRegistration} />
}
/>
</Routes>
);
}

4. Form Submission in Register.jsx
   The form submission calls the handleRegistration method passed as a prop:
   jsx
   Copy code
   const handleSubmit = (e) => {
   e.preventDefault();
   handleRegistration(data); // Pass form data to the handler
   };

<form className="register__form" onSubmit={handleSubmit}>
  {/* Form inputs */}
</form>

Testing Your Work
Form Behavior:
Open the registration form at /register.
Fill out the fields and submit.
Successful Registration:
Verify the API response in the network panel.
Confirm a successful redirect to the /login page.
Error Handling:
Test with duplicate usernames or emails to see error responses.

Key Insights
Form State: Centralizing form state management makes it easier to handle inputs and submission.
API Structure: Decoupling API interactions into a utility file keeps components cleaner and more modular.
Redirection: Using useNavigate ensures smooth routing transitions after successful actions.

Next Steps
With the registration process complete, the next lesson will focus on enabling users to log in and access protected routes.
Logging In
This lesson focuses on enabling users to log in and access protected routes. The process includes validating credentials, receiving a JSON Web Token (JWT), and granting access to the site.

Key Concepts

1. Login Flow
   Input Validation: Ensure the user provides a username and password.
   API Interaction: Send credentials to the /auth/local endpoint for verification.
   State Updates:
   Set isLoggedIn to true upon successful login.
   Store user data for profile display.
   Redirection: Navigate to the /ducks route after successful login.
2. Persisting User State
   For now, logging in does not persist across sessions. Later lessons will address this by saving the JWT to maintain the user's session.

Implementation Steps

1. Update auth.js
   Add the authorize function to send login credentials to the API:
   javascript
   Copy code
   // src/utils/auth.js

export const authorize = (identifier, password) => {
return fetch(`${BASE_URL}/auth/local`, {
method: "POST",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
body: JSON.stringify({ identifier, password }),
}).then((res) => {
return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
});
};

2. Create a Login Handler
   Add a handleLogin function to App.jsx to manage login logic:
   jsx
   Copy code
   // App.jsx

import \* as auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState({ username: "", email: "" });
const navigate = useNavigate();

const handleLogin = ({ username, password }) => {
if (!username || !password) return;

    auth
      .authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          setUserData(data.user); // Store user data
          setIsLoggedIn(true);    // Log the user in
          navigate("/ducks");    // Redirect to /ducks
        }
      })
      .catch(console.error);

};

return (
<Routes>
<Route
path="/login"
element={<Login handleLogin={handleLogin} />}
/>
<Route
path="/ducks"
element={
<ProtectedRoute isLoggedIn={isLoggedIn}>
<Ducks />
</ProtectedRoute>
}
/>
<Route
path="/my-profile"
element={
<ProtectedRoute isLoggedIn={isLoggedIn}>
<MyProfile userData={userData} />
</ProtectedRoute>
}
/>
</Routes>
);
}

3. Update Login.jsx
   Modify the Login component to handle form submissions and call handleLogin:
   jsx
   Copy code
   // Login.jsx

const Login = ({ handleLogin }) => {
const [data, setData] = useState({ username: "", password: "" });

const handleChange = (e) => {
const { name, value } = e.target;
setData((prevData) => ({ ...prevData, [name]: value }));
};

const handleSubmit = (e) => {
e.preventDefault();
handleLogin(data); // Pass form data to the handler
};

return (
<div className="login">
<Logo title="CryptoDucks" />
<form className="login__form" onSubmit={handleSubmit}>
<label htmlFor="username">Login:</label>
<input
          id="username"
          name="username"
          type="text"
          value={data.username}
          onChange={handleChange}
          required
        />
<label htmlFor="password">Password:</label>
<input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          required
        />
<button type="submit" className="login__link">Log in</button>
</form>
</div>
);
};

export default Login;

4. Display User Data
   Pass userData as a prop to the MyProfile component for personalized content:
   jsx
   Copy code
   <Route
   path="/my-profile"
   element={
   <ProtectedRoute isLoggedIn={isLoggedIn}>
   <MyProfile userData={userData} />
   </ProtectedRoute>
   }
   />

The MyProfile component will automatically display the user's username and email.

Testing Your Work
Login Behavior:
Navigate to /login.
Submit valid credentials.
Confirm redirection to /ducks and access to protected routes.
Profile Data:
Check that the MyProfile component displays the logged-in user's data.
Error Handling:
Test with invalid credentials to confirm error responses are logged.

Known Issue
Typing /my-profile in the browser address bar logs out the user because the session isn’t persisted. This will be addressed in the next lesson.

Next Steps
In the next lesson, you’ll implement persistent authentication so users remain logged in across sessions.
Local Storage
In this lesson, you’ll learn how to persist user authentication by saving a JSON Web Token (JWT) to the browser's local storage. This allows users to remain logged in even after closing or refreshing the browser.

Key Concepts

1. Browser Storage Options
   Session Storage:
   Data is cleared when the browser or tab is closed.
   Similar to temporary memory (RAM).
   Local Storage:
   Data persists until manually deleted.
   Similar to permanent memory (hard drive).
   Used for persisting user sessions across visits in CryptoDucks.

Working with Local Storage
Built-in Methods
The localStorage object provides three main methods:
setItem(key, value): Save data to local storage.
getItem(key): Retrieve saved data.
removeItem(key): Remove data from storage.
javascript
Copy code
// Save data
localStorage.setItem('username', 'Dr_Marvin_Quack');

// Retrieve data
console.log(localStorage.getItem('username')); // Output: "Dr_Marvin_Quack"

// Remove data
localStorage.removeItem('username');

// Non-existent keys return null
console.log(localStorage.getItem('username')); // Output: null

Storing Complex Data
Since localStorage only accepts strings, objects need to be serialized using JSON.stringify() before saving and parsed back using JSON.parse() when retrieving.
javascript
Copy code
// Save an object
localStorage.setItem('user', JSON.stringify({ firstName: 'Marvin', lastName: 'Quack' }));

// Retrieve the object
const user = JSON.parse(localStorage.getItem('user'));
console.log(user); // Output: { firstName: 'Marvin', lastName: 'Quack' }

Integrating Local Storage in CryptoDucks

1. Save the JWT on Login
   Update the handleLogin function in App.jsx to save the JWT to local storage:
   jsx
   Copy code
   const handleLogin = ({ username, password }) => {
   if (!username || !password) return;

auth
.authorize(username, password)
.then((data) => {
if (data.jwt) {
setUserData(data.user); // Save user data
setIsLoggedIn(true); // Update login state
localStorage.setItem('jwt', data.jwt); // Save token to local storage
navigate("/ducks"); // Redirect to /ducks
}
})
.catch(console.error);
};

2. Automatically Check for JWT
   Use the JWT stored in local storage to log users in automatically when they revisit the site. Add a useEffect hook in App.jsx:
   jsx
   Copy code
   import { useEffect } from "react";

function App() {
useEffect(() => {
const token = localStorage.getItem('jwt');
if (token) {
auth
.checkToken(token) // Validate token with the API
.then((data) => {
setUserData(data.user); // Restore user data
setIsLoggedIn(true); // Log the user in
})
.catch(() => localStorage.removeItem('jwt')); // Remove invalid token
}
}, []); // Run once on component mount
}

Storing User Data
If you need to persist additional user information (like profile details), store it in local storage as a serialized object:
jsx
Copy code
localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
const userData = JSON.parse(localStorage.getItem('user')); // Retrieve user data

Clearing Local Storage on Logout
Remove the JWT and user data when the user logs out:
jsx
Copy code
const handleLogout = () => {
setIsLoggedIn(false); // Update login state
setUserData({ username: "", email: "" }); // Clear user data
localStorage.removeItem('jwt'); // Remove JWT
navigate("/login"); // Redirect to login page
};

Testing Your Work
Login Persistence:
Log in to the app and confirm the JWT is saved in local storage.
Refresh the page and confirm the user remains logged in.
Invalid JWT Handling:
Delete the JWT from local storage or modify it to an invalid value.
Refresh the page and confirm the user is logged out.
Logout Behavior:
Log out of the app and verify that the JWT is removed from local storage.

Next Steps
With local storage implemented, the next step is to make your authentication system more robust by securely validating and refreshing tokens.
By persisting JWTs, you’ve taken a crucial step toward creating a user-friendly and secure authentication experience.

Checking User Tokens
This lesson explains how to validate tokens for returning users, enabling automatic login if a valid token exists in local storage.

Key Concepts

1. Validating Tokens on Page Load
   When the app loads, check if a JWT is present in local storage.
   If a token exists:
   Send a request to a protected API endpoint (/users/me) to validate it.
   Log the user in and redirect them to /ducks if the token is valid.
   If no token is present, the user remains logged out.

Implementation Steps

1. Create Token Helper Functions
   To streamline local storage operations, create setToken and getToken helpers in utils/token.js:
   javascript
   Copy code
   // utils/token.js

const TOKEN_KEY = "jwt";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const getToken = () => localStorage.getItem(TOKEN_KEY);

2. Save Tokens on Login
   Update the handleLogin function in App.jsx to save the token to local storage:
   jsx
   Copy code
   import { setToken } from "../utils/token";

const handleLogin = ({ username, password }) => {
if (!username || !password) return;

auth
.authorize(username, password)
.then((data) => {
if (data.jwt) {
setToken(data.jwt); // Save the token
setUserData(data.user); // Save user data
setIsLoggedIn(true); // Log the user in
navigate("/ducks"); // Redirect to /ducks
}
})
.catch(console.error);
};

3. Validate Tokens on Page Load
   Use useEffect to check for a JWT in local storage when the app first loads. If a token exists, validate it using the /users/me endpoint:
   Create a getUserInfo API Function: Define this function in utils/api.js to validate the token:
   javascript
   Copy code
   // utils/api.js

export const BASE_URL = "https://api.nomoreparties.co";

export const getUserInfo = (token) => {
return fetch(`${BASE_URL}/users/me`, {
method: "GET",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
Authorization: `Bearer ${token}`,
},
}).then((res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)));
};

Check the Token in App.jsx: Use this function in a useEffect hook to validate the token and log the user in if valid:
jsx
Copy code
import { useEffect } from "react";
import { getToken } from "../utils/token";
import \* as api from "../utils/api";

function App() {
useEffect(() => {
const jwt = getToken();

    if (!jwt) return;

    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setUserData({ username, email }); // Restore user data
        setIsLoggedIn(true);             // Log the user in
        navigate("/ducks");              // Redirect to /ducks
      })
      .catch(console.error);              // Handle invalid token

}, []); // Run on initial load only
}

4. Test Your Implementation
   Verify Automatic Login:
   Log in with valid credentials to save a JWT in local storage.
   Refresh the page and confirm automatic redirection to /ducks.
   Test Invalid Tokens:
   Modify or delete the token from local storage.
   Refresh the page and confirm redirection to the login page.
   Profile Data:
   Navigate to /my-profile and confirm the user’s name and email are displayed.

Key Considerations
Redirection Issues
Currently, users navigating directly to /my-profile via the browser bar are redirected to /ducks.
Logged-in users can still access /login or /register, which isn't ideal.
ESLint Dependency Warnings
useEffect may warn about missing navigate in the dependency array.
This will be addressed in the next lesson.

Next Steps
The next lesson will resolve redirection issues and ensure that users are redirected appropriately based on the route they attempted to access.
useLocation
In this lesson, you learned how to use the useLocation hook to improve user experience by tracking the route users were trying to access before logging in. This ensures they are redirected appropriately after authentication.

Key Updates

1. useLocation Hook Overview
   The useLocation hook from React Router provides information about the current route:
   pathname: The current URL path.
   state: Data passed along with <Link> or <Navigate> components, useful for tracking redirection paths.

Updating ProtectedRoute
Modified Behavior
The ProtectedRoute component now:
Redirects unauthenticated users to /login and stores the original route in location.state.
Redirects authenticated users away from anonymous routes like /login and /register.
jsx
Copy code
// ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
const location = useLocation();
const from = location.state?.from || "/";

if (anonymous && isLoggedIn) {
return <Navigate to={from} />;
}

if (!anonymous && !isLoggedIn) {
return <Navigate to="/login" state={{ from: location }} />;
}

return children;
}

Key Points
anonymous Prop: Specifies routes that can be accessed without logging in (e.g., /login and /register).
State Preservation: Saves the current route in state.from when redirecting to /login.
Redirection Logic:
Logged-in users trying to access /login or /register are redirected to their original location (or /ducks if none is specified).
Unauthenticated users are redirected to /login.

Updating App.jsx
Enhancements
Redirection After Login:
Uses location.state.from to redirect users to the route they initially tried to access.
Anonymous Route Protection:
Wrap /login and /register with ProtectedRoute and set the anonymous prop.
Updated Code
jsx
Copy code
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import _ as auth from "../utils/auth";
import _ as api from "../utils/api";
import { setToken, getToken } from "../utils/token";

function App() {
const [userData, setUserData] = useState({ username: "", email: "" });
const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate = useNavigate();
const location = useLocation();

const handleLogin = ({ username, password }) => {
if (!username || !password) return;

    auth
      .authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setUserData(data.user);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/ducks";
          navigate(redirectPath);
        }
      })
      .catch(console.error);

};

useEffect(() => {
const jwt = getToken();
if (!jwt) return;

    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setUserData({ username, email });
        setIsLoggedIn(true);
      })
      .catch(console.error);

}, []);

return (
<Routes>
<Route
path="/ducks"
element={
<ProtectedRoute isLoggedIn={isLoggedIn}>
<Ducks />
</ProtectedRoute>
}
/>
<Route
path="/my-profile"
element={
<ProtectedRoute isLoggedIn={isLoggedIn}>
<MyProfile userData={userData} />
</ProtectedRoute>
}
/>
<Route
path="/login"
element={
<ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
<Login handleLogin={handleLogin} />
</ProtectedRoute>
}
/>
<Route
path="/register"
element={
<ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
<Register handleRegistration={handleRegistration} />
</ProtectedRoute>
}
/>
<Route
path="\*"
element={
isLoggedIn ? <Navigate to="/ducks" replace /> : <Navigate to="/login" replace />
}
/>
</Routes>
);
}

Testing Your Work
Scenario 1: Logged-Out User
Clear local storage: localStorage.clear().
Navigate to /my-profile:
You should be redirected to /login.
Log in:
You should be redirected to /my-profile.
Scenario 2: Logged-In User
Log in to save a valid JWT in local storage.
Refresh the page while on /my-profile:
You should stay on /my-profile.
Scenario 3: Anonymous Route Protection
While logged in, navigate to /login or /register:
You should be redirected to /ducks.

Summary of Changes
useLocation Hook: Tracks attempted routes and stores them in state for redirection after login.
Anonymous Routes: Redirect logged-in users away from /login and /register.
Removed ESLint Warnings: Simplified redirection logic.

Next Steps
You’ve now optimized redirection and user experience using useLocation. Moving forward, you can refine the app further by handling edge cases like token expiration and improving security.
Logging Out
This lesson adds logout functionality to your CryptoDucks app by enabling users to clear their JWT, log out, and redirect to the login page.

Key Features of Logout
JWT Removal:
The token is deleted from local storage using a helper function.
User State Reset:
The isLoggedIn state is set to false to reflect the logged-out status.
Redirection to Login:
The user is redirected to the /login page after logging out.

Implementation Steps

1. Create a Helper Function
   Add a removeToken function in utils/token.js to simplify JWT removal:
   javascript
   Copy code
   // utils/token.js

export const removeToken = () => {
localStorage.removeItem("jwt");
};

2. Update NavBar.jsx
   Create a signOut function that uses the removeToken helper, resets the login state, and redirects the user to /login.
   jsx
   Copy code
   // NavBar.jsx

import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";
import Logo from "./Logo";
import "./styles/NavBar.css";

function NavBar({ setIsLoggedIn }) {
const navigate = useNavigate();

function signOut() {
removeToken(); // Remove JWT from local storage
setIsLoggedIn(false); // Reset login state
navigate("/login"); // Redirect to login page
}

return (
<nav className="navbar">
<Logo title="CryptoDucks" />
<ul className="navbar__list">
<li>
<NavLink to="/ducks" className="navbar__link">
Ducks
</NavLink>
</li>
<li>
<NavLink to="/my-profile" className="navbar__link">
My Profile
</NavLink>
</li>
<li>
<button onClick={signOut} className="navbar__link navbar__button">
Sign Out
</button>
</li>
</ul>
</nav>
);
}

export default NavBar;

3. Pass setIsLoggedIn to NavBar
   The NavBar component is rendered inside multiple components (Ducks and MyProfile). Pass the setIsLoggedIn prop from App.jsx to these components, then forward it to NavBar.
   jsx
   Copy code
   // App.jsx

<Route
path="/ducks"
element={
<ProtectedRoute isLoggedIn={isLoggedIn}>
<Ducks setIsLoggedIn={setIsLoggedIn} />
</ProtectedRoute>
}
/>
<Route
path="/my-profile"
element={
<ProtectedRoute isLoggedIn={isLoggedIn}>
<MyProfile setIsLoggedIn={setIsLoggedIn} userData={userData} />
</ProtectedRoute>
}
/>

4. Update Ducks.jsx and MyProfile.jsx
   Pass setIsLoggedIn to NavBar:
   jsx
   Copy code
   // Ducks.jsx

import NavBar from "./NavBar";

function Ducks({ setIsLoggedIn }) {
return (
<div>
<NavBar setIsLoggedIn={setIsLoggedIn} />
{/_ Ducks content _/}
</div>
);
}

export default Ducks;

jsx
Copy code
// MyProfile.jsx

import NavBar from "./NavBar";

function MyProfile({ setIsLoggedIn, userData }) {
return (
<div>
<NavBar setIsLoggedIn={setIsLoggedIn} />
<h1>Welcome, {userData.username}!</h1>
{/_ Profile content _/}
</div>
);
}

export default MyProfile;

Testing Your Work
Log Out:
Log in and navigate to /ducks or /my-profile.
Click the "Sign Out" button.
Confirm you are redirected to /login.
Check Local Storage:
Open the browser console and type localStorage.getItem("jwt").
Confirm the result is null.
Logged-Out State:
After logging out, navigate to /ducks or /my-profile directly.
Confirm you are redirected to /login.

Conclusion
With this functionality, users can now securely log out of the app. You’ve completed the full authentication flow, enabling registration, login, token validation, and logout. Fantastic work!

Final Thoughts
Congratulations! You’ve completed the journey of implementing front-end authentication in React. Here’s a summary of the key lessons and their broader implications:

What We Learned

1. Core Authentication Flow
   Registration: Allowing users to securely create accounts and store credentials.
   Login: Validating user credentials to grant access.
   Token Storage: Using local storage to persist JWTs and maintain user sessions across visits.
   Logout: Clearing tokens and resetting session state to ensure security.
2. Route Protection
   Implementing private routes to restrict access based on user authentication status.
   Using React Router features like ProtectedRoute and useLocation to manage redirection and state tracking.
3. Security Practices
   Using tokens (JWTs) instead of passwords for session management.
   Validating tokens with backend APIs to ensure their authenticity.
4. React Hooks and Utilities
   Leveraging hooks like useEffect, useNavigate, and useLocation for seamless navigation and state handling.
   Modularizing functionality with helper utilities for clean, reusable code.

The Engineer's Responsibility
As developers, we have a duty to design secure systems that respect users' privacy and protect their data. While no system can be 100% hack-proof, we can implement best practices to minimize vulnerabilities and deter attackers:
Reduce Attack Surface:
Use HTTPS to encrypt data in transit.
Avoid storing sensitive data like passwords on the front end.
Token Management:
Implement short-lived tokens with refresh mechanisms.
Secure tokens using HTTP-only cookies where possible.
Error Handling:
Avoid exposing sensitive error messages that could give attackers clues about system weaknesses.
Educate Users:
Encourage strong passwords.
Warn against sharing sensitive information.

Next Steps: Security on the Back End
While we’ve secured the front-end layer, robust security requires strengthening the backend as well. In the next chapter, you’ll explore:
Token Validation: Ensuring tokens are properly signed and unexpired.
Role-Based Access Control: Managing user permissions for different routes or actions.
Database Security: Safeguarding sensitive data at rest.
Rate Limiting: Protecting against brute force attacks.

Final Reflection
You now have a strong foundation in building secure front-end applications. This knowledge will not only make your applications more robust but also inspire confidence in your users. Ready to secure the backend? Let’s continue building resilient and trustworthy applications! 🎉

BONUS: Refactoring with Context API
In this exercise, you refactor the CryptoDucks app to replace “prop drilling” with the React Context API. This simplifies the code and makes state management more efficient, especially in larger applications.

Steps to Refactor Using Context

1. Create the Context
   Add a new file, AppContext.js, and define the context:
   jsx
   Copy code
   // src/context/AppContext.js
   import React from "react";

const AppContext = React.createContext();

export default AppContext;

2. Provide Context in App.jsx
   Wrap the app's Routes with the AppContext.Provider and pass an object with isLoggedIn and setIsLoggedIn as the value.
   jsx
   Copy code
   // App.jsx

import AppContext from "../context/AppContext";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState({ username: "", email: "" });

return (
<AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
<Routes>
<Route
path="/ducks"
element={
<ProtectedRoute>
<Ducks />
</ProtectedRoute>
}
/>
<Route
path="/my-profile"
element={
<ProtectedRoute>
<MyProfile userData={userData} />
</ProtectedRoute>
}
/>
<Route
path="/login"
element={
<ProtectedRoute anonymous>
<Login handleLogin={handleLogin} />
</ProtectedRoute>
}
/>
<Route
path="/register"
element={
<ProtectedRoute anonymous>
<Register handleRegistration={handleRegistration} />
</ProtectedRoute>
}
/>
<Route
path="\*"
element={
isLoggedIn ? (
<Navigate to="/ducks" replace />
) : (
<Navigate to="/login" replace />
)
}
/>
</Routes>
</AppContext.Provider>
);
}

3. Subscribe to Context in ProtectedRoute
   Replace the isLoggedIn prop with useContext to access isLoggedIn from the AppContext.
   jsx
   Copy code
   // ProtectedRoute.jsx

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

export default function ProtectedRoute({ children, anonymous = false }) {
const location = useLocation();
const { isLoggedIn } = useContext(AppContext);
const from = location.state?.from || "/";

if (anonymous && isLoggedIn) {
return <Navigate to={from} />;
}

if (!anonymous && !isLoggedIn) {
return <Navigate to="/login" state={{ from: location }} />;
}

return children;
}

4. Update NavBar.jsx
   Use useContext to access setIsLoggedIn directly from the AppContext. Remove the setIsLoggedIn prop.
   jsx
   Copy code
   // NavBar.jsx

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import Logo from "./Logo";
import "./styles/NavBar.css";

function NavBar() {
const { setIsLoggedIn } = useContext(AppContext);
const navigate = useNavigate();

const signOut = () => {
removeToken();
setIsLoggedIn(false);
navigate("/login");
};

return (
<nav className="navbar">
<Logo title="CryptoDucks" />
<ul className="navbar__list">
<li>
<NavLink to="/ducks" className="navbar__link">
Ducks
</NavLink>
</li>
<li>
<NavLink to="/my-profile" className="navbar__link">
My Profile
</NavLink>
</li>
<li>
<button onClick={signOut} className="navbar__link navbar__button">
Sign Out
</button>
</li>
</ul>
</nav>
);
}

export default NavBar;

5. Remove setIsLoggedIn from Components
   Since setIsLoggedIn is now provided by the context, remove it from the Ducks and MyProfile components' props.
   jsx
   Copy code
   // Ducks.jsx

import NavBar from "./NavBar";

function Ducks() {
return (
<div>
<NavBar />
{/_ Ducks content _/}
</div>
);
}

export default Ducks;

jsx
Copy code
// MyProfile.jsx

import NavBar from "./NavBar";

function MyProfile({ userData }) {
return (
<div>
<NavBar />
<h1>Welcome, {userData.username}!</h1>
{/_ Profile content _/}
</div>
);
}

export default MyProfile;

Practice Task Solution
The setIsLoggedIn function is now fully managed through the AppContext. There’s no need to pass it down as a prop, and the code is cleaner and more scalable.

Testing Your Work
Check Functionality:
Test /ducks and /my-profile routes to ensure they’re protected.
Verify login, logout, and registration functionality.
Verify NavBar Behavior:
Log out using the "Sign Out" button.
Ensure it clears the JWT and redirects to /login.
Inspect Context Usage:
Confirm that isLoggedIn and setIsLoggedIn are accessed via context in all relevant components.

Conclusion
By refactoring with the Context API, you’ve eliminated prop drilling and simplified state management. While the benefits may not seem significant for a small app, this approach scales well as your application grows. Great work! 🎉

Web Application Security
Web application security is a critical aspect of software development. Just as Terry needs to secure his garden from raccoon bandits, developers must guard their web applications against hackers who seek to exploit vulnerabilities for personal gain or chaos.

The Raccoon in the Room: Security Matters
The story of Ryan's web application illustrates how a lack of security can lead to catastrophic outcomes:
Users' Trust Lost: Customers faced financial losses due to unauthorized transactions.
Business Failure: Ryan's reputation and business collapsed under the weight of security breaches.
The takeaway: Even small vulnerabilities can snowball into large-scale disasters.

Why Do Hackers Attack?
Hackers are often motivated by:
Financial Gain: Stealing credit card data, banking credentials, or other financial assets.
Data Theft: Harvesting sensitive user information to sell or exploit.
Reputation Damage: Sabotaging businesses or individuals.
Challenge: Some hackers see breaking into systems as a personal achievement.

Evolving Threats
Cyberattacks are continuously evolving, leveraging new technologies and techniques to bypass defenses. A few common attack types include:
SQL Injection: Exploiting weaknesses in databases.
Cross-Site Scripting (XSS): Injecting malicious scripts into web pages.
Cross-Site Request Forgery (CSRF): Trick users into executing unwanted actions.
Man-in-the-Middle (MITM): Intercepting communication between parties.
Denial of Service (DoS): Overloading a server to disrupt service.

The Developer’s Arsenal: Defense Tactics
To counteract these threats, developers need to:
Sanitize Inputs: Prevent injection attacks by validating and escaping user inputs.
Secure Authentication: Implement strong password policies, multi-factor authentication, and token-based systems.
Encrypt Data: Use HTTPS to secure data in transit and encrypt sensitive data at rest.
Limit Access: Implement role-based access controls to restrict sensitive operations.
Monitor and Log: Regularly audit logs for suspicious activities.
Keep Dependencies Updated: Vulnerabilities in outdated libraries can be exploited.

In This Chapter
You’ll explore:
Common Cyberattacks: Understand the most frequent threats to web applications.
Best Practices: Learn practical strategies to secure your applications.
Real-World Examples: Analyze cases of security breaches to avoid similar mistakes.
By the end of this chapter, you’ll have the tools to make your web applications as secure as possible, keeping the “raccoons” at bay and safeguarding your work. 🦝

Cross-Site Scripting (XSS)
Cross-site scripting (XSS) is a type of cyberattack where malicious scripts are injected into web pages, compromising user data and site security. Hackers exploit vulnerabilities in the way web applications process and display user inputs.

How XSS Attacks Work
Malicious Input:
Hackers inject harmful scripts via user inputs or URLs, such as:
javascript
Copy code
http://example.com/?name=Kevin+<script>alert('Hacked!');</script>

Execution on User Devices:
When the server sends the input back to users’ browsers without proper validation or escaping, the browser executes the script.
This could display alerts, redirect users, steal cookies, or execute more harmful actions.
Examples:
MySpace’s Samy Worm: A hacker injected a script into their profile, gaining a million friends and crashing the site.

Mitigation Strategies for XSS

1. Restrict User Input
   Principle: "Anything not explicitly allowed is forbidden."
   Implementation:
   Define permissible characters for each input field.
   Name: Only letters and spaces.
   Phone number: Digits, +, -, and ( ).
   Email: Letters, numbers, @, ., \_, and -.

2. Escape Special Characters
   Convert special characters into their HTML-encoded equivalents so the browser treats them as text rather than code.
   < becomes &lt;

   > becomes &gt;
   > Example:
   > Input: x _ 2 < 4
   > Escaped Output: x _ 2 &lt; 4
   > Practical Tool: Use the escape-html module in Node.js.
   > javascript
   > Copy code
   > const escape = require('escape-html');
   > console.log(escape('<script>alert("hacked")</script>'));
   > // Output: '&lt;script&gt;alert(&quot;hacked&quot;)&lt;/script&gt;'

3. Content Security Policy (CSP)
CSP provides a second line of defense by restricting sources from which the browser can load resources like scripts, styles, and images.
Usage:
Meta Tag:
html
Copy code
<meta http-equiv="Content-Security-Policy" content="script-src 'self';">

HTTP Header:
http
Copy code
Content-Security-Policy: script-src 'self' \*.example.com;

Examples:
http
Copy code
Content-Security-Policy:
default-src 'self';
script-src 'self' userscripts.example.com;
img-src \*;
media-src media1.com media2.com;

4. Avoid URL Parameters
   Use POST requests to send data instead of GET requests to avoid exposing sensitive data in URLs.
   GET: http://example.com/?name=<script>
   POST: Securely sends data in the request body.

5. Keep Browsers Updated
   Encourage users to update their browsers for better security features.
   Example:
   LinkedIn restricts access to outdated browsers, urging users to upgrade for optimal functionality.

Balancing Security and User-Friendliness
While restricting outdated browsers enhances security, it may alienate users. Strike a balance between safety and usability:
Support popular browsers.
Educate users about the benefits of updates.

Key Takeaways
XSS exploits occur when user data is processed and returned without proper checks.
Best Practices:
Restrict user inputs.
Escape special characters.
Implement a Content Security Policy.
Use POST for sensitive data submission.
Regularly update browsers and dependencies.
Defense-in-Depth: Combine multiple strategies for robust protection.
Next, we’ll explore securely storing JWTs to protect authentication mechanisms. Stay tuned! 🚀
Ways to Store JWT in the Browser
JWTs (JSON Web Tokens) are a vital part of web authentication, but securely storing them is critical to protect against attacks like XSS (Cross-Site Scripting). Here, we explore two methods for storing JWTs: localStorage and cookies, highlighting their pros, cons, and best practices.

Why Local Storage Isn’t Ideal for Large Projects
Accessibility from JavaScript: Local storage is fully accessible to client-side JavaScript, making it vulnerable to XSS attacks.
XSS Risks: A successful XSS attack can extract the token, allowing hackers to impersonate the user.
For small projects, local storage is convenient, but for larger projects with sensitive data, cookies offer better protection.

Using Cookies to Store JWTs
Cookies provide a more secure way to store tokens, with additional configurations to limit their exposure.

1. Setting Cookies
   You can store JWTs in cookies using the res.cookie() method in Express:
   javascript
   Copy code
   res.cookie('jwt', token, {
   maxAge: 3600000, // Cookie expiration time (1 hour)
   httpOnly: true, // Prevent JavaScript access
   });

Key Features:
httpOnly: Ensures cookies cannot be read by JavaScript.
maxAge: Defines the cookie's lifespan. 2. Sending Cookies Automatically
If the front-end and back-end share the same domain, the browser will automatically include cookies in requests.
For cross-domain setups, you must explicitly enable cookies using the credentials option in fetch():
javascript
Copy code
fetch('/posts', {
method: 'GET',
credentials: 'include', // Ensures cookies are sent
});

Reading Cookies on the Server
To parse cookies in incoming requests, use the cookie-parser middleware:
javascript
Copy code
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/posts', (req, res) => {
console.log(req.cookies.jwt); // Access the JWT token
});

req.cookies: Contains all cookies as key-value pairs.

Advantages of Using Cookies
Reduced XSS Risk:
httpOnly cookies protect tokens from being read by malicious scripts.
Automatic Transmission:
Cookies are automatically included in requests, streamlining authentication.

Drawbacks of Cookies
Susceptible to CSRF:
Cookies are automatically sent with every request, even if initiated by malicious sites, enabling Cross-Site Request Forgery (CSRF) attacks.
Limited Protection from XSS:
While httpOnly cookies hide tokens, hackers can still use them indirectly to send requests.

Choosing the Right Storage Method
Method
Pros
Cons
localStorage

- Easy to implement
- Persistent across sessions
- Fully accessible to JavaScript
- Vulnerable to XSS attacks
  Cookies (httpOnly)
- Protected from direct XSS attacks
- Automatically sent with requests
- Vulnerable to CSRF
- Slightly more complex to manage

For sensitive data and larger projects, httpOnly cookies with additional CSRF protection are recommended.

Next Steps
Cookies introduce the risk of CSRF attacks, where malicious sites exploit cookies to perform unauthorized actions. In the next lesson, you'll learn how to protect your application from CSRF while using cookies for JWT storage.

CSRF, Brute Force, and DDOS: Securing Your Application
Web applications face constant threats like Cross-Site Request Forgery (CSRF), Brute Force, and Distributed Denial of Service (DDOS) attacks. Here's how to protect your app against these threats.

1. Cross-Site Request Forgery (CSRF)
What is CSRF?
A CSRF attack exploits the browser's automatic cookie-sending behavior.
A malicious site tricks an authenticated user into executing unauthorized actions on your application by leveraging their cookies.
Example: A hacker hosts a malicious form that sends requests to your site using the user’s authenticated session. For example:
html
Copy code
<form action="https://your-domain.com/delete-account" method="POST">
  <input type="hidden" name="confirm" value="true" />
  <input type="submit" value="Click Here to Claim Your Prize!" />
</form>

When an unsuspecting user clicks the button, their authenticated session sends the request.

How to Prevent CSRF
Use the sameSite Cookie Option: Restrict cookies to be sent only with requests from the same domain.
javascript
Copy code
res.cookie('jwt', token, {
maxAge: 3600000,
httpOnly: true,
sameSite: 'strict' // or 'lax' depending on your requirements
});

strict: Cookies are sent only with requests originating from the same domain.
lax: Cookies are sent with same-site requests and top-level navigations (e.g., clicking a link).
CSRF Tokens: Generate a unique token for each user session and validate it on the server.
Include the token as a hidden field in forms or in a custom request header.
The server validates the token before processing the request.
Update Browser Recommendations: Inform users to use modern browsers that support the sameSite option.

2. Brute Force Attacks
   What is a Brute Force Attack?
   Hackers use automated tools to try thousands of password combinations per second to gain access to accounts.
   How to Prevent Brute Force Attacks
   Limit Login Attempts: Use the express-rate-limit middleware to restrict the number of login attempts from a single IP address.
   javascript
   Copy code
   const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
windowMs: 15 _ 60 _ 1000, // 15 minutes
max: 5, // Limit each IP to 5 login attempts per window
message: "Too many login attempts. Please try again later."
});

app.post('/login', loginLimiter, (req, res) => {
// login logic
});

Use Strong Password Policies:
Require complex passwords with a combination of letters, numbers, and symbols.
Use a password hashing algorithm like bcrypt to securely store passwords.
Enable Multi-Factor Authentication (MFA):
Require an additional verification step, such as a code sent to the user's phone or email.

3. Distributed Denial of Service (DDOS)
   What is a DDOS Attack?
   Hackers use a distributed network of devices (often compromised) to flood your server with an overwhelming number of requests.
   This consumes your server's bandwidth, rendering it inaccessible to legitimate users.
   How to Prevent DDOS Attacks
   Rate Limiting:
   Apply express-rate-limit globally to restrict the number of requests per IP address.
   javascript
   Copy code
   const globalLimiter = rateLimit({
   windowMs: 1 _ 60 _ 1000, // 1 minute
   max: 100, // Limit each IP to 100 requests per minute
   });

app.use(globalLimiter);

Content Delivery Network (CDN):
Use a CDN like Cloudflare to cache your content and absorb malicious traffic.
Web Application Firewall (WAF):
Deploy a WAF to filter and block malicious traffic before it reaches your application.
Load Balancing:
Distribute traffic across multiple servers to prevent overload on a single server.
Scaling Solutions:
Use cloud services like AWS or Google Cloud that automatically scale resources to handle spikes in traffic.

Best Practices for Comprehensive Security
Combine Strategies:
Use multiple layers of protection (e.g., sameSite, rate limiting, WAF).
Monitor Traffic:
Regularly audit server logs to detect unusual activity.
Educate Users:
Teach users about phishing scams and secure password practices.
Keep Dependencies Updated:
Regularly update libraries and frameworks to patch known vulnerabilities.

Next Steps
Now that you’ve secured your app against CSRF, Brute Force, and DDOS attacks, you’ll learn about securing communication between the client and server using HTTPS and other encryption methods in the next lesson.
External Components: Security Best Practices
When incorporating external tools, libraries, and stylesheets into a project, it’s essential to safeguard your app against potential vulnerabilities. External components streamline development but can introduce risks like altered files, outdated dependencies, or malicious code. Here's how to mitigate these threats.

1. Loading External Components
a. Avoid Direct Linking to External Servers
Why it’s risky: You cannot control external servers. Files might be altered, introducing vulnerabilities.
Example:
html
Copy code
<script src="https://code.jquery.com/jquery.slim.min.js"></script>

b. Specify Versions
Use versioned URLs to prevent updates without your control.
Secure Example:
html
Copy code

<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>

c. Use Local Copies
Save the library locally to reduce dependence on external servers.
Example:
html
Copy code

<script src="/vendor/jquery-3.4.1.slim.min.js"></script>

Pros: Full control over the file.
Cons: Larger repository size and potentially longer build times.

2. Hashes for File Integrity
Use the integrity attribute with a cryptographic hash to verify the file’s integrity. This ensures the file hasn’t been tampered with during transfer.
Example:
html
Copy code
<script
  src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
  integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
  crossorigin="anonymous"
></script>

How it works:
The browser calculates the file's hash and compares it to the provided hash.
Use tools like SRI Hash Generator to calculate hashes.
crossorigin="anonymous": Ensures no user data is sent during the request.

3. Managing Dependencies in NPM Projects
   a. Locking Dependency Versions
   Use package-lock.json to prevent unintentional updates.
   Why?: Ensures consistent dependency versions across different environments.
   Steps:
   Enable package-lock.json:
   bash
   Copy code
   npm config set package-lock true

Install dependencies:
bash
Copy code
npm install --package-lock

b. Checking for Vulnerabilities
Use npm audit to detect known vulnerabilities in your dependencies.
bash
Copy code
npm audit

Output:
Lists vulnerable dependencies.
Suggests versions to upgrade to.

4. Continuous Monitoring of Dependencies
   a. GitHub Dependabot
   Automates dependency vulnerability checks.
   How to Enable:
   Go to Settings → Security & analysis.
   Click Enable next to Dependabot alerts.
   What it does:
   Displays security warnings on the repository dashboard.
   Suggests fixes and recommended versions.
   b. GitLab Dependency Scanning
   Similar to Dependabot, available on GitLab.

5. Vulnerability Databases
   Check components against vulnerability databases to identify known issues before using them:
   CVE Details: A large, open-source database of vulnerabilities.
   Website: cvedetails.com
   Search by company, product, or vulnerability type.
   Note: Absence from the database doesn’t guarantee safety; new vulnerabilities can emerge after the component is in use.

Best Practices for Using External Components
Risk
Mitigation
Unreliable External Servers

- Use versioned or local copies.
- Add integrity hashes for verification.
  Outdated Dependencies
- Enable package-lock.json.
- Run npm audit.
  Unknown Vulnerabilities
- Use tools like Dependabot or CVE Details.
- Regularly monitor updates.
  Tampered Files
- Use integrity attributes with cryptographic hashes.

Conclusion
External components are essential for efficient development, but they must be managed carefully to prevent vulnerabilities. By combining best practices like dependency locking, integrity checks, and vulnerability monitoring, you can safely incorporate external tools into your projects.
Next, we’ll explore secure communication using HTTPS and other encryption methods. Stay tuned!

Security Checklist
Security is critical to web development. By proactively addressing vulnerabilities, you can protect your applications, users, and data. Here's a comprehensive checklist to guide your security practices.

✅ 1. Set Response Headers
Use security headers like Content-Security-Policy (CSP) to control the sources of scripts, stylesheets, and other resources.
Automate adding security headers with the Helmet middleware:
javascript
Copy code
const helmet = require('helmet');
app.use(helmet());

Helmet Documentation: npmjs.com/package/helmet

✅ 2. Validate User Data
Sanitize inputs to prevent injection attacks (e.g., XSS and SQL injection).
Use libraries like escape-html to escape control characters:
javascript
Copy code
const escape = require('escape-html');
const sanitizedInput = escape(userInput);

Always validate input data on both the front end and back end.

✅ 3. Choose the Right Client-Side Storage
Use httpOnly cookies for sensitive data like JWTs.
They are inaccessible to JavaScript, reducing XSS risks.
Example:
javascript
Copy code
res.cookie('jwt', token, {
maxAge: 3600000, // 1 hour
httpOnly: true,
sameSite: 'strict'
});

Use localStorage for non-sensitive data only.

✅ 4. Protect Against CSRF
If your app uses cookies for authorization, protect against Cross-Site Request Forgery (CSRF) attacks.
Implement at least the SameSite cookie option:
javascript
Copy code
res.cookie('jwt', token, { sameSite: 'strict' });

✅ 5. Prepare for Brute Force and DDOS Attacks
Use the express-rate-limit middleware to limit the number of requests per IP:
javascript
Copy code
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
windowMs: 15 _ 60 _ 1000, // 15 minutes
max: 100, // Max 100 requests per IP
});

app.use(limiter);

Express-rate-limit Documentation: npmjs.com/package/express-rate-limit

✅ 6. Check Dependencies
Before deploying your project:
Run npm audit to identify vulnerabilities in your dependencies:
bash
Copy code
npm audit

Address any flagged vulnerabilities before going live.
Enable security alerts (e.g., GitHub Dependabot or GitLab Dependency Scanning) to monitor for future vulnerabilities.

✅ 7. Continue Learning
Security is an ever-evolving field. Stay updated with:
Web security best practices.
Tools and techniques for vulnerability detection.
Emerging threats and countermeasures.

Looking Ahead
In the next sprint, we'll explore key storage and how to securely manage secrets in your applications. Security is a vast topic, so consider studying it alongside other areas of software engineering to become a well-rounded developer.
By following this checklist, you’ll ensure your applications are robust and better equipped to handle modern security challenges. Keep securing, keep learning! 🚀

Sprint 14 Quiz
Fetch Request

When sending data in the body of a request, it's important to send it in the format that the API is expecting. This format is typically JSON. Choose the fetch request that will send the body as JSON.
Explanation of the Correct Answer
Why it’s correct:
The API expects the body to be in JSON format, which is a string representation of an object.
JSON.stringify converts a JavaScript object into a JSON-formatted string, which can be sent in the request body.
The Content-Type: application/json header informs the server that the body content is in JSON format.
The Accept: application/json header tells the server that the client expects a JSON response.
Code Breakdown:
javascript
Copy code
fetch(`${BASE_URL}/signin`, {
method: 'POST',
headers: {
'Accept': 'application/json', // Client expects JSON response
'Content-Type': 'application/json' // Body content is JSON
},
body: JSON.stringify({ email: 'person@place.com', password: 'password' }) // Correctly formatted JSON
});

Why the Other Options are Incorrect
Option 1:
javascript
Copy code
body: { 'email': 'person@place.com', 'password': 'password' };

Why it’s wrong:
The body contains a raw JavaScript object, not a JSON-formatted string.
Fetch requires the body to be sent as a string when Content-Type is application/json.
What would happen:
The server would reject the request or not process the body correctly because it isn’t in the expected JSON format.
Option 3:
javascript
Copy code
body: JSON.parse('{ "email": "person@place.com", "password": "password" }');

Why it’s wrong:
JSON.parse converts a JSON string into a JavaScript object.
This option takes a JSON string, parses it into an object, and attempts to send it as the body, which isn’t valid for Content-Type: application/json.
What would happen:
The server would reject the request or process the body incorrectly because it expects a string, not an object.
Option 4:
javascript
Copy code
body: JSON.parse({ email: 'person@place.com', password: 'password' });

Why it’s wrong:
JSON.parse only works on strings, not objects.
The code here attempts to parse an object directly, which would throw a runtime error: SyntaxError: Unexpected token o in JSON at position 1.

Key Takeaways
Body Format Matters:
When sending data in the request body to an API, always ensure it’s formatted in the way the API expects.
For Content-Type: application/json, the body must be a JSON string.
JSON.stringify vs. JSON.parse:
JSON.stringify: Converts a JavaScript object into a JSON string (used when sending data).
JSON.parse: Converts a JSON string into a JavaScript object (used when receiving or manipulating JSON data).
Headers Are Critical:
Set Content-Type to inform the server about the format of the request body.
Set Accept to specify the desired response format.
Validation Saves Time:
Validate your API requests by checking the expected input and output formats in the API documentation.
With these insights, you’ll know how to correctly structure and debug API requests! 🚀
4o

Matching Statements to the Authentication Process
Remove the token from localStorage.
Applies to: On Logout
Explanation:
When the user logs out, their session should be terminated by removing the token from localStorage. This prevents unauthorized access in the future.

Redirect the user to the home page or personal account.
Applies to: On Login
Explanation:
After the user successfully logs in, they are typically redirected to their personal dashboard, home page, or another authenticated section of the app.

Save the token to localStorage.
Applies to: On Login
Explanation:
After successful login, the server sends a token, which is stored in localStorage to maintain the user's session and enable subsequent authenticated requests.

Check if there is a valid token in localStorage.
Applies to: When the user arrives
Explanation:
When the user first visits the app, the system checks for a token in localStorage to determine if the user is already authenticated. If valid, they may be redirected to their account or stay logged in.

Key Takeaways
On Registration: Typically involves sending user credentials to the server to create a new account but doesn't directly interact with tokens.
On Login: The token is saved, and the user is redirected.
On Logout: The token is removed to end the session securely.
When the User Arrives: The app checks for a stored token to decide if the user needs to log in or can continue as authenticated.
Correctly mapping these processes ensures secure and user-friendly authentication workflows.

Local Storage & Tokens
"It converts a JSON string into a JavaScript object."
Answer: The JSON.parse() method
Explanation:
JSON.parse() is used to take a JSON-formatted string (e.g., data retrieved from localStorage) and convert it into a usable JavaScript object.
Example:
javascript
Copy code
const jsonString = '{"name": "John", "age": 30}';
const parsedObject = JSON.parse(jsonString);
console.log(parsedObject); // { name: "John", age: 30 }

"It converts a JavaScript object into a JSON string."
Answer: The JSON.stringify() method
Explanation:
JSON.stringify() is used to convert a JavaScript object into a JSON-formatted string so it can be stored in localStorage or sent to a server.
Example:
javascript
Copy code
const jsObject = { name: "John", age: 30 };
const jsonString = JSON.stringify(jsObject);
console.log(jsonString); // '{"name":"John","age":30}'

"It takes two arguments, a key and a value."
Answer: The setItem() method
Explanation:
localStorage.setItem() is used to store data in localStorage. It requires:
A key: The name under which the data will be stored.
A value: The data to store (usually a JSON string if it's complex).
Example:
javascript
Copy code
localStorage.setItem('name', 'John');
localStorage.setItem('user', JSON.stringify({ age: 30 }));

"It is available globally, like window or console."
Answer: The localStorage object
Explanation:
localStorage is a built-in browser API that provides a way to store key-value pairs in a persistent way. The data persists even after the browser is closed and reopened.
Example:
javascript
Copy code
localStorage.setItem('token', 'abc123');
console.log(localStorage.getItem('token')); // 'abc123'

Key Takeaways
localStorage Object: The browser's built-in object for storing key-value data persistently.
setItem() Method: Stores data in localStorage. Key-value pairs must be strings.
JSON.stringify(): Converts a JavaScript object into a JSON string to store complex data in localStorage.
JSON.parse(): Converts JSON strings retrieved from localStorage back into JavaScript objects.
