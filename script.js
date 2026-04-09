// --- 1. DANH SÁCH LINK QUẢNG CÁO TIKTOK ---
const adLinks = [
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
    "https://vt.tiktok.com/ZS9Le656S7MpR-LXXmf/"
];

// --- 2. CÁC HÀM CƠ BẢN (LOADING & THÔNG BÁO) ---
const loader = document.getElementById('loader');
const modal = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');

function showLoader() { loader.classList.add('active'); }
function hideLoader() { loader.classList.remove('active'); }

// Đóng thông báo chào mừng & hiển thị loading mượt mà
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

// --- 3. TÍNH NĂNG XEM CHI TIẾT PHIM & TRÌNH PHÁT AUDIO ---
const movieDetailModal = document.getElementById('movieDetailModal');
const detailTitle = document.getElementById('detailTitle');
const detailPoster = document.getElementById('detailPoster');
const watchNowBtn = document.getElementById('watchNowBtn');

// Các phần tử của Custom Audio Player
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

// 3.1. HÀM MỞ BẢNG CHI TIẾT PHIM
function openMovieDetail(title, linkUrl, imageUrl) {
    detailTitle.innerText = title; 
    detailPoster.style.backgroundImage = `url('${imageUrl}')`;
    
    if(linkUrl === '#') {
        // Chưa có link -> Hiện nút "Xem Ngay" mặc định, Ẩn Player
        watchNowBtn.style.display = 'flex';
        customAudioPlayer.style.display = 'none';
        
        audioPlayer.pause();
        audioPlayer.src = '';
        
        watchNowBtn.onclick = function(e) {
            e.preventDefault();
            showModal('Đang Cập Nhật', 'Bộ phim này hiện đang chờ cập nhật Link xem chính thức!');
        };
    } else {
        // Đã có link -> Ẩn nút "Xem Ngay", Bật Custom Player
        watchNowBtn.style.display = 'none';
        customAudioPlayer.style.display = 'block';
        
        resetPlayerUI();
        audioPlayer.src = linkUrl;
    }

    movieDetailModal.classList.add('active');
}

function closeMovieDetail() { 
    movieDetailModal.classList.remove('active'); 
    audioPlayer.pause(); // Tắt nhạc khi đóng
    isPlaying = false;
    playIcon.className = "fa-solid fa-play";
}

movieDetailModal.addEventListener('click', function(e) { 
    if(e.target === movieDetailModal) closeMovieDetail(); 
});

// 3.2. LOGIC ĐIỀU KHIỂN CUSTOM AUDIO PLAYER
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
    if (isNaN(time)) return "00:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.className = "fa-solid fa-play";
    } else {
        audioPlayer.play();
        playIcon.className = "fa-solid fa-pause";
    }
    isPlaying = !isPlaying;
});

// Cập nhật thanh trượt thời gian thực
audioPlayer.addEventListener('timeupdate', () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    
    currentTimeEl.innerText = formatTime(current);
    if (!isNaN(duration)) { totalTimeEl.innerText = formatTime(duration); }
    
    if (duration > 0) {
        progressBar.max = duration;
        progressBar.value = current;
    }
});

audioPlayer.addEventListener('loadedmetadata', () => {
    totalTimeEl.innerText = formatTime(audioPlayer.duration);
    progressBar.max = audioPlayer.duration;
});

// Kéo thả thanh trượt
progressBar.addEventListener('input', () => { audioPlayer.currentTime = progressBar.value; });

// Tua lùi/tiến 10s
rewindBtn.addEventListener('click', () => { audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10); });
forwardBtn.addEventListener('click', () => { audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10); });

// Thay đổi tốc độ phát
speedBtn.addEventListener('click', () => {
    let currentSpeed = audioPlayer.playbackRate;
    if (currentSpeed === 1.0) currentSpeed = 1.25;
    else if (currentSpeed === 1.25) currentSpeed = 1.5;
    else if (currentSpeed === 1.5) currentSpeed = 2.0;
    else currentSpeed = 1.0;
    
    audioPlayer.playbackRate = currentSpeed;
    speedBtn.innerText = currentSpeed + "x";
});

// Tắt/mở âm thanh
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

// Kết thúc bài tự reset icon Play
audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playIcon.className = "fa-solid fa-play";
    progressBar.value = 0;
    audioPlayer.currentTime = 0;
});

// --- 4. TẠO KHUNG PHIM TRÊN WEB ---
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
        // Mở quảng cáo ngẫu nhiên ở tab mới
        const randomAd = adLinks[Math.floor(Math.random() * adLinks.length)];
        window.open(randomAd, '_blank');
        
        // Mở popup thông tin phim và Audio ở tab này
        openMovieDetail(movieName, movieLink, imageUrl);
    });
    
    return card;
}

