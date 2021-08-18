let sideNavActive = true;
let optionsActive = true;
let errorActive = false;
let loadSideBar = () => {
    let sideNav = document.querySelector('.side-nav');
    let linkTitles = document.getElementsByClassName('link-title');
    if (sideNavActive) {
        sideNavActive = false;
        for (const link of linkTitles) {
            link.classList.add('inactive');
        }
        sideNav.classList.add('inactive');
    } else {
        sideNavActive = true;
        for (const link of linkTitles) {
            link.classList.remove('inactive');
        }
        sideNav.classList.remove('inactive');
    }
};
let loadOptions = () => {
    let settings = document.querySelector('.settings');
    let settingLogo = document.querySelector('#setting-icon');
    if (optionsActive) {
        optionsActive = false;
        settings.classList.add('active');
        settingLogo.classList.add('active');
    } else {
        optionsActive = true;
        settings.classList.remove('active');
        settingLogo.classList.remove('active');
    }
};
let setErrorMessage = (message) => {
    let errContainer = document.querySelector('.error-container');
    let errMessage = document.querySelector('.error-message');

    errorActive = true;
    errMessage.innerHTML = message;
    errContainer.classList.add('active');
};
let errorCloseHandler = () => {
    let errContainer = document.querySelector('.error-container');
    errorActive = false;
    errContainer.classList.remove('active');
};
let setSuccessMessage = (message) => {
    let successContainer = document.querySelector('.success-container');
    let successMessage = document.querySelector('.success-message');
    successMessage.innerHTML = message;
    successContainer.classList.add('active');
    setTimeout(() => {
        successContainer.classList.remove('active');
        window.location.reload();
    }, 2500);
};
let getData = async (url) => {
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {},
        });
        return response.json();
    } catch (error) {
        return error;
    }
};
let postData = async (url, data) => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (err) {
        return err;
    }
};
let updateData = async (url, data) => {
    try {
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (err) {
        return err;
    }
};
let deleteData = async (url) => {
    try {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {},
        });
        return response.json();
    } catch (error) {
        return error;
    }
};
// D-MMM-YYYY
let formatDate = (date) => {
    let d = new Date(date);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date_ = '' + d.getDate();
    let month = '' + months[d.getMonth()];
    let year = '' + d.getFullYear();
    return [date_, month, year].join('-');
};
// YYYY-MM-DD
let formatDateForInsert = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};
window.addEventListener('load', () => {
    document.getElementById('menu-button').onclick = loadSideBar;
});
