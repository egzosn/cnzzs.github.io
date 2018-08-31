/**
 * Created by egzosn on 2018/8/31.
 */
$(function () {
    var request=new GetRequest();
    var url = location.href;
    url = url.indexOf("?") >0 ? url.substring(0, url.indexOf("?")) : url
    var flag = null != request["id"];
    if (flag){
        loadContent(request["id"]);
    }


    load("data/subsideList.json", $('[js-do="subsideList"]'), {
        before: function (row) {
            row["url"] = url;
            row["c"] = "";
            if (null == request["id"]) {
                request["id"] = row["id"];
            }
            if (request["id"] == row["id"]) {
                row["c"] = " current";
                $('#sLevel1').html(row["title"])
            }
            return row;
        },
        callback:function () {
            if (!flag && request["id"]){
                loadContent(request["id"]);
            }
        }
    })



})

function loadContent(pid) {
    load(formatString2Array("data/subsideContent%s.json", pid), $('[js-do="body"]'), {
        callback:function () {
            if (location.hash){
                var id = document.getElementById(location.hash.replace("#", ""));
                if (id){
                    scrollTo(0,  document.getElementById(id).offsetTop);
                }
            }
        }
    })
}
