let limit = 10;
let renderNewsLetters = (newsLetters) => {
    let container = document.querySelector('.newsletter-row-container');
    container.innerHTML = newsLetters
        .map((item, index) => {
            return `<div class="newsletter-row">
        <div>${index + 1}</div>
        <div>${item.email}</div>
        <div>${formatDate(item.appliedOn)}</div>
        <div><img src="../images/delete_cross.svg" alt="delete_cross" width="25" class="delete" onclick="newsletterDeleteHandler(${item.id})"/></div>
    </div>`;
        })
        .join(' ');
};
let newsletterDeleteHandler = async (id) => {
    let results = await deleteData('http://localhost:3200/api/newsletters/' + id);
    if (results.status) {
        let newsLettersResults = await getData('http://localhost:3200/api/newsletters?limit=' + limit);
        newsLettersResults.status ? renderNewsLetters(newsLettersResults.data) : setErrorMessage(newsLettersResults.message);
    } else {
        setErrorMessage(results.message);
    }
};
let loadMoreHandler = async () => {
    limit += 10;
    let newsLettersResults = await getData('http://localhost:3200/api/newsletters?limit=' + limit);
    newsLettersResults.status ? renderNewsLetters(newsLettersResults.data) : setErrorMessage(newsLettersResults.message);
};
window.addEventListener('load', async () => {
    let newsLettersResults = await getData('http://localhost:3200/api/newsletters?limit=' + limit);
    newsLettersResults.status ? renderNewsLetters(newsLettersResults.data) : setErrorMessage(newsLettersResults.message);
});
