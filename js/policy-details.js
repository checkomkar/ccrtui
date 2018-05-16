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
    $radioEquipmentGroup.on('change', function (e) {
        console.log(e);
        if (e.target.value === '1') {
            $('#refer-quote').modal();
        }
    });

    $('#refer-to-underwriter').on('click', function (e) {
        e.preventDefault();
        $('#refer-quote').modal();
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

    var validateRadio = function () {
        var equipBreakIsValid, riskIsValid, riskSpoilIsValid, projectBegunIsValid;
        //check all radio buttons
        if (($("input[name='equipment-break']:checked").length > 0)) {
            // one ore more checkboxes are checked
            $("input[name='equipment-break']").parents('.q-content').find('label.error').addClass('d-none');
            equipBreakIsValid = true;
        }
        else {
            // no checkboxes are checked
            $("input[name='equipment-break']").parents('.q-content').find('label.error').removeClass('d-none');
            equipBreakIsValid = false;
        }
        if (($("input[name='risk']:checked").length > 0)) {
            // one ore more checkboxes are checked
            $("input[name='risk']").parents('.q-content').find('label.error').addClass('d-none');
            riskIsValid = true;
        }
        else {
            // no checkboxes are checked
            $("input[name='risk']").parents('.q-content').find('label.error').removeClass('d-none');
            riskIsValid = false;
        }
        if (($("input[name='risk-spoil']:checked").length > 0)) {
            // one ore more checkboxes are checked
            $("input[name='risk-spoil']").parents('.q-content').find('label.error').addClass('d-none');
            riskSpoilIsValid = true;
        }
        else {
            // no checkboxes are checked
            $("input[name='risk-spoil']").parents('.q-content').find('label.error').removeClass('d-none');
            riskSpoilIsValid = false;
        }
        if (($("input[name='project-begun']:checked").length > 0)) {
            // one ore more checkboxes are checked
            $("input[name='project-begun']").parents('.q-content').find('label.error').addClass('d-none');
            projectBegunIsValid = true;
        }
        else {
            // no checkboxes are checked
            $("input[name='project-begun']").parents('.q-content').find('label.error').removeClass('d-none');
            projectBegunIsValid = false;
        }

        if (equipBreakIsValid || riskIsValid || riskSpoilIsValid || projectBegunIsValid) {
            return true;
        } else {
            return false;
        }
    }

    $("#smartwizard").on("leaveStep", function (e, anchorObject, stepNumber, stepDirection) {
        console.log(validatorStep2);
        var selectInsuredTypeIsValid = validatorStep2.element('#select-insured-type');
        var policyLimit = validatorStep2.element('#policy-limit');
        var selectOccupancy = validatorStep2.element('#select-occupancy');
        var bestDescription = validatorStep2.element('#best-description');
        var projectDuration = validatorStep2.element('#project-duration');
        var softCost = validatorStep2.element('#soft-cost');
        var extraExpense = validatorStep2.element('#extra-expense');
        var startupDelay = validatorStep2.element('#startup-delay');
        var riskLocations = validatorStep2.element('#risk-locations');

        

        console.log(selectInsuredTypeIsValid);
        console.log(stepNumber)

        

        if (stepNumber == 1) {
            //check all inputs and dropdownds
            validateRadio();
            if (selectInsuredTypeIsValid == false || policyLimit == false ||
                selectOccupancy == false || bestDescription == false || projectDuration == false
                || softCost == false || extraExpense == false || startupDelay == false || riskLocations == false
                || validateRadio() == false) {

                return false;
            } else {
                return true;
            }
            
            
        }
        $('input[type="radio"]').on('change', validateRadio);

    })

    //$('select').on('change', function () {
    //    console.log('select cahge')
    //    var $this = $(this);
    //    setTimeout(function () {
    //        console.log($this.hasClass('valid'))
    //        if ($this.hasClass('valid')) {
    //            $this.removeClass('is-invalid');
    //        }
    //    }, 0)
        
    //})

    var addLocGridRow = function () {
        var locGridHtml = $.parseHTML($('#location-grid-row').html())[1];
        
        console.log(locGridHtml)
        if (locCounter >= 10) {
            return;
        } else {
            $(locGridHtml).attr("id", "table" + locCounter++);
            $('.location-tables-section').append(locGridHtml);
        }
        
    }
    var locCounter = 1;
    addLocGridRow();
    $('#add-loc-main').on('click', function () {
        addLocGridRow();
    })

})