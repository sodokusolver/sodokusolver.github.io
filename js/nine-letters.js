// first letter must be included
var testLetters = [ 'i', 'y', 'l', 'h', 'f', 'j', 'e', 'l', 's']

/*
  Check all letters are present
*/
function verifyLetters(word, letters){
    var valid  = true
    for(var j = 0; j < word.length; ++j){

        var wordLetter = word.charAt(j)

        var found = false
        for(var k = 0; k < letters.length; ++k){
            if(letters[k] == wordLetter){
                found = true
            }
        }
        if(!found){
            valid = false
            break
        }
    }
    return valid
}

/*
  Extra check that letter is used only once.
  Done after passed other validation.
*/
function verifyLetterCount(word, letters){
    var valid = true
    var copyLetters = letters.slice()

    for(var j = 0; j < word.length; ++j){

        var wordLetter = word.charAt(j)
        var found = false

        for(var k = 0; k < copyLetters.length; ++k){
            if(copyLetters[k] == wordLetter){
                found = true
                break
            }
        }
        if(found){
            copyLetters = copyLetters.slice(0,k).concat(copyLetters.slice(k+1))
        } else {
            valid = false
            break
        }
    }
    return valid
}

// Log the loading/processing time
var startTime

// loaded dictionary words
var words = []
function loadWords(rawData){

    words = rawData.split('\n')
    var endTime = Date.now()
    
    console.log("loaded in:", (endTime - startTime) / 1000, "s"  )    
}


function search(letters){

    console.log("searching")
    
    var solutions = []
    for(var i = 0; i < words.length; ++i){

        var word = words[i].trim()
        // Requires the first letter
        if(word.length >= 4 && word.indexOf(letters[0]) > 0){
            // Check other letters and that they are used only once
            if(verifyLetters(word, letters) && verifyLetterCount(word, letters)){
                solutions.push(word)
            }
        }
    }
    var endTime = Date.now()

    console.log("searched in:", (endTime - startTime) / 1000, "s"  )
    console.log( solutions.length, solutions )

    solutions = solutions.sort(function(a, b){        
        return b.length - a.length;
    });

    return solutions

}


$(function(){

    startTime = Date.now()
    console.log("loading...")
    $.get("wordsEn.txt", loadWords)

})
