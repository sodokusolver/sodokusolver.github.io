
var BLACK_CELL = 0
var EMPTY = -1

var testGrid = {
    grid : [ 
        [1,  0,  2,  0,  3,  0,  0,  0,  4,  0,  5,  0,  6],
        [7,  8,  9, 10, 11, 12,  0,  5, 13, 11, 11, 12, 14],
        [15, 0, 12,  0, 13,  0,  2,  0, 10,  0,  7,  0, 13],
        [15,12, 16, 16, 10, 12, 16,  0, 17,  7, 15, 12, 18],
        [10, 0, 19,  0, 18,  0,  7,  0, 10,  0, 12,  0,  6],
        [17, 7, 10, 11,  0, 12, 20, 12, 17, 14,  0,  0,  0],        
        [2,  0, 17,  0, 15,  0, 10,  0, 12,  0, 10,  0, 21],
        [0,  0,  0,  6, 22, 13, 14,  9,  0, 19, 17, 12, 12],
        [8,  0, 23,  0, 17,  0,  7,  0,  2,  0,  9,  0, 12],
        [7, 15,  7, 24, 12,  0, 14, 12, 16, 16, 10, 12, 16],
        [10, 0, 17,  0, 25,  0, 12,  0, 12,  0,  5,  0, 10],
        [3, 11,  7, 26, 12, 17,  0,  5, 12, 17, 10,  2, 17],
        [6,  0, 11,  0, 18,  0,  0,  0, 14,  0, 14,  0,  2]
    ],
    clues : { 16 : 'R' }
}

var testGridB = {
    grid :  [ // crosswords are often 13 x 13
        [1,   0,  2,  0,  3,  0,  0,  0,  4,  0,  2,  0,  2],
        [5,   6,  7,  8,  1,  3,  0,  9, 10, 11, 12,  5,  3],
        [8,   0,  1,  0, 13,  0, 14,  0, 15,  0,  5,  0, 15],
        [16,  7,  8, 17,  5,  1, 15,  0, 11,  5, 18,  3,  2],
        [16,  0, 10,  0,  2,  0,  1,  0,  3,  0,  2,  0,  7],
        [10, 11, 19,  8,  0, 20, 15, 21, 10,  3,  0,  0,  0],
        [1,   0,  2,  0, 20,  0, 20,  0, 21,  0, 17,  0,  5],
        [0,   0,  0, 17, 13,  3,  1,  5, 0,  17,  5, 22, 23],
        [8,   0, 24,  0, 25,  0, 15,  0, 7,   0, 22,  0,  5],
        [24,  1, 13, 25, 25,  0, 14,  1,  8, 22,  5,  1, 26],
        [24,  0,  1,  0, 15,  0,  7,  0, 14,  0,  1,  0, 15],
        [5,  11,  2, 10,  1,  5,  0,  1,  5, 22,  5, 15, 17],
        [1,   0,  3,  0, 19,  0,  0,  0, 19,  0, 19,  0, 17]
    ],
    clues : { 26 : 'B', 23 : 'Y' }
}

var testGridC = {
    grid :  [ // crosswords are often 13 x 13
        [1,   0,  1,  0,  2,  0,  3,  0,  4,  0,  5,  0,  6],
        [7,   8,  8,  9, 10,  0, 11,  4, 10,  4, 11, 12,  4],
        [8,   0, 11,  0,  7,  0,  1,  0, 10,  0,  4,  0,  4],
        [10,  1, 11,  4,  4,  1, 13,  0,  4, 14,  9,  4, 11],
        [4,   0,  8,  0, 10,  0,  0,  0, 14,  0, 10,  0,  4],
        [10, 15, 16, 10,  0,  5,  8, 11,  1,  4,  0,  0, 16],
        [0,   0,  4,  0, 11,  0, 11,  0,  4,  0, 11,  0,  0],
        [17,  0,  0, 18,  4, 11,  4,  9,  0, 19,  4,  1, 20],
        [8,   0, 12,  0,  1,  0,  0,  0, 10,  0, 21,  0,  2],
        [14,  8,  2, 10, 22,  0, 23,  4,  9, 10, 15,  2,  9],
        [2,   0, 24,  0,  1,  0,  2,  0,  8,  0,  2,  0,  9],
        [14,  4,  4, 16,  7,  4, 10,  0,  7,  2,  4, 25,  4],
        [25,  0, 14,  0,  4,  0,  4,  0,  4,  0, 26,  0, 14]
    ],
    clues : { 13 : 'H', 3 : 'A' }    
}