// --- 5. RENDER DỮ LIỆU PHIM (ĐỔ DATA TỪ ĐÂY) ---
const realMovies = [
    {
        name: "Cô Bạn Cùng Phòng Cuồng Yêu Tôi",
        link: "https://files.catbox.moe/id0lwe.m4a",
        image: "https://i.postimg.cc/6qcg8kZQ/IMG-0730.jpg"
    }
    // Cập nhật phim mới trên dòng này...
];

const homeGrid = document.getElementById('home-movie-grid');

realMovies.forEach(movie => {
    homeGrid.appendChild(createMovieCard(true, movie.name, movie.link, movie.image));
});

const remainingHomeCards = 10 - realMovies.length;
for (let i = 0; i < remainingHomeCards; i++) {
    homeGrid.appendChild(createMovieCard(true, "Siêu Phẩm Truyện Gấu Kể", "#", "https://i.postimg.cc/nLY9GKJS/IMG-0721.jpg")); 
}

let currentListPage = 1;
const totalPages = 100; 

function loadListPage(pageNumber) {
    currentListPage = pageNumber;
    showLoader();
    
    setTimeout(() => {
        const listGrid = document.getElementById('list-movie-grid');
        listGrid.innerHTML = ''; 
        const isPageOne = (pageNumber === 1);
        
        if (isPageOne) {
            realMovies.forEach(movie => {
                listGrid.appendChild(createMovieCard(true, movie.name, movie.link, movie.image));
            });
            const remainingListCards = 10 - realMovies.length;
            for (let i = 0; i < remainingListCards; i++) {
                listGrid.appendChild(createMovieCard(true, "Siêu Phẩm Truyện Gấu Kể", "#", "https://i.postimg.cc/nLY9GKJS/IMG-0721.jpg"));
            }
        } else {
            for (let i = 0; i < 10; i++) {
                listGrid.appendChild(createMovieCard(false, "Siêu Phẩm Truyện Gấu Kể", "#", "https://i.postimg.cc/nLY9GKJS/IMG-0721.jpg"));
            }
        }
        
        renderPagination();
        hideLoader();
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, 600);
}

// --- 6. TÌM KIẾM THÔNG MINH (FUZZY SEARCH) ---
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    return str.toLowerCase().trim();
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
        const allCards = document.querySelectorAll('.movie-card');
        let foundCard = null;

        for (let card of allCards) {
            const titleText = card.querySelector('.searchable-title').innerText;
            if (removeVietnameseTones(titleText).includes(normalizedQuery)) {
                foundCard = card; break;
            }
        }

        if (foundCard) {
            const parentTab = foundCard.closest('.tab-content');
            if(parentTab && !parentTab.classList.contains('active')) switchTab(parentTab.id);

            setTimeout(() => {
                hideLoader();
                foundCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                foundCard.classList.add('highlight-card');
                setTimeout(() => foundCard.classList.remove('highlight-card'), 3000); 

                showModal('Tìm Thấy', `Đã tìm thấy: ${foundCard.querySelector('h2').innerText}!`, true);
                searchInput.value = '';
            }, 500); 
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
    if (currentListPage > 3) html += `<span class="page-btn dots">...</span>`;
    
    let start = Math.max(2, currentListPage - 1);
    let end = Math.min(totalPages - 1, currentListPage + 1);
    if (currentListPage === 1) end = Math.min(4, totalPages - 1);
    if (currentListPage === totalPages) start = Math.max(2, totalPages - 3);
    
    for (let i = start; i <= end; i++) {
        html += `<button class="page-btn ${currentListPage === i ? 'active' : ''}" onclick="loadListPage(${i})">${i}</button>`;
    }
    if (currentListPage < totalPages - 2) html += `<span class="page-btn dots">...</span>`;
    if (totalPages > 1) html += `<button class="page-btn ${currentListPage === totalPages ? 'active' : ''}" onclick="loadListPage(${totalPages})">${totalPages}</button>`;
    
    const nextClass = currentListPage === totalPages ? 'disabled' : '';
    html += `<button class="page-btn ${nextClass}" onclick="if(currentListPage < totalPages) loadListPage(currentListPage + 1)"><i class="fa-solid fa-angle-right"></i></button>`;
    paginationContainer.innerHTML = html;
}

// --- 8. HỆ THỐNG CHUYỂN TAB ---
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(targetId) {
    closeMenu(); showLoader(); 
    setTimeout(() => {
        tabContents.forEach(tab => tab.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.getElementById(targetId).classList.add('active');
        const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if(activeLink) activeLink.classList.add('active-link');
        
        if(targetId === 'list-tab') {
            if (currentListPage === 1) loadListPage(1);
            else { hideLoader(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
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
