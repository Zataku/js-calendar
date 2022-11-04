
let nav = 0; // Keeps track on the current month
let clicked = null; //
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // adding events 

// Constants available globally 
const calendar = document.getElementById('calendar');
const wkdys = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']; 

//function openWindow(date){
//    clicked = date;

 //   const userinputEvent = events.find(e => e.date === clicked)//aray that finds the event from the local storage and what date the user clicked
 //   //conditional statment whether user has clicked on the date and created the event or cancels the creation 
 //   if (userinputEvent){
  //      console.log('Filled event');
  //  } else {
 //       openWindow.display = 'block';//change
  //  }
  //  backDrop.style.display = 'block';//change
//}

// Constants on getting Month, Day, Year
function start() { 
    const currentDate = new Date();

    if (nav !==0){
        currentDate.setMonth(new Date().getMonth() + nav);// +1 on the nav (current month) changes the date either forwards or backwards
    }

    const month = currentDate.getMonth(); // Need to remember to add +1 in the month due to Jan being 0
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    
    const numberofDays = new Date(year, month + 1, 0).getDate(); // 0 is equal to the 1st day of the month this gives us the last day in the current month
    const dayoneMonth = new Date(year, month, 1);// 

    const fullDate = dayoneMonth.toLocaleDateString('en-ca', {
        weekday: 'long',
        month: 'numeric',
        day:'numeric',
        year:'numeric',

    });
    
    // Blank days counts the previous days of the month that aren't the 1st date of the current month
    const blankDays = wkdys.indexOf(fullDate.split(', ')[0]); // splits the fullDate string into the weeksday (ie. Monday) and month/day/year


    // Shows the current month that the user is in
    document.getElementById('monthShown').innerText =  
    `${currentDate.toLocaleDateString('en-ca', { month: 'long' })} ${year}`; //since we used numeric for the month we want to use the long way 

    calendar.innerHTML = '';// wipes the whole calendar when the user interacts with the next/previous button

    for(let i = 1; i <= blankDays + numberofDays; i++){
        const dayBlock = document.createElement('div');
        dayBlock.classList.add('day');

        // Logic statement that renders the blankDays or the actual days of the month dayBlock

        if (i > blankDays){
            dayBlock.innerText = i - blankDays;

            dayBlock.addEventListener('click', () => console.log('click'));// month is indexed and needs +1 to be read properly
            //finds and highlights the current date and month
            if (i - blankDays === day && nav == 0){
                dayBlock.id= 'currentDay';
            }
            dayBlock.classList.add('invisible'); // invisble days
        }
        
        calendar.appendChild(dayBlock);// Gives the full rendered block for the calendar to appear in the current month
    }

}

// Interactive events for the user to use
function eventButtons(){
// Event listeners that goes forwards and backwards from the let nav = 0; to check for the current month
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        start();
    });

    document.getElementById('previousButton').addEventListener('click', () => {
        nav--;
        start();
    });

}

eventButtons()
start();