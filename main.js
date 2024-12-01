function createMeeting() {
    const username = document.getElementById('createUsername').value.trim();
    const password = document.getElementById('createPassword').value.trim();

    if (!username || !password) {
        alert('Please enter your name and set a password');
        return;
    }

    const meetingId = generateMeetingId();
    localStorage.setItem(`meeting_${meetingId}`, password);
    localStorage.setItem('username', username);

    // Redirect to room
    window.location.href = `/room.html?room=${meetingId}&password=${password}&host=true`;
}

function joinMeeting() {
    const username = document.getElementById('joinUsername').value.trim();
    const meetingId = document.getElementById('meetingId').value.trim();
    const password = document.getElementById('joinPassword').value.trim();

    if (!username || !meetingId || !password) {
        alert('Please fill in all fields');
        return;
    }

    const correctPassword = localStorage.getItem(`meeting_${meetingId}`);
    if (correctPassword !== password) {
        alert('Incorrect password');
        return;
    }

    localStorage.setItem('username', username);

    // Redirect to room
    window.location.href = `/room.html?room=${meetingId}&password=${password}`;
}

function generateMeetingId() {
    return Math.random().toString(36).substring(2, 12);
}
