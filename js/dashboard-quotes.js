$(document).ready(function () {
    
    $('.btn-filter').on('click', function () {
        console.log('Modal')
        $('#filterModal').modal();
    })


    var callJson = function () {
        $.ajax({
            url: "./js/quotesData1.json",

        }).done(function (res) {
            console.log(res);
            var qoutesTable = $('#table_quotes').DataTable({
                data: res,
                colReorder: true,
                order: [],
                //"stateSave": true,
                //"stateDuration": 1800, 
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
                        data: 'quoteNumber',
                        render: function (data, type, row) {
                            var $quote = '<a href="">' + data + '</a>';
                            return $quote;
                        },
                    },
                    {
                        data: 'insuredName'
                    },
                    {
                        data: 'lastModifiedDate'
                    },
                    {
                        data: 'expireInDays',
                        render: function (data, type, row) {
                            var $span = null;
                            if (data <= 30) {
                                $span = '<span class="red">' + data + '</span>';
                            } else {
                                $span = '<span>' + data + '</span>';
                            }
                            return $span;
                        }
                    },
                    {
                        data: 'brokerName'
                    },
                    { data: 'productType' },
                    { data: 'premium' },
                    {
                        data: 'status',
                        render: function (data, type, row) {
                            var $span = null;
                            if (data) {
                                $span = '<span>Referred</span>';
                            } else {
                                $span = '<span>Quoted</span>';
                            }
                            return $span;
                        }
                    },
                    //{
                    //    data: 'dateCreated'                        
                    //},
                    { data: 'createdBy' }
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
                    $radioBtn.prop('checked', false);
                    $copyBtn.addClass('d-none');
                }
                else {
                    qoutesTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $radioBtn.prop('checked', true);
                    $copyBtn.removeClass('d-none');
                }
                
                //$this.toggleClass('selected');
                

            });

            $copyBtn.on('click', function () {
                var array = [];
                var a = selectedRow;
                console.log(a);
                alert(JSON.stringify(a))
                
            })

            $('#remove').on('click', function (e) {
                e.preventDefault();
                qoutesTable.rows('.selected').deselect();
                //console.log(qoutesTable.colReorder.reset())
                qoutesTable.colReorder.reset();
                
                //callJson();
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

    jQuery.fn.dataTableExt.oApi.fnSortNeutral = function (oSettings) {
        /* Remove any current sorting */
        oSettings.aaSorting = [];

        /* Sort display arrays so we get them in numerical order */
        oSettings.aiDisplay.sort(function (x, y) {
            return x - y;
        });
        oSettings.aiDisplayMaster.sort(function (x, y) {
            return x - y;
        });

        /* Redraw */
        oSettings.oApi._fnReDraw(oSettings);
    };
})


