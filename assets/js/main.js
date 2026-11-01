/**
 * Smart Learning - 메인 포털 스크립트
 * 모바일 메뉴 토글, 카테고리 필터링, 준비 중 콘텐츠 모달 제어
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCategoryFilter();
  initPendingModal();
});

/**
 * 1. 모바일 메뉴 토글
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navDrawer = document.getElementById('mobile-nav-drawer');

  if (!menuBtn || !navDrawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // 메뉴 링크 클릭 시 드로어 자동 닫힘
  const mobileLinks = navDrawer.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 2. 카테고리 필터링 (전체, 모의고사, 퀴즈, 실습, 자료실)
 */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sections = document.querySelectorAll('.category-section');

  if (!filterBtns.length || !sections.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-filter');

      // 활성 버튼 스타일 갱신
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 섹션 표시/숨김
      sections.forEach(section => {
        const sectionCat = section.getAttribute('data-category');
        if (targetCategory === 'all' || sectionCat === targetCategory) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 3. 준비 중 콘텐츠 모달 안내
 */
function initPendingModal() {
  const modal = document.getElementById('pending-modal');
  const modalTitle = document.getElementById('modal-target-title');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const pendingElements = document.querySelectorAll('[data-pending="true"]');

  if (!modal) return;

  // 준비 중 아이템 클릭 시 모달 열기
  pendingElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const title = el.getAttribute('data-content-title') || '해당 콘텐츠';
      if (modalTitle) {
        modalTitle.textContent = title;
      }
      openModal(modal);
    });
  });

  // 닫기 버튼 이벤트
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => closeModal(modal));
  });

  // 배경 오버레이 클릭 시 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // ESC 키 누를 때 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal(modal);
    }
  });
}

function openModal(modal) {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

