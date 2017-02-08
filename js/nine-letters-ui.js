function getGrid(){
    var grid = []
    for(var y = 0; y < 3; ++y){
        for(var x = 0; x < 3; ++x){
            var id = x+"-"+y
            var cell = document.getElementById( id )
            var val = cell.textContent
            if(val){
                grid.push( val )
            } else {
                grid.push( 0 )
            }
        }
    }
    return grid
}


function validate(grid){
    var valid = true

    if(!grid || grid.length != 9){
        valid = false
    } else {
        for(var i = 0; i < grid.length; i++){
            var k = grid[i]
            if(!k){
                valid = false
                break
            }
            var c = k.charCodeAt(0)
            if( ! (c >= LOWER_A && c <= LOWER_Z || c >= UPPER_A && c <= UPPER_Z)){
                valid = false
                break
            }

        }
    }
    return valid
}

function sortGrid(grid){
    // rearrange to have important center square at the beginning
    var sorted = [grid[4]].concat(grid.slice(0,4).concat(grid.slice(5)))
    for(var i = 0; i < sorted.length; ++i){
        sorted[i] = sorted[i].toLowerCase()
    }
    return sorted
}

function searchHandler(){

    disable()
    var grid = getGrid(3,3)
    if(!validate(grid)){
        flashGrid()

    } else {
        var sorted = sortGrid(grid)
        var results = searchAnagrams(sorted)
        if(results && results.length > 0){
            renderResults(results)
        } else {
            flashGrid()
        }
    }

    enable()
}

function enable(){
    $("#search").prop("disabled",false)
}

function disable(){
    $("#search").prop("disabled",true)
}

$(function(){

    $("#puzzle-grid tr td").attr("contenteditable","true")
    $("#puzzle-grid tr td").addClass("cell")

    $(".cell").keydown(gridKeyHandlerFactory(3, 3, {
        "accept" : acceptUpperLetters
    }))

    $("#search").click(searchHandler)

})
