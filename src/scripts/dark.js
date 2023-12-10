$(document).ready(function () {
  // Function to toggle dark mode
  function toggleDarkMode() {
    $("body").toggleClass("bg-dark");
    $("nav").toggleClass("navbar-dark bg-dark");
    $(".custom-control-label").toggleClass("text-white");
    $("h1, h5").toggleClass("text-dark");
    $("#lightIcon, #darkIcon").toggle();

    // Additional elements to include in dark mode toggle
    $("table").toggleClass("table-dark"); // Apply dark mode to tables
    $(".btn").toggleClass("btn-dark");     // Apply dark mode to buttons
    $(".table thead").toggleClass("table-dark"); // Apply dark mode to table headers

    // Toggle dark mode for links
    $("a").toggleClass("text-dark"); // Apply dark mode to all links
    // Add more elements as needed
  }

  // Set dark mode by default
  toggleDarkMode();

  // Toggle dark mode on checkbox change
  $("#selector").change(function () {
    toggleDarkMode();
  });
});
