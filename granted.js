var hsv2rgb = function(h, s, v, a) {
  // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return 'rgba(' + rgb.map(function(x){
    return Math.round(x*255);
  }).join(', ')+ ', '+a+')';
};


getRGBColor =  function(val, a) {

    val = parseInt(val);
    if (val > 100) {
        val = 100;
    }
    else if (val < 0) {
        val = 0;
    }

    var h = Math.floor((val) * 120 / 100);
    var s = Math.abs(val - 50)/50;
    var v = 1;

    return hsv2rgb(h, s, 1, a)
};

$(function(){
    //remove STREAM NOW link
    // if (window.location.pathname.search(/internet.*season.*html/) != -1)
    if (window.location.host.search('free-tv-video-online.me') != -1)
    {
        console.log("PFTV Running");
        cells = $("tr:has(> .mnllinklist[id^=t])");
        cells.find("a.down").remove();

        cell = $(cells[0]);

        $.each(cells, function(i, el) {
            el = $(el);
            text_block = $(el.find('span')[0]);

            //replace empty link with real link
            text_block.html(text_block.html().replace(/Host:\W*(.*)<br>/, 'Host: <a href="http://$1" title="$1">$1</a><br>'));
            //add the favicon
            $("a[href^='http']", text_block).each(function() {
                $(this).css({
                    background: "url(http://g.etfv.co/" + this.href + ") left center no-repeat",
                        "padding-left" : "20px",
                        "background-size" : "16px"
                });
            });


            //get rating
            rating = el.find("td.report").text().replace(/^.*(\d*)%.*/, '$1').trim();

            el.css("background-color", getRGBColor(rating, 0.2));

        });
    };

});
