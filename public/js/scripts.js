document.addEventListener("DOMContentLoaded", () => {
    const scriptURL = 'http://localhost:3000/api/predictions'; // URL del servidor local
    let currentUser = null;

    const users = [
        { id: "USER_0001", username: "darioRovetta", password: "d1231", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0002", username: "micaelaLatorre", password: "d1232", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0003", username: "myrianBrunengo", password: "d1233", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0004", username: "sergioRovetta", password: "d1234", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0005", username: "leandroRovetta", password: "d1235", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0006", username: "pabloRovetta", password: "d1236", groupPredictions: "", remainingPredictions: "" }
    ];

    const matches = [
        { id: 1, round: 'Grupos', group: 'A', date: '20/06', time: '20:00hs', team1: 'Argentina', team1Win: false, draw: false, team2Win: false, team2: 'Canada', location: 'Mercedes Benz Stadium - Atlanta, GA' },
        { id: 2, round: 'Grupos', group: 'A', date: '21/06', time: '19:00hs', team1: 'Perú', team1Win: false, draw: false, team2Win: false, team2: 'Chile', location: 'AT&T Stadium - Arlington, TX' },
        { id: 3, round: 'Grupos', group: 'B', date: '22/06', time: '15:00hs', team1: 'Ecuador', team1Win: false, draw: false, team2Win: false, team2: 'Venezuela', location: 'Levi\'s® Stadium - Santa Clara, CA' },
        { id: 4, round: 'Grupos', group: 'B', date: '22/06', time: '20:00hs', team1: 'México', team1Win: false, draw: false, team2Win: false, team2: 'Jamaica', location: 'NRG Stadium - Houston, TX' },
        { id: 5, round: 'Grupos', group: 'C', date: '23/06', time: '15:00hs', team1: 'Uruguay', team1Win: false, draw: false, team2Win: false, team2: 'Panama', location: 'Hard Rock Stadium - Miami, FL' },
        { id: 6, round: 'Grupos', group: 'C', date: '23/06', time: '20:00hs', team1: 'Estados Unidos', team1Win: false, draw: false, team2Win: false, team2: 'Bolivia', location: 'AT&T Stadium - Arlington, TX' },
        { id: 7, round: 'Grupos', group: 'D', date: '24/06', time: '17:00hs', team1: 'Colombia', team1Win: false, draw: false, team2Win: false, team2: 'Paraguay', location: 'NRG Stadium - Houston, TX' },
        { id: 8, round: 'Grupos', group: 'D', date: '24/06', time: '18:00hs', team1: 'Brasil', team1Win: false, draw: false, team2Win: false, team2: 'Costa Rica', location: 'SoFi Stadium - Inglewood, CA' },
        { id: 9, round: 'Grupos', group: 'A', date: '25/6', time: '17:00hs', team1: 'Perú', team1Win: false, draw: false, team2Win: false, team2: 'Canada', location: 'Children\'s Mercy Park - Kansas City, KS' },
        { id: 10, round: 'Grupos', group: 'A', date: '25/6', time: '21:00hs', team1: 'Chile', team1Win: false, draw: false, team2Win: false, team2: 'Argentina', location: 'MetLife Stadium - East Rutherford, NJ' },
        { id: 11, round: 'Grupos', group: 'B', date: '26/06', time: '15:00hs', team1: 'Ecuador', team1Win: false, draw: false, team2Win: false, team2: 'Jamaica', location: 'Allegiant Stadium - Las Vegas, NV' },
        { id: 12, round: 'Grupos', group: 'B', date: '26/06', time: '18:00hs', team1: 'Venezuela', team1Win: false, draw: false, team2Win: false, team2: 'México', location: 'SoFi Stadium - Inglewood, CA' },
        { id: 13, round: 'Grupos', group: 'C', date: '27/06', time: '18:00hs', team1: 'Panama', team1Win: false, draw: false, team2Win: false, team2: 'Estados Unidos', location: 'Mercedes Benz Stadium - Atlanta, GA' },
        { id: 14, round: 'Grupos', group: 'C', date: '27/06', time: '21:00hs', team1: 'Uruguay', team1Win: false, draw: false, team2Win: false, team2: 'Bolivia', location: 'MetLife Stadium - East Rutherford, NJ' },
        { id: 15, round: 'Grupos', group: 'D', date: '28/06', time: '15:00hs', team1: 'Colombia', team1Win: false, draw: false, team2Win: false, team2: 'Costa Rica', location: 'State Farm Stadium - Glendale, AZ' },
        { id: 16, round: 'Grupos', group: 'D', date: '28/06', time: '18:00hs', team1: 'Paraguay', team1Win: false, draw: false, team2Win: false, team2: 'Brasil', location: 'Allegiant Stadium - Las Vegas, NV' },
        { id: 17, round: 'Grupos', group: 'A', date: '29/06', time: '20:00hs', team1: 'Argentina', team1Win: false, draw: false, team2Win: false, team2: 'Perú', location: 'Hard Rock Stadium - Miami, FL' },
        { id: 18, round: 'Grupos', group: 'A', date: '29/06', time: '20:00hs', team1: 'Canada', team1Win: false, draw: false, team2Win: false, team2: 'Chile', location: 'Inter&Co Stadium - Orlando, FL' },
        { id: 19, round: 'Grupos', group: 'B', date: '30/06', time: '17:00hs', team1: 'México', team1Win: false, draw: false, team2Win: false, team2: 'Ecuador', location: 'State Farm Stadium - Glendale, AZ' },
        { id: 20, round: 'Grupos', group: 'B', date: '30/06', time: '19:00hs', team1: 'Jamaica', team1Win: false, draw: false, team2Win: false, team2: 'Venezuela', location: 'Q2 Stadium - Austin, TX' },
        { id: 21, round: 'Grupos', group: 'C', date: '01/07', time: '20:00hs', team1: 'Estados Unidos', team1Win: false, draw: false, team2Win: false, team2: 'Uruguay', location: 'GEHA Field at Arrowhead - Kansas City, MO' },
        { id: 22, round: 'Grupos', group: 'C', date: '01/07', time: '21:00hs', team1: 'Bolivia', team1Win: false, draw: false, team2Win: false, team2: 'Panama', location: 'Inter&Co Stadium - Orlando, FL' },
        { id: 23, round: 'Grupos', group: 'D', date: '02/07', time: '18:00hs', team1: 'Brasil', team1Win: false, draw: false, team2Win: false, team2: 'Colombia', location: 'Levi\'s® Stadium - Santa Clara, CA' },
        { id: 24, round: 'Grupos', group: 'D', date: '02/07', time: '20:00hs', team1: 'Costa Rica', team1Win: false, draw: false, team2Win: false, team2: 'Paraguay', location: 'Q2 Stadium - Austin, TX' },
        { id: 25, round: 'Cuartos de Final', group: '', date: '04/07', time: '20:00hs', team1: '1A', team1Win: false, draw: false, team2Win: false, team2: '2B', location: 'NRG Stadium - Houston, TX' },
        { id: 26, round: 'Cuartos de Final', group: '', date: '05/07', time: '20:00hs', team1: '1B', team1Win: false, draw: false, team2Win: false, team2: '2A', location: 'AT&T Stadium - Arlington, TX' },
        { id: 27, round: 'Cuartos de Final', group: '', date: '06/07', time: '15:00hs', team1: '1D', team1Win: false, draw: false, team2Win: false, team2: '2C', location: 'State Farm Stadium - Glendale, AZ' },
        { id: 28, round: 'Cuartos de Final', group: '', date: '06/07', time: '18:00hs', team1: '1C', team1Win: false, draw: false, team2Win: false, team2: '2D', location: 'Allegiant Stadium - Las Vegas, NV' },
        { id: 29, round: 'Semifinales', group: '', date: '09/07', time: '20:00hs', team1: 'V25', team1Win: false, draw: false, team2Win: false, team2: 'V26', location: 'MetLife Stadium - East Rutherford, NJ' },
        { id: 30, round: 'Semifinales', group: '', date: '10/07', time: '20:00hs', team1: 'V27', team1Win: false, draw: false, team2Win: false, team2: 'V28', location: 'Bank of America Stadium - Charlotte, NC' },
        { id: 31, round: '3er puesto', group: '', date: '13/07', time: '20:00hs', team1: 'P29', team1Win: false, draw: false, team2Win: false, team2: 'P30', location: 'Bank of America Stadium - Charlotte, NC' },
        { id: 32, round: 'Final', group: '', date: '14/07', time: '20:00hs', team1: 'V29', team1Win: false, draw: false, team2Win: false, team2: 'V30', location: 'Hard Rock Stadium - Miami, FL' }
    ];

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(user => user.username === username && user.password === password);
            const loginResult = document.getElementById('loginResult');

            if (user) {
                loginResult.textContent = 'Inicio de sesión exitoso';
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                window.location.href = 'predictions.html';
            } else {
                loginResult.textContent = 'Usuario o clave incorrectos';
            }
        });
    }

    if (window.location.pathname.includes('predictions.html')) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        loadUserPredictions(currentUser.username);

        document.getElementById('editPredictions').addEventListener('click', enableEditing);
        document.getElementById('savePredictions').addEventListener('click', savePredictions);
    }

    function loadUserPredictions(username) {
        fetch(`${scriptURL}/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    currentUser.groupPredictions = data.predictions;
                }
                displayMatches();
            });
    }

    function displayMatches() {
        const predictionsSection = document.getElementById('matchesContainer');
        predictionsSection.innerHTML = '';
        matches.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match-card');
            matchElement.innerHTML = `
                <h3>${match.id}° Partido</h3>
                <div class="team">${match.team1}</div>
                <div class="score">
                    <input type="radio" name="prediction${match.id}" value="team1Win" disabled ${currentUser.groupPredictions && currentUser.groupPredictions[match.id] === 'team1Win' ? 'checked' : ''}>
                </div>
                <div class="score">vs</div>
                <div class="score">
                    <input type="radio" name="prediction${match.id}" value="draw" disabled ${currentUser.groupPredictions && currentUser.groupPredictions[match.id] === 'draw' ? 'checked' : ''}>
                </div>
                <div class="score">vs</div>
                <div class="score">
                    <input type="radio" name="prediction${match.id}" value="team2Win" disabled ${currentUser.groupPredictions && currentUser.groupPredictions[match.id] === 'team2Win' ? 'checked' : ''}>
                </div>
                <div class="team">${match.team2}</div>
                <div class="details">Fecha: ${match.date} - ${match.time}</div>
                <div class="details">Ubicación: ${match.location}</div>
            `;
            predictionsSection.appendChild(matchElement);
        });
    }

    function enableEditing() {
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = false;
        });
        document.getElementById('savePredictions').style.display = 'block';
        document.getElementById('editPredictions').style.display = 'none';
    }

    function savePredictions() {
        const predictions = {};
        document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
            const matchId = input.name.replace('prediction', '');
            predictions[matchId] = input.value;
        });
        currentUser.groupPredictions = predictions;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        fetch(scriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: currentUser.username,
                predictions: currentUser.groupPredictions
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Predicciones guardadas exitosamente');
            } else {
                alert('Error al guardar las predicciones');
            }
        });

        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = true;
        });
        document.getElementById('savePredictions').style.display = 'none';
        document.getElementById('editPredictions').style.display = 'block';
    }
});
