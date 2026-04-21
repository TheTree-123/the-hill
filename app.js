const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRqb-Andnw_XAKlX-sHPss8GoQ0xW9JMoJbnxSjdWx_KUlxJqFeVVw1yJIE-hHtyk/exec";

// --- SIGNUP ---
async function signUpStudent(fName, lName, uName, sID, pro, gYear) {
    const newUser = { id: sID, name: fName + " " + lName, user: uName, pronouns: pro, year: parseInt(gYear), bio: "Go Tigers! 🐯" };
    try {
        await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(newUser) });
        localStorage.setItem('currentUser', JSON.stringify({ ...newUser, avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${uName}` }));
        return true;
    } catch (e) { return false; }
}

// --- LOGIN ---
async function loginStudent(studentID) {
    try {
        const res = await fetch(GOOGLE_SCRIPT_URL);
        const users = await res.json();
        const found = users.find(u => u.id == studentID);
        if (found) {
            localStorage.setItem('currentUser', JSON.stringify({ ...found, avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${found.user}` }));
            return true;
        }
        return false;
    } catch (e) { return false; }
}

// --- POSTING ---
async function publishPost(username, text) {
    const postData = { username: username, content: text };
    try {
        await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(postData) });
        return true;
    } catch (e) { return false; }
}

// --- BADGE ---
function getBadge(gradYear) {
    if (parseInt(gradYear) < 2026) {
        return `<span style="border: 1px solid #f3a661; color: #f3a661; font-size: 9px; padding: 2px 6px; border-radius: 4px; margin-left: 5px; font-weight: bold;">ALUMNI</span>`;
    }
    return "";
}