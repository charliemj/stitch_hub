$(document).ready(function () {
  loadNavBarTemplate();
  var userProfileId = window.sessionStorage.getItem('userProfileId');

  $.ajax({
    url: '/users/' + userProfileId,
    method: 'GET',
    success: function (data) {
      // load the user header template
      loadUserProfileHeaderTemplate(data.user);
      loadFollowingTemplate(data.user);
    },
    error: function (err) {
      console.log(err);
    },
  });

  // load chart feed template
  $.ajax({
    url: '/charts/user/' + userProfileId,
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

  $('#following-charts-button').on('click', function () {
    $.ajax({
      url: '/users/following/charts',
      method: 'GET',
      success: function(charts) {
        loadChartFeedTemplate(charts);
      },
      error: function(err) {
        console.log('Error fetching charts of those you follow');
        console.log(err);
      }
    });
  })

});