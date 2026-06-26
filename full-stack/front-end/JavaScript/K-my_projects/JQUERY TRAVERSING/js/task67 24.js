$(document).ready(function () {
  $("span").parent().css({ color: "orange" });
});
$(document).ready(function () {
  $("span").parents().css({ color: "blue" });
});
$(document).ready(function () {
  $("span").parentsUntil(".an").css({ color: "red" });
});
$(document).ready(function () {
  $("ol").children().css({ color: "yellow" });
});
$(document).ready(function () {
  $("h4").next().css({ color: "yellow" });
});
$(document).ready(function () {
  $("h4").nextAll().css({ color: "gray" });
});
$(document).ready(function () {
  $("h4").prev().css({ color: "white" });
});
$(document).ready(function () {
  $("h4").prevAll().css({ color: "brown" });
});
$(document).ready(function () {
  $("h4").prevUntil("h1").css({ color: "firebrick" });
});
