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
      if (perms[0].length >= size) {
        return perms;
      }
      return f(createNewPerms(perms, subsets), subsets, size);
    };
    return f(aryProcessed, ary, size);
  };

  var createTwitterLink = function(message){
    var messageEncoded = encodeURIComponent(message.substr(0, 120) + ' ' + location.href);
    document.getElementById('twit').href = 'http://twitter.com/?status=' + messageEncoded;
  };

  var showError = function(message){
    document.getElementById('error').textContent = message;
  };

  var clearError = function(){
    document.getElementById('error').innerHTML = '&nbsp;';
  };

  window.execPerm = function(){
    var size = +document.getElementById('size').value;
    if (isNaN(size)) {
      return showError('数字を入れてね');
    }
    if (size <= 0) {
      return showError('0や負の数はだめだよ');
    }
    clearError();

    var separator = document.getElementById('separator').value;
    var filterStrings = document.getElementById('filter').value;
    var filter = filterStrings === '' ? null : new RegExp(filterStrings);
    var duplicated = document.getElementById('duplicated').checked;

    var subsets = document.getElementById('subsets')
      .value
      .split('\n');

    var perms = getPermutations(subsets, size);
    var result = perms.map(function(item){
      return item.join('');
    })
    .filter(function(item, index, self){
      if (!filter) {
        return true;
      }
      return filter.test(item);
    })
    .filter(function(item, index, self){
      if (duplicated) {
        return self.indexOf(item) === index;
      }
      return true;
    })
    .join(separator);

    document.getElementById('result').value = result;

    createTwitterLink(result);
  };
}).call(this);
