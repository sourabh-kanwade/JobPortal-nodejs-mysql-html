let renderCompanyCard = (company) => {
    let companyContainer = document.querySelector('.company-container');
    companyContainer.innerHTML = ` <div class="company-logo-container">
                                        <img src=${company.photo} alt="company-logo" />
                                    </div>
                                    <div class="company-text">
                                        <p class="company-name">${company.companyName}</p>
                                        <p class="company-website">${company.website}</p>
                                    </div>
                                    <button class="btn btn-primary">${company.jobPosted} Jobs Posted</button>`;
};
let renderCompanyJobs = (company, jobs) => {
    let companyJobsContainer = document.querySelector('#jobs');
    let template;
    if (jobs.length != 0) {
        template = jobs
            .map((job) => {
                return `<a href="./jobDetails.html?id=${job.id}" class="job-row">
                            <div class="strip-card-img-container">
                                <img src=${company.photo} alt="company-logo" class="strip-card-img" />
                            </div>
                            <div class="company-text">
                                <p class="company-name">${job.jobRole}</p>
                                <p class="company-website">${company.website}</p>
                            </div>
                            <button class="btn btn-${job.jobType}">${job.jobType}</button>
                            <p>${formatDate(job.startDate)}</p>
                        </a>`;
            })
            .join(' ');
    } else {
        template = 'No jobs';
    }
    companyJobsContainer.innerHTML = template;
};
window.addEventListener('load', async () => {
    let params = new URL(document.location).searchParams;
    let id = params.get('id');
    let { status, company, jobsPosted } = await getData('http://localhost:3200/api/companies/' + id);
    if (status) {
        renderCompanyCard(company);
        renderCompanyJobs(company, jobsPosted);
    } else {
        console.log('err');
    }
});
