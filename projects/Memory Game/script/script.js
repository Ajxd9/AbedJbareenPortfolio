document.addEventListener("DOMContentLoaded", () => {
  const emojiCardsContainer = document.getElementById("emojiCards");

  // Replace "YOUR_API_KEY" with the actual API key
  const apiKey = "58a4c005d091dea66b9066a689328bd040db7f32";

  // Fetch data from Emoji API for 12 unique emojis
  fetch(`https://emoji-api.com/emojis?access_key=${apiKey}&category=people`)
    .then((response) => response.json())
    .then((data) => {
      const emojiList = data.map((emojiData) => emojiData.character);

      // Duplicate the array to show each emoji twice
      const duplicatedEmojiList = [...emojiList, ...emojiList];

      // Create and append cards to the container
      duplicatedEmojiList.slice(0, 24).forEach((emoji) => {
        const card = createCard(emoji);
        emojiCardsContainer.appendChild(card);
      });
    })
    .catch((error) =>
      console.error("Error fetching data from Emoji API:", error)
    );

  // Function to create a card
  function createCard(emoji) {
    const card = document.createElement("div");
    card.classList.add("card");

    const emojiElement = document.createElement("span");
    emojiElement.innerHTML = emoji;
    emojiElement.classList.add("emoji");

    card.appendChild(emojiElement);

    return card;
  }
});
