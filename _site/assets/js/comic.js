
$(document).ready(function () {
    topFunction();

    // to top at start of page
    $(document).on('click', '.top-btn', topFunction); 


    // enable chapter modal
    $(document).on('click', '[title=chapter-list]', function(){
        console.log("click");
        $('#chapter-modal').removeClass('out');
        $('#chapter-modal').addClass('list');
    
        $('.modal').css("margin-left", -$(".modal-body").width()/2); 
    })

    // enable page modal
    $(document).on('click', '[title=page-list]', function(){
        console.log("click");
        $('#page-modal').removeClass('out');
        $('#page-modal').addClass('list');
    
        $('.modal').css("margin-left", -$(".modal-body").width()/2); 
    })
    
    $(document).on('click', '.close', function(){
        $('.modal-container').addClass('out');
    })
    
    $(document).mouseup(function(e) 
    {
        var container = $('.modal');
    
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            $('.modal-container').addClass('out');
        }
    });

    // page turning
    $("[page-id='1']").fadeIn(500);

    $(".page-img").click( function() {
        next();
    })

    $("[page-nav='prev']").click(function() {
        prev();
    });


    $("[page-nav='next']").click(function() {
        next();
    });

    $(document).keydown( function(event) {
        // left arrow key
        if (event.which == 37)
        {
            prev();
        }
        // right arrow key
        else if (event.which == 39)
        {
            next();
        }
    });

    // page modal
    $(document).on('click', '.page-replace', function(){
        console.log($(this).children().attr("page-id"));
        console.log("replace page");
        var replaceID = $(this).children().attr("page-id");
        replace(replaceID);
    })


}); 

// When the user clicks on the button, scroll to the top of the document
function topFunction() 
{
    $('html, body').animate({
        scrollTop: $("#comic").position().top
    });
}

function prev()
{
    var currID = $(".chapter-pages").find(":visible").attr('page-id');
    var nextID = parseInt(currID, 10)-1;
    var nextPage = $("[page-id='"+nextID+"']");
    if (nextPage.length)
    {
        $("[page-id='"+currID+"']").fadeOut(0, function(){
            $(nextPage).fadeIn(0, function() {
                topFunction();
            });
        })
    }
    else
    {
        console.log($("[title='previous chapter']"));
        window.location.href = $("[title='previous chapter']").attr('href');
    }
    updatePageTitle();
}

function next() 
{
    var currID = $(".chapter-pages").find(":visible").attr('page-id');
    var nextID = parseInt(currID, 10)+1;
    var nextPage = $("[page-id='"+nextID+"']");
    if (nextPage.length)
    {
        $("[page-id='"+currID+"'][class='page-img']").fadeOut(0, function(){
            $(nextPage).fadeIn(0, function() {
                topFunction();
            });
        })
    }
    else
    {
        console.log($("[title='next chapter']"));
        window.location.href = $("[title='next chapter']").attr('href');
    }
    updatePageTitle();
}

function replace(nextID)
{
    var currID = $(".chapter-pages").find(":visible").attr('page-id');
    var nextPage = $("[page-id='"+nextID+"']");
    if (nextPage.length)
    {
        $("[page-id='"+currID+"'][class='page-img']").fadeOut(0, function(){
            $(nextPage).fadeIn(0, function() {
                topFunction();
            });
        })
    }
    else
    {
        console.log($("[title='next chapter']"));
        window.location.href = $("[title='next chapter']").attr('href');
    }
    updatePageTitle();
}

function updatePageTitle()
{
    var currID = $(".chapter-pages").find(":visible").attr('page-id');
    $("[title=page-list]").text("Page "+currID)
}