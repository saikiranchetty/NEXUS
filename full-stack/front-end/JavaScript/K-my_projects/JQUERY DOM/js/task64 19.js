$(document).ready(function () {
  $("#show").click(function () {
    $("p").show(); //$(selector).action()
  });
});
$(document).ready(function () {
  $("#hide").click(function () {
    $("p").hide(); //$(selector).action()
  });
});
$(document).ready(function () {
  $("#toggle").click(function () {
    $("p").toggle(); //$(selector).action()
  });
});
$(document).ready(function () {
  $("#fadein").click(function () {
    $("#b1").fadeIn(); //$(selector).action()
    $("#b2").fadeIn("slow"); //$(selector).action()
    $("#b3").fadeIn(4000); //$(selector).action()
  });
});
$(document).ready(function () {
  $("#fadeout").click(function () {
    $("#b1").fadeOut(); //$(selector).action()
    $("#b2").fadeOut("slow"); //$(selector).action()
    $("#b3").fadeOut(4000); //$(selector).action()
    $("#d1").fadeOut(); //$(selector).action()
    $("#d2").fadeOut("slow"); //$(selector).action()
    $("#d3").fadeOut(4000); //$(selector).action()
  });
});
$(document).ready(function () {
  $("#fadeto").click(function () {
    $("#d1").fadeTo("slow", 0.16); //$(selector).action()
    $("#d2").fadeTo("slow", 0.8); //$(selector).action()
    $("#d3").fadeTo("slow", 0.3); //$(selector).action()
  });
});
$(document).ready(function () {
  $("#slide2").click(function () {
    $("#content").slideDown();
  });
});
$(document).ready(function () {
  $("#slide3").click(function () {
    $("#content").slideUp();
  });
});
$(document).ready(function () {
  $("#slide4").click(function () {
    $("#content").slideToggle();
  });
});
$(document).ready(function () {
  $("#ani").click(function () {
    $("#animation").animate(
      { right: "100px", opacity: "0.5", width: "200px", height: "200px" },
      "slow"
    );
  });
});
$(document).ready(function () {
  $("#slide5").click(function () {
    $("#animation").slideToggle(2000);
  });
});
$(document).ready(function () {
  $("#slide6").click(function () {
    $("#animation").stop();
  });
});
$(document).ready(function () {
  $("#to2").click(function () {
    $("#a1").hide(function () {
      alert("The Paragraph successfully deleted!");
    });
  });
});
$(document).ready(function () {
  $("#to1").click(function () {
    $("#a1").show(function () {
      alert("The Paragraph successfully created!");
    });
  });
});
