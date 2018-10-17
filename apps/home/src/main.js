
import "./common/bootstrap-3.3.7/css/bootstrap.css"
import "./common/bootstrap-3.3.7/js/bootstrap.js"
import "./common/bootstrap-3.3.7/js/bootstrap-hover-dropdown.js"
import "./common/css/style.css"

$(function(){
    $('.dropdown-toggle').dropdown();
    const page_name = $(document.body).attr("page-name");
    $("li.menu-"+page_name).addClass("active");

});