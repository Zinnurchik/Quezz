document.getElementById('fetchDataBtn').addEventListener('click', fetchData);

function fetchData() {
    // Fetch data from backend API and update the UI
    fetch('https://f03a-195-158-9-110.ngrok-free.app/api/employees')
        .then(response => response.json())
        .then(data => {
            document.getElementById('dataContainer').innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}