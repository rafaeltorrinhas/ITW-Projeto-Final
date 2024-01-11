$(document).ready(function () {
  function toggleDarkMode() {
      $("body").toggleClass("bg-dark");
      $("nav").toggleClass("navbar-dark bg-dark");
      $(".custom-control-label").toggleClass("text-white");
      $("h1, h5").toggleClass("text-white");
      $("#lightIcon, #darkIcon").toggle();
      $("button").toggleClass("border-light");
      $("button").toggleClass("bg-dark");
      $("button").toggleClass("text-light");
      $("table").toggleClass("table-dark"); 
      $(".btn").toggleClass("btn-dark");
      $(".table thead").toggleClass("table-dark"); 
      $("[data-bs-theme]").each(function () {
        $(this).attr("data-bs-theme", $(this).attr("data-bs-theme") === "dark" ? "light" : "dark");
      });
      $(".img-thumbnail").toggleClass("bg-dark"); 
  }
  toggleDarkMode();
  $("#selector").change(function () {
      toggleDarkMode();
  });
});