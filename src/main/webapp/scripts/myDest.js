function insertHeader(element) {

	var aboutUsH = $("<li id='aboutH'></li>").append($("<a><span class='glyphicon glyphicon-info-sign text-primary'></span> ABOUT US</a>").attr("href",
			"myDestAboutUs.html"));
	var contactUsH = $("<li id='contactH'></li>").append($("<a><span class='glyphicon glyphicon-envelope text-primary'></span> CONTACT US</a>").attr("href",
			"myDestContactUs.html"));
	var findH = $("<li id='findH'></li>").append($("<a><span class='glyphicon glyphicon-search text-primary'></span> FIND YOUR FROG</a>").attr("href", "myDestRequest.html"));
	var homeH = $("<li id='homeH'></li>").append($("<a><span class='glyphicon glyphicon-home text-primary'></span> HOME</a>").attr("href", "myDestinations.html"));

	var nav = $("<ul></ul>").addClass("nav").addClass("navbar-nav").addClass("navbar-right");

	nav.append(homeH).append(findH).append(aboutUsH).append(contactUsH);
	element.addClass("menu").append($("<div></div>").addClass("container-fluid")
	    .append($("<div></div>").addClass("navbar-header").addClass("destSnow")
	    .append($("<img>").attr("src","img/ffwhite.png"))
	    .append($("<a >Frozen Frog</a>").attr("href", "myDestinations.html"))))
	.append($("<div></div").addClass("destLinks").append(nav));
}

function insertFooter(element) {
	var aboutUs = $("<a><span class='glyphicon glyphicon-info-sign text-primary'></span> About us</a>").attr("href",
			"myDestAboutUs.html");
	var contactUs = $("<a><span class='glyphicon glyphicon-envelope text-primary'></span> Contact</a>").attr("href",
			"myDestContactUs.html");
	var home = $("<a><span class='glyphicon glyphicon-home text-primary'></span> Home</a>").attr("href", "myDestinations.html");
	var find = $("<a><span class='glyphicon glyphicon-search text-primary'></span> Find a frog</a>").attr("href", "myDestRequest.html");
	var companyDetails = $("<address></address>")
			.html(
					$("<strong>Frozen Frog Ltd.</strong><br/><span>ColdHeart 21</span><br/><span> Vostok Station, Antarctica</span><br/><span><span class='glyphicon glyphicon-earphone' aria-hidden='true'></span> +55 53 9964 1863</span>"));

	var contact = $("<div></div>");
	var pages = $("<div></div>").addClass("destBlock");
	var lastDest = $("<div></div>").addClass("destInline");

	contact.append(companyDetails);
	pages.append($("<div></div>").append(home).append(find).append(contactUs).append(aboutUs));
	lastDest.append($("<strong>Our Destinations</strong>"));
	keywordPanel(lastDest,8, "px");
	element.append($("<div></div>").addClass("destSnow").append($("<img></img>").attr("src","img/ffblue.png"))).append(contact).append(pages).append(lastDest);
}

function keywordPanel(element, fontSize, dem) {
	$.getJSON("destinationsData.json", function(data) {
		for (var i = 0; i < data.length; i++) {
			$(element).append(
			    $("<a> " + data[i].name + " </a>").attr("href", "myDestRequest.html?alias="+data[i].alias)
					.css("font-size",(Math.random() * fontSize + fontSize) + dem)
					.mouseover(function() {
						$(this).css("color", "#5c8abb");
					}).mouseout(function() {
						$(this).css("color", "black");
					})
            ).append("&nbsp;");
		}
	});
}

function fillDest(element, alias){
    $.getJSON("destinationsData.json", function(data) {
		for (var i = 0; i < data.length; i++) {
		if(alias !="" && alias === data[i].alias){
			$(element).append($("<option selected> " + data[i].name + " </option>"));
		}else{
		    $(element).append($("<option> " + data[i].name + " </option>"));
		}
		}
	});
}


function getWeather(count) {
	var lat = dataArray[count].lat;
	var lon = dataArray[count].lon;
	var name = dataArray[count].name;

//live block
/*	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="
			+ lat + "&lon=" + lon + "&appid=2b4456399956d6230b5e11c1a16d24ec", function(data) {
		$("#wname").html(name);
		$("#wdesc").html(data.weather[0].description);
		$("#wtemp").html((data.main.temp - 273.15).toFixed(1) + " &deg;C");
		$("#wicon").attr("src","http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
	});
*/
//live block
//dummy block
	$.getJSON("weatherExample.json", function(data) {
		$("#wname").html(name);
		$("#wdesc").html(data.weather[0].description);
		$("#wtemp").html((data.main.temp - 273.15).toFixed(1) + " &deg;C");
		$("#wicon").attr("src","http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
	});

//dummy block
}

function startHomePage() {

	var divWeather = $("<div class='weather container-fluid'></div>");
	divWeather.append($("<strong></strong>").attr("id", "wname"));
	divWeather.append($("<span></span>").attr("id", "wtemp"));
	divWeather.append($("<div></div>").addClass("img-fluid")).append($("<img></img>").attr("id", "wicon").addClass("wticon"));
	divWeather.append($("<span></span>").attr("id", "wdesc").addClass("hidden-sm").addClass("hidden-xs"));
	divWeather.hide();
	$(".destinations").append(divWeather);

	$.getJSON("destinationsData.json", function(data) {

	var div = $("<div></div>");
		
		for(var i=0;i< data.length; i++){

		    dataArray[i] = data[i];
            dataGalleryArray[i] = data[i].gallery;


				var divDest = $("<div></div>", {id:i} ).addClass("dest");
				divDest.append($("<img></img>").addClass("img-responsive")
						.attr("alt", data[i].name).attr("src",
								"img/" + data[i].image));
				div.append(divDest);
        }
		$(".destinations").append(div);
		$(".dest").mouseenter(function() {
		    $(this).css("cursor", "pointer");
	        $(".weather").insertBefore($(this).children("img"));
		    getWeather($(this).attr("id"));
			$(".weather").slideToggle();

		});
		$(".dest").mouseleave(function() {
			$(".weather").hide();

		});
		$(".dest").click(function () {
		    $(".nextInd").remove();
            $(".nextImg").remove();
			getGallery(this);
			$( ".destinations" ).fadeTo( "fast", "0.7");
			$(".carousel").show();
			$("#closeGalery").show();
		});

	});
}

function getGallery(element) {
	var count = $(element).attr("id");
	var alias = dataArray[count].alias;
    $("#firstImg").children("img").attr("src", "img/"+alias+"/"+dataGalleryArray[count][0]);
    $("#firstImg").addClass("active");
    $("#firstInd").addClass("active");
    $("#reserveButton").attr("href","myDestRequest.html?alias="+alias);

	for (var i = 1; i < dataGalleryArray[count].length; i++) {
		$("#galerySlide").append(
        			$("<div></div>").addClass("nextImg").addClass("item").append(
        					$("<img></img>").addClass("d-block").addClass("img-fluid").attr("src", "img/"+alias+"/"+dataGalleryArray[count][i])));
        	$("#galeryInd").append(
        			$("<li></li>").addClass("nextInd").attr("data-slide-to",""+i).attr("data-target",
        					"#carouselInd"));
	}

}
function getQueryParam(param) {
    location.search.substr(1)
        .split("&")
        .some(function(item) { // returns first occurence and stops
            return item.split("=")[0] == "alias" && (param = item.split("=")[1]);
        });
    return param;
}
