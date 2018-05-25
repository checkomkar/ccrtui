$(document).ready(function () {
    var $quoteRadio = $('.quote-radio');
    
    var disableInputs = function (ele) {
        $.each($('.quote-input'), function (k, v) {
            $(v).prop('disabled', true);
        })
        $.each($('.quote-radio-section'), function (k, v) {
            $(v).removeClass('blue-border');            
        })
    }

    

    disableInputs();
    $quoteRadio.on('click', function () {
        console.log('xxxxxx');        
        var $this = $(this);
        var $quoteInputs = $this.closest('.quote-radio-section').find('.quote-input');
        var $getClosestTd = $this.closest('.quote-radio-section');
        disableInputs($this);
        if ($this.prop('checked')) {
            console.log($quoteInputs.length);
            $getClosestTd.addClass('blue-border');
            $.each($quoteInputs, function (k, v) {
                console.log(v)
                $(v).prop('disabled', false);

            })
        }
    })
    
})