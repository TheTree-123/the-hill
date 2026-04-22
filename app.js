// REPLACE the URL below with your current Google Script "exec" link
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRqb-Andnw_XAKlX-sHPss8GoQ0xW9JMoJbnxSjdWx_KUlxJqFeVVw1yJIE-hHtyk/exec";

// --- LOGIN: Fixed to look inside the "users" folder ---
async function loginStudent(studentID) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        
        // We look specifically at the users array inside the data object
        const allUsers = data.users || []; 
        const foundUser = allUsers.find(u => String(u.id) === String(studentID));

        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify({
                ...foundUser,
                avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${foundUser.user}`
            }));
            return true;
        }
        return false;
    } catch (e) {
        console.error("Login Error:", e);
        return false;
    }
}

// --- SIGNUP ---
async function signUpStudent(fName, lName, uName, sID, pro, gYear) {
    const newUser = { 
        id: sID, 
        name: fName + " " + lName, 
        user: uName, 
        pronouns: pro, 
        year: parseInt(gYear), 
        bio: "Go Tigers! 🐯" 
    };

    try {
        await fetch(GOOGLE_SCRIPT_URL, { 
            method: 'POST', 
            mode: 'no-cors', 
            body: JSON.stringify(newUser) 
        });

        localStorage.setItem('currentUser', JSON.stringify({
            ...newUser,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${uName}`
        }));
        return true;
    } catch (e) {
        return false;
    }
}

// --- POSTING ---
async function publishPost(username, text) {
    const postData = { username: username, content: text };
    try {
        await fetch(GOOGLE_SCRIPT_URL, { 
            method: 'POST', 
            mode: 'no-cors', 
            body: JSON.stringify(postData) 
        });
        return true;
    } catch (e) {
        return false;
    }
}

// --- BADGE LOGIC ---
function getBadge(gradYear) {
    const currentYear = 2026;
    if (parseInt(gradYear) < currentYear) {
        return `<span style="border: 1px solid #f3a661; color: #f3a661; font-size: 9px; padding: 2px 6px; border-radius: 4px; margin-left: 5px; font-weight: bold;">ALUMNI</span>`;
    }
    return "";
}
