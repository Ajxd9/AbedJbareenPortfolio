function showBlackHole() {
  // Get references to the necessary elements
  var blackHoleContainer = document.getElementById("blackHoleContainer");
  var blackHole = document.getElementById("blackHole");
  var myIframe = document.getElementById("myIframe");

  // Display the black hole container by changing its display property to "flex"
  blackHoleContainer.style.display = "flex";

  // Listen for the "animationend" event on the blackHole element
  blackHole.addEventListener("animationend", function () {
    // Animation is complete, hide the black hole

    // Set blackHole display to "none"
    blackHole.style.display = "none";

    // Show the iframe on the full page
    myIframe.style.width = "100vw"; // Fill the viewport width
    myIframe.style.height = "100vh"; // Fill the viewport height
    myIframe.style.borderRadius = "0";

    // Ensure there's no unwanted spacing
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";

    blackHoleContainer.style.top = "0";
  });
}
