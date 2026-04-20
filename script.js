// --- 1. DANH SÁCH LINK QUẢNG CÁO TIKTOK ---
const adLinks = [
    "https://vt.tiktok.com/ZS9LPbRWLKFvK-C9Kue/",
    "https://vt.tiktok.com/ZS9LPb8agUyHP-0uExw/",
    "https://vt.tiktok.com/ZS9LPbNg33sKC-8sIZt/",
    "https://vt.tiktok.com/ZS9LPb2QvJYtK-u0q5d/",
    "https://vt.tiktok.com/ZS9LejVDXVwQG-P8OS5/",
    "https://vt.tiktok.com/ZS9LJt9hFrBro-eBls8/",
    "https://vt.tiktok.com/ZS9LJtpbpdHNC-rjT9y/",
    "https://vt.tiktok.com/ZS9LejGEtEFGk-zeSkI/",
    "https://vt.tiktok.com/ZS9LejKauFm5J-hpBe8/",
    "https://vt.tiktok.com/ZS9LJn9qXHfke-Rvews/",
    "https://vt.tiktok.com/ZS9LJW2fXWMuN-zopGk/",
    "https://vt.tiktok.com/ZS9LJWPKSWWLu-9L8T9/",
    "https://vt.tiktok.com/ZS9Le6YHQRVvq-1HqDN/",
    "https://vt.tiktok.com/ZS9LJcf5eJHFA-GM2ej/",
    "https://vt.tiktok.com/ZS9LJcub3SkK2-omPqK/",
    "https://vt.tiktok.com/ZS9LJcqdFB9Fp-iGt6S/",
    "https://vt.tiktok.com/ZS9LJ3JbC2CXw-qBVIb/",
    "https://vt.tiktok.com/ZS9LJ3R8ncgEH-DTw41/",
    "https://vt.tiktok.com/ZS9Le6f8pVAPB-NtxhK/",
    "https://vt.tiktok.com/ZS9Le656S7MpR-LXXmf/",
    "https://vt.tiktok.com/ZS9LkEQrx7gkt-BAopJ/",
    "https://vt.tiktok.com/ZS9LkEXaUeCb4-nqWEW/",
    "https://vt.tiktok.com/ZS9LkEgE4v2Sg-BvvGy/",
];

// --- 2. CÁC HÀM CƠ BẢN (LOADING & THÔNG BÁO) ---
const loader = document.getElementById('loader');
const modal = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');

function showLoader() { loader.classList.add('active'); }
function hideLoader() { loader.classList.remove('active'); }

function closeWelcomeAlert() {
    document.getElementById('welcomeAlertModal').classList.remove('active');
    showLoader();
    setTimeout(() => { hideLoader(); }, 600);
}

function showModal(title, message, isSuccess = false) {
    modalTitle.innerText = title; 
    modalMessage.innerText = message; 
    if(isSuccess) {
        modalIcon.className = "fa-solid fa-circle-check";
        modalIcon.style.color = "#4CAF50";
    } else {
        modalIcon.className = "fa-solid fa-circle-exclamation";
        modalIcon.style.color = "#e53935";
    }
    modal.classList.add('active');
}

function closeModal() { modal.classList.remove('active'); }

function submitContactForm() {
    showLoader();
    setTimeout(() => { hideLoader(); showModal('Thành Công', 'Tin nhắn của bạn đã được gửi!', true); }, 800);
}

// --- 3. TÍNH NĂNG XEM CHI TIẾT PHIM & TRÌNH PHÁT AUDIO TÙY CHỈNH ---
const movieDetailModal = document.getElementById('movieDetailModal');
const detailTitle = document.getElementById('detailTitle');
const detailPoster = document.getElementById('detailPoster');
const watchNowBtn = document.getElementById('watchNowBtn');

