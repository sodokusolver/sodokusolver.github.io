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

