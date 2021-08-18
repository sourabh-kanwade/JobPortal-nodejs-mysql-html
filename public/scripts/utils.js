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
let setMessage = (messageType, message) => {
    let messageContainer = document.querySelector('.message-container');
    let messageText = document.querySelector('.message');
    let container = document.querySelector('.container');
    if (messageType == 'success') {
        messageContainer.classList.add('success');
        messageContainer.classList.add('active');
        container.classList.add('blur');
        messageText.innerHTML = message;
        setTimeout(() => {
            messageContainer.classList.remove('success');
            messageContainer.classList.remove('active');
            container.classList.remove('blur');
            window.location.reload();
        }, 5000);
    }
    if (messageType == 'error') {
        messageContainer.classList.add('error');
        messageContainer.classList.add('active');
        container.classList.add('blur');
        messageText.innerHTML = message;
        setTimeout(() => {
            messageContainer.classList.remove('error');
            messageContainer.classList.remove('active');
            container.classList.remove('blur');
        }, 2500);
    }
};
