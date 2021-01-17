// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;

// Ensure page has loaded before accessing indexedDB
window.onload = () => {

    // This line creates a request object to open version 1 of a database called notes_db
    let request = window.indexedDB.open('notes_db', 1);

    request.onerror = () => {
        console.log('Database failed to open');
    };

    request.onsuccess = () => {
        console.log('Database opend successfully');

        // Store opened DB
        db = request.result;

        displayData();
    };

    // Setup the database tables if this has not already been done
    request.onupgradeneeded = e => {
        // Get a reference to opened database
        let db = e.target.result;

        // Create an objectStore to store our notes - structure/table
        // Use auto-increment key
        let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement: true })
        
        // Create the 'indexes' (fields)
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('body', 'body', { unique: false });

        console.log('Database setup complete');
    };

    form.onsubmit = addData;

    function addData(e) {
        // Stop form submitting typical way/ page refresh 
        e.preventDefault(); 

        // Get data object from input fields - 'id' is auto-populated 
        let newItem = { title: titleInput.value, body: bodyInput.value };

        // Open a read/write transaction 
        let transaction = db.transaction(['notes_os'], 'readwrite');

        // Get the object store ('table') thats already been added 
        let objectStore = transaction.objectStore('notes_os');

        // Add the data and clear the input fields on success 
        let request = objectStore.add(newItem);
        request.onsuccess = () => {
            titleInput.value = '';
            bodyInput.value = '';
        };

        // Report on transaction complete 
        transaction.oncomplete = () => {
            console.log('Transaction completed. DB updated');

            // Update the display 
            displayData();
        };

        transaction.onerror = () => {
            console.log('Transaction not opened due to error')
        };
    };

    function displayData() {
        
        // Empty list each time 
        while(list.firstChild){
            list.removeChild(list.firstChild);
        }

        // Open the object store and get a 'cursor' which iterates the data
        let objectStore = db.transaction('notes_os').objectStore('notes_os');
        objectStore.openCursor().onsuccess = e => {

            let cursor = e.target.result;

            if(cursor) {
                const listItem = document.createElement('li');
                const h3 = document.createElement('h3');
                const para = document.createElement('p');

                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(listItem);

                h3.textContent = cursor.value.title;
                para.textContent = cursor.value.body;

                listItem.setAttribute('data-node-id', cursor.value.id);

                const deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'X';

                deleteBtn.onclick = deleteItem;

                // Iterate to next
                cursor.continue();
            } else {
                if(!list.firstChild) {
                    const listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored!';
                    list.appendChild(listItem);
                }
            }

            console.log('Notes all displayed');
        };

        function deleteItem(e) {
            let noteId = Number(e.target.parentNode.getAttribute('data-node-id'));

            let transaction = db.transaction(['notes_os'], 'readwrite');
            let objectStore = transaction.objectStore('notes_os');
            let request = objectStore.delete(noteId);

            transaction.oncomplete = () => {
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                console.log('Note ' + nodeId + ' deleted.');

                if(!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored';
                    list.appendChild(listItem);
                }
            };  
        };
    };

    // Register service worker to control site offline
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js')
            .then(() => console.log('Service worker registered'));
    }
};