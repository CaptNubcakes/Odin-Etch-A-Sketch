$(document).ready(function(){
    //HTML additions
    $('body').prepend('<div class="header"></div>');
    $('.header').prepend('<h1>Sketchamabobber</h1>');
    $('.header').append('<h2>An exercise from The Odin Project</h2>').append('<h3>By Captain Nubcakes</h3>');
    
    //CSS additions 
    $('.header').css({'textAlign':'center','backgroundColor':'black', 'color': 'yellow', 'paddingTop':'20px', 'paddingBottom': '20px'}); 
    
    //Code to add the defaut grid
    for(var row=1; row <= 16; row++) {
        for(var colomn=1; colomn <= 16; colomn++) {
            
            $('<div>').attr({
                "id": "blocks " + row + "-" + colomn,
                "class": "blocks",
                }).appendTo("#workspace");
            
        }
    $("#workspace").append("<br>")
    };
    
    //Code to begin coloring once mouse enters the grid
        $('.blocks').on('mouseenter', function () {
        $(this).css('backgroundColor', 'black');
        });
            
    
     
    
    //Code for "Clear" button
      $("#clear").click(function() {
        $(".blocks").css({"background-color" : "white"});
    });
        
    //Code for "Change Color" button
    $('#pickColor').click(function() {
        var hexColor = prompt('Choose a hex color value!');
        $('.blocks').on('mouseenter', function () {
        $(this).css('backgroundColor', hexColor);
        });
    });
       
   
});


