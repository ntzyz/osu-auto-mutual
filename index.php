<!doctype html>
<html>
    <head>
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>osu! Auto Mutual</title>
        <link rel="stylesheet" type="text/css" href="style.css" media="screen and (min-width: 550px)" />
        <link rel="stylesheet" type="text/css" href="style_mobile.css" media="screen and (max-width: 550px)" />
        <script src="jquery-1.11.0.min.js"> </script>
        <script type="text/javascript">
            function mutual() {
                   $('#mutual').fadeOut(250, function() {
                       $('#inside').html('Please Wait...');
                   });
                  $('#mutual').fadeIn(250);
                $.ajax({
                    type: 'GET',
                    url: 'request.php',
                    data: 'id=' + $('#user').val(),
                    dataType: 'html',
                    success: function(response) {
                        $('#mutual').fadeOut(500, function() {
                            $('#inside').html(response);
                        });
                        $('#mutual').fadeIn(500);
                    }
                });
            }
        </script>
        <?php
		include 'config.php';
		$file = fopen($fr,"a+");
		fwrite($file,date('Y-m-d H:i:s')." Visited from ".$_SERVER["REMOTE_ADDR"]."\n");
		fclose($file);
	?>
        <style>
            body {
                background-image: url('<?=$bg?>');
            }
        </style>
    </head>
    <body>
        <div id="header">
            <div id="overlay" class="title"><div class="title">&nbsp;&nbsp;&nbsp;osu! Auto Mutual</div></div>
            <div id="mv1" style="background-image: url(triangles-1.png);"/>
            <div id="mv2" style="background-image: url(triangles-2.png);"/>
            <div id="mv3" style="background-image: url(triangles-3.png);"/> </div> </div> </div>
        </div>
        <img class="avatar" src="//a.ppy.sh/<?=$uid?>" />
        <center>
        <div id="mutual">
            <div id="inside">Let's become mutual friend!</div>
        </div>
        <div class="ct">
            <form id="in">
                <input type="text" class="user" name="user" id="user" placeholder="Your osu! ID" style="cursor: text;"/>
                <div class="button" style="display: inline-block; font-size: 0.9em;" onclick="mutual();">Mutual!</div>
                <!-- input type="submit" class="button" style="display: inline;" value="Mutual!" onclick="mutual(); return false;" onsubmit="return false;" / -->
            </form>
        </div>
        <div class="howto">
            <h2 class="title"><br />How to become my mutual friend?</h2>
            <center>
                <table cellspacing="5%" cellpadding="5%">
                    <tr>
                        <th><div class="setp">1</div></th>
                        <th><div class="detail" style="background-color: #6cf;"><a href="//osu.ppy.sh/u/<?=$uid;?>" target="_blank">Add me as friend.</a></div></th>
                    </tr>
                    <tr>
                        <th><div class="setp">2</div></th>
                        <th><div class="detail" style="background-color: #4e4;">Type your name.</div></th>
                    </tr>
                    <tr>
                        <th><div class="setp">3</div></th>
                        <th><div class="detail" style="background-color: #f99;">Click 'Mutual'!</div></th>
                    </tr>
                </table>
            </center>
            <br />
        </div>
        </center>
        <div class="footer">
            osu! Auto Mutual by <a class="footer" href="http://wa.vg">jebwizoscar</a>
            <br />
            Edit by <a class="footer" href="http://hazelzhu.com">Hazel_Zhu</a>
            <br />
            <del>Bug fix by <a class="footer" href="https://blog.dimension.moe/">ntzyz</a></del>
        </div>
    </body>
</html>
