function getGrid(){
    var grid = []
    for(var y = 0; y < 9; ++y){
        for(var x = 0; x < 9; ++x){
            var id = x+"-"+y
            var cell = document.getElementById( id )
            var val = parseInt(cell.textContent)
            if(val){
                grid.push( val )
            } else {
                grid.push( 0 )
            }
        }
    }
    return grid
}

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

var ZERO = "0".charCodeAt(0)
var NINE = "9".charCodeAt(0)
var BACKSPACE = 8
var TAB = 9
var RETURN = 13
var SPACE = 32
var LEFT = 37
var UP = 38
var RIGHT = 39
var DOWN = 40
var DEL = 46

// Queue of validation events
var queue = []

/*
  Focus next cell going to next row if required.
*/
function focusNext(that){
    var nextCell = that.nextAll(".cell:first")
    if(nextCell.length){
        nextCell.focus()
    } else {
        nextCell = that.closest("tr").next().children(".cell:first").focus()
        nextCell.focus()
    }
}

/*
  Focus previous cell going to previous row if required.
*/
function focusPrev(that){
    var prevCell = that.prevAll(".cell:first")
    if(prevCell.length){
        prevCell.focus()
    } else {
        prevCell = that.closest("tr").prev().children(".cell:last").focus()
        prevCell.focus()
    }
}

/*
  Handle an arrow key, focussing up or down, left or right.
*/
function focusDirection(event,key){
    var id = $( event.currentTarget ).attr("id")
    var coords = id.split("-" )
    var x = parseInt(coords[0]), y = parseInt(coords[1])
    switch(key){
    case UP:
        y = (y - 1 >= 0) ? y - 1 : y
        break;
    case DOWN:
        y = (y + 1 < 9) ? y + 1 : y
        break;
    case LEFT:
        x = (x - 1 >= 0) ? x - 1 : x
        break;
    case RIGHT:
        x = (x + 1 < 9) ? x + 1 : x
        break;
    }
    $("#" + x + "-" + y).focus()
}

function gridKeyHandler(event){

    var k = event.keyCode || event.charCode
    if(k == TAB) return

    event.preventDefault()

    if(k > ZERO && k <= NINE){
        $( event.currentTarget ).html( event.key )

    } else if(k == ZERO || k == SPACE ) {
        $( event.currentTarget ).html("")
        focusNext($(this))

    } else if(k == RETURN ) {
        focusNext($(this))

    } else if(k == BACKSPACE ) {
        // Backspace will clear and focus previous square
        $( event.currentTarget ).html("")
        focusPrev($(this))

    } else if(k == DEL) {
        // DEL clears current square
        $( event.currentTarget ).html("")

    } else if(k == UP || k == DOWN || k == LEFT || k == RIGHT) {
        focusDirection(event, k)
    }

    queue.push(k)
}

/*
  Validate the grid for illegal moves returning true when valid
*/
function validate(){

    var grid = getGrid()
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

function validator(){
    if(queue.length > 0){
        queue = []
        validate()
    }
    setTimeout(validator,50)
}

function flash(clazz){
    var delay = 150
    var elms = $("." + clazz)
    elms.toggleClass(clazz)
    setTimeout(function(){ elms.toggleClass(clazz); }, delay)
    setTimeout(function(){ elms.toggleClass(clazz); }, delay * 2)
    setTimeout(function(){ elms.toggleClass(clazz); }, delay * 3)
}

function flashGrid(){
    var delay = 150
    var puzzle = $("#puzzle-grid")
    puzzle.addClass("alert")
    flash("alert")
    setTimeout(function(){ puzzle.toggleClass("alert"); }, delay * 4)
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

        console.log("solution ==>", solution.length)
        console.log("depth ==>", results[2])
        if(solution.length > 0){
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

$(function(){

    setGrid(hard4)

    $("#puzzle-grid tr td").attr("contenteditable","true")
    $("#puzzle-grid tr td").addClass("cell")

    $(".cell").keydown(gridKeyHandler)

    $("#solveone").click(solveOne)
    $("#solveall").click(solveAll)
    $("#save").click(save)
    $("#load").click(load)
    $("#clear").click(clear)

    setTimeout(validator,300)
})
