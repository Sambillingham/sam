//alert("Hello everyone");

// document is the javascript special word for the page itself
// we want to wait for the page to be ready to do things
$(document).ready(function () {

	// make the header html say 'picfair sucks'
	//$("header").html("picfair sucks");

	// hide the input fields when you load the page
	$("div.inputs").hide();

	// when I click on the submit button
	// I want the div.inputs to slide down
	$("input[type=submit]").on("click", function () {

		// only do the things below IF the div.inputs is hidden
		if ( $("div.inputs").is(":hidden") ) {

			// slide down the div.inputs (speed in the brackets)
			$("div.inputs").slideDown(500);

			// stop the form going to the next page
			return false;

		}

	});

	// when I scroll down the page (aka the document)
	// I want the ipad to move from the right
	// and the iphone to move from the left
	$(document).on("scroll", function () {

		console.log("scroll hello");

		// so how far down the page are we?
		// we're going to save the amount down the page to
		// a variable because we'll reuse in a few places
		var t = $(document).scrollTop();

		console.log(t);

		// lets move our iphone to the left
		$("img#iphone").css("left", t / 20);

		// lets move our ipad to the right
		$("img#ipad").css("right", t / 20);

		// lets add a class of pale to the body after a certain distance
		if (t > 300) {
			$("body").addClass("pale");
		}
		else {
			$("body").removeClass("pale");
		}

		// lets see our sticky header after a certain distance
		if (t > 500) {
			$("header#sticky").css("top", 0);
		}
		else {
			$("header#sticky").css("top", -120);
		}

	});



	var slide = 0;
	var numberOfSlides = $("div#slides img").length;

	// to stop repeating ourselves, we've made a function
	function moveSlide () {
		var leftPosition = slide * -800;

		// move to jquery animate because of rounding errors
		// $("div#slides").css("left", leftPosition);

		$("div#slides").animate({ left: leftPosition }, 500);

	}

	function next() {
		// if current slide is not equal to number of slides -1
		// -1 because counting from 0 (5th slide is number 4)
		if (slide != numberOfSlides -1) {
			slide += 1;
			moveSlide();
		}
		else{
			slide = 0;
			moveSlide();
		}
	};

	function prev() {
		// if we're not on the first slide, move us
		if (slide != 0) {
			slide -= 1;
			moveSlide();
		}
		else{
			slide = numberOfSlides - 1;
			moveSlide();
		}
	};


	// instructions
	// when we click the link with id next
	// move the slides area over by 612px
	$("a#next").on("click", function () {

		next();

		// stop the link from junping up the page
		return false;

	});

	// instructions
	// when we click the link with id next
	// move the slides area over by 612px
	$("a#prev").on("click", function () {

		prev();

		// stop the link from junping up the page
		return false;

	});


	// instructions
	// we need to get the url for our twitter feed from twitcher
	// Use getJSON as we know the api serves up a json response
	// Loop through data response and append the text to the ul
	var url = "http://twitcher.steer.me/user_timeline/teamsteer?key=fqmwnyf3"
	var feed = $("section#twitter-feed ul");

	$.getJSON(url, function (data) {
		var tweets = data.slice(0,10);
		var source = $("#tweets-template").html();
		var template = Handlebars.compile(source);
		var output = template({ Tweets : tweets});
		$("#tweets").html(output);
	});

	// Create handlebars helper
	// this uses moment.js to change the date to a time from now
	Handlebars.registerHelper('timeFromNow', function() {
  	return moment(this.created_at).fromNow();
	});


	// Create url detection helper
	Handlebars.registerHelper('textToLinks', function(text) {
		var regEx = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/img;
    return new Handlebars.SafeString(text.replace(regEx, '<a href="$1">$1</a>'));
	});

});



























