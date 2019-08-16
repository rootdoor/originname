var data,lengthData;
function ajax(url){
    $.getJSON(url, function(returnData) {
        data=returnData
        lengthData=data.length;
    });
}
function get(){
    $.get('./js/json/nom.txt', function(data) {
        alert(data);
        // //process text file line by line
        // $('#div').html(data.replace('n',''));
        });
}
function detectNext(i,name){
    var name3=name+" (3)"
    var value=false
    if(data[i+2].prenom==name3){
        value=true
    }
    return value
}
function searchName(name){
    var key=false,i=0;
    var namme=name+" (1)"
    while(!key && i<lengthData){
        if(name==data[i].prenom){
            $("#display-langage").html(data[i].langage)
            key=true;
        }else if(namme==data[i].prenom){
            let value=detectNext(i,name);
            if(value){
                $("#display-langage").html(data[i].langage+","+data[i+1].langage+","+data[i+2].langage)
            }else{
                $("#display-langage").html(data[i].langage+","+data[i+1].langage)
            }
            key=true;
        }
        else{
            i++
        }
    }
    if(!key){
        $("#display-genre").html("")
        $("#display-freq").html("")
        $("#display-langage").html("Inconnu")
    }else{
        if(data[i].genre=="f"){
            $("#display-genre").html("Woman")
        }else{
            $("#display-genre").html("Man")
        }
        $("#display-freq").html("Frequence: "+data[i].frequence)
        
    }
}
$(document).ready(function(){
    ajax("./js/json/prenom.json")

    $("input").on('keypress',function(e) {
        var id=this.id
        if(e.which == 13) {
            switch(id){
                case "input-name":
                    searchName($("#input-name").val().toLowerCase())
                    $("#display-name").html($("#input-name").val().toLowerCase())
            }
        }
    })
})


