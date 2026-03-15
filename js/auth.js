// auth.js - Admin Authentication logic

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Hardcoded credentials for simulation
            const ADMIN_EMAIL = 'admin@upgrad.com';
            const ADMIN_PASS = '12345';

            if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('adminUser', JSON.stringify({ email: ADMIN_EMAIL, name: 'Admin' }));
                
                // Show success alert and redirect
                alert('Login Successful! Welcome to the Admin Dashboard.');
                window.location.href = 'events.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }

    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('adminUser');
            alert('You have been logged out.');
            window.location.href = 'login.html';
        });
    }
});
