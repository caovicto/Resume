var locked = false;

$(document).ready(function () 
{
    var url = new URL(window.location.href);
    var page = url.searchParams.get('page');

    // console.log(page);
    if (page == null)
    {
        page = '1';
    }
    update(page);

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


    $(".page-img").click( function() {
        var url = new URL(window.location.href);
        var page = parseInt(url.searchParams.get('page'), 10);
 
        update(page+1);
    })

    $("[page-nav='prev']").click(function() {
        var url = new URL(window.location.href);
        var page = parseInt(url.searchParams.get('page'), 10);
        update(page-1);
    });

    $("[page-nav='next']").click(function() {
        var url = new URL(window.location.href);
        var page = parseInt(url.searchParams.get('page'), 10);
        update(page+1);
    });

    $(document).keydown( function(event) {
        var url = new URL(window.location.href);
        var page = parseInt(url.searchParams.get('page'), 10);

        // left arrow key
        if (event.which == 37)
        {
            update(page-1);
        }
        // right arrow key
        else if (event.which == 39)
        {
            update(page+1);
        }
    });

    // page modal
    $(document).on('click', '.page-replace', function(){
        var page = $(this).children().attr("page-id");
        
        update(page);
        $('.modal-container').addClass('out');
    })


}); 

function unlock () {
    locked = false;
}

// When the user clicks on the button, scroll to the top of the document
async function topFunction() 
{
    if (!locked) {
        locked = true;
        console.log("top");
        setTimeout(unlock, 1000);
        $('html, body').animate({
            scrollTop: $("#comic").position().top
        });
    }
}

function update(page)
{
    var max = $("[class='page-img']").length+1;

    if (page < 1)
    {
        window.location.href = $("[title='previous chapter']").attr('href');
    }
    else if (page < max)
    {
        $("[page-id][class='page-img']").hide(0, function(){
            $("[page-id='"+page+"'][class='page-img']").show(0, function() {
                topFunction();
            });
        });
        
        var url = new URL(window.location.href);
        url.searchParams.set('page', page);
        window.history.pushState(null, null, url.href)
    
        $("[title=page-list]").text("Page "+page)
    }
    else
    {
        window.location.href = $("[title='next chapter']").attr('href');
    }
}