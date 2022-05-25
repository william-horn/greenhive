
// get register button (login/signup)
const registerBtn = $('#register-btn');
const registerContainer = $('#register-container');
const infoMessageEl = $('#info-message');

// initialize register data
const registerVariant = registerContainer.attr('data-register-variant');

const register_POST = async rawData => {
    const response = await fetch('/register?variant=' + registerVariant, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rawData)
    });

    const data = await response.json();
    return { response, data };
}

const displayInfoMessage = (type, content) => {
    infoMessageEl.text(content);
    infoMessageEl.show();
    infoMessageEl.addClass('fade-in');
}

// generic register button click event
const onRegister = async (event) => {
    // get username and password fields
    infoMessageEl.removeClass('fade-in');
    
    const userData = {
        username: $('#username-box').val(),
        password: $('#password-box').val()
    }

    // send user data as a login or signup register variant
    // send route /register?variant=login
    // or send route /register?variant=signup
    const { response, data } = await register_POST(userData);

    if (response.ok) {
        location.replace('/');
    } else {
        displayInfoMessage('error', data.report.long);
    }

    console.log('Response:', response);
    console.log('Data:', data);
}

registerBtn.click(onRegister);