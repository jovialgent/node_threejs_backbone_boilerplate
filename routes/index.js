
/*
 * GET home page.
 */


exports.index = function(req, res){
    
    var settings = {
        title : "Sample App"
    }
    
   
    res.render('index', settings);
};