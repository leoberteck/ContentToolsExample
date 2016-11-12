$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : "http://localhost:3000/list",
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success : function (data, status, xhr) {
            if(data){
                var list = ""
                for(one in data){
                    list += "<h2 class='subheading'><a class='list-link' href='view/post.html?id=" + data[one]._id + "' >" + data[one]._id + "</a></h2>"
                }
                $("#list").html(list)
            }
        }
    })    
})
