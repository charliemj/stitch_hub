var getAge = function(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var goToChartPage = function(jsonChart) {
  var userDobString = window.sessionStorage.getItem('userDob');
  var userAge = 0;
  if (userDobString == 'null') {
    var userDob = Date.parse(userDobString);
    userAge = getAge(userDob);
  }
  if (jsonChart.nsfw) {
    if (userAge < 18) {
      alert('This chart is not inappropriate for you to see!');
      return;
    }
  }
  window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
  window.location = 'chart_page.html';
}