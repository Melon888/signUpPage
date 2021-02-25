var elements = [];
console.log(elements);
elements = JSON.parse(localStorage.getItem("allData"));
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();
});

function objectConstructor(usernameVal, emailVal, phoneVal, passwordVal) {
  this.usernameVal = usernameVal;
  this.emailVal = emailVal;
  this.phoneVal = phoneVal;
  this.passwordVal = passwordVal;
}

const sendData = (
  usernameVal,
  emailVal,
  phoneVal,
  passwordVal,
  sRate,
  count
) => {
  if (sRate === count) {
    var newVal = new objectConstructor(
      usernameVal,
      emailVal,
      phoneVal,
      passwordVal
    );
    let newOb_serialized = JSON.stringify(newVal);
    localStorage.setItem("allData", newOb_serialized);
    console.log(typeof elements);
    elements.push(newVal);
    console.log(elements);

    alert("registration successful");
    // swal("Welcome! " + usernameVal, "Registration Successful", "Success");
    location.href = `dashboard.html?username=${usernameVal}`;
  }
};

const successMsg = (usernameVal, emailVal, phoneVal, passwordVal) => {
  let formCon = document.getElementsByClassName("form-control");
  var count = formCon.length - 1;
  for (let i = 0; i < formCon.length; ++i) {
    if (formCon[i].className === "form-control success") {
      var sRate = 0 + i;
      // console.log(sRate);
      sendData(usernameVal, emailVal, phoneVal, passwordVal, sRate, count);
    } else {
      return false;
    }
  }
};

//defining validate()
const validate = () => {
  // const formVal = form.value.trim();
  const usernameVal = username.value.trim();
  const emailVal = email.value.trim();
  const phoneVal = phone.value.trim();
  const passwordVal = password.value.trim();
  const cpasswordVal = cpassword.value.trim();

  const isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf(".");
    if (dot <= atSymbol + 2) return false;
    if (dot === emailVal.length - 1) return false;
    return true;
  };

  //validate username
  if (usernameVal === "") {
    setErrorMsg(username, "username cannot be empty");
  } else if (usernameVal.length <= 2) {
    setErrorMsg(username, "username min 3 char");
  } else {
    setSuccessMsg(username);
  }

  //mail
  if (emailVal === "") {
    setErrorMsg(email, "email cannot be empty");
  } else if (!isEmail(emailVal)) {
    setErrorMsg(email, "Not a valid Email");
  } else {
    setSuccessMsg(email);
  }

  //phone value
  if (phoneVal === "") {
    setErrorMsg(phone, "field cannot be empty");
  } else if (phoneVal.length != 10) {
    setErrorMsg(phone, "Not a valid phone num");
  } else {
    setSuccessMsg(phone);
  }

  if (passwordVal === "") {
    setErrorMsg(password, "field cannot be empty");
  } else if (passwordVal.length <= 5) {
    setErrorMsg(password, "Minimum 6 characters required.");
  } else {
    setSuccessMsg(password);
  }

  if (cpasswordVal === "") {
    setErrorMsg(cpassword, "field cannot be empty");
  } else if (cpasswordVal != passwordVal) {
    setErrorMsg(cpassword, "passwords are not matching");
  } else {
    setSuccessMsg(cpassword);
  }

  successMsg(usernameVal, emailVal, phoneVal, passwordVal);
};

function setErrorMsg(input, errormsgs) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = errormsgs;
}

function setSuccessMsg(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
