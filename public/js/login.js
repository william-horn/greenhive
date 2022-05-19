

const loginBtn = document.getElementById('register-btn');

const onLogin = async (event) => {
    const usernameBox = document.getElementById('username-input');
    const passwordBox = document.getElementById('password-input');

    const userData = {
        username: usernameBox.value,
        password: passwordBox.value
    }

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    if (response.ok) {
        //location.replace('/profile');
    }

    const data = await response.json();
}

loginBtn.addEventListener('click', onLogin);