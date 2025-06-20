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

// capture prefill data from local storage
const data = JSON.parse(localStorage.getItem("data"));
const setSummaryText = (details) => {
	return details
		? `What is the top priority for your business right now? \n  - ${details.answer1} \n\nWhat are the most frustrating tasks for you or your employees? \n  - ${details.answer2} \n\nWhat negative customer feedback have you received? \n  - ${details.answer3}`
		: "";
};

// Check for theme change and update calendar primary color
const wrapperTheme = document.querySelector("#wrapper");

const observer = new MutationObserver(function (mutationsList, observer) {
	for (const mutation of mutationsList) {
		if (mutation.type === "attributes" && mutation.attributeName === "class") {
			// clear calendar container
			calendlyContainer.innerHTML = "";

			// create new calendar container
			const newCalendlyCalendar = document.createElement("div");
			newCalendlyCalendar.id = "calendly-embed-element";
			calendlyContainer.appendChild(newCalendlyCalendar);

			// initialize new widget with prefilled fields and updated theme
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
	}
});

// call mutation observer
observer.observe(wrapperTheme, {
	attributes: true,
	attributeFilter: ["class"],
});
