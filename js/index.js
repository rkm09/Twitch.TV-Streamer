var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "beohoff"];
var url = " https://wind-bow.gomix.me/twitch-api/";
var str = "streams";
var info = "channels";

var getChannelInfo = function getChannelInfo() {
  users.forEach(function (user) {
    $.getJSON(url + "/" + info + "/" + user + "/?callback=?", function (data) {
      var html = "";
      var stat = "";
      var current = "";
      html += "<div class='streams' data-sr-filter data-sr-filter-name='" + data.name + "'><a id='names' target='_blank' href='" + data.url + "'>";
      html += "<div class='streams-inner'><div><img  class='logo' alt='logo' src='" + data.logo + "'></div>";
      html += "<div><p><span id='ch-name'>" + data.name + "</span><br><span id='des'>" + data.status + "</span></p></div>";
      $.getJSON(url + "/" + str + "/" + user + "/?callback=?", function (data) {
        stat = data.stream;
        if (stat === null || stat === undefined) {
          current = "Offline";
          html += "<div class='curr-stat-red' id='red'></div></div></a></div>";
        } else {
          current = "Online";
          html += "<div class='curr-stat-green' id='green'></div></div></a></div>";
        }
        //       $('.streamers').append(html);
        $(html).hide().appendTo(".streamers").fadeIn(300);
        $(".loader").hide(300);
      });
    });
  });
};

$(document).ready(function () {
  /** Get info  & set filter attr*/
  getChannelInfo();
  $('.selector').click(function () {
    var type = $(this).attr('id');
    if (type === "on") {
      $('.streams #red').parent().parent().parent().hide();
      $('.streams #green').parent().parent().parent().show();
      $('.streams #green').parent().parent().parent().css("background-color", "rgba(124, 252, 0,0.2)");
      $('.streams #red').parent().parent().parent().css("background-color", "rgba(255, 0, 0,0.2)");
    } else if (type === "off") {
      $('.streams #green').parent().parent().parent().hide();
      $('.streams #red').parent().parent().parent().show();
    } else {
      $('.streams #red').parent().parent().parent().css("background-color", "rgba(255, 255, 255,0.5)").show();
      $('.streams #green').parent().parent().parent().css("background-color", "rgba(255, 255, 255,0.5)").show();
    }
  });
  /***Search bar**/
  $('#sr').on("keyup", function () {
    var srval = $(this).val().toLowerCase();
    var filter = $('.streams');
    if (srval != "") {
      filter.hide();
      $("[data-sr-filter-name*=\"" + srval + "\"]").show();
    } else filter.show();
  });
});