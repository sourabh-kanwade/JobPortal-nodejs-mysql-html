let updateFlag = false;
let onFormSubmitHandler = async (e) => {
    e.preventDefault();
    // if job id present then update else add job
    if (updateFlag) {
        let jobId = new URL(window.location).searchParams.get('id');
        let jobForm = new FormData(e.target);
        let jobFormData = Object.fromEntries(jobForm);
        let result = await updateData('http://localhost:3200/api/jobs/' + jobId, jobFormData);
        if (result.status) {
            window.location.replace(window.location.origin + '/manageJobs.html');
        } else {
            console.log('err');
        }
    } else {
        let companyId = await getCompanyId();
        let jobForm = new FormData(e.target);
        jobForm.append('companyId', companyId);
        let jobFormData = Object.fromEntries(jobForm);
        console.log(jobFormData);
        let result = await postData('http://localhost:3200/api/jobs', jobFormData);
        if (result.status) {
            window.location.replace(window.location.origin + '/manageJobs.html');
        } else {
            console.log('err');
        }
    }
};
let renderFormValues = () => {};
window.onload = async () => {
    let jobId = new URL(window.location).searchParams.get('id');
    if (jobId != null) {
        updateFlag = true;
        let result = await getData('http://localhost:3200/api/jobs/' + jobId);
        if (result.status) {
            let job = result.data[0];
            console.log(job);
            let postJobForm = document.querySelector('.postJobForm');
            postJobForm.jobRole.value = job.jobRole;
            postJobForm.category.value = job.category;
            postJobForm.jobType.value = job.jobType;
            // radio
            postJobForm.jobLocation.value = job.jobLocation;
            postJobForm.startDate.value = formatDateForInsert(new Date(job.startDate));
            postJobForm.endDate.value = formatDateForInsert(new Date(job.endDate));
            postJobForm.roleOverview.value = job.roleOverview;
            postJobForm.workingFormat.value = job.workingFormat;
            postJobForm.keyPoints.value = job.keyPoints;
            postJobForm.tags.value = job.tags;
        } else {
            console.log('err');
        }
    }
};
