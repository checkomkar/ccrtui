$(document).ready(function () {
    var $riskLocationdd = $('#risk-locations');
    var $riskTables = $('.tables-section');
    $riskLocationdd.on('change', function (e) {
        console.log(e.target.value)
        if (e.target.value === "") {
            $riskTables.addClass("d-none");
        } else {
            $riskTables.removeClass("d-none");
            
        }

    })
    var $radioEquipmentGroup = $('input[name=equipment-break]')
    $('input[name=equipment-break]').on('change', function (e) {
        console.log(e);
        if (e.target.value === '1') {
            $('#refer-quote').modal();
        }
    })

    $('#refer-quote').on('hidden.bs.modal', function () {
        //$radioEquipmentGroup.prop('checked', false);
    })

    $('#cancel-refer-quote, #close-refer-quote').on('click', function (e) {
        $radioEquipmentGroup.prop('checked', false);
    })

    $('.change-occupancy').on('click', function (e) {
        e.preventDefault();
        $('#selectOccupancyModal').modal();
    })

    $('.save-table').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        console.log($this.text())
        var innerText = $this.text()
        if (innerText == 'Save') {
            $this.text('Edit');
            $this.closest('table').find('input, select').each(function () {
                $(this).prop('disabled', true);
            });
        } else {
            $this.text('Save');
            $this.closest('table').find('input, select').each(function () {
                $(this).prop('disabled', false);
            });
        }
        
    })
    //$('.save-table').closest('table input').prop('disabled', true);

    var validatorStep2 = $('.step-2').validate({
        rules: {
            'equipment-break': { required: true}
        }
    });

    $("#smartwizard").on("leaveStep", function (e, anchorObject, stepNumber, stepDirection) {
        console.log(validatorStep2);
        var selectInsuredTypeIsValid = validatorStep2.element('#select-insured-type');
        var policyLimit = validatorStep2.element('#policy-limit');
        console.log(selectInsuredTypeIsValid);
        console.log(stepNumber)
        if(stepNumber == 1){
            if (($("input[name='equipment-break']:checked").length > 0)) {
                // one ore more checkboxes are checked
            }
            else {
                // no checkboxes are checked
                return false;
            }
        }
        

    })
})