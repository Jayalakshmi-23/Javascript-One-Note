'use strict';

const addNote = document.querySelector('.addNote'),
popUp = document.querySelector('.create--note'),
overlay = document.querySelector('.overlay'),
clocseIcon = document.querySelector('.clocseIcon'),
title = document.querySelector('#title'),
message = document.querySelector('#message'),
card = document.querySelector('.addNote'),
lefttitle = document.querySelector('.left--title'),
updateBtn = document.querySelector('.updateBtn');

const months = ['January', 'Febrary', 'March', 'April','May','June','July','August','September','October','November','December'];


// SHOW MODAL

    addNote.addEventListener('click', function() {
        popUp.classList.add('modal');
        document.querySelector('body').classList.add('layout');
        title.focus();
        title.value = '';
        message.value = '';
        lefttitle.innerText = "Create a note";
        updateBtn.innerText = "Create note";
        console.log(lefttitle);
    });
    
    clocseIcon.addEventListener('click', function() {
        isUpdate = false;
        popUp.classList.remove('modal');
        document.querySelector('body').classList.remove('layout');
    });
    overlay.addEventListener('click', function() {
        popUp.classList.remove('modal');
        document.querySelector('body').classList.remove('layout');
    });


// ADD NOTE

let notes = JSON.parse(localStorage.getItem('notes'));
let isUpdate = false, updateId;


function showNote() {
    if(notes){
        document.querySelectorAll('.descCard').forEach(card => card.remove());
        notes.forEach((note, index) => {
            let li = `<li class="card descCard">
                        <h3>${note.title} </h3>
                        <div class="description">
                            <p>${note.description} </p>
                        </div>
                        <div class="DateWithEdit">
                            <div class="date">${new Date(note.date).getDate()} ${months[new Date(note.date).getMonth()]}, ${new Date(note.date).getFullYear()}</div>
                            <div class="edit">
                                <span class="dots" onclick="showMenu(this)">...</span>
                                    <div class="containerBtn">
                                        <div class="icons" onclick="updateNote(${index},'${note.title}','${note.description}')"> 
                                            <i class="fa-solid fa-pen"></i>
                                            <span class="editedText">Edit</span>
                                        </div>
                                        <div class="icons deleteNode" onclick = deleteCard(${index})>
                                            <i class="fa-solid fa-trash"></i>
                                            <span class="editedText">Delete</span>
                                        </div>
                                        
                                    </div>
                               
                            </div>
                        </div>
                    </li>`
            card.insertAdjacentHTML("afterend", li);        
        });
    }
    
}
showNote();

function showMenu(elem) {

    elem.parentElement.classList.add('active');
    document.addEventListener('click', (e) => {
      
        if(e.target.className != 'icons' && e.target.className != 'edit' && e.target.className != 'editedText' && e.target.className != 'dots' && e.target.tagName != 'I' && e.target != elem){
            elem.parentElement.classList.remove('active'); 
        }
       
    })
}

function updateNote(index, note, desc){
    isUpdate = true;
        
    updateId = index;
    addNote.click();
    lefttitle.innerText = "Update a note";
    updateBtn.innerText = "Update note";
    title.value = note;
    message.value = desc;
}

function deleteCard(index){
    let confirmDelete = confirm("are you sure you want to delete this note?");
    if(!confirmDelete){
        return;
    }
   notes.splice(index, 1);
   localStorage.setItem('notes', JSON.stringify(notes));
   showNote();
  
}

updateBtn.addEventListener('click', (e) => {

    let noteTitle = title.value.trim();
    let desCard = message.value.trim();

    lefttitle.textContent = "Create a note";
    updateBtn.textContent = "Create note";

    if(noteTitle || desCard){
        let date = new Date();
       
        if(!notes){
            notes = [];
        }
        if(!isUpdate){
            notes.push({               
                title: noteTitle,
                description: desCard,
                date: date
            });
        }
        else{
            isUpdate = false;
            notes[updateId] = {               
                title: noteTitle,
                description: desCard,
                date: date
            }
        }
       
        localStorage.setItem('notes', JSON.stringify(notes));
        title.value = '';
        message.value = '';
        // popUp.classList.remove('modal');
        clocseIcon.click();
        showNote();
    }
})
