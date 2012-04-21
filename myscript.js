jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        return true;
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

$(document).ready(function(){
    var FaceMarkFunc = function (event) {
        var icaller = $(event.target);
        var IDtoSend = icaller.parent().parent().parent().parent().attr('class').match('\\d+');
        $.post('http://electric-sword-7186.herokuapp.com/api/submit/', {fb_id: IDtoSend[0]});
    };
    var refreshId = setInterval(function(){

        var toAppend = $("<img class=\"uiFaceMarkIcon\" title=\"Add this post to Facemark\" src=\"" + chrome.extension.getURL("images/bookmark.png") + "\" alt=\"FaceMark Button\" ALIGN=ABSMIDDLE />");

        toAppend.click(FaceMarkFunc);
        $("span.UIActionLinks.UIActionLinks_bottom:not(:has(.uiFaceMarkIcon))").append(" &middot; ").append(toAppend);
    }, 5000);
});
