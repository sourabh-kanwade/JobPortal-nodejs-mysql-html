let jobDeleteHandler = async (jobId) => {
    let result = await deleteData('http://localhost:3200/api/jobs/' + jobId);
    if (result.status) {
        let companyId = await getCompanyId();
        let jobsResult = await getData('http://localhost:3200/api/jobs/company/' + companyId);
        jobsResult.status ? renderCompanyJobs(jobsResult.data) : console.log('err');
    } else {
        console.log('err');
    }
};
let renderCompanyJobs = (jobs) => {
    let applicationsContainer = document.querySelector('.applications-container');
    if (jobs.length != 0) {
        applicationsContainer.innerHTML = jobs
            .map((job) => {
                return `<div class="applications">
            <div>${job.id}</div>
            <div>${job.jobRole}</div>
            <div>${job.jobLocation}</div>
            <div>${formatDate(job.startDate)}</div>
            <div class="action-container">
            <a href="./postJob.html?id=${job.id}"><img src="./images/edit_icon.svg" alt="details" /></a>
            <img src="./images/delete_cross.svg" onclick="jobDeleteHandler(${job.id})" alt="delete" />
            </div>
            </div>`;
            })
            .join(' ');
    } else {
        applicationsContainer.innerHTML = 'No Jobs found';
    }
};
let onSearchSubmitHandler = async (e) => {
    e.preventDefault();
    let searchResults = await getData('http://localhost:3200/api/jobs/' + e.target.jobId.value);
    searchResults.status ? renderCompanyJobs(searchResults.data) : console.log('err');
};
window.addEventListener('load', async () => {
    let companyId = await getCompanyId();
    let jobsResults = await getData('http://localhost:3200/api/jobs/company/' + companyId);
    jobsResults.status ? renderCompanyJobs(jobsResults.data) : console.log('err');
});
