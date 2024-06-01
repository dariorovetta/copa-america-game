document.addEventListener("DOMContentLoaded", () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwIDgsGhp9XUxio28D95aN5ugq6qAQRMpu0wVkQSFBtDxYQhDH9yzciPRCe20sCgu1E5Q/exec'; // Sustituye esto con la URL de tu despliegue de Apps Script
    let currentUser = null;

    const users = [
        { username: "darioRovetta", password: "d1231" },
        { username: "micaelaLatorre", password: "d1232" },
        { username: "myrianBrunengo", password: "d1233" },
        { username: "sergioRovetta", password: "d1234" },
        { username: "leandroRovetta", password: "d1235" },
        { username: "pabloRovetta", password: "d1236" }
    ];

    const matches = [
        { id: 1, round: 'Grupos', group: 'A', date: '20/06', time: '20:00hs', team1: 'Argentina', team2: 'Canada', location: 'Mercedes Benz Stadium - Atlanta, GA' },
        // Añade los demás partidos aquí...
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
        displayMatches();

        document.getElementById('editPredictions').addEventListener('click', enableEditing);
        document.getElementById('savePredictions').addEventListener('click', savePredictions);
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
