// These functions are O(N^2). We could do them faster because the arrays are
// sorted but I didn't want to write a binary search algorithm.

module.exports.subtract = function (a, b) {
  var result = [];

  outer: for (var i = 0; i < a.length; i += 1) {
    for (var j = 0; j < b.length; j += 1) {
      if (a[i] === b[j]) {
        continue outer;
      }
    }

    result.push(a[i]);
  }

  return result;
};

module.exports.intersect = function (a, b) {
  var result = [];

  outer: for (var i = 0; i < a.length; i += 1) {
    for (var j = 0; j < b.length; j += 1) {
      if (a[i] === b[j]) {
        result.push(a[i]);
        continue outer;
      }
    }
  }

  return result;
};

module.exports.numericSort = function (numbers, fn) {
  return numbers.sort(function (a, b) {
    return fn(a) - fn(b);
  });
};

module.exports.merge = function (a, b, fn) {
  return module.exports.numericSort(a.concat(b), fn);
};
