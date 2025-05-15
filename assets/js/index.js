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
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

// Mobile
const mobileHeader = document.querySelector(".mobile-header");
const mobileHeaderText = document.querySelector(".mobile-header-text");
const mobileNavMenu = document.querySelector(".mobile-menu");
const mobileLogo = document.querySelector(".mobile-logo");
const mobileMenuOpen = document.querySelector(".mobile-toggle-open");
const mobileMenuClose = document.querySelector(".mobile-toggle-close");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavBottom = document.querySelector(".bottom");
const mobileNavLink = document.querySelectorAll(".mobile-nav-link");
const mobileNavBottomLink = document.querySelector(".mobile-bottom-link");
const mobileBtn = document.querySelector(".btn");
const dropdownBtn = document.querySelector(".menu-btn");

// Footer
const footerText = document.querySelectorAll(".copyright");

// Text
const major = document.querySelectorAll(".major");
const pageSection = document.querySelectorAll(".heading-small");
const anchorLink = document.querySelectorAll(".anchor-link");
const cardBottomLink = document.querySelectorAll(".bold-link");
const bold = document.querySelectorAll(".bold");

// Theme
const themeTitle = document.querySelector(".theme-title");
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
const hrUpperElements = document.querySelectorAll(".upper");
const q = document.querySelectorAll(".card-icon");
const cardCloseLink = document.querySelector(".close");
const cardListTitle = document.querySelector(".list-title");

// Accordian
const accordian = document.querySelectorAll(".accordian");
const toggle = document.querySelectorAll(".toggle");
const accordianBody = document.querySelectorAll(".accordian-body");
const accordianTitle = document.querySelectorAll(".heading");
const stepNumber = document.querySelectorAll(".step");
const imgContainer = document.querySelectorAll(".img-container");
const list = document.querySelector(".accordian-list");

// ON PAGE LOAD
// Get theme from local storage
let theme = localStorage.getItem("theme");

// Get theme from local storage, dark by default
getSavedTheme(theme);
toggleMobileView();

function toggleMobileView() {
	if (window.innerWidth > 480) {
		mobileHeader.classList.add("hidden");
		hrUpperElements.forEach((hr) => {
			hr.classList.remove("hidden");
		});
		q.forEach((icon) => {
			icon.classList.remove("hidden");
		});

		cardLogos.forEach((logo) => {
			if (!logo.classList.contains("lower")) {
				logo.classList.remove("hidden");
			}
		});
	} else {
		mobileHeader.classList.remove("hidden");

		hrUpperElements.forEach((hr) => {
			hr.classList.add("hidden");
		});
		q.forEach((icon) => {
			icon.classList.add("hidden");
		});

		cardLogos.forEach((logo) => {
			if (!logo.classList.contains("lower")) {
				logo.classList.add("hidden");
			}
		});
	}
}

let e = [mobileMenuOpen, mobileMenuClose];
let f = [...mobileNavLink, mobileBtn, mobileLogo, mobileNavBottomLink];

e.forEach((el) => {
	el.addEventListener("click", () => {
		if (mobileHeader.classList.contains("open")) {
			closeMobileNav();
		} else {
			openMobileNav();
		}
	});
});

f.forEach((el) => {
	el.addEventListener("click", () => {
		if (mobileHeader.classList.contains("open")) {
			closeMobileNav();
		}
	});

	f.forEach((el) => {
		if (el !== mobileLogo) {
			el.classList.add("hidden");
		}
	});

	mobileNavBottom.classList.add("hidden");
	mobileNav.classList.add("hidden");
	mobileNavMenu.classList.add("hidden");
});

function openMobileNav() {
	let theme = localStorage.getItem("theme");

	mobileNav.classList.remove("hidden");
	mobileNavBottom.classList.remove("hidden");
	mobileHeader.classList = `mobile-header ${theme} open`;
	mobileNavMenu.classList = `mobile-menu ${theme} slide`;
	mobileMenuOpen.classList.add("hidden");
	mobileMenuClose.classList.remove("hidden");
	mobileNavMenu.classList.remove("hidden");
	f.forEach((el) => {
		el.classList.remove("hidden");
	});
}

function closeMobileNav() {
	let theme = localStorage.getItem("theme");

	mobileHeader.classList.remove("open");
	mobileNavMenu.classList = `mobile-menu ${theme} unslide`;
	mobileMenuOpen.classList.remove("hidden");
	mobileMenuClose.classList.add("hidden");
	setTimeout(() => {
		mobileNavMenu.classList.add("hidden");
		mobileNav.classList.add("hidden");
		mobileNavBottom.classList.add("hidden");
		f.forEach((el) => {
			if (el !== mobileLogo) {
				el.classList.add("hidden");
			}
		});
	}, 150);
}

function getSavedTheme(theme) {
	setHeaderText();
	if (!theme || theme === "null") {
		toggleTheme("light");
	} else {
		toggleTheme(theme);
	}
}

