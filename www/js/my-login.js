$(function() {
    $("input[type='password'][data-eye]").each(function(i) {
        let $this = $(this);

        $this.wrap($("<div/>", {
            style: 'position:relative'
        }));
        $this.css({
            paddingRight: 60
        });
        $this.after($("<div/>", {
            html: 'Show',
            class: 'btn btn-primary btn-sm',
            id: 'passeye-toggle-' + i,
            style: 'position:absolute;right:10px;top:50%;transform:translate(0,-50%);padding: 2px 7px;font-size:12px;cursor:pointer;'
        }));
        $this.after($("<input/>", {
            type: 'hidden',
            id: 'passeye-' + i
        }));
        $this.on("keyup paste", function() {
            $("#passeye-" + i).val($(this).val());
        });
        $("#passeye-toggle-" + i).on("click", function() {
            if ($this.hasClass("show")) {
                $this.attr('type', 'password');
                $this.removeClass("show");
                $(this).removeClass("btn-outline-primary");
            } else {
                $this.attr('type', 'text');
                $this.val($("#passeye-" + i).val());
                $this.addClass("show");
                $(this).addClass("btn-outline-primary");
            }
        });
    });
});
// socket connection 

$(function() {
    var socket = io.connect();
    var $message = $('#messageform');
    var $email = $('#emailtxt');
    var $pass = $('passtxt');

    $messageform.submit(function(e) {
        e.preventDefault();
        socket.emit('sendemail', $email.val());
        socket.emit('sendpass', $pass.val());
        $pass.val('');
        $email.val('');
    });

});

/*
var index = io.connect('http://localhost:3000/'),
    register = io.connect('http://localhost:3000/register.html'),
    forgot = io.connect('http://localhost:3000/forgot.html');

// var rest = io.connect('http://localhost:3000/rest.html');

index.on('connect', function() {
    console.log('connect');
    index.emit('hola!');
});

news.on('news', function() {
    news.emit('woot');
});
*/