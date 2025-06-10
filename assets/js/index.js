// Page
const page = document.querySelector("#page");

// Header
const header = document.querySelector(".wide-header");
const headerLogo = document.querySelector(".header-logo");
const logo = document.querySelector(".logo");
const headerWidget = document.querySelector("#header");
const headerLink = document.querySelector(".header-link");
const headerIcon = document.querySelector(".img");
const content = document.querySelector(".content");
const nav = document.querySelector(".nav");
const headerText = document.querySelector(".header-text");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const bannerLinks = document.querySelectorAll(".banner-link");
const globe = document.querySelector(".fa-globe");
const bulb = document.querySelector(".fa-lightbulb");
const headset = document.querySelector(".fa-headset");

// Mobile
const mobileHeader = document.querySelector(".mobile-header");
const mobileHeaderText = document.querySelector(".mobile-header-text");
const mobileNavMenu = document.querySelector(".mobile-menu");
const mobileLogo = document.querySelector(".mobile-logo");
const burgerBtn = document.querySelector(".mobile-toggle-open");
const mobileMenuCloseBtn = document.querySelector(".mobile-toggle-close");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavBottom = document.querySelector(".bottom");
const mobileNavLink = document.querySelectorAll(".mobile-nav-link");
const mobileNavBottomLink = document.querySelector(".mobile-bottom-link");
const mobileBtn = document.querySelector(".btn");
const dropdownBtn = document.querySelector(".menu-btn");

// Footer
const footerText = document.querySelectorAll(".copyright");

// Text
const anchorLink = document.querySelectorAll(".anchor-link");
const cardBottomLink = document.querySelectorAll(".bold-link");
const bold = document.querySelectorAll(".bold");

// Theme
const toggleBtns = document.querySelectorAll(".theme");
const darkThemeBtn = document.querySelectorAll(".dark");
const redThemeBtn = document.querySelectorAll(".red");
const blueThemeBtn = document.querySelectorAll(".blue");
const lightThemeBtn = document.querySelectorAll(".light");
const purpleThemeBtn = document.querySelectorAll(".purple");

// Cards
const cards = document.querySelectorAll("article");
const cardLogos = document.querySelectorAll(".card-logo");
const heroSections = document.querySelectorAll(".hero");
const heroBtn = document.querySelectorAll(".hero-btn");
const secondaryHeroBtn = document.querySelectorAll(".hero-btn-secondary");
const cardHeadings = document.querySelectorAll(".major");
const cardSubHeadings = document.querySelectorAll(".heading-small");
const hrUpperElements = document.querySelectorAll(".upper");
const cardListTitle = document.querySelector(".list-title");
const resetBtns = document.querySelectorAll(".reset");
const submitBtns = document.querySelectorAll(".primary");
const restartBtnBorder = document.querySelector(".restart");

// Accordian
const accordian = document.querySelectorAll(".accordian");
const toggle = document.querySelectorAll(".toggle");
const accordianBody = document.querySelectorAll(".accordian-body");
const accordianTitle = document.querySelectorAll(".heading");
const badges = document.querySelectorAll(".badge");
const imgContainer = document.querySelectorAll(".img-container");
const list = document.querySelectorAll(".accordian-list");
const listTitle = document.querySelectorAll(".list-title");
const liElements = document.querySelectorAll(".list-item");
const accordianLink = document.querySelectorAll(".link");
const ctaBtn = document.querySelectorAll(".anchor");

// Modal
const modalHeaderBg = document.querySelector(".modal-heading");
// const modalSaveBtnBg = document.querySelector(".modal-save");

const color = {
	light: {
		purple: "rgb(160, 135, 199)",
		blue: "rgb(118, 155, 210)",
		red: "rgb(255, 145, 145)",
		light: "rgb(223, 73, 73)",
		dark: "rgb(223, 73, 73)",
	},

	dark: {
		purple: "rgb(76, 50, 116)",
		blue: "rgb(35, 64, 107)",
		red: "rgb(116, 13, 13)",
		light: "rgb(223, 73, 73)",
		dark: "rgb(192, 55, 55)",
	},

	darker: {
		purple: "rgb(68, 44, 106)",
		blue: "rgb(27, 52, 88)",
		red: "rgb(96, 11, 11)",
		light: "rgb(192, 55, 55)",
		dark: "rgb(160, 48, 48)",
	},
};

// ON PAGE LOAD
// Get theme from local storage
const theme = localStorage.getItem("theme");

// Get theme from local storage, dark by default
getSavedTheme(theme);
toggleMobileView();

function toggleMobileView() {
	if (window.innerWidth > 480) {
		mobileHeader.classList.add("hidden");
	} else {
		mobileHeader.classList.remove("hidden");
	}
}

