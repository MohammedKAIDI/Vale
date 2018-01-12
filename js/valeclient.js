"use strict";
new Vue({
    el:"#choice", 
    data: {
        welcome_msg: "Welcome to vale !", 
        filePath:""
    },
    methods: {
        sendFile : () =>  {         
            $.ajax({ 
                type:"POST", 
                data:$("#fileSubmit"),
                url:"http://127.0.0.1:9494/fileupload",
                success: (res) => {
                    alert(res[0])
                }
            });
        }
    }
});

    $(document).ready(function()
    {
      var navItems = $('.admin-menu li > a');
      var navListItems = $('.admin-menu li');
      var allWells = $('.admin-content');
      var allWellsExceptFirst = $('.admin-content:not(:first)');
      allWellsExceptFirst.hide();
      navItems.click(function(e)
      {
          e.preventDefault();
          navListItems.removeClass('active');
          $(this).closest('li').addClass('active');
          allWells.hide();
          var target = $(this).attr('data-target-id');
          $('#' + target).show();
      });
      });