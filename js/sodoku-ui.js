function setGrid(puzzle){
    for(var x = 0; x < 9; ++x){
        for(var y = 0; y < 9; ++y){
            var id = x + "-" + y
            var cell = document.getElementById( id )
            var val = puzzle[x + y * 9]
            if(val != 0){
                $(cell).html(val)
            } else {
                $(cell).html("")
            }
        }
    }
}

/*
  Validate the grid for illegal moves returning true when valid
*/
function validate(){

    var grid = getGrid(9,9)
    var errorCoords = verify( init(grid) )
    var isValid = true

    for(var x = 0; x < 9; ++x){
        for(var y = 0; y < 9; ++y){
            var key = x + "-" + y
            var cell = document.getElementById(key)
            if(errorCoords[key]){
                $(cell).addClass("invalid")
                isValid = false
            } else {
                $(cell).removeClass("invalid")
                $(cell).removeClass("move")
            }
        }
    }
    return isValid
}

// Queue of key events to validate
var queue = []

// To use as a "slot"
function getQueue(){
    return queue
}

function validator(){
    if(queue.length > 0){
        queue = []
        validate()
    }
    setTimeout(validator,50)
}

function solveOne(){

    if(!validate()){
        flash("invalid")

    } else {
        var grid = getGrid()
        var results = solve( init(grid), [], true, 0)
        solution = results[1]

        if(solution.length > 0){
            showMove( solution[0] )
        } else {
            flashGrid()
        }
    }
}

function showMove(move){
    var el = $("#" + move[1] + "-" + move[0])
    el.html("" + move[2])
    el.addClass("move")
}

function revealMoves(solution){
    var move = solution.shift()
    showMove(move)
    if(solution.length > 0){
        setTimeout(function(){ revealMoves( solution) }, 50)
    } else {
        enable()
    }
}

function solveAll(){

    if(!validate()){
        flash("invalid")

    } else {

        disable()
        var grid = getGrid()

        var results = solve( init(grid), [], false, 0)
        var solution = results[1]

        if(solved(results[0]) && solution.length > 0){
            console.log("solution ==>", solution.length)
            console.log("depth ==>", results[2])
            revealMoves(solution)

        } else {
            flashGrid()
            enable()
        }
    }
}

var saved;
function save(){
    saved = getGrid();
}

function load(){
    if(saved){
        setGrid(saved)
        validate()
    }
}

function clear(){
    for(var x = 0; x < 9; ++x){
        for(var y = 0; y < 9; ++y){
            $("#" + x + "-" + y).html("")
        }
    }
    validate()
}

function enable(){
    $("#solveone").prop("disabled",false)
    $("#solveall").prop("disabled",false)
    $("#save").prop("disabled",false)
    $("#load").prop("disabled",false)
    $("#clear").prop("disabled",false)
}

function disable(){
    $("#solveone").prop("disabled",true)
    $("#solveall").prop("disabled",true)
    $("#save").prop("disabled",true)
    $("#load").prop("disabled",true)
    $("#clear").prop("disabled",true)
}


function acceptDigits(event){
    var k = event.keyCode || event.charCode
    var result = null
    if(k > ZERO && k <= NINE){
        result = event.key
    }
    return result
}

$(function(){

    setGrid(hard4)

    $("#puzzle-grid tr td").attr("contenteditable","true")
    $("#puzzle-grid tr td").addClass("cell")

    $(".cell").keydown(gridKeyHandlerFactory(9, 9, {
        "accept" : acceptDigits,
        "queue" : getQueue
    }))

    $("#solveone").click(solveOne)
    $("#solveall").click(solveAll)
    $("#save").click(save)
    $("#load").click(load)
    $("#clear").click(clear)

    setTimeout(validator,300)
})
