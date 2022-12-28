$(document).ready(function () {
    // Инициализирует pushpin для меню.
    function pushpinNav() {
        var $pushpinTarget = $('#' + $('.pushpin-nav').attr('data-target'));
        $('.pushpin-nav').pushpin({
            top: $pushpinTarget.offset().top,
            bottom: $pushpinTarget.offset().top + $pushpinTarget.outerHeight() - $('.pushpin-nav').height()
        });
    }

    $('.scrollspy').scrollSpy();
    $('.tooltipped').tooltip({
        enterDelay: 500,
    });

    // Pushpin
    pushpinNav();

    // Dropdown
    $('.dropdown-trigger').dropdown({
        constrainWidth: false,
        hover: true,
    });

    // Materialbox
    $('.materialboxed').materialbox({
        onCloseStart: function () {
            $('.responsive-table .materialboxed').addClass('hide');
        }
    });
    $('.open-materialbox').on('click', function ($event) {
        var $target = $('#' + $(this).attr('data-box'));

        $target.removeClass('hide');
        $target.materialbox('open');
    });

    // Добавляем стиль цвета текста для ключевых слов.
    $('.keyword').each(function () {
        var $this = $(this),
            $color = $this.attr('data-color');

        if ($color !== '000000') {
            $this.css('color', '#' + $color);
        }
    });

    // Показываем последние проверки или графики если отключен стандартный или сводный вид.
    $('.scrollspy .section').each(function () {
        var $id = $(this).attr('id'),
            $mainTable = $('#' + $id + ' .main-table'),
            $lastChecksTable = $('#' + $id + ' .last-checks-table'),
            $diagrams = $('#' + $id + ' .diagrams');

        if (!$mainTable.length) {
            if ($lastChecksTable.length) {
                $('#' + $id + ' .last-checks-on').children().text('close').addClass('hide');
                $('#' + $id + ' .last-checks-on').removeClass('last-checks-on').addClass('last-checks-off');

                $lastChecksTable.removeClass('hide');
            } else if ($diagrams.length) {
                $('#' + $id + ' .section-content').addClass('unset-overflow');
                $('#' + $id + ' .diagrams-on').children().text('close').addClass('hide');
                $('#' + $id + ' .diagrams-on').removeClass('diagrams-on').addClass('diagrams-off');

                $diagrams.removeClass('hide');
            }

            // Pushpin
            pushpinNav();
        }
    });

    // Добаляем ячейкам таблиц классы топов.
    $('.top3, .top5, .top10, .top20, .top50, .top100').each(function () {
        var $this = $(this),
            $class = $this.attr('class');

        $this.parent().addClass($class);
    });

    // Свернуть/Развернуть блок
    $('.fullscreen-on, .fullscreen-off').on('click', function ($event) {
        var $this = $(this),
            $target = $this.attr('data-target');

        if ($this.attr('class') === 'fullscreen-on') {
            $this.removeClass('fullscreen-on');
            $this.addClass('fullscreen-off left');

            $('#' + $target).addClass('fullscreen animated zoomIn faster');
            $('#' + $target + ' .section-header').addClass('z-depth-1');

            $('#body').addClass('scroll-hide');
        } else {
            $this.removeClass('fullscreen-off left');
            $this.addClass('fullscreen-on');

            $('#' + $target + ' .section-header').removeClass('z-depth-1');
            $('#' + $target).removeClass('fullscreen animated zoomIn faster');

            $('#body').removeClass('scroll-hide');
            // Pushpin
            pushpinNav();
        }
    });

    // Показать/Скрыть последние проверки
    $('.last-checks-on .material-icons, .last-checks-off .material-icons').on('click', function ($event) {
        var $this = $(this),
            $target = ('#' + $this.attr('data-target')),
            $parent = $this.parent(),
            $mainTable = $($target + ' .main-table'),
            $diagrams = $('#' + 'diagrams-' + $this.attr('data-key'));

        if ($parent.attr('class') === 'last-checks-on') {
            $this.text('close');
            $this.tooltip('destroy');

            $parent.removeClass('last-checks-on');
            $parent.addClass('last-checks-off');

            $diagrams.removeClass('diagrams-off').addClass('diagrams-on');
            $diagrams.children().text('show_chart').tooltip({
                enterDelay: 500
            });

            // Если отключен стандартный или сводный вид.
            if (!$mainTable.length) {
                $this.addClass('hide');
                $diagrams.children().removeClass('hide');
            }

            $mainTable.addClass('hide');
            $($target + ' .diagrams').addClass('hide');
            $($target + ' .section-content').removeClass('unset-overflow');
            $($target + ' .last-checks-table').removeClass('hide');

            // Pushpin
            pushpinNav();
        } else {
            $this.text('history');
            $this.tooltip({
                enterDelay: 500,
            });

            $parent.removeClass('last-checks-off');
            $parent.addClass('last-checks-on');
            $mainTable.removeClass('hide');
            $($target + ' .last-checks-table').addClass('hide');
        }
    });

    // Показать/Скрыть графики
    $('.diagrams-on .material-icons, .diagrams-off .material-icons').on('click', function ($event) {
        var $this = $(this),
            $target = ('#' + $this.attr('data-target')),
            $parent = $this.parent(),
            $mainTable = $($target + ' .main-table'),
            $lastChecks = $('#' + 'last-checks-' + $this.attr('data-key'));

        if ($parent.attr('class') === 'diagrams-on') {
            $this.text('close');
            $this.tooltip('destroy');

            $parent.removeClass('diagrams-on');
            $parent.addClass('diagrams-off');

            $lastChecks.removeClass('last-checks-off').addClass('last-checks-on');
            $lastChecks.children().text('history').tooltip({
                enterDelay: 500
            });

            // Если отключен стандартный или сводный вид.
            if (!$mainTable.length) {
                $this.addClass('hide');
                $lastChecks.children().removeClass('hide');
            }

            $($target + ' .section-content').addClass('unset-overflow');
            $mainTable.addClass('hide');
            $($target + ' .last-checks-table').addClass('hide');
            $($target + ' .diagrams').removeClass('hide');

            // Pushpin
            pushpinNav();
        } else {
            $this.text('show_chart');
            $this.tooltip({
                enterDelay: 500,
            });

            $parent.removeClass('diagrams-off');
            $parent.addClass('diagrams-on');
            $mainTable.removeClass('hide');
            $($target + ' .diagrams').addClass('hide');
        }
    });
});
