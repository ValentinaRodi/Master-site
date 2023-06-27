//Input radio

const rangeInputs = document.querySelectorAll('input[type="range"]');

function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

// Select
const selectSingle = document.querySelector(".__select");
const selectSingleTitle = selectSingle.querySelector(".__select__title");
const selectSingleLabels = selectSingle.querySelectorAll(".__select__label");
const selectSingleContent = selectSingle.querySelector(".__select__content");
const selectSingleVector = selectSingle.querySelector(".select__vector");
const selectSingleText = selectSingle.querySelector(".select__title_span");

selectSingleTitle.addEventListener("click", () => {
  if ("active" === selectSingle.getAttribute("data-state")) {
    selectSingle.setAttribute("data-state", "");
    selectSingleVector.classList.add("vector-rotate");
    selectSingleContent.classList.add("select__content_none");
  } else {
    selectSingle.setAttribute("data-state", "active");
    selectSingleVector.classList.remove("vector-rotate");

    selectSingleContent.classList.remove("select__content_none");
  }
});

// Close when click to option
for (let i = 0; i < selectSingleLabels.length; i++) {
  selectSingleLabels[i].addEventListener("click", (evt) => {
    selectSingleText.textContent = evt.target.textContent;
    selectSingle.setAttribute("data-state", "");
    selectSingleVector.classList.add("vector-rotate");
    selectSingleContent.classList.add("select__content_none");
  });
}

//Popup
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__btn");
const popupOpenBtn = document.querySelector(".btn__popup_on");
const userTell = document.querySelector(".popup__input-tell");
const regexp = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;

popupOpenBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.remove("popup_none");
});

popupClose.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("popup_none");
});

function handlerOpenPopup() {
  popup.classList.remove("popup_none");
}

function closePopup() {
  popup.classList.add("popup_none");
}

function serializeFormTake() {
  handlerOpenPopup();
  serializeForm(applicantForm);

  const feedbackInput = document.getElementById("feedback");

  value = "";

  data.forEach((item) => {
    for (let key in item) {
      value += item[key] + ":";
    }

    value = value.slice(0, -1) + ", ";
  });
  feedbackInput.value = value.slice(0, -2);
}

function saveValueInput() {
  const callInput = document.querySelector(".call__input");
  const popupInputTell = document.querySelector(".popup__input-tell");
  
  !regexp.test(callInput.value) ? userTell.classList.add("error") : popupInputTell.value = callInput.value;
}

// Form submit

const applicantForm = document.getElementById("priceForm");
const feedbackForm = document.getElementById("feedbackForm");

let data = [];

function serializeForm(formNode) {
  const { elements } = formNode;

  const dataForm = Array.from(elements)
    .map((element) => {
      const { name, type } = element;
      let value = "";
      (type === "checkbox" && name === "materialRough") ||
      name === "materialClean" ||
      name === "materialDesign"
        ? (value = element.checked)
        : (value = element.value);
      if (
        (type === "radio" && name === "flat") ||
        name === "room" ||
        name === "singleSelect"
      ) {
        element.checked === true ? (value = element.value) : (value = false);
      }

      return { name, value };
    })
    .filter((item) => !!item.name && !!item.value);

    data = dataForm.concat(data);
}

async function sendData(data) {
  return await fetch("url", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });
}

async function handleFormSubmit(error) {
  serializeForm(feedbackForm);

  const feedbackInput = document.getElementById("feedback");

  value = "";

  data.forEach((item) => {
    for (let key in item) {
      value += item[key] + ":";
    }

    value = value.slice(0, -1) + ", ";
  });

  const userName = document.querySelector(".popup__input-name");

  if (userName.value === "") {
    userName.classList.add("error");
  } else if(userTell.value === "" && !regexp.test(userTell.value)) {
    userName.classList.remove("error");
    userTell.classList.add("error");
  } else {
    feedbackInput.value = value.slice(0, -2);
    closePopup();

    console.log(data);

    const response = await sendData(data);
    const { status } = await sendData(data);

    status === 200 ? onSuccess(e.target) : onError(error);
  }
}

async function handleFormSubmit2(e) {
  serializeForm(feedbackForm2);

  const data = serializeForm(feedbackForm2);
  const feedbackInput = document.getElementById("feedback2");

  value = "";

  data.forEach((item) => {
    for (let key in item) {
      value += item[key] + ":";
    }

    value = value.slice(0, -1) + ", ";
  });

  feedbackInput.value = value.slice(0, -2);

  console.log(data);
  const response = await sendData(data);
  const { status } = await sendData(data);

  status === 200 ? onSuccess(e.target) : onError(error);

closePopup2();
}

function onSuccess(formNode) {
  console.log("Ваша заявка отправлена!");
}

function onError(error) {
  
}

/* Burger */

const burgerBtn = document.querySelector(".btn__burger");
const burgerNavbar = document.querySelector(".header__navbar");
const burgerImgClose = document.querySelector(".img-burger_close");
const burgerImgOpen = document.querySelector(".img-burger_open");
const overlay = document.querySelector(".overlay");

let burgerValue = true;
burgerBtn.addEventListener("click", (e) => {
  if (burgerValue === true) {
    burgerNavbar.classList.remove("burger_display");
    burgerImgClose.classList.add("burger_display");
    burgerImgOpen.classList.remove("burger_display");
    overlay.classList.remove("overlay_display");
    burgerValue = false;
  } else {
    burgerNavbar.classList.add("burger_display");
    burgerImgClose.classList.remove("burger_display");
    burgerImgOpen.classList.add("burger_display");
    overlay.classList.add("overlay_display");
    burgerValue = true;
  }
});
