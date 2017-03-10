//+++++++++++  START HERE  +++++++++
// non-DOM related declarations *
/* global $ Cookies sortStudentData*/

let students = [];
let deletedStudents = [];

let schoolYears = {
    1: "Freshman",
    2: "Sophmore",
    3: "Junior",
    4: "Senior"
}

//======+ getYearInSchool +======
// returns the name of the grade given the s_year in school
function getYearInSchool(grade) {
    return schoolYears[grade];
}

function popStudentID(student) {
    let id = student.id;
    delete student.id;
    return id;    
}




//============================================================================
//=========================***// START HERE!!! //***==========================
//============================================================================
$(document).ready(function() {


    // Gets the students to display
    let studentList;
    let getStudentCalls = [];
    
    $.get('/api/v1/students.json', function(data) {
        studentList = data;
    }).done(function() {


    // For 10 students, get the info
        for (let i = 0; i < 10; i++) {
            getStudentCalls.push($.get(`/api/v1/students/${studentList[i]}.json`, function(student) {
                student.id = studentList[i];
                students.push(student);
            }));
        }
        
        
        // When all 10 calls are made, display the data
        $.when(...getStudentCalls).done(function() {
            // console.log(students);
            displayStudentData();
            setViewFromCookies();
        });
    });

//=======================// DEBUGGING //========================
//===============================================================

// Debugging the Cookies
// $('#clearCookies').click(function() {
//     Cookies.remove('currView');
//     Cookies.remove('col');
//     Cookies.remove('sorted');
// });
//=======^===========^===========^==================^============

    
//============================// MODALS //============================
//====================================================================



//-----------------------//    ADD NEW STUDENT MODAL    //----------------------

    $('#addStudentBut').click(function() {
        
        $('#saveButtonDiv').empty();
        $('#saveButtonDiv').html('<button id="formSubmit" type="submit" class="btn btn-success" form="studentForm" value="Submit">Submit</button>');
        
        $('#studentForm').find('input, select').val('');
        $('#studentFormModal').modal();
        
        $('#formSubmit').click(function() {
                let newStu = {};
                
                newStu.fname = $('#inputFirstName').val();
                newStu.lname = $('#inputLastName').val();
                newStu.phone = $('#inputPhone').val();
                newStu.startDate = $('#inputStartDate').val();
                newStu.s_year = $('#yearInSchool').val();
                newStu.street = $('#inputAddressL1').val();
                newStu.city =  $('#inputCity').val();
                newStu.state = $('#inputState').val();
                newStu.zip = $('#inputZip').val();
                
                
                $('#studentForm').submit(newStudentPost(newStu));
                $('#studentFormModal').modal('hide');
            });
        
    });

    // Handles POSTing the new student
    function newStudentPost(stu) {
        $.post(`/api/v1/students`, stu, function(newID) {
            stu.id = newID; // assign new ID to the student being restored
            students.push(stu);
        });
        return false; 
    }






//-----------------------//   EDIT STUDENT MODAL   //------------------------ 
    function editStudentClick(element) {
        $(element).click(function() {
            let selectedStu = students[$(this).parent().attr('id')];

            // $('#saveButtonDiv').empty();
            $('#saveButtonDiv').html(`<button id="formSubmit" type="submit" class="btn btn-success" form="studentForm" value="Submit">Submit</button>`);

            $('#inputFirstName').val(selectedStu.fname);
            $('#inputLastName').val(selectedStu.lname);
            $('#inputPhone').val(selectedStu.phone);
            $('#inputStartDate').val(selectedStu.startDate);
            $('#yearInSchool').val(selectedStu.s_year);
            $('#inputAddressL1').val(selectedStu.street);
            $('#inputCity').val(selectedStu.city);
            $('#inputState').val(selectedStu.state);
            $('#inputZip').val(selectedStu.zip);

            $('#studentFormModal').modal();

            // Build a click handler for the submit
            $('#formSubmit').click(function() {
                
                selectedStu.fname = $('#inputFirstName').val();
                selectedStu.lname = $('#inputLastName').val();
                selectedStu.phone = $('#inputPhone').val();
                selectedStu.startDate = $('#inputStartDate').val();
                selectedStu.s_year = $('#yearInSchool').val();
                selectedStu.street = $('#inputAddressL1').val();
                selectedStu.city =  $('#inputCity').val();
                selectedStu.state = $('#inputState').val();
                selectedStu.zip = $('#inputZip').val();
                
                //$('#studentForm').submit(editStudentPut(selectedStu));
                editStudentPut(selectedStu);
                $('#studentFormModal').modal('hide');
            });

        });
    }

    $('#studentFormModal').on('hidden.bs.modal', function() {
            $('#saveButtonDiv').empty();
            displayStudentData();
        });
    
    // Handles PUTting the student back to the Server
    function editStudentPut(stu) {
        let editedStudent = JSON.parse(JSON.stringify(stu));
        $.ajax({
                url: `/api/v1/students/${popStudentID(editedStudent)}.json`,
                type: 'PUT',
                data: editedStudent
            });
        //return false;
    }

    



//------------------------//   DELETE CONFIRM MODAL   //------------------------ 

    function deleteConfirmClick(element) {
        $(element).click(function() {
            let selectedStu = students[$(this).parent().attr('id')];

            $('#deleteButtonDiv').html('<button id="confirmDeleteButton" type="button" class="btn btn-danger" data-dismiss="modal">DELETE</button>');

            $('#studentToDelete').html(`<tr>
                                            <td> ${selectedStu.lname}, ${selectedStu.fname} </td>
                                            <td class="hidden-xs"> ${selectedStu.startDate} </td>
                                            <td class="hidden-sm hidden-xs">${selectedStu.city}</td>
                                        </tr>`);
            $('#confirmDelModal').modal({
                backdrop: 'static',
                keyboard: false
            });


            $('#confirmDeleteButton').click(function() {
                deletedStudents.push(selectedStu);
                students.splice(students.indexOf(selectedStu), 1);

                // DELETE AJAX
                $.ajax({
                        url: `/api/v1/students/${selectedStu.id}.json`,
                        type: 'DELETE'
                    });
            });
        });
    }
    //******* ON Delete Modal Close, remove the DELETE button, so it can't fire again *****
    $('#confirmDelModal').on('hidden.bs.modal', function() {
        $('#deleteButtonDiv').empty();
        displayStudentData();
    });






//---------------------------//  RESTORE STUDENT MODAL  //---------------------------
    $('#restoreStudentBut').click(function() {
        // Build the table to display in the modal
        createDeletedTable();
        // Display modal
        $('#studentRestoreModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    //******* ON Delete Modal Close, remove the RESTORE table, so it can't fire without modal *****
    $('#studentRestoreModal').on('hidden.bs.modal', function() {
        $('#restoreStudentTable').empty();
        displayStudentData();
    });

    // Handles the restore button clicks. Pushes deleted student into current students
    $(document).on('click', '.restCol', function() {
        let studentIndex = $(this).parent().attr('id').replace(/\D/g, '');
        
        // Make deep copy of student to send back and remove the ID for the server
        let studentToSend = JSON.parse(JSON.stringify(deletedStudents[studentIndex]));
        delete studentToSend.id;
            
        // The server will post a new student and send back the new ID for that student. 
        $.post(`/api/v1/students`, studentToSend, function(newID) {
            deletedStudents[studentIndex].id = newID; // assign new ID to the student being restored
            students.push(deletedStudents[studentIndex]);
        })
        .done(function() {
            deletedStudents.splice(studentIndex, 1);
            // console.log(students);
            createDeletedTable();
        });
    });


    // Used to display the deleted students table to restore them.
    function createDeletedTable() {
        $('#restoreStudentTable').empty();
        $(deletedStudents).each(function(index, student) {
            $('#restoreStudentTable').append(`<tr id="${student.fname}${index}">
                                                    <td> ${student.lname}, ${student.fname} </td>
                                                    <td class="hidden-xs"> ${student.startDate} </td>
                                                    <td class="hidden-md hidden-sm hidden-xs">${student.city}</td>
                                                    <td class="restCol text-center"><div class="glyphicon glyphicon-repeat restorItemButton"></div></td>
                                                </tr>`);
        });
    }
//-------------------------// ^^^   END of RESTORE MODAL   ^^^ //-------------------------






//------------------------//    STUDENT INFO MODAL    //------------------------
    function studentDataModalClick(pageElement) {
        $(pageElement).click(function() {

            let studentIndex = $(this).parent().attr('id'); // uses the div-id from when element was created to get which one it was. 
            studentIndex = studentIndex.replace(/\D/g, '');

            // Append Pre-formatted HTML string to modal are
            $('#showStudentModal').empty().append(
                `<div class="modal-content text-center">
                    <div class="modal-header">
                        <h4 class="modal-title"> ${students[studentIndex].lname}, ${students[studentIndex].fname}</h4>
                    </div>
                    <div class="modal-body">
                        <div id="${students[studentIndex].fname}-${students[studentIndex].lname}" class="panel-body">
                            <div id="studentModalDataFrame">
                                <div class="studentModalData">
                                    <img id="modalPicture" src="/student-images/${students[studentIndex].lname}-${students[studentIndex].fname}.png" class="studentPicture">
                                    <p><b>Year: </b>${getYearInSchool(students[studentIndex].s_year)}</p>
                                    <p><b>Start Date: </b>${students[studentIndex].startDate}</p>
                                    <p><b>Phone: </b>${students[studentIndex].phone}</p>
                                    <p><b>Address: </b><br/>${students[studentIndex].street}<br/>${students[studentIndex].city}, ${students[studentIndex].state} ${students[studentIndex].zip}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>`);

            
            // activates the modal
            $("#studentModal").modal({
                backdrop: true
            });
        });
    }






//-------------------------//    LOADING MODAL    //------------------------- 
    function displayTheLoadingModal() {
        $("#loadingModal").modal();

        let loadedValue = 0;
        let LOAD_TIME = 160;
        let BAR_INCR = 5;
        let TIME_INC = 65;
        let progressInterval = setInterval(loadProgressBar, TIME_INC);

        function loadProgressBar() {
            $('#progressBar').css("width", `${loadedValue}%`);
            loadedValue += BAR_INCR;
            if (loadedValue >= LOAD_TIME) {
                clearInterval(progressInterval);
                $('#loadingModal').modal('hide');
            }
        }
    }



//===========================//   SORTING STUFF   //==========================
//============================================================================


    function sortColumnBy(id, sort) {

        let sortingColumnSpan = $(`#${id}`).find('span');

        let SORTED = 'glyphicon-menu-down';
        let REVERSED = 'glyphicon-menu-up';

        Cookies.set('col', id);

        if (sort === 'dec') {
            sortStudentData(students, id);
            students.reverse();
            sortingColumnSpan.removeClass(SORTED).addClass(REVERSED);
            Cookies.set('sorted', 'dec');
        }
        else {
            sortStudentData(students, id);
            sortingColumnSpan.removeClass(REVERSED).addClass(SORTED);
            Cookies.set('sorted', 'asc');
        }

        // This helps to reset the other column icons
        $('.orderTable').not($(`#${id}`)).each(function() {
            $(this).find('span').removeClass('glyphicon-menu-up glyphicon-menu-down ').addClass('glyphicon-menu-right');
        });

    }



    // HANDLES THE TABLE ORDER CLICK
    $('.orderTable ').click(function() {
        let sortedColumnId = $(this).attr('id');

        if (Cookies.get('sorted') === undefined || Cookies.get('sorted') === 'dec') {
            sortColumnBy(sortedColumnId, 'asc');

        }
        else {
            sortColumnBy(sortedColumnId, 'dec');
        }
        
        displayTheLoadingModal();
        setTimeout(displayStudentData, 800);
    });





//============================//   DISPLAY HANDLING   //===========================
//=================================================================================

    // ========+ displayStudentData +========
    // Displays the whole student array object
    function displayStudentData() {

        // Clear Table and Tiles
        $('#studentDataTable').empty();
        $('#studentDataTiles').empty();

        // Using the main 'students' object loaded from AJAX
        $(students).each(function(index, student) {

            // Append Pre-formatted HTML string to TABLE
            $('#studentDataTable').append(
                `<tr id="${index}" >
                <td class="clickRow"> ${student.lname}, ${student.fname} </td>
                <td class="clickRow"> ${getYearInSchool(student.s_year)} </td>
                <td class="clickRow hidden-xs"> ${student.startDate} </td>
                <td class="clickRow hidden-md hidden-sm hidden-xs"> ${student.city} </td>
                <td class="clickRow hidden-sm hidden-xs"> ${student.state} </td>
                <td class="clickRow hidden-md hidden-sm hidden-xs"> ${student.zip} </td>
                <td class="editCol text-center" title="Edit"><div class="glyphicon glyphicon-pencil editItemButton"></div></td>
                <td class="deleteCol text-center" title="Delete"><div class="glyphicon glyphicon-remove deleteItemButton"></div></td>
            </tr>`);


            // Append Pre-Formatted HTML string to TILE
            $('#studentDataTiles').append(
                `<div id="${student.lname}${index}" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div class="panel panel-info clickPanel">
                    <div  class="panel-heading ">
                        <h3 class="panel-title"> ${student.lname}, ${student.fname} </h3>
                    </div>
                    <div class="panel-body text-center"><img src="/student-images/${student.lname}-${student.fname}.png" class="studentPicture"></div>
                </div>
            </div>`);
        });

        // Attaches click handling to given elements for displaying the student info modal
        studentDataModalClick('.clickRow');
        studentDataModalClick('.clickPanel');
        editStudentClick('.editCol');
        deleteConfirmClick('.deleteCol');
    }





    //=====+ SET VIEW FROM COOKIES +======
    // sets the default view of the site using cookies
    function setViewFromCookies() {
        if (Cookies.get('currView') === 'tile') {
            setTileView();
        }
        else {
            setTableView();
            if (Cookies.get('col') !== undefined) {
                sortColumnBy(Cookies.get('col'), Cookies.get('sorted'));
                displayStudentData();
            }
        }
    }



    // Set Clicks and check if cookies are set
    $('#viewButton').click(function() {

        if (Cookies.get('currView') === 'table') {
            setTileView();
        }
        else {
            setTableView();
        }
    });


    // Set the Table View
    function setTableView() {
        $('#tile-view').hide();
        $('#table-view').show();
        setTooltip('viewButton', 'Tile View');
        $('#viewIcon').toggleClass('glyphicon-th', true)
            .toggleClass('glyphicon-th-list', false);
        Cookies.set('currView', 'table');
    }


    // Set the Tile view
    function setTileView() {
        $('#tile-view').show();
        $('#table-view').hide();
        setTooltip('viewButton', 'Table View');
        $('#viewIcon').toggleClass('glyphicon-th', false)
            .toggleClass('glyphicon-th-list', true);
        Cookies.set('currView', 'tile');
    }





    //==========// SETTING UP TOOLTIPS //============
    // for setting the tooltip Text to given text value
    function setTooltip(elementID, toolText) {
        $(`#${elementID}`).tooltip('hide')
            .attr('data-original-title', toolText)
            .tooltip('fixTitle');
    }


    // Sets up the tooltips to make them active
    $('[data-toggle="tooltip"]').tooltip();

});
