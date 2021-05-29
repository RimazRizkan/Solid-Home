/* This is the function to create the min beds count by having a jquery ui element called spinner */
$(function() {
    $("#minBeds").spinner({
        min: 0, /* minimum value of 0 */
        max: 5, /* maximum value of 5 */
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

/* This is the function to create the max beds count by having a jquery ui element called spinner */
$(function() {
    $("#maxBeds").spinner({
        min: 0, /* minimum value of 0 */
        max: 5, /* maximum value of 5 */
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

/* This is the function to create a jquery ui selectmenu which has a id named as property */
$(function() {
    $("#property").selectmenu();
});

/* This is the function to create a jquery ui selectmenu which has a id named as time */
$(function() {
    $("#time").selectmenu();
});

/* This is the function to create a jquery ui slider which has a id named as slider-range */
$(function() {
    $("#slider-range").slider({
        range:true,
        min: 249500, /* Minimum value of 249500 */
        max: 750000, /* Minimum value of 750000 */
        values: [ 75, 300 ],
        slide: function( event, ui ){
			/* Displaying the current amount of the slider when moved */
            $("#amount").val( "£ " + ui.values[ 0 ] + " - £ " + ui.values[ 1 ] );
        }
    });
    /* Displays the slider value */
    $("#amount").val(" £ " + $(" #slider-range").slider( "values", 0 ) + " - £ " + $("#slider-range").slider( "values", 1 ) );
});

/* This is the function to have the search function working */
$(document).ready(function() {
	/* if the id named as Search is clicked then the following process will take place */
    $("#Search").on("click", function(){
        var propType = $("#property").val(); /* Providing the property type to the propType variable */
        var minBed =  $("#minBeds").val(); /* Providing the minimum beds to the minBed variable */
        var maxBed =  $("#maxBeds").val(); /* Providing the maximum beds to the maxBed variable */
        var date =  $("#time").val(); /* Providing the time to the date variable */
        var minPrice = $("#slider-range").slider("option", "values")[0]; /* Providing the slider value stored in 0 index to the minPrice variable */
        var maxPrice = $("#slider-range").slider("option", "values")[1]; /* Providing the slider value stored in 1 index to the maxPrice variable */
        
        var output="<ul>"; /* Initializing the output variable to a ul tag */
		for (var i in data.properties) { /* Using a for loop to read the JSON data */
			/* Using the if condition to get the required output */
            if (( propType == data.properties[i].type) || (propType=="Any Type"))
            if (( maxBed >= data.properties[i].bedrooms && minBed <= data.properties[i].bedrooms ))
            if (( date == data.properties[i].added.month) || (date=="Anytime"))
            if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
            {
                {
                    {
                        {
							/* If the if condition is true then the following output will be displayed as a list using li tag*/
                            output+="<h3>" + "<li>" + "£ " + data.properties[i].price +"</li>" + "<li>" + data.properties[i].type +"</li>" + "</h3>" + "<img src=" + data.properties[i].picture + ">" + "<p>" + data.properties[i].description + "</p>" + "<button><a href='" + data.properties[i].url + "'>Know More</a></button>";
						} } } } }
				/* The output variable will finally close the ul tag */		
				output+="</ul>";
				/* Using of Placeholder to display the output */
                document.getElementById( "Placeholder" ).innerHTML = output;
    });
});

$(document).ready(function() {
	$("#Placeholder").addClass('customBackground'); /* Creating a new jquery ui button to where there is a class called searchButton in Search Page and adding a class named as customBackground in SearchStyle.css*/
});

$(function() {
	$(".searchButton").button(); /* Creating a new jquery ui button to where there is a class called searchButton in Search Page*/
});

$(function() {
	$("#viewFav").button(); /* Creating a new jquery ui button to where there is a id called viewFav in Search Page*/
});

$(function() {
	$("#clearFav").button(); /* Creating a new jquery ui button to where there is a id called clearFav in Search Page*/
});

/* This is the function used to achieve add to favourites method */
$(function() {
	/* if addFavourites class is clicked then following function will take place */
	$( ".addFavourites" ).on("click", function(){
		/* Using of a try and catch block to run the program without any crashes */
		try { 
			$('#btn1').button("disable"); /* id btn1 will be disabled when addFavourites class is clicked */
			$('#btn2').button("enable"); /* id btn2 will be enabled when addFavourites class is clicked */
			
			/* The variable propIdToAdd checks the closest p tag and attribute id for id btn1 */
			var propIdToAdd = $('#btn1').closest("p").attr("id");
			
			/* Using of variable myFavouriteProp as favProp in localStorage */
			var myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
			
			/* Providing an empty array if myFavouriteProp is null */
			if(myFavouriteProp == null) {
				myFavouriteProp = [];
			}
			
			/* Adding an element to the array if myFavouriteProp is not null */
			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {
					
					/* If it has the same element then providing an alert */
					if ( propIdToAdd == myFavouriteProp[j]) {
						
						alert("Already has been added to favourites"); 
						myFavouriteProp = [];
					}
				}
			}
			
			/* Adding the myFavouriteProp to propIdToAdd using push method*/
			myFavouriteProp.push(propIdToAdd);
			
			/* Providing the favProp and property id to localStorage using setItem method */
			localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
			
		}
		
		/* Providing an alert if localStorage limit is exceeded in a catch block */
		catch (e) {
			if (e==QUOTA_EXCEEDED_ERR) {
				console.log("Error: The local storage limit has exceeded");
			}
			
			else {
				console.log("ERROR: Saving to local storage.");
			}
		}
	});
});



/* This is the function used to achieve remove from favourites method */
$(function() {
	/* if removeFavourites class is clicked then following function will take place */
	$( ".removeFavourites" ).on("click", function(){

			$('#btn2').button("disable"); /* id btn2 will be disabled when removeFavourites class is clicked */
			$('#btn1').button("enable"); /* id btn1 will be enabled when removeFavourites class is clicked */
		
	
			/* The variable propIdToRemove checks the closest p tag and attribute id for id btn2 */
			var propIdToRemove = $('#btn2').closest("p").attr("id");
			
			/* Using of variable myFavouriteProp as favProp in localStorage */
			 myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
			
			/* checking if myFavouriteProp is not null */
			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {
					
					/* If it has the same element then providing an alert */
					if ( propIdToRemove == myFavouriteProp[j]) {
						
						alert("Removed successfully from favourites");
						
						/* Deleting the property using the delete method */
						delete myFavouriteProp[j];
						
						/* Providing the favProp and property id to localStorage using setItem method */
						localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
						
						/* Displaying the particular element in the array as empty */
						myFavouriteProp[j] = [];
					}
				}
			}
			
			
		});
	});
	
	
/* This is the function used to achieve view favourites method */
$(function() {
	/* if viewFavourites class is clicked then following function will take place */
	$( ".viewFavourites" ).on("click", function(){
		
		console.log("Restoring array data from local storage");
		
		/* Using of variable myFavouriteProp as favProp in localStorage */
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		
		var output = "<ul>"; /* Initializing the output variable to a ul tag */
		
		/* checking if myFavouriteProp is not null */
		if (myFavouriteProp != null) {
			
			for (var i = 0; i < data.properties.length; i++) {
				for (j = 0; j < myFavouriteProp.length; j++) {
					
					/* Checking if JSON data is equal to the myFavouriteProp */
					if (data.properties[i].id == myFavouriteProp[j]) {
						
						/* Displaying the required output as a list */
						output+="<h4>" + "<li>" + "Price : " + data.properties[i].price + "</li>" + "<br>" +"<li>" + "No of Bedrooms : " + data.properties[i].bedrooms + "</li>" + "<br>" + "<li>" + "Property Type : " +  data.properties[i].type + "</li>" + "</h4>" + 
"<img src=" + data.properties[i].picture + ">" + "<br>" +"<button><a href=' " +data.properties[i].url + "'>Visit page</a></button>" + "<br>" + "<br>" + "<br>";
					}
				}
			}
		}
		/* The output variable will finally close the ul tag */	
		output+="</ul>";
		
		/* Using of Placeholder2 to display the output */
		document.getElementById( "Placeholder2" ).innerHTML = output;

		/* Displaying an alert if myFavouriteProp is null */
		if(myFavouriteProp == null) {
			alert("You have no favourite properties");
		}
	
	});
});


/* This is the function used to achieve clear favourites method */
$(function() {
	/* if clearFavourites class is clicked then following function will take place */
	$( ".clearFavourites" ).on("click", function(){
		
		/* The id named as placeholder2 will be removed from the array */
		$("#Placeholder2").remove();
		
		/* Using of variable myFavouriteProp as favProp in localStorage */
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		
		/* Erasing all the data in the localStorage using the clear method */
		localStorage.clear();
		
	});
	
});