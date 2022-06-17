var formulaBarDiv = document.querySelector("#formula-bar-name-box-wrapper");
var cellAddressElem = document.querySelector("#t-name-box");
var gridElem = document.querySelector(".grid-container");

var element = document.createElement("INPUT");
element.setAttribute("type","text");
element.setAttribute("placeholder","Column Name");
element.classList.add("waffle-name-box");
element.classList.add("extInp");
element.classList.add("jfk-textinput");
element.style.width = "100px"




var output = document.createElement("INPUT");
output.setAttribute("type","text");
output.classList.add("waffle-name-box");
output.classList.add("jfk-textinput");
element.classList.add("extOp");
output.style.width = "150px"
output.setAttribute("placeholder","Col. No.");
output.disabled=true;

var output2 = document.createElement("INPUT");
output2.setAttribute("type","text");
output2.classList.add("waffle-name-box");
output2.classList.add("jfk-textinput");
element.classList.add("extOp2");
output2.style.width = "150px"
output2.setAttribute("placeholder","Col. Idx.");
output2.disabled=true;



formulaBarDiv.appendChild(element);
formulaBarDiv.appendChild(output);
formulaBarDiv.appendChild(output2);



element.addEventListener("keyup", (e)=>{
    var colName = e.target.value;
    
    if(colName){

        var ans = calculateNumber(colName)
        output.value = "Col. No.: "+ans.toString();
        if(ans=="Invalid input"){
            output2.value = "Col. Idx.: "+ans;
        }else{
            output2.value = "Col. Idx.: "+(calculateNumber(colName)-1).toString();
        }

    }
    else{
        output.value = "Col. No.";
        output2.value = "Col. Idx.";
    }

    // console.log(output.value);
} )

gridElem.addEventListener("click", (e)=>{
    var colValue = cellAddressElem.value;
    
    if(colValue){

        var colName = "";

        for(let i=0; i<colValue.length; i++){
            var char = colValue.charAt(i);
            if(char.toUpperCase()==char.toLowerCase()){
                break;
            }
            colName+=char;
        }

        element.value = colName;
        var ans = calculateNumber(colName)
        output.value = "Col. No.: "+ans.toString();
        if(ans=="Invalid input"){
            output2.value = "Col. Idx.: "+ans;
        }else{
            output2.value = "Col. Idx.: "+(calculateNumber(colName)-1).toString();
        }

    }
    else{
        output.value = "Col. No.";
        output2.value = "Col. Idx.";
    }
})

function calculateNumber(colName){
    try{
        var ans=0;

        //check if all characters are alphabets
        for(let i=0; i<colName.length; i++){
            var char = colName.charAt(i);
            if(char.toUpperCase()==char.toLowerCase()){
                return "Invalid input"
            }
        }

        //convert all to lower case
        var colName = colName.toLowerCase();


        //traverse through colName, take each character, add it using formula  26^i * alpha (i: 0-indexed, alphabet:1-indexed)
        for(let i=colName.length-1; i>=0; i--){

            

            var char = colName.charAt(colName.length - i -1);
            ans+=   Math.pow(26,i) * (char.charCodeAt(0) - 'a'.charCodeAt(0)+1) ;
            // console.log(char.charCodeAt(0) - 'a'.charCodeAt(0)+1);
        }

        return ans;
    }
    catch(e){
        return "Error: ",e
    }
    
}