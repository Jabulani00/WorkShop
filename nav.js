// nav.js - Floating Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.querySelector('.floating-hamburger');
    const slideMenu = document.querySelector('.slide-menu');
    const overlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Toggle menu function
    function toggleMenu() {
        hamburger.classList.toggle('active');
        slideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (slideMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });
    
    // Close menu when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && slideMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Highlight active page
    const currentPage = window.location.pathname.split("/").pop();
    
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add subtle animation to hamburger on hover
    hamburger.addEventListener('mouseenter', function() {
        if (!hamburger.classList.contains('active')) {
            const spans = this.querySelectorAll('span');
            spans[0].style.width = '20px';
            spans[1].style.width = '15px';
            
            setTimeout(() => {
                spans[0].style.width = '25px';
                spans[1].style.width = '25px';
            }, 300);
        }
    });
});