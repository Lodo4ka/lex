const createUserData = (data) => {
  const formData = new FormData(data);
  const email = formData.get("email");
  const password = formData.get("password");

  return {
    email: email,
    password: password,
  };
};

const saveEmailPassword = (data) => {
  const userData = createUserData(data);

  localStorage.setItem("userData", JSON.stringify(userData));
};

const isEqualEmailPassword = (currentUserData) => {
  const userData = localStorage.getItem("userData");
  return userData === JSON.stringify(currentUserData);
};

const goToLogin = () => {
  window.location.href = "login.html";
};

const goToHome = () => {
  window.location.href = "/index.html";
};

const setLogin = () => {
  localStorage.setItem("isLogin", true);
};

const setLogout = () => {
  localStorage.removeItem("isLogin");
};

const checkLogin = () => {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin && window.location.pathname === "/index.html") {
    goToLogin();
  }
};

$(document).ready(function () {
  //E-mail Ajax Send
  $(".signupForm").submit(function (e) {
    e.preventDefault();
    const th = $(this);
    //Change
    saveEmailPassword(this);
    swal("Отлично!", "Ваша заявка успешно принята!", "success");
    setTimeout(function () {
      th.trigger("reset");
      setLogin();
      goToLogin();
    }, 1000);
  });

  $(".offer__slider").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 16,
    dots: true,
    responsive: {
      600: {
        items: 2,
      },
    },
  });

  // $('.types__item').on('click', function() {
  //   // Удаляем активный класс у всех дочерних элементов
  //   $('.types__item').removeClass('active');

  //   // Добавляем активный класс только к дочернему элементу текущего элемента списка
  //   $(this).find('.types__item').toggleClass('active');
  // });

  $(".btn.mobile").on("click", function () {
    $(".menu.mobile").addClass("show");
  });

  $("button.close").on("click", function () {
    $(".menu.mobile").removeClass("show");
  });

  $(".menu.mobile .header__actions--left").on("click", function () {
    $(".user__content.mobile").toggleClass("show");
  });

  $(".user__content--back").on("click", function () {
    $(".user__content.mobile").toggleClass("show");
  });

  $(".user__content .close").on("click", function () {
    $(".user__content.mobile").toggleClass("show");
  });

  $("#clearBtn").click(function () {
    $("#search").val(""); // Очищаем поле ввода
  });

  $(".search").on("click", function () {
    $("body").toggleClass("show-search");
    $(".searching").toggleClass("show");
  });

  $("#clearBtn").on("click", function () {
    $("body").toggleClass("show-search");
    $(".searching").toggleClass("show");
  });

  $(".banner__close").click(function () {
    $(".banner").hide();
  });
});

$(document).ready(function () {
  $(".menu__drop").click(function () {
    $(".dropdown-menu").toggle();
  });

  $(document).click(function (event) {
    var target = $(event.target);

    // Проверяем, был ли клик вне блока и вне кнопки
    if (
      !target.closest(".dropdown-menu").length &&
      !target.closest(".menu__drop").length
    ) {
      $(".dropdown-menu").hide(); // Скрываем блок, если клик был вне
    }
  });
});

$(document).ready(function () {
  $(".loginForm").submit(function (e) {
    e.preventDefault();

    const userData = createUserData(this);

    if (isEqualEmailPassword(userData)) {
      $(".user__content").hide();
      setLogin();
      goToLogin();
    }
  });

  $(".loginBtn").click(function (e) {
    e.preventDefault();
    $(".loginForm").submit();
  });
});

$(document).ready(() => {
  $(".logout form").submit(function (e) {
    e.preventDefault();
    setLogout();
    goToHome();
  });
});

$(document).ready(function () {
  $(".header__main--user").click(function () {
    $(".user__content.desktop").toggle();
  });

  $(document).click(function (event) {
    const target = $(event.target);

    if (target.hasClass("loginBtn")) return false;

    // Проверяем, был ли клик вне блока и вне кнопки, исключая форму signin
    if (
      !target.closest(".user__content").length &&
      !target.closest(".header__main--user").length
    ) {
      $(".user__content").hide(); // Скрываем блок, если клик был вне
    }
  });
});

$(document).ready(function () {
  $("#uploadArea").click(function () {
    $("#fileInput").click(); // Открываем диалог выбора файла
  });

  $("#fileInput").change(function (event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#preview").attr("src", e.target.result).show(); // Устанавливаем источник изображения
      };

      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  });
});

// Получаем список всех элементов
const listItems = document.querySelectorAll(".types__list .types__item");

// Добавляем обработчик события клика для каждого элемента списка
listItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Убираем класс active у всех элементов
    listItems.forEach((i) => i.classList.remove("active"));

    // Добавляем класс active к текущему элементу
    this.classList.add("active");
  });
});

const persistBtns = () => {
  const savedLang = localStorage.getItem("selectedLanguage");
  $("#translate-ru, #translate-en").removeClass("btn-primary btn-secondary");
  if (savedLang === "ru") {
    $("#translate-ru").addClass("btn-primary");
    $("#translate-en").addClass("btn-secondary");
  } else if (savedLang === "en") {
    $("#translate-en").addClass("btn-primary");
    $("#translate-ru").addClass("btn-secondary");
  }
};

function showLoader() {
  $("body").append(
    `<div id="translation-loader" style="
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5em;
      font-family: sans-serif;">
    </div>`
  );
}

function hideLoader() {
  $("#translation-loader").remove();
}

function setLanguage(lang) {
  showLoader();

  const baseLang = "en"; // язык по умолчанию
  document.cookie = `googtrans=/${baseLang}/${lang}; path=/`;
  document.cookie = `googtrans=/${baseLang}/${lang}; domain=.${location.hostname}; path=/`;
  localStorage.setItem("selectedLanguage", lang);

  // Небольшая задержка для отображения лоадера
  setTimeout(() => {
    location.reload();
  }, 300);
}

$(document).ready(function () {
  const savedLang = localStorage.getItem("selectedLanguage");
  if (savedLang) {
    const baseLang = "en";
    document.cookie = `googtrans=/${baseLang}/${savedLang}; path=/`;
    document.cookie = `googtrans=/${baseLang}/${savedLang}; domain=.${location.hostname}; path=/`;
  }

  persistBtns();
  hideLoader(); // на всякий случай

  $("#translate-ru").click(function (e) {
    e.preventDefault();
    setLanguage("ru");
  });

  $("#translate-en").click(function (e) {
    e.preventDefault();
    setLanguage("en");
  });
});

// Google Translate widget init
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ru",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

const script = document.createElement("script");
script.src =
  "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(script);
checkLogin();
