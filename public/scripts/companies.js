let limit = 3;
let renderCompanyCards = (companies) => {
    let template;
    const companiesContainer = document.querySelector('.companies-container');
    if (companies.length != 0) {
        template = companies
            .map((company) => {
                return `<a href="./companyDetails.html?id=${company.id}" class="company-card">
            <div class="company-info">
                <div class="company-logo-container">
                    <img src=${company.photo} alt="company-logo" />
                </div>
                <div>
                    <p class="company-name">${company.companyName}</p>
                    <p class="company-website">${company.website}</p>
                </div>
            </div>
            <button class="btn btn-primary">${company.jobPosted} Jobs Posted</button>
        </a>`;
            })
            .join(' ');
    } else {
        template = 'No Companies Found';
    }
    companiesContainer.innerHTML = template;
};
const onSearchSubmitHandler = async (e) => {
    e.preventDefault();
    const companyName = e.target.companyName.value.toLowerCase();
    const searchResults = await getData('http://localhost:3200/api/companies?companyName=' + companyName);
    searchResults.status ? renderCompanyCards(searchResults.data) : console.log('err');
};
let moreCompaniesHandler = async () => {
    limit += 6;
    let companyResults = await getData('http://localhost:3200/api/companies?limit=' + limit);
    companyResults.status ? renderCompanyCards(companyResults.data) : console.log('err');
};
window.addEventListener('load', async () => {
    let companyResults = await getData('http://localhost:3200/api/companies?limit=' + limit);
    companyResults.status ? renderCompanyCards(companyResults.data) : console.log('err');
});
