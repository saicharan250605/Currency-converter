// let countriesFlagURL="https://flagsapi.com/BE/shiny/64.png";
let cash=1;
let fromCou="USD";
let toCou="INR";
let currencyURL=`https://api.frankfurter.app/latest?amount=${cash}&from=${fromCou}&to=${toCou}`;
let amount=document.querySelector("#Amount");
let button=document.querySelector("button");
let dropdownFromCountry=document.querySelector("#dropdownFromCountry");
let dropdownToCountry=document.querySelector("#dropdownToCountry");
let fromImage=document.querySelector("#fromCountryImage");
let ToImage=document.querySelector("#ToCountryImage");
let displayResult=document.querySelector("#displayResult");
let swap=document.querySelector("#swap");
let hi="";
for(let i in countryList){
    let countryCode=document.createElement("option");
    countryCode.innerText= i;
    dropdownFromCountry.append(countryCode);
    if(i==="USD"){
        countryCode.selected="selected";
    }
}
for(let i in countryList){
    let countryCode=document.createElement("option");
    countryCode.innerText=i;
    dropdownToCountry.append(countryCode);
    if(i==="INR"){
        countryCode.selected="selected";
    }
}
let setFlag=()=>{
    amount.value=1;
    fromImage.style.backgroundImage=`url(https://flagsapi.com/${countryList[dropdownFromCountry.value]}/shiny/64.png)`;
};
let setFlag2=()=>{
    ToImage.style.backgroundImage=`url(https://flagsapi.com/${countryList[dropdownToCountry.value]}/shiny/64.png)`;
};
let hydra= async()=>{
    if(amount.value<=0){
        amount.value=1;
    }
    try{
    let p5=await fetch(`https://api.frankfurter.app/latest?amount=${amount.value}&from=${dropdownFromCountry.value}&to=${dropdownToCountry.value}`);
    hi=await p5.json();
    displayResult.innerText=`${amount.value} ${dropdownFromCountry.value} = ${hi.rates[dropdownToCountry.value]} ${dropdownToCountry.value}`;
    }catch(error){
        displayResult.innerText="API Sarigga work avvatle";
    }
};
dropdownFromCountry.addEventListener("change",setFlag);
dropdownToCountry.addEventListener("change",setFlag2);
window.addEventListener("load",setFlag);
window.addEventListener("load",setFlag2);
window.addEventListener("load",hydra);

button.addEventListener("click",async(event)=>{
    event.preventDefault();
    await hydra();
});

swap.addEventListener("click",()=>{
    let x=dropdownToCountry.value;
    dropdownToCountry.value=dropdownFromCountry.value;
    dropdownFromCountry.value=x;
    fromImage.style.backgroundImage= `url(https://flagsapi.com/${countryList[dropdownFromCountry.value]}/shiny/64.png)`;
    ToImage.style.backgroundImage=`url(https://flagsapi.com/${countryList[dropdownToCountry.value]}/shiny/64.png)`;
});