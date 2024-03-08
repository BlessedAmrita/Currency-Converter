base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
let select=document.querySelectorAll('.select select');
let messageText=document.querySelector('.message p');
let button=document.querySelector('.button button');
let amt=document.querySelector(".amount input");
let toCrr=document.querySelector(".to select ");
let fromCrr=document.querySelector(".from select ");

for(let option of select){//for OF as select is an array
    for(crrCode in countryList){//for IN as countryList is an OBJECT
        let newOption=document.createElement('option');
        newOption.value=crrCode;
        newOption.innerText=crrCode;
        option.append(newOption);
        if(option.name==="from"&& crrCode==="USD"){
            newOption.selected=true;
        }
        else if(option.name==="to"&& crrCode==="INR"){
            newOption.selected=true;
        }
    }
    option.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    });
}
const changeFlag=(evtTarget)=>{
    // console.log(evtTarget);
    let countryCode=countryList[evtTarget.value];
    let imgSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    // console.log(imgSrc);
    let img=evtTarget.parentElement.querySelector('img');
    img.src=imgSrc;
    img.alt=countryCode;
}

button.addEventListener("click",(evt)=>{
    evt.preventDefault();//to prevent the default work that button was doing, i.e. reloading the whole page.
    updateMessage();//for converting the crr codes and updating the values.
}
);

const updateMessage=async ()=>{
    amount=amt.value;
    if(amount===""||amount<1){
        amount=1;
        amt.value=1;
    }
    // console.log(amount);
    // console.log(fromCrr.value);
    // console.log(toCrr.value);
    newUrl=`${base_url}${(fromCrr.value).toLowerCase()}.json`;
    // console.log(newUrl);
    let promise=await fetch(newUrl);
    let data=await promise.json();
    // console.log(data);
    let conversionRateList=data[fromCrr.value.toLowerCase()];
    let conversionRate=conversionRateList[toCrr.value.toLowerCase()];
    // console.log(conversionRate);
    result=amount*conversionRate;
    messageText.innerText=`${amount} ${fromCrr.value} = ${result} ${toCrr.value}`;
}

window.addEventListener("load",updateMessage);//Note we used the event listener on "WINDOWS",so that everytime the page on window is loads the meassage is updated.
