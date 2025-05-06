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
  $("#translate-ru").removeClass("btn-primary");
  $("#translate-en").removeClass("btn-primary");
  $("#translate-ru").removeClass("btn-secondary");
  $("#translate-en").removeClass("btn-secondary");
  if (savedLang === "ru") {
    $("#translate-ru").addClass("btn-primary");
    $("#translate-en").addClass("btn-secondary");
  } else if (savedLang === "en") {
    $("#translate-en").addClass("btn-primary");
    $("#translate-ru").addClass("btn-secondary");
  }
};

function translatePage(lang) {
  // Показываем индикатор загрузки
  $("body").append(
    '<div id="translation-loader" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.9); z-index: 9999; display: flex; justify-content: center; align-items: center;"><div>Перевод...</div></div>'
  );

  // Скрываем основной контент
  $("body > *:not(#translation-loader)").hide();

  const elements = Array.from(
    document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span, a, button, label"
    )
  );

  localStorage.setItem("selectedLanguage", lang);

  const promises = elements.map((element) => {
    if (element.textContent.trim()) {
      const text = element.textContent;
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(
        text
      )}`;

      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0] && data[0][0] && data[0][0][0]) {
            element.textContent = data[0][0][0];
          }
        });
    }
    return Promise.resolve();
  });

  // Ждем завершения всех переводов
  Promise.all(promises)
    .then(() => {
      // Скрываем индикатор загрузки
      $("#translation-loader").remove();
      // Показываем контент
      $("body > *:not(#translation-loader)").show();
      persistBtns();
    })
    .catch((error) => {
      console.error("Translation error:", error);
      $("#translation-loader").remove();
      $("body > *:not(#translation-loader)").show();
    });
}

// Применяем сохраненный язык при загрузке страницы
$(document).ready(function () {
  const savedLang = localStorage.getItem("selectedLanguage");
  if (savedLang) {
    translatePage(savedLang);
  }
  persistBtns();
});

$("#translate-ru").click(function (e) {
  e.preventDefault();
  translatePage("ru");
});

$("#translate-en").click(function (e) {
  e.preventDefault();
  translatePage("en");
});

// Добавляем скрипт Google Translate
const script = document.createElement("script");
script.src =
  "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(script);

checkLogin();
