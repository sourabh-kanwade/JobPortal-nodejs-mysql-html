let onSubmitHandler = async (e) => {
    e.preventDefault();
    let errorContainer = document.querySelector('#error'),
        popUp = document.querySelector('#popUp'),
        nav = document.querySelector('.nav'),
        container = document.querySelector('.container'),
        footer = document.getElementsByTagName('footer')[0];
    let usersResults = await getData('http://localhost:3200/api/users/');
    if (usersResults.status) {
        if (usersResults.data.find((u) => u.email == e.target.email.value)) {
            errorContainer.innerHTML = 'User already registered';
            errorContainer.classList.add('active');
        } else if (e.target.password.value != e.target.cpass.value) {
            errorContainer.innerHTML = 'Password did not match';
            errorContainer.classList.add('active');
        } else {
            sessionStorage.setItem('userEmail', e.target.email.value);
            sessionStorage.setItem('userPass', e.target.cpass.value);
            popUp.classList.add('active');
            nav.style.pointerEvents = 'none';
            container.style.pointerEvents = 'none';
            footer.style.pointerEvents = 'none';
            nav.classList.add('blur');
            container.classList.add('blur');
            footer.classList.add('blur');
        }
    } else {
        errorContainer.innerHTML = usersResults.message;
        errorContainer.classList.add('active');
    }
};
let onInputHandler = () => {
    let errorContainer = document.querySelector('#error');
    errorContainer.classList.remove('active');
};
let jobProviderHandler = () => {
    sessionStorage.setItem('isJobProvider', true);
    window.location.replace(window.location.origin + '/addCompanyDetails.html');
};
let jobSeekerHandler = () => {
    sessionStorage.setItem('isJobProvider', false);
    window.location.replace(window.location.origin + '/addUserDetails.html');
};
