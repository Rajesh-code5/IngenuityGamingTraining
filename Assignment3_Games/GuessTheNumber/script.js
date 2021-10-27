const inputField = document.querySelector(".input-field");



inputField.innerHTML = ` <div class="inner-element">
<h3> Select number from 1 to 1000 </h3>
<label for="number-tab">Enter a number below</label>
<br>
<input type="number" name="" id="number-tab" placeholder="enter the number">
<br>
<label for="turns">Turns Left : </label>

<button disabled="disabled" id="turns"></button> 
</div>`;

const turns = document.querySelector("#turns");

turns.innerText = 10;


let num = Math.floor(Math.random() * 1000) + 1;

while(parseInt(turns.innerText) != 0){
    let enteredNum = document.getElementById("#number-tab")
    console.log(enteredNum)
    break;
}