var testGridD = {
    grid :  [ 
        [1,   2,  3,  4,  5,  6,  7,  7,  0,  0,  2,  0,  7],
        [3,   0,  2,  0,  2,  0,  8,  0,  6,  9,  8,  6, 10],
        [11, 12,  5,  4, 13, 11,  3,  6,  7,  0,  8,  0,  2],
        [5,   0,  7,  0, 14,  0,  2,  0, 15,  0, 10,  4,  8],
        [16, 11,  2, 17,  0,  7, 14,  3, 18,  8, 14,  0,  8],
        [0,   0, 19,  0,  4,  0,  7,  0,  4,  0,  0,  0,  6],
        [8,  11, 20,  4,  5, 16,  0,  8,  3,  4, 12,  6, 21],
        [3,   0,  0,  0, 22,  0, 16,  0,  6,  0,  4,  0,  0],
        [6,   0, 23,  3,  4,  2,  3,  7,  0,  7,  5,  4,  8],
        [17,  6,  2,  0, 24,  0, 11,  0, 16,  0,  6,  0,  2],
        [25,  0, 20,  0,  4,  5, 17,  6,  3,  8,  3,  6, 17],
        [6,  26,  6, 19, 17,  0, 17,  0,  4,  0,  2,  0,  4],
        [10,  0,  7,  0,  0, 24, 11,  3, 21,  6, 10, 10, 11]
    ],
    clues : { 14 : 'Y', 18 : 'U' }    
}

function isBlackCell(grid, x, y){
    var isBlack = false
    if(x < 0 || y < 0 || y >= grid.length || x >= grid[0].length){
        isBlack = true

    } else if(grid[y][x] == BLACK_CELL){
        isBlack = true
    }
    return isBlack
}

function beginsAcross(grid, x, y){
    return isBlackCell(grid, x-1, y) && !isBlackCell(grid, x, y) && !isBlackCell(grid, x+1, y)
}

function beginsDown(grid, x, y){
    return isBlackCell(grid, x, y-1) && !isBlackCell(grid, x, y) && !isBlackCell(grid, x, y+1)
}

function getAcrossAt(superscripts, letters, x, y){
    var word = []
    var dx = x
    while( !isBlackCell(superscripts, dx, y)) {
        var sup = superscripts[y][dx]
        var letter = letters[y][dx]
        if(!letter) letter = '?'
        word.push([sup, letter.toLowerCase(), [dx, y] ])
        dx += 1
    }
    return word
}

function getDownAt(superscripts, letters, x, y){
    var word = []
    var dy = y
    while( !isBlackCell(superscripts, x, dy)) {
        var sup = superscripts[dy][x]
        var letter = letters[dy][x]
        if(!letter) letter = '?'
        word.push([sup, letter.toLowerCase(), [x, dy] ])
        dy += 1
    }
    return word
}

function getWords(superscripts, letters){
    var across = []
    var down = []
    for(var y = 0; y < superscripts.length; ++y){
        for(var x = 0; x < superscripts[y].length; ++x){
            if(beginsAcross(superscripts,x,y)){
                across.push( getAcrossAt(superscripts, letters, x, y) )
            }
            if(beginsDown(superscripts,x,y)){
                down.push( getDownAt(superscripts, letters, x, y) )
            }
        }
    }

    var all = across.concat(down)
    //console.log( prettyQueries( all ) )

    return all
}

/*
  Most letters but still has some unsolved
*/
function mostLetters(querya, queryb){
    var counta = 0, countb = 0
    var solveda = true, solvedb = true
    for(var i = 0; i < querya.length; ++i){
        if(querya[i][1] != '?') counta++
        else solveda = false
    }

    for(var j = 0; j < queryb.length; ++j){
        if(queryb[j][1] != '?') countb++
        else solvedb = false
    }
    var res = countb - counta 
    if(solveda && !solvedb) res = -1
    else if(!solveda && solvedb) res = 1
    else if(solveda && solvedb) res = queryb.length - querya.length 
    return res
}

function sortQueries(queries){
    return queries.sort( mostLetters )
}
