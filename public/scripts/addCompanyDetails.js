let userImageUploadHandler = (e) => {
    let userImage = document.querySelector('#user-image');
    userImage.src = URL.createObjectURL(e.target.files[0]);
};
let onSubmitHandler = async (e) => {
    e.preventDefault();
    const userFormData = new FormData();
    let email = sessionStorage.getItem('userEmail'),
        userPassword = sessionStorage.getItem('userPass'),
        isJobProvider = sessionStorage.getItem('isJobProvider');
    userFormData.append('full_name', e.target.companyName.value);
    userFormData.append('email', email);
    userFormData.append('userPassword', userPassword);
    userFormData.append('isJobProvider', 1);
    userFormData.append('photo', e.target.userImage.files[0]);
    const jobProviderForm = new FormData(e.target);
    jobProviderForm.delete('userImage');
    try {
        let response = await fetch('http://localhost:3200/api/users', {
            method: 'POST',
            body: userFormData,
        });
        let data = await response.json();
        console.log(data);
        if (data.status) {
            jobProviderForm.append('userId', data.userId);
            let jobProviderFormData = Object.fromEntries(jobProviderForm);
            let results = await postData('http://localhost:3200/api/companies', jobProviderFormData);
            if (results.status) {
                window.location.replace(window.location.origin + '/signIn.html');
            }
        }
    } catch (error) {
        console.log(error);
    }
};