const bannerIcons = [globe, bulb, headset];

bannerLinks.forEach((link, i) => {
	link.addEventListener("mouseover", () => {
		bannerIcons[i].classList.add("hover");
	});

	link.addEventListener("mouseout", () => {
		bannerIcons[i].classList.remove("hover");
	});
});

const mobileToggleBtns = [burgerBtn, mobileMenuCloseBtn];
const mobileMenuLinks = [
	...mobileNavLink,
	mobileBtn,
	mobileLogo,
	mobileNavBottomLink,
];

mobileToggleBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (mobileHeader.classList.contains("open")) {
			closeMobileNav();
		} else {
			openMobileNav();
		}
	});
});

mobileMenuLinks.forEach((link) => {
	link.addEventListener("click", () => {
		if (mobileHeader.classList.contains("open")) {
			closeMobileNav();
		}
	});

	mobileMenuLinks.forEach((link) => {
		if (link !== mobileLogo) {
			link.classList.add("hidden");
		}
	});

	mobileNavBottom.classList.add("hidden");
	mobileNav.classList.add("hidden");
	mobileNavMenu.classList.add("hidden");
});

function openMobileNav() {
	const theme = localStorage.getItem("theme");

	mobileNav.classList.remove("hidden");
	mobileNavBottom.classList.remove("hidden");
	mobileHeader.classList = `mobile-header ${theme} open`;
	mobileNavMenu.classList = `mobile-menu ${theme} slide`;
	burgerBtn.classList.add("hidden");
	mobileMenuCloseBtn.classList.remove("hidden");
	mobileNavMenu.classList.remove("hidden");
	mobileMenuLinks.forEach((el) => {
		el.classList.remove("hidden");
	});
}

