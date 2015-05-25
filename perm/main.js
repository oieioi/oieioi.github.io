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

  var updateURI = function(params){
    var hash = encodeURIComponent(params.subsets);
    location.hash = '#' + hash;
    var query = '?size='       + encodeURIComponent(params.size)        +
                '&separator='  + encodeURIComponent(params.separator)   +
                '&filter='     + encodeURIComponent(params.filter)      +
                '&duplicated=' + encodeURIComponent(params.duplicated);
    location.search = query;
    //console.log(query);
  };

  var readURI = function(){
    var hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (hash) {
      document.getElementById('subsets').value =  hash;
    }
    var rawQueries = location.search.replace(/^\?/, '').split('&');

    var query =  {};
    rawQueries.forEach(function(item){
      query[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    });
    if (query.size !== undefined && query.size !== '') {
      document.getElementById('size').value = query.size;
    }
    if (query.separator !== undefined && query.separator !== '') {
      document.getElementById('separator').value = query.separator;
    }
    if (query.filter !== undefined && query.filter !== '') {
      document.getElementById('filter').value = query.filter;
    }
    document.getElementById('duplicated').checked = query.duplicated.indexOf('true') !== -1 ? true : false;
  };

  var createTwitterLink = function(message){
    var messageEncoded = encodeURIComponent(message.substr(0, 120));
    document.getElementById('twit').href = 'http://twitter.com/intent/tweet?text=' + messageEncoded +
                                           '&url=' + encodeURIComponent(location.href);
  };

  var showError = function(message){
    document.getElementById('error').textContent = message;
  };

  var clearError = function(){
    document.getElementById('error').innerHTML = '&nbsp;';
  };

  var init = function(){
    readURI();
    //readAndWrite();
  };

  window.execPerm = function(){
    var i = readAndWrite();
    updateURI(i);
    createTwitterLink(i);
  };

  var readAndWrite = function(){
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

    return {
      subsets: subsets.join('\n'),
      size: size,
      separator: separator,
      filter: filterStrings,
      duplicated: duplicated
    };
  };

  init();
}).call(this);
