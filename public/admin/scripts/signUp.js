let formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        let userForm = new FormData(e.target);
        if (e.target.password.value != e.target.cpassword.value) throw "Password don't match!";
        userForm.delete('cpassword');
        let userData = Object.fromEntries(userForm);
        let results = await postData('http://localhost:3200/api/admin', userData);
        if (results.status) {
            window.location.replace(window.location.origin + '/admin/signIn.html');
        } else throw results.message;
    } catch (err) {
        setErrorMessage(err);
    }
};
