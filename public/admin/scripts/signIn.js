let formSubmitHandler = async (e) => {
    e.preventDefault();
    let userExists;
    let results = await postData('http://localhost:3200/api/admin/login', { email: e.target.email.value });
    if (results.status) userExists = results.data;
    else setErrorMessage(results.message);
    if (userExists.length != 0) {
        sessionStorage.setItem('adminId', userExists.adminId);
        window.location.replace(window.location.origin + '/admin/index.html');
    } else {
        setErrorMessage(results.message);
    }
};
