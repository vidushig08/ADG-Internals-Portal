//Add Point
var id = 2;
        $(function() {
        function addMore() {
            $('#newpoint').append('<label for="name" class="point">Point ' +id+ ':</label>');
            $('#newpoint').append('<textarea name="point1"></textarea><br><br>');
            id++;
            console.log(id);
        }           
        $("#plus").click(addMore);
        })


