var getRatio = function(type){
      var ratios = {
        'CROSS_STICH': [12,12],
        'KNIT_V': [12,15],
        'KNIT_H': [15,12],
        'CROCHET_H': [12,16],
        'CROCHET_V': [16,12],

          }

      var size = ratios[type];
      var xscale = size[0];
      var yscale = size[1];

      return [type,xscale,yscale];

    }