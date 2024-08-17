// Function to generate a random ID
function generateRandomID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'ID-';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to preview the image and enable the submit button
function previewImage(event) {
    const reader = new FileReader();
    const imageField = document.getElementById("upload-preview");
    const submitButton = document.getElementById("submit-btn");

    reader.onload = function() {
        if(reader.readyState === 2) {
            imageField.src = reader.result;
            submitButton.disabled = false;  // Enable the submit button

            // Store the image and proposal details in local storage
            localStorage.setItem('uploadedImage', reader.result);
        }
    }
    reader.readAsDataURL(event.target.files[0]);

    // Generate and set the ID
    const newID = generateRandomID(8);  // Generating a random ID with 8 characters
    document.getElementById("proposal-id").textContent = newID;

    // Store the ID and proposal text in local storage
    localStorage.setItem('proposalId', newID);
    localStorage.setItem('proposalText', "Tree Planting near Prestige Mall");  // Replace this with dynamic text if needed
}

// Function to handle form submission
function submitProposal() {
    // Show the popup
    document.getElementById('popup').classList.remove('hidden');

    // Set a timeout to close the popup after 3 seconds and then redirect
    setTimeout(() => {
        closePopup();
        // Redirect to the voting portal
        window.location.href = 'voting.html';
    }, 3000);  // 3000ms = 3 seconds
}

// Function to close the popup manually (if needed)
function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}
