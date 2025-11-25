$(".nice-block span").on("click", function () {
    var $btn = $(this);
    var $parent = $btn.parent();

    $parent.toggleClass("more");

    var isMore = $parent.hasClass("more");
    $btn.text(isMore ? "less" : "more");
});
