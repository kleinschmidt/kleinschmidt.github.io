$(document).ready(function() {
    $(".sliding > h3.slidingtitle").click(function() {
        $(this).
            siblings().toggle();
    });
    $(".sliding > h3.slidingtitle").siblings().hide();
});