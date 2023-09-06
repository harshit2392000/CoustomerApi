$(document).ready(function() {
     $('#authenticateBtn').click(function() {
        var login_id = $('#login_id').val();
        var password = $('#password').val();
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp',
            type: 'POST',
            data: JSON.stringify({
                login_id: login_id,
                password: password
                
            }),
            contentType: 'application/json',
            success: function(data) {
                
               let token = data.access_token;
                alert('Authentication successful! Token received.');
                localStorage.setItem('token',token);
                window.location.href= "getcustomer.html"
            },
            error: function(error) {
                
                alert('Authentication failed!');
            }
        });
    });









});

$(document).ready(function () {
    loadDataFromLocal();

    $("#tblData tbody").append(emptyRow); // adding empty row on page load 

    $("#btnAdd").click(function () {

      if ($("#tblData tbody").children().children().length == 1) {
        $("#tblData tbody").html("");
      }

      $("#tblData tbody").prepend(emptyNewRow); // appending dynamic string to table tbody
    });

    $('#tblData').on('click', '.btn-save', function () {

      const FName = $(this).parent().parent().find(".txtFName").val();
      const LName = $(this).parent().parent().find(".txtLName").val();
      const Add = $(this).parent().parent().find(".txtAdd").val();
      const City = $(this).parent().parent().find(".txtCity").val();
      const State = $(this).parent().parent().find(".txtState").val();
      const Email = $(this).parent().parent().find(".txtEmail").val();
      const Phone = $(this).parent().parent().find(".txtPhone").val();

      const userObj = {
        "first_name": FName,
        "last_name": LName,
        "address": Add,
        "city": City,
        "state": State,
        "email": Email,
        "phone": Phone
      }

      let token=localStorage.getItem('token');
      $.ajax({
        type: "POST",
        url: 'https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        contentType: false,
        processData: false,
        data: JSON.stringify(userObj),
        beforeSend: function () {

          $("#lrLoader").show();
        },
        success: function (results) {
          location.reload();
        }
      });


    });


    $('#tblData').on('click', '.btn-delete', function () {
        let token=localStorage.getItem('token');
      var Useruid = $(this).closest('tr').find('.uuidd').text();
      $.ajax({
        type: "POST",
        url: 'https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=' + Useruid,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        contentType: false,
        processData: false,
        success: function (results) {

          location.reload();

        }
      });

      // registering function for delete button  
      $(this).parent().parent().remove();
      if ($("#tblData tbody").children().children().length == 0) {
        $("#tblData tbody").append(emptyRow);
      }
    });


    $('#tblData').on('click', '.btn-cancel', function () {
      $(this).parent().parent().remove();
    });
    $('#tblData').on('click', '.btn-edit', function () {
      var $parentRow = $(this).closest('tr');
      
      // Extract data from the row being edited
      var uuid = $parentRow.find('.uuidd').text();
      var firstName = $parentRow.find('td:eq(1)').text();
      var lastName = $parentRow.find('td:eq(2)').text();
      var address = $parentRow.find('td:eq(3)').text();
      var city = $parentRow.find('td:eq(4)').text();
      var state = $parentRow.find('td:eq(5)').text();
      var email = $parentRow.find('td:eq(6)').text();
      var phone = $parentRow.find('td:eq(7)').text();

      // Replace the row with editable input fields
      $parentRow.html(
        '<td class="uuidd" style="display: none;">' + uuid + '</td>' +
        '<td><input type="text" class="form-control" value="' + firstName + '"></td>' +
        '<td><input type="text" class="form-control" value="' + lastName + '"></td>' +
        '<td><input type="text" class="form-control" value="' + address + '"></td>' +
        '<td><input type="text" class="form-control" value="' + city + '"></td>' +
        '<td><input type="text" class="form-control" value="' + state + '"></td>' +
        '<td><input type="text" class="form-control" value="' + email + '"></td>' +
        '<td><input type="text" class="form-control" value="' + phone + '"></td>' +
        '<td class="tdaction">' + rowUpdateButtons + '</td>'
      );
    });
    $('#tblData').on('click', '.btn-cancell', function() {
    var $parentRow = $(this).closest('tr');

    
    $parentRow.html(
      '<td class="uuidd" style="display: none;">' + $parentRow.find('.uuidd').text() + '</td>' +
      '<td>' + $parentRow.find('input:eq(0)').val() + '</td>' +
      '<td>' + $parentRow.find('input:eq(1)').val() + '</td>' +
      '<td>' + $parentRow.find('input:eq(2)').val() + '</td>' +
      '<td>' + $parentRow.find('input:eq(3)').val() + '</td>' +
      '<td>' + $parentRow.find('input:eq(4)').val() + '</td>' +
      '<td>' + $parentRow.find('input:eq(5)').val() + '</td>' +
      '<td>' + $parentRow.find('input:eq(6)').val() + '</td>' +
      '<td class="tdaction">' + rowButtons + '</td>'
    );
  });
    $('#tblData').on('click', '.btn-update', function (){
      var $parentRow = $(this).closest('tr');
      var Useruid = $(this).closest('tr').find('.uuidd').text();
      var firstName = $parentRow.find('input:eq(0)').val();
      var lastName = $parentRow.find('input:eq(1)').val();
      var address = $parentRow.find('input:eq(2)').val();
      var city = $parentRow.find('input:eq(3)').val();
      var state = $parentRow.find('input:eq(4)').val();
      var email = $parentRow.find('input:eq(5)').val();
      var phone = $parentRow.find('input:eq(6)').val();

      const userObj = {
        "first_name": firstName,
        "last_name": lastName,
        "address": address,
        "city": city,
        "state": state,
        "email": email,
        "phone": phone
      }

      let token=localStorage.getItem('token');
      $.ajax({
        type: "POST",
        url: 'https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid='+Useruid,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        contentType: false,
        processData: false,
        data: JSON.stringify(userObj),
        success: function (results) {
          location.reload();
        }
      });

     

    });
  });



function loadDataFromLocal() {
    let token=localStorage.getItem('token');
    $.ajax({
      type: "GET",
      url: 'https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      contentType: false,
      processData: false,
      data: "",
      success: function (results) {

        $("trLoader").remove();
        if ($("#tblData tbody").children().children().length == 1) {
          $("#tblData tbody").html("");
        }
        results.forEach(element => {
          let dynamiTR = "<tr>";
          dynamiTR = dynamiTR + "<td class='uuidd'>" + element.uuid + "</td>"
          dynamiTR = dynamiTR + "<td>" + element.first_name + "</td>"
          dynamiTR = dynamiTR + "<td>" + element.last_name + "</td>"
          dynamiTR = dynamiTR + "<td>" + element.address + "</td>"
          dynamiTR = dynamiTR + "<td>" + element.city + "</td>"
          dynamiTR = dynamiTR + "<td>" + element.state + "</td>"
          dynamiTR = dynamiTR + "<td>" + element.email + "</td>"
          dynamiTR = dynamiTR + "<td>" + element.phone + "</td>"
          dynamiTR = dynamiTR + "<td class='tdaction'>" + rowButtons + "</td>"
          dynamiTR = dynamiTR + "</tr>";
          $("#tblData tbody").append(dynamiTR);



        });
        $('#tblData th:first-child, #tblData td:first-child').hide();

      }


    });
}
