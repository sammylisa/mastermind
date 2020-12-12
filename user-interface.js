"use strict";

var highlightColor = 'rgb(128, 128, 128)';
var currentRow = 1;
var currentPegs = '.peg' + currentRow;
var blankPegColor = 'rgb(33, 37, 41)';
var userAnswer = [];

var colors = {
    r: 'rgb(255, 0, 0)',
    w: 'rgb(255, 255, 255)',
    g: 'rgb(0, 255, 0)',
    t: 'rgb(150, 75, 0)',
    b: 'rgb(0, 0, 255)',
    o: 'rgb(255, 165, 0)',
    y: 'rgb(255, 255, 0)',
    m: 'rgb(255, 0, 255)'
};

var answer = {
    initialize: function() {
        // initialize the answer randomly
        var colorArr = Object.keys(colors);
        for (var i = 0; i < 5; i++) {
            this.key.push(colors[colorArr[this.getRandomInt(7)]]);
        }
    },
    grade: function() {
        // returns an array with numBlack, numWhite
        var numWhite = 0;
        var numBlack = 0;
        var userAnswerCpy = new Object(userAnswer);
        for (var i = 0; i < this.key.length; i++) {
            // check exact position
            if (this.key[i] === userAnswerCpy[i]) {
                numWhite++;
                userAnswerCpy[i] = null;
            } else {
                // check the rest
                for (var j = 0; j < userAnswerCpy.length; j++) {
                    if (userAnswerCpy[j] === this.key[i] && (userAnswerCpy[j] !== this.key[j])) {
                        numBlack++;
                        userAnswerCpy[j] = null;
                        break;
                    }
                }
            }
        }
        return [numWhite, numBlack];
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    key: []
};

answer.initialize();

// for selecting between the available pegs
function highlight(hovered) {
    clearHighlight();
    if ($(hovered).css('color') === blankPegColor) {
        $(hovered).css("color", highlightColor);
    }
}

function removeHighlight(clicked) {
    $(clicked).css('color', highlightColor);
}

function clearHighlight() {
    $.each($(currentPegs), function(_index, value) {
        if ($(value).css("color") === highlightColor) {
            $(value).css("color", blankPegColor);
        }
    });
}

// filling a color into a peg
function fill(filled, color) {
    $(filled).css("color", color);
}

$(currentPegs).hover(function() {
    highlight(this);
});

$(currentPegs).click(function() {
    removeHighlight(this);
});

function logScore() {
    if (answer.key.length === 0) {
        answer.initialize();
    }
    console.log(answer.key);
    var scoreDiv = $("#score"+currentRow);
    var scores = answer.grade();
    scoreDiv.html('');
    for (var i = 0; i < scores[1]; i++) {
        scoreDiv.append('<i class="fas fa-meh-blank"></i>');
    }
    for (var i = 0; i < scores[0]; i++) {
        scoreDiv.append('<i class="far fa-meh-blank"></i>');
    }
    scoreDiv.show(400);
    // returns whether or not the game was won
    return scores[0] === 5;
}

function displayAnswer() {
    for (var i = 0; i < answer.key.length; i++) {
        var circle = '#a'+(i+1);
        fill(circle, answer.key[i]);
    }
    $('#answer').show(400);
}

$(document).keypress(function(key) {
    var canLevelUp = true;
    // enter next level
    if (key.key === "Enter") {
        $.each($(currentPegs), function(_index, value) {
            if ($(value).css('color') === blankPegColor || $(value).css('color') === highlightColor) {
                canLevelUp = false;
            }
        });
        if (canLevelUp) {
            $.each($(currentPegs), function(_index, value) {
                userAnswer.push($(value).css('color'));
            });
            var gameWon = logScore();
            userAnswer = [];
            $(currentPegs).off('hover');
            $(currentPegs).off('click');
            currentRow++;
            var newRow = '#' + currentRow;
            if (!gameWon) {
                $(newRow).show(400);
                currentPegs = '.peg' + currentRow;
                $(currentPegs).hover( function() {
                    highlight(this);
                });
                $(currentPegs).click(function() {
                    removeHighlight(this);
                });
                if (currentRow === 13) {
                    setTimeout(function() {
                        alert('You lost!');
                    }, 400);
                    displayAnswer();
                }
            } else {
                setTimeout(function() {
                    alert('You win!');
                }, 400);
                displayAnswer();
            }
        }
    }

    // clear the pegs
    if (key.key === ' ') {
        $(currentPegs).css("color", blankPegColor);
        return;
    }

    // fill in the highlighted color
    $.each($(currentPegs), function(_index, value) {
        if ($(value).css("color") === highlightColor) {
            $(value).css("color", colors[key.key]);
            return;
        }
    });
});