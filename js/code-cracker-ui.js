var P_DIM_X = 13, P_DIM_Y = 13, S_DIM_X = 13, S_DIM_Y = 2
var UNDO = -2
var CLEAR_LETTER = -4
var CLUE = -5

var QUESTION = 191

function getCell(x, y, suffix){
    var id = "#" + x + "-" + y
    if(suffix) id = id + "-" + suffix
    return $(id)
}

function getSuperscriptGrid(dimx, dimy, suffix){
    var grid = []
    for(var y = 0; y < dimy; ++y){
        var row = []
        for(var x = 0; x < dimx; ++x){
            var cell = getCell(x, y, suffix)
            if(cell.hasClass("black")){
                row.push(BLACK_CELL)
            } else {
                var currSup = parseInt(cell.find("sup").text())
                if(currSup){
                    row.push( currSup )
                } else {
                    row.push( EMPTY )
                }
            }
        }
        grid.push(row)
    }
    return grid
}

function getPuzzleSuperscripts(){
    return getSuperscriptGrid(P_DIM_X, P_DIM_Y)
}

function getSolutionSuperscripts(){
    return getSuperscriptGrid(S_DIM_X, S_DIM_Y, "sol")
}

function getLetterGrid(dimx, dimy, suffix){
    var grid = []
    for(var y = 0; y < dimy; ++y){
        var row = []
        for(var x = 0; x < dimx; ++x){
            var cell = getCell(x, y, suffix)
            var letter = cell.find("span").text()
            if(cell.hasClass("black")){
                row.push(BLACK_CELL)
            } else if(letter){
                row.push( letter )
            } else {
                row.push("")
            }
        }
        grid.push(row)
    }
    return grid
}

function getPuzzleLetters(){
    return getLetterGrid(P_DIM_X, P_DIM_Y)
}

function getSolutionLetters(){
    return getLetterGrid(S_DIM_X, S_DIM_Y, "sol")
}

function pretty(grid){
    var str = ""
    for(var y = 0; y < P_DIM_X; ++y){
        for(var x = 0; x < P_DIM_Y; ++x){
            var val = grid[y][x]
            str += val + " "
            if(parseInt(val) < 10 || val.length < 2){
                str += " "
            }
        }
        str += "\n"
    }
    str += "\n\n"
    return str
}

function validateSuperscripts(supers){
    var valid = true
    for(var y = 0; y < supers.length; ++y){
        for(var x = 0; x < supers[y].length; ++x){
            var sup = supers[y][x]
            if(sup != 0 && !(sup > 0)){
                getCell(x,y).addClass("invalid")
                valid = false
            }
        }
    }
    return valid
}

// Queue of key events to validate
var queue = []

// To use as a "slot"
function getQueue(){
    return queue
}

function validateGrid(){
    if(queue.length > 0){
        queue = []

        clearValidation()
        var supers = getPuzzleSuperscripts()
        var letters = getPuzzleLetters()

        var valid = validateSuperscripts(supers)
        if(valid) validatePartialWords(supers,letters)
    }

    setTimeout(validateGrid,150)
}

function validatePartialWords(supers, letters){
    var valid = true

    var words = getWords(supers, letters)
    var invalidWords = validateWords(words)

    for (var j = 0; j < invalidWords.length; ++j){
        valid = false
        var invalid = invalidWords[j]
        for(var k = 0; k < invalid.length; ++k){
            var parts = invalid[k]
            var x = parts[2][0], y = parts[2][1]
            getCell(x, y).addClass("invalid")
        }
    }
    return valid
}

function enable(){
    $("#solve").prop("disabled",false)
}

function disable(){
    $("#solve").prop("disabled",true)
}

var queue = []

function getQueue(){
    return queue
}

function acceptModeChars(event){
    var k = event.keyCode || event.charCode
    var result = null

    if(event.ctrlKey && k == "Z".charCodeAt(0)){
        result = UNDO

    } else if(event.shiftKey && k == QUESTION){
        result = CLUE

    } else if( k >= ZERO && k <= NINE ){
        result = event.key

    } else if( k == DOT_BLACK_CELL ){ // BLACK_CELL == 0
        result = DOT_BLACK_CELL

    } else if( k >= LOWER_A && k <= LOWER_Z || k >= UPPER_A && k <= UPPER_Z ) {
        result = event.key.toUpperCase()

    } else if( k == SPACE || k == BACKSPACE || k == DEL){
        result = CLEAR_LETTER
    }

    return result
}

function clearLetter(selected, letter){
    setLetter(selected,"")
}

function setLetter(selected, letter){
    selected.find("span").replaceWith("<span>" + letter + "</span>")
}

