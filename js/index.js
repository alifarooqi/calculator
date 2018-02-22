$(document).ready(function() {
  var mainScr = "0";
  var secScr = "";
  var nextSym = "";
  function updateMainScr(n) {
    if (n>0 && mainScr == "0"){
      mainScr = n;
    }
    else if ((n>=0 && mainScr != "0") || n==".") {
      mainScr += n;
    }
    else if (n="Empty") {
      mainScr = "0";
    }
    $("#mainScr").html(mainScr);
    var elmnt = document.getElementById("mainScr");
    var x = elmnt.scrollWidth;
    if (x>334){
      $("#mainScr").scrollLeft(x-333);
    }
  }
  
  function updateSecScr(s) {
    secScr += nextSym + mainScr;
    $("#secScr").html(secScr);
    nextSym = s;
    var elmnt = document.getElementById("secScr");
    var x = elmnt.scrollWidth;
    if (x>334){
      $("#secScr").scrollLeft(x-333);
    }
  }
  
  $("button").click(function(){
    var value = $(this).val();
    if(/\d|[.]/.test(value)) {
      updateMainScr(value);
    }
    else if (/[+*/]|-/.test(value)){
      if (mainScr != 0){
        updateSecScr(value);
        updateMainScr("Empty");
        $("#mainScr").html(value);
      }
      else if (secScr != "") {
        nextSym = value;
        $("#mainScr").html(value);
      }
    }
    else if (value == "AC") {
      updateMainScr("Empty");
      secScr = "";
      nextSym = "";
      $("#secScr").html(secScr);
    }
    else if (value == "CL" && mainScr!="0") {
      if (mainScr.length>1) {
        mainScr = mainScr.substr(0,mainScr.length-1);
        $("#mainScr").html(mainScr);
      }
      else if (nextSym == "") {
        mainScr = "0";
        $("#mainScr").html(mainScr);
      }
      else {
        mainScr = nextSym;
        $("#mainScr").html(mainScr);
        mainScr = "0";
      }
    }
    else if (value == "=") {
      if (mainScr == "0" && secScr == ""){
        $("#mainScr").html("Seriously?");
        $("#secScr").html("Give me something to calculate!");
      }
      else {
        secScr += nextSym + mainScr;
        var ans = math.eval(secScr);
        mainScr = ans;
        secScr += "=" + ans;
        $("#mainScr").html(mainScr);
        $("#secScr").html(secScr);
        secScr = "";
        nextSym = "";
      }
      var x = elmnt.scrollWidth;
      if (x>334){
        $("#mainScr").scrollLeft(x-333);
      }
    }
});
  
  document.onkeypress = function(e){
    var key = e.keyCode;
    var value = "none";
    var number = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    if (key>=48 && key<=57){
      value = number[key-48];
    }
    else if (key == 43){
      value = "plus";
    }
    else if (key == 45){
      value = "minus";
    }
    else if (key == 42){
      value = "multiply";
    }
    else if (key == 47){
      value = "divide";
    }
    else if (key == 46){
      value = "dot";
    }
    else if (key == 13){
      value = "equals";
    }
    if (value != "none"){
      $("#"+value).click();
    }
  }
});