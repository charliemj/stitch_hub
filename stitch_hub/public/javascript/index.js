/**
* Handles the logic for the charts news feed. This includes handling the templating
* so that charts will be loaded onto the page. It also provides logic to the remix
* button of each chart.
*/
$(document).ready(function() {
  // LOAD TEMPLATES
  loadLoginTemplate();
  loadSignupTemplate();

  loadNavBarTemplate();

  $.ajax({
    url: '/charts',
    method: 'GET',
    success: function(charts) {
      // loads the chart feed into #charts-container div and sets all controllers
      // for the chart feed
      loadChartFeedTemplate(charts);
    },
    error: function(error) {
      console.log('Error fetching charts');
      console.log(error);
    }
  });

  $('#search-all-checkbox').prop('checked', false);
  $('#search-all-checkbox').change(function() {
    // hide and unhide
    $('#search-bar').toggle();
    $('#property-select').toggle();
  });

  $('#search-button').on('click', function() {
    var data = {};
    // there are only parameters if we are not searching for all charts
    if (!($('#search-all-checkbox').is(':checked'))) {
      var query = $('#search-bar').val();
      
      // validate the search query by confirming that it either
      // has whitespace or alphanumerics only
      var validateRegex = /[^A-Za-z0-9\s]/;
      if (validateRegex.test(query)) {
        alert('The query can only contain whitespace or alphanumerics');
        return;
      }

      var searchFor = $('#property-select').val();
      if (searchFor.length == 0) {
        alert('You must pick at least one property to search for');
        return;
      }
      var tokens = query.trim().split(/\s+/); // split by whitespace
      data = {
        searchFor: JSON.stringify(searchFor),
        tokens: JSON.stringify(tokens),
      };
    }
    var filterTypeOn = $('#type-filter-select').val();
    var filterSizeOn = $('#size-filter-select').val();
    data.filterTypeOn = JSON.stringify(filterTypeOn);
    data.filterSizeOn = JSON.stringify(filterSizeOn);

    // complete ajax query with the given data
    $.ajax({
      url: '/charts',
      data: data,
      method: 'GET',
      success: function(charts) {
        loadChartFeedTemplate(charts);
      },
      error: function(error) {
        console.log('Error fetching charts');
        console.log(error);
      }
    });
  });

  // NON-TEMPLATE CONTROLLERS
  $('#make-chart-button').on('click', function() {
    window.location = "chart_form.html";
  });
});