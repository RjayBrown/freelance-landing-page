const consultationForm = document.querySelector("#consultationForm");
const companyName = document.querySelector("#company");
const industryList = document.querySelectorAll("#industry");
const timeList = document.querySelector("#time");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");

const appointmentForm = document.querySelector("#appointmentForm");
const nameField = document.querySelectorAll("#name");
const subjectField = document.querySelectorAll("#subject");
const dateField = document.querySelector("#date");
const inputFields = document.querySelectorAll("input");
const selectFields = document.querySelectorAll("select");
const textareaFields = document.querySelectorAll("textarea");
const submitBtn = document.querySelectorAll(".primary");
const resetBtn = document.querySelectorAll(".reset");
const restartBtn = document.querySelector(".restart");

const contactForm = document.querySelector("#contactForm");

// ON PAGE LOAD
let savedUserData = JSON.parse(localStorage.getItem("data"));
buildConnectedForms();
validateAndSaveOnSubmit();
clearAndFocusOnReset();

window.addEventListener("hashchange", () => {
	setFormStyle();
});

restartBtn.addEventListener("click", (e) => {
	e.preventDefault();
	localStorage.removeItem("data");
	location.hash = "consultation";
	setTimeout(() => {
		consultationForm.reset();
		appointmentForm.reset();
	}, 50);
});

//--------------------------------------------------------------------------//

function buildConnectedForms() {
	//Render dropdown
	createDropdownOptions();

	// Connect forms
	const connectedFields = {
		consultationFields: [
			"company",
			"industry",
			"answer1",
			"answer2",
			"answer3",
		],
		appointmentFields: ["company", "industry", "message"],
	};

	// Summary template for message field (appointment form)
	const setSummaryText = (data) => {
		return `SUMMARY \n\nWhat is the top priority for your business right now? \n  • ${data.answer1} \n\nWhat are the most frustrating tasks for you or your employees? \n  • ${data.answer2} \n\nWhat negative customer feedback have you received? \n  • ${data.answer3}`;
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

		setFormStyle();
	});

	function createDropdownOptions() {
		// Create optgroup element for industry groups and add to each dropdown list
		const industryGroups = [
			{
				sector: "Business & General Services",
				industries: [
					"Food & Beverage",
					"Healthcare",
					"Landscaping",
					"Legal",
					"Real Estate",
					"Retail Shop",
					"Salon - Hair & Nails",
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
				sector: "Media & Creative",
				industries: [
					"Entertainment",
					"Fashion",
					"Media & Broadcasting",
					"Publishing",
				],
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
			timeSlot: 20,
		};
		createTimeDropdown(scheduleConfig);
	}
}

function validateAndSaveOnSubmit() {
	// ON SUBMIT
	// Validate form input
	// Displays a custom message for invalid inputs and updates/removes message as the input value changes

	// Name
	nameField.forEach((field) => {
		field.addEventListener("input", (e) => {
			field.setCustomValidity("");
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
			company: companyName.value,
			industry: industryList[0].value,
			answer1: answer1.value,
			answer2: answer2.value,
			answer3: answer3.value,
		};
		localStorage.setItem("data", JSON.stringify(data));
		location.hash = "creating-value";
	});
}

function clearAndFocusOnReset() {
	// ON FORM RESET
	// Clear both forms and local storage
	resetBtn.forEach((btn, i) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			localStorage.removeItem("data");
			savedUserData = null;
			consultationForm.reset();
			appointmentForm.reset();
			contactForm.reset();

			if (i === 1) {
				answer1.focus();
			} else if (i === 0) {
				nameField[i].focus();
			} else if (i === 2) {
				nameField[1].focus();
			} else {
				console.log(i);
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

		if (theme === "light") {
			fieldGroup.forEach((field) => {
				addPlaceholderClass(field, "placeholder");
				addPlaceholderClass(field, "light");
				selectFields.forEach((field) => {
					field.classList.add("light");
				});
			});

			submitBtn.forEach((btn) => {
				btn.style.backgroundColor = "rgb(39, 39, 39)";
				btn.style.color = "white";
			});

			resetBtn.forEach((btn) => {
				btn.style.borderColor = "rgb(39, 39, 39)";
			});
		} else {
			fieldGroup.forEach((field) => {
				field.classList.remove("placeholder");
				field.classList.remove("light");
				selectFields.forEach((field) => {
					field.classList.remove("light");
				});
			});

			submitBtn.forEach((btn) => {
				btn.removeAttribute("style");
			});

			resetBtn.forEach((btn) => {
				btn.classList.remove("light");
			});
		}
	});

	// Styling placeholder for light theme
	function addPlaceholderClass(elementId, className) {
		elementId.classList.add(className);
	}
}

// TIME DROPDOWN LIST
// TODO: Refactor for more flexibility
function createTimeDropdown(config) {
	// Configures validator for first available day in form
	const minDate = generateMinDate(7);
	dateField.setAttribute("min", minDate);

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
			optionEl.value = time;
			optionEl.textContent = time;
			timeList.appendChild(optionEl);

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
		}
	}
}

// Create option element
function createOptionGroup(title, options) {
	const optGroupEl = document.createElement("optgroup");
	optGroupEl.setAttribute("label", title);
	options.forEach((option) => {
		const optionEl = document.createElement("option");
		optionEl.setAttribute("value", option);
		optionEl.textContent = option;
		optionEl.classList.add("value");
		optGroupEl.appendChild(optionEl);
	});

	return optGroupEl;
}

// Generates formatted minimum date to be used in HTML
function generateMinDate(daysToAdd) {
	const date = new Date();
	date.setDate(date.getDate() + daysToAdd);

	// Convert new date to yyyy-mm-dd format
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, "0");
	const dd = String(date.getDate()).padStart(2, "0");

	return `${yyyy}-${mm}-${dd}`;
}