function closeMobileNav() {
	const theme = localStorage.getItem("theme");

	mobileHeader.classList.remove("open");
	mobileNavMenu.classList = `mobile-menu ${theme} unslide`;
	burgerBtn.classList.remove("hidden");
	mobileMenuCloseBtn.classList.add("hidden");
	setTimeout(() => {
		mobileNavMenu.classList.add("hidden");
		mobileNav.classList.add("hidden");
		mobileNavBottom.classList.add("hidden");
		mobileMenuLinks.forEach((el) => {
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
	btn.addEventListener("click", () => {
		toggleTheme(btn.classList[1]);
	});
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
		resetBtns.forEach((btn) => {
			btn.classList.add("light");
		});
		restartBtnBorder.classList.add("light");
	} else {
		switchForeground("white");
		resetBtns.forEach((btn) => {
			btn.classList.remove("light");
		});
		restartBtnBorder.classList.remove("light");
	}

	header.classList = `wide-header ${theme}`;
	mobileHeader.classList = `mobile-header ${theme}`;
	mobileNavMenu.classList = `mobile-menu ${theme} hidden`;
}

// Logo images
function switchLogoImg(theme) {
	if (theme === "light") {
		headerLogo.src =
			"https://res.cloudinary.com/drgczkoux/image/upload/v1746750322/default-monochrome-dark_b2eget.svg";
	} else {
		headerLogo.src =
			"https://res.cloudinary.com/drgczkoux/image/upload/v1746750322/default-monochrome_ihvfx0.svg";
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
	themeSwitchers.forEach((btnGroup) => {
		btnGroup.forEach((btn) => {
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
	// switchBorderColor(color);

	// change header color
	if (color === "white") {
		heroSections.forEach((section) => {
			section.classList.remove("light");
		});
	} else {
		heroSections.forEach((section) => {
			section.classList.add("light");
		});
	}

	// change text color (header, card, footer)
	header.style.color = color;
	burgerBtn.style.color = color;
	mobileHeader.classList = `mobile-header ${theme}`;
	mobileNavMenu.classList = `mobile-menu ${theme}`;

	cards.forEach((card) => {
		card.style.color = color;
	});

	if (theme === "light") {
		resetBtns.forEach((btn) => {
			btn.style.borderColor = "rgb(39, 39, 39)";
		});
	} else {
		resetBtns.forEach((btn) => {
			btn.classList.remove("light");
		});
	}

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
		list.forEach((list) => {
			list.classList.add("hidden");
		});
	});
}

// Foreground (Cards)
function switchCardForeground(theme) {
	// card headings
	cardHeadings.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.textDecorationColor = color.light[theme];
		}
	});

	cardSubHeadings.forEach((el) => {
		if (!el.classList.contains("top")) {
			if (theme === "light" || theme === "dark") {
				el.removeAttribute("style");
			} else {
				el.style.color = color.light[theme];
			}
		}
	});

	badges.forEach((el, i) => {
		el.style.backgroundColor = "transparent";
	});

	const btnsToChange = [...submitBtns, mobileBtn, ...heroBtn];

	if (theme === "light") {
		modalHeaderBg.removeAttribute("style");
		btnsToChange.forEach((btn) => {
			btn.style.backgroundColor = "rgb(223, 73, 73)";
			btn.style.boxShadow = `0 0 0 1px ${color.dark[theme]}`;
		});
		secondaryHeroBtn.forEach((btn) => {
			btn.classList.add("light");
		});
	} else if (theme === "dark") {
		modalHeaderBg.removeAttribute("style");
		btnsToChange.forEach((btn) => {
			btn.style.backgroundColor = "rgb(192, 55, 55)";
			btn.style.boxShadow = `0 0 0 1px ${color.dark[theme]}`;
		});
		secondaryHeroBtn.forEach((btn) => {
			btn.classList.remove("light");
		});
	} else {
		btnsToChange.forEach((btn) => {
			btn.style.backgroundColor = color.dark[theme];
			btn.style.boxShadow = `0 0 0 1px ${color.dark[theme]}`;
		});
		secondaryHeroBtn.forEach((btn) => {
			btn.classList.remove("light");
		});
	}

	btnsToChange.forEach((btn) => {
		btn.addEventListener("mouseover", () => {
			btn.style.backgroundColor = color.darker[theme];
			btn.style.boxShadow = `0 0 0 1px ${color.darker[theme]}`;
		});
	});

	btnsToChange.forEach((btn) => {
		btn.addEventListener("mouseout", () => {
			btn.style.backgroundColor = color.dark[theme];
			btn.style.boxShadow = `0 0 0 1px ${color.dark[theme]}`;
		});
	});

	btnsToChange.forEach((btn) => {
		btn.addEventListener("focus", () => {
			if (btn === modalSaveBtnBg) {
				btn.style.backgroundColor = "rgba(125, 125, 125, 0.1)";
				btn.style.boxShadow = `0 0 0 3px ${color.dark[theme]}`;
			}
		});
	});

	btnsToChange.forEach((btn) => {
		btn.addEventListener("blur", () => {
			if (btn === modalSaveBtnBg) {
				btn.style.backgroundColor = color.dark[theme];
				btn.style.boxShadow = `0 0 0 1px ${color.dark[theme]}`;
			}
		});
	});

	anchorLink.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.color = color.light[theme];
		}
	});

	bold.forEach((el) => {
		if (theme === "light" || theme === "dark") {
			el.removeAttribute("style");
		} else {
			el.style.color = color.light[theme];
		}
	});

	listTitle.forEach((el) => {
		if (!theme === "light" && !theme === "dark") {
			el.style.color = color.light[theme];
		} else {
			el.style.textDecorationColor = color.light[theme];
		}
	});

	cardBottomLink.forEach((el) => {
		if (el !== dropdownBtn) {
			el.addEventListener("mouseover", () => {
				el.removeAttribute("style");
				el.style.color = color.light[theme];

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
}

// ACCORDIAN
function openAccordian(index) {
	let currentTheme = localStorage.getItem("theme");
	toggle[index].classList.add("hidden");
	accordianTitle[index].removeAttribute("style");
	toggle[index].setAttribute("style", "transform: rotate(45deg)");
	accordian[index].classList.add("open");
	accordian[index].classList.add(currentTheme);
	if (index === 7) {
		list.forEach((list, i) => {
			list.classList.remove("hidden");
		});

		accordianLink.forEach((link, i) => {
			if (i === 1) {
				link.classList.remove("hidden");
			}
		});
	}

	if (index === 8) {
		list.forEach((list, i) => {
			if (i === 2) {
				list.classList.remove("hidden");
			}

			accordianLink.forEach((link, i) => {
				if (i === 2) {
					link.classList.remove("hidden");
				}
			});
		});
	}

	if (currentTheme === "light") {
		badges[index].style.backgroundColor = "rgb(223, 73, 73)";
	} else if (theme === "dark") {
		badges[index].style.backgroundColor = "rgb(192, 55, 55)";
	} else {
		badges[index].style.backgroundColor = color.dark[currentTheme];
	}

	badges[index].classList.add("show");

	setTimeout(() => {
		badges[index].classList.remove("hidden");
		toggle[index].classList.remove("hidden");
	}, 290);
}

function closeAccordian(index) {
	badges[index].classList.add("hidden");
	accordianTitle[index].removeAttribute("style");
	toggle[index].removeAttribute("style");
	toggle[index].classList.remove("hidden");
	accordian[index].classList.remove("open");
	badges[index].classList.remove("show");
	badges[index].style.backgroundColor = "transparent";

	accordian[index].classList.remove(theme);
	list.forEach((list) => {
		list.classList.add("hidden");
	});
}
