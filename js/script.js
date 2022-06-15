$(function () {

    window.onscroll = function () {
        //フッターの上部まで来たら注文ボタンを消す
        const footer = $(".footer").innerHeight(); // footerの高さを取得
        const point = window.pageYOffset; // 現在のスクロール地点
        const docHeight = $(document).height(); // ドキュメントの高さ
        const dispHeight = $(window).height(); // 表示領域の高さ
        if (point > docHeight - dispHeight - footer) {
            // スクロール地点>ドキュメントの高さ-表示領域-footerの高さ
            $(".buy_btn").addClass("is-hidden");
            //footerより下にスクロールしたらis-hiddenを追加
        } else {
            $(".buy_btn").removeClass("is-hidden");
            //footerより上にスクロールしたらis-hiddenを削除
        }
    };

    //ナビゲーションが押されたらゆっくりスクロールする
    $('[href*="#"]').click(function () {
        //全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
        if (window.matchMedia("(min-width: 768px)").matches) {
            /* ウィンドウサイズ768以上の処理 */
            const headerHight = 110; //ヘッダーの高さを指定(ヘッダー追従のため)
            const elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
            const pos = $(elmHash).offset().top - headerHight; //idの上部の距離(ヘッダーの高さを差し引き)を取得
            $("body,html").animate({
                scrollTop: pos
            }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
            return false;
        } else if (window.matchMedia("(max-width:767px)").matches) {
            /* ウィンドウサイズ767以下の処理*/
            const headerHight = 0; //ヘッダーの高さを指定(ヘッダー非追従のため)
            const elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
            const pos = $(elmHash).offset().top - headerHight; //idの上部の距離(ヘッダーの高さを差し引き)を取得
            $("body,html").animate({
                scrollTop: pos
            }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
            return false;
        }
    });

    //768px以下の時に、メニュー内のリンク & リンク外 & 注文ボタンを押すと閉じる
    $(".header_menu").on("click", function (event) {
        $("#menu_box").prop("checked", false);
    });
    $(".header_menu ul li a").on("click", function (event) {
        $("#menu_box").prop("checked", false);
    });
    $(".buy_btn a").on("click", function (event) {
        $("#menu_box").prop("checked", false);
    });

    //  slick
    const $slider = $("#js-slider");
    // 左右の透過の2周目ががたつく対応
    $slider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
        $slider.find(".slick-slide").each((index, el) => {
            const $this = $(el),
                slickindex = $this.attr("data-slick-index");
            if (nextSlide == slick.slideCount - 1 && currentSlide == 0) {
                // 現在のスライドが最初のスライドでそこから最後のスライドに戻る場合
                if (slickindex == "-1") {
                    // 最後のスライドに対してクラスを付与
                    $this.addClass("is-active-next");
                } else {
                    // それ以外は削除
                    $this.removeClass("is-active-next");
                }
            } else if (nextSlide == 0) {
                // 次のスライドが最初のスライドの場合
                if (slickindex == slick.slideCount) {
                    // 最初のスライドに対してクラスを付与
                    $this.addClass("is-active-next");
                } else {
                    // それ以外は削除
                    $this.removeClass("is-active-next");
                }
            } else {
                // それ以外は削除
                $this.removeClass("is-active-next");
            }
        });
    });

    $(".slider").slick({
        autoplay: true, //自動的に動き出すか。初期値はfalse。
        speed: 800, //スライドが切り替わる速度。
        // adaptiveHeight: true, 画像の高さを自動補正
        // variableWidth: true, //画像の幅を自動補正
        infinite: true, //スライドをループさせるかどうか。初期値はtrue。
        slidesToShow: 3, //スライドを画面に3枚見せる
        slidesToScroll: 1, //1回のスクロールで3枚の写真を移動して見せる
        pauseOnHover: false, //ホバーしたときにスライドを一時停止しない
        centerPadding: "0px", // 左右のスライドのpadding
        swipeToSlide: true, //タッチスワイプを許可　→　許可すると正しくドットが表示されないのでコメントアウト
        dots: false, //下部ドットナビゲーションの表示
        responsive: [{
                breakpoint: 1050, //モニターの横幅が1050px以下の見せ方
                settings: {
                    slidesToShow: 2, //スライドを画面に2枚見せる
                },
            },
            {
                breakpoint: 650, //モニターの横幅が700px以下の見せ方
                settings: {
                    slidesToShow: 1, //スライドを画面に1枚見せる
                },
            },
        ],
    });

    /* モーダルウィンドウを表示させる */
    $('.js_modal_open').each(function () {
        $(this).on('click', function () {
            const target = $(this).data('target');
            const modal = document.getElementById(target);
            $(modal).fadeIn();
            return false;
        });
    });
    $('.js_modal_close').on('click', function () {
        $('.js-modal').fadeOut();
        return false;
    });

});