$(document).ready(function () {
    
    
    var callJson = function () {
        $.ajax({
            url: "./js/quotesData.json",

        }).done(function (res) {
            console.log(res);
            var qoutesTable = $('#table_quotes').DataTable({
                data: res,
                "dom": '<"top"ip>rt<"bottom"lp><"clear">',
                columns: [
                    {
                        data: null,
                        render: function (data, type, row) {
                            var $inputRadio = '<input type="radio" name="selectRow" value="' + JSON.stringify(row) + '" />';
                            return $inputRadio;
                        },
                        orderable: false

                    },
                    { data: 'quoteNumber' },
                    { data: 'dateCreated' },
                    { data: 'insuredName' },
                    { data: 'brokerName' },
                    { data: 'productType' },
                    { data: 'premium' },
                    { data: 'status' },
                    { data: 'createdBy' },
                    { data: 'lastModifiedDate' },
                    
                ]
            });

            $('#searchTable').keyup(function () {
                qoutesTable.search($(this).val()).draw();
            })
        });
    }

    callJson();
})