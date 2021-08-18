let renderFormValues = (user) => {
    let form = document.querySelector('.main-form-container'),
        userName = document.querySelector('#userName');

    userName.innerHTML = user.full_name;
    let userImage = document.querySelector('#user-image');
    userImage.src = user.photo;
    form.location.value = user.address;
    form.role.value = user.userRole;
    form.exp.value = user.experience;
    form.bio.value = user.bio;
    form.skills.value = user.skills;
};
let onFormSubmitHandler = async (e) => {
    e.preventDefault();
    let userData = new FormData();
    userData.append('photo', e.target.userImage.files[0]);
    let profileFormData = new FormData(e.target);
    // let data = Object.fromEntries(profileFormData);
    console.log(e.target.userImage.files[0]);
    if (e.target.userImage.files[0] != undefined) {
        let userResponse = await fetch('http://localhost:3200/api/users/' + getUserId(), {
            method: 'PATCH',
            body: userData,
        });
        let tmp1 = await userResponse.json();
        console.log(tmp1);
    }
    let response = await fetch('http://localhost:3200/api/jobSeekers/' + getUserId(), {
        method: 'PATCH',
        body: profileFormData,
    });
    let tmp = await response.json();
    if (tmp.status) {
        setMessage('success', 'Updated Successfully');
    } else {
        setMessage('error', 'Something went wrong .');
    }
};
let userImageUploadHandler = (e) => {
    let userImage = document.querySelector('#user-image');
    userImage.src = URL.createObjectURL(e.target.files[0]);
};
// let resumeUploadHandler = e =>{

// }
window.addEventListener('load', async () => {
    let { status, data: user } = await getData('http://localhost:3200/api/jobSeekers/' + getUserId());
    console.log(user);
    status ? renderFormValues(user) : setMessage('error', 'Something went wrong .');
});
