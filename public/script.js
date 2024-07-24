// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const businessRunnerBtn = document.getElementById('business-runner-btn');
    const customerBtn = document.getElementById('customer-btn');

    if (businessRunnerBtn) {
        businessRunnerBtn.addEventListener('click', () => {
            window.location.href = 'business_runner_signup.html';
        });
    }

    if (customerBtn) {
        customerBtn.addEventListener('click', () => {
            window.location.href = 'customer_section.html';
        });
    }

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDherXra0HK3ton1vVRxxp5gRYxsNZseaY",
        authDomain: "auronix-website.firebaseapp.com",
        projectId: "auronix-website",
        storageBucket: "auronix-website.appspot.com",
        messagingSenderId: "986858172712",
        appId: "1:986858172712:web:7caaecc86b57535183201d"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Handle Business Runner Signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const profilePhoto = document.getElementById('profile-photo').files[0];
            const previousWorks = document.getElementById('previous-works').value;
            const portfolio = document.getElementById('portfolio').value;
            const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(checkbox => checkbox.value);
            const otherSkill = document.getElementById('other-skill').value;

            const profileData = {
                email,
                name,
                profilePhoto,
                previousWorks,
                portfolio,
                skills: [...skills, otherSkill]
            };

            db.collection('profiles').add(profileData).then(() => {
                alert('Profile created successfully!');
                window.location.href = 'customer_section.html';
            }).catch(error => {
                console.error('Error creating profile: ', error);
            });
        });
    }

    // Fetch and Display Profiles for Customers
    const profilesSection = document.getElementById('profiles');
    if (profilesSection) {
        db.collection('profiles').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const profile = doc.data();
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('profile', 'bg-white', 'p-4', 'rounded-lg', 'shadow-lg');
                profileDiv.innerHTML = `
                    <h2 class="text-2xl font-bold">${profile.name}</h2>
                    <p class="mt-2 text-gray-600">Email: ${profile.email}</p>
                    <p class="mt-2 text-gray-600">Skills: ${profile.skills.join(', ')}</p>
                    <button class="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition" onclick="hire('${profile.email}')">Hire</button>
                `;
                profilesSection.appendChild(profileDiv);
            });
        });
    }

    window.hire = (email) => {
        window.location.href = `mailto:${email}`;
    };
});
