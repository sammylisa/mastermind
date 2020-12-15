var cpuAns = {
    cpuGuess: [],
    possibleSpots: [
        Object.keys(colors),
        Object.keys(colors),
        Object.keys(colors),
        Object.keys(colors),
        Object.keys(colors),
    ],
    initialize: function() {
        // initialize the answer randomly
        this.cpuGuess = [];
        var colorArr = Object.keys(colors);
        for (var i = 0; i < 5; i++) {
            this.cpuGuess.push(colors[colorArr[getRandomInt(colorArr.length)]]);
        }
    },
    evalScore: function() {
        // score[0] = number of whites, score[1] = number of blacks
        var score = grade(this.cpuGuess);
        console.log(score);
        if (score[0] === 0) {
            if (score[1] === 0) {
                // no pegs means rule out all colors for this answer
            } else {

            }
        }
    }
}

$('#cpu-play').click(function() {
    var newRow = '#' + currentRow;
    if (currentRow != 1) {
        $(newRow).show(400);
    }
    cpuAns.initialize();
    renderGuess(cpuAns.cpuGuess);
    for (var i = 0; i < 5; i++) {
        var elem = '#peg' + currentRow + i;
        fill(elem, cpuAns.cpuGuess[i]);
    }
    logScore(cpuAns.cpuGuess);
    currentRow++;
    currentPegs = '.peg' + currentRow;
});