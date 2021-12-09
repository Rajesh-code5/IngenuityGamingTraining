var myForm = document.getElementById("myForm");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var country = document.getElementById("country") as HTMLInputElement;

  var confirmed = "https://api.covid19api.com/total/country/"+country.value;
  fetch(confirmed)
  .then((res) => res.json())
  .then((res) => {
       console.log(res);
       var length = res.length
       var index = res.length-1;
       var confirmed = document.getElementById('confirmed');
       confirmed.innerHTML = ''
       
       confirmed.append("Total Confirmed:"+res[index].Confirmed);
       
      })

      var recovered = "https://api.covid19api.com/total/country/"+country;
      fetch(recovered)
      .then((res) => res.json())
      .then((res) => {
           console.log(res);
           var length = res.length
           var index = res.length-2;
           var recovered = document.getElementById('recovered');
           recovered.innerHTML = ''
           
           recovered.append("Total Recovered:"+res[index].Recovered);
           
    })
    var death = "https://api.covid19api.com/total/country/"+country;
  fetch(death)
  .then((res) => res.json())
  .then((res) => {
       console.log(res);
       var length = res.length
       var index = res.length-1;
       var death = document.getElementById('death');
       death.innerHTML = ''
       
       death.append("Total Death:"+res[index].Death);
       
      })
     

});