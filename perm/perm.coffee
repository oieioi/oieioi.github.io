module.exports = getPermutations = (ary, size)->

  aryProcessed = ary.map (item) -> [item]

  createNewPerms = (a, subsets) ->
    result = []
    a.forEach (aitem) ->
      aItemAdded = subsets.map (subset) ->
        aitem.concat subset
      result = result.concat aItemAdded
    result

  f = (perms, subsets, size)->
    if perms[0].length is size
      return perms
    f (createNewPerms perms, subsets), subsets, size

  f aryProcessed, ary, size

