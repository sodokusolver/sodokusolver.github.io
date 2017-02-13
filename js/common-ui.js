var ZERO = "0".charCodeAt(0)
var NINE = "9".charCodeAt(0)
var LOWER_A = "a".charCodeAt(0)
var UPPER_A = "A".charCodeAt(0)
var LOWER_Y = "y".charCodeAt(0)
var UPPER_Y = "Y".charCodeAt(0)
var LOWER_Z = "z".charCodeAt(0)
var UPPER_Z = "Z".charCodeAt(0)
var DOT_BLACK_CELL = 190
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

function coords(cell){
    var coords = cell.id.split("-"), suffix = ""
    var x = parseInt(coords[0]),  y = parseInt(coords[1])
    if(coords.length > 2) suffix = coords[2]
    return [x,y,suffix]
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
function focusDirection(dimx, dimy, event, key){
    var id = $( event.currentTarget ).attr("id")
    var coords = id.split("-" )
    var x = parseInt(coords[0]), y = parseInt(coords[1])
    var suffix = coords[2]
    switch(key){
    case UP:
        y = (y - 1 >= 0) ? y - 1 : y
        break;
    case DOWN:
        y = (y + 1 < dimy) ? y + 1 : y
        break;
    case LEFT:
        x = (x - 1 >= 0) ? x - 1 : x
        break;
    case RIGHT:
        x = (x + 1 < dimx) ? x + 1 : x
        break;
    }
    var tid = "#" + x + "-" + y
    if(suffix) tid = tid + "-" + suffix
    $(tid).focus()
}

/*
  Generate a key handler function that uses the given acceptfn to decide
  whether to allow the keypress to register in content.

  dimx - width of grid in cells

  dimy - height of grid in cells

  acceptfn (optional) - should return null if keypress is not accepted as content otherwise
  it should return the content it wants in the cell.

  queuefn (optional) should return a reference to a list to push the key on to

  contentfn (optional) can be used to provide a custom html setter, it is passed
    the target element and the accepted contents

  undofn - function to call when
*/
function gridKeyHandlerFactory(dimx, dimy, options){

    return function(event) {
        var k = event.keyCode || event.charCode

        var acceptfn = null, queuefn = null, contentfn = null
        if(options){
            acceptfn = options.accept
            queuefn = options.queue
            contentfn = options.contenthandler
        }

        if(k != TAB){
            event.preventDefault()
        }
        var change = false
        var accept = acceptfn(event)
        if(accept != null){
            change = true
            if(contentfn){
                contentfn(event.currentTarget, accept)
            } else {
                $( event.currentTarget ).html( accept )
            }
            $( event.currentTarget ).focus()

        } else if(k == SPACE ) {
            change = true
            $( event.currentTarget ).html("")
            focusNext($(this))

        } else if(k == RETURN ) {
            focusNext($(this))

        } else if(k == BACKSPACE ) {
            change = true
            // Backspace will clear and focus previous square
            $( event.currentTarget ).html("")
            focusPrev($(this))

        } else if(k == DEL) {
            change = true
            // DEL clears current square
            $( event.currentTarget ).html("")

        } else if(k == UP || k == DOWN || k == LEFT || k == RIGHT) {
            focusDirection(dimx, dimy, event, k)

        }

        if(queuefn && change) {
            console.log("queuing")
            queuefn().push(k)
        }
    }
}

function showWords(solutions){
    var words = []
    for(var i = 0; i < solutions.length; ++i){
        var solution = solutions[i]
        var word = ""
        for(var j = 0; j < solution.length; ++j){
            var part = solution[j]
            word += part[1]
        }
        words.push(word)
    }
    renderResults(words)
}

function renderResults(results){
    if(results && results.length > 0){
        console.log( results )
        var html = "<ol>"
        for(var i = 0; i < results.length; ++i){
            var word = results[i]
            html += '<li><a target="_blank" href="http://www.thefreedictionary.com/'+ word +'">' + word + '</a></li>'
        }
        html += "</ol>"

        $("#results").html(html)
    }
}

function acceptUpperLetters(event){
    var k = event.keyCode || event.charCode
    var result = null
    if(k >= LOWER_A && k <= LOWER_Z || k >= UPPER_A && k <= UPPER_Z){
        result = event.key.toUpperCase()
    }
    return result
}

function flash(clazz){
    var delay = 150
    var elms = $("." + clazz)
    elms.toggleClass(clazz)
    setTimeout(function(){ elms.toggleClass(clazz); }, delay)
    setTimeout(function(){ elms.toggleClass(clazz); }, delay * 2)
    setTimeout(function(){ elms.toggleClass(clazz); }, delay * 3)
}

function flashGrid(clazz){
    if(!clazz) clazz = "alert"
    var delay = 150
    var puzzle = $("#puzzle-grid")
    puzzle.addClass(clazz)
    flash(clazz)
    setTimeout(function(){ puzzle.toggleClass(clazz); }, delay * 4)
}
