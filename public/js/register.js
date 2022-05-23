
// get register button (login/signup)
const registerBtn = document.getElementById('register-btn');
const registerContainer = document.getElementById('register-container');

// initialize register data
const registerVariant = registerContainer.dataset.registerVariant;

// generic register button click event
const onRegister = async (event) => {
    const usernameBox = document.getElementById('username-box');
    const passwordBox = document.getElementById('password-box');

    // get username and password fields
    const userData = {
        username: usernameBox.value,
        password: passwordBox.value
    }

    // construct request data
    const requestMetadata = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }

    // send user data as a login or signup register variant
    // send route /register?variant=login
    // or send route /register?variant=signup
    const response = await fetch('/register?variant=' + registerVariant, requestMetadata);
    const data = await response.json();

    if (response.ok) {
        location.replace('/');
    }

    console.log('Recieved from server:', data);
}

registerBtn.addEventListener('click', onRegister);