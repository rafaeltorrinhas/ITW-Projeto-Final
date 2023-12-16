$(document).ready(function () {
  // Function to toggle dark mode
  function toggleDarkMode() {
      $("body").toggleClass("bg-dark");
      $("nav").toggleClass("navbar-dark bg-dark");
      $(".custom-control-label").toggleClass("text-white");
      $("h1, h5").toggleClass("text-white");
      $("#lightIcon, #darkIcon").toggle();
      $("button").toggleClass("border-light");
      $("button").toggleClass("bg-dark");
      $("button").toggleClass("text-light");

      // Additional elements to include in dark mode toggle
      $("table").toggleClass("table-dark"); // Apply dark mode to tables
      $(".btn").toggleClass("btn-dark");
      $(".table thead").toggleClass("table-dark"); // Apply dark mode to table headers

      
      // Toggle data-bs-theme attribute for Bootstrap components
      $("[data-bs-theme]").each(function () {
        $(this).attr("data-bs-theme", $(this).attr("data-bs-theme") === "dark" ? "light" : "dark");
      });

  }
  toggleDarkMode();
  $("#selector").change(function () {
      toggleDarkMode();
  });
});