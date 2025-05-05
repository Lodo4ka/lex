$(document).ready(function() {
 
    //E-mail Ajax Send
    $("form").submit(function() { //Change
      var th = $(this);
      $.ajax({
        type: "POST",
        url: "/mail.php", //Change
        data: th.serialize()
      }).done(function() {
        swal("Отлично!", "Ваша заявка успешно принята!", "success");
        setTimeout(function() {
          // Done Functions
          th.trigger("reset");
        }, 1000);
      });
      return false;
    });

    $('.offer__slider').owlCarousel({
      center: true,
      items:1,
      loop:true,
      margin:16,
      dots:true,
      responsive:{
          600:{
              items:2
          }
      }
    });

    // $('.types__item').on('click', function() {
    //   // Удаляем активный класс у всех дочерних элементов
    //   $('.types__item').removeClass('active');
      
    //   // Добавляем активный класс только к дочернему элементу текущего элемента списка
    //   $(this).find('.types__item').toggleClass('active');
    // });

    $(".btn.mobile").on( "click", function() {
      $(".menu.mobile").addClass("show");
    });

    $("button.close").on( "click", function() {
      $(".menu.mobile").removeClass("show");
    });

    $(".menu.mobile .header__actions--left").on( "click", function() {
      $(".user__content.mobile").toggleClass("show");
    });

    $(".user__content--back").on( "click", function() {
      $(".user__content.mobile").toggleClass("show");
    });

    $(".user__content .close").on( "click", function() {
      $(".user__content.mobile").toggleClass("show");
    });

    $('#clearBtn').click(function() {
      $('#search').val(''); // Очищаем поле ввода
    });

    $(".search").on( "click", function() {
      $("body").toggleClass("show-search");
      $(".searching").toggleClass("show");
    });

    $("#clearBtn").on( "click", function() {
      $("body").toggleClass("show-search");
      $(".searching").toggleClass("show");
    });

    $('.banner__close').click(function() {
      $('.banner').hide();
  });
   
  });

$(document).ready(function() {
    $('.menu__drop').click(function() {
        $('.dropdown-menu').toggle();
    });

    $(document).click(function(event) {
        var target = $(event.target);
        
        // Проверяем, был ли клик вне блока и вне кнопки
        if (!target.closest('.dropdown-menu').length && !target.closest('.menu__drop').length) {
            $('.dropdown-menu').hide(); // Скрываем блок, если клик был вне
        }
    });
});

$(document).ready(function() {
    $('.header__main--user').click(function() {
        $('.user__content.desktop').toggle();
    });

    $(document).click(function(event) {
        var target = $(event.target);
        
        // Проверяем, был ли клик вне блока и вне кнопки
        if (!target.closest('.user__content').length && !target.closest('.header__main--user').length) {
            $('.user__content').hide(); // Скрываем блок, если клик был вне
        }
    });
});

$(document).ready(function() {
  $('#uploadArea').click(function() {
      $('#fileInput').click(); // Открываем диалог выбора файла
  });

  $('#fileInput').change(function(event) {
      var file = event.target.files[0];
      if (file) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
              $('#preview').attr('src', e.target.result).show(); // Устанавливаем источник изображения
          };
          
          reader.readAsDataURL(file); // Читаем файл как Data URL
      }
  });
});

// Получаем список всех элементов
const listItems = document.querySelectorAll('.types__list .types__item');

// Добавляем обработчик события клика для каждого элемента списка
listItems.forEach(item => {
    item.addEventListener('click', function() {
        // Убираем класс active у всех элементов
        listItems.forEach(i => i.classList.remove('active'));
        
        // Добавляем класс active к текущему элементу
        this.classList.add('active');
    });
});