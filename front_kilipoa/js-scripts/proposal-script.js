// Function to set the proposal text
function setProposalText(text) {
    document.getElementById('proposal-input').value = text;
}

function redirectToUpload() {
    // Retrieve the proposal text
    const proposalText = document.getElementById('proposal-input').value;
    
    // Store the proposal text in localStorage to pass it to the next page
    localStorage.setItem('proposalText', proposalText);
    
    // Redirect to the upload page
    window.location.href = 'upload.html';
}

function previewImage(event) {
    const reader = new FileReader();
    const imageField = document.getElementById("upload-preview");

    reader.onload = function() {
        if(reader.readyState === 2) {
            imageField.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0]);
}


// Function to generate a unique ID
function generateUniqueId() {
    return 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Function to set the proposal text
function setProposalText(text) {
    document.getElementById('proposal-input').value = text;
}

function redirectToUpload() {
    // Retrieve the proposal text
    const proposalText = document.getElementById('proposal-input').value;

    // Generate a unique ID and get the current time
    const uniqueId = generateUniqueId();
    const currentTime = new Date().toLocaleString();

    // Store the proposal text, unique ID, and time in localStorage to pass it to the next page
    localStorage.setItem('proposalText', proposalText);
    localStorage.setItem('uniqueId', uniqueId);
    localStorage.setItem('currentTime', currentTime);

    // Redirect to the upload page
    window.location.href = 'upload.html';
}

function previewImage(event) {
    const reader = new FileReader();
    const imageField = document.getElementById("upload-preview");

    reader.onload = function() {
        if(reader.readyState === 2) {
            imageField.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Function to display the ID and time on the upload page
function displayUploadInfo() {
    document.getElementById('upload-id').textContent = localStorage.getItem('uniqueId');
    document.getElementById('upload-time').textContent = localStorage.getItem('currentTime');
}

// Call displayUploadInfo when the page loads
if (window.location.pathname.endsWith('upload.html')) {
    displayUploadInfo();
}

window.onload = function() {
    // Get proposal text from localStorage
    const proposalText = localStorage.getItem('proposalText') || "No proposal text available";
    document.getElementById('upload-proposal').textContent = proposalText;

    // Generate a unique ID and time
    const uniqueID = 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentTime = new Date().toLocaleString();

    document.getElementById('upload-id-value').textContent = uniqueID;
    document.getElementById('upload-time-value').textContent = currentTime;
}

function previewImage(event) {
    const reader = new FileReader();
    const imageField = document.getElementById("upload-preview");

    reader.onload = function() {
        if(reader.readyState === 2) {
            imageField.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0]);
}