const customAudioPlayer = document.getElementById('customAudioPlayer');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const speedBtn = document.getElementById('speedBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeIcon = document.getElementById('volumeIcon');

let isPlaying = false;

function openMovieDetail(title, linkUrl, imageUrl) {
    detailTitle.innerText = title; 
    detailPoster.style.backgroundImage = `url('${imageUrl}')`;
    
    if(linkUrl === '#') {
        watchNowBtn.style.display = 'flex';
        customAudioPlayer.style.display = 'none';
        audioPlayer.pause();
        audioPlayer.src = '';
        watchNowBtn.onclick = function(e) {
            e.preventDefault();
            showModal('Đang Cập Nhật', 'Bộ phim này hiện đang chờ cập nhật Link xem chính thức!');
        };
    } else {
        watchNowBtn.style.display = 'none';
        customAudioPlayer.style.display = 'block';
        resetPlayerUI();
        
        // Cập nhật link và ép trình duyệt tải file ngay lập tức
        audioPlayer.src = linkUrl;
        audioPlayer.load();
    }

    movieDetailModal.classList.add('active');
}

function closeMovieDetail() { 
    movieDetailModal.classList.remove('active'); 
    audioPlayer.pause(); 
    isPlaying = false;
    playIcon.className = "fa-solid fa-play";
}

movieDetailModal.addEventListener('click', function(e) { 
    if(e.target === movieDetailModal) closeMovieDetail(); 
});

// LOGIC ĐIỀU KHIỂN CUSTOM AUDIO PLAYER
function resetPlayerUI() {
    playIcon.className = "fa-solid fa-play";
    isPlaying = false;
    progressBar.value = 0;
    currentTimeEl.innerText = "00:00";
    totalTimeEl.innerText = "00:00";
    audioPlayer.playbackRate = 1.0;
    speedBtn.innerText = "1.0x";
}

function formatTime(time) {
    if (isNaN(time) || !isFinite(time)) return "00:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Play/Pause với cơ chế dự phòng chống lỗi CORS/tải file
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.className = "fa-solid fa-play";
        isPlaying = false;
    } else {
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playIcon.className = "fa-solid fa-pause";
                isPlaying = true;
            }).catch(error => {
                console.error("Lỗi phát âm thanh trên web:", error);
                showModal('Bạn Vui Lòng Đợi', 'Hệ Thống Đang Kết Nối Phim Vui Lòng Đợi Chút Ạ', true);
                setTimeout(() => {
                    window.open(audioPlayer.src, '_blank');
                }, 1500);
            });
        }
    }
});

audioPlayer.addEventListener('timeupdate', () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    
    currentTimeEl.innerText = formatTime(current);
    if (!isNaN(duration) && isFinite(duration)) {
        totalTimeEl.innerText = formatTime(duration);
        progressBar.max = duration;
    }
    if (duration > 0) progressBar.value = current;
});

audioPlayer.addEventListener('loadedmetadata', () => {
    if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration)) {
        totalTimeEl.innerText = formatTime(audioPlayer.duration);
        progressBar.max = audioPlayer.duration;
    }
});

progressBar.addEventListener('input', () => { audioPlayer.currentTime = progressBar.value; });
rewindBtn.addEventListener('click', () => { audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10); });
forwardBtn.addEventListener('click', () => { audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10); });

speedBtn.addEventListener('click', () => {
    let currentSpeed = audioPlayer.playbackRate;
    if (currentSpeed === 1.0) currentSpeed = 1.25;
    else if (currentSpeed === 1.25) currentSpeed = 1.5;
    else if (currentSpeed === 1.5) currentSpeed = 2.0;
    else currentSpeed = 1.0;
    
    audioPlayer.playbackRate = currentSpeed;
    speedBtn.innerText = currentSpeed + "x";
});

muteBtn.addEventListener('click', () => {
    audioPlayer.muted = !audioPlayer.muted;
    if (audioPlayer.muted) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
        volumeIcon.style.color = "#e53935"; 
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
        volumeIcon.style.color = "var(--text-light)";
    }
});

audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playIcon.className = "fa-solid fa-play";
    progressBar.value = 0;
    audioPlayer.currentTime = 0;
});

