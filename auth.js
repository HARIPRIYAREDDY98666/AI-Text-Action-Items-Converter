// --- SIGNUP LOGIC ---
function handleSignup() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPassword").value;
    const errorDiv = document.getElementById("signupError");

    // Email validation pattern (Regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. Check for empty fields
    if (!name || !email || !pass) {
        errorDiv.style.display = "block";
        errorDiv.innerText = "All fields are required";
        return;
    }

    // 2. Validate email format
    if (!emailPattern.test(email)) {
        errorDiv.style.display = "block";
        errorDiv.innerText = "Please enter a valid email address";
        return;
    }

    // 3. CHECK IF USER ALREADY EXISTS (New Feature)
    const existingData = localStorage.getItem("appUser");
    if (existingData) {
        const existingUser = JSON.parse(existingData);
        if (existingUser.email === email) {
            alert("User already exists! Redirecting to login...");
            window.location.href = "login.html"; // Redirects to login page
            return;
        }
    }

    // 4. Save new user if valid
    const user = { name, email, pass };
    localStorage.setItem("appUser", JSON.stringify(user));

    alert("Account created successfully!");
    window.location.href = "login.html"; // Go to login page
}

// --- LOGIN LOGIC ---
function handleLogin() {
    const emailInput = document.getElementById("email").value;
    const passInput = document.getElementById("password").value;
    const errorMsg = document.getElementById("error");

    const storedUser = localStorage.getItem("appUser");

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (emailInput === user.email && passInput === user.pass) {
            // Login Success
            window.location.href = "dashboard.html";
        } else {
            // Wrong Password
            errorMsg.style.display = "block";
            errorMsg.innerText = "Invalid Credentials";
        }
    } else {
        // No User Found
        errorMsg.style.display = "block";
        errorMsg.innerText = "No account found. Please Sign Up.";
    }
}

// --- DASHBOARD LOGIC ---
function logout() {
    window.location.href = "login.html";
}
// --- FORGOT PASSWORD LOGIC ---

function checkEmail() {
    const email = document.getElementById("resetEmail").value;
    const msg = document.getElementById("msg");
    const storedUser = localStorage.getItem("appUser");

    if (!storedUser) {
        msg.innerText = "No users found in the system.";
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === email) {
        // Email matches! Show Step 2
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
        msg.innerText = "";
    } else {
        msg.style.color = "red";
        msg.innerText = "Email not found.";
    }
}

function saveNewPassword() {
    const newPass = document.getElementById("newPass").value;
    const msg = document.getElementById("msg");
    
    if (!newPass) {
        msg.innerText = "Please enter a password.";
        return;
    }

    // Get current user data
    const storedUser = localStorage.getItem("appUser");
    let user = JSON.parse(storedUser);

    // Update password
    user.pass = newPass;

    // Save back to storage
    localStorage.setItem("appUser", JSON.stringify(user));

    alert("Password updated successfully!");
    window.location.href = "login.html";
}