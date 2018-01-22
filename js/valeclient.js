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
        },
    }
});

let chatSection = new Vue({ 
    el:".chatSection", 
    data: {
        listOfNotes : [],
        msgornote : "", 
        listFriends : [{name:"Moh"}, {name:"Meda"}]
    }, 
    methods : {
        getMeIntoChat : () => {
            window.location="http://127.0.0.1:9495/views/statistics.html"
            $.ajax({
                type:"POST", 
                url:"http://127.0.0.1:9495/chat",
                success: (res) => {
                }
            });
        },
        postMsg : () => {
            chatSection.listOfNotes.push({ body : chatSection.msgornote, datePublish:new Date() } );
            chatSection.$http.post('http://127.0.0.1:9495/saveNote', {msg : chatSection.msgornote }).then(function(response) { 
                chatSection.msgornote = "";
            }); 
        }, 
        getlistMessages : () => {
            chatSection.$http.post('http://127.0.0.1:9495/getNotes', {}).then(function(response) { 
                chatSection.listOfNotes = response.data;
            }); 
        }, 
        deleteMesg : (id) => {
            chatSection.$http.post('http://127.0.0.1:9495/deleteMesg', {id:id}).then(function(response) { 
            }); 
        }
    }
});
//chatSection.getlistMessages();

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
      $(document).on('click', '.panel-heading span.icon_minim', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
    $(document).on('focus', '.panel-footer input.chat_input', function (e) {
        var $this = $(this);
        if ($('#minim_chat_window').hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideDown();
            $('#minim_chat_window').removeClass('panel-collapsed');
            $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
    $(document).on('click', '#new_chat', function (e) {
        var size = $( ".chat-window:last-child" ).css("margin-left");
         size_total = parseInt(size) + 400;
        alert(size_total);
        var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
        clone.css("margin-left", size_total);
    });
    $(document).on('click', '.icon_close', function (e) {
        $( "#chat_window_1" ).remove();
    });