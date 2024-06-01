document.addEventListener("DOMContentLoaded", () => {
    const users = [
        { id: "USER_0001", username: "darioRovetta", password: "d1231", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0002", username: "micaelaLatorre", password: "d1232", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0003", username: "myrianBrunengo", password: "d1233", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0004", username: "sergioRovetta", password: "d1234", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0005", username: "leandroRovetta", password: "d1235", groupPredictions: "", remainingPredictions: "" },
        { id: "USER_0006", username: "pabloRovetta", password: "d1236", groupPredictions: "", remainingPredictions: "" }
    ];

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
            document.getElementById('predictions').style.display = 'block';
            document.getElementById('results').style.display = 'block';
            document.getElementById('upcoming').style.display = 'block';
        } else {
            loginResult.textContent = 'Usuario o clave incorrectos';
        }
    });
});
