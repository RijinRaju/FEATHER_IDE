

//javascript function for collapse sidebarmenu...................
function toggleNav() 
{   
    var sidebar = document.getElementById("sidebar");
    // sidebar.style.width = sidebar.style.width === "250px" ? '51px' : '250px';
    var main=document.getElementById("main");
    main.style.marginLeft=main.style.marginLeft ==="250px" ? '48px':'250px';
     main.style.width=main.style.width ==='145.3vh'? main.style.width='171.6vh': main.style.width='145.3vh';
     main.style.transitionDuration="1s"    

    var menuIcon=document.getElementById('menu-icon');
    menuIcon.style.color=main.style.width=="172vh"?menuIcon.style.color="#737880":menuIcon.style.color="#fff";

  
}

function fileShow(){
  var dd1=document.getElementById('dropdown');
  var dd2=document.getElementById('dropdown2');
  
dd1.style.display="block";
dd2.style.display="none"
}
function compilerShow(){
 var dd2= document.getElementById('dropdown2');
 var dd1=document.getElementById('dropdown')
dd1.style.display="none";
 dd2.style.display="block";
}




/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
   var m2=document.getElementById("myDropdown2");
  }
  function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
  }
  function myFunction3() {
    document.getElementById("newFileList").classList.toggle("show");
  }
  function myFunction4() {
    document.getElementById("fileSelect").classList.toggle("show");
  }
 
  
  