let loginpage, registerpage,logoutpage, fullname, age, mobile, address, dob, gender, city, skill = [], month, date, err, form, error, val = "", loginBtn, logoutBtn, isLoggedIn = false;

let username = "shubhampatil", password = "Shubham@123";



window.onload = function () {
	loginpage = document.getElementById("loginpage");
	registerpage = document.getElementById("registerpage");
	logoutpage=document.getElementById("logoutpage");
	err = document.getElementById("err");
	error=err;
	loginform = document.getElementById("loginform");
	registerform = document.getElementById("registerform");
	loginBtn = document.getElementById("loginBtn");
	logoutBtn = document.getElementById("logoutBtn");
	loginBtn.addEventListener("click", function () {
		let userInputName = document.getElementById("username").value;
		let userInputPassword = document.getElementById("password").value;
		if (username == userInputName && password == userInputPassword) {
			isLoggedIn = true;
			let profile = document.getElementById("profile");
			profile.title = "Logged in as '"+username+"'";
			let registerBtn = document.getElementById("register-btn");
			registerBtn.title = username;
			registerBtn.innerHTML = "Profile";
			let user=document.getElementById("user");
			user.innerText="@"+username;
			alert("Login Successfully");
			formPopups.closeLogin();
		}
	});

	logoutBtn.addEventListener("click",function(){
		isLoggedIn = false;
		let profile = document.getElementById("profile");
		profile.title = "login/signup";
		let registerBtn = document.getElementById("register-btn");
		registerBtn.title = "register";
		registerBtn.innerHTML = "Register";
		let user=document.getElementById("user");
		user.innerText="";
		formPopups.closeLogout();
		formPopups.resetForm();
	});
}



window.addEventListener("click", function (event) {
	if (event.target.id == loginpage.id) {
		formPopups.closeLogin();
		formPopups.resetForm();
	}
	else if (event.target.id == registerpage.id) {
		formPopups.closeRegister();
		formPopups.resetForm();
	}
	else if(event.target.id == logoutpage.id || event.target.id=="cancel"){
		formPopups.closeLogout();
		formPopups.resetForm();
	}
});

let formPopups = new Forms();

function Forms() {

	this.closeLogin = closeLogin;
	this.closeRegister = closeRegister;
	this.openLogin = openLogin;
	this.openRegister = openRegister;
	this.openLogout=openLogout;
	this.closeLogout=closeLogout;
	this.resetForm = resetForm;


	function closeLogin() {
		loginpage.style.display = "none";
		resetForm();
	}

	function openLogin() {
		if (isLoggedIn) {
			openLogout();
		}
		else {
			loginpage.style.display = "block";
		}

	}

	function openRegister() {
		if (isLoggedIn) {
			openLogout();
		}
		else{
			loginpage.style.display = "none";
			registerpage.style.display = "block";
		}

	}

	function closeRegister() {
		registerpage.style.display = "none";
		resetForm();
	}

	function closeLogout(){
		logoutpage.style.display="none";
	}

	function openLogout(){
		logoutpage.style.display="block";
	}


	function resetForm() {
		registerform.reset();
		loginform.reset();
		err.innerHTML = "&nbsp";
		val = "";
	}
}


//														Login








//														Validations


let validate = new Validate();

window.addEventListener("submit", function () {
	alert("Registration Successfull");
});

window.addEventListener("change", function (event) {
	let element = event.target;
	if (event.target.closest(".form-container")) {
		validate.validateOnchange(element);
	}
});


window.addEventListener("input", function (event) {
	let id = event.target.id;
	if (event.target.closest(".register")) {
		validate.validateOninput(id);
	}
});

