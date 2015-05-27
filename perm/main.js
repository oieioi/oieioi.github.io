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

  var getQuery = function(params) {
    return '?subsets='    + encodeURIComponent(params.subsets.join('\n')) +
           '&size='       + encodeURIComponent(params.size)               +
           '&separator='  + encodeURIComponent(params.separator)          +
           '&filter='     + encodeURIComponent(params.filterStrings)      +
           '&duplicated=' + encodeURIComponent(params.duplicated);
  };

  var updateURI = function(params){
    location.search = getQuery(params);
    //console.log(query);
  };

  var readURI = function(){
    var hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (hash) {
      document.getElementById('subsets').value = hash;
    }
    var rawQueries = location.search.replace(/^\?/, '').split('&');

    var query =  {};
    rawQueries.forEach(function(item){
      query[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    });
    if (query.subsets !== undefined && query.subsets !== '') {
      document.getElementById('subsets').value = query.subsets;
    }
    if (query.size !== undefined && query.size !== '') {
      document.getElementById('size').value = query.size;
    }
    if (query.separator !== undefined && query.separator !== '') {
      document.getElementById('separator').value = query.separator;
    }
    if (query.filter !== undefined && query.filter !== '') {
      document.getElementById('filter').value = query.filter;
    }
    if (query.duplicated !== undefined && query.duplicated !== '') {
      document.getElementById('duplicated').checked = query.duplicated.indexOf('true') !== -1 ? true : false;
    }
  };

  var createTwitterLink = function(message, query){
    var messageEncoded = '';
    if (message) {
      messageEncoded = encodeURIComponent(message.substr(0, 110));
    }
    document.getElementById('twit').href = 'http://twitter.com/intent/tweet?text=' + messageEncoded +
                                           '&url=' + encodeURIComponent(location.origin + location.pathname + query);
  };

  var showError = function(message){
    document.getElementById('error').textContent = message;
  };

  var clearError = function(){
    document.getElementById('error').innerHTML = '&nbsp;';
  };

  var writeResult = function(result){
    document.getElementById('result').value = result;
  };

  var getInput = function(){
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

    return {
      subsets: subsets,
      size: size,
      separator: separator,
      filter: filter,
      filterStrings: filterStrings,
      duplicated: duplicated
    };
  };


  var readFromDOM = function(){
    var inputs = getInput();
    var perms = getPermutations(inputs.subsets, inputs.size);
    var result = perms.map(function(item){
      return item.join('');
    })
    .filter(function(item, index, self){
      if (!inputs.filter) {
        return true;
      }
      return inputs.filter.test(item);
    })
    .filter(function(item, index, self){
      if (inputs.duplicated) {
        return self.indexOf(item) === index;
      }
      return true;
    })
    .join(inputs.separator);

    return {
      subsets: inputs.subsets,
      size: inputs.size,
      separator: inputs.separator,
      filterStrings: inputs.filterStrings,
      filter: inputs.filter,
      duplicated: inputs.duplicated,
      result: result
    };
  };

  var init = function(){
    readURI();
    var inputs = getInput();
    createTwitterLink(inputs.result, getQuery(inputs));

    document.querySelector('.js-btn-execute')
    .addEventListener('click', function(e){
      e.preventDefault();
      var re = readFromDOM();
      writeResult(re.result);
      createTwitterLink(re.result, getQuery(re));
    });
    document.querySelector('.js-btn-link')
    .addEventListener('click', function(e){
      e.preventDefault();
      var re = readFromDOM();
      updateURI(re);
    });
  };

  init();
}).call(this);
