let limit = 10;
const renderJobCards = (jobs) => {
    let jobsContainer = document.getElementById('featured-jobs-container');

    let template;
    if (jobs.length != 0) {
        template = jobs
            .map((job) => {
                return `<a href="./jobDetails.html?id=${job.id}" class="strip-card">
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
                </a>`;
            })
            .join(' ');
    } else {
        template = '<div>No Jobs Found</div>';
    }
    jobsContainer.innerHTML = template;
};
const categoryClickHandler = async (category, e) => {
    let siblings = Array.from(document.querySelectorAll('.category-card')).filter((sibling) => {
        return sibling != e;
    });
    siblings.forEach((sibling) => {
        sibling.classList.remove('category-card-active');
    });
    e.classList.add('category-card-active');
    let jobsResults = await getData(`http://localhost:3200/api/jobs?category=${category}`);
    jobsResults.status ? renderJobCards(jobsResults.data) : console.log('err');
    let jobsContainer = document.getElementById('featured-jobs-container');
    jobsContainer.scrollIntoView({ behavior: 'smooth' });
};
const onSearchSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let jobsResults = await getData('http://localhost:3200/api/jobs');
    if (jobsResults.status) {
        let searchResults = jobsResults.data.filter((job) => {
            if (
                job.jobRole.toLowerCase().includes(formProps.jobTitle.toLowerCase()) ||
                job.jobLocation.toLowerCase().includes(formProps.location.toLowerCase()) ||
                job.tags.includes(formProps.tag)
            ) {
                return true;
            } else return false;
        });
        renderJobCards(searchResults);
        let jobsContainer = document.getElementById('featured-jobs-container');
        jobsContainer.scrollIntoView({ behavior: 'smooth' });
    }
};
let loadMoreHandler = async () => {
    limit += 10;
    let jobsResults = await getData('http://localhost:3200/api/jobs?limit=' + limit);
    jobsResults.status ? renderJobCards(jobsResults.data) : console.log('err');
};
let subscriptionHandler = async () => {
    let subscriptionEmail = document.getElementById('subscriptionEmail');
    if (subscriptionEmail.checkValidity()) {
        let results = await postData('http://localhost:3200/api/newsletters', { email: subscriptionEmail.value });
        if (results.status) {
            setMessage('success', 'Subscribed to Newsletter');
            console.log('subscribed');
        } else {
            setMessage('error', 'Something went wrong .. ');
            console.log('err');
        }
    } else {
        setMessage('error', subscriptionEmail.validationMessage);
    }
};
window.addEventListener('load', async () => {
    let jobsResults = await getData('http://localhost:3200/api/jobs?limit=5');
    // console.log(jobs);
    jobsResults.status ? renderJobCards(jobsResults.data) : console.log('err');
});
