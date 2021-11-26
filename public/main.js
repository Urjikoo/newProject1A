var constraints = { video: { facingMode: "user" }, audio: false };
const cameraView = document.querySelector("#cameraView"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#cameraSensor"),
  cameraTrigger = document.querySelector("#camera--trigger");

function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Something is broken.", error);
    });
}
cameraTrigger.onclick = function () {

  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");
  let imageURL=cameraSensor.toDataURL("image/webp").replace("image/png", "image/octet-stream")


  fetch("/result", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageURL: imageURL,
      }),
    })
    .then(function (response) {
      console.log('from main.js')
          // window.location.href = '/result'
          // apiCall()
        })

};
window.addEventListener("load", cameraStart, false);
let result1= document.querySelector("#outcome")

function apiCall(){
  let nameOfObject = document.querySelector('h1').innerText
   fetch (`https://www.googleapis.com/customsearch/v16101&q=${nameOfObject}`)
   .then (res => res.json())
     .then(data=>{
       console.log(data)
       console.log(data.context.title)
      result1.innerText= data.context.title
     })
}