// --- 4. TẠO KHUNG PHIM TRÊN WEB & LOGIC QUẢNG CÁO ---
let globalAdProgress = 0; // Biến đếm số lần click QC

function createMovieCard(isNew = false, movieName = "Siêu Phẩm Truyện Gấu Kể", movieLink = "#", imageUrl = "https://i.postimg.cc/nLY9GKJS/IMG-0721.jpg") {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    
    const isUpdating = (movieLink === "#");

    card.innerHTML = `
        ${isNew ? '<div class="badge-new">NEW</div>' : ''}
        <div class="movie-thumbnail">
            <div class="bg-blur" style="background-image: url('${imageUrl}'); ${!isUpdating ? 'filter: none;' : ''}"></div>
            ${isUpdating ? '<div class="update-text"><i class="fa-solid fa-spinner fa-spin"></i> Phim đang cập nhật</div>' : ''}
        </div>
        <div class="movie-info">
            <h2 class="searchable-title">${movieName}</h2> 
        </div>
    `;
    
    card.addEventListener('click', () => {
        if (globalAdProgress < 3) {
            globalAdProgress++;
            
            // Hiển thị thanh tiến độ quảng cáo
            const toast = document.getElementById('adProgressToast');
            const toastText = document.getElementById('adProgressText');
            toastText.innerText = `tiến độ: ${globalAdProgress}/3`;
            toast.classList.add('active');
            
            // Ẩn thanh thông báo sau 3.5 giây
            setTimeout(() => {
                toast.classList.remove('active');
            }, 3500);
            
            // Mở tab quảng cáo ngẫu nhiên
            const randomAd = adLinks[Math.floor(Math.random() * adLinks.length)];
            window.open(randomAd, '_blank');
            
            // Nếu đủ 3 lần thì reset và mở giao diện phim
            if (globalAdProgress === 3) {
                setTimeout(() => {
                    globalAdProgress = 0; // Đặt lại cho phim tiếp theo
                    openMovieDetail(movieName, movieLink, imageUrl);
                }, 500);
            }
        } else {
            // Đề phòng trường hợp lỗi kẹt biến
            globalAdProgress = 0;
            openMovieDetail(movieName, movieLink, imageUrl);
        }
    });
    
    return card;
}

