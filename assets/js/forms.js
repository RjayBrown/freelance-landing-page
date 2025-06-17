const consultationForm = document.querySelector("#consultationForm");
const companyName = document.querySelector("#company");
const industryList = document.querySelectorAll("#industry");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const timeField = document.querySelector("#time");
const modalTimeField = document.querySelector("#modal-time");
const dateField = document.querySelector("#date");
const modalDateField = document.querySelector("#modal-date");

const appointmentForm = document.querySelector("#appointmentForm");
const nameField = document.querySelectorAll("#name");
const emailField = document.querySelectorAll("#email");
const subjectField = document.querySelectorAll("#subject");
const inputFields = document.querySelectorAll("input");
const selectFields = document.querySelectorAll("select");
const textareaFields = document.querySelectorAll("textarea");
const submitBtn = document.querySelectorAll(".primary");
const resetBtn = document.querySelectorAll(".reset");
const saveBtn = document.querySelector(".save");
const nextStep = document.querySelector("#next-step");
const restartBtn = document.querySelector(".restart");

const modal = document.querySelector(".modal");
const modalForm = document.querySelector("#modalForm");
const modalSaveBtn = document.querySelector(".modal-save");
const modalResetBtn = document.querySelector(".modal-reset");
const modalCloseBtn = document.querySelector(".modal-close");

const contactForm = document.querySelector("#contactForm");
const minDate = generateDate(3);
const maxDate = generateDate(14);

// ON PAGE LOAD
let savedUserData = JSON.parse(localStorage.getItem("data"));
setFormStyle();
buildConnectedForms();
validateAndSaveOnSubmit();
clearAndFocusOnReset();

window.addEventListener("hashchange", () => {
	setFormStyle();
});

modalCloseBtn.addEventListener("click", () => toggleModal("hide"));

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
		appointmentFields: ["company", "date", "time", "industry", "message"],
		modalFields: ["modal-date", "modal-time"],
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

	connectedFields.appointmentFields.forEach((field) => {
		if (savedUserData) {
			field === "message"
				? (appointmentForm.elements[field].value = summary)
				: (appointmentForm.elements[field].value = savedUserData[field]);
		} else {
			appointmentForm.elements[field].value = "";
		}
	});

	// Preload modal form
	connectedFields.modalFields.forEach((field) => {
		if (savedUserData) {
			field === "modal-date"
				? (modalForm.elements[field].value = savedUserData["date"])
				: (modalForm.elements[field].value = savedUserData["time"]);
		}
	});

	// Updates preloaded user data without forcing a refresh
	window.addEventListener("hashchange", () => {
		const freshData = JSON.parse(localStorage.getItem("data"));
		const freshDetails = freshData ? setSummaryText(freshData) : null;
		connectedFields.appointmentFields.forEach((field) => {
			if (freshData) {
				field === "message"
					? (appointmentForm.elements[field].value = freshDetails)
					: (appointmentForm.elements[field].value = freshData[field]);
			} else {
				appointmentForm.elements[field].value = "";
			}
		});

		connectedFields.modalFields.forEach((field) => {
			if (freshData) {
				field === "modal-date"
					? (modalForm.elements[field].value = freshData["date"])
					: (modalForm.elements[field].value = freshData["time"]);
			}
		});

		modal.classList.add("hidden");

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

		// Create time dropdown list
		const scheduleConfig = {
			firstWindow: { open: 11, close: 13 },
			lastWindow: { open: 16, close: 18 },
			hours: { open: 8, close: 20 },
			timeSlot: 30,
		};

		createTimeDropdown(scheduleConfig);
	}
}

function validateAndSaveOnSubmit() {
	// ON SUBMIT
	// Validate form input
	// Displays a custom message for invalid inputs and updates/removes message as the input value changes

	// Name
	nameField.forEach((field, i) => {
		field.addEventListener("input", (e) => {
			e.preventDefault();
			field.setCustomValidity("");
			if (i === 1) {
				savedUserData.name = field.value;
				localStorage.setItem("data", JSON.stringify(savedUserData));
			}
		});
	});

	emailField.forEach((field, i) => {
		field.addEventListener("input", (e) => {
			e.preventDefault();
			field.setCustomValidity("");
			if (i === 1) {
				savedUserData.email = field.value;
				localStorage.setItem("data", JSON.stringify(savedUserData));
			}
		});
	});

	nameField.forEach((field) => {
		field.addEventListener("invalid", (e) => {
			field.setCustomValidity("Please enter a minimum of 3 characters.");
		});
	});

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

	// Date
	dateField.addEventListener("input", (e) => {
		dateField.setCustomValidity("");
	});

	dateField.addEventListener("invalid", (e) => {
		dateField.setCustomValidity("Please select an available date.");
	});

	// ON SUBMIT (Consultation Form)
	// Saves data to local storage and scroll
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
			toggleModal("show");
			saveBtn.removeAttribute("style");
		}, 500);
	});

	modalForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = JSON.parse(localStorage.getItem("data"));
		data.date = modalDateField.value;
		data.time = modalTimeField.value;

		modalSaveBtn.value = "Saved!";
		modalSaveBtn.style.backgroundColor = "green";
		modalSaveBtn.style.color = "white";
		modalSaveBtn.style.boxShadow = "0 0 0 2px green";
		setTimeout(() => {
			modalSaveBtn.value = "Save";
			modalSaveBtn.removeAttribute("style");
			location.hash = "contact";
			toggleModal("hide");
		}, 500);
		localStorage.setItem("data", JSON.stringify(data));
	});
}

