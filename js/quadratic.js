/*
 MathJAX TeX notation https://en.wikibooks.org/wiki/LaTeX/Mathematics
*/
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}

// \[ ax^2 + bx + c = 0 \]
var quadraticTempl = _.template('\\[ {{a}}\\cdot x^2 + {{b}}\\cdot x + {{c}} = 0 \\]')

// \[ \frac{-b\pm\sqrt{b^2-4ac}}{2a} \]
var formulaTempl = _.template(
    '\\[ \\frac{-({{b}})\\pm\\sqrt{ {{b}} ^2-4 \\cdot {{a}} \\cdot {{c}} }}{2 \\cdot {{a}} } \\]'
)

var tupleTempl = _.template('({{a}}, {{b}})')

var a = 1
var b = 0
var c = 0

var rootA
var rootB

function solveFormula(a, b, c){

    var adot2 = 2 * a;
    console.log("2.a:", adot2)

    var b24ac = Math.abs( Math.pow(b,2) - 4 * a * c)
    console.log("|b^2 - 4.a.c|:", b24ac)

    var sqrtb24ac = Math.sqrt(b24ac)
    console.log("sqrt(b^2 - 4.a.c):", sqrtb24ac)

    var rootA = (- b - sqrtb24ac) / adot2
    var rootB = (- b + sqrtb24ac) / adot2

    console.log("rootA:", rootA, "rootB", rootB)
    return [rootA,rootB]
}

updateRoots(solveFormula(a, b, c))

var plot = quadratic(a,b,c,rootA,rootB)

function changeHandler(event){

    var ua = parseFloat($("#a").val())
    var ub = parseFloat($("#b").val())
    var uc = parseFloat($("#c").val())

    console.log(ua, ub, uc)

    if(ua != NaN && ub != NaN && uc != NaN ){
        a = ua
        b = ub
        c = uc
        update()
    }
}

function short(a){
    return (a+"").substring(0,5)
}

function updateRoots(roots){
    rootA = roots[0]
    rootB = roots[1]
    $("#roots").text(tupleTempl({
        a: short(rootA),
        b : short(rootB)
    }))
}

var depth = 0

function update(){

    $("#user-quadratic").hide()
    $("#user-formula").hide()
    ++depth

    var eqTeX = quadraticTempl({ a : a, b : b, c : c })
    $("#user-quadratic").text(eqTeX)

    var formTeX = formulaTempl({ a : a, b : b, c : c })
    $("#user-formula").text(formTeX)

    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"user-quadratic"]);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"user-formula"]);

    setTimeout(function(){
        if(--depth == 0 ){
            $("#user-quadratic").show()
            $("#user-formula").show()
        }
    }, 350)

    var roots = solveFormula(a, b, c)
    if(roots){
        updateRoots(roots)
        plot = quadratic(a, b, c, rootA, rootB)
    }
}

var width = 600
var height = 600

// y = ax^2 + bx + c
function quadratic(a, b, c, rootA, rootB){

    this.a = a
    this.b = b
    this.c = c

    this.rootA = rootA
    this.rootB = rootB

    // x,y low and high ... could use heuristic
    this.xl = -10
    this.xh = 10
    this.yl = -100
    this.yh = 100

    this.draw = function(){

        background(255)
        stroke(0)
        strokeWeight(1)

        // x == 0, y == 0
        var px_0 = lerp(0,width,norm(0,this.xl,this.xh))
        var py_0 = lerp(0,height,norm(0,this.yl,this.yh))
        line(0, px_0, width, px_0)
        line(py_0, 0, py_0, height)

        // x labels
        text(xl, 5, px_0 + 20)
        text(xh, width - 15, px_0 + 20)
        text(0, width / 2 - 15, px_0 + 20)
        // y labels
        text(yh, width / 2 - 30, 20)
        text(yl, width / 2 - 30, height - 15)

        noFill()
        beginShape()
        for(var x = xl; x <= xh; ++x){
            var y = a * Math.pow(x,2) + b * x + c

            var nx = norm(x,xl,xh)
            var ny = norm(y,yl,yh)

            var px = lerp(0, width, nx)
            // y is height -> 0 since computers are in the southern hempisphere
            var py = lerp(height, 0, ny)
            curveVertex(px,py)
        }
        endShape()

        var mx = lerp(xl,xh,norm(mouseX,0,width))
        var my = lerp(yl,yh,norm(mouseY,height,0))

        text(tupleTempl({
            a : short(mx),
            b : short(my)
        }), mouseX, mouseY)
    }
}

function setup() {
    var graph = createCanvas(600, 600)
    graph.parent('graph-container');
    frameRate(12)
    textSize(12)
}

function draw() {
    plot.draw()
}

$(function(){
    $("#a").change(changeHandler)
    $("#b").change(changeHandler)
    $("#c").change(changeHandler)

})
