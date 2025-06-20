// Theme
const wrapperTheme = document.querySelector("#wrapper");

// Calendly elements and theme colors
const calendlyContainer = document.querySelector(".calendly-container");
const calendlyCalendar = document.querySelector("#calendly-embed-element");
const calendlyColor = {
	purple: "734fae",
	blue: "2d538d",
	red: "8e1313",
	light: "c03737",
	dark: "c03737",
};

// ON PAGE LOAD

// Check for theme change and refresh calendar to update theme
const observer = new MutationObserver(function (mutationsList, observer) {
	for (const mutation of mutationsList) {
		if (mutation.type === "attributes" && mutation.attributeName === "class") {
			refreshCalendly();
		}
	}
});

// call mutation observer
observer.observe(wrapperTheme, {
	attributes: true,
	attributeFilter: ["class"],
});

//--------------------------------------------------------------------------//
// capture prefill data from local storage
function setSummaryText(details) {
	return details
		? `What is the top priority for your business right now? \n  - ${details.answer1} \n\nWhat are the most frustrating tasks for you or your employees? \n  - ${details.answer2} \n\nWhat negative customer feedback have you received? \n  - ${details.answer3}`
		: "";
}

function refreshCalendly() {
	const data = JSON.parse(localStorage.getItem("data"));

	// remove stale calendar
	calendlyContainer.innerHTML = "";

	// create new calendar container
	const newCalendlyCalendar = document.createElement("div");
	newCalendlyCalendar.id = "calendly-embed-element";
	calendlyContainer.appendChild(newCalendlyCalendar);

	// initialize fresh calendar widget with prefilled fields and updated theme
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
