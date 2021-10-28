const inputField = document.querySelector(".input-field");

const main = document.querySelector(".main");

inputField.innerHTML = ` <div class="inner-element">
<h2>Select a number between 1 to 1000 </h2>
<label for="number-tab">Enter a number below</label>
<br>
<input type="number" name="" id="number-tab" placeholder="enter the number">
<button type="submit">Enter</button>
<button type="reset" >Reset</button>
<br>
<label for="turns">Turns Left : </label>
<button disabled="disabled" id="turns"></button> 
</div> `;

const turns = document.querySelector("#turns");

turns.innerText = 15;

let num = Math.floor(Math.random() * 1000) + 1;

const submit = document.querySelector("button[type = 'submit']");
const numberTab = document.querySelector("#number-tab");

submit.addEventListener("click",function(){
     let value = parseInt(numberTab.value);
    console.log(value);
    console.log(num)
    if(numberTab.value == "") return;

    if(parseInt(value) == parseInt(num)){
        let windiv = document.createElement("div");
        windiv.classList.add("windiv");
        windiv.innerHTML = `<h1>YOU WIN</h1>`;
        main.append(windiv);
        reset();
    }

    else if(parseInt(turns.innerText) <= 1){
        turns.innerText = 0;
        let losediv = document.createElement("div");
        losediv.classList.add("losediv");
        losediv.innerHTML = `<h1>OOPS! YOU LOST</h1>`;
        main.append(losediv);
        reset();
    }

    else{
        // let highlowDiv = document.querySelector(".highLowDiv");
        // if(highlowDiv) highlowDiv.remove();
        highlowDiv = document.createElement("div");
        highlowDiv.classList.add("highLowDiv");
        if(parseInt(value) < 1 || parseInt(value) > 1000){
            highlowDiv.innerHTML = `<h2>Please, Enter a number b/w 1 to 1000 both inclusive</h2>`;
            turns.innerText = parseInt(turns.innerText) + 1;
        }else if(parseInt(value) > parseInt(num)){
            highlowDiv.innerHTML = `<h1>Too High</h1>`;
        }else{
            highlowDiv.innerHTML = `<h1>Too Low</h1>`; 
        }
        main.append(highlowDiv);
        turns.innerText = parseInt(turns.innerText) - 1;
    }

    numberTab.value = "";
});

function reset(){
    turns.innerText = 0;
    num = Math.floor(Math.random() * 1000) + 1;
}

const resetBtn = document.querySelector("button[type = 'Reset']");

resetBtn.addEventListener("click",function(e){
    turns.innerText = 15;
    num = Math.floor(Math.random() * 1000) + 1;

    let windiv = document.querySelector(".windiv");
    let losediv = document.querySelector(".losediv");

    if(windiv){
        windiv.remove()
    } 
    if(losediv){
        losediv.remove()
    }
});


numberTab.addEventListener("click",function(e){
    let windiv = document.querySelector(".windiv");
    let losediv = document.querySelector(".losediv");
    let highLowDiv = document.querySelector(".highLowDiv");
    
    if(highLowDiv) highLowDiv.remove();
    if(windiv){
        windiv.remove()
    } 
    if(losediv){
        losediv.remove()
    }
    if(turns.innerText == 0) turns.innerText = 15;
})

inputField.addEventListener("keypress",function(e){
    if(e.key == "Enter"){
        submitFun();
    }
});



function submitFun(e){
    let value = parseInt(numberTab.value);
    console.log(value);
    console.log(num)
    if(numberTab.value == "") return;

    if(parseInt(value) == parseInt(num)){
        let windiv = document.createElement("div");
        windiv.classList.add("windiv");
        windiv.innerHTML = `<h1>YOU WIN</h1>`;
        main.append(windiv);
        reset();
    }

    else if(parseInt(turns.innerText) <= 1){
        turns.innerText = 0;
        let losediv = document.createElement("div");
        losediv.classList.add("losediv");
        losediv.innerHTML = `<h1>OOPS! YOU LOST</h1>`;
        main.append(losediv);
        reset();
    }

    else{
        // let highlowDiv = document.querySelector(".highLowDiv");
        // if(highlowDiv) highlowDiv.remove();
        highlowDiv = document.createElement("div");
        highlowDiv.classList.add("highLowDiv");
        if(parseInt(value) < 1 || parseInt(value) > 1000){
            highlowDiv.innerHTML = `<h2>Please, Enter a number b/w 1 to 1000 both inclusive</h2>`;
            turns.innerText = parseInt(turns.innerText) + 1;
        }else if(parseInt(value) > parseInt(num)){
            highlowDiv.innerHTML = `<h1>Too High</h1>`;
        }else{
            highlowDiv.innerHTML = `<h1>Too Low</h1>`; 
        }
        main.append(highlowDiv);
        turns.innerText = parseInt(turns.innerText) - 1;
    }

    numberTab.value = "";
}