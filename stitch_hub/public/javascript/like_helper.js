var getNumberOfLikes = function (chartID) {

  var result;
  $.ajax({
    url: '/like/chart/' + chartID + '/count',
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


//returns true if a user has liked a chart, false if not
var getCurrentUserLike = function (chartId, userId, callback) {
  $.ajax({
    url: '/like/chart/' + chartId + '/user/' + userId,
    method: 'GET',
    success: function (data) {
      var result = false;
      if (data.message != null){
        result = true;
      }

      
      callback(null, result);
    },
    error: function (err) {
      callback(err, null);
    }
  });
};

var likeChart = function (chartId) {
  $.ajax({
    url: '/like',
    method: 'POST',
    data: {
      chartID: chartId
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
  var usedId = window.sessionStorage.getItem('sessionUserId');
  var result;
  $.ajax({
    url: '/like/' + userId + '/likedCharts/',
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
