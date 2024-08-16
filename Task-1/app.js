window.addEventListener('load', solve);

function solve() {
    
     let timeElement=document.getElementById('time')
     let dateElement=document.getElementById('date')
     let placeElement=document.getElementById('place')
     let eventElement=document.getElementById('event-name')
     let emailElement=document.getElementById('email') 

     let buttonAdd=document.getElementById('add-btn')

     let checkListElement=document.getElementById('check-list')
     let upcomingListElement=document.getElementById('upcoming-list')
     let finishedListElement=document.getElementById('upcoming-list')

     let buttonClear=document.getElementById('clear') 

     buttonAdd.addEventListener('click', onNext) 

     function onNext(e) {
        e.preventDefault();
        if(
            timeElement==""||
            dateElement==""||
            placeElement==""||
            eventElement==""||
            emailElement==""

        ) {
            return;
        }

        let liLastCheckElement=document.createElement('li')
        liLastCheckElement.setAttribute('class', 'event-content')

        let articleCheckelement=document.createElement('article') 

        let time=document.createElement('p')
        time.textContent=`Begins: ${dateElement.value} at: ${timeElement.value}`;

        let place=document.createElement('p')
        place.textContent=`At: ${placeElement.value}`

        let event=document.createElement('p') 
        event.textContent=`Event: ${eventElement}`

        let contact=document.createElement('p')
        contact.textContent=`Contact: ${emailElement.value}`

        let editButton=document.createElement('button')
        editButton.setAttribute('class', 'edit-btn')
        editButton.textContent="Edit"

        let continueButton=document.createElement('button')
        continueButton.setAttribute('class', 'continue-btn')
        continueButton.textContent="Continue" 

        articleCheckelement.appendChild(time)
        articleCheckelement.appendChild(place)
        articleCheckelement.appendChild(event)
        articleCheckelement.appendChild(contact)
        
        liLastCheckElement.appendChild(articleCheckelement)
        liLastCheckElement.appendChild(editButton)
        liLastCheckElement.appendChild(continueButton) 

        checkListElement.appendChild(liLastCheckElement) 

        let editTime=timeElement.value;
        let editDate=dateElement.value;
        let editPlace=placeElement.value;
        let editEvent=eventElement.value;
        let editContact=emailElement.value;

        timeElement.value="";
        dateElement.value="";
        placeElement.value="";
        eventElement.value="";
        emailElement.value=""; 

        buttonAdd.disabled=true;
        
     editButton.addEventListener('click', onEdit) 

     function onEdit() {
        
        timeElement.value=editTime;
        dateElement.value=editDate;
        placeElement.value=editPlace;
        eventElement.value=editEvent;
        emailElement.value=editContact; 
        
        buttonAdd.disabled=false; 

        liLastCheckElement.remove()

      }

      continueButton.addEventListener('click', onContinue) 

      function onContinue() {
         
           let liUpcomingElement=document.createElement('li')
           liUpcomingElement.setAttribute('class', 'event-content')

           let articleUpcomingElement=document.createElement('article') 
           
           articleUpcomingElement=articleCheckelement

           let finishedButton=document.createElement('button')
           finishedButton.setAttribute('class','finished-btn')
           finishedButton.textContent='Move to finished'

           liUpcomingElement.appendChild(articleUpcomingElement)
           liUpcomingElement.appendChild(finishedButton)

           upcomingListElement.appendChild(liUpcomingElement)

           buttonAdd.disabled=false;
           liLastCheckElement.remove() 

           
           
      }

   } 

     
}


    
    
