// Page
const page = document.querySelector("#page");

// Header
const headerLogo = document.querySelector(".header-logo");
const logo = document.querySelector(".logo");
const header = document.querySelector("#header");
const headerLink = document.querySelector(".header-link");
const headerIcon = document.querySelector(".img");
const content = document.querySelector(".content");
const nav = document.querySelector(".nav");
const headerText = document.querySelector(".header-text");
const mobileHeaderText = document.querySelector(".mobile-header-text");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

// Footer
const footerText = document.querySelector(".copyright");

// Text
const major = document.querySelectorAll(".major");
const anchorLink = document.querySelectorAll(".anchor");
const cardBottomLink = document.querySelectorAll(".bold-link");
const bold = document.querySelectorAll(".bold");

// Theme
const themeTitles = document.querySelectorAll(".theme-title");
const themeContainer = document.querySelectorAll(".theme-container");
const toggleBtns = document.querySelectorAll(".theme");
const darkThemeBtn = document.querySelectorAll(".dark");
const redThemeBtn = document.querySelectorAll(".red");
const blueThemeBtn = document.querySelectorAll(".blue");
const lightThemeBtn = document.querySelectorAll(".light");
const purpleThemeBtn = document.querySelectorAll(".purple");

// Cards
const cards = document.querySelectorAll("article");
const cardIcons = document.querySelectorAll(".card-icon");
const cardLogos = document.querySelectorAll(".card-logo");
const hrElements = document.querySelectorAll("hr");

// Accordian
const accordian = document.querySelectorAll(".accordian");
const toggle = document.querySelectorAll(".toggle");
const toggleClose = document.querySelectorAll(".toggle-close");
const accordianBody = document.querySelectorAll(".accordian-body");
const accordianTitle = document.querySelectorAll(".heading");
const stepNumber = document.querySelectorAll(".step");
const imgContainer = document.querySelectorAll(".img-container");
const list = document.querySelector(".list");

// ON PAGE LOAD
// Get theme from local storage
let theme = localStorage.getItem("theme");

// Get theme from local storage, dark by default
getSavedTheme(theme);

function getSavedTheme(theme) {
	if (!theme || theme === "null") {
		toggleTheme("dark");
	} else {
		toggleTheme(theme);
	}
}

// Change theme on user action
toggleBtns.forEach((btn) => {
	btn.addEventListener("click", () => toggleTheme(btn.classList[1]));
});

// Change header text based on device
window.addEventListener("resize", setHeaderText);
window.addEventListener(
	"hashchange",
	accordian.forEach((bar, i) => {
		bar.classList.remove("open");
	})
);

// Accordian
accordian.forEach((bar, i) => {
	bar.addEventListener("click", () => {
		let theme = localStorage.getItem("theme");

		if (!bar.classList.contains("open")) {
			openAccordian(theme, i);
		} else {
			closeAccordian(theme, i);
		}
	});
});

function resetAccordian(theme) {
	accordian.forEach((bar, index) => {
		if (theme === "light") {
			bar.classList = "accordian lt";
		} else {
			bar.classList = "accordian dk";
		}
		toggle[index].removeAttribute("style");
		stepNumber[index].classList.add("hidden");
	});
}

/*-------------------------------------------------------*/
/*                        CONFIG						 */
/*-------------------------------------------------------*/

// THEME
function toggleTheme(theme) {
	if (theme === "dark") {
		page.classList = "dark";
		switchLogoImg(theme);
		switchForeground("white");
		switchCardForeground(theme);
		setActiveThemeBtn(theme);
		resetAccordian(theme);
		localStorage.setItem("theme", theme);
	}

	if (theme === "red") {
		page.classList = "red";
		switchLogoImg(theme);
		switchForeground("white");
		switchCardForeground(theme);
		setActiveThemeBtn(theme);
		resetAccordian(theme);
		localStorage.setItem("theme", "red");
	}

	if (theme === "blue") {
		page.classList = "blue";
		switchLogoImg(theme);
		switchForeground("white");
		switchCardForeground(theme);
		setActiveThemeBtn(theme);
		resetAccordian(theme);
		localStorage.setItem("theme", "blue");
	}

	if (theme === "purple") {
		page.classList = "purple";
		switchLogoImg(theme);
		switchForeground("white");
		switchCardForeground(theme);
		setActiveThemeBtn(theme);
		resetAccordian(theme);
		localStorage.setItem("theme", "purple");
	}

	if (theme === "light") {
		page.classList = "light";
		switchLogoImg(theme);
		switchForeground("black");
		switchCardForeground(theme);
		setActiveThemeBtn(theme);
		resetAccordian(theme);
		localStorage.setItem("theme", "light");
	}
}

// Theme Container (Card & Footer)
function switchThemeContainer(foregroundColor) {
	themeContainer.forEach((container) => {
		container.style.borderColor = "transparent";

		container.addEventListener("mouseout", () => {
			container.style.borderColor = "transparent";
		});
		themeTitles.forEach((title) => {
			title.style.color = foregroundColor;
		});
		container.style.backgroundColor = "rgba(45, 45, 45, 0.2)";
	});
}

