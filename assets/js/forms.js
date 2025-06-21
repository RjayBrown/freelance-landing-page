const consultationForm = document.querySelector("#consultationForm");
const companyName = document.querySelector("#company");
const referralCompany = document.querySelector("#referral-company");
const industryList = document.querySelectorAll("#industry");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");

const contactForm = document.querySelector("#contactForm");
const referralForm = document.querySelector("#referralForm");
const nameField = document.querySelectorAll("#name");
const emailField = document.querySelectorAll("#email");
const subjectField = document.querySelectorAll("#subject");
const inputFields = document.querySelectorAll("input");
const selectFields = document.querySelectorAll("select");
const textareaFields = document.querySelectorAll("textarea");
const resetBtns = document.querySelectorAll(".reset");
const saveBtn = document.querySelector(".save");

// Calendly container
const container = document.querySelector(".calendly-container");

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
	// Render dropdown
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

		// save data to local storage
		const data = {
			company: companyName.value,
			industry: industryList[0].value,
			answer1: answer1.value,
			answer2: answer2.value,
			answer3: answer3.value,
		};

		localStorage.setItem("data", JSON.stringify(data));

		// flash saved status in button
		saveBtn.value = "Saved!";
		saveBtn.style.backgroundColor = "green";
		saveBtn.style.color = "white";
		saveBtn.style.boxShadow = "0 0 0 2px green";
		setTimeout(() => {
			saveBtn.value = "Save";
			saveBtn.removeAttribute("style");

			// preload calendly and send to contact page
			preloadCalendlyForm();
			location.hash = "contact";
		}, 500);
	});
}

// refresh calendly to prefill form fields
function preloadCalendlyForm() {
	const data = JSON.parse(localStorage.getItem("data"));

	// remove stale calendar
	container.innerHTML = "";

	// create new calendar container
	const newCalendlyCalendar = document.createElement("div");
	newCalendlyCalendar.id = "calendly-embed-element";
	calendlyContainer.appendChild(newCalendlyCalendar);

	// initialize fresh calendar widget with prefilled fields
	Calendly.initInlineWidget({
		url: `https://calendly.com/7oneconsulting/30min?hide_landing_page_details=1&hide_event_type_details=1&hide_gdpr_banner=1&primary_color=${calendlyColor[localStorage.getItem("theme")]}`,
		parentElement: newCalendlyCalendar,
		resize: true,
		prefill: {
			customAnswers: {
				a1: data ? data.company : "",
				a2: data ? data.industry : "",
				a3: setSummaryText(data),
			},
		},
	});
}

function clearAndFocusOnReset() {
	// ON FORM RESET
	// Clear both forms and local storage
	resetBtns.forEach((btn, i) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();

			if (i === 0) {
				referralForm.reset();
				referralCompany.focus();
			}

			if (i === 1) {
				contactForm.reset();
				nameField[1].focus();
			}

			if (i === 2) {
				localStorage.removeItem("data");
				savedUserData = null;
				consultationForm.reset();
				answer1.focus();
			}

			console.log(i);
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
