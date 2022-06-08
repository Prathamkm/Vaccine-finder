let pinCode = document.getElementById('pinCode');
let button = document.getElementById('button');
let pin;


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;



button.addEventListener('click',function(){
    pin=pinCode.value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${today}`, true);
    
    // document.querySelector("#inputs").style.backgroundcolour="white";
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let sessions = json.sessions;
            // console.log(sessions);
            // console.log(json);
            let slothtml="";
            document.getElementById("inputs").style.marginTop="-15%";
        //     inputs.innerHTML=`<div style="margin-top:-15%;">
        //     <div class="typewriter">
        //     <h1 id="input">Please enter your area Pin Code</h1>
        //   </div>
        //   <input type="pin" maxlength="6" id="pinCode" placeholder="Inter pin" value="">
        //   <button id="button">Search</button></div>`;
            // let inputs=document.querySelector("inputs");
            // inputs.addEventListener("click", changeMultipleCSS);
            // function changeMultipleCSS(e) {
            //     // Defining all our CSS styles
            //     const myStyles = `
            //     margin-left:0%;
            //     margin-top:0%;
            //     color: aliceblue;
            //     `;
            //     // const element = document.querySelector(".demo");
              
            //     element.style.cssText = myStyles;
            //   }
            // button.innerHTML="";

            let centers = document.getElementById('centers');
            sessions.forEach(function(element,i) {
                // console.log(element["center_id"]);
                if(i==0){
                    
                    row.innerHTML=`<th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Vaccine Name</th>
                    <th scope="col">1st dose</th>
                    <th scope="col">2nd dose</th>
                    `;
                }
                
                   let table =`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${element["name"]}</td>
                    <td>${element["vaccine"]}</td>
                    <td>${element["available_capacity_dose1"]}</td>
                    <td>${element["available_capacity_dose2"]}</td>
                  </tr>`
                  slothtml+=table;

            });
            pinCode.value="";
            centers.innerHTML=slothtml;
            if(centers.innerHTML==""){
                row.innerHTML="";
                centers.innerHTML=`<h1 style ="color: #97e80c; margin-left: 23%;MARGIN-TOP: 11%;">No vaccine available for pincode ${pin}</h1>`;
            }
        }else {
            console.log("Some error occured");
        }
    }

    xhr.send();
    console.log('clicked');
})

// let dbg = "846004";
