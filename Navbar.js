var menu_list = document.getElementById("menu_list");
var small_screen_menu_bar = document.getElementById("small_screen_menu_bar");

menu_list.style.height = "0px";


small_screen_menu_bar.addEventListener("click", function () {
 
    if (menu_list.style.height == "0px") 
    {
    menu_list.style.display = "block";
    menu_list.style.height = "180px";
menu_list.style.transitionProperty = 'all'
menu_list.style.transitionDuration = '0.5s'}
     
  else {
    menu_list.style.display = "none";
    menu_list.style.height = "0px";}
});
