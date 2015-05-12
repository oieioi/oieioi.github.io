(function() {
  var getPermutations;
  getPermutations = function(ary, size) {
    var aryProcessed, createNewPerms, f;
    aryProcessed = ary.map(function(item) {
      return [item];
    });
    createNewPerms = function(a, subsets) {
      var result;
      result = [];
      a.forEach(function(aitem) {
        var aItemAdded;
        aItemAdded = subsets.map(function(subset) {
          return aitem.concat(subset);
        });
        return result = result.concat(aItemAdded);
      });
      return result;
    };
    f = function(perms, subsets, size) {
      if (perms[0].length === size) {
        return perms;
      }
      return f(createNewPerms(perms, subsets), subsets, size);
    };
    return f(aryProcessed, ary, size);
  };

  window.execPerm = function(){
    var size = +document.getElementById('size').value;
    var subsetsStr = document.getElementById('subsets').value;
    var subsets = subsetsStr.split('\n');
    var perms = getPermutations(subsets, size);
    document.getElementById('result').textContent = perms.map(function(item){return item.join('')}).join(',');
    console.log(perms);
  };

}).call(this);
