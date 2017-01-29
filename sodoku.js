/*

  Test puzzle data, using 0 as the unknown numbers.

*/
var medium  = [ 0,0,2, 7,0,9, 0,0,5,
                0,0,0, 0,0,8, 6,0,0,
                6,0,0, 2,0,0, 8,0,0,

                1,2,0, 0,0,0, 7,0,0,
                0,4,0, 0,9,0, 0,5,0,
                0,0,7, 0,0,0, 0,6,9,

                0,0,1, 0,0,2, 0,0,6,
                0,0,8, 5,0,0, 0,0,0,
                9,0,0, 6,0,3, 4,0,0 ]

var medium2 = [ 0,7,0, 0,0,8, 0,0,0,
                8,6,0, 4,9,0, 2,1,0,
                4,0,0, 0,7,0, 0,3,0,

                0,4,0, 0,0,0, 8,0,9,
                0,0,7, 0,0,0, 3,0,0,
                9,0,2, 0,0,0, 0,7,0,

                0,9,0, 0,6,0, 0,0,5,
                0,5,1, 0,8,7, 0,9,3,
                0,0,0, 9,0,0, 0,6,0 ]

var easy    = [ 0,2,0, 0,4,1, 0,0,0,
                5,0,0, 7,0,0, 4,0,1,
                4,7,1, 0,0,0, 0,6,3,

                0,4,0, 0,3,0, 2,0,6,
                0,0,7, 0,0,0, 9,0,0,
                2,0,6, 0,9,0, 0,4,0,

                1,6,0, 0,0,0, 8,9,2,
                8,0,4, 0,0,2, 0,0,7,
                0,0,0, 6,5,0, 0,3,4 ]

var easy2   = [ 0,0,3, 9,0,0, 2,0,8,
                0,0,1, 0,0,5, 0,9,3,
                2,0,0, 0,8,6, 0,1,0,

                4,7,0, 1,0,0, 3,6,0,
                9,0,0, 6,0,2, 0,0,7,
                0,3,6, 0,0,4, 0,2,9,

                0,2,0, 5,7,0, 0,0,6,
                3,6,0, 2,0,0, 5,0,0,
                5,0,9, 0,0,3, 4,0,0 ]

var easy2S  = [ 6,4,3, 9,1,7, 2,5,8,
                7,8,1, 4,2,5, 6,9,3,
                2,9,5, 3,8,6, 7,1,4,

                4,7,2, 1,9,8, 3,6,5,
                9,5,8, 6,3,2, 1,4,7,
                1,3,6, 7,5,4, 8,2,9,

                8,2,4, 5,7,1, 9,3,6,
                3,6,7, 2,4,9, 5,8,1,
                5,1,9, 8,6,3, 4,7,2 ]

var hard    = [ 3,2,4, 8,0,0, 0,0,0,
                0,0,0, 0,0,0, 0,0,1,
                1,8,0, 0,0,0, 3,0,5,

                4,0,9, 0,6,0, 0,0,0,
                0,0,0, 3,0,1, 0,0,0,
                0,0,0, 0,7,0, 6,0,4,

                7,0,8, 0,0,0, 0,9,6,
                2,0,0, 0,0,0, 0,0,0,
                0,0,0, 0,0,9, 1,2,3 ]

var hard2   = [ 6,0,0, 3,0,1, 0,0,0,
                0,0,7, 0,6,0, 0,0,0,
                8,0,1, 0,0,5, 0,0,9,

                5,0,0, 6,0,7, 0,0,0,
                0,4,0, 5,3,2, 0,7,0,
                0,0,0, 8,0,4, 0,0,3,

                3,0,0, 1,0,0, 5,0,8,
                0,0,0, 0,5,0, 6,0,0,
                0,0,0, 4,0,8, 0,0,1 ]

var hard3   = [ 1,0,0, 0,0,7, 0,0,0,
                0,0,3, 0,0,0, 0,2,0,
                0,9,2, 0,5,3, 0,0,4,

                0,0,7, 0,3,0, 6,9,0,
                0,0,0, 0,1,0, 0,7,0,
                0,0,1, 0,4,0, 2,8,0,

                0,1,5, 0,9,6, 0,0,8,
                0,0,6, 0,0,0, 0,3,0,
                4,0,0, 0,0,2, 0,0,0 ]

var hard4   = [ 0,2,3, 5,0,8, 0,0,0,
                0,0,9, 0,1,0, 0,0,0,
                0,0,7, 0,0,2, 0,0,8,

                4,1,6, 0,3,0, 2,0,0,
                0,0,0, 0,0,0, 0,0,0,
                0,0,2, 0,7,0, 4,8,5,

                2,0,0, 1,0,0, 3,0,0,
                0,0,0, 0,8,0, 6,0,0,
                0,0,0, 9,0,6, 8,4,0 ]

