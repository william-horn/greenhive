
// get register button (login/signup)
const registerBtn = document.getElementById('register-btn');

// initialize register data
const registerVariant = registerBtn.dataset.registerVariant;

// login/signup behavior
const onLogin = data => {
    console.log('Passed login validation');
}

const onSignUp = data => {
    console.log('Pass signup validation');
}

const registerFunction = registerVariant === 'login'
    ? onLogin
    : onSignUp;

// generic register button click event
const onRegister = async (event) => {
    const usernameBox = document.getElementById('username-input');
    const passwordBox = document.getElementById('password-input');

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

    registerFunction(data);
    console.log('Recieved from server:', data);
}

registerBtn.addEventListener('click', onRegister);