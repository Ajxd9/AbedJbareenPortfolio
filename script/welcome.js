const originalText = "I am a FullStack-Devoloper.";
const words = originalText.split(/\s+/); // Split the original text into words
let currentIndex = 0;

function switchWords() {
  const textContainer = document.getElementById("text-container");

  if (currentIndex < words.length) {
    // Shuffle the words using Fisher-Yates algorithm
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }

    textContainer.textContent = words.join(" ");
    currentIndex++;
    setTimeout(switchWords, 1000); // Adjust switching speed (milliseconds)
  } else {
    currentIndex = 0;
    setTimeout(switchWords, 1000); // Wait for 1 second before switching again
  }
}

// Start the word switching simulation
switchWords();
