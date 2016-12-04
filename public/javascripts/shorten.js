// javascript on the front end yeeeeah !
$(document).ready(function (){
    

$('.btn-shorten').on('click', function (){
    
    function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
    $(document.body).css("background-color", getRandomColor()); 
    
    $.ajax({
        url: '/api/shorten',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val()},
        success: function(data){
            
            var resultHTML = '<a class="result" href="' + data.shortUrl + '">' + data.shortUrl + '<a/>';
            $('#link').html(resultHTML);
            $('#link').hide().fadeIn('slow');
        }
    });

});
})