// --- 5. RENDER DỮ LIỆU PHIM ---
// Lưu ý: Thêm phim mới vào ĐẦU MẢNG (trên cùng) để nó tự động lên top.
const realMovies = [
{
        name: "Chia Tay Bạn Gái Qua Mạng Ai Ngờ Là Hoa Khôi",
        link: "https://videotourl.com/audio/1776685910127-4304ffb1-ef98-441a-a4cb-0a199479a9a0.m4a",
        image: "https://i.postimg.cc/V62nmHPJ/IMG-1173.jpg"
    },
{
        name: "Nữ Tổng Tài Nuôi Tôi Bị Phá Sản",
        link: "https://videotourl.com/audio/1776685832003-ca79ac87-2ea6-4bb4-a733-a0052bff69f1.m4a",
        image: "https://i.postimg.cc/HxFXdP18/IMG-1172.jpg"
    },
{
        name: "Hoa Khôi Đọ Điểm Thi Đại Học Với Tôi",
        link: "https://videotourl.com/audio/1776661057509-0b524adb-c95a-4a7c-96d1-b1591d49294b.m4a",
        image: "https://i.postimg.cc/QtvmGjD3/IMG-1149.jpg"
    },
{
        name: "Nữ Minh Tinh Nỗi Tiếng Tỏ Tình Tôi Lúc Khuya",
        link: "https://videotourl.com/audio/1776495742970-991e5d6a-e918-4012-885a-b576b2c7b052.m4a",
        image: "https://i.postimg.cc/6Qcyjrn1/IMG-1065.jpg"
    },
{
        name: "Chỉ Vì Một Cái Hôn Tôi Bị Ép Làm Chồng",
        link: "https://videotourl.com/audio/1776495631819-3ef84330-8dce-48d1-a355-7d3d8869662b.m4a",
        image: "https://i.postimg.cc/bvgsCxkB/IMG-1064.jpg"
    },
{
        name: "Đám Cưới Tôi Hôn Nhầm Phù Dâu",
        link: "https://videotourl.com/audio/1776495558096-7584742e-f9f5-4d5b-979e-229a69288633.m4a",
        image: "https://i.postimg.cc/7L9fs30t/IMG-1063.jpg"
    },
{
        name: "Đối Tượng Yêu Qua Mạng Của Tôi Là Cô Nàng Nhõng Nhẽo",
        link: "https://videotourl.com/audio/1776431381008-226fc3f5-65eb-49c1-91a5-12b7946232d8.m4a",
        image: "https://i.postimg.cc/W1wJ3Zhc/IMG-1045.jpg"
    },
{
        name: "Tôi Chia Tay Cô Bạn Gái Độc Miệng",
        link: "https://videotourl.com/audio/1776399400815-1cf1faec-4b13-4be8-969f-fdb2480bd19e.m4a",
        image: "https://i.postimg.cc/K8DgzTRy/IMG-1044.jpg"
    },
{
        name: "Kẻ Thù Lẻn Vô Phòng Tôi",
        link: "https://videotourl.com/audio/1776399341087-8ad5e535-266b-49c3-9510-f7bd10341b8e.m4a",
        image: "https://i.postimg.cc/x13bCmcr/IMG-1043.jpg"
    },
{
        name: "Học Sinh Giới Thiệu Chị Gái Cho Tôi",
        link: "https://videotourl.com/audio/1776317621512-70df87a9-fd0e-4857-9bfc-85ae8a036414.m4a",
        image: "https://i.postimg.cc/zXY3Lgd1/IMG-1004.jpg"
    },
{
        name: "Tôi Lấy Lý Do Ngoại Tình Để Ly Hôn Vợ",
        link: "https://videotourl.com/audio/1776317672212-7820802e-c992-4358-afab-83cae79beeba.m4a",
        image: "https://i.postimg.cc/L6Fhq1xw/IMG-1003.jpg"
    },
    {
        name: "Tôi Chia Tay Cô Bạn Gái Nghèo Qua Mạng",
        link: "https://videotourl.com/audio/1776246243212-e69771f0-cbaa-4147-86c7-75bc2549f912.m4a",
        image: "https://i.postimg.cc/CMWMzwns/IMG-0984.jpg"
    },
    {
        name: "Hoa Khôi Mất Trí Nhớ Bị Tôi Lừa Về Nhà",
        link: "https://videotourl.com/audio/1776246438205-e6b40d37-8c68-417f-877a-f47481af8edc.m4a",
        image: "https://i.postimg.cc/HWfWVT8z/IMG-0985.jpg"
    },
    {
        name: "Tôi Về Quê Chăn Heo Bắt Gặp Nữ Tiểu Thư Sống Ỏ Đây",
        link: "https://videotourl.com/audio/1776176487264-c430424e-2f36-45ff-8401-5dfbc7ea1041.m4a",
        image: "https://i.postimg.cc/Y9fXzPZt/IMG-0949.jpg"
    },
    {
        name: "Nữ Chính Quay Trở Lại 10 Năm Để Theo Đuổi Tôi",
        link: "https://videotourl.com/audio/1776176536941-b2f5cfb3-5c58-4f0d-8f24-ec2410f55dac.m4a",
        image: "https://i.postimg.cc/mDNdynJB/IMG-0948.jpg"
    },
    {
        name: "Tôi Chia Tay Với Bạn Gái Ảo Ai Ngờ Lại Là Hoa Khôi",
        link: "https://videotourl.com/audio/1776151639836-22bffdde-d5c8-45e2-b415-2b6d739b1aa0.m4a",
        image: "https://i.postimg.cc/0Qttdz2h/IMG_0936.jpg"
    },
    {
        name: "Tôi Chia Tay Hoa Khôi Ai Ngờ Cô Ấy Bây Giờ Lại Là Sếp",
        link: "https://videotourl.com/audio/1776070670899-bbf9e807-9a02-4106-af3a-b94cf705b0d1.m4a",
        image: "https://i.postimg.cc/8zyGkH3r/IMG-0913.jpg"
    },
    {
        name: "Chia Tay Bạn Gái Tôi Quen Nữ Tổng Tài Ỏ Quán Ba",
        link: "https://videotourl.com/audio/1776070414415-c202d1da-d3d1-4fcb-a7e5-3f0d12582ddc.m4a",
        image: "https://i.postimg.cc/DwgdrzHr/IMG_0902.jpg"
    },
    {
        name: "Tôi Lỡ Ngủ Với Kẻ Thù Bị Cô Ấy Bắt Chịu Trách Nghiệm",
        link: "https://videotourl.com/audio/1776070296022-5d0e7813-ac74-41e1-8473-8037906653a2.m4a",
        image: "https://i.postimg.cc/t4yNn6SW/IMG_0901.jpg"
    },
    {
        name: "Khi Mình Biết Mình Là Thiếu Gia Giả TÔI liền Chốn Khỏi Cô Vợ",
        link: "https://videotourl.com/audio/1776010728925-2912bee5-8dff-416b-95c6-7def95d863c1.m4a",
        image: "https://i.postimg.cc/0rRS4HzD/IMG_0883.jpg"
    },
    {
        name: "Tôi Làm Mọi Việc Để Nữ Chính Ghét Tôi",
        link: "https://pub-af59ef8bd16249ba9a926f943a92e17e.r2.dev/audio/1775987109365-1dabc9c3-0257-47c7-b2c9-e4144e731d1f.m4a",
        image: "https://i.postimg.cc/52TgKqcc/IMG_0870.jpg"
    },
    {
        name: "Tôi Quyết Định Ly Hôn Với Cô Vợ Lạnh Lùng",
        link: "https://pub-af59ef8bd16249ba9a926f943a92e17e.r2.dev/audio/1775984264539-182321a1-976e-47b2-8292-8d9ddbe00833.m4a",
        image: "https://i.postimg.cc/Z52HsPGX/IMG_0867.jpg"
    },
    {
        name: "Tôi Dùng 500 Tệ Bao Nuôi Tiểu Thư Giàu Có",
        link: "https://pub-af59ef8bd16249ba9a926f943a92e17e.r2.dev/audio/1775983576540-1429cdb3-138a-4661-9b47-7991e26956e0.m4a",
        image: "https://i.postimg.cc/dVp6NRbB/IMG_0868.jpg"
    },
    {
        name: "Tôi Lỡ Tay Bình Luận Muốn Xem Chân Hoa Khôi",
        link: "https://files.catbox.moe/u9ss2w.m4a",
        image: "https://i.postimg.cc/X7508H6j/IMG_0840.jpg"
    },
    {
        name: "Tôi Chia Tay Cô Người Yêu Luỵ Tình Và Ngốc Ngếch",
        link: "https://files.catbox.moe/7dfdla.m4a",
        image: "https://i.postimg.cc/bNnjTCfw/IMG_0839.jpg"
    },
    {
        name: "Tôi Về Nhà Chị Gái Muốn Làm Vợ Bé",
        link: "https://files.catbox.moe/drlm4s.m4a",
        image: "https://i.postimg.cc/7L0QyRw0/IMG-0827.jpg"
    },
    {
        name: "Tôi Nhận Được Tin Nhắn Của Tôi Năm 20 Tuổi",
        link: "https://files.catbox.moe/csz1an.m4a",
        image: "https://i.postimg.cc/hPDs5jXm/IMG-0826.jpg"
    },
    {
        name: "Quay Trở Lại Tôi Chỉ Muốn Rời Xa Em",
        link: "https://files.catbox.moe/5gch1j.m4a",
        image: "https://i.postimg.cc/VsWgFXkx/IMG-0766.jpg"
    },
    {
        name: "Biết Mình Là Kẻ Thế Thân Tôi Liền Ôm Con Rời Đi",
        link: "https://files.catbox.moe/b32kqa.m4a",
        image: "https://i.postimg.cc/ZKXrzhJn/IMG-0751.jpg"
    },
    {
        name: "Cô Bạn Cùng Phòng Cuồng Yêu Tôi",
        link: "https://files.catbox.moe/lrevv2.m4a",
        image: "https://i.postimg.cc/6qcg8kZQ/IMG-0730.jpg"
    }
];

