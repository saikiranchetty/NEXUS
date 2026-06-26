const menuBar = document.getElementById('menu-bar');
const menuClose = document.getElementById('menu-close');
const dropdownMenu = document.getElementById('dropdown-menu');

menuBar.addEventListener('click', function() {
    dropdownMenu.style.display = 'block';
    menuBar.style.display = 'none';
    menuClose.style.display = 'block';
});

menuClose.addEventListener('click', function() {
    dropdownMenu.style.display = 'none';
    menuBar.style.display = 'block';
    menuClose.style.display = 'none';
});

const searchicon1 = document.querySelector('#searchicon1');
const srchicon1 = document.querySelector('#srchicon1');
const search1 = document.querySelector('#searchinput1');

searchicon1.addEventListener('click', function() {
    search1.style.display = 'flex';
    searchicon1.style.display = 'none';
});
