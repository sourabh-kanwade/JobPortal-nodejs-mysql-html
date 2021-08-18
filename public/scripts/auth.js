let optionsOpen = false;

let renderOptions = async () => {
    let accountSettingContainer = document.querySelector('.account-options');
    let arrow = document.querySelector('.arrow');
    let user = await getUser();
    if (optionsOpen) {
        accountSettingContainer.classList.remove('open');
        optionsOpen = false;
        arrow.innerHTML = '&#8964;';
    } else {
        arrow.innerHTML = '&#8963;';
        accountSettingContainer.classList.add('open');
        optionsOpen = true;
        if (user.isJobProvider) {
            accountSettingContainer.innerHTML = `<div>
            <div class="user-name">${user.full_name}</div>
            <div class="user-image-container">
            <img src=${user.photo} alt="user_image" width="40px" />
            </div>
            </div>
            <hr />
            <a href="./editCompanyDetails.html">Edit Company Details</a>
            <a href="./settings.html">Settings</a>
            <hr />
            <p onclick="logOut()">Logout</p>`;
        } else {
            accountSettingContainer.innerHTML = `<div>
            <div class="user-name">${user.full_name}</div>
            <div class="user-image-container">
            <img src=${user.photo} alt="user_image" width="40px" />
            </div>
            </div>
            <hr />
            <a href="./editProfile.html">Edit Profile</a>
            <a href="./settings.html">Settings</a>
            <hr />
            <p onclick="logOut()">Logout</p>`;
        }
    }
};
let isSignedIn = () => {
    return sessionStorage.getItem('userId') != null;
};
let getUserId = () => {
    return sessionStorage.getItem('userId');
};
let getCompanyId = async () => {
    let usersResults = await getData('http://localhost:3200/api/companies/company/' + getUserId());
    return usersResults.status ? usersResults.data.id : null;
};
let logOut = () => {
    sessionStorage.removeItem('userId');
    window.location.replace(window.location.origin + '/index.html');
};
let getUser = async () => {
    if (isSignedIn()) {
        let usersResults = await getData(`http://localhost:3200/api/users/${getUserId()}`);
        return usersResults.status ? usersResults.data : null;
    } else return null;
};

window.addEventListener('load', async () => {
    let navRight = document.querySelector('.nav-right');
    let navLeft = document.querySelector('.nav-left');
    let user = await getUser();
    // console.log(user);
    if (!isSignedIn() || user == null) {
        navLeft.innerHTML = `<a href="./jobs.html">Jobs</a>
                            <a href="./companies.html">Companies</a>`;
        navRight.innerHTML = `<a href="./signIn.html" >Sign In</a>
                            <a href="./signUp.html" class="btn sign-up"> Sign Up </a>
                            <a href="./postJob.html" class="btn post-job"> Post Job </a>`;
    } else if (user.isJobProvider) {
        navLeft.innerHTML = `<a href="./postJob.html">Post Job</a>
                            <a href="./manageJobs.html">Manage Jobs</a>`;
        navRight.innerHTML = `<a href="./jobApplications.html" >Job Applications</a>
                            <div class="user-image-container">
                            <img src=${user.photo} alt="user_image" width="40px"/>
                            </div>
                            <div class="user-name" onclick="renderOptions()">${user.full_name} <span class="arrow">&#8964;</span></div>`;
    } else {
        navLeft.innerHTML = `<a href="./jobs.html">Jobs</a>
                            <a href="./companies.html">Companies</a>`;
        navRight.innerHTML = ` <a href="./appliedJobs.html" >Applied Jobs</a>
                        <div class="user-image-container">
                        <img src=${user.photo} alt="user_image" width="40px" />
                        </div>
                        <div class="user-name" onclick="renderOptions()">${user.full_name} <span class="arrow">&#8964;</span></div>`;
    }
});
