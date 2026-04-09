// --- DANH SÁCH LINK QUẢNG CÁO TIKTOK ---
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

// --- HÀM CƠ BẢN ---
const loader = document.getElementById('loader');
const modal = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');

function showLoader() { loader.classList.add('active'); }
function hideLoader() { loader.classList.remove('active'); }

// --- ĐÓNG THÔNG BÁO CHÀO MỪNG + HIỆU ỨNG LOADING ---
function closeWelcomeAlert() {
    document.getElementById('welcomeAlertModal').classList.remove('active');
    showLoader();
    setTimeout(() => {
        hideLoader();
    }, 600); // Vòng quay loading trong 0.6 giây
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

// --- TÍNH NĂNG XEM CHI TIẾT PHIM ---
const movieDetailModal = document.getElementById('movieDetailModal');
const detailTitle = document.getElementById('detailTitle');
const detailPoster = document.getElementById('detailPoster');
const watchNowBtn = document.getElementById('watchNowBtn');

function openMovieDetail(title, linkUrl, imageUrl) {
    detailTitle.innerText = title; 
    detailPoster.style.backgroundImage = `url('${imageUrl}')`;
    
    watchNowBtn.href = linkUrl;
    
    watchNowBtn.onclick = function(e) {
        if(linkUrl === '#') {
            e.preventDefault();
            showModal('Đang Cập Nhật', 'Bộ phim này hiện đang chờ cập nhật Link xem chính thức!');
        }
    };

    movieDetailModal.classList.add('active');
}

function closeMovieDetail() { movieDetailModal.classList.remove('active'); }
movieDetailModal.addEventListener('click', function(e) { if(e.target === movieDetailModal) closeMovieDetail(); });

// --- HÀM TẠO KHUNG PHIM TRÊN WEB (ĐÃ TÍCH HỢP QUẢNG CÁO) ---
function createMovieCard(isNew = false, movieName = "Siêu Phẩm Truyện Gấu Kể", movieLink = "#", imageUrl = "https://i.postimg.cc/nLY9GKJS/IMG-0721.jpg") {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
        ${isNew ? '<div class="badge-new">NEW</div>' : ''}
        <div class="movie-thumbnail">
            <div class="bg-blur" style="background-image: url('${imageUrl}');"></div>
            <div class="update-text"><i class="fa-solid fa-spinner fa-spin"></i> Phim đang cập nhật</div>
        </div>
        <div class="movie-info">
            <h2 class="searchable-title">${movieName}</h2> 
        </div>
    `;
    
    card.addEventListener('click', () => {
        // Lấy một link quảng cáo ngẫu nhiên
        const randomAd = adLinks[Math.floor(Math.random() * adLinks.length)];
        
        // Mở quảng cáo trong Tab mới (New Tab)
        window.open(randomAd, '_blank');
        
        // Đồng thời, mở màn hình hiển thị thông tin phim ở tab hiện tại
        openMovieDetail(movieName, movieLink, imageUrl);
    });
    return card;
}

// --- RENDER DỮ LIỆU ---
const homeGrid = document.getElementById('home-movie-grid');
for (let i = 1; i <= 10; i++) {
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
        
        for (let i = 0; i < 10; i++) {
            listGrid.appendChild(createMovieCard(isPageOne, "Siêu Phẩm Truyện Gấu Kể", "#", "https://i.postimg.cc/nLY9GKJS/IMG-0721.jpg"));
        }
        
        renderPagination();
        hideLoader();
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, 600);
}

// --- TÌM KIẾM THÔNG MINH ---
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

// --- MENU VÀ PHÂN TRANG UI ---
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

// --- HỆ THỐNG ĐIỀU HƯỚNG TABS ---
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

renderPagination(); 
