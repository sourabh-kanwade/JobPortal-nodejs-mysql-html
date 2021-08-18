let renderCandidateCard = (candidate) => {
    let cardContainer = document.querySelector('.candidate-card');
    let resumeContent = document.querySelector('#userResume');
    resumeContent.src = candidate.userResume;
    cardContainer.innerHTML = `<div class="candidate-img-container">
                                    <img src=${candidate.photo} alt="candidate-image" />
                                </div>
                    <div class="candidate-details-container">
                        <h2>${candidate.full_name}</h2>
                        <button>${candidate.userRole}</button>
                        <div>
                            <div class="candidate-detail">
                                <img src="./images/address_icon.svg" alt="logo" />
                                <span>${candidate.address}</span>
                            </div>
                            <div class="candidate-detail">
                                <img src="./images/mail.svg" alt="logo" />
                                <span>${candidate.email}</span>
                            </div>
                            <div class="candidate-detail">
                                <img src="./images/net_globe.svg" alt="logo" />
                                <span>${candidate.website}</span>
                            </div>
                            <div class="candidate-detail">
                                <img src="./images/call_phone.svg" alt="logo" />
                                <span>${candidate.phone}</span>
                            </div>
                            <div class="candidate-detail">
                                <img src="./images/degree.svg" alt="logo" />
                                <span>${candidate.highestQualifiaction}</span>
                            </div>
                            <div class="candidate-detail">
                                <img src="./images/job.svg" alt="logo" />
                                <span>${candidate.experience} Years Exp</span>
                            </div>
                        </div>
                    </div>`;
};
window.onload = async () => {
    let id = new URL(window.location).searchParams.get('id');
    let candidateResults = await getData('http://localhost:3200/api/jobSeekers/' + id);
    candidateResults.status ? renderCandidateCard(candidateResults.data) : console.log('err');
};
