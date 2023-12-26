const projects = [
  {
    projectName: "Weather Clothes",
    image: "WeatherClothes.jpg",
    demoLink: "projects/WeatherClothes/index.html",
    downloadLink: "downloads/WeatherClothes.zip",
    techIcons: [
      "html.png",
      "js.png",
      "css.png",
      "sass.png",
      "oop.png",
      "api.png",
    ],
  },
  {
    projectName: "Countries",
    image: "countries.png",
    demoLink: "projects/CountriesAPI/index.html",
    downloadLink: "downloads/CountriesAPI.zip",
    techIcons: ["html.png", "js.png", "css.png", "api.png"],
  },
  {
    projectName: "Pokedex",
    image: "pokedex.png",
    demoLink: "projects/PokeDex/index.html",
    downloadLink: "downloads/PokeDex.zip",
    techIcons: ["html.png", "js.png", "css.png", "api.png"],
  },
  {
    projectName: "TicTacToe",
    image: "TicTacToe.png",
    demoLink: "projects/TicTacToe/index.html",
    downloadLink: "downloads/TicTacToe.zip",
    techIcons: ["html.png", "js.png", "css.png"],
  },
  {
    projectName: "Connect4",
    image: "Connect4.png",
    demoLink: "projects/Connect4/index.html",
    downloadLink: "downloads/Connect4.zip",
    techIcons: ["html.png", "js.png", "css.png"],
  },
  {
    projectName: "Memmory Game",
    image: "MemmoryGame.png",
    demoLink: "projects/MemmoryGame/index.html",
    downloadLink: "downloads/MemmoryGame.zip",
    techIcons: ["html.png", "js.png", "css.png", "api.png"],
  },

  {
    projectName: "landing Page 1",
    image: "landingPage1.jpg",
    demoLink: "projects/ProjectName1/index.html",
    downloadLink: "downloads/ProjectName1.zip",
    techIcons: [
      "html.png",
      "js.png",
      "css.png",
      "sass.png",
      "oop.png",
      "api.png",
    ],
  },
  {
    projectName: "landing Page 2",
    image: "landingPage2.jpg",
    demoLink: "projects/ProjectName2/index.html",
    downloadLink: "downloads/ProjectName2.zip",
    techIcons: ["html.png", "js.png", "css.png", "sass.png"],
  },
  {
    projectName: "landing Page 3",
    image: "landingPage3.jpg",
    demoLink: "projects/ProjectName3/index.html",
    downloadLink: "downloads/ProjectName3.zip",
    techIcons: ["html.png", "js.png", "css.png", "sass.png"],
  },
  {
    projectName: "landing Page 4",
    image: "landingPage4.png",
    demoLink: "projects/ProjectName4/index.html",
    downloadLink: "downloads/ProjectName4.zip",
    techIcons: ["html.png", "js.png", "css.png", "sass.png"],
  },
  {
    projectName: "landing Page 5",
    image: "landingPage5.png",
    demoLink: "projects/ProjectName5/index.html",
    downloadLink: "downloads/ProjectName5.zip",
    techIcons: ["html.png", "js.png", "css.png", "sass.png"],
  },
  {
    projectName: "landing Page 6",
    image: "landingPage6.png",
    demoLink: "projects/ProjectName6/index.html",
    downloadLink: "downloads/ProjectName6.zip",
    techIcons: ["html.png", "js.png", "css.png", "sass.png"],
  },
  // Add more projects as needed
];

let currentProjectIndex = 0;
const projectInfo = document.getElementById("project-info");
const iconCarousel = document.getElementById("icon-carousel");
const projectImage = document.getElementById("project-image");
const demoLink = document.getElementById("demo-link");
const downloadButton = document.getElementById("download-button");
const projectTitle = document.getElementById("project-title");

// Function to get the projectName from the URL
function getProjectNameFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("projectName");
}

// Function to find a project by projectName
function findProjectByProjectName(projectName) {
  console.log("Searching for project with projectName:", projectName);
  const foundProject = projects.find(
    (project) => project.projectName === projectName
  );
  console.log("Found project:", foundProject);
  return foundProject;
}

// Function to update various aspects of the project
function updateProject() {
  const project = projects[currentProjectIndex];

  // Update the project title based on the project name
  projectTitle.innerText = project.projectName;

  // Update the project description (replace 'project-description' with the actual ID)
  const projectDescription = document.getElementById("project-description");
  projectDescription.innerText = "Your updated project description goes here.";

  // Update the demo link
  const demoLink = document.getElementById("demo-link");
  demoLink.href = project.demoLink;

  // Update the download button link
  const downloadButton = document.getElementById("download-button");
  downloadButton.href = project.downloadLink;

  // Update the tech icons in the carousel
  const iconCarousel = document.getElementById("icon-carousel");
  updateTechIcons(project.techIcons, iconCarousel);

  // Ensure that the project image is updated
  projectImage.src = "./images/Projects/" + project.image;
}

function updateTechIcons(techIcons, iconCarousel) {
  // Clear existing icons
  iconCarousel.innerHTML = "";

  // Create and append new icon elements
  techIcons.forEach((icon) => {
    const iconElement = document.createElement("img");
    iconElement.src = `./Images/techIcons/${icon}`;
    iconElement.alt = `${icon} icon`;
    iconElement.classList.add("icon", "tech-icon"); // Add 'tech-icon' class
    iconCarousel.appendChild(iconElement);
  });
}

// Function to update the project based on projectName
function updateProjectByProjectName() {
  const projectName = getProjectNameFromUrl();
  const project = findProjectByProjectName(projectName);

  if (project) {
    currentProjectIndex = projects.indexOf(project);
    updateProject();
    // Add more code to update other elements as needed.
  } else {
    console.error("Project not found for the given projectName.");
  }
}

// Initial update based on the URL
updateProjectByProjectName();

// Show project info and image with animations
setTimeout(() => {
  projectInfo.classList.add("show-info");
  iconCarousel.classList.add("show-carousel");
  projectImage.classList.add("show-image");
}, 500); // Delay the animation for better visibility

// Example: Switching projects on button click
downloadButton.addEventListener("click", () => {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;

  // Hide info and image
  projectInfo.classList.remove("show-info");
  iconCarousel.classList.remove("show-carousel");
  projectImage.classList.remove("show-image");

  // Update the URL with the new projectName
  const newProjectName = projects[currentProjectIndex].projectName;
  history.pushState(null, null, `?projectName=${newProjectName}`);

  // Update the project based on the new projectName
  updateProjectByProjectName();
});
