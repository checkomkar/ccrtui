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

    $(".accordian-header").click(function () {
        var $this = $(this);
        var $icon = $this.find('i');
        if ($icon.hasClass('fa-plus')) {
            $icon.removeClass('fa-plus');
            $icon.addClass('fa-minus')
        } else if ($icon.hasClass('fa-minus')) {
            $icon.removeClass('fa-minus');
            $icon.addClass('fa-plus')
        }
        var $accordianContent = $this.closest('.accordian').find('.accordian-content');
        $accordianContent.toggleClass('d-none');
        
    });

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
    });

    $("#smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection) {
        console.log(stepNumber);
        if (stepNumber == 2) {
            $('.sw-btn-next').text('Finish').removeClass('disabled');
            $('.sw-btn-group-extra').addClass('d-none');
        } else {
            $('.sw-btn-next').html('Next <i class="fa fa-angle-right"></i>');
            $('.sw-btn-group-extra').removeClass('d-none');
        }
    });
    
})