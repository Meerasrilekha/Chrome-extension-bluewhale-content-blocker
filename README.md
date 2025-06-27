# Chrome-extension-bluewhale-content-blocker

Introduction

Blue Whale Game is a dangerous online challenge associated with self-harm and harm to others. It involved a series of escalating tasks,and its impact on vulnerable individuals, particularly teenagers. This project focuses on blocking websites related to this game’s content.

 
Project description
 The primary goal of this project is to develop a robust and reliable Chrome extension that actively safeguards children from accessing BlueWhale Game content, thereby minimizing exposure to potentially harmful challenges. Through the implementation of intuitive parental controls, real-time notifications through email.

Methodology
 1. Creating the Chrome extension. It requires a manifest file,
 background.js, and content scripts.js.
 2. Declare Permissions.
 3. Background Script Integration.
 4. Host permissions.

Results and Findings
 1. It blocks the Bluewhale game content.
 2. It sends a real-time notification to the parent.
 3. If a compatible manifest version is not included in the manifest file
 whole process will not work.
 4. When using the latest manifest version use the appropriate
 background.js file because the latest one only supports with background
 service worker file.
 
Lessons learned
 1. Don’t integrate too many functionalities.
 2. Read the official documentation released by Chrome.
 3. Always choose the easiest path to get the expected result.

Conclusion
 A custom solution for parental control and blocking Blue Whale Game
 content, is a significant step towards promoting a safer online
 environment for children. By effectively blocking access to harmful
 challenges associated with the Blue Whale Game, the extension plays a
 crucial role in safeguarding young users from potential risks and
 harmful experiences
