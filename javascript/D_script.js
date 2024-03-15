
$(window).resize(function(){location.reload();})

var order = "alphabetical"
var key = apikey

var moviesd = moviesss
var seriesd = seriesss
var datesd = datesss


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
numberforalphordering = 1
var numberfororder = 1

var alphabeticalarray = []
var arraywithscores = []
var arraywithother = []
var scored = []
var recapeble = []

function New(){
    newfirst = moviesd.concat(seriesd)
    finew = newfirst.concat(datesss)
    $('.ne').text(finew[Math.floor(Math.random() * finew.length)])
    newfirst = []
    finew = []
}

function ReCap(){
    for(var z = 0; z<scored.length; z++){
        if(scored[z][4][0] > 0 && scored[z][0] == "🌃"){
            recapeble.push(scored[z][1])
        }
    }
    $('.rec').text(recapeble[Math.floor(Math.random() * recapeble.length)])
    console.log(recapeble)
    recapeble = []
}

async function TemplateMaker() {
    var databyscoreurl = "https://sheets.googleapis.com/v4/spreadsheets/1PK8BUAcDPYl96ebIcT3EkPzbzyKF-kwi6cHXWyVohQ4/values/one/?key="+key

    const test = await axios.get(databyscoreurl).then(function(response){
        return response.data.values
    });

    test.shift()
    scored = test


    var number = Math.floor(Math.random() * scored[0][6]) + 1

    if(scored[0][7]>1){
        var image = "/images/"+scored[0][7]+".jpg"
    } else {
        var image = "/images/"+number+".jpg"
    }


    $('.img').css('background-image','url('+image+')'); 

    var onlynamearray = []
    var pickedarray = []

    for (var i = 0; i < scored.length; i++){
        onlynamearray.push(scored[i][0])
    }
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    var nameswithseason = findDuplicates(onlynamearray)
    

    for (var i = 0; i < scored.length; i++){

        var ssym = scored[i][0]
        var sname = scored[i][1]
        var ascore = scored[i][2]
        var anote = scored[i][3]
        var yscore = scored[i][4]
        var ynote = scored[i][5]

       

        if (!pickedarray.includes(sname)) {
            if (nameswithseason.includes(sname)) {
            }
            
            else {
                dictforscoreing = {
                    sym: ssym,
                    title: sname,
                    ascore: ascore.split("/")[0],
                    isdd: false,
                    anote: anote,
                    yscore: yscore.split("/")[0],
                    ynote: ynote,
                }
                alphabeticalarray.push(dictforscoreing)
                arraywithscores.push(dictforscoreing)    
                pickedarray.push(sname)
            }
            
        }

    }
    
}

async function GetDataAlphabetical(){
    await TemplateMaker()
    for (var i = 0; i < alphabeticalarray.length; i++){
        if (isNumeric(alphabeticalarray[i]["ascore"])){
            var writtenscorea = alphabeticalarray[i]["ascore"] + "/10"
        } else {
            var writtenscorea = alphabeticalarray[i]["ascore"]
        }
        if (isNumeric(alphabeticalarray[i]["yscore"])){
            var writtenscorey = alphabeticalarray[i]["yscore"] + "/10"
        } else {
            var writtenscorey = alphabeticalarray[i]["yscore"]
        }
        if (alphabeticalarray[i]["isdd"] === true) {
        } else {
            var template = "<tr><td scope='row' class='head'>"+numberforalphordering+"</td><td class='tablename'>"+alphabeticalarray[i]["sym"]+"</td><td class='tablename'>"+alphabeticalarray[i]["title"]+"</td><td class='tablescore'>"+writtenscorea+"</td><td>"+alphabeticalarray[i]["anote"]+"</td><td>"+writtenscorey+"</td><td>"+alphabeticalarray[i]["ynote"]+"</td></tr>"

            $("table").find('tbody').append(template);
        }
        numberforalphordering += 1
    }
}

if (order === "alphabetical") {
    GetDataAlphabetical()
}