// --- 5.1 ĐỔ DỮ LIỆU RA TRANG CHỦ (GIỚI HẠN 10 PHIM MỚI NHẤT) ---
const homeGrid = document.getElementById('home-movie-grid');
const homeMovies = realMovies.slice(0, 10); // Chỉ lấy tối đa 10 phần tử đầu tiên

homeMovies.forEach(movie => {
    homeGrid.appendChild(createMovieCard(true, movie.name, movie.link, movie.image));
});

// Chèn thêm phim "Đang cập nhật" nếu chưa đủ 10 phim
for (let i = homeMovies.length; i < 10; i++) {
    homeGrid.appendChild(createMovieCard(true, "Siêu Phẩm Truyện Gấu Kể", "#", "https://i.postimg.cc/nLY9GKJS/IMG-0721.jpg")); 
}

// --- 5.2 ĐỔ DỮ LIỆU & PHÂN TRANG DANH SÁCH (10 PHIM/TRANG) ---
let currentListPage = 1;
let totalPages = Math.ceil(realMovies.length / 10);
if (totalPages === 0) totalPages = 1;

function loadListPage(pageNumber) {
    currentListPage = pageNumber;
    showLoader();
    
    setTimeout(() => {
        const listGrid = document.getElementById('list-movie-grid');
        listGrid.innerHTML = ''; 
        
        // Cắt đúng 10 phim cho trang hiện tại
        const startIndex = (pageNumber - 1) * 10;
        const endIndex = startIndex + 10;
        const pageMovies = realMovies.slice(startIndex, endIndex);
        
        pageMovies.forEach(movie => {
            const isNew = (pageNumber === 1); // Chỉ đánh dấu NEW ở trang 1
            listGrid.appendChild(createMovieCard(isNew, movie.name, movie.link, movie.image));
        });
        
        // Điền đầy trang nếu thiếu
        for (let i = pageMovies.length; i < 10; i++) {
            listGrid.appendChild(createMovieCard(false, "Siêu Phẩm Truyện Gấu Kể", "#", "https://i.postimg.cc/nLY9GKJS/IMG-0721.jpg"));
        }
        
        renderPagination();
        hideLoader();
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, 600);
}

// --- 6. TÌM KIẾM THÔNG MINH (TÌM TRÊN TOÀN BỘ DATA KHÔNG GIỚI HẠN TRANG) ---
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); str = str.replace(/đ/g,"d"); return str.toLowerCase().trim();
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) document.getElementById('searchInput').focus();
});

