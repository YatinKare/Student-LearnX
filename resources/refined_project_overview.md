# LearnX

## Project Overview
-   **Name**: LearnX
-   **Author**: Yatin Kare
-   **User Domain**: High School and University Students

### Project Goal
To develop an intuitive web application that transforms standard PowerPoint presentations and accompanying lecture audio into interactive study materials, thereby promoting deeper comprehension and more effective learning for students.

### Project Description
LearnX will be a Software-as-a-Service (SaaS) web application designed to enhance the learning experience. Students will be able to upload their PowerPoint files and the corresponding lecture audio recordings. The system will then process these inputs to create an interactive version of the presentation.

The core interactive capabilities are:
1.  **Contextual Information Retrieval**: When a user interacts with (e.g., clicks on) a specific element within a PowerPoint slide—such as a bullet point, text block, image, or diagram—the application will display a transcription of the lecture audio that directly pertains to that selected element.
2.  **Synchronized Audio Playback**: Alongside the displayed transcription, users will have the option to play the precise segment of the audio recording that correlates with the selected element and the presented text. This allows for auditory reinforcement and clarification, especially if the transcription contains ambiguities.

### Background
Static PowerPoint slides often lack the nuanced explanations and context provided by an instructor during a live lecture. This can result in a disconnect between the study materials and the actual instruction, leading to student confusion, misinterpretation of content, or inefficient study habits. Students may find it challenging to recall or pinpoint the instructor's specific comments related to a particular part of a slide, especially for complex topics or visuals.

This problem is particularly acute in subjects that involve subjective interpretation, such as fine arts, literature, or humanities, where understanding the instructor's unique perspective and detailed explanations is paramount. LearnX aims to bridge this informational gap by directly linking visual slide content with the instructor's spoken words, creating a more cohesive, reliable, and rich study resource.

## Functional Requirements

### Key Features

1.  **Secure User Authentication and Management:**
    * **Simple Login/Registration:** A straightforward and secure system for users to create accounts and log in.
    * **User Dashboard:** A dedicated area where users can view and manage their uploaded presentations (e.g., a list of previously processed interactive PowerPoints).

2.  **File Upload and Processing:**
    * **PowerPoint Upload:** Users can upload presentation files (e.g., .pptx, .ppt).
    * **Audio Upload:** Users can upload corresponding lecture audio files (e.g., .mp3, .wav, .m4a).
    * The system should allow for an intuitive upload process, potentially via drag-and-drop.

3.  **Audio Transcription Service:**
    * The application will accurately transcribe the uploaded lecture audio into text.

4.  **Interactive Presentation Interface:**
    * **Main Presentation View:** Displays the current PowerPoint slide.
    * **Element Interactivity:** Users can click on designated elements within the slide (text, bullet points, images, etc.).
    * **Contextual Pop-up Display:** Upon clicking an interactive element:
        * A pop-up window will appear, overlaying the main presentation.
        * **Transcription Snippet:** This window will show a multi-line text area displaying the transcribed audio relevant to the clicked element (e.g., 3-6 sentences, with potential for users to adjust the displayed length).
        * **Audio Playback Control:** An audio player within the pop-up will allow users to play the specific audio segment corresponding to the transcription.
        * **Visual Focus:** The main presentation area will become more opaque or dimmed when the pop-up is active, ensuring the user's focus is on the contextual information.
    * **Slide Deck Navigation:**
        * A visual representation of the slide deck (e.g., thumbnails of slides) will be present at the bottom of the screen.
        * Users can click on slide thumbnails to navigate directly to other slides.
        * Arrows or similar controls will allow users to scroll through the slide deck if it contains more slides than can be displayed at once.

5.  **Secure Payment System (If applicable for SaaS model):**
    * A simple and encrypted method for handling payments for subscriptions or premium features.
