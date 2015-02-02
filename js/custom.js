$(document).ready(function() {


	/* Required code for rendering HTML5 tags in IE */
	document.createElement('figcaption');
	document.createElement('figure');
	document.createElement('nav');

	var current_image;

	//Moving the last item before the first item, required for the infinity effect 
    $('#gallery ul li:first').before($('#gallery ul li:last'));  

		//Function for slidding the gallery to the right  
		$(document).on('click', 'a.next', function() {
  			
            var element_width = $('#gallery ul li').outerWidth() + 10;
            var left_indent = parseInt($('#gallery ul').css('left')) - element_width; 
  
            //Make the sliding animation
            $('#gallery ul:not(:animated)').animate({'left' : left_indent},500,function(){  
  
                $('#gallery ul li:last').after($('#gallery ul li:first')); 
                $('#gallery ul').css({'left' : '-160px'});  
            });

            //Functionallity for changing the image in the lightbox
            if($('#lightbox').length){
            	
				var next_image = current_image.parent().parent().next().find('a');
				var next_image_caption = current_image.parent().parent().next().find('figcaption').text();
				
				$('#content img').replaceWith('<img src="' + next_image.attr('href') + '" alt="' + next_image_caption + '" />');
				$('#content .image_caption').replaceWith('<p class="image_caption">' + next_image_caption + '</p>');

				current_image = next_image;

            }

        });


      	//Function for slidding the gallery to the left
      	$(document).on('click', 'a.previous', function() { 
  			
            var element_width = $('#gallery ul li').outerWidth() + 10;
            var left_indent = parseInt($('#gallery ul').css('left')) + element_width;  
  			
  			//Creating the sliding animation
            $('#gallery ul:not(:animated)').animate({'left' : left_indent},500,function(){  
  
	            //Moving the last item before the first item to create the infinity effect
	            $('#gallery ul li:first').before($('#gallery ul li:last'));     
	            $('#gallery ul').css({'left' : '-160px'});  
            });

            //Functionallity for changing the image in the lightbox
            if($('#lightbox').length){
            	
				var prev_image = current_image.parent().parent().prev().find('a');
				var prev_image_caption = current_image.parent().parent().prev().find('figcaption').text();
				
				$('#content img').replaceWith('<img src="' + prev_image.attr('href') + '" alt="' + prev_image_caption + '" />');
				$('#content .image_caption').replaceWith('<p class="image_caption">' + prev_image_caption + '</p>');

				current_image = prev_image;

            }  
  
        });


      //The functionality for triggering the carousel with the keyboard arrows
      $("body").keydown(function(e) {
      	//Left arrow key
      	if(e.which == 37) {  
          $(".previous:first").trigger("click");
      	}
      	//Right arrow key
      	else if(e.which == 39) {
          $(".next:first").trigger("click");
      	}
    }); 

     //The functionality for triggerin the lightbox
     $('.lightbox').click(function(e){

     	//Stops the hyperlink
		e.preventDefault();

		var image_link = $(this).attr("href");
		var image_caption = $(this).parent().find('figcaption').text();

		//Checking if the lightbox wrapper exists
		if ($('#lightbox').length > 0) {
			
			$('#content img').replaceWith('<img src="' + image_link + '" alt="' + image_caption + '" />');
			$('#content .image_caption').replaceWith('<p class="image_caption">' + image_caption + '</p>');
			$('#lightbox').show();
		}
		
		else {
			
			//Creating the HTML for the lightbox window
			var lightbox = 
			'<div id="lightbox">' + 
				'<div id="content">' +
					'<a class="exit">Close</a>' +
					'<img src="' + image_link +'" alt="' + image_caption +'" />' +
					'<p class="image_caption">' + image_caption + '</p>' +
					'<a class="previous">Previous</a>' +
					'<a class="next">Next</a>' +
				'</div>' +	
			'</div>';
				
			//Inserting the lightbox into the DOM
			$('body').append(lightbox);
		}

		current_image = $(this);

     });

    //The functionality to exit the lightbox
	$(document).on("click", "a.exit", function() {
		$('#lightbox').hide();
	});

});