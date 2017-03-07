/*
 MathJAX TeX notation https://en.wikibooks.org/wiki/LaTeX/Mathematics
*/
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}

// \[ ax + by = c \]
var userEq1Templ = _.template('\\[ {{a}}x + {{b}}y = {{c}} \\]')
var userEq2Templ = _.template('\\[ {{d}}x + {{e}}y = {{f}} \\]')

var isolateY1Templ = _.template('\\[ {{b}}y = {{c}} - {{a}}x \\]')
var isolateY2Templ = _.template('\\[ y = {{cdivb}} - \\frac{ {{a}}x }{ {{b}} } \\]')

var substituteYTempl =
        _.template('\\[ {{d}}x + {{e}} \\left( {{cdivb}} - \\frac{ {{a}}x }{ {{b}} } \\right)= {{f}} \\]')

var distributeETempl =
        _.template('\\[ {{d}}x + {{edotcdivb}} - \\frac{ {{adote}}x }{ {{b}} } = {{f}} \\]')

var combineTempl =
        _.template('\\[ {{d}}x - \\frac{ {{adote}}x }{ {{b}} } = {{fsubedotcdivb}} \\]')

var commonDenom1Templ =
        _.template('\\[ \\frac{ {{bdotd}}x }{ {{b}} } - \\frac{ {{adote}}x }{ {{b}} } = {{fsubedotcdivb}} \\]')

var commonDenom2Templ =
        _.template('\\[ \\frac{ {{bdotdsubadote}}x }{ {{b}} } = {{fsubedotcdivb}} \\]')

var xsolvedTempl = _.template('\\[ x = {{x}} \\]')

var solveY1 = '\\[ y = {{cdivb}} - \\frac{ {{a}}x }{ {{b}} } '
var solveY2 = ' = {{cdivb}} - \\frac{ {{a}} \\cdot {{x}} } { {{b}} } '
var solveY3 = ' = {{cdivb}} - \\frac{ {{a}} \\cdot {{x}} } { {{b}} } '
var solveY4 = ' = {{cdivb}} - {{adotxdivb}} = {{y}} \\]'
var solveYTempl = _.template(solveY1 + solveY2 + solveY3 + solveY4 )

var xySolvedTempl = _.template('\\[ x = {{x}}, y = {{y}} \\]')

var a = 1
var b = 0
var c = 0

var d = 1
var e = 0
var f = 0

function changeHandler(event){

    var ua = parseFloat($("#a").val())
    var ub = parseFloat($("#b").val())
    var uc = parseFloat($("#c").val())

    var ud = parseFloat($("#d").val())
    var ue = parseFloat($("#e").val())
    var uf = parseFloat($("#f").val())

    console.log(ua, ub, uc, ud, ue, uf)

    if(ua != NaN && ub != NaN && uc != NaN
       && ud != NaN && ue != NaN && uf != NaN){
        a = ua
        b = ub
        c = uc
        d = ud
        e = ue
        f = uf
        update()
    }
}

function short(n){
    var r = n
    var d = (""+n).indexOf(".")
    if( d > 0){
        r = (""+n).substring(0,d+5)
    }
    return r
}

var userEqQ = 0

function updateUserEquations(a, b, c, d, e, f){

    $("#user-eq1").hide()
    $("#user-eq2").hide()

    ++userEqQ

    var eq1TeX = userEq1Templ({
        a : short(a),
        b : short(b),
        c : short(c)
    })

    $("#user-eq1").text(eq1TeX)

    var eq2TeX = userEq2Templ({
        d : short(d),
        e : short(e),
        f : short(f)
    })

    $("#user-eq2").text(eq2TeX)

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "user-eq1"])
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "user-eq2"])

    setTimeout(function(){
        if(--userEqQ == 0 ){
            $("#user-eq1").show()
            $("#user-eq2").show()
        }
    }, 500)

}

var isolateYQ = 0

function isolateY(a, b, c, cdivb){

    $("#isolate-y-eq1").hide()
    $("#isolate-y-eq2").hide()

    ++isolateYQ

    var isolateY1TeX = isolateY1Templ({
        a : short(a),
        b : short(b),
        c : short(c)
    })

    $("#isolate-y-eq1").text(isolateY1TeX)

    var isolateY2TeX = isolateY2Templ({
        a : short(a),
        b : short(b),
        cdivb : short(cdivb)
    })

    $("#isolate-y-eq2").text(isolateY2TeX)

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "isolate-y-eq1"])
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "isolate-y-eq2"])

    setTimeout(function(){
        if(--isolateYQ == 0 ){
            $("#isolate-y-eq1").show()
            $("#isolate-y-eq2").show()
        }
    }, 500)

}

var subYQ = 0
function substituteY(a, b, cdivb, d, e, f){

    $("#substitute-y-eq").hide()
    ++subYQ

    var substituteYTeX = substituteYTempl({
        a : short(a),
        b : short(b),
        cdivb : short(cdivb),
        d : short(d),
        e : short(e),
        f : short(f)
    })

    $("#substitute-y-eq").text(substituteYTeX)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "substitute-y-eq"])

    setTimeout(function(){ if(--subYQ == 0 ){ $("#substitute-y-eq").show() }}, 500)

}

