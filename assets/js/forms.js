const consultationForm = document.querySelector("#consultationForm");
const companyName = document.querySelector("#company");
const industryList = document.querySelectorAll("#industry");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");

const contactForm = document.querySelector("#contactForm");
const nameField = document.querySelectorAll("#name");
const emailField = document.querySelectorAll("#email");
const subjectField = document.querySelectorAll("#subject");
const inputFields = document.querySelectorAll("input");
const selectFields = document.querySelectorAll("select");
const textareaFields = document.querySelectorAll("textarea");
const resetBtns = document.querySelectorAll(".reset");
const saveBtn = document.querySelector(".save");

// ON PAGE LOAD
let savedUserData = JSON.parse(localStorage.getItem("data"));
setFormStyle();
buildConnectedForms();
validateAndSaveOnSubmit();
clearAndFocusOnReset();

window.addEventListener("hashchange", () => {
	setFormStyle();
});

//--------------------------------------------------------------------------//
// Connect forms
function getConnectedFields() {
	return {
		consultationFields: [
			"company",
			"industry",
			"answer1",
			"answer2",
			"answer3",
		],
		appointmentFields: ["company", "industry", "message"],
	};
}

function buildConnectedForms() {
	//Render dropdown
	createDropdownOptions();
	const connectedFields = getConnectedFields();

	// Summary template for message field (appointment form)
	const setSummaryText = (data) => {
		return `What is the top priority for your business right now? \n  • ${data.answer1} \n\nWhat are the most frustrating tasks for you or your employees? \n  • ${data.answer2} \n\nWhat negative customer feedback have you received? \n  • ${data.answer3}`;
	};

	// Preload consultation form
	connectedFields.consultationFields.forEach((field) => {
		if (savedUserData) {
			consultationForm.elements[field].value = savedUserData[field];
		} else {
			consultationForm.elements[field].value = "";
		}
	});

	// Preload appointment form
	const summary = savedUserData ? setSummaryText(savedUserData) : null;

	window.addEventListener("hashchange", () => {
		setFormStyle();
	});

	function createDropdownOptions() {
		// Create optgroup element for industry groups and add to each dropdown list
		const industryGroups = [
			{
				sector: "General",
				industries: [
					"Beauty",
					"E-commerce",
					"Food & Beverage",
					"Landscaping",
					"Private Practice - Healthcare",
					"Private Practice - Legal",
					"Real Estate",
				],
			},
			{
				sector: "Industrial & Manufacturing",
				industries: [
					"Automotive Repair",
					"Construction",
					"Electrical",
					"HVAC",
					"Logistics",
					"Manufacturing",
					"Plumbing",
					"Warehousing",
				],
			},
			{
				sector: "Non-Profit",
				industries: ["Education", "Social Services"],
			},
			{
				sector: "Creative & Media",
				industries: [
					"Entertainment",
					"Fashion",
					"Media & Broadcasting",
					"Publishing",
				],
			},
			{
				sector: "Other",
				industries: ["N/A"],
			},
		];

		industryGroups.forEach((group) => {
			industryList.forEach((dropdown) => {
				const optgroupEl = createOptionGroup(group.sector, group.industries);
				dropdown.appendChild(optgroupEl);
			});
		});
	}
}

function validateAndSaveOnSubmit() {
	// ON SUBMIT

	// Subject
	subjectField.forEach((field) => {
		field.addEventListener("input", (e) => {
			field.setCustomValidity("");
		});
	});

	subjectField.forEach((field) => {
		field.addEventListener("invalid", (e) => {
			field.setCustomValidity(
				"Please select a subject from the dropdown list."
			);
		});
	});

	consultationForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = {
			...savedUserData,
			company: companyName.value,
			industry: industryList[0].value,
			answer1: answer1.value,
			answer2: answer2.value,
			answer3: answer3.value,
		};

		localStorage.setItem("data", JSON.stringify(data));

		saveBtn.value = "Saved!";
		saveBtn.style.backgroundColor = "green";
		saveBtn.style.color = "white";
		saveBtn.style.boxShadow = "0 0 0 2px green";
		setTimeout(() => {
			saveBtn.value = "Save";
			saveBtn.removeAttribute("style");
			location.hash = "contact";
		}, 500);
	});
}

function clearAndFocusOnReset() {
	// ON FORM RESET
	// Clear both forms and local storage
	resetBtns.forEach((btn, i) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			if (i !== 0) {
				localStorage.removeItem("data");
				savedUserData = null;
				consultationForm.reset();
				contactForm.reset();

				if (i === 2) {
					answer1.focus();
				} else if (i === 1) {
					nameField[0].focus();
				} else if (i === 3) {
					dateField.value = minDate;
					nameField[1].focus();
				}
			}
		});
	});
}

/*-------------------------------------------------------*/
/*                        CONFIG						 */
/*-------------------------------------------------------*/
// Set form style based on light/dark theme
function setFormStyle() {
	const formFields = [inputFields, selectFields, textareaFields];

	formFields.forEach((fieldGroup) => {
		const theme = localStorage.getItem("theme");

		fieldGroup.forEach((field) => {
			if (!field.classList.contains("primary")) {
				field.classList.add("light");
			}
		});

		if (theme !== "light") {
			resetBtns.forEach((btn) => {
				btn.classList.remove("light");
			});
		}
	});
}

// // Create option element
function createOptionGroup(title, options) {
	const optGroupEl = document.createElement("optgroup");
	optGroupEl.setAttribute("label", title);
	options.forEach((option) => {
		const optionEl = document.createElement("option");
		optionEl.setAttribute("value", option);
		optionEl.textContent = option;
		optionEl.classList = "value";
		optGroupEl.appendChild(optionEl);
	});

	return optGroupEl;
}
