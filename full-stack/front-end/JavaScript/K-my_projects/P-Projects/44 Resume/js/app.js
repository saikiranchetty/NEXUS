document.addEventListener('DOMContentLoaded', function () {
    const formSections = document.querySelectorAll('.form-section');
    let currentSectionIndex = 0;

    // Show the first section
    formSections[currentSectionIndex].classList.add('active');

    // Next button functionality
    const nextButtons = document.querySelectorAll('.nextBtn');
    nextButtons.forEach((button) => {
        button.addEventListener('click', function () {
            // Hide the current section
            formSections[currentSectionIndex].classList.remove('active');
            // Move to the next section
            currentSectionIndex++;
            // Show the next section if it exists
            if (currentSectionIndex < formSections.length) {
                formSections[currentSectionIndex].classList.add('active');
            }
        });
    });

    document.getElementById('generateBtn').addEventListener('click', function () {
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const linkedin = document.getElementById('linkedin').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const objective = document.getElementById('objective').value;
        const experience = document.getElementById('experience').value;
        const projects = document.getElementById('projects').value;
        const achievements = document.getElementById('achievements').value;
        const languages = document.getElementById('languages').value;
        const skills = document.getElementById('skills').value;
        const education10th = document.getElementById('education10th').value;
        const education12th = document.getElementById('education12th').value;
        const higherEducation = document.getElementById('higherEducation').value;
        const certifications = document.getElementById('certifications').value;
        const extracurricular = document.getElementById('extracurricular').value;
        const traits = document.getElementById('traits').value;
        const interests = document.getElementById('interests').value;
        const template = document.getElementById('template').value;

        // Choose template class
        const templateClass = template === 'template1' ? 'template1' : 'template2';

        // Generate resume HTML
        const resumeHTML = `
            <div class="${templateClass}">
                <h2>${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Career Objective:</strong> ${objective}</p>
                <h3>Work Experience</h3>
                <p>${experience}</p>
                <h3>Projects</h3>
                <p>${projects}</p>
                <h3>Achievements</h3>
                <p>${achievements}</p>
                <h3>Languages</h3>
                <p>${languages}</p>
                <h3>Skills</h3>
                <p>${skills}</p>
                <h3>Education</h3>
                <p>10th: ${education10th}</p>
                <p>12th: ${education12th}</p>
                <p>Higher Education: ${higherEducation}</p>
                <h3>Certifications</h3>
                <p>${certifications}</p>
                <h3>Extra-Curricular Activities</h3>
                <p>${extracurricular}</p>
                <h3>Personality Traits</h3>
                <p>${traits}</p>
                <h3>Interests</h3>
                <p>${interests}</p>
            </div>
        `;

        // Display generated resume
        const resumeOutput = document.getElementById('resumeOutput');
        resumeOutput.innerHTML = resumeHTML;
        resumeOutput.style.display = 'block';

        // Show the download button
        document.getElementById('downloadBtn').style.display = 'block';

        // Download PDF functionality
        document.getElementById('downloadBtn').addEventListener('click', function () {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const pdfContent = resumeOutput.innerHTML;

            doc.html(pdfContent, {
                callback: function (doc) {
                    doc.save(`${name}_resume.pdf`);
                },
                x: 10,
                y: 10,
            });
        });
    });
});
