/* val() html() text() */
$(document).ready(function () {
  $("#b1").click(function () {
    alert("TEXT:" + $("#a1").text());
  });
  $("#b2").click(function () {
    alert("HTML:" + $("#a1").html());
  });
  $("#b3").click(function () {
    alert("VAL:" + $("#a2").val());
  });
  $("#b4").click(function () {
    alert("HREF:" + $("#a3").attr("href"));
  });
});
/* set text */
$(document).ready(function () {
  $("#b5").click(function () {
    $("#a4").text("FRONTEND DEVELOPERS");
  });
  $("#b6").click(function () {
    $("#a5").html("<b>TEKS ACADEMY ASPIRANTS</b>");
  });
  $("#b7").click(function () {
    $("#a6").val("KAPIL GROUP");
  });
  $("#b8").click(function () {
    alert("HREF:" + $("#a7").attr("href"));
  });
});
/* append prepend */
$(document).ready(function () {
  $("#b9").click(function () {
    $("#p1").append("<p>THIS IS APPENDED TEXT 1 !</p>");
  });
  $("#b9").click(function () {
    $("#p2").append("<p>THIS IS APPENDED TEXT 2 !</p>");
  });
  $("#b10").click(function () {
    $("#ol1").append("<li>THIS IS APPENDED LIST !</li>");
  });
  $("#b9").click(function () {
    $("#p1").prepend("<p>THIS IS PREPENDED TEXT 1 !</p>");
  });
  $("#b9").click(function () {
    $("#p2").prepend("<p>THIS IS PREPENDED TEXT 2 !</p>");
  });
  $("#b10").click(function () {
    $("#ol1").prepend("<li>THIS IS PREPENDED LIST !</li>");
  });
});
/* after before */
$(document).ready(function () {
  $("#b11").click(function () {
    $("#p3").after("<p>THIS IS AFTER TEXT 1 !</p>");
  });
  $("#b11").click(function () {
    $("#p4").after("<p>THIS IS AFTER TEXT 2 !</p>");
  });
  $("#b12").click(function () {
    $("#ol2").after("<li>THIS IS AFTER LIST !</li>");
  });
  $("#b11").click(function () {
    $("#p3").before("<p>THIS IS BEFORE TEXT 1 !</p>");
  });
  $("#b11").click(function () {
    $("#p4").before("<p>THIS IS BEFORE TEXT 2 !</p>");
  });
  $("#b12").click(function () {
    $("#ol2").before("<li>THIS IS BEFORE LIST !</li>");
  });
});
/* remove div toogleclass */
$(document).ready(function () {
  $("#b13").click(function () {
    $("#dv").empty();
  });
});
$(document).ready(function () {
  $("#b14").click(function () {
    $("h4,b,p,pre,div").toggleClass("k");
  });
});
$(document).ready(function () {
  var a = "";
  a += "width :" + $("#dv1").width() + "<br>";
  a += "height :" + $("#dv1").height() + "<br>";
  a += "inner width :" + $("#dv1").innerWidth() + "<br>";
  a += "inner height :" + $("#dv1").innerHeight() + "<br>";
  a += "outer width :" + $("#dv1").outerWidth() + "<br>";
  a += "outer height :" + $("#dv1").outerHeight() + "<br>";
  a += "outer width true :" + $("#dv1").outerWidth(true) + "<br>";
  a += "outer height true :" + $("#dv1").outerHeight(true) + "<br>";
  $("#dv1").html(a);
});
