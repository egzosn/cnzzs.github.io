/**
 * @author egan
 * @email cnzhengzs@gmail.com
 */
/**
 *
 * @param dom
 * @param data
 * @returns {*}
 */
base =""
function drawing(dom, data){
   for(var key in data){
       dom = dom.replace(new RegExp('\\({'+ key+'}\\)', "g"), data[key])
   }
    return dom
}

function formatString2Array(str) {

    for (var i = 0; i < arguments.length - 1; i++) {
        str = str.replace("%s", arguments[i + 1]);
    }
    return str;
}
function formatString2Map(str, map) {
    for(var key in map){
        str = str.replace(new RegExp('\\({'+ key+'}\\)', "g"), map[key])
    }
    return str;
}



var _options = {
    rowFilter:function(dom, row, data){
        return dom;
    },
    before:function(row, data){
        return row;
    },
    callback:function(row,data){
        return row;
    }

};

function load(url, dom, options){

    var ops = $.extend({}, _options,options);
    $.ajax({
        url : base + url,
        type : "get",
        dataType : 'json',
        success : function(data) {
            if (data.code == 0) {
                var rows = data.rows;
                var $dom = $(dom)
                var content = $dom.html();
                $dom.html("");
                for(var i in rows){
                    var html = ops.rowFilter(content,  rows[i], data)
                    //if(options.befor){
                        rows[i] = ops.before(rows[i], data);
                    //}
                    $dom.append(drawing(html, rows[i]));
                    if (i==0){
                        $dom.show();
                    }
                }
                ops.callback(rows, data);
            }
        }
    })
}
function loadOne(url, dom, options){
    options = $.extend({}, _options,options);
    $.ajax({
        url : base + url,
        type : "get",
        dataType : 'json',
        success : function(data) {
            if (data.code == 0) {
                var row = data.content;
                //if(options.befor){
                    row =options.before(row);
                //}
                var dom= $(dom)
                var content = dom.html();
                dom.html("");
                dom.append(drawing(content, row));
                //if(options.callback){
                    options.callback();
                //}
            }
        }
    })
}