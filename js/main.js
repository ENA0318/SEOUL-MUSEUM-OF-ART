
$(function(){

    //달력
    const calendar = document.querySelector('.calendar');
    const detailBox = document.querySelector('.detail-box');

    calendar.addEventListener('click', (e) => {
        e.stopPropagation();
        detailBox.classList.toggle('active');
});

    detailBox.addEventListener('click', (e) => {
        e.stopPropagation();
});

    document.addEventListener('click', () => {
        detailBox.classList.remove('active');
});

    //슬라이드
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const pauseBtn = document.querySelector('.pause');

    let current = 0;
    let autoSlide;
    let isPlaying = true;

        // 슬라이드 표시
    function showSlide(index){

        slides.forEach(slide=>{
            slide.classList.remove('active');
        });

        slides[index].classList.add('active');
    }

        // 다음
    function nextSlide(){
        current++;

        if(current >= slides.length){
            current = 0;
        }

        showSlide(current);
    }

        // 이전
    function prevSlide(){
        current--;

        if(current < 0){
            current = slides.length - 1;
        }

        showSlide(current);
    }

        // 자동재생
    function startSlide(){
        autoSlide = setInterval(()=>{
            nextSlide();
        },6000);
    }

        // 정지
    function stopSlide(){
        clearInterval(autoSlide);
    }

        // 버튼 이벤트
    nextBtn.addEventListener('click',()=>{
        nextSlide();
    });

    prevBtn.addEventListener('click',()=>{
        prevSlide();
    });

        // 재생/정지
    pauseBtn.addEventListener('click',()=>{

        if(isPlaying){
            stopSlide();
            pauseBtn.innerHTML =
            '<i class="fa-solid fa-play"></i>';
        }else{
            startSlide();
            pauseBtn.innerHTML =
            '<i class="fa-regular fa-circle-pause"></i>';
        }

        isPlaying = !isPlaying;
    });

        // 시작
    showSlide(current);
    startSlide();


    //프로그램
    const prItems = document.querySelectorAll('.pr-list li');
    const prContents = document.querySelectorAll('.pr-main .content');

    prItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if(item.classList.contains('active')) {
                    // 이미 active면 → 원래 1번으로 복귀
                    prItems.forEach(i => i.classList.remove('active'));
                    prContents.forEach(c => c.classList.remove('active'));
                    prContents[0].classList.add('active');
                } else {
                    prItems.forEach(i => i.classList.remove('active'));
                    prContents.forEach(c => c.classList.remove('active'));
                    item.classList.add('active');
                    prContents[index + 1].classList.add('active');
                }
            });
        });

    //리서치
        // 소장품·연구 탭 전환
        const reItems = document.querySelectorAll('.re-menu li');
        const reBanners = document.querySelectorAll('.re-banner');

        // 메뉴 index → 배너 index 매핑 (0: SeMA 소장품→배너0, 2: 미술 아카이브→배너1)
        const reMap = { 0: 0, 2: 1 };

        reItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                reItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                if(reMap.hasOwnProperty(index)){
                    reBanners.forEach(b => b.classList.remove('active'));
                    reBanners[reMap[index]].classList.add('active');
                }
                // SeMA 도서와 자료, 모두의 연구실 '코랄'은 배너 변경 없음
            });
});

        //모바일 햄버거 메뉴
        const hamburger = document.querySelector('.hamburger');
        const menu01 = document.querySelector('.menu01');

        if(hamburger){
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                menu01.classList.toggle('mobile-open');
            });

            // 1depth 메뉴 클릭 시 서브메뉴 토글
            document.querySelectorAll('.navi01 > li > a').forEach(link => {
                link.addEventListener('click', function(e) {
                    const submenu = this.parentElement.querySelector('.submenu');
                    if(submenu){
                        e.preventDefault();
                        e.stopPropagation();

                        // 다른 열린 서브메뉴 닫기
                        document.querySelectorAll('.submenu.mobile-active').forEach(sm => {
                            if(sm !== submenu) sm.classList.remove('mobile-active');
                        });

                        submenu.classList.toggle('mobile-active');
                    }
                });
            });
        }

})