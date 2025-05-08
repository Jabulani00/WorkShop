// Initialize Firebase
// NOTE: Replace these with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlBizxrveZekwAPPKXwj8lOInLZodV0O4",
    authDomain: "zungu-finance.firebaseapp.com",
    projectId: "zungu-finance",
    storageBucket: "zungu-finance.firebasestorage.app",
    messagingSenderId: "94487985595",
    appId: "1:94487985595:web:810bf42e3441495086d89e",
    measurementId: "G-21EJZH8J7F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get current date for timestamp
const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString();
};

// Form submission handler
document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect form data
    const feedbackData = {
        // Personal information
        studentType: document.getElementById('studentType').value,
        surname: document.getElementById('surname').value,
        initials: document.getElementById('initials').value,
        
        // Workshop content satisfaction
        contentRelevant: document.querySelector('input[name="contentRelevant"]:checked').value,
        
        // ADDED: New radio button fields
        workshopPace: document.querySelector('input[name="workshopPace"]:checked').value,
        difficultyLevel: document.querySelector('input[name="difficultyLevel"]:checked').value,
        recommendLikelihood: document.querySelector('input[name="recommendLikelihood"]:checked').value,
        
        // Understanding of topics
        gitBasics: document.querySelector('input[name="gitBasics"]:checked').value,
        githubCollab: document.querySelector('input[name="githubCollab"]:checked').value,
        portfolioDev: document.querySelector('input[name="portfolioDev"]:checked').value,
        webHosting: document.querySelector('input[name="webHosting"]:checked').value,
        
        // ADDED: New topic understanding fields
        htmlCssBasics: document.querySelector('input[name="htmlCssBasics"]:checked').value,
        githubPages: document.querySelector('input[name="githubPages"]:checked').value,
        
        // Workshop experience checkboxes
        enoughTime: document.getElementById('enoughTime').checked,
        materialsClear: document.getElementById('materialsClear').checked,
        mentorsHelpful: document.getElementById('mentorsHelpful').checked,
        willApply: document.getElementById('willApply').checked,
        
        // ADDED: New workshop experience checkboxes
        adequateEquipment: document.getElementById('adequateEquipment').checked,
        practicalHandsOn: document.getElementById('practicalHandsOn').checked,
        teamworkEffective: document.getElementById('teamworkEffective').checked,
        confidentWithGit: document.getElementById('confidentWithGit').checked,
        confidentWithGitHub: document.getElementById('confidentWithGitHub').checked,
        portfolioStarted: document.getElementById('portfolioStarted').checked,
        
        // ADDED: Workshop outcomes
        workshopOutcome: document.querySelector('input[name="workshopOutcome"]:checked').value,
        
        // Future workshop topics
        futureTopics: {
            advancedGit: document.getElementById('advancedGit').checked,
            advancedWeb: document.getElementById('advancedWeb').checked,
            javascript: document.getElementById('javascript').checked,
            database: document.getElementById('database').checked,
            // ADDED: New future topics
            mobileResponsive: document.getElementById('mobileResponsive').checked,
            uiUxDesign: document.getElementById('uiUxDesign').checked,
            apiIntegration: document.getElementById('apiIntegration').checked
        },
        
        // ADDED: Workshop format preference
        formatPreference: document.querySelector('input[name="formatPreference"]:checked').value,
        
        // Optional comments
        comments: document.getElementById('comments').value,
        
        // Metadata
        timestamp: getCurrentDate()
    };
    
    try {
        // Save to Firestore
        await db.collection('workshop_feedback').add(feedbackData);
        
        // Show success message
        document.getElementById('success-message').style.display = 'block';
        
        // Reset form
        document.getElementById('feedback-form').reset();
        
        // Scroll to success message
        document.getElementById('success-message').scrollIntoView({ behavior: 'smooth' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('success-message').style.display = 'none';
        }, 5000);
    
    } catch (error) {
        console.error("Error saving feedback: ", error);
        alert("There was an error submitting your feedback. Please try again.");
    }
});

// Form validation enhancements
document.querySelectorAll('.form-control, .form-select').forEach(input => {
    input.addEventListener('input', function() {
        if (this.hasAttribute('required') && this.value.trim() === '') {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        }
    });
});