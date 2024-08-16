// Retrieve the uploaded image from local storage
const uploadedImage = localStorage.getItem('uploadedImage');
if (uploadedImage) {
    document.getElementById('uploaded-image').src = uploadedImage;
}

// Retrieve the proposal text and ID from local storage
const proposalText = localStorage.getItem('proposalText');
const proposalId = localStorage.getItem('proposalId');
if (proposalText && proposalId) {
    document.getElementById('proposal-text').textContent = `Proposal Id: ${proposalId} : ${proposalText}`;
}

let upVoteCount = 0;
let downVoteCount = 0;

// Function to handle voting
function vote(type) {
    if (type === 'up') {
        upVoteCount++;
        document.getElementById('up-vote-count').textContent = upVoteCount;
    } else if (type === 'down') {
        downVoteCount++;
        document.getElementById('down-vote-count').textContent = downVoteCount;
    }
}

// Function to handle liking a message
function likeMessage() {
    alert("You liked this proposal!");
    // You can expand this to track and display the number of likes
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;

    if (messageText.trim() !== "") {
        // Create a new comment div
        const newComment = document.createElement('div');
        newComment.className = 'comment';

        // Add a profile picture (use the actual profile image)
        const userProfilePic = document.querySelector('.profile-pic').src;

        const img = document.createElement('img');
        img.src = userProfilePic; // Link to the user's actual profile image
        img.alt = 'User';
        img.className = 'comment-pic';

        // Create a div to hold the message
        const messageDiv = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = 'You'; // This should be dynamic with the user's name
        const p = document.createElement('p');
        p.textContent = messageText;

        messageDiv.appendChild(strong);
        messageDiv.appendChild(p);

        // Append image and message div to newComment
        newComment.appendChild(img);
        newComment.appendChild(messageDiv);

        // Append the new comment to the comments section
        document.getElementById('comments-section').appendChild(newComment);

        // Clear the message input
        messageInput.value = '';
    } else {
        alert("Please enter a message before sending.");
    }
}
