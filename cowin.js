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
    
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let sessions = json.sessions;
            // console.log(sessions);
            console.log(json);
            let slothtml="";
            let centers = document.getElementById('centers');
            sessions.forEach(function(element,i) {
                // console.log(element["center_id"]);
               let table = `<tr>
               <th scope="row">${i+1}</th>
               <td>${element["name"]}</td>
               <td>${element["vaccine"]}</td>
               <td>${element["available_capacity_dose1"]}</td>
             </tr>`
             slothtml+=table;

            });
            centers.innerHTML=slothtml
        }else {
            console.log("Some error occured");
        }
    }
    xhr.send();
    console.log('clicked');
})

// let dbg = "846004";
