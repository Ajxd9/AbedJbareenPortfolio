const textLines = [
  "I am an enthusiastic web developer with a keen eye for design and a passion for coding.",
  "Profession: FullStack Web Developer.",
  "Email: abed.jbareen999@gmail.com",
  "PhoneNumber: 0549717209.",
  "Knowledge:",
  "  WebDevelopment: HTML5, CSS, SASS, BootStrap, JavaScript, TypeScript, React, NodeJs, SQL, MonogoDB, WordPress.",
  "  Programming: C, C#, JAVA.",
];

const typingContainer = document.getElementById("typing-container");

function typeText(index) {
  if (index < textLines.length) {
    typingContainer.innerHTML += `<p>${textLines[index]}</p>`;
    setTimeout(() => typeText(index + 1), 1000); // Adjust the timeout as needed
  }
}

// Start typing
typeText(0);
