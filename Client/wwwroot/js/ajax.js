/*$.ajax({
    url: "https://api.disneyapi.dev/characters"
}).done((result) => {
    console.log(result.data);
    //let text = "<li>" + result.data[3].name +"</li>"
    //$("#listDisney").html(text)
    let text = "";
    $.each(result.data, function (key, val) {
        text += `<tr>
                    <td>${key + 1}</td>
                    <td>${val.name}</td>
                    <td><button class="btn btn-primary" onclick="detail('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalDisney">Detail</button></td>
                </tr>`;
        //console.log(key);
    })
    $("#tbodyDisney").html(text)

});*/


function detail(stringUrl) {
    $.ajax({
        url: stringUrl
    }).done((result) => {
        console.log(result);
        $("h1#exampleModalLabel.modal-title").html(result.name);


        $(".modal-body").html(`
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 my-auto img-hover-zoom">
                         <center><img src="` + result.imageUrl + `" class="img-fluid alt="my-auto"/></center>
                    </div>
                    <div class="col-md-10">
                        <ul class="list-group list-group-horizontal">
                            <li class="list-group-item list-group-item-secondary"><b>Name</b>:` + result.name + `</li>
                            <li class="list-group-item list-group-item-info"><b>tvShow</b>:` + result.tvShows + `</li>
                            <li class="list-group-item list-group-item-info"><b>id</b>:` + result._id + `</li>
                            <li class="list-group-item list-group-item-info"><b>Game</b>:` + result.videoGames + `</li>
                        </ul>
                        </div>
                    `) 
    });

}

$(document).ready(function () {
    $('#myTable').DataTable({
        ajax: {
            url: "https://api.disneyapi.dev/characters", //=> CORS
            dataSrc: "data"
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: "name" },
            {
                data: "url",
                render: function (data, type, row) {
                    return `<button class="btn btn-primary"onclick="detail('${data}')"data-bs-toggle="modal"data-bs-target="#modalDisney">Detail</button>`;
                }
            },
        ],
        dom: '<"top"iflp<"clear">>rt<"bottom"B<"clear">>',
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="fa fa-files-o"></i>',
                titleAttr: 'Copy'
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i>',
                titleAttr: 'Excel'
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"></i>',
                titleAttr: 'CSV'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i>',
                titleAttr: 'PDF'
            }
        ]
       //"bDestory": true 
    });
});