document.getElementById('executeSearch').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    if(query === '') { showModal('Lỗi Tìm Kiếm', 'Vui lòng nhập tên truyện bạn muốn tìm!'); return; }
    
    document.getElementById('searchBar').classList.remove('active');
    showLoader();

    setTimeout(() => {
        const normalizedQuery = removeVietnameseTones(query);
        
        // Quét trên toàn bộ mảng dữ liệu gốc
        const foundIndex = realMovies.findIndex(movie => removeVietnameseTones(movie.name).includes(normalizedQuery));

        if (foundIndex !== -1) {
            const foundMovie = realMovies[foundIndex];
            const targetPage = Math.floor(foundIndex / 10) + 1; // Xác định phim nằm ở trang nào
            
            // Chuyển hướng sang Tab Danh sách và tải đúng trang
            if (!document.getElementById('list-tab').classList.contains('active')) {
                switchTab('list-tab', targetPage);
            } else {
                loadListPage(targetPage);
            }

            // Đợi chuyển tab xong thì scroll tới phim và bôi đỏ
            setTimeout(() => {
                hideLoader();
                const allCards = document.querySelectorAll('#list-tab .movie-card');
                let targetCard = null;
                for (let card of allCards) {
                    if (card.querySelector('.searchable-title').innerText === foundMovie.name) {
                        targetCard = card; break;
                    }
                }
                
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetCard.classList.add('highlight-card');
                    setTimeout(() => targetCard.classList.remove('highlight-card'), 3000); 

                    showModal('Tìm Thấy', `Đã tìm thấy: ${foundMovie.name}!`, true);
                    searchInput.value = '';
                }
            }, 700); 
        } else {
            hideLoader();
            showModal('Không Tìm Thấy', `Rất tiếc, không tìm thấy phim nào chứa từ khóa "${query}".`);
        }
    }, 800); 
});

