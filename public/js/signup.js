
const signupBtn = document.getElementById('register-btn');

const onSignUp = async (event) => {
    const usernameBox = document.getElementById('username-input');
    const passwordBox = document.getElementById('password-input');
    
    const userData = {
        username: usernameBox.value,
        password: passwordBox.value
    }

    const response = await fetch('/signup', {
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

signupBtn.addEventListener('click', onSignUp);