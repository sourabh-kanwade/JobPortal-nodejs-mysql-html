let onFormSubmitHandler = async (e) => {
    e.preventDefault();
    let jobId = new URL(window.location).searchParams.get('id');
    let jobForm = new FormData(e.target);
    let jobFormData = Object.fromEntries(jobForm);
    let jobResults = await updateData('http://localhost:3200/api/jobs/' + jobId, jobFormData);
    if (jobResults.status) {
        window.location.replace(window.location.origin + '/jobs.html');
    } else {
        setErrorMessage(jobResults.message);
    }
};
let renderFormValues = () => {};
window.addEventListener('load', async () => {
    let jobId = new URL(window.location).searchParams.get('id');
    if (jobId != null) {
        let jobResults = await getData('http://localhost:3200/api/jobs/' + jobId);
        if (jobResults.status) {
            let job = jobResults.data[0];
            console.log(job);
            let postJobForm = document.querySelector('.postJobForm');
            postJobForm.jobRole.value = job.jobRole;
            postJobForm.category.value = job.category;
            postJobForm.jobType.value = job.jobType;
            postJobForm.jobLocation.value = job.jobLocation;
            postJobForm.startDate.value = formatDateForInsert(new Date(job.startDate));
            postJobForm.endDate.value = formatDateForInsert(new Date(job.endDate));
            postJobForm.roleOverview.value = job.roleOverview;
            postJobForm.workingFormat.value = job.workingFormat;
            postJobForm.keyPoints.value = job.keyPoints;
            postJobForm.tags.value = job.tags;
        } else {
            setErrorMessage(jobResults.message);
        }
    }
});
