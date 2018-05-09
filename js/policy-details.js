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
})