var invalid = [ 1,1,2, 0,0,7, 0,0,0,
                0,0,3, 0,0,0, 0,5,0,
                0,9,2, 0,5,3, 0,0,4,

                0,0,7, 0,3,0, 6,9,0,
                0,0,0, 0,5,0, 0,5,0,
                0,0,1, 0,4,0, 2,8,0,

                0,1,5, 0,9,6, 0,0,8,
                0,0,6, 0,0,0, 0,3,0,
                4,0,0, 0,0,2, 0,0,0 ]

/*

  Initialise the working state to replace the unknown numbers with lists
  of possible solution numbers i.e. 0 -> [1,2,3,4,5,6,7,8,9]

  Then known numbers can be a single element list i.e. 2 -> [2]

  Also make the puzzle array 2 dimensional so code is easier to follow [x][y]

*/

function init(puzzle){
    var state = []
    for(var i = 0; i < 9; ++i){
        state[i] = []
    }
    for(var i = 0; i < puzzle.length; ++i){
        var val = puzzle[i]
        var x = Math.floor(i / 9)
        var y = i % 9

        if(val > 0){
            state[x][y] = [val]
        } else {
            state[x][y] = [1,2,3,4,5,6,7,8,9]
        }
    }
    return state;
}

function cell(state,x,y){
    return state[y][x]
}

function printCell(state,x,y){
    return "(" + x + "," + y + ") => [" + state[y][x] + "]"
}

function printRow(state, x){
    var str = ""
    for(var i = 0; i < 9; ++i){
        str += printCell(state,i,x)
        str += "\n"
    }
    return str
}

function printCol(state,y){
    var str = ""
    for(var i = 0; i < 9; ++i){
        str += printCell(state,y,i)
        str += "\n"
    }
    return str
}

/*

  pretty printer to help debugging

*/
function pretty(state){
    var str = "-----------\n"
    for(var x = 0; x < state.length; ++x){
        for(var y = 0; y < state[x].length; ++y){
            var val = state[x][y]
            if( val.length == 1 ){
                str += val[0]
            } else {
                str += "."
            }
            if(y % 3 == 2){
                str += " "
            }
        }
        if(x % 3 == 2){
            str += "\n\n"
        } else {
            str += "\n"
        }
    }
    return str;
}

function filterMany(arr, toRemove){
    return check(arr, arr.filter( function(el){
        return toRemove.indexOf(el) > -1 ? false : true
    }))
}

function check( val, newVal){
    if(!newVal || newVal.length == 0){
//        debugger
        return val
    }
    return newVal
}

/*

  For x,y eliminate possibilities by checking the row.

  Each row and column has one each of the numbers from 1-9 so
  if it already appears on the row or column it can be eliminated
  from the possibilities.

*/
function elimRow(state, x, y){
    var val = state[x][y]
    if(val.length == 1){
        return val
    }
    var toRemove = []
    for(var i = 0; i < 9; ++i){
        var pos = state[i][y]
        if(i != x && pos.length == 1){
            toRemove.push(pos[0])
        }
    }
    return check(val, filterMany(val, toRemove))
}

/*

  For x,y eliminate possibilities by checking the column.

*/

function elimCol(state, x, y){
    var val = state[x][y]
    if(val.length == 1){
        return val
    }
    var toRemove = []
    for(var i = 0; i < 9; ++i){
        var pos = state[x][i]
        if(i != y && pos.length == 1){
            toRemove.push(pos[0])
        }
    }
    return check(val, filterMany(val, toRemove))
}

/*

  Dimensions of the smaller box for a coordinate

*/
function smallBox(x,y){
    return {
        "minx" : x - Math.floor(x % 3),
        "maxx" : x + 3 - Math.floor(x % 3),
        "miny" : y - Math.floor(y % 3),
        "maxy" : y + 3 - Math.floor(y % 3)
    }
}

/*

  Eliminate numbers that have already occurred in the smaller (3x3) box.

*/
function elimBox(state, x, y){

    var val = state[x][y]
    if(val.length == 1) return val // solution known

    var sb = smallBox(x,y)

    var toRemove = []
    for(var i = sb.minx; i < sb.maxx; ++i){
        for(var j = sb.miny; j < sb.maxy; ++j){
            var pos = state[i][j]
            if((i != x || j != y ) && pos.length == 1){
                toRemove.push(pos[0])
            }
        }
    }
    return check(val, filterMany(val,toRemove))
}

