const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button");

let api;
const aPiKey = "2f06c761383ea9c6b316bab477aa45dc";
inputField.addEventListener("keyup",e=>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else{
        alert("your browser does not support geolocation api")
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${aPiKey}`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response=>response.json()).then(result=>weatherDetails(result));
}

function requestApi(city){
    
    api = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${aPiKey}`;
   fetchData();
}

function weatherDetails(info){
    infoTxt.classList.replace("pending","error");
    if (info.cod == "404"){
        infoTxt.innerText =`${inputField.value} is not a valid city name`;
    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const{description,id}= info.weather[0];
        const{feels_like, humidity, temp}= info.main;

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        


        infoTxt.classList.remove("pending", "error")
        wrapper.classList.add("active");
        console.log(info)
    }
    
}