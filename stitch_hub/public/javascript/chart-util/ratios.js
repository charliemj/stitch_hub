/**
* Given a type, returns a JSON object representing the standard
* size of each cell for a chart of that type.
* The JSON object has two keys: 'cellWidth' and 'cellHeight'.
* The values they have are as the name of the key suggests.
*/
var getStandardSize = function(type){
  var standardSizes = {
    'CROSS_STITCH': { cellWidth: 12, cellHeight: 12 },
    'KNIT_V': { cellWidth: 12, cellHeight: 15 },
    'KNIT_H': { cellWidth: 15, cellHeight: 12 },
    'CROCHET_V': { cellWidth: 12, cellHeight: 16 },
    'CROCHET_H': { cellWidth: 16, cellHeight: 12 },
  };

  return standardSizes[type];
};