/*

  For each small box, check for remaining empty slots
  with only one choice left.

*/
function fillBox(state, x, y){
    var val = state[x][y]
    if(val.length == 1) return val // solution known

    var sb = smallBox(x,y)

    var present = []
    for(var i = sb.minx; i < sb.maxx; ++i){
        for(var j = sb.miny; j < sb.maxy; ++j){
            var pos = state[i][j]
            if((i != x || j != y ) && pos.length == 1){
                present.push(pos[0])
            }
        }
    }

    // If 8 of 9 are present in the box we know the
    // solution is th emissing integer
    var newVal = val
    if(present.length == 8){
        for(var i = 1; i <= 9; ++i){
            if(present.indexOf(i) == -1){
                newVal = [i]
            }
        }
    }
    return check(val, newVal)
}

function resolveOptions(x, y, val, options){
    var result = val
    for(var l = 0; l < val.length; ++l){
        var option = val[l]
        if(!options[option]){
            console.log("resolveOptions (" + y + "," + x + ") " + val + " ==> " + option, options )
            result = [option]
            break
        }
    }
    return result
}

/*
  Add to count of appearances in options map
*/
function addOption(options, option){
    if(options[option]){
        options[option] = options[option] + 1
    } else {
        options[option] = 1
    }
}

/*
  With the remaining options for the unknowns in the small box, a
  number appears in only one of those options lists, it must be the
  solution for that slot.

*/
function resolveBox(state, x, y){

    var val = state[x][y]
    if(val.length == 1) return val // solution known

    var sb = smallBox(x,y)

    // Set of the other options
    var otherOptions = {}
    for(var i = sb.minx; i < sb.maxx; ++i){
        for(var j = sb.miny; j < sb.maxy; ++j){
            var pos = state[i][j]
            if(i != x || j != y){
                for(var k = 0; k < pos.length; ++k){
                    addOption(otherOptions, pos[k])
                }
            }
        }
    }

    // If one of this coordinates options are unique amongst the other
    // options it must be the solution
    return check(val, resolveOptions(x, y, val, otherOptions))
}

/*
  The row may may have 3 slots with multiple potential options
  e.g. [1,2,3] [2,3] [2,3]
*/
function resolveRow(state, x, y){

    var val = state[x][y]
    if(val.length == 1) return val // solution known

    // Set of the other options on the row
    var otherOptions = {}
    for(var i = 0; i < 9; ++i){
        var pos = state[x][i]
        if(i != y){
            for(var k = 0; k < pos.length; ++k){
                addOption(otherOptions,pos[k])
            }
        }
    }

    // If one of this coordinates options are unique amongst the other
    // options on the row it must be the solution here since it cannot
    // appear elsewhere
    return check(val, resolveOptions(x, y, val, otherOptions))
}

function resolveCol(state, x, y){

    var val = state[x][y]
    if(val.length == 1) return val // solution known

    // Set of the other options on the column
    var otherOptions = {}
    for(var i = 0; i < 9; ++i){
        var pos = state[i][y]
        if(i != x){
            for(var k = 0; k < pos.length; ++k){
                addOption(otherOptions, pos[k])
            }
        }
    }

    // If one of this coordinates options are unique amongst the other
    // options it must be the solution on this column since it cannot
    // appear elsewhere
    return check(val, resolveOptions(x, y, val, otherOptions))
}

function equal(a, b){
    var eq = true
    if(a.length == b.length){
        for(var i = 0; i < a.length; ++i){
            if(a[i] != b[i]){
                eq = false
                break
            }
        }
    } else {
        eq = false
    }
    return eq
}

function runRule(state, rulefn, solution, interactive){
    var changed = false

    outer: for(var x = 0; x < 9; ++x){
        for(var y = 0; y < 9; ++y){
            var curr = state[x][y]
            var result = rulefn(state, x, y)
            if(curr.length != result.length){
                changed = true
                // console.log( rulefn.name + " " +  printCell( state, y, x) )
                state[x][y] = result
                //console.log( "   ==> " + printCell( state, y, x) )

                if(result.length == 1){
                    solution.push([x, y, result[0]])
                }
                if(interactive){
                    break outer;
                }
            }
        }
    }
    return changed
}

/*
  Initialise sets of number appearances to verify puzzle state
*/
function initSets(){
    var sets = {}
    for(var x = 0; x < 9; x += 3){
        for(var y = 0; y < 9; y += 3){
            var dim = smallBox(x,y)
            sets[dim.minx + "" + dim.miny] = {}
        }
    }
    for(var x = 0; x < 9; ++x){
        sets["row" + x] = {}
    }
    for(var y = 0; y < 9; ++y){
        sets["col" + y] = {}
    }
    return sets
}

