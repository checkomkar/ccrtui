$(document).ready(function () {
    
    
    var qoutesTable = null;
    var groupTable = null;

    var callJson = function () {
        $.ajax({
            url: "./js/quotesData1.json",

        }).done(function (res) {
            //console.log(res);
            qoutesTable = $('#table_quotes').DataTable({
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

            $('#removeFilters').on('click', function (e) {
                e.preventDefault();
                //qoutesTable.rows('.selected').deselect();
                //console.log(qoutesTable.colReorder.reset())
                //qoutesTable.colReorder.reset();
                //qoutesTable.columns([2])
                //    .search('Ritchie Group')
                //.draw();
                

                qoutesTable.search('')
                .columns().search('')
                .draw();
                //callJson();
            });

            $('#createQuote').on('click', function (e) {
                e.preventDefault();
                
                var arr = ['Volvo', 'Mazda', 'Saturn', 'quoted'];
                var mergedArr = arr.join('|');
                qoutesTable.columns([6,8])
                    .search(mergedArr, true)
                    .draw();
            })



        });
    }

    var callJson2 = function () {
        $.ajax({
            url: "./js/due_soon.json",

        }).done(function (res) {
            //console.log(res);
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

    var callJson3 = function () {
        console.log("Hellooooo")
        $.ajax({
            url: "./js/group.json"

        }).done(function (res) {
            console.log(res);
            groupTable = $('#tableGroups').DataTable({
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
                            var $inputRadio = '<div class="form-check form-check-inline">' +
                                '<label class="check-container">' +
                                '<input id="selectGroup" type="radio" name="radio">' +
                                '<span class="checkmark"></span>' +
                                '</label>' +
                                '</div>';
                            return $inputRadio;
                        },
                        orderable: false,
                        width: '1%',

                    },
                    {
                        data: 'programName',   
                        width: '24%'                    
                    },
                    {
                        data: 'productType',
                        width: '25%'
                    },
                    {
                        data: 'status',
                        width: '25%'
                    },
                    
                    { 
                        data: 'createdOn',
                        width: '25%'
                    }
                ]
            });

            $('#searchTableGroup').keyup(function () {
                groupTable.search($(this).val()).draw();
            })
            var selectedRow = null;
            var $copyBtn = $('.copy');
            var selected = [];
            $('#tableGroups tbody').on('click', 'tr', function () {
                //console.log(qoutesTable.row(this).data());
                selectedRow = groupTable.row(this).data();
                var $this = $(this);                
                var $radioBtn = $this.find('input[type="radio"]');
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $radioBtn.prop('checked', false);
                    $copyBtn.addClass('d-none');
                }
                else {
                    groupTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $radioBtn.prop('checked', true);
                    $copyBtn.removeClass('d-none');
                }
            });
        });
    }

    callJson();
    callJson2();
    callJson3();

    var filter = {
        date: {
            dcFrom: '',
            dcTo: ''
        },
        prodType: null,
        status: [],
        brokerName: []        
    }

    //var app = new Vue({
    //    el: '#appDashboard',
    //    data: {
            
    //    },
    //    methods: {
    //        appliedFilters: function (e) {
    //            console.log(this.$data.filter);
    //        }
    //    }
    //});

    $('.btn-filter').on('click', function (e) {
        console.log('Modal')
        $('#filterModal2').modal();
    });

    $(document).on('click', '#applyFilters', function (e) {
        filter.status = [];
        filter.brokerName = [];
        $.each($("input[name='status']:checked"), function () {
            filter.status.push($(this).val());
        });
        $.each($("input[name='bname']:checked"), function () {
            filter.brokerName.push($(this).val());
        });
        
        if (filter.status.length != 0 || filter.brokerName.length != 0) {
            console.log(filter)
            $('#filterApp').removeClass('d-none');
            $('#filterApp').find('#status').html('');
            $('#filterApp').find('#brokerName').html('');
            $('#filterApp').find('#status').append('Status')
            $('#filterApp').find('#brokerName').append('Broker Name')
            $.each(filter.status, function (k, v) {
                var $span = '<span class="badge badge-primary" data-group="status" data-value="'+v+'">' + v + '<span class="times del-filter"> &times;</span></span>';                
                $('#filterApp').find('#status').append($span)
            });

            
            $.each(filter.brokerName, function (k, v) {
                var $span = '<span class="badge badge-primary" data-group="brokerName" data-value="' + v + '">' + v + '<span class="times del-filter"> &times;</span></span>';                
                $('#filterApp').find('#brokerName').append($span)
            });
            var mergedArr = $.merge(filter.brokerName, filter.status)
            mergedArr = mergedArr.join('|');
            console.log(mergedArr);
            qoutesTable.columns([5, 8])
                .search(mergedArr, true)
                .draw();

        } else {
            $('#filterApp').addClass('d-none');
            qoutesTable.search('')
                .columns().search('')
                .draw();
        }
    })

    $('#removeFilters').on('click', function (e) {
        e.preventDefault();
        filter.status = [];
        filter.brokerName = [];
        $('#filterApp').addClass('d-none');
    });

    $(document).on('click', 'span.del-filter',  function (e) {
        var $this = $(this);
        
        var val = $this.closest('.badge').attr('data-value');
        var group = $this.closest('.badge').attr('data-group');
        if (group == 'status') {
            //_.remove(filter.status, val);
            var merged = null;
            
            filter.status = $.grep(filter.status, function (v) {
                return v != val;
            })
            merged = filter.status.join('|');
            qoutesTable.columns([8])
                .search(merged, true)
                .draw();
            console.log(filter, merged)
        }

        if (group == 'brokerName') {
            //_.remove(filter.brokerName, val);
            var merged = null;
            filter.brokerName = $.grep(filter.brokerName, function (v) {
                return v != val;
            })
            merged = filter.brokerName.join('|');
            qoutesTable.columns([5])
                .search(merged, true)
                .draw();
            console.log(filter, merged);
        }
        
        $this.closest('.badge').remove();
        console.log($(document).find('.badge').length);
        if ($(document).find('.badge').length == 0) {
            qoutesTable.columns()
                .search('')
                .draw();
            $this.closest('.badge').remove();
            $(document).find('.filter-group').html('');
            $('#filterApp').addClass('d-none');
            return;
        }
    });

    $(document).on('click', '#assign-group-btn', function(e){
        $(document).find('.admin-part-1').addClass('d-none');
        $(document).find('.admin-part-2').removeClass('d-none');
    })
})


