// ViewModel KnockOut
var vm = function () {
  console.log('ViewModel initiated...');
  //---Variáveis locais
  var self = this;
  self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Teams/');
  self.displayName = 'NBA Team Details';
  self.error = ko.observable('');
  self.passingMessage = ko.observable('');
  //--- Data Record
  self.Id = ko.observable('');
  self.Name = ko.observable('');
  self.Acronym = ko.observable('');
  self.ConferenceName = ko.observable('');
  self.DivisionName = ko.observable('');
  self.StateName = ko.observable('');
  self.City = ko.observable('');
  self.Logo = ko.observable('');
  self.History = ko.observable('');
  self.Players = ko.observableArray([]);
  self.Seasons = ko.observableArray([]);
  self.Opened = ko.observable('');

  //--- Page Events
  self.activate = function (id,acronym) {
      console.log('CALL: getTeam...');
      var composedUri = self.baseUri() + id + '?acronym=' + acronym;
      ajaxHelper(composedUri, 'GET').done(function (data) {
          console.log(data);
          hideLoading();
          self.Id(data.Id);
          self.Name(data.Name);
          self.Acronym(data.Acronym);
          self.ConferenceName(data.ConferenceName);
          self.DivisionName(data.DivisionName);
          self.StateName(data.StateName);
          self.City(data.City);
          self.Logo(data.Logo);
          self.History(data.History);
          self.Players(data.Players);
          self.Seasons(data.Seasons);
      });
  };

  //--- Internal functions
  function ajaxHelper(uri, method, data) {
      self.error(''); // Clear error message
      return $.ajax({
          type: method,
          url: uri,
          dataType: 'json',
          contentType: 'application/json',
          data: data ? JSON.stringify(data) : null,
          error: function (jqXHR, textStatus, errorThrown) {
              console.log("AJAX Call[" + uri + "] Fail...");
              hideLoading();
              self.error(errorThrown);
          }
      });
  }

  function showLoading() {
      $('#myModal').modal('show', {
          backdrop: 'static',
          keyboard: false
      });
  }
  function hideLoading() {
      $('#myModal').on('shown.bs.modal', function (e) {
          $("#myModal").modal('hide');
      })
  }

  function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  };

  //--- start ....
  showLoading();
  var pg = getUrlParameter('id');
  var ac = getUrlParameter('acronym');
  console.log(pg);
  if (pg == undefined)
      self.activate(1);
  else {
      self.activate(pg,ac);
  }
  console.log("VM initialized!");
}
$(document).ready(function () {
  console.log("document.ready!");
  ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
  $("#myModal").modal('hide');
})