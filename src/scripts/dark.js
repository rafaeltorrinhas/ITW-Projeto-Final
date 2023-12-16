$(document).ready(function () {
  // Function to toggle dark mode
  function toggleDarkMode() {
      $("body").toggleClass("bg-dark");
      $("nav").toggleClass("navbar-dark bg-dark");
      $(".custom-control-label").toggleClass("text-white");
      $("h1, h5").toggleClass("text-white");
      $("#lightIcon, #darkIcon").toggle();

      // Additional elements to include in dark mode toggle
      $("table").toggleClass("table-dark"); // Apply dark mode to tables
      $(".btn").toggleClass("btn-dark");     // Apply dark mode to buttons
      $(".table thead").toggleClass("table-dark"); // Apply dark mode to table headers
  }
  toggleDarkMode();
  $("#selector").change(function () {
      toggleDarkMode();
  });
});


