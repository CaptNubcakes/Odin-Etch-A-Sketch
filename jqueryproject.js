//Document ready function to start the code when the page is ready
$(document).ready(function () {

    //Function to wipe clean for later use
    function clearSpace() {
        $(".blocks").removeClass('blackBlocks');
        $(".blocks").css('background-color', 'white');
    }

    //Code to add the defaut grid on load
    var blockSize;
    var blocks$;

    function defaultGrid() {
        var divArray = [];
        var blockRow = 320 / 10;
        var blockColumn = 500 / 10;
        var gridDimension = blockRow * blockColumn;
        $('#workspace').off();
        $('#workspace').html('');
        for (var i = 1; i <= gridDimension; i++) {
            divArray[i] = "<div class='blocks' style='width:" + 10 + "px; height:" + 10 + "px;'></div>"
        }
        $('#workspace').append(divArray.join(''));
        blocks$ = $("div.blocks");
        console.log($('div.blocks').length)
    };
    defaultGrid();

    //Code to begin coloring once mouse enters the grid
    function beginColoring() {
        $('.blocks').on('mouseover', 'div', function () {
            $(this).addClass('blackBlocks');

        });
        $('#workspace').on('mouseenter', 'div', function () {
            $(this).addClass('blackBlocks');
        });
        $('#workspace').on('mousemove', 'div', function () {
            $(this).addClass('blackBlocks');
        });
    }
    beginColoring();

    //Code for Sketch Size button & function for new grid
    function newGrid() {
        var divArray = [];
        var blockRow = 420 / blockSize;
        var blockColumn = 600 / blockSize;
        var gridDimension = blockRow * blockColumn;
        $('#workspace').html('');
        for (var i = 1; i <= gridDimension; i++) {
            divArray[i] = "<div class='blocks' style='width:" + blockSize + "px; height:" + blockSize + "px;'></div>"
        }
        $('#workspace').append(divArray.join(''));
        blocks$ = $("div.blocks");
        console.log($('div.blocks').length)
    };

    $("#lineSize").click(function reSize() {
        $('#workspace').remove('.blocks');
        clearSpace();
        var input;

        //Doesn't allow invalid selection
        function chooseInput() {
            input = prompt("Choose a number between 10 and 50!");
            if (input > 50 || input < 10) {
                alert("Not in range!");
                chooseInput();
            } else if (isNaN(input)) {
                alert("Not a valid input!");
                chooseInput();
            } else {
                blockSize = input;
                newGrid();
                beginColoring();
                $('.blocks').css({
                    'width': blockSize + "px",
                        'height': blockSize + "px"
                });
            }
        }
        chooseInput();
    });

    //Code for "Clear" button using animation function and clearSpace() function
    var animMaxCount = 3;
    var animCount = 0;
    $("#clear").click(function doAnimation() {
        $(".subWrapper").animate({
            marginTop: 25,
            marginBottom: -25
        }, 75, function () {
            $(".subWrapper").animate({
                marginTop: 0,
                marginBottom: 0
            }, 75, function () {
                if (animCount < animMaxCount) {
                    doAnimation();
                } else {
                    animCount = 0;
                }
            });
            animCount++;
        });
        clearSpace();
    });


    //Code for "Change Color" button
    $('#pickColor').click(function () {
        var hexColor = prompt('Choose a hex color value!');
        $('.blocks').on('mousemove', function () {
            $(this).css('backgroundColor', hexColor);
        });
        $('.blocks').on('mouseover', function () {
            $(this).css('backgroundColor', hexColor);
        });
        $('.blocks').on('mouseenter', function () {
            $(this).css('backgroundColor', hexColor);
        });
    });


    //"Random Colors" button
    function randomColor() {
        var red = Math.floor((Math.random() * 255) + 1);
        var green = Math.floor((Math.random() * 255) + 1);
        var blue = Math.floor((Math.random() * 255) + 1);
        return "rgb(" + red + "," + green + "," + blue + ")";
    }

    $('#randomcolors').click(function () {
        $('.blocks').on('mousemove', function () {
            $(this).css("background-color", randomColor());
        });
    });

    //Function for workspace color change
    $('#backgroundColor').click(function () {
        var colorChoice = prompt('Choose a background color!');
        $('.blocks').css('background-color', colorChoice);
        beginColoring();
    });

    //Function for the knob rotation
    var rotation1 = 0;
    var rotation2 = 0;

    jQuery.fn.rotate = function (degrees) {
        $(this).css({
            '-webkit-transform': 'rotate(' + degrees + 'deg)',
                '-moz-transform': 'rotate(' + degrees + 'deg)',
                '-ms-transform': 'rotate(' + degrees + 'deg)',
                'transform': 'rotate(' + degrees + 'deg)'
        });
    };

    //Function for rotation increments using knob rotation function
    function rotRfrwd() {
        rotation1 += 1;
        $('.knob2').rotate(rotation1);
    };

    function rotRbwrd() {
        rotation1 -= 1;
        $('.knob2').rotate(rotation1);
    }

    function rotLfrwd() {
        rotation2 += 1;
        $('.knob1').rotate(rotation2);
    };

    function rotLbwrd() {
        rotation2 -= 1;
        $('.knob1').rotate(rotation2);
    }

    //Mouse Tracker function for rotation direction
    var xPrev = 0;
    var yPrev = 0;

    function trackMouseHorz() {
        $('#workspace').mousemove(function (e) {
            if (xPrev < e.pageX) {
                rotLfrwd()
            } else {
                rotLbwrd();
            }
            xPrev = event.pageX;
            $('#statusleft').html(e.pageX);
        });
    }

    function trackMouseVert() {
        $('#workspace').mousemove(function (e) {
            if (yPrev < e.pageY) {
                rotRfrwd();
            } else {
                rotRbwrd();
            }

            yPrev = event.pageY;
            $('#statusright').html(e.pageY);
        });
    }
    trackMouseHorz();
    trackMouseVert();
});
