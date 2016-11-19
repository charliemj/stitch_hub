var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var chartSchema = mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
    type: String, //cross stitch, knitting,crochet 
    rowSize: Number,
    colSize: Number,
    rows:[[String]], //if things break look at this
    parent: {type:ObjectId,ref:"Chart"}
});


module.exports = mongoose.model("Chart", chartSchema);