const renderJobCards = (jobs) => {
    let jobsContainer = document.getElementById('featured-jobs-container');
    let template;
    if (jobs.length != 0) {
        template = jobs
            .map((job) => {
                return `<div onclick="toJobDetail(${job.jobID},event)" class="strip-card">
            <div class="strip-card-img-container">
            <img src=${job.photo} alt="company-logo" class="strip-card-img" />
            </div>
            <div class="strip-card-text">
            <div class="strip-card-title">${job.jobRole}</div>
            <div class="strip-card-subtitle">${job.jobLocation}</div>
            </div>
            <button class="btn btn-${job.jobType}">${job.jobType}</button>
            <div class="tags">
            ${job.tags
                .split(',')
                .map((tag) => {
                    return `<button>${tag}</button>`;
                })
                .join(' ')} 
            </div>
            <div class="start-date">${formatDate(job.startDate)}</div>
            <div><img src="./images/delete_cross.svg" alt="delete" width="45px" id="delete-icon" onclick="appliedJobsDeleteHandler(${job.id},event)"/></div>
            </div>`;
            })
            .join(' ');
    } else {
        template = '<div>No Jobs Found</div>';
    }

    jobsContainer.innerHTML = template;
};
let appliedJobsDeleteHandler = async (id, e) => {
    e.stopPropagation();
    let results = await deleteData(`http://localhost:3200/api/jobApplications/${id}`);
    if (results.status) {
        let appliedJobsResults = await getData(`http://localhost:3200/api/jobApplications?userId=${getUserId()}`);
        appliedJobsResults.status ? renderJobCards(appliedJobsResults.data) : console.log('err');
    } else {
        console.log('err');
    }
};
let toJobDetail = (jobId, e) => {
    e.stopPropagation();
    window.location.replace('/jobDetails.html?id=' + jobId);
};
window.addEventListener('load', async () => {
    let appliedJobsResults = await getData(`http://localhost:3200/api/jobApplications?userId=${getUserId()}`);
    appliedJobsResults.status ? renderJobCards(appliedJobsResults.data) : console.log('err');
});
