var ZERO = "0".charCodeAt(0)
var NINE = "9".charCodeAt(0)
var LOWER_A = "a".charCodeAt(0)
var UPPER_A = "A".charCodeAt(0)
var LOWER_Z = "z".charCodeAt(0)
var UPPER_Z = "Z".charCodeAt(0)
var BACKSPACE = 8
var TAB = 9
var RETURN = 13
var SPACE = 32
var LEFT = 37
var UP = 38
var RIGHT = 39
var DOWN = 40
var DEL = 46

function getGrid(dimx,dimy){
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

/*
  Generate a key handler function that uses the given acceptfn to decide 
  whether to allow the keypress to register in content. 
  acceptfn should return null if keypress is not accepted as content otherwise 
  the content it wants in the cell.
*/
function gridKeyHandlerFactory(acceptfn, queueslot){

    return function(event) {
        var k = event.keyCode || event.charCode
        if(k == TAB) return

        event.preventDefault()

        var accept = acceptfn(event)
        if(accept){
            $( event.currentTarget ).html( accept )

        } else if(k == SPACE ) {
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

        if(queueslot) {
            queueslot().push(k)
        }
    }
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

