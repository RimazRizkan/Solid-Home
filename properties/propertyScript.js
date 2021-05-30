/* Providing the javascript for the a tag which is inside the thumb class */
$(document).ready(function(){ 
    $('.thumb a').click(function(e){
        e.preventDefault(); /* It prevents a link from following the URL so that the browser can't go another page */
        /* This is used to make the thumbnail images */
        $('.imgBox img').attr("src", $(this).attr("href"));
    });  
});



	
	