function clearSuperscript(selected, sup){
    setSuperscript(selected,"")
}

function setSuperscript(selected, sup){
    selected.find("sup").replaceWith("<sup>" + sup + "</sup>")
}

function sync(target){

    var currSup = parseInt($( target ).find("sup").text())
    var currLetter = $( target ).find("span").text()
    if( currSup ){

        // Sync  through solution grid
        if(currLetter){
            clearLetter($("#solution-grid tr td:contains('" + currLetter + "')"))
            clearLetter($("#puzzle-grid tr td:contains('" + currLetter + "')"))
        }

        setLetter($("#solution-grid tr td sup:contains('^" + currSup +"$')").parent(), currLetter)
        setLetter($("#solution-grid tr td[code='" + currSup + "']"), currLetter)

        for(var y = 0; y < P_DIM_Y; ++y){
            for(var x = 0; x < P_DIM_X; ++x){
                var cell = $("#" + x + "-" + y)

                var cellSup = parseInt($(cell).find("sup").text())

                if(cellSup && cellSup == currSup){
                    setLetter(cell, currLetter)
                }
            }
        }
    }
}

function openCell(target){
    $( target ).removeClass("black")
}

function blackenCell(target){
    $( target ).addClass("black")
    $( target ).find("sup").replaceWith("<sup></sup>")
    $( target ).find("span").replaceWith("<span></span>")
}

function blackenInverse(target){
    var xy = coords(target)
    var ix = xy[0] == 6 ? 6 : 12 - xy[0]
    var iy = xy[1] == 6 ? 6 : 12 - xy[1]
    var id = "#" + ix + "-" + iy
    if(xy[2]) id = id + "-" + xy[2]
    blackenCell( $(id) )
}

function openInverse(target){
    var xy = coords(target)
    var ix = xy[0] == 6 ? 6 : 12 - xy[0]
    var iy = xy[1] == 6 ? 6 : 12 - xy[1]
    var id = "#" + ix + "-" + iy
    if(xy[2]) id = id + "-" + xy[2]
    $(id).removeClass("black")
}

function clearLetters(){
    var letters = []
    for(var y = 0; y < P_DIM_Y; ++y){
        var row = []
        letters.push(row)
        for(var x = 0; x < P_DIM_X; ++x){
            row.push("")
        }
    }
    applyLetterGrid(letters)

    var sletters = []
    for(var y = 0; y < S_DIM_Y; ++y){
        var row = []
        sletters.push(row)
        for(var x = 0; x < S_DIM_X; ++x){
            row.push("")
        }
    }
    applyLetterGrid(sletters, "sol")
}

function clearSuperscripts(){
    var supers = []
    for(var y = 0; y < P_DIM_Y; ++y){
        var row = []
        supers.push(row)
        for(var x = 0; x < P_DIM_X; ++x){
            row.push(EMPTY)
        }
    }
    applySuperScripts(supers)
}

function clearValidation(){
    $(".invalid").removeClass("invalid")
}

function clearHandler(){
    saveState()
    clearLetters()
    clearValidation()
}

function newHandler(){
    saveState()
    clearLetters()
    clearSuperscripts()
    clearValidation()
}

function solveHandler(){
    var superscripts = getPuzzleSuperscripts()

    var letters = getPuzzleLetters()
    var words = getWords(superscripts, letters )

    var solved = solve(words, true, mostLetters, knownConstraints(words))
    if(solved){
        console.log( prettyQueries( solved ) )
        applySolvedWords( solved )
        showWords( solved )

    } else {
        flashGrid()
    }
}

function applySolvedWords(solved){
    for(var i = 0; i < solved.length; ++i){
        var word = solved[i]
        for (var j = 0; j < word.length; ++j){
            var parts = word[j]
            var x = parts[2][0], y = parts[2][1], letter = parts[1].toUpperCase()
            applyLetter(x, y, letter)
        }
    }
    for(var x = 0; x < P_DIM_X; ++x){
        for (var y = 0; y < P_DIM_Y; ++y){
            sync(getCell(x, y))
        }
    }
}