/*
  Populate sets with coordinates of known values
*/
function populateSets(state, sets){
    for(var y = 0; y < 9; ++y){
        for(var x = 0; x < 9; ++x){
            var curr = state[x][y]
            if(curr.length == 1){
                var dim = smallBox(x,y)
                var val = curr[0]

                var row = sets["row" + x][val]
                if(!row) {
                    row = []
                    sets["row" + x][val] = row
                }
                row.push([x,y])

                var col = sets["col" + y][val]
                if(!col) {
                    col = []
                    sets["col" + y][val] = col
                }
                col.push([x,y])

                var key = dim.minx + "" + dim.miny
                var box = sets[key][val]
                if(!box) {
                    box = []
                    sets[key][val] = box
                }
                box.push([x,y])

            }
        }
    }
}

function checkSet(set, message, errors){
    for(var n = 1; n <= 9; ++n){
        var setn = set[n]
        if(setn && setn.length !=1){
            errors.push([message, setn])
        }
    }
}

function verify(state){

    var errors = []
    // map for rows, columns and small boxes to keep
    // a set of solved values (options list of length 1)
    var sets = initSets()
    populateSets(state, sets)

    for(var x = 0; x < 9; ++x){
        var row = sets["row" + x]
        checkSet(row, "Row conflict", errors)
    }

    for(var y = 0; y < 9; ++y){
        var col = sets["col" + y]
        checkSet(col, "Column conflict", errors)
    }

    for(var x = 0; x < 9; x += 3){
        for(var y = 0; y < 9; y += 3){
            var key = x + "" + y
            var box = sets[key]
            checkSet(box, "Box conflict", errors)
        }
    }

    // Temp just reduce to coords
    var errorCoords = {}
    for(var i = 0; i < errors.length; ++i){
        var coords = errors[i][1]
        for(var j = 0; j < coords.length; ++j){
            var c = coords[j][1] + "-" + coords[j][0]
            errorCoords[c] = c
        }
    }

    return errorCoords
}

/*
  Test if puzzle state is solved
*/
function solved(state){

    var solved = true
    // Check all slots are answered
    for(var x = 0; x < 9; ++x){
        for(var y = 0; y < 9; ++y){
            if(state[x][y].length > 1){
                solved = false
                break
            }
        }
    }
    // Check for errors
    if(solved && Object.keys(verify(state)).length > 0){
        solved = false
    }

    return solved
}

function copy(state){
    var copy = [];
    for (var i = 0; i < state.length; i++)
        copy[i] = state[i].slice()
    return copy
}

/*
  Back-tracking search on smallest option list
*/
function search(state, solution, depth){

    console.log( "search", depth, pretty( state ) )

    var min = 10
    var sx, sy, toSearch
    for(var y = 0; y < 9; ++y){
        for(var x = 0; x < 9; ++x){
            var options = state[x][y]
            if(options.length > 1 && options.length < min){
                min = options.length
                sx = x
                sy = y
                toSearch = options.slice()
            }
        }
    }

    var copyState = state, copySolution = solution

    if(toSearch){
        console.log("search (" + sx + "," + sy + ") ==> " + toSearch )

        while(toSearch.length > 0){
            var rand = Math.floor(Math.random() * toSearch.length)
            var choice = toSearch[rand]
            depth = depth + 1
            toSearch = toSearch.slice(0,rand).concat(toSearch.slice(rand+1))

            console.log("search (" + sx + "," + sy + ") trying " + choice )
            copyState = copy(state)
            copySolution = solution.slice()

            copySolution.push([sx, sy, [choice]])
            copyState[sx][sy] = [choice]

            var result = solve( copyState, copySolution, false, depth)
            if(solved(result[0])){
                copyState = result[0]
                copySolution = result[1]
                depth = result[2]
                break
            }
        }
    }

    return [copyState, copySolution, depth]

}

var thinkTime;
/*

*/
function solve(state, solution, interactive, depth){

    if(depth == 0){
        thinkTime = Date.now()
    } else {
        if(thinkTime + 10000 < Date.now()){
            return [state, solution, depth]
        }
    }

    var rulefns = [elimRow, elimCol, elimBox, fillBox, resolveBox, resolveRow, resolveCol]
    var copyState = copy(state)
    var copySolution = solution.slice()
    var copyDepth = depth

    var changed = true
    outer: while(changed){
        changed = false
        for(var i = 0; i < rulefns.length; ++i){
            changed = runRule(copyState, rulefns[i], copySolution, interactive) ? true : changed
            if(changed && interactive && copySolution.length > 0){
                break outer
            }
        }
        if(solved(copyState)){
            break outer
        }
        if(!changed){
            var result = search(copyState, copySolution, depth)
            copyState = result[0]
            copySolution = result[1]
            copyDepth = result[2]
            break outer
        }
    }
    return [copyState, copySolution, copyDepth]
}
