$(document).ready(function(){

    setTimeout(function(){
        document.documentElement.scrollTop = 0;
        $(window).scrollTop(0);
    }, 1000)
    $(function () {
        $(document).find('[data-toggle="tooltip"]').tooltip()
    })

        
    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
        //alert("You are on step "+stepNumber+" now");
        var $prevBtn = $('.sw-btn-prev');
        if(stepPosition === 'first'){
            $("#prev-btn").addClass('hide');
            $prevBtn.hide();

        }else if(stepPosition === 'final'){
            $("#next-btn").addClass('hide');
                   
        }else{
            $("#prev-btn").removeClass('hide');
            $("#next-btn").removeClass('hide');
            $prevBtn.show();
        }
    });

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish')
                                        .addClass('btn btn-info')
                                        .on('click', function(){ alert('Finish Clicked'); });
    var btnCancel = $('<button></button>').text('Cancel')
                                        .addClass('btn btn-light')
                                        .on('click', function(){ $('#smartwizard').smartWizard("reset"); });


    // Smart Wizard
    $('#smartwizard').smartWizard({
            selected: 1,
            theme: 'default',
            transitionEffect:'fade',
            showStepURLhash: true,
            keyNavigation: false,
            backButtonSupport: false,
            //enableFinishButton: true,
            toolbarSettings: {toolbarPosition: 'bottom',
                                toolbarButtonPosition: 'end',
                                toolbarExtraButtons: [btnCancel]
                            },
            anchorSettings:{
                removeDoneStepOnNavigateBack: true,
                markAllPreviousStepsAsDone: true
            },
            lang: {  // Language variables
                next: 'Next', 
                previous: 'Previous'
            },
    });
    setTimeout(function () {
        $('.sw-btn-next').html('Next <i class="fa fa-angle-right"></i>');
        $('.sw-btn-prev').html('<i class="fa fa-angle-left"></i> Previous');
    },0)

    $('#triggerFile').on('click', function () {
        $('#validatedCustomFile1').click();
    })

    $('.sw-toolbar-bottom').addClass('row');
    $('.sw-btn-group-extra').addClass('col-md-2');
    $('.sw-btn-group').addClass('col-md-9');

    // External Button Events
    $("#reset-btn").on("click", function() {
        // Reset wizard
        $('#smartwizard').smartWizard("reset");
        return true;
    });

    $("#prev-btn").on("click", function() {
        // Navigate previous
        $('#smartwizard').smartWizard("prev");
        return true;
    });

    $("#next-btn").on("click", function() {
        // Navigate next
        $('#smartwizard').smartWizard("next");
        return true;
    });

    $('.postalcode').on('keyup', function (e) {
        var val = $(this).val();
        var newval = '';
        val = val.replace(/\s/g, '');
        e.preventDefault();
        for (var i = 0; i < val.length; i++) {
            if (i % 3 == 0 && i > 0) { newval = newval.concat(' ') };
            newval = newval.concat(val[i]);
        }
        $(this).val(newval);
    });

    $('#policy-limit').on('keyup', function () {
        var $this = $(this);
        var val = $this.val();
        if (val.indexOf('$') != 0) {
            val = "$" + val;
        }
        $this.val(val)
    })

    $('#smartwizard').smartWizard("theme", "arrows");

    var $selectProduct = $('.select-product');
            
    var $onSelectProduct = $('.on-select-product');
            
    $onSelectProduct.addClass("d-none");
    $('#smartwizard').smartWizard("reset"); 
    $selectProduct.on('change', function(e){
        console.log(e.target.value)
        if(e.target.value == '1' || e.target.value == '0' || e.target.value === ""){
            $onSelectProduct.addClass("d-none");
        }else{
            $onSelectProduct.removeClass("d-none");
            $('#select-product').removeClass('is-invalid')
        }

    })

    var commentJson = {comments:[
        {
            comment: "This is an example of a previous comments added by a user. This is an example of a previous comments added by a user.", 
            name: "- Summer Tuller  2/2/2017 23:11"
        },
        {
            comment: "This is an example of a previous comments added by a user. This is an example of a previous comments added by a user.", 
            name: "- Summer Tuller  2/2/2017 23:11"
        },
        {
            comment: "This is an example of a previous comments added by a user. This is an example of a previous comments added by a user.", 
            name: "- Summer Tuller  2/2/2017 23:11"
        },
        {
            comment: "This is an example of a previous comments added by a user. This is an example of a previous comments added by a user.", 
            name: "- Summer Tuller  2/2/2017 23:11"
        },
                
                
    ]}
    var template = $('#comments').html();
    var html = Mustache.to_html(template, commentJson);
    $('.show-comments-box').html(html);
            

    var validator = $( ".first-step" ).validate(/*{
                                                    rules: {
                                                    'select-product': {
                                                        required: true
                                                    },
                                                    'insuredName':{
                                                        required: true
                                                    },
                                                    'insuredPostalCode':{
                                                        required: true
                                                    },
                                                    'brokerName': {
                                                        required: true
                                                    }
                                                    }
                                                }*/);

            
    var callJson = function () {
        $.ajax({
            url: "./js/occ.json",
            
        }).done(function (res) {
            console.log(res);
            setModalValues(res)
        });
    }

    var setModalValues = function (result) {
        var div1 = document.getElementById('catID');
        var div3 = document.getElementById('occID');

        var json = JSON.parse(JSON.stringify(result));
        var jsonObject = result;//JSON.parse(json);

        var data1 = jsonObject.category;
        //console.log(data1);


        var ins_len = data1.length;
        //console.log(ins_len)
        setTimeout(function () {
            for (var i = 0; i < ins_len; i++) {
                var equ_col = data1[i];

                if (i == 0) {
                    div1.innerHTML += '<option class="selectcat" selected value="' + i + '">' + equ_col.category + '</option>';
                } else {
                    div1.innerHTML += '<option class="selectcat" value="' + i + '">' + equ_col.category + '</option>';
                }
            }

            //for (var j = 0; j < data1[0].occupancies.length; j++) {
            //    //console.log('subCat', data1[0].occupancies.length);
            //    var occ = data1[0].occupancies[j];
            //    div3.innerHTML += '<option value="' + j + '" occupancy_code_category_key=' + occ.occupancy_code_category_key + ' sub_program_key=' + occ.sub_program_key + '>' + occ.description + '</option>';
            //}

            $.each(data1[0].occupancies, function (index, occ) {
                var $catogoryItem = '<option value="' + index + '" occupancy_code_category_key="' + occ.occupancy_code_category_key + '" sub_program_key="' + occ.sub_program_key + '">' + occ.description + '</option>';
                //console.log($.parseHTML($catogoryItem));
                $('#occID').append($catogoryItem);
                
            });

        }, 0)
    }


    $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
        //var l = confirm("Do you want to leave the step "+stepNumber+"?");
        var insuredNameIsValid = validator.element('#insuredName');
        var insuredPostalCodeIsValid = validator.element('#insuredPostalCode');
        var brokerNameIsValid = validator.element('#brokerName');
        var selectProductIsValid = validator.element('#select-product');
        //var b = validator.element('#select-product');
        //console.log($('.first-step').valid());

        var fields = [insuredNameIsValid, insuredPostalCodeIsValid, brokerNameIsValid];

        //var selectedProduct = null;

        console.log(selectProductIsValid)
        var selectProduct = $('#select-product option:selected').val();
        var selectProductFlag = null;
        if(selectProduct == 1){
            selectProductFlag = false;
        }else{
            selectProductFlag = true;
        }


        

        if(insuredNameIsValid == false || insuredPostalCodeIsValid == false ||
            brokerNameIsValid == false)
            return false;

        callJson();

    });

    
});