// ViewModel KnockOut
var vm = function () {
  console.log('ViewModel initiated...');

  //---Variáveis locais
  var self = this;
  self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Arenas');
  self.displayName = 'NBA Arenas List';
  self.error = ko.observable('');
  self.passingMessage = ko.observable('');
  self.records = ko.observableArray([]);
  self.currentPage = ko.observable(1);
  self.pagesize = ko.observable(20);
  self.totalRecords = ko.observable(50);
  self.hasPrevious = ko.observable(false);
  self.hasNext = ko.observable(false);
  self.previousPage = ko.computed(function () {
      return self.currentPage() * 1 - 1;
  }, self);
  self.nextPage = ko.computed(function () {
      return self.currentPage() * 1 + 1;
  }, self);
  self.fromRecord = ko.computed(function () {
      return self.previousPage() * self.pagesize() + 1;
  }, self);
  self.toRecord = ko.computed(function () {
      return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
  }, self);
  self.totalPages = ko.observable(0);
  self.pageArray = function () {
      var list = [];
      var size = Math.min(self.totalPages(), 9);
      var step;
      if (size < 9 || self.currentPage() === 1)
          step = 0;
      else if (self.currentPage() >= self.totalPages() - 4)
          step = self.totalPages() - 9;
      else
          step = Math.max(self.currentPage() - 5, 0);

      for (var i = 1; i <= size; i++)
          list.push(i + step);
      return list;
  };

  self.favoriteArena = function (id) {
      console.log('favourite click!')
      $('#fav_'+id).addClass('text-danger')
      if (JSON.parse(window.localStorage.getItem('favArenas0')) == null) {
          console.log('no favArenas in local storage, lets create it');
          window.localStorage.setItem('favArenas0', '[]');
          var a = JSON.parse(window.localStorage.getItem('favArenas0'));
          for(var i=0;i<self.records().length;i++){
              if(self.records()[i].Id == id){
              b = a.concat(self.records()[i]);
          }}
          window.localStorage.setItem('favArenas0', JSON.stringify(b));
      } else {
          var c = JSON.parse(window.localStorage.getItem('favArenas0'))
          for (var i = 0; i < c.length; i++) {
              if (id == c[i].Id) {
                  c.splice(i, 1); // remove the item at index i
                  window.localStorage.setItem('favArenas0', JSON.stringify(c)); // update the local storage
                  console.log('Arena unfavourited')
                  console.log(JSON.parse(window.localStorage.getItem('favArenas0')))
                  $('#fav_'+id).removeClass('text-danger')
                  return false
              }
          }
          var a = JSON.parse(window.localStorage.getItem('favArenas0'));
          for(var i=0;i<self.records().length;i++){
              if(self.records()[i].Id == id){
              b = a.concat(self.records()[i]);
          }}
          window.localStorage.setItem('favArenas0', JSON.stringify(b));
          console.log('Arena not favourited, added to favourites')
      }
      console.log(JSON.parse(window.localStorage.getItem('favArenas0')))
  }


  //--- New properties and methods for search
  self.searchTerm = ko.observable('');

  self.search = function () {
      // Trim the search term to remove leading and trailing spaces
      var trimmedSearchTerm = self.searchTerm().trim();
  
      // If the search term is empty after trimming, show all arenas and return
      if (!trimmedSearchTerm) {
          self.activate(1);
          return;
      }
  
      console.log('CALL: searchArenas...');
  
      // Construct the search URI with the current search term
      var searchUri = self.baseUri() + '/Search?q=' + encodeURIComponent(trimmedSearchTerm);
  
      // Perform an AJAX call to get search results
      ajaxHelper(searchUri, 'GET').done(function (data) {
          console.log(data);
          hideLoading();
  
          // Update the records with the search results
          self.records(data);
          self.currentPage(1); // Reset current page to 1
          self.totalPages(1); // Reset total pages to 1
          self.totalRecords(data.length);
          self.hasPrevious(false); // Disable previous button for search results
          self.hasNext(false); // Disable next button for search results
      });
  };



  //--- Page Events
  self.activate = function () {
    console.log('CALL: getArenas...');
    var composedUri = self.baseUri();
    ajaxHelper(composedUri, 'GET').done(function (data) {
        //console.log(data);
        console.log(composedUri);
        if (JSON.parse(window.localStorage.getItem('favArenas0')) == null) {
            self.records(null)
        } else {
            console.log('checking which Arenas were favourited')
            var arenasList = [];
            var favArenasList = JSON.parse(window.localStorage.getItem('favArenas0'));
            var a = favArenasList.length;
            console.log(a,favArenasList)
            for (var i = 0; i < a; i++) {
                console.log(favArenasList[i])
                arenasList.push(favArenasList[i])
            }
            self.records(arenasList)
        }
        hideLoading();
        a = JSON.parse(window.localStorage.getItem('favArenas0'));
            for (var i = 0; i < a.length; i++) {
                for(var j=0;j<self.records().length;j++){
                if(a[i].Id==self.records()[j].Id){
                $('#fav_'+a[i].Id).addClass('text-danger')
                };
            }}
    });
    console.log(self.records())
};

      //--- Internal functions
  function ajaxHelper(uri, method, data) {
      self.error(''); // Clear error message
      return $.ajax({
          type: method,
          url: uri,
          dataType: 'json',
          contentType: 'application/json',
          data: data,
          error: function (jqXHR, textStatus, errorThrown) {
              console.log("AJAX Call[" + uri + "] Fail...");
              hideLoading();
              self.error(errorThrown);
          }
      });
  }

  function sleep(milliseconds) {
      const start = Date.now();
      while (Date.now() - start < milliseconds);
  }

  function showLoading() {
      $("#myModal").modal('show', {
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
      console.log("sPageURL=", sPageURL);
      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  };

  //--- start ....
  showLoading();
  var pg = getUrlParameter('page');
  console.log(pg);
  if (pg == undefined)
      self.activate(1);
  else {
      self.activate(pg);
  }
  console.log("VM initialized!");
};

$(document).ready(function () {
  console.log("ready!");

  var viewModel = new vm();
  ko.applyBindings(viewModel);

  // Add event listener for the input event on the search input field
  $('#searchInput').on('input', function () {
      // Trigger the handleSearchInputChange function when the input changes
      viewModel.handleSearchInputChange();
  });

  // Add event listener for the keypress event on the search input field
  $('#searchInput').on('keypress', function (e) {
      // Check if the pressed key is Enter (key code 13)
      if (e.which === 13) {
          // Prevent the default form submission behavior
          e.preventDefault();
          // Trigger the search function when Enter key is pressed
          viewModel.search();
      }
  });
});

$(document).ajaxComplete(function (event, xhr, options) {
  $("#myModal").modal('hide');
})