var distEQ = 0
function distributeE(d, edotcdivb, adote, b, f){

    $("#distribute-e-eq").hide()
    ++distEQ

    var distributeETeX = distributeETempl({
        d : short(d),
        edotcdivb : short(edotcdivb),
        adote : short(adote),
        b : short(b),
        f : short(f)
    })

    $("#distribute-e-eq").text(distributeETeX)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "distribute-e-eq"])

    setTimeout(function(){ if(--distEQ == 0 ){ $("#distribute-e-eq").show() }}, 500)
}

var combineQ = 0
function combineTerms(d, adote, b, fsubedotcdivb){

    $("#combine-terms-eq").hide()
    ++combineQ

    var combineTex = combineTempl({
        d : short(d),
        adote : short(adote),
        b : short(b),
        fsubedotcdivb : short(fsubedotcdivb)
    })

    $("#combine-terms-eq").text(combineTex)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "combine-terms-eq"])

    setTimeout(function(){ if(--combineQ == 0 ){ $("#combine-terms-eq").show() }}, 500)
}

var commonDenomQ = 0
function commonDenom(bdotd, b, adote, bdotdsubadote, fsubedotcdivb, x){

    $("#common-denom-eq1").hide()
    $("#common-denom-eq2").hide()
    $("#x-solved-eq").hide()
    ++commonDenomQ

    var commonDenom1TeX = commonDenom1Templ({
        bdotd : short(bdotd),
        b : short(b),
        adote : short(adote),
        fsubedotcdivb : short(fsubedotcdivb)
    })

    $("#common-denom-eq1").text(commonDenom1TeX)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "common-denom-eq1"])

    var commonDenom2TeX = commonDenom2Templ({
        b : short(b),
        bdotdsubadote : short(bdotdsubadote),
        fsubedotcdivb : short(fsubedotcdivb)
    })

    $("#common-denom-eq2").text(commonDenom2TeX)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "common-denom-eq2"])

    var xsolvedTeX = xsolvedTempl({ x : short(x)})
    $("#x-solved-eq").text(xsolvedTeX)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "x-solved-eq"])

    setTimeout(function(){
        if(--commonDenomQ == 0 ){
            $("#common-denom-eq1").show()
            $("#common-denom-eq2").show()
            $("#x-solved-eq").show()
        }}, 500)
}

var solveYQ = 0
function solveY(cdivb, a, b, x, adotxdivb, y){

    $("#solve-y-eq").hide()
    ++solveYQ

    var solveYTeX = solveYTempl({
        cdivb : short(cdivb),
        a : short(a),
        b : short(b),
        x : short(x),
        adotxdivb : short(adotxdivb),
        y : short(y)
    })

    setTimeout(function(){
        $("#solve-y-eq").text(solveYTeX)
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "solve-y-eq"])
    })

    setTimeout(function(){ if(--solveYQ == 0 ){ $("#solve-y-eq").show() }}, 500)

}

var showSolQ = 0
function showSolution(x, y){

    $("#x-y-eq").hide()
    ++showSolQ

    var xySolvedTeX = xySolvedTempl({ x : short(x), y : short(y) })

    $("#x-y-eq").text(xySolvedTeX)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "x-y-eq"])

    setTimeout(function(){ if(--showSolQ == 0 ){ $("#x-y-eq").show() }}, 500)
}


function update(){

    var cdivb = 0.0 + c / b
    var edotcdivb = e * cdivb
    var adote = a * e
    var fsubedotcdivb = f - edotcdivb
    var bdotd = b * d
    var bdotdsubadote = bdotd - adote
    var x = 0.0 + fsubedotcdivb * b / bdotdsubadote
    var adotxdivb = a * x / b
    var y = cdivb - adotxdivb

    console.log("a", a, "b", b, "c", c, "d", d, "e", e, "f", f)
    console.log("e * c = ", e * c)
    console.log("a * e = ", a * e)
    console.log("b * d = ", b * d)
    console.log("b * d - a * e = ", b * d - a * e)
    console.log("x = ", x)

    setTimeout(function(){ updateUserEquations(a, b, c, d, e, f) })
    setTimeout(function(){ isolateY(a, b, c, cdivb) }, 250)
    setTimeout(function(){ substituteY(a, b, cdivb, d ,e ,f) }, 500)
    setTimeout(function(){ distributeE(d, edotcdivb, adote, b, f) }, 750)
    setTimeout(function(){ combineTerms(d, adote, b, fsubedotcdivb) }, 1000)
    setTimeout(function(){ commonDenom(bdotd, b, adote, bdotdsubadote, fsubedotcdivb, x)}, 1250)
    setTimeout(function(){ solveY(cdivb, a, b, x, adotxdivb, y) }, 1500 )
    setTimeout(function(){ showSolution(x, y) }, 1750)

}

$(function(){
    $("#a").change(changeHandler)
    $("#b").change(changeHandler)
    $("#c").change(changeHandler)
    $("#d").change(changeHandler)
    $("#e").change(changeHandler)
    $("#f").change(changeHandler)
})
