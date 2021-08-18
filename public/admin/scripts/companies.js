let renderCompanyCards = (companies) => {
    let cardContainer = document.querySelector('.company-cards-container');
    cardContainer.innerHTML = companies
        .map((company) => {
            return `<div class="company-card d-flex flex-column flex-center">
        <div class="company-details">
            <div class="company-card-logo-background">
                <img src=${company.photo} alt="logo" class="company-card-logo" />
            </div>
            <div class="company-details-text">
                <div class="company-card-name">${company.companyName}</div>
                <div class="company-card-website">${company.website}</div>
            </div>
        </div>
        <button class="company-jobs-posted">${company.jobPosted > 1 ? company.jobPosted + ' Jobs Posted' : company.jobPosted + ' Job Posted'} </button>
        <button class="delete-company" onclick="deleteCompanyHandler(${company.userId})">Delete</button>
    </div>`;
        })
        .join(' ');
};
let deleteCompanyHandler = async (id) => {
    let results = await deleteData('http://localhost:3200/api/companies/' + id);
    if (results.status) {
        let companies = await getData('http://localhost:3200/api/companies');
        renderCompanyCards(companies.data);
    } else {
        setErrorMessage(companyResults.message);
    }
};

let searchHandler = async (e) => {
    if (e.keyCode == 13) {
        let searchTerm = e.target.value.toLowerCase();
        let companyResults = await getData('http://localhost:3200/api/companies');
        if (companyResults.status) {
            let searchResults = companyResults.data.filter((company) => {
                if (company.companyName.toLowerCase().includes(searchTerm)) return true;
                else return false;
            });
            renderCompanyCards(searchResults);
        } else {
            setErrorMessage(companyResults.message);
        }
    }
};
window.addEventListener('load', async () => {
    let companyResults = await getData('http://localhost:3200/api/companies');
    if (companyResults.status) {
        console.log(companyResults.data);
        renderCompanyCards(companyResults.data);
    } else {
        setErrorMessage(companyResults.message);
    }
});
