let renderUserCards = (users) => {
    let usersCards = document.querySelector('.users-card-container');
    usersCards.innerHTML = users
        .map((user) => {
            return `<div class="user-card d-flex flex-column align-center">
        <img src="../images/delete_cross.svg" alt="delete-user" class="delete-user" title="Delete User" onclick="userDeleteHandler(${user.id})" />
        <div class="user-card-img-container d-flex flex-center">
            <img src=${user.photo} alt="user-img" class="user-card-img" />
        </div>
        <button class="btn-name">${user.full_name}</button>
        <p class="account-type">${user.isJobProvider == 0 ? 'JobSeeker' : 'JobProvider'}</p>
    </div>`;
        })
        .join(' ');
};
let searchHandler = async (e) => {
    if (e.keyCode == 13) {
        let searchTerm = e.target.value.toLowerCase();
        let usersResults = await getData('http://localhost:3200/api/users');
        if (usersResults.status) {
            if (searchTerm == 'jobseeker') {
                searchTerm = 0;
            }
            if (searchTerm == 'jobprovider') {
                searchTerm = 1;
            }
            let searchResults = usersResults.data.filter((user) => {
                if (user.full_name.toLowerCase().includes(searchTerm) || user.isJobProvider == searchTerm) return true;
                else return false;
            });
            renderUserCards(searchResults);
        } else {
            setErrorMessage(usersResults.message);
        }
    }
};
let userDeleteHandler = async (id) => {
    let result = await deleteData('http://localhost:3200/api/users/' + id);
    if (result.status) {
        window.location.reload();
    } else {
        setErrorMessage(result.message);
    }
};
window.addEventListener('load', async () => {
    let usersResults = await getData('http://localhost:3200/api/users');
    usersResults.status ? renderUserCards(usersResults.data) : setErrorMessage(usersResults.message);
});