function contentHandler(target, accepted){

    var isSol = $(target).attr("id").endsWith("-sol")

    if(accepted == UNDO){
        undo()

    } else if(accepted == CLUE){
        clue(target)

    } else if(accepted == DOT_BLACK_CELL){

        if(!isSol){
            saveState(target)
            blackenCell(target)
            blackenInverse(target)
        }

    } else if(accepted == CLEAR_LETTER){
        saveState(target)

        $( target ).removeClass("black")
        $( target ).find("span").replaceWith("<span></sup>")
        openInverse(target)
        sync(target)

    } else {

        saveState(target)
        var asDigit = parseInt(accepted)
        var currSup = parseInt($( event.currentTarget ).find("sup").text())
        var currHtml = $( event.currentTarget ).html()
        if(currHtml.trim().length == 0){
            $( event.currentTarget ).html("<sup></sup><span></span>")
        }
        var newVal = accepted

        if(asDigit >= 0){
            if(currSup && currSup == 1){
                newVal = "1" + accepted

            } else if(currSup && currSup == 2 && parseInt(accepted) <= 6){
                newVal = "2" + accepted

            } else {
                newVal = accepted
            }
            if(!isSol && newVal > 0){
                $( target ).find("sup").replaceWith("<sup>" + newVal +"</sup>")
            }

        } else {
            $( target ).find("span").replaceWith("<span>" + accepted +"</span>")
        }

        $(target).removeClass("black")
        openInverse(target)
        sync(target)
    }

//    setTimeout(function(){ validateGrid(); }, 150)
}

function applySuperScript(x, y, d, suffix){
    var cell = getCell(x, y, suffix)
    if(d == BLACK_CELL){
        blackenCell( cell )

    } else if(d == EMPTY){
        openCell(cell)
        clearSuperscript(cell)

    } else {
        cell.removeClass("black")
        cell.find("sup").replaceWith("<sup>" + d + "</sup")
    }
}

function applySuperScripts(grid, suffix){
    for(var y = 0; y < grid.length; ++y){
        for(var x = 0; x < grid[y].length; ++x){
            applySuperScript(x, y, grid[y][x], suffix)
        }
    }
}

function applyLetter(x, y, l, suffix){
    var cell = getCell(x, y, suffix)
    if(l == "") clearLetter(cell)
    else if (l != BLACK_CELL) setLetter(cell, l)
}

function applyLetterGrid(grid, suffix){
    for(var y = 0; y < grid.length; ++y){
        for(var x = 0; x < grid[y].length; ++x){
            applyLetter(x, y, grid[y][x], suffix)
        }
    }
}

/*
  Apply a map of codes to letters in the solution grid e.g. a test grid
*/
function applyClues(clueMap){
    for(var y = 0; y < S_DIM_Y; ++y){
        for(var x = 0; x < S_DIM_X; ++x){
            var letter = clueMap[(y * 13 + x + 1) + ""]
            if(!letter) letter = ""
            applyLetter(x, y, letter, "sol")
            sync(getCell(x, y, "sol"))
        }
    }
}

function applyTestGrid(testGrid){
    applySuperScripts(testGrid.grid)
    applyClues(testGrid.clues)
}

var SAVE_BUFFER = []
var BUFFER_IDX = -1

function saveState(target){
    var superscripts = getPuzzleSuperscripts()
    var letters = getPuzzleLetters()
    var solution = getSolutionLetters()
    var focus = $(target).attr("id")
    SAVE_BUFFER.push([ superscripts, letters, solution, focus ])
    BUFFER_IDX = SAVE_BUFFER.length - 1
}

function undo(){

    if(BUFFER_IDX >=0 && SAVE_BUFFER.length > BUFFER_IDX){

        var state = SAVE_BUFFER[BUFFER_IDX--]
        var superscripts = state[0], letters = state[1]
        var solution = state[2], focus = state[3]

        //console.log( pretty( superscripts  ) )
        //console.log( pretty( letters  ) )

        applySuperScripts(superscripts)
        applyLetterGrid(letters)
        applyLetterGrid(solution, "sol")
        $("#" + focus).focus()

        SAVE_BUFFER = SAVE_BUFFER.slice(0,BUFFER_IDX+1)
        getQueue().push("undo")
    }
}

$(function(){

    $("#puzzle-grid tr td").attr("contenteditable","true")
    $("#puzzle-grid tr td").addClass("cell")

    $("#puzzle-grid .cell").keydown(gridKeyHandlerFactory(13, 13, {
        "accept" : acceptModeChars,
        "queue" : getQueue,
        "contenthandler": contentHandler,
        "undo" : undo,
        "queue" : getQueue
    }))

    $("#solution-grid tr td").attr("contenteditable","true")
    $("#solution-grid tr td").addClass("cell")

    $("#solution-grid .cell").keydown(gridKeyHandlerFactory(13, 2, {
        "accept" : acceptModeChars,
        "queue" : getQueue,
        "contenthandler": contentHandler,
        "undo" : undo,
        "queue" : getQueue
    }))

    $("#new").click(newHandler)
    $("#clear").click(clearHandler)
    $("#undo").click(undo)
    $("#solve").click(solveHandler)

    applyTestGrid(testGridD)

    saveState()

    setTimeout(validateGrid,150)
})
