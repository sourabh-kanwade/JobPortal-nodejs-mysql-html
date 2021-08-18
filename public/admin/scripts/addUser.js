let handleRadioClick = (isJobProvider) => {
    let userDetailForm = document.querySelector('#userDetailForm');
    if (isJobProvider == 1) {
        userDetailForm.innerHTML = `<label for="companyName">Company Name</label>
        <input type="text" name="companyName" placeholder="e.g YouTube" required />
        <label for="companyLogo">Company Logo</label>
        <div class="user-image-upload d-flex align-center">
            <div class="user-image-container d-flex flex-center">
                <img src="./images/user_icon.svg" alt="user_icon" id="user-image" width="45" />
            </div>
            <input
                type="file"
                name="userImage"
                class="custom-file-input custom-image-upload"
                accept="image/*"
                onchange="userImageUploadHandler(event)"
                required
            />
        </div>
        <label for="companyLocation">Where are you based?</label>
        <input type="text" name="companyLocation" placeholder="e.g. Pune , Maharashtra" required />
        <label for="website">Website</label>
        <input type="url" name="website" placeholder="e.g. https://example.com" required />
        <label for="info">What your company do ?</label>
        <textarea name="info" rows="5" placeholder="About your company ..." required></textarea>`;
    } else {
        userDetailForm.innerHTML = `<div class="description">
        <h4>About</h4>
        <p>Tell us about yourself so companies know who you are</p>
    </div>
    <div class="form-container">
        <div class="form-item">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" placeholder="e.g. Jon Walker" required />
        </div>
        <div class="user-image-upload d-flex align-center">
            <div class="user-image-container">
                <img src="./images/user_icon.svg" alt="user_icon" id="user-image" />
            </div>
            <input
                type="file"
                name="userImage"
                class="custom-file-input custom-image-upload"
                accept="image/*"
                onchange="userImageUploadHandler(event)"
                required
            />
        </div>
        <div class="form-item">
            <label for="location">Where are you based ?</label>
            <input type="text" name="location" id="location" placeholder="e.g. Mumbai , Maharashtra" required />
        </div>
        <div class="sideByside">
            <div class="form-item">
                <label for="website">Website</label>
                <input type="url" name="website" placeholder=" e.g. https://example.com" required />
            </div>
            <div class="form-item">
                <label for="phoneNumber">Phone Number</label>
                <input type="tel" name="phoneNumber" placeholder="2323232332" required />
            </div>
        </div>
        <div class="sideByside">
            <div class="form-item">
                <label for="role">Select Your Role</label>
                <select name="role" id="role">
                    <option value="default">Select Your Role</option>
                    <option value="UI Designer">UI-UX Designer</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Developer">Developer</option>
                    <option value="Security">Security</option>
                    <option value="Game Developer">Game Developer</option>
                </select>
            </div>
            <div class="form-item">
                <label for="exp">Years of Experience</label>
                <select name="exp" id="exp">
                    <option value="default">Select your experience</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5">5 Years</option>
                    <option value="6">6 Years</option>
                    <option value="7">7 Years</option>
                    <option value="8">8 Years</option>
                    <option value="9">9 Years</option>
                    <option value="10">10+ Years</option>
                </select>
            </div>
        </div>
        <div class="form-item">
            <label for="highestQualification">Highest Qualification</label>
            <input type="text" name="highestQualification" placeholder="e.g. B.TECH " required />
        </div>
        <div class="form-item">
            <label for="bio">Your Bio</label>
            <textarea name="bio" rows="7" placeholder="Stanford CS, Worked at Google,launched a successful android app .." required></textarea>
        </div>
    </div>
    <hr />
    <div class="description">
        <h4>Your Skills</h4>
        <p>Tell us about your skills</p>
    </div>
    <div class="form-container">
        <div class="form-item">
            <input type="text" name="skills" id="skills" placeholder="e.g. Python , Java , React" required />
        </div>
    </div>
    <hr />
    <div class="description">
        <h4>Resume</h4>
        <p>Upload your most up-to-date resume</p>
        <p>File types: PDF, DOCX, PPTX</p>
    </div>
    <div class="form-container resume-container">
        <img src="./images/file-pdf.svg" alt="" width="50px" />
        <input type="file" name="resume" id="resume" class="custom-file-input file-resume" accept=".pdf ,.docx,.pptx" required />
    </div>`;
    }
};
let userImageUploadHandler = (e) => {
    let userImage = document.querySelector('#user-image');
    userImage.src = URL.createObjectURL(e.target.files[0]);
};
let formValidator = (formData) => {
    for (let i = 0; i < formData.length; i++) {
        let element = formData[i];
        if (!element.checkValidity()) {
            element.reportValidity();
            return false;
        }
    }
    return true;
};
let handleSave = async () => {
    let userFormRef = document.querySelector('#user-form');
    let userDetailsFormRef = document.querySelector('#userDetailForm');

    // console.log(userFormRef.elements);
    if (formValidator(userFormRef.elements) && formValidator(userDetailsFormRef.elements)) {
        let userForm = new FormData(userFormRef);
        let userDetailForm = new FormData(userDetailsFormRef);
        let userDetailFormData;
        userForm.append('photo', userDetailsFormRef.userImage.files[0]);
        let userFormData = Object.fromEntries(userForm);
        if (userFormData.isJobProvider == '1') {
            userDetailForm.delete('userImage');
            userDetailFormData = Object.fromEntries(userDetailForm);
        } else {
            userDetailFormData = Object.fromEntries(userDetailForm);
        }

        try {
            let response = await fetch('http://localhost:3200/api/users', {
                method: 'POST',
                body: userForm,
            });
            let data = await response.json();
            console.log(data);
            if (data.status && userFormData.isJobProvider == '1') {
                userDetailForm.append('userId', data.userId);
                userDetailFormData = Object.fromEntries(userDetailForm);
                let results = await postData('http://localhost:3200/api/companies', userDetailFormData);
                if (results.status) {
                    console.log('companies done');
                    setSuccessMessage('Successfully Added Job Provider');
                } else {
                    throw new Error(results.message);
                }
            } else if (data.status) {
                userDetailForm.append('userId', data.userId);
                userDetailFormData = Object.fromEntries(userDetailForm);
                let t = await fetch('http://localhost:3200/api/jobSeekers', {
                    method: 'POST',
                    body: userDetailForm,
                });
                let = results = await t.json();
                if (results.status) {
                    console.log('jobseeker done');
                    setSuccessMessage('Successfully added Job Seeker');
                } else {
                    throw new Error(results.message);
                }
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
        console.log(userFormData);
        console.log(userDetailFormData);
    }
};
