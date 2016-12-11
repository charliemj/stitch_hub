var getNumberOfLikes = function (chartID) {

  var result;
  $.ajax({
    url: '/like/likes/',
    method: 'GET',
    async: false,
    data: {
      chartId: chartID
    },
    success: function (number) {
      result = number.message;
    },
    error: function (error) {
      console.log('Error counting likes');
      console.log(error);
    }

  });//end ajax
  return result;
};

var getCurrentUserLike = function (chartId, callback) {
  $.ajax({
    url: '/like',
    data: {
      chartId: chartId
    },
    method: 'GET',
    success: function (data) {
      callback(null, data);
    },
    error: function (err) {
      callback(err, null);
    }
  });
};

var likeChart = function (chartID) {
  $.ajax({
    url: '/like',
    method: 'POST',
    data: {
      chartID: chartID
    },
    success: function () {
      window.location.reload();
    },
    error: function (error) {
      console.log('Error liking it');
      console.log(error);
    }
  });//end ajax
};

var unlikeChart = function (chartId) {
  $.ajax({
    url: '/like',
    data: {
      chartId: chartId
    },
    method: 'DELETE',
    success: function () {
      window.location.reload();
    },
    error: function (error) {
      console.log('Error unliking it');
      console.log(error);
    }
  });//end ajax
};

var getLikedCharts = function () {
  var result;
  $.ajax({
    url: '/like/likedcharts/',
    method: 'GET',
    async: false,
    data: {}
    ,
    success: function (likedCharts) {
      result = likedCharts.message;
    }
    ,
    error: function (error) {
      console.log('Error getting liked charts');
      console.log(error);
    }

  })
  ;//end ajax
  return result;
};
