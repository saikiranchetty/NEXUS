
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}




function welcomeUser() {
    const username = localStorage.getItem('username'); 
    if (username) {
        alert(`Welcome, ${username}!`);
    }
}

function storeSignInDetails(username, password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Sign-In Details Saved Successfully!');
}

window.onload = function () {
    welcomeUser();
};
