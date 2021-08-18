let limit = 5;

let renderJobRows = (jobs) => {
    let jobsRowsContainer = document.querySelector('.jobs-row-container');
    jobsRowsContainer.innerHTML = jobs
        .map((job) => {
            return ` <div class="job-row">
        <div>${job.jobRole}</div>
        <div>${job.jobType}</div>
        <div>${job.category}</div>
        <div>${job.companyName}</div>
        <div>${formatDate(job.startDate)}</div>
        <div>
            <a href="./editJob.html?id=${job.id}"><img src="../images/edit_icon.svg" alt="edit_icon" width="25" /></a>
            <img src="../images/delete_cross.svg" alt="delete_cross" width="25" class="deleteJob" onclick="jobDeleteHandler(${job.id})"/>
        </div>
    </div>`;
        })
        .join(' ');
};
let loadMoreHandler = async () => {
    limit += 7;
    let jobResults = await getData('http://localhost:3200/api/jobs?limit=' + limit);
    jobResults.status ? renderJobRows(jobResults.data) : setErrorMessage(jobResults.message);
};
let jobDeleteHandler = async (id) => {
    let results = await deleteData('http://localhost:3200/api/jobs/' + id);

    if (results.status) {
        let jobResults = await getData('http://localhost:3200/api/jobs?limit=' + limit);
        jobResults.status ? renderJobRows(jobResults.data) : setErrorMessage(jobResults.message);
    } else {
        setErrorMessage(results.message);
    }
};

let searchHandler = async (e) => {
    if (e.keyCode == 13) {
        let searchTerm = e.target.value.toLowerCase();
        let jobResults = await getData('http://localhost:3200/api/jobs');
        if (jobResults.status) {
            let searchResults = jobResults.data.filter((job) => {
                if (
                    job.jobRole.toLowerCase().includes(searchTerm) ||
                    job.jobType.toLowerCase().includes(searchTerm) ||
                    job.category.toLowerCase().includes(searchTerm) ||
                    job.companyName.toLowerCase().includes(searchTerm)
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            renderJobRows(searchResults);
        } else {
            setErrorMessage(jobResults.message);
        }
    }
};
window.addEventListener('load', async () => {
    let jobResults = await getData('http://localhost:3200/api/jobs?limit=' + limit);
    jobResults.status ? renderJobRows(jobResults.data) : setErrorMessage(jobResults.message);
});
