let onSubmitHandler = async (e) => {
    e.preventDefault();
    let errorContainer = document.querySelector('#error');
    console.log(JSON.stringify({ email: e.target.email.value }));
    let userResult = await postData('http://localhost:3200/api/users/login', { email: e.target.email.value });
    console.log(userResult);
    try {
        if (!userResult.status) throw userResult.message;
        else if (userResult.data.userPassword != e.target.password.value) throw 'Password is wrong';
        else if (userResult.data.isJobProvider == 1) {
            sessionStorage.setItem('userId', userResult.data.id);
            window.location.replace(window.location.origin + '/jobApplications.html');
        } else {
            sessionStorage.setItem('userId', userResult.data.id);
            window.location.replace(window.location.origin + '/appliedJobs.html');
        }
    } catch (error) {
        if (error) {
            errorContainer.classList.add('active');
            errorContainer.innerHTML = error;
        }
    }
};
let onInputHandler = () => {
    let errorContainer = document.querySelector('#error');
    errorContainer.classList.remove('active');
};
