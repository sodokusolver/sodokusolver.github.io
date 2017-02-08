function getGridQueries(){
    var across = [], down = [], seen = {}

    function addCell(x, y, query){
        var val = '?'
        var cell = $("#" + x + "-" + y)
        var text = cell.text()
        var index = cell.attr("index")
        if(text){
            val = text.charAt(0).toLowerCase()
            if(seen[val]) index = seen[val]
            else seen[val] = index
            cell.attr("index", index)
        }
        query.push([ index, val])
    }

    // across
    for(var y = 0; y < 5; ++y){
        var query = []
        across.push(query)
        for(var x = 0; x < 5; ++x) addCell(x, y, query)
    }

    // down
    for(var x = 0; x < 5; ++x){
        var query = []
        down.push(query)
        for(var y = 0; y < 5; ++y) addCell(x, y, query)
    }

    return across.concat(down)
}

function applySolution(solution){
    for(var y = 0; y < 10; ++y){
        for(var x = 0; x < 5; ++x){
            var part = solution[y][x]
            $("#" + x + "-" + y).html(part[1].toUpperCase())
        }
    }
}

function showWords(solution){
    var words = []
    for(var y = 0; y < 10; ++y){
        var word = ""
        for(var x = 0; x < 5; ++x){
            var part = solution[y][x]
            word += part[1]
        }
        words.push(word)
    }
    renderResults(words)
}

function solveHandler(event){

    disable()
    var queries = getGridQueries()
    console.log("queries:", prettyQueries( queries ) )

    var solved = solve( queries )
    console.log("solution:", prettyQueries( solved ) )
    if(solved){
        applySolution( solved )
        showWords( solved )
    } else {
        flashGrid()
    }

    enable()
}


function enable(){
    $("#solve").prop("disabled", false)
}

function disable(){
    $("#solve").prop("disabled", true)
}

function initGrid(){

    $("#puzzle-grid tr td").attr("contenteditable","true")
    $("#puzzle-grid tr td").addClass("cell")
    $(".cell").keydown(gridKeyHandlerFactory(5, 5, {
        "accept" : acceptUpperLetters
    }))
    $("#solve").click(solveHandler)

    var index = 0
    for(var y = 0; y < 5; ++y){
        for(var x = 0; x < 5; ++x){
            var id = x + "-" + y
            var cell = document.getElementById( id )
            $(cell).attr("index", ++index)
        }
    }
}

$(function(){ initGrid(); })
