$(document).ready(function () {
    
    $('.btn-filter').on('click', function () {
        console.log('Modal')
        $('#filterModal').modal();
    })


    var callJson = function () {
        $.ajax({
            url: "./js/quotesData.json",

        }).done(function (res) {
            console.log(res);
            var qoutesTable = $('#table_quotes').DataTable({
                data: res,
                order: [],
                "oLanguage": {
                    "oPaginate": {
                        "sFirst": "<<",
                        "sPrevious": '<i class="fa fa-arrow-left" aria-hidden="true"></i> Prev', // This is the link to the previous page
                        "sNext": 'Next<i class="fa fa-arrow-right" aria-hidden="true"></i>', // This is the link to the next page
                        "sLast": ">>"
                    }
                },
                "autoWidth": false,
                "dom": '<"top row"<"col-md-3"><"col-md-5"i><"col-md-4"p>>rt<"bottom row"<"col-md-5"l><"col-md-3"i><"col-md-4"p>><"clear">',
                columns: [
                    {
                        data: null,
                        render: function (data, type, row) {
                            var $inputRadio = '<div class="form-check form-check-inline">'+
                                                '<label class="check-container">'+
                                                '<input type="radio" name="radio">'+
                                                '<span class="checkmark"></span>'+
                                                '</label>'+
                                                '</div>';
                            return $inputRadio;
                        },
                        orderable: false,
                        width: '10px',
                        
                    },
                    {
                        data: 'quoteNumber'                        
                    },
                    {
                        data: 'dateCreated'                        
                    },
                    {
                        data: 'insuredName'                        
                    },
                    {
                        data: 'brokerName'                        
                    },
                    { data: 'productType' },
                    { data: 'premium' },
                    { data: 'status' },
                    { data: 'createdBy' },
                    {
                        data: 'lastModifiedDate'                        
                    },
                    
                ]
            });

            $('#searchTable').keyup(function () {
                qoutesTable.search($(this).val()).draw();
            })
            var selectedRow = null;
            var $copyBtn = $('.copy');
            var selected = [];
            $('#table_quotes tbody').on('click', 'tr', function () {
                //console.log(qoutesTable.row(this).data());
                selectedRow = qoutesTable.row(this).data();
                var $this = $(this);
                //if ($this.find(':checkbox').is(':checked')) {
                //    $this.find(':checkbox').prop('checked', false);
                //} else {
                //    $this.find(':checkbox').prop('checked', true);
                //}
                var $radioBtn = $this.find('input[type="radio"]');
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');

                }
                else {
                    qoutesTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $radioBtn.prop('checked', true);
                }
                
                //$this.toggleClass('selected');
                $copyBtn.removeClass('d-none');

            });

            $copyBtn.on('click', function () {
                var array = [];
                var a = selectedRow;
                console.log(a);
            })
            

        });
    }

    var callJson2 = function () {
        $.ajax({
            url: "./js/due_soon.json",

        }).done(function (res) {
            console.log(res);
            var duesTable = $('#table_due_soon').DataTable({
                data: res,
                "oLanguage": {
                    "oPaginate": {
                        "sFirst": "<<",
                        "sPrevious": '<i class="fa fa-arrow-left" aria-hidden="true"></i> Prev', // This is the link to the previous page
                        "sNext": 'Next<i class="fa fa-arrow-right" aria-hidden="true"></i>', // This is the link to the next page
                        "sLast": ">>"
                    }
                },
                "dom": '<"top row"<"col-md-3"><"col-md-5"i><"col-md-4"p>>rt<"bottom row"<"col-md-5"l><"col-md-3"i><"col-md-4"p>><"clear">',
                columns: [
                    {
                        data: null,
                        render: function (data, type, row) {
                            var $inputRadio = '<div class="form-check form-check-inline">' +
                                '<label class="check-container">' +
                                '<input type="radio" name="copy">' +
                                '<span class="checkmark"></span>' +
                                '</label>' +
                                '</div>';
                            return $inputRadio;
                        },
                        orderable: false,
                        width: '1px'

                    },
                    {
                        data: 'quoteNo',
                        render: function (data, type, row) {
                            var $quote = '<a href="">' + data + '</a>';                            
                            return $quote;
                        },
                    },
                    { data: 'insuredName' },
                    {
                        data: 'expiringDays',
                        render: function (data, type, row) {
                            var $span = null;
                            if (data <= 30) {
                                $span = '<span class="red">' + data + '</span>';
                            } else {
                                $span = '<span>' + data + '</span>';
                            }
                            return $span;
                        },
                    },
                    { data: 'status' },
                    { data: 'createdBy' },
                    { data: 'ccRef' },
                    { data: 'brokerName' },
                    { data: 'brokerPostal' },
                ]
            });

            $('#searchTableDue').keyup(function () {
                duesTable.search($(this).val()).draw();
            })
            var selectedRow = null;
            var $copyBtn = $('.copy-due');
            $('#table_due_soon tbody').on('click', 'tr', function () {
                //console.log(qoutesTable.row(this).data());
                selectedRow = duesTable.row(this).data();
                var $this = $(this);
                $this.find(':radio').prop('checked', true);
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    duesTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }

                $copyBtn.removeClass('d-none');

            });

            $copyBtn.on('click', function () {
                console.log(selectedRow);
            })


        });
    }

    callJson();
    callJson2();
})


