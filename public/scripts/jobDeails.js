let applyHandler = async (jobId) => {
    if (isSignedIn()) {
        let response = await postData('http://localhost:3200/api/jobApplications', { jobID: jobId, userID: getUserId() });
        console.log(response);
        if (response.status) window.location.replace(window.location.origin + '/appliedJobs.html');
        else {
            let popInfo = document.querySelector('#pop-info ');
            let popMessage = document.querySelector('#message ');
            let container = document.querySelector('.container');
            popMessage.innerHTML = response.message;
            popInfo.classList.add('active');
            container.classList.add('blur');
        }
    } else {
        window.location.replace(window.location.origin + '/signIn.html');
    }
};
let popCloseHandler = () => {
    let popInfo = document.querySelector('#pop-info ');
    let container = document.querySelector('.container');
    popInfo.classList.remove('active');
    container.classList.remove('blur');
};
let renderSideCard = (job) => {
    let sideCardContainer = document.querySelector('.small-container');
    sideCardContainer.innerHTML = `<div class="side-card">
    <div class="side-card-heading">Job Detail</div>
    <div class="side-card-subtitle">Job Type</div>
    <div class="side-card-subtitle">Location</div>
    <div class="side-card-title">${job.jobType}</div>
    <div class="side-card-title">${job.jobLocation}</div>
    <div class="side-card-subtitle">Status</div>
    <div class="side-card-subtitle">Broadcast Time</div>
    <div class="side-card-title">${new Date(job.endDate).getTime() < new Date().getTime() ? 'Inactive' : 'Active'}</div>
    <div class="side-card-title">${Math.floor((new Date(job.endDate).getTime() - new Date(job.startDate).getTime()) / (1000 * 3600 * 24))} Days</div>
    <div class="side-card-subtitle">Tags</div>
    <div class="tags">${job.tags
        .split(',')
        .map((tag) => `<button>${tag}</button>`)
        .join(' ')}</div>
    <button class="btn btn-primary" onclick="applyHandler(${job.id})">Apply Now</button>
</div>`;
};
let renderJobCard = (job) => {
    let jobCardContainer = document.querySelector('.job-card-container');
    jobCardContainer.innerHTML = ` <div class="strip-card-img-container">
                                    <img src="${job.photo}" alt="company-logo" class="strip-card-img" />
                                </div>
                                <div class="job-card-details">
                                    <p class="company-name">${job.jobRole}</p>
                                    <p class="company-website">${job.website}</p>
                                    <p>Format : <button class="btn btn-${job.jobType}">${job.jobType}</button></p>
                                </div>
                                <div class="apply-section">
                                    <button class="btn btn-primary" onclick="applyHandler(${job.id})">Apply Now</button>
                                    <p>${formatDate(job.startDate)}</p>
                                </div>`;
};
let renderJobDetails = (job) => {
    let companyOverview = document.querySelector('#company-overview'),
        roleOverview = document.querySelector('#role-overview'),
        workFormat = document.querySelector('#work-format'),
        keyPoints = document.querySelector('#keypoints');
    companyOverview.innerHTML = job.info;
    roleOverview.innerHTML = job.roleOverview;
    workFormat.innerHTML = job.workingFormat;
    keyPoints.innerHTML = job.keyPoints;
};

window.addEventListener('load', async () => {
    let params = new URL(document.location).searchParams;
    let id = params.get('id');
    let jobsResult = await getData('http://localhost:3200/api/jobs/' + id);
    if (jobsResult.status) {
        renderSideCard(jobsResult.data[0]);
        renderJobCard(jobsResult.data[0]);
        renderJobDetails(jobsResult.data[0]);
    } else {
        console.log('err');
    }
});