function toggleModal(toState) {
	if (toState === "show") {
		modal.classList.remove("hidden");

		setTimeout(() => {
			modal.classList.remove("hide");
			modal.classList.add(toState);
		}, 100);
	}

	if (toState === "hide") {
		modal.classList.remove("show");
		modal.classList.add(toState);

		setTimeout(() => {
			modal.classList.add("hidden");
		}, 100);
	}
}

function clearAndFocusOnReset() {
	// ON FORM RESET
	// Clear both forms and local storage
	resetBtn.forEach((btn, i) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			if (i !== 0) {
				localStorage.removeItem("data");
				savedUserData = null;
				consultationForm.reset();
				appointmentForm.reset();
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

	modalResetBtn.addEventListener("click", (e) => {
		e.preventDefault();
		modalForm.reset();
		modalDateField.value = minDate;
	});
}

restartBtn.addEventListener("click", (e) => {
	e.preventDefault();
	localStorage.removeItem("data");
	location.hash = "consultation";
	setTimeout(() => {
		consultationForm.reset();
		appointmentForm.reset();
		modalForm.reset();
		modalDateField.value = minDate;
		dateField.value = minDate;
		toggleModal("hide");
	}, 50);
});

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

		if (theme === "light") {
			resetBtn.forEach((btn) => {
				btn.style.borderColor = "rgb(20, 20, 20)";
			});
			restartBtn.style.borderColor = "rgb(20, 20, 20)";
		} else {
			restartBtn.classList.remove("light");

			resetBtn.forEach((btn) => {
				btn.classList.remove("light");
			});
		}
	});
}

// TIME DROPDOWN LIST
// TODO: Refactor for more flexibility
function createTimeDropdown(config) {
	// Configures validator for first available day in form
	dateField.setAttribute("min", minDate);
	modalDateField.setAttribute("min", minDate);
	dateField.setAttribute("max", maxDate);
	modalDateField.setAttribute("max", maxDate);
	dateField.value = minDate;
	modalDateField.value = minDate;

	let timeOptionElements = [];

	for (let hour = config.hours.open; hour < config.hours.close; hour++) {
		// Set time options for each window
		for (let min = 0; min < 60; min += config.timeSlot) {
			const converted = hour % 12 || 12;
			const period = hour >= 12 ? "PM" : "AM";

			const hh = String(converted).padStart(2, "0");
			const mm = String(min).padStart(2, "0");

			const time = `${hh}:${mm} ${period}`;

			// Create option element for each time slot
			const optionEl = document.createElement("option");
			optionEl.setAttribute("value", time);
			optionEl.textContent = time;
			optionEl.classList = "time";

			// Disable unavailable time slots
			if (converted < config.firstWindow.open % 12 && period === "AM") {
				optionEl.setAttribute("disabled", true);
			}

			if (converted > config.firstWindow.close % 12 && period === "PM") {
				converted !== 12 ? optionEl.setAttribute("disabled", true) : null;
			}

			if (config.lastWindow) {
				if (converted > config.lastWindow.open % 12 && period === "PM") {
					optionEl.removeAttribute("disabled");
				}
			}

			timeOptionElements.push(optionEl);
		}
	}
	timeOptionElements.forEach((el) => {
		modalTimeField.appendChild(el.cloneNode(true));
		timeField.appendChild(el);
	});
}

// Create option element
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

// Generates formatted minimum date to be used in HTML
function generateDate(daysToAdd) {
	const date = new Date();
	date.setDate(date.getDate() + daysToAdd);

	// Convert new date to yyyy-mm-dd format
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, "0");
	const dd = String(date.getDate()).padStart(2, "0");

	return `${yyyy}-${mm}-${dd}`;
}
