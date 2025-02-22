document.addEventListener("DOMContentLoaded", () => {
  chooseTopcoat(); // Load topcoat on page load

  // Add event listener for window resize
  window.addEventListener("resize", () => {
    chooseTopcoat();
  });
});

// Function to load the appropriate stylesheet based on window width and theme group
function chooseTopcoat() {
  const topcoat = document.getElementById("topcoat");
  // Function to load the appropriate stylesheet
  const donTopcoat = (stylesheet) => {
    topcoat.setAttribute("href", stylesheet);
  };

  // Read theme attributes from the body
  const html = document.getElementsByTagName("html");
  const theme = html.dataset || "dark";

  const isDesktop = () => window.innerWidth >= 768;
  const isDark = theme === "dark";

  const getPlatform = () => (isDesktop() ? "desktop" : "mobile");
  const getMode = () => (isDark ? "dark" : "light");

  const path = `https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/css/topcoat-`;
  // Construct the filename based on the attributes
  const filename = path + getPlatform() + '-' + getMode() + '.min.css';

  // Load the stylesheet
  donTopcoat(filename);
}