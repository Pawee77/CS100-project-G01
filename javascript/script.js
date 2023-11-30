
//Validate Firstname and Lastname
function validateName(){
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if(names.length !== 2 ){
    errorElement.textContent = "Please enter both your Firstname and Lastname";
    return false;
  } 
  else{
    errorElement.textContent = "";
  }
  return true;

}

//validate Student ID
function validateStudentID(){
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^6[1-6]09\d{6}$/;
  const errorElement = document.getElementById("studentIDError");

  if(!studentIDPattern.test(studentIDInput.value)){
    errorElement.textContent = "Please enter a 10 digit Student ID and you must be a student of the Faculty of Science currently studying. "
    return false;
  } else{
    errorElement.textContent = ""; 
  }
  return true;

}

//Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.*.\w{3,}@dome.tu.ac.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)){
    errorElement.textContent = "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  }
  else {
    errorElement.textContent = "";
  }
  return true;
}

//Funtion to validate phone
function validatePhoneNumber(){
  const PhoneInput = document.getElementById("Phonenumber");
  const PhonePattern = /^0\d{9}$/;
  const errorElement = document.getElementById("PhonenumberError");

  if (!PhonePattern.test(PhoneInput.value)) {
    errorElement.textContent = "Please enter your valid 10-digit Phone Number";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

//Function to validate picture
function validateImage(){
  const imageInput = document.getElementById('Img');
  const imagePath = imageInput.value;
  const allowedExtension = /(\.jpg|\.jpeg|\.gif)$/i;
  if(!allowedExtension.exec(imagePath)){
    alert("Please upload file .jpeg/.jpg/.gif only");
    imageInput.value = '';
    return false;
  }
  else{
    if (imageInput.files && imageInput.files[0]){
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'" height="400"/>';

      };
      reader.readAsDataURL(imageInput.files[0]);
    }
  }
}

//Function to validate form inputs on user input
function validateFormOnInput(){
    alidateName();
    validateStudentID();
    validateEmail();
    validatePhoneNumber();
}

  // Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
   const activityTypeSelect = document.getElementById("activityType");
  
  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option); 
  }
}

async function submitForm(event){
  event.preventDefault();
  const startDateInput =  document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);
  
  errorElement = document.getElementById("submitError");

  if(!validateName() || !validateStudentID() || !validateEmail() || !validatePhoneNumber() || endDate <= startDate){
    if (endDate <= startDate) {
      alert("End datetime should be after the start datetime.");
    }
    errorElement.textContent = "Please fill in complete information.";
    return false;
  }
  else{
    errorElement.textContent = "";
    const formData = new FormData(event.target);

    for (const [name, value] of formData) {
        console.log(name, value);
      }

      const fullnameInput = document.getElementById("fullname");
      const studentIDInput = document.getElementById("studentID");
      const emailInput = document.getElementById("email");
      const workTitleInput = document.getElementById("workTitle");
      const activityTypeInput = document.getElementById('activityType');
      const academicYearInput = document.getElementById('academicYear');
      const semesterInput = document.getElementById('semester');
      const locationInput = document.getElementById('location');
      const descriptionInput = document.getElementById('description');
      const imageInput = document.getElementById('Img');
      const data = {
        first_name: fullnameInput.value.split(" ")[0],
        last_name: fullnameInput.value.split(" ")[1],
        student_id: studentIDInput.value,
        email: emailInput.value,
        title: workTitleInput.value,
        type_of_work_id: activityTypeInput.value,
        academic_year: academicYearInput.value,
        semester: semesterInput.value,
        start_date: startDateInput.value,
        end_date: endDateInput.value,
        location: locationInput.value,
        description: descriptionInput.value,
        image: imageInput.value
      };
      
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      var resultadd = document.getElementById("result");
      resultadd.classList.add("resultforsai");
      var Content = JSON.stringify(data, null, 2);
      var divElement = document.createElement('div');
      var divElementPic = document.createElement('div');
      divElementPic.id = "picture";
      
      divElement.textContent = Content.slice(1, -1).replace(/,/g, '').replace(/"/g, '');
      Contentforalert = Content.slice(1, -1).replace(/,/g, '').replace(/"/g, '');
      
      document.getElementById('result').appendChild(divElement);
      
      var reader = new FileReader();
      reader.onload = function (e) {
        var imageElement = document.createElement('img');
        imageElement.src = e.target.result;
        imageElement.alt = 'Preview';
        imageElement.style.maxHeight = '300px';
        divElementPic.appendChild(imageElement);
      };
      
      reader.readAsDataURL(imageInput.files[0]);
      
      document.getElementById('result').appendChild(divElementPic);

      var piccss = document.getElementById("picture");
      piccss.classList.add("piccs");
      document.getElementById("myForm").reset();
      
      alert(Contentforalert);

      try {
        // Send data to the backend using POST request
        const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          const responseData = await response.json();
          console.log("Form data submitted successfully!");
    
          
        } else {
          console.error("Failed to submit form data.");
    
          // Display error message
          alert("Failed to submit form data. Please try again.");
        }
      } catch (error) {
        console.error("An error occurred while submitting form data:", error);
      }
      return true;
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);
  
// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("Phonenumber").addEventListener("input",validatePhoneNumber);