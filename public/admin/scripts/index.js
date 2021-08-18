let renderNewJobs = (companies) => {
    let jobRow = document.querySelector('.job-row-container');
    jobRow.innerHTML = companies
        .map((company) => {
            return `<div class="new-job-row">
                        <div class="d-flex align-center">
                        <div class="user-img d-flex flex-center">
                            <img src=${company.userPhoto} />
                        </div>
                        ${company.full_name}
                    </div>
                    <div>${company.jobRole}</div>
                    <div>${company.jobType}</div>
                    <div>${formatDate(company.startDate)}</div>
                    </div>`;
        })
        .join(' ');
};
let searchHandler = async (e) => {
    if (e.keyCode == 13) {
        let searchTerm = e.target.value;
        let jobApplicationsResults = await getData('http://localhost:3200/api/jobApplications');
        if (jobApplicationsResults.status) {
            let jobs = jobApplicationsResults.data.filter((job) => {
                if (job.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || job.jobRole.toLowerCase().includes(searchTerm.toLowerCase())) return true;
                else return false;
            });
            renderNewJobs(jobs);
        } else {
            setErrorMessage(jobApplicationsResults.message);
        }
    }
};

window.addEventListener('load', async () => {
    let totalUsers = document.querySelector('#totalUsers'),
        totalJobs = document.querySelector('#totalJobs'),
        totalCompanies = document.querySelector('#totalCompanies');
    let { status, data: users } = await getData('http://localhost:3200/api/users');
    if (status) totalUsers.innerHTML = users.length;
    let jobResults = await getData('http://localhost:3200/api/jobs');
    jobResults.status ? (totalJobs.innerHTML = jobResults.data.length) : setErrorMessage(jobResults.message);
    let companyResults = await getData('http://localhost:3200/api/companies');
    if (companyResults.status) {
        totalCompanies.innerHTML = companyResults.data.length;
    } else {
        setErrorMessage(companyResults.message);
    }
    let jobApplicationsResults = await getData('http://localhost:3200/api/jobApplications');
    if (jobApplicationsResults.status) {
        renderNewJobs(jobApplicationsResults.data);
    } else {
        setErrorMessage(jobApplicationsResults.message);
    }
});
