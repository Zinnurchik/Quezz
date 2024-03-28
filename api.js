document.getElementById('fetchDataBtn').addEventListener('click', fetchData);

function fetchData() {
    // Fetch data from backend API and update the UI
    fetch('http://localhost:8080/api/employees')
        .then(response => response.json())
        .then(data => {
            document.getElementById('dataContainer').innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}