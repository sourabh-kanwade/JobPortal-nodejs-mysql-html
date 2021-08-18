let userImageUploadHandler = (e) => {
    let userImage = document.querySelector('#user-image');
    userImage.src = URL.createObjectURL(e.target.files[0]);
};
let userFormHandler = async (e) => {
    e.preventDefault();
    const userFormData = new FormData();
    let email = sessionStorage.getItem('userEmail'),
        userPassword = sessionStorage.getItem('userPass'),
        isJobProvider = sessionStorage.getItem('isJobProvider');
    userFormData.append('full_name', e.target.name.value);
    userFormData.append('email', email);
    userFormData.append('userPassword', userPassword);
    userFormData.append('isJobProvider', 0);
    userFormData.append('photo', e.target.userImage.files[0]);

    const jobSeekerForm = new FormData(e.target);
    jobSeekerForm.delete('name');

    try {
        let response = await fetch('http://localhost:3200/api/users', {
            method: 'POST',
            body: userFormData,
        });
        let data = await response.json();
        console.log(data);
        jobSeekerForm.append('userId', data.userId);
        let t = await fetch('http://localhost:3200/api/jobSeekers', {
            method: 'POST',
            body: jobSeekerForm,
        });
        let = results = await t.json();
        if (results.status) {
            window.location.replace(window.location.origin + '/signIn.html');
        }
    } catch (error) {
        console.log(error);
    }
};
