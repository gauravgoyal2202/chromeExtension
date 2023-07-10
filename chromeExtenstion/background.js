let db;

chrome.runtime.onInstalled.addListener(function() {
  // Open a connection to the IndexedDB database
  const request = indexedDB.open('myDatabase', 1);

  request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
  };

  request.onsuccess = function(event) {
    db = event.target.result;
  };

  request.onerror = function(event) {
    console.error("Error opening IndexedDB", event.target.error);
  };
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'storeData') {
    const transaction = db.transaction(['myObjectStore'], 'readwrite');
    const objectStore = transaction.objectStore('myObjectStore');

    const addRequest = objectStore.add(request.data);

    addRequest.onsuccess = function(event) {
      console.log("Data added successfully to IndexedDB");
    };

    addRequest.onerror = function(event) {
      console.error("Error adding data to IndexedDB", event.target.error);
    };

    transaction.oncomplete = function() {
      console.log("Transaction completed");
    };
  }
});
