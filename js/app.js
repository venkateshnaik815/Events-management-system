// app.js - Common functionality and helpers

// Initialize logical storage if empty
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('events')) {
        const defaultEvents = [
            {
                id: 'E001',
                name: 'Mastering AI & Data Science',
                category: 'Tech & Innovations',
                date: '2026-04-20',
                time: '10:00',
                url: 'https://upgrad.com/events/ai-ds'
            },
            {
                id: 'E002',
                name: 'Industrial Automation Expo',
                category: 'Industrial Events',
                date: '2026-05-15',
                time: '14:00',
                url: 'https://upgrad.com/events/automation'
            }
        ];
        localStorage.setItem('events', JSON.stringify(defaultEvents));
    }
});

// Helper for displaying alerts
function showAlert(message, type = 'success') {
    alert(message); // simple for now, can be upgraded to Bootstrap modals/toasts
}

// Helper to check login status
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname;

    if (currentPage.includes('events.html') && !isLoggedIn) {
        window.location.href = 'login.html';
    }
}