// --- 7. ĐIỀU KHIỂN MENU VÀ PHÂN TRANG ---
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
function closeMenu() { sideMenu.classList.remove('active'); menuOverlay.classList.remove('active'); }
document.getElementById('menuBtn').addEventListener('click', () => { sideMenu.classList.add('active'); menuOverlay.classList.add('active'); });
document.getElementById('closeMenuBtn').addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu); 

function renderPagination() {
    const paginationContainer = document.getElementById('list-pagination');
    let html = '';
    const prevClass = currentListPage === 1 ? 'disabled' : '';
    html += `<button class="page-btn ${prevClass}" onclick="if(currentListPage > 1) loadListPage(currentListPage - 1)"><i class="fa-solid fa-angle-left"></i></button>`;
    html += `<button class="page-btn ${currentListPage === 1 ? 'active' : ''}" onclick="loadListPage(1)">1</button>`;
    if (currentListPage > 3 && totalPages > 1) html += `<span class="page-btn dots">...</span>`;
    
    let start = Math.max(2, currentListPage - 1);
    let end = Math.min(totalPages - 1, currentListPage + 1);
    if (currentListPage === 1) end = Math.min(4, totalPages - 1);
    if (currentListPage === totalPages && totalPages > 3) start = Math.max(2, totalPages - 3);
    
    for (let i = start; i <= end; i++) {
        html += `<button class="page-btn ${currentListPage === i ? 'active' : ''}" onclick="loadListPage(${i})">${i}</button>`;
    }
    
    if (currentListPage < totalPages - 2 && totalPages > 1) html += `<span class="page-btn dots">...</span>`;
    if (totalPages > 1) {
        html += `<button class="page-btn ${currentListPage === totalPages ? 'active' : ''}" onclick="loadListPage(${totalPages})">${totalPages}</button>`;
    }
    
    const nextClass = currentListPage === totalPages ? 'disabled' : '';
    html += `<button class="page-btn ${nextClass}" onclick="if(currentListPage < totalPages) loadListPage(currentListPage + 1)"><i class="fa-solid fa-angle-right"></i></button>`;
    paginationContainer.innerHTML = html;
}

// --- 8. HỆ THỐNG CHUYỂN TAB ---
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');

// Nâng cấp hàm switchTab để có thể nhảy thẳng đến trang mong muốn
function switchTab(targetId, targetPage = 1) {
    closeMenu(); showLoader(); 
    setTimeout(() => {
        tabContents.forEach(tab => tab.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.getElementById(targetId).classList.add('active');
        const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if(activeLink) activeLink.classList.add('active-link');
        
        if(targetId === 'list-tab') {
            loadListPage(targetPage); 
        } else {
            hideLoader(); window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 500);
}

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if(!this.classList.contains('active-link')) switchTab(this.getAttribute('data-target'));
        else closeMenu(); 
    });
});

document.getElementById('logoBtn').addEventListener('click', () => {
    const homeLink = document.querySelector(`.nav-link[data-target="home-tab"]`);
    if(!homeLink.classList.contains('active-link')) switchTab('home-tab');
});

// Khởi chạy lần đầu
renderPagination();
