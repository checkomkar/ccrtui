var resetStep3 = false;
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

    $('#refer-to-underwriter, #refer-quote-trigger').on('click', function (e) {
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

    //var validatorStep2 = $('.step-2').validate({
    //    rules: {
    //        'equipment-break': { required: true}
    //    }
    //});

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
    var stepNumberGlob = null;
    var stepDirectionGlob = null;
    $("#smartwizard").on("leaveStep", function (e, anchorObject, stepNumber, stepDirection) {
        //console.log(validatorStep2);
        //console.log(selectInsuredTypeIsValid);
        console.log(stepNumber)
        console.log(stepDirection)
        stepNumberGlob = stepNumber;
        stepDirectionGlob = stepDirection;
        if (stepNumber == 1) {
            //var selectInsuredTypeIsValid = validatorStep2.element('#select-insured-type');
            //var policyLimit = validatorStep2.element('#policy-limit');
            //var selectOccupancy = validatorStep2.element('#select-occupancy');
            //var bestDescription = validatorStep2.element('#best-description');
            //var projectDuration = validatorStep2.element('#project-duration');
            //var softCost = validatorStep2.element('#soft-cost');
            //var extraExpense = validatorStep2.element('#extra-expense');
            //var startupDelay = validatorStep2.element('#startup-delay');
            //var riskLocations = validatorStep2.element('#risk-locations');
            //check all inputs and dropdownds
            //validateRadio();
            //if (selectInsuredTypeIsValid == false || policyLimit == false ||
            //    selectOccupancy == false || bestDescription == false || projectDuration == false
            //    || softCost == false || extraExpense == false || startupDelay == false || riskLocations == false
            //    || validateRadio() == false) {

            //    return false;
            //} else {
            //    return true;
            //}
            
            
        }
        //$('input[type="radio"]').on('change', validateRadio);

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
        if ($('.loc-grid-table').length >= 10) {
            return;
        } else {
            $(locGridHtml).addClass('loc-grid-table');
            $(locGridHtml).attr("id", "table" + locCounter++);
            //console.log($(locGridHtml).index())
            $('.location-tables-section').append(locGridHtml);
            $(function () {
                $(document).find('[data-toggle="tooltip"]').tooltip()
            })
        }
        
    }

    var removeLocGridRow = function () {
        locCounter--;
    }

    var locCounter = 1;
    addLocGridRow();
    $('#add-loc-main').on('click', function () {
        addLocGridRow();
        
    })

    $(document).on('click', '.remove-loc-grid', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($('.loc-grid-table').length == 1) {
            return;
        }
        $this.closest('[data-toggle="tooltip"]').tooltip('hide')
        $this.closest('.loc-grid-table').remove();
        
        //console.log($('.loc-grid-table').length)
        console.log($this.closest('.loc-grid-table').index())
        //console.log($this.closest('.loc-grid-table').index())
    });

    $(document).on('change', '.state-dd', function (e) {
        var $this = $(this);
        console.log($this.closest('.loc-grid-table').index())
    })


    $('input[type="radio"]').keydown(function (e) {
        var arrowKeys = [37, 38, 39, 40];
        if (arrowKeys.indexOf(e.which) !== -1) {
            $(this).blur();
            return false;
        }
    });

    

    $(document).on('change', 'input[type="text"], input[type="radio"], input[type="select"], textarea', function (e) {
        console.log(stepDirectionGlob, stepNumberGlob)
        if (stepNumberGlob == 2 && stepDirectionGlob == 'backward'){
            resetStep3 = true;
        }
        
    })

})