document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in to update the navbar
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.querySelector('.auth-buttons');
    
    if (currentUser && authButtons) {
        // Replace auth buttons with user profile link
        authButtons.innerHTML = `
            <a href="dashboard.html" class="btn btn-outline">Dashboard</a>
            <a href="#" id="logoutButton" class="btn btn-primary">Logout</a>
        `;
        
        // Add logout functionality
        document.getElementById('logoutButton').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    // Mobile menu toggle would go here
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});