// Logo images
function switchLogoImg(theme) {
	if (theme === "light") {
		headerLogo.src = "default-monochrome-dark.svg";
		headerIcon.src = "7ONE-icon-b-b.svg";
	} else {
		headerLogo.src = "default-monochrome.svg";
		headerIcon.src = "7ONE-icon-w-w.svg";
	}
}

// Header Text
function setHeaderText() {
	if (window.innerWidth < 480) {
		mobileHeaderText.classList.remove("hidden");
		headerText.classList.add("hidden");
	} else {
		headerText.classList.remove("hidden");
		mobileHeaderText.classList.add("hidden");
	}
}

// Theme buttons
function setActiveThemeBtn(theme) {
	const themeSwitchers = [
		darkThemeBtn,
		redThemeBtn,
		blueThemeBtn,
		lightThemeBtn,
		purpleThemeBtn,
	];
	// change color for borders
	themeSwitchers.forEach((btns) => {
		btns.forEach((btn) => {
			if (btn.classList.contains(theme)) {
				btn.classList.add("active");
			} else {
				btn.classList.remove("active");
			}
		});
	});
}

// Foreground (Header)
function switchForeground(color) {
	switchThemeContainer(color);
	switchBorderColor(color);

	// change header color
	if (color === "white") {
		headerLink.classList.add("dark");
		headerLink.classList.remove("light");
	} else {
		headerLink.classList.add("light");
		headerLink.classList.remove("dark");
	}

	// change text color (header, card, footer)
	header.style.color = color;

	cards.forEach((card) => {
		card.style.color = color;
	});

	hrElements.forEach((el) => {
		el.style.border = `1px solid ${color}`;
	});

	footerText.style.color = color;

	// change icon/logo color
	cardIcons.forEach((icon) => {
		if (color === "white") {
			icon.src = "7ONE-icon-white.svg";
		} else {
			icon.src = "7ONE-icon-black.svg";
		}
	});

	cardLogos.forEach((logo) => {
		if (color === "white") {
			logo.src = "default-monochrome.svg";
		} else {
			logo.src = "default-monochrome-dark.svg";
		}
	});
}

// Foreground (Cards)
function switchCardForeground(theme) {
	const currentColor = {
		base: {
			purple: "rgb(160, 135, 199)",
			blue: "rgb(76, 111, 164)",
			red: "rgb(142, 29, 29)",
			white: "rgb(255, 255, 255)",
			anchor: "rgb(223, 73, 73)",
		},

		hover: {
			purple: "rgb(137, 109, 182)",
			blue: "rgb(118, 151, 201)",
			red: "rgb(177, 47, 47)",
			white: "rgb(255, 255, 255)",
		},
	};

	// card headings
	major.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.borderBottom = `2px solid ${currentColor.base[theme]}`;
		}
	});

	cardBottomLink.forEach((el) => {
		el.addEventListener("mouseover", () => {
			el.removeAttribute("style");
			el.style.color = currentColor.base[theme];

			if (theme === "light") {
				el.style.borderBottom = `2px solid black`;
				el.style.borderTop = `2px solid black`;
			} else {
				el.style.borderBottom = `2px solid ${currentColor.base.white}`;
				el.style.borderTop = `2px solid ${currentColor.base.white}`;
			}
		});

		el.addEventListener("mouseout", () => {
			el.removeAttribute("style");
		});
	});

	// bold text in consultation card
	bold.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.color = currentColor.hover[theme];
		}
	});

	// question link
	const faqIcon = document.querySelectorAll(".fa-circle-question");
	faqIcon.forEach((el) => {
		el.addEventListener("mouseover", () => {
			if (theme === "light" || theme === "dark") {
				el.removeAttribute("style");
			} else {
				el.style.color = currentColor.base[theme];
			}
		});
		el.addEventListener("mouseout", () => {
			el.removeAttribute("style");
		});
	});
}

// Borders (Header)
function switchBorderColor(foregroundColor) {
	const headerElements = [logo, content, nav, navMenu];

	// push all link elements to array
	navLink.forEach((link) => {
		headerElements.push(link);
	});

	headerElements.forEach((el) => {
		el.style.borderColor = foregroundColor;
	});

	// change color for connected lines (:before)
	if (foregroundColor === "black") {
		nav.classList.add("before");
		content.classList.add("before");
	}

	if (foregroundColor === "white") {
		nav.classList.remove("before");
		content.classList.remove("before");
	}
}

// ACCORDIAN
function openAccordian(theme, index) {
	toggle[index].classList.add("hidden");
	accordianTitle[index].removeAttribute("style");
	toggle[index].setAttribute("style", "transform: rotate(45deg)");
	accordian[index].classList.add("open");
	accordian[index].classList.add(theme);
	setTimeout(() => {
		list.classList.remove("hidden");
		toggle[index].classList.remove("hidden");
		stepNumber[index].classList.remove("hidden");
	}, 300);
}

function closeAccordian(theme, index) {
	toggle[index].classList.add("hidden");
	toggle[index].removeAttribute("style");
	accordian[index].classList.remove("open");
	accordian[index].classList.remove(theme);
	stepNumber[index].classList.add("hidden");
	setTimeout(() => {
		list.classList.add("hidden");
		toggle[index].classList.remove("hidden");
		accordianTitle[index].removeAttribute("style");
	}, 450);
}