function Validate() {

	this.validateform = validateform;
	this.validateOninput = validateOninput;
	this.validateOnchange = validateOnchange;
	this.validateOnchange = validateOnchange;
	this.validateOnselect = validateOnselect;
	this.isGenderSelected = isGenderSelected;
	this.isSkillSelected = isSkillSelected;
	this.validDate = validDate;
	this.checkLeap = checkLeap;

	function validateform() {
		let isValid = false;
		fullname = document.getElementById("name").value;
		age = document.getElementById("age").value;
		mobile = document.getElementById("mobile").value;
		dob = document.getElementById("dob").value;
		address = document.getElementById("address").value;
		city = document.getElementById("city");

		if (fullname == "") {
			err.innerHTML = "please enter name";
			err.style.visibility = "visible";
		}
		else if (mobile == "") {
			err.innerHTML = "please enter mobile";
			err.style.visibility = "visible";
		}
		else if (!validate.isGenderSelected()) {
			error = document.getElementById("genderError");
			error.style.visibility = "visible";
		}
		else if (dob == "") {
			err.innerHTML = "please enter date of birth";
			err.style.visibility = "visible";
		}
		else if (age == "") {
			err.innerHTML = "please enter age";
			err.style.visibility = "visible";
		}
		else if (address == "" || address.length < 5) {
			err.innerHTML = "please enter address";
			err.style.visibility = "visible";
		}
		else if (city.selectedIndex == 0) {
			err.innerHTML = "please select city";
			err.style.visibility = "visible";
		}
		else if (!validate.isSkillSelected()) {
			error = document.getElementById("skillsError");
			error.style.visibility = "visible";
		}
		else if (mobile.length < 10) {
			return;
		}
		else {
			error.style.visibility = "hidden";
			err.innerHTML = "&nbsp";
			isValid = true;
		}
		return isValid;
	}




	function validateOnselect(elt) {
		let error = document.getElementById(elt.name + "Error");
		if (elt.selectedIndex == 0) {
			error.style.visibility = "visible";
		}
		else {
			error.style.visibility = "hidden";
			err.style.visibility = "hidden";
		}
	}




	function isGenderSelected() {
		let genders = document.querySelectorAll("input[name=gender]");
		genders.forEach(gen => {
			if (gen.checked) {
				gender = gen.value;
			}
		});
		if (gender != undefined) {
			return true;
		}
		return false;
	}



	function isSkillSelected() {
		let skills = document.querySelectorAll("input[name=skills]");
		skills.forEach(skil => {
			if (skil.checked) {
				skill.push(skil.value);
			}
		});
		if (skill.length > 0) {
			return true;
		}
		return false;
	}



	function validateOnchange(elt) {
		let error = document.getElementById(elt.name + "Error");
		if (elt.name == "gender") {
			error.style.visibility = "hidden";
		}
		else if (elt.name == "skills") {
			if (isSkillSelected) {
				error.style.visibility = "hidden";
			}
		}

	}





	function validateOninput(id) {
		let valid = true, element = document.getElementById(id);
		let error = document.getElementById(element.name + "Error");
		element.addEventListener("blur", function (event) {
			error.style.visibility = "hidden";
			val = "";
		});

		if (element.value == "") {
			error.style.visibility = "visible";
		}
		if (id == "name") {
			if (element.value.match("[^a-zA-Z ]")) {
				element.value = element.value.substring(0, element.value.length - 1);
				error.style.visibility = "visible";
			}
			else {
				error.style.visibility = "hidden";
				err.style.visibility = "hidden";
			}

			if (element.value.match("[^a-zA-Z ]")) {
				element.value = val;
			}
		}
		else if (id == "mobile" || id == "age") {
			if (element.value.match("[^0-9]")) {
				element.value = element.value.substring(0, element.value.length - 1);
				error.style.visibility = "visible";
			}
			else {
				error.style.visibility = "hidden";
				err.style.visibility = "hidden";
			}

			if (element.value.match("[^0-9]")) {
				element.value = val;
			}
		}
		else if (id == "dob") {
			let d = new Date();
			let todayDate = d.getDate(), todayMonth = d.getMonth() + 1, todayYear = d.getYear() + 1900;

			if (element.value.length == 4 || element.value.length > 6) {
				if (element.value[element.value.length - 1] == "/") {
					element.value = element.value.substring(0, element.value.length - 1);
				}
			}

			if (element.value.match("[^0-9/]") || element.value.match("^[/]")) {
				element.value = element.value.substring(0, element.value.length - 1);
			}
			else if (element.value.length == 2) {

				if (element.value[1] == "/") {
					date = element.value[0].padStart(2, "0");
				}
				else {
					date = Number(element.value);
					if (date > 31) {
						date = 31;
					}
					date = String(date).padStart(2, "0");
				}
				if (element.value.length < val.length) {
					element.value = date;
				}
				else {
					element.value = date + "/";
				}
			}
			else if (element.value.length == 5) {


				if (element.value[4] == "/") {
					month = element.value[3].padStart(2, "0");
				}
				else {
					month = Number(element.value.substring(3, 5));
					if (month > 12) {
						month = 12;
					}
					month = String(month).padStart(2, "0");
				}

				if (date > validDate(month)) {
					date = validDate(month);
				}

				date = String(date).padStart(2, "0");

				if (element.value.length < val.length) {
					element.value = date + "/" + month;
				}
				else {
					element.value = date + "/" + month + "/";
				}
			}
			else if (element.value.length == 10) {
				let year = Number(element.value.substring(6, 10));

				if (year > todayYear) {
					year = todayYear - 18;
					date = todayDate;
					month = todayMonth;
				}
				else if (year < 1975) {
					year = 1975;
				}
				else {
					month = element.value.substring(3, 5);
					date = element.value.substring(0, 2);
				}

				if (month == 2) {

					if (checkLeap(year) && date > 28) {
						date = 29;
					}
					else {
						date = 28;
					}
				}
				element.value = String(date).padStart(2, "0") + "/" + String(month).padStart(2, "0") + "/" + year;


			}



			if (element.value.length != 10) {
				error.style.visibility = "visible";
			}
			else {
				error.style.visibility = "hidden";
				err.style.visibility = "hidden";
			}
			let datePattern = "([0-2][0-9]|[3][01])[/]([0][0-9]|[1][0-2])[/][0-9]{4}";
			if (!element.value.match("[0-9/]+") && element.value != "") {
				alert(element.value);
				element.value = val;
			}


		}
		else if (id == "age") {
			if (element.value.match("[^0-9]")) {
				element.value = element.value.substring(0, element.value.length - 1);
				error.style.visibility = "visible";
			}
			else {
				error.style.visibility = "hidden";
				err.style.visibility = "hidden";
			}
		}
		else if (id == "address") {
			if (element.value.length < 5) {

				error.style.visibility = "visible";
			}
			else if (element.value.length > 50) {
				element.value = element.value.substring(0, element.value.length - 1);
			}
			else {
				error.style.visibility = "hidden";
				err.style.visibility = "hidden";
			}
		}
		val = element.value;
	}

	function validDate(m) {
		m = Number(m);
		if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
			return 31;
		}
		else if (m == 4 || m == 6 || m == 9 || m == 11) {
			return 30;
		}
		else {
			return 29;
		}
	}

	function checkLeap(y) {
		y = Number(y);
		if (y % 4 == 0) {
			if (y % 100 == 0) {
				if (y % 400 != 0) {
					return false;
				}
			}
			return true;
		}
		return false;
	}

}