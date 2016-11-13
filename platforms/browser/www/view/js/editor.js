var editor
var id

window.addEventListener('load', function() {
    ContentTools.StylePalette.add([
        new ContentTools.Style('Author', 'author', ['p'])
    ])
    
    editor = ContentTools.EditorApp.get()
    editor.init('*[data-editable]', 'data-name')
    editor.addEventListener('saved', onContentSave)
    
    var str = window.location.search
    if(str){
        id = str.split("=")[1]
    }
    tryLoadSavedContent(str)
})

function tryLoadSavedContent(){
    if(id){
        $.ajax({
            type : "GET",
            url : "http://localhost:3000/load?id=" + id,
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success : function (data, status, xhr) {
                if(data){
                    $("[data-name = 'main_header']").html(data.main_header)
                    $("[data-name = 'main_content']").html(data.main_content)
                }
            }
        })
    }
}

function onContentSave(ev) {
    var name, payload, regions, xhr

    // Check that something changed
    regions = ev.detail().regions
    if (Object.keys(regions).length == 0) {
        return
    }

    // Set the editor as busy while we save our changes
    this.busy(true)

    // If is editing
    if(id){
        regions["id"] = id
    }

    $.ajax({
        type : "POST",
        url : "http://localhost:3000/save",
        contentType: "application/json; charset=utf-8",
        traditional: true,
        data: JSON.stringify(regions),
        success : function (data, status, xhr) {
            editor.busy(false)
            id = data
            new ContentTools.FlashUI('ok')
        },
        error : function(){
            editor.busy(false)
            new ContentTools.FlashUI('no')
        }   
    })
}