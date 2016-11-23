var getRatio = function(type){
      var ratios = {
        'CROSS_STITCH': [4,4],
        'KNIT_V': [4,5],
        'KNIT_H': [5,4],
        'CROCHET_V': [3,4],
        'CROCHET_H': [4,3]

          };

      var size = ratios[type];
      var xscale = size[0];
      var yscale = size[1];

      return [type,xscale,yscale];

    };