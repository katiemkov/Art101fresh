$("#add-creature").click(
    function(){

    let crName = $("#crName").val();
    $("#creature-list").append(crName + ", ");

});