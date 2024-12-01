let peers = {};
let localStream;
const socket = io();

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('room');
const password = urlParams.get('password');
const isHost = urlParams.get('host') === 'true';
const username = localStorage.getItem('username') || 'Guest';

// Initialize the meeting room
async function initializeRoom() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        const localVideo = document.getElementById('localVideo');
        localVideo.srcObject = localStream;

        socket.emit('join-room', roomId, password, username, isHost);
    } catch (error) {
        alert('Unable to access camera and microphone');
    }
}

// Add your other room.js logic here (same as provided earlier)
initializeRoom();
