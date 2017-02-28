function wordSearchHandler(event){

    var curr = $(event.currentTarget).val()
    var chars = curr.split("")
    var ref = 99
    
    var query = []
    var letters = []
    for(var i = 0; i < chars.length; ++i){
        var c = chars[i]
        letters.push(c)
        console.log( c )        
        if(c == '?'){
            query.push([ref--, '?'])
            
        } else if (c >= 0 || c <= 9) {
            query.push([c, '?'])
            
        } else {
            query.push([ref--, c.toLowerCase()])
        }
    }

    if(query.length > 0){
        console.log( "query", query )
        var results = search(query)        
        if(!results || results.length == 0 ){
            results = ["nope"]
        }
        renderResults( results )

    }

}

var QM = 191

function uppers(event){
    var k = event.keyCode || event.charCode
    var shifted = event.shiftKey
    var result = null

    if (k >= ZERO && k <= NINE && shifted){
        event.preventDefault()            

    } else if (k >= ZERO && k <= NINE
               || k >= LOWER_A && k <= LOWER_Z
               || k >= UPPER_A && k <= UPPER_Z
               || k == QM && shifted
               || k == LEFT || k == RIGHT
               || k == DEL || k == BACKSPACE
               || k == RETURN ){
        // OK
                   
    } else {
        event.preventDefault()
        
    }  

    if(result){
        event.preventDefault()        
        var curr = $(event.currentTarget).val()
        $(event.currentTarget).val(curr + result)
    }
    
    return result
}

$(function(){
    $("#word-search").focus()
    $("#word-search").keydown(uppers)
    $("#word-search").change(wordSearchHandler)
})
