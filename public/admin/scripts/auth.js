let isSignedIn = () => {
    return sessionStorage.getItem('adminId') != null;
};
let getUserId = () => {
    return sessionStorage.getItem('adminId');
};
let getUser = async () => {
    if (isSignedIn()) {
        let results = await getData('http://localhost:3200/api/admin/' + getUserId());
        if (results.status) return results.data;
        else console.log(results.message);
    } else {
        return null;
    }
};
let logout = () => {
    sessionStorage.removeItem('adminId');
    window.location.reload();
};
window.onload = async () => {
    let user = await getUser();
    if (user != null) {
        let username = document.querySelector('#username');
        username.innerHTML = user.name;
    } else {
        window.location.replace(window.location.origin + '/admin/signIn.html');
    }
};
