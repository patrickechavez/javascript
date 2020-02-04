//dom queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name')
const updateMssg = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms');

//add new chat
newChatForm.addEventListener('submit', e => {

    e.preventDefault();

    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

//update name 
newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    newNameForm.reset();

    updateMssg.innerText = `Your name is updated to ${newName}`;

    setTimeout(()=> {
        updateMssg.innerText = ``;
    },3000)
});

//update the chatroom
rooms.addEventListener('click', e => {
    
    if(e.target.tagName === 'BUTTON'){

        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(data => chatUI.render(data));
    }
});

//check if local storage username has value
const username = localStorage.username ? localStorage.username : 'anonymous';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);


//get chat render
chatroom.getChats(data => {
   /// console.log(data);
    chatUI.render(data);
});

