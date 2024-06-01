document.addEventListener("DOMContentLoaded", () => {
    let currentUser = null;
    let users = [
        { id: "USER_0001", username: "darioRovetta", password: "d1231", groupPredictions: {}, remainingPredictions: {} },
        { id: "USER_0002", username: "micaelaLatorre", password: "d1232", groupPredictions: {}, remainingPredictions: {} },
        { id: "USER_0003", username: "myrianBrunengo", password: "d1233", groupPredictions: {}, remainingPredictions: {} },
        { id: "USER_0004", username: "sergioRovetta", password: "d1234", groupPredictions: {}, remainingPredictions: {} },
        { id: "USER_0005", username: "leandroRovetta", password: "d1235", groupPredictions: {}, remainingPredictions: {} },
        { id: "USER_0006", username: "pabloRovetta", password: "d1236", groupPredictions: {}, remainingPredictions: {} }
    ];

    const matches = [
        { id: 1, round: 'Grupos', group: 'A', date: '20/06', time: '20:00hs', team1: 'Argentina', team2: 'Canada', location: 'Mercedes Benz Stadium - Atlanta, GA' },
        // Añade los demás partidos aquí...
    ];

    // Cargar usuarios del almacenamiento local, si existen
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(user => user.username === username && user.password === password);
        const loginResult = document.getElementById('loginResult');

        if (user) {
            loginResult.textContent = 'Inicio de sesión exitoso';
            document.getElementById('login').style.display = 'none';
            document.getElementById('menu').style.display = 'block';
            currentUser = user;
            displayMatches();

            document.getElementById('viewPredictions').addEventListener('click', () => {
                document.getElementById('predictions').style.display = 'block';
                document.getElementById('results').style.display = 'none';
                document.getElementById('upcoming').style.display = 'none';
            });

            document.getElementById('viewResults').addEventListener('click', () => {
                document.getElementById('predictions').style.display = 'none';
                document.getElementById('results').style.display = 'block';
                document.getElementById('upcoming').style.display = 'none';
            });

            document.getElementById('viewUpcoming').addEventListener('click', () => {
                document.getElementById('predictions').style.display = 'none';
                document.getElementById('results').style.display = 'none';
                document.getElementById('upcoming').style.display = 'block';
            });

            document.getElementById('editPredictions').addEventListener('click', enableEditing);
            document.getElementById('savePredictions').addEventListener('click', savePredictions);
        } else {
            loginResult.textContent = 'Usuario o clave incorrectos';
        }
    });

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
                    <input type="radio" name="prediction${match.id}" value="team1Win" disabled ${currentUser.groupPredictions[match.id] === 'team1Win' ? 'checked' : ''}>
                </div>
                <div class="score">vs</div>
                <div class="score">
                    <input type="radio" name="prediction${match.id}" value="draw" disabled ${currentUser.groupPredictions[match.id] === 'draw' ? 'checked' : ''}>
                </div>
                <div class="score">vs</div>
                <div class="score">
                    <input type="radio" name="prediction${match.id}" value="team2Win" disabled ${currentUser.groupPredictions[match.id] === 'team2Win' ? 'checked' : ''}>
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
        document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
            const matchId = input.name.replace('prediction', '');
            currentUser.groupPredictions[matchId] = input.value;
        });
        // Guardar usuarios en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = true;
        });
        document.getElementById('savePredictions').style.display = 'none';
        document.getElementById('editPredictions').style.display = 'block';
    }
});
