const backgroundPage = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
    var fetchDataButton = document.getElementById('fetchDataButton');
    fetchDataButton.addEventListener('click', fetchData);
  });

  function fetchData() {
    fetch('https://dummy.restapiexample.com/api/v1/employees')
      .then(response => {
       console.log(response);
        return response.json();
      })
      .then(d => {
        console.log('Data fetched:', d);
        chrome.runtime.sendMessage({ action: 'storeData', data: d.data });
      })
      .catch(error => {console.error('Error fetching data:', error); showAlert('something wrong with 3rd party api');});
  }
  
  // function sendDataToServer(data) {
  //   fetch('http://localhost:3000/webhook', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data.data)
  //   })
  //     .then(response => {
  //       showAlert('Data fetched successfully'); // Display success message
  //       console.log('Data sent successfully');
  //     })
  //     .catch(error => {console.error('Error sending data:', error); showAlert('Error fetching data');});
  // }
  function showAlert(message) {
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    const closeButton = document.getElementsByClassName('close')[0];
    alertMessage.textContent = message;
    alertModal.style.display = 'block';
    closeButton.onclick = function() {
      alertModal.style.display = 'none';
    };
  }
  