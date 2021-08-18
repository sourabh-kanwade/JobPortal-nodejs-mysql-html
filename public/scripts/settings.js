let renderFormValues = (user) => {
    let form = document.querySelector('.main-form-container');
    form.name.value = user.full_name;
    form.email.value = user.email;
};
let onFormSubmitHandler = async (e) => {
    e.preventDefault();
    let userForm = {
        full_name: e.target.name.value,
        email: e.target.email.value,
    };
    let result = await updateData('http://localhost:3200/api/users/' + getUserId(), userForm);
    if (result.status) {
        setMessage('success', 'Updated Successfully');
    } else {
        setMessage('error', 'Something went wrong .');
    }
    console.log(result);
};
window.addEventListener('load', async () => {
    let user = await getUser();
    renderFormValues(user);
});
