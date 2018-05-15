$(document).ready(function(){

    setTimeout(function(){
        document.documentElement.scrollTop = 0;
        $(window).scrollTop(0);
    }, 1000)
            
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
                    selected: 0,
                    theme: 'default',
                    transitionEffect:'fade',
                    showStepURLhash: true,
                    toolbarSettings: {toolbarPosition: 'bottom',
                                      toolbarButtonPosition: 'end',
                                      toolbarExtraButtons: [btnCancel]
                                    },
                    anchorSettings:{
                        removeDoneStepOnNavigateBack: true,
                        markAllPreviousStepsAsDone: true
                    },
                    lang: {  // Language variables
                        next: 'Next >', 
                        previous: '< Previous'
                    },
            });


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


                if(insuredNameIsValid == false){
                    $('#insuredName').addClass('is-invalid');
                }else{
                    $('#insuredName').removeClass('is-invalid');
                }

                if(insuredPostalCodeIsValid == false){
                    $('#insuredPostalCode').addClass('is-invalid');
                }else{
                    $('#insuredPostalCode').removeClass('is-invalid');
                }

                if(brokerNameIsValid == false){
                    $('#brokerName').addClass('is-invalid');
                }else{
                    $('#brokerName').removeClass('is-invalid');
                }

                if(selectProductIsValid == false){
                    $('#select-product').addClass('is-invalid')
                    return false;
                }else{
                    $('#select-product').removeClass('is-invalid')
                }

                if(insuredNameIsValid == false || insuredPostalCodeIsValid == false ||
                    brokerNameIsValid == false)
                    return false;

                /*try{
                    var a = validator.element('#insuredName');
                    var b = validator.element('#select-product');
                    console.log(a)
                    if(a == false) throw "required"
                }
                catch(ex){

                }*/

            });

            /*$('.sw-btn-next').on('click', function(){
                var l = validator.element('#insuredName');
                console.log(l);
                console.log(validator)
                if(validator == false) return;
                //return;
            })*/
            

            /*$("#theme_selector").on("change", function() {
                // Change theme
                $('#smartwizard').smartWizard("theme", $(this).val());
                return true;
            });

            // Set selected theme on page refresh
            $("#theme_selector").change();*/
        });