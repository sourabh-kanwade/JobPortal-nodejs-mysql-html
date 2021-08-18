let onFormSubmitHandler = async (e) => {
    e.preventDefault();
    let results = await updateData('http://localhost:3200/api/admin/' + getUserId(), { email: e.target.email.value, name: e.target.name.value });
    console.log(results);
    if (results.status) {
        window.location.reload();
    } else {
        console.log('err');
    }
};
window.addEventListener('load', async () => {
    let user = await getUser();
    let form = document.querySelector('.main-form-container');
    form.name.value = user.name;
    form.email.value = user.email;
});
