//Видео
const videosWrap = document.querySelector('.video');
if (videosWrap) {
    const allVideos = document.querySelectorAll('.video');
    allVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
        video.load();
    });

    const videoEventHandler = (e) => {
        const video = e.target.closest('.video');
        if (!video) return false;

        const allVideos = document.querySelectorAll('.video');
        const overlay = document.querySelectorAll('.play');

        allVideos.forEach((source, index) => {
            if (source === video) return;
            source.classList.remove('isPlaying');
            source.pause();
            if (overlay[index]) {
                overlay[index].classList.remove('_active');
            }

            const poster = source.closest('div')?.querySelector('.popup-video__poster');
            if (poster) {
                poster.classList.remove('_active');
            }
        });

        if (video.classList.contains('isPlaying')) {
            const playBtn = video.closest('div')?.querySelector('.play');
            if (playBtn) playBtn.classList.remove('_active');
            video.pause();
            video.classList.remove('isPlaying');

            const poster = video.closest('div')?.querySelector('.popup-video__poster');
            if (poster) {
                poster.classList.remove('_active');
            }
        } else {
            const playBtn = video.closest('div')?.querySelector('.play');
            if (playBtn) playBtn.classList.add('_active');
            video.play();
            video.classList.add('isPlaying');

            const poster = video.closest('div')?.querySelector('.popup-video__poster');
            if (poster) {
                poster.classList.add('_active');
            }
        }
    };

    videosWrap.addEventListener('click', videoEventHandler);
}