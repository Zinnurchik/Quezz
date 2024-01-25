//Collect all the points for the game;
let sumPoint = 0;
// Game level counter;
let level = 1;
// Variable for the correct option id;
let correctOption;
// Those two variable are for redisplay;
let data1;
let arr1;


// Game launch function;
function start() {
    //Tags used at the end of the game;
    document.getElementById('message').innerHTML = "";
    document.getElementById('score').innerHTML = "";
    document.getElementById('startBtn').style.display = 'none';

    //these html tags show a country and capitals
    const country = document.getElementById('countryName');
    const capital = document.getElementById('capitals');
    //To show this level
    const lev = document.getElementById('level');
    
    //Submit a request;
    axios
        .get('https://restcountries.com/v3.1/all')
        .then((reponse) => {
            //Random country Id
            const a = Math.floor(Math.random() * 250);

            //Random capital with wrong answers;
            let arr = [];
            for (let i = 0; i < 4; i++) {
                arr[i] = Math.floor(Math.random() * 250);
            }

            //Random capital with a correct answer;
            let b = Math.floor(Math.random() * 4);
            correctOption = b;
            for (let i = 0; i < 4; i++) {
                if (i === b) {
                    arr[i] = a;
                }
            }

            //Printing correct answer;
            console.log(reponse.data[a].capital[0]);

            //Display level
            lev.innerHTML =  `Level ${level} Points: ${sumPoint}/10`;
            //Display country;
            country.innerHTML = `The capital of ${reponse.data[a].name.common}  is ...
                
                `;
            //Senting data to global variable;
            data1 = reponse.data;
            arr1 = arr;
            //Display options;
            capital.innerHTML = `
            <button class = "option k" onclick="check(${b}, 0)"><h6>${reponse.data[arr[0]].capital[0]}</h6></button>
            <button class = "option k" onclick="check(${b}, 1)"><h6>${reponse.data[arr[1]].capital[0]}</h6></button>
            <button class = "option k" onclick="check(${b}, 2)"><h6>${reponse.data[arr[2]].capital[0]}</h6></button>
            <button class = "option k" onclick="check(${b}, 3)"><h6>${reponse.data[arr[3]].capital[0]}</h6></button>
            <h1 id="timer"></h1>
            `;
            //Display timer function at the game;   
            timer(15);
        })
        .catch((error) => {
            // When Country has not a name of capital;
            //console.log(error);
            start();
        })
}

// Checking options;
const check = (capitalId, optionId) => {
    const capital2 = document.getElementById('capitals');
    //To show this level
    const lev = document.getElementById('level');
    //To make the answer work once;
    capital2.innerHTML = `
        <button class="k"><h6>${data1[arr1[0]].capital[0]}</h6></button>
        <button class="k"><h6>${data1[arr1[1]].capital[0]}</h6></button>
        <button class="k"><h6>${data1[arr1[2]].capital[0]}</h6></button>
        <button class="k"><h6>${data1[arr1[3]].capital[0]}</h6></button>
        `;
    //Level up;
    level++;
    //Comparison of levels and options;
    if(level > 10){
        if(capitalId == optionId){
            sumPoint++;
            lev.innerHTML =  `Level ${level - 1} Points: ${sumPoint}/10`; 
            document.getElementsByClassName('k')[optionId].style.backgroundColor = '#88FF88';
        }else if(capitalId == 5){
            document.getElementsByClassName('k')[optionId].style.backgroundColor = '#88FF88';
        }else {
            document.getElementsByClassName('k')[optionId].style.backgroundColor = '#FF3333';
            document.getElementsByClassName('k')[correctOption].style.backgroundColor = '#88FF88';
        }
 
        setTimeout(() => {
            if(sumPoint > 8){
                document.getElementById('container').innerHTML = `
            <h1 id="score">Your point is ${sumPoint}/10</h1>
            <h3 id="message" style="font-style: italic; color: blue;">You are a genius</h3>
            <button id="startBtn" onclick="start()">Play again</button>
            <h1 id="countryName"></h1>
            <div id="level"></div>
            <div id="capitals"></div>
            `;
            }else if(sumPoint > 5){
                document.getElementById('container').innerHTML = `
            <h1 id="score">Your point is ${sumPoint}/10</h1>
            <h3 id="message" style="font-style: italic; color: blue;">You can do better</h3>
            <button id="startBtn" onclick="start()">Play again</button>
            <h1 id="countryName"></h1>
            <div id="level"></div>
            <div id="capitals"></div>
            `;
            }else{
                document.getElementById('container').innerHTML = `
            <h1 id="score">Your point is ${sumPoint}/10</h1>
            <h3 id="message" style="font-style: italic; color: blue;">Try harder next time</h3>
            <button id="startBtn" onclick="start()">Play again</button>
            <h1 id="countryName"></h1>
            <div id="level"></div>
            <div id="capitals"></div>
            `;
            }
            
            //Update the value
            sumPoint = 0;
            level = 1;
        }, 2000);
          
    }
    else if(capitalId == optionId){
        sumPoint++;
        lev.innerHTML =  `Level ${level - 1} Points: ${sumPoint}/10`; 
        document.getElementsByClassName('k')[optionId].style.backgroundColor = '#88FF88';
        setTimeout(() => {
            start();
        }, 2000);
    }else if(capitalId == 5){
        document.getElementsByClassName('k')[optionId].style.backgroundColor = '#88FF88';
        setTimeout(() => {
            start();
        }, 2000);
    }else{
        document.getElementsByClassName('k')[optionId].style.backgroundColor = '#FF3333';
        document.getElementsByClassName('k')[correctOption].style.backgroundColor = '#88FF88';
        setTimeout(() => {
            start();
        }, 2000);
    }    
}

//Timer function
function timer(seconds) {
    const clock = document.getElementById('timer');

    document.getElementsByClassName('option')[0].addEventListener('click', () => {
        clearInterval(interval);
    })
    document.getElementsByClassName('option')[1].addEventListener('click', () => {
        clearInterval(interval);
    })
    document.getElementsByClassName('option')[2].addEventListener('click', () => {
        clearInterval(interval);
    })
    document.getElementsByClassName('option')[3].addEventListener('click', () => {
        clearInterval(interval);
    })
    
    let interval = setInterval(()=> {
      if (seconds === 0) {
        clearInterval(interval);
        check(5, correctOption);
      } else {
        clock.innerHTML = `Time: ${seconds}`;
        seconds--;
      }
    }, 1000); // 1000 milliseconds = 1 second
}
