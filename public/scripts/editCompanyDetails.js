let userImageUploadHandler = (e) => {
    let userImage = document.querySelector('#user-image');
    userImage.src = URL.createObjectURL(e.target.files[0]);
};
let formSubmitHandler = async (e) => {
    e.preventDefault();
    let companyId = await getCompanyId();
    console.log(e.target.userImage.files[0]);
    let userFormData = new FormData();
    userFormData.append('photo', e.target.userImage.files[0]);

    let companyForm = new FormData(e.target);
    companyForm.delete('userImage');
    let companyFormData = Object.fromEntries(companyForm);

    let result = await updateData('http://localhost:3200/api/companies/' + companyId, companyFormData);
    if (result.status && e.target.userImage.files[0] != undefined) {
        let response = await fetch('http://localhost:3200/api/users/' + getUserId(), {
            method: 'PATCH',
            body: userFormData,
        });
        let data = await response.json();
        console.log(data);
        if (data.status) {
            setMessage('success', 'Updated Successfully');
            // window.location.reload();
        } else {
            setMessage('error', 'Please choose the image');
            console.log('err image');
        }
    } else {
        if (e.target.userImage.files[0] == undefined) setMessage('error', 'Please choose the image');
        else setMessage('error', 'Server Error');
        console.log('err img or server');
    }
};
let renderFormValues = (company) => {
    let form = document.querySelector('.postJobForm');
    let userImage = document.querySelector('#user-image');
    userImage.src = company.photo;
    form.companyName.value = company.companyName;
    form.companyLocation.value = company.companyLocation;
    form.website.value = company.website;
    form.info.value = company.info;
};
window.onload = async () => {
    let companyId = await getCompanyId();
    let { status, company } = await getData('http://localhost:3200/api/companies/' + companyId);
    console.log(company);
    status ? renderFormValues(company) : console.log('err');
};
