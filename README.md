# Kilimani POA App

The **Kilimani POA App** is a community engagement platform designed to enable residents of Kilimani to propose and vote on various community projects. The app empowers users to contribute to the development of their community by submitting proposals, voting on initiatives, and engaging in meaningful discussions.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [File Structure](#file-structure)
6. [Detailed Explanation of Key Components](#detailed-explanation-of-key-components)
7. [Future Enhancements](#future-enhancements)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

## Collaborators
Janice M.
Prisha P.
Judith K.
Veronice N.
## Features

### 1. **Proposal Submission**
   - Users can upload an image related to their community proposal.
   - A unique ID is generated for each proposal.
   - Users can enter the title and description of their proposal.
   - Submissions include a timestamp and are saved for future voting.

### 2. **Voting System**
   - Users can vote on submitted proposals by clicking on the voting options.
   - The voting results are updated in real-time and displayed to all users.
   - Users can like and comment on proposals to engage in discussions.

### 3. **Commenting and Liking**
   - Users can add comments to proposals to share their opinions and feedback.
   - The like button allows users to show support for a proposal.
   - User profiles are displayed with each comment for better community engagement.

### 4. **Responsive Design**
   - The app is designed to be responsive and works seamlessly on both desktop and mobile devices.

## Technologies Used

- **HTML5**: Structure of the web pages.
- **CSS3**: Styling the application with Flexbox and responsive design techniques.
- **JavaScript (ES6)**: Client-side scripting for dynamic content and interactivity.
- **Font Awesome**: Icons used throughout the application.
- **LocalStorage**: Used to temporarily store and retrieve user-submitted data like images and text.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/kilimani-poa-app.git
   ```
   
2. **Navigate to the project directory:**
   ```bash
   cd kilimani-poa-app
   ```

3. **Open `index.html` in your browser:**
   You can either double-click on `index.html` or use a live server (like the one provided by VSCode) to view the project in your browser.

## Usage

### 1. **Submitting a Proposal:**
   - Navigate to the "Upload" page.
   - Upload an image representing your proposal.
   - Enter the proposal details.
   - Click on "Submit" to send the proposal for validation.

### 2. **Voting on a Proposal:**
   - After submission, you will be redirected to the voting page.
   - You can vote by clicking on the voting options (e.g., "Plant Trees" or "No Trees Needed").
   - The vote counts are updated in real-time.

### 3. **Commenting and Liking:**
   - Scroll down to the comments section.
   - Type your message in the input box and click the send button.
   - Click the heart icon to like the proposal.


## Detailed Explanation of Key Components

### 1. **Upload Page (`upload.html`):**
   - **Image Upload Preview**: Users can preview the image they upload before submitting their proposal. This enhances the user experience by allowing users to confirm their selection.
   - **Dynamic ID Generation**: Each proposal is assigned a unique ID, which is used for tracking and validation purposes.
   - **Form Validation**: The submit button is disabled until a valid image is uploaded, ensuring that users provide the necessary information.

### 2. **Voting Page (`voting.html`):**
   - **Real-Time Voting**: Votes are counted in real-time as users click on the voting options. The results are displayed immediately.
   - **Comment Section**: Users can leave comments, which are dynamically added to the page without requiring a refresh. This allows for ongoing discussions around each proposal.
   - **Interactive Elements**: Both the voting and like buttons are designed to be intuitive and responsive, ensuring users can interact with the proposals easily.

### 3. **JavaScript Files (`js/`):**
   - **`upload.js`**: Handles image uploads, previews, and form submission. Manages data storage using LocalStorage.
   - **`voting.js`**: Manages vote counting, comment submission, and user interactions within the voting page. The script ensures that all actions are reflected in the UI without requiring a page reload.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request to contribute. You can also open issues for any bugs or feature requests.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch-name`).
6. Open a pull request.