// Change theme on user action
toggleBtns.forEach((btn) => {
	btn.addEventListener("click", () => toggleTheme(btn.classList[1]));
});

// Change header text based on device
window.addEventListener("resize", () => {
	setHeaderText();
	toggleMobileView();
});

// Close accordian on hash change
window.addEventListener("hashchange", () => {
	accordian.forEach((bar, i) => {
		if (bar.classList.contains("open")) {
			closeAccordian(i);
		}
	});
});

// Accordian toggle
accordian.forEach((bar, i) => {
	bar.addEventListener("click", () => {
		if (!bar.classList.contains("open")) {
			openAccordian(i);
		} else {
			closeAccordian(i);
		}
	});
});

/*-------------------------------------------------------*/
/*                        CONFIG						 */
/*-------------------------------------------------------*/

// THEME
function toggleTheme(theme) {
	page.classList = theme;
	switchLogoImg(theme);
	switchCardForeground(theme);
	setActiveThemeBtn(theme);
	setAccordianStyle(theme);
	localStorage.setItem("theme", theme);

	if (theme === "light") {
		switchForeground("black");
	} else {
		switchForeground("white");
	}

	mobileHeader.classList = `mobile-header ${theme}`;
	mobileNavMenu.classList = `mobile-menu ${theme} hidden`;
}

// Logo images
function switchLogoImg(theme) {
	if (theme === "light") {
		headerLogo.src =
			"https://res.cloudinary.com/drgczkoux/image/upload/v1746750322/default-monochrome-dark_b2eget.svg";
		headerIcon.src =
			"https://res.cloudinary.com/drgczkoux/image/upload/v1746752445/7ONE-icon-b-b_c5ly6l.svg";
	} else {
		headerLogo.src =
			"https://res.cloudinary.com/drgczkoux/image/upload/v1746750322/default-monochrome_ihvfx0.svg";
		headerIcon.src =
			"https://res.cloudinary.com/drgczkoux/image/upload/v1746752445/7ONE-icon-w-w_yvkocg.svg";
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
	mobileMenuOpen.style.color = color;
	mobileHeader.classList = `mobile-header ${theme}`;
	mobileNavMenu.classList = `mobile-menu ${theme}`;

	cards.forEach((card) => {
		card.style.color = color;
	});

	cardCloseLink.removeAttribute("style");

	themeTitle.style.color = color;

	footerText.forEach((word) => {
		word.style.color = color;
	});

	cardLogos.forEach((logo) => {
		if (color === "white") {
			logo.src =
				"https://res.cloudinary.com/drgczkoux/image/upload/v1746750322/default-monochrome_ihvfx0.svg";
		} else {
			logo.src =
				"https://res.cloudinary.com/drgczkoux/image/upload/v1746750322/default-monochrome-dark_b2eget.svg";
		}
	});
}

function setAccordianStyle(theme) {
	accordian.forEach((bar, index) => {
		if (theme === "light") {
			bar.classList = "accordian lt";
		} else {
			bar.classList = "accordian dk";
		}

		toggle[index].removeAttribute("style");
		stepNumber[index].classList.add("hidden");
		list.classList.add("hidden");
	});
}

// Foreground (Cards)
function switchCardForeground(theme) {
	const currentColor = {
		purple: "rgb(160, 135, 199)",
		blue: "rgb(118, 155, 210)",
		red: "rgb(255, 145, 145)",
		white: "rgb(255, 255, 255)",
	};

	// card headings
	major.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.textDecorationColor = currentColor[theme];
		}
	});

	pageSection.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.color = currentColor[theme];
		}
	});

	anchorLink.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.color = currentColor[theme];
		}
	});

	cardBottomLink.forEach((el) => {
		if (el !== dropdownBtn) {
			el.addEventListener("mouseover", () => {
				el.removeAttribute("style");
				el.style.color = currentColor[theme];

				if (theme === "light") {
					el.classList.remove("dark");
					el.classList.add("light");
				} else {
					el.classList.remove("light");
					el.classList.add("dark");
				}
			});

			el.addEventListener("mouseout", () => {
				el.removeAttribute("style");
			});

			el.addEventListener("click", () => {
				el.removeAttribute("style");
			});
		}
	});

	// bold text in consultation card
	bold.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.color = currentColor[theme];
		}
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
function openAccordian(index) {
	toggle[index].classList.add("hidden");
	accordianTitle[index].removeAttribute("style");
	toggle[index].setAttribute("style", "transform: rotate(45deg)");
	accordian[index].classList.add("open");
	setTimeout(() => {
		toggle[index].classList.remove("hidden");
		stepNumber[index].classList.remove("hidden");
		if (index === 7) {
			list.classList.remove("hidden");
		}
	}, 300);
}

function closeAccordian(index) {
	accordianTitle[index].removeAttribute("style");
	toggle[index].removeAttribute("style");
	toggle[index].classList.remove("hidden");
	accordian[index].classList.remove("open");
	stepNumber[index].classList.add("hidden");
	list.classList.add("hidden");
}
