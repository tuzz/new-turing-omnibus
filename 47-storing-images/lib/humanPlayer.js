"use strict";

var HumanPlayer = function (bool) {
  var self = this;
  var currentTree, turnToPlay;

  self.callback = function (quadrant) {
    if (!turnToPlay) {
      return;
    }

    var chosenQuadrant = currentTree[quadrant]();

    if (chosenQuadrant.root.children.length === 0) {
      return;
    }

    updateDialog(quadrant);

    turnToPlay(chosenQuadrant);
    turnToPlay = undefined;
  };

  self.playTurn = function (tree, callback) {
    currentTree = tree;
    turnToPlay = callback;
  };

  var updateDialog = function (quadrant) {
    if (typeof document === "undefined") {
      return;
    }

    var dialog = document.getElementById("dialog");
    dialog.innerHTML = dialog.innerHTML + "<br/>" + "You steer " + quadrant + ".";
  };
};

module.exports = HumanPlayer;
