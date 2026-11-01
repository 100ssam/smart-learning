/**
 * 컴퓨터활용능력 2급 필기 40문항 정규 CBT 모의고사 애플리케이션
 * 
 * 주요 기능:
 * 1. 과목별(1과목 컴퓨터 일반 20문항, 2과목 스프레드시트 20문항) 무작위 추출 및 셔플 (총 40문항)
 * 2. 40분 카운트다운 타이머 & 시간 종료 시 자동 제출
 * 3. 실수로 새로고침(F5) 시 진행 답안 및 남은 시험 시간 완벽 복구 (localStorage)
 * 4. 제출 전까지 정답 비공개 원칙 준수
 * 5. 제출 후 총점(100점 만점, 문항당 2.5점), 과목별 점수(각 50점 만점), 합격 여부 판정
 * 6. 정답 해설 및 4개 보기별 상세 오답 분석 제공
 * 7. 틀린 문제만 모아보는 오답노트 필터링 & 정답 가린 채 다시 푸는 재도전 모드
 * 8. 무제한 재응시(매 시험 새로운 무작위 문제 출제) 및 이전 응시 기록 보관
 */

(function () {
  'use strict';

  /* ==========================================================================
     상수 및 스토리지 키 정의
     ========================================================================== */
  const STORAGE_KEY_CURRENT = 'com2_cbt_session';   // 현재 진행 중인 시험 세션
  const STORAGE_KEY_HISTORY = 'com2_cbt_history';   // 이전 시험 결과 기록 목록
  const EXAM_TOTAL_SECONDS = 40 * 60;               // 제한 시간: 40분 (2400초, 실제 시험 기준)
  const POINTS_PER_QUESTION = 2.5;                  // 문항당 배점: 2.5점 (총 40문항 = 100점 만점)

  /* ==========================================================================
     애플리케이션 상태 (State)
     ========================================================================== */
  const state = {
    // 수험자 정보
    studentName: '',
    studentId: '',

    // 출제된 20개 문항 객체 배열
    examQuestions: [],

    // 학생의 답안 객체 (키: 0~19 인덱스, 값: 1~4번 선택지)
    answers: {},

    // 현재 화면에 표시 중인 문제 번호 인덱스 (0 ~ 19)
    currentIndex: 0,

    // 남은 시간 (초)
    timeLeft: EXAM_TOTAL_SECONDS,

    // 타이머 인터벌 ID
    timerInterval: null,

    // 시험 시작 타임스탬프
    startTime: null,

    // 현재 채점된 결과 객체 (시험 제출 후 세팅)
    latestResult: null,

    // 오답 다시 풀기 모드 답안 객체 { questionId: selectedOption }
    retryAnswers: {}
  };

  /* ==========================================================================
     DOM 요소 캐싱
     ========================================================================== */
  const elements = {
    // 헤더 컨트롤
    examHeaderControls: document.getElementById('exam-header-controls'),
    displayStudentName: document.getElementById('display-student-name'),
    timerBox: document.getElementById('timer-box'),
    timerDisplay: document.getElementById('timer-display'),
    btnHeaderSubmit: document.getElementById('btn-header-submit'),

    // 화면 섹션들
    screenStart: document.getElementById('screen-start'),
    screenExam: document.getElementById('screen-exam'),
    screenResult: document.getElementById('screen-result'),
    screenWrongRetry: document.getElementById('screen-wrong-retry'),

    // 시작 화면 요소
    formStartExam: document.getElementById('form-start-exam'),
    inputStudentName: document.getElementById('input-student-name'),
    inputStudentId: document.getElementById('input-student-id'),
    btnStartExam: document.getElementById('btn-start-exam'),
    historyContainer: document.getElementById('history-container'),
    btnClearHistory: document.getElementById('btn-clear-history'),

    // 시험 화면 요소
    subjectTabs: document.querySelectorAll('.sub-tab'),
    progressText: document.getElementById('progress-text'),
    progressPercent: document.getElementById('progress-percent'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    qViewNum: document.getElementById('q-view-num'),
    qViewSubject: document.getElementById('q-view-subject'),
    qAnsweredBadge: document.getElementById('q-answered-badge'),
    qViewText: document.getElementById('q-view-text'),
    qViewCodeblock: document.getElementById('q-view-codeblock'),
    qOptionsContainer: document.getElementById('q-options-container'),
    btnPrevQ: document.getElementById('btn-prev-q'),
    btnNextQ: document.getElementById('btn-next-q'),
    qCurrentIndexLabel: document.getElementById('q-current-index-label'),
    omrGrid1: document.getElementById('omr-grid-1'),
    omrGrid2: document.getElementById('omr-grid-2'),
    btnSidebarSubmit: document.getElementById('btn-sidebar-submit'),
    btnMobileSubmit: document.getElementById('btn-mobile-submit'),

    // 모달 팝업 요소
    modalSubmitConfirm: document.getElementById('modal-submit-confirm'),
    modalUnansweredNotice: document.getElementById('modal-unanswered-notice'),
    btnModalCancel: document.getElementById('btn-modal-cancel'),
    btnModalConfirm: document.getElementById('btn-modal-confirm'),

    // 결과 화면 요소
    resStudentHeader: document.getElementById('res-student-header'),
    resDate: document.getElementById('res-date'),
    resTotalScore: document.getElementById('res-total-score'),
    resPassBadge: document.getElementById('res-pass-badge'),
    resSub1Score: document.getElementById('res-sub1-score'),
    resSub1Ratio: document.getElementById('res-sub1-ratio'),
    resSub1Bar: document.getElementById('res-sub1-bar'),
    resSub2Score: document.getElementById('res-sub2-score'),
    resSub2Ratio: document.getElementById('res-sub2-ratio'),
    resSub2Bar: document.getElementById('res-sub2-bar'),
    resCorrectCnt: document.getElementById('res-correct-cnt'),
    resWrongCnt: document.getElementById('res-wrong-cnt'),
    resDuration: document.getElementById('res-duration'),
    btnRetestNew: document.getElementById('btn-retest-new'),
    btnStartWrongRetry: document.getElementById('btn-start-wrong-retry'),
    btnGoHome: document.getElementById('btn-go-home'),
    filterWrongCount: document.getElementById('filter-wrong-count'),
    filterCorrectCount: document.getElementById('filter-correct-count'),
    reviewFilters: document.querySelectorAll('.filter-chip'),
    reviewListContainer: document.getElementById('review-list-container'),

    // 오답 다시 풀기 화면 요소
    retryListContainer: document.getElementById('retry-list-container'),
    btnGradeRetry: document.getElementById('btn-grade-retry'),
    btnExitRetry: document.getElementById('btn-exit-retry')
  };

  /* ==========================================================================
     초기화 및 생명주기 관리
     ========================================================================== */

  /**
   * 애플리케이션 시작 진입점
   * 새로고침 복구 확인 및 이벤트 바인딩
   */
  function initApp() {
    bindEvents();
    renderHistoryTable();

    // 브라우저 새로고침 시 기존 진행 중 시험 복원 검사
    const savedSession = loadSessionFromStorage();
    if (savedSession && savedSession.examActive && savedSession.timeLeft > 0) {
      restoreExamSession(savedSession);
    } else {
      switchScreen('start');
    }
  }

  /**
   * 전역 이벤트 리스너 등록
   */
  function bindEvents() {
    // 시험 시작 버튼
    elements.btnStartExam.addEventListener('click', handleStartExamClick);
    
    // 이전 / 다음 문제 이동 버튼
    elements.btnPrevQ.addEventListener('click', () => navigateQuestion(state.currentIndex - 1));
    elements.btnNextQ.addEventListener('click', () => navigateQuestion(state.currentIndex + 1));

    // 제출 확인 모달 열기
    elements.btnHeaderSubmit.addEventListener('click', openSubmitConfirmModal);
    elements.btnSidebarSubmit.addEventListener('click', openSubmitConfirmModal);
    elements.btnMobileSubmit.addEventListener('click', openSubmitConfirmModal);

    // 모달 액션
    elements.btnModalCancel.addEventListener('click', closeSubmitConfirmModal);
    elements.btnModalConfirm.addEventListener('click', () => {
      closeSubmitConfirmModal();
      submitExam(false);
    });

    // 과목 탭 이동 (1과목 클릭 시 1번, 2과목 클릭 시 21번으로 이동)
    elements.subjectTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        elements.subjectTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        const sub = e.target.dataset.subject;
        if (sub === '1') navigateQuestion(0);
        else if (sub === '2') navigateQuestion(20);
      });
    });

    // 결과 화면 액션 버튼
    elements.btnRetestNew.addEventListener('click', handleRetestNew);
    elements.btnGoHome.addEventListener('click', () => switchScreen('start'));
    elements.btnStartWrongRetry.addEventListener('click', openWrongRetryScreen);

    // 결과 해설 필터 버튼
    elements.reviewFilters.forEach(chip => {
      chip.addEventListener('click', (e) => {
        elements.reviewFilters.forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        const filterType = e.target.dataset.filter;
        filterReviewList(filterType);
      });
    });

    // 오답 다시 풀기 채점 및 복귀
    elements.btnGradeRetry.addEventListener('click', gradeRetryAnswers);
    elements.btnExitRetry.addEventListener('click', () => switchScreen('result'));

    // 기록 전체 삭제
    elements.btnClearHistory.addEventListener('click', handleClearHistory);

    // 키보드 방향키 단축키 지원 (좌우 방향키로 문제 이동)
    window.addEventListener('keydown', (e) => {
      if (!elements.screenExam.classList.contains('active')) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowLeft') {
        navigateQuestion(state.currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        navigateQuestion(state.currentIndex + 1);
      } else if (e.key >= '1' && e.key <= '4') {
        // 숫자 1~4 키로 보기 선택 편의 제공
        selectOption(state.currentIndex, parseInt(e.key, 10));
      }
    });
  }

  /* ==========================================================================
     화면 전환 함수
     ========================================================================= */

  /**
   * 지정된 화면으로 전환
   * @param {'start' | 'exam' | 'result' | 'wrong-retry'} screenName 
   */
  function switchScreen(screenName) {
    elements.screenStart.classList.remove('active');
    elements.screenExam.classList.remove('active');
    elements.screenResult.classList.remove('active');
    elements.screenWrongRetry.classList.remove('active');

    if (screenName === 'start') {
      elements.screenStart.classList.add('active');
      elements.examHeaderControls.classList.add('hidden');
      stopTimer();
      renderHistoryTable();
    } else if (screenName === 'exam') {
      elements.screenExam.classList.add('active');
      elements.examHeaderControls.classList.remove('hidden');
    } else if (screenName === 'result') {
      elements.screenResult.classList.add('active');
      elements.examHeaderControls.classList.add('hidden');
      stopTimer();
    } else if (screenName === 'wrong-retry') {
      elements.screenWrongRetry.classList.add('active');
      elements.examHeaderControls.classList.add('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     문제 추출 및 시험 생성 로직
     ========================================================================= */

  /**
   * 배열 요소를 Fisher-Yates 알고리즘으로 무작위 셔플
   * @param {Array} array 
   * @returns {Array} 셔플된 새 배열
   */
  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /**
   * 문제은행에서 1과목 20문제 + 2과목 20문제를 무작위로 추출하여 총 40문제 생성
   * @returns {Array} 40개의 문제 객체 배열
   */
  function generateRandomExamPaper() {
    if (typeof window.QUESTION_BANK === 'undefined' || !Array.isArray(window.QUESTION_BANK)) {
      alert('문제은행 데이터를 불러올 수 없습니다. js/questions.js 파일을 확인해주세요.');
      return [];
    }

    // 1과목 컴퓨터 일반 문제 추출 (코드 1)
    const subject1All = window.QUESTION_BANK.filter(q => q.subjectCode === 1);
    // 2과목 스프레드시트 일반 문제 추출 (코드 2)
    const subject2All = window.QUESTION_BANK.filter(q => q.subjectCode === 2);

    const subject1Selected = shuffleArray(subject1All).slice(0, 20);
    const subject2Selected = shuffleArray(subject2All).slice(0, 20);

    // 1~20번은 1과목, 21~40번은 2과목으로 순차 배치
    return [...subject1Selected, ...subject2Selected];
  }

  /**
   * 시험 시작 버튼 클릭 핸들러
   */
  function handleStartExamClick() {
    const name = elements.inputStudentName.value.trim();
    const studentId = elements.inputStudentId.value.trim();

    if (!name) {
      alert('성명을 입력해 주세요.');
      elements.inputStudentName.focus();
      return;
    }
    if (!studentId) {
      alert('학번 또는 수험번호를 입력해 주세요.');
      elements.inputStudentId.focus();
      return;
    }

    startNewExam(name, studentId);
  }

  /**
   * 새 시험 시작 처리
   * @param {string} name 
   * @param {string} studentId 
   */
  function startNewExam(name, studentId) {
    const selectedQuestions = generateRandomExamPaper();
    if (selectedQuestions.length < 40) {
      alert('문제가 충분하지 않습니다. (최소 40문제 필요)');
      return;
    }

    // 상태 초기화
    state.studentName = name;
    state.studentId = studentId;
    state.examQuestions = selectedQuestions;
    state.answers = {};
    state.currentIndex = 0;
    state.timeLeft = EXAM_TOTAL_SECONDS;
    state.startTime = Date.now();
    state.latestResult = null;

    // 헤더 학생 정보 업데이트
    elements.displayStudentName.textContent = `${name} (${studentId})`;

    // 스토리지에 진행 세션 저장 (새로고침 대비)
    saveSessionToStorage();

    // 화면 렌더링
    renderOMRGrids();
    renderQuestion(0);
    updateProgressUI();
    
    // 화면 전환 및 타이머 작동 시작
    switchScreen('exam');
    startTimer();
  }

  /**
   * 결과 화면에서 '새로운 문제로 재응시' 클릭 시 처리
   */
  function handleRetestNew() {
    if (confirm('새로운 무작위 40문제로 모의고사를 다시 시작하시겠습니까?')) {
      startNewExam(state.studentName || '학생', state.studentId || '-');
    }
  }

  /* ==========================================================================
     타이머 관리 로직
     ========================================================================= */

  /**
   * 카운트다운 타이머 시작
   */
  function startTimer() {
    stopTimer();
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      state.timeLeft--;

      if (state.timeLeft <= 0) {
        state.timeLeft = 0;
        updateTimerDisplay();
        stopTimer();
        alert('⏰ 제한 시간 40분이 종료되었습니다! 작성된 답안으로 자동 제출됩니다.');
        submitExam(true);
      } else {
        updateTimerDisplay();
        // 5초 단위 또는 1초마다 남은 시간 로컬 스토리지에 동기화
        if (state.timeLeft % 2 === 0) {
          saveSessionToStorage();
        }
      }
    }, 1000);
  }

  /**
   * 카운트다운 타이머 정지
   */
  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  /**
   * 타이머 숫자 및 경고 UI 갱신
   */
  function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    elements.timerDisplay.textContent = formatted;

    // 남은 시간 5분(300초) 이하 시 붉은색 시각 경고
    if (state.timeLeft <= 300) {
      elements.timerBox.classList.add('timer-warning');
    } else {
      elements.timerBox.classList.remove('timer-warning');
    }
  }

  /* ==========================================================================
     문제 및 OMR 렌더링
     ========================================================================= */

  /**
   * 특정 인덱스의 문제를 메인 뷰어에 렌더링
   * @param {number} index (0 ~ 19)
   */
  function renderQuestion(index) {
    if (index < 0 || index >= state.examQuestions.length) return;

    state.currentIndex = index;
    const qData = state.examQuestions[index];
    const qNum = index + 1;

    // 문제 상단 메타 정보 표시
    elements.qViewNum.textContent = `Q. ${String(qNum).padStart(2, '0')}`;
    elements.qViewSubject.textContent = qData.subject;
    elements.qCurrentIndexLabel.textContent = qNum;

    // 미응답 / 응답 완료 배지 상태
    const isAnswered = state.answers.hasOwnProperty(index);
    if (isAnswered) {
      elements.qAnsweredBadge.textContent = '응답 완료';
      elements.qAnsweredBadge.classList.add('answered');
    } else {
      elements.qAnsweredBadge.textContent = '미응답';
      elements.qAnsweredBadge.classList.remove('answered');
    }

    // 지문 텍스트
    elements.qViewText.textContent = qData.question;

    // 코드 블록 또는 수식이 있는 경우 표시
    if (qData.codeBlock) {
      elements.qViewCodeblock.textContent = qData.codeBlock;
      elements.qViewCodeblock.classList.remove('hidden');
    } else {
      elements.qViewCodeblock.classList.add('hidden');
    }

    // 4지선다 보기 리스트 렌더링
    elements.qOptionsContainer.innerHTML = '';
    const currentSelectedOption = state.answers[index];

    qData.options.forEach((optText, optIdx) => {
      const optNum = optIdx + 1; // 1, 2, 3, 4
      const isSelected = (currentSelectedOption === optNum);

      const item = document.createElement('div');
      item.className = `option-item ${isSelected ? 'selected' : ''}`;
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');

      item.innerHTML = `
        <input type="radio" name="opt_choice_${index}" class="opt-radio" ${isSelected ? 'checked' : ''} aria-label="보기 ${optNum}번">
        <span class="opt-num">${optNum}</span>
        <span class="opt-text">${optText}</span>
      `;

      // 클릭 시 해당 보기 선택
      item.addEventListener('click', () => {
        selectOption(index, optNum);
      });

      elements.qOptionsContainer.appendChild(item);
    });

    // 이전/다음 버튼 비활성화 상태 제어
    elements.btnPrevQ.disabled = (index === 0);
    elements.btnNextQ.disabled = (index === state.examQuestions.length - 1);

    // OMR 시트의 활성 셀 강조 업데이트
    updateOMRActiveCell();

    // 상단 과목 탭 활성화 상태 동기화
    elements.subjectTabs.forEach(tab => {
      const sub = tab.dataset.subject;
      if (sub === 'all') tab.classList.remove('active');
      else if (sub === '1') tab.classList.toggle('active', index < 20);
      else if (sub === '2') tab.classList.toggle('active', index >= 20);
    });
  }

  /**
   * 특정 문제로 이동
   * @param {number} targetIndex 
   */
  function navigateQuestion(targetIndex) {
    if (targetIndex >= 0 && targetIndex < state.examQuestions.length) {
      renderQuestion(targetIndex);
    }
  }

  /**
   * 답안 선택 처리
   * @param {number} questionIndex 문항 인덱스 (0~39)
   * @param {number} optionNumber 선택한 보기 번호 (1~4)
   */
  function selectOption(questionIndex, optionNumber) {
    state.answers[questionIndex] = optionNumber;

    // 로컬 스토리지에 즉시 저장
    saveSessionToStorage();

    // UI 동기화
    renderQuestion(questionIndex);
    updateOMRCell(questionIndex);
    updateProgressUI();
  }

  /**
   * OMR 그리드 최초 생성 (1과목 1~20번, 2과목 21~40번)
   */
  function renderOMRGrids() {
    elements.omrGrid1.innerHTML = '';
    elements.omrGrid2.innerHTML = '';

    state.examQuestions.forEach((q, idx) => {
      const qNum = idx + 1;
      const cell = document.createElement('div');
      cell.className = 'omr-cell';
      cell.id = `omr-cell-${idx}`;
      cell.setAttribute('title', `${qNum}번 문제로 이동`);

      const chosen = state.answers[idx] || '';
      cell.innerHTML = `
        <span class="q-idx">${qNum}</span>
        <span class="q-choice" id="omr-choice-${idx}">${chosen ? `[${chosen}]` : '-'}</span>
      `;

      if (chosen) cell.classList.add('solved');
      if (idx === state.currentIndex) cell.classList.add('current');

      cell.addEventListener('click', () => {
        navigateQuestion(idx);
      });

      if (idx < 20) {
        elements.omrGrid1.appendChild(cell);
      } else {
        elements.omrGrid2.appendChild(cell);
      }
    });
  }

  /**
   * 특정 OMR 셀의 마킹 상태 업데이트
   * @param {number} index 
   */
  function updateOMRCell(index) {
    const cell = document.getElementById(`omr-cell-${index}`);
    const choiceSpan = document.getElementById(`omr-choice-${index}`);
    if (!cell || !choiceSpan) return;

    const chosen = state.answers[index];
    if (chosen) {
      cell.classList.add('solved');
      choiceSpan.textContent = `[${chosen}]`;
    } else {
      cell.classList.remove('solved');
      choiceSpan.textContent = '-';
    }
  }

  /**
   * 현재 보고 있는 문제 OMR 셀 강조 테두리 변경
   */
  function updateOMRActiveCell() {
    document.querySelectorAll('.omr-cell').forEach((cell, idx) => {
      if (idx === state.currentIndex) {
        cell.classList.add('current');
      } else {
        cell.classList.remove('current');
      }
    });
  }

  /**
   * 답안 작성 진행률 게이지 및 텍스트 갱신
   */
  function updateProgressUI() {
    const answeredCount = Object.keys(state.answers).length;
    const totalCount = state.examQuestions.length || 40;
    const percent = Math.round((answeredCount / totalCount) * 100);

    elements.progressText.textContent = `${answeredCount} / ${totalCount}`;
    elements.progressPercent.textContent = `(${percent}%)`;
    elements.progressBarFill.style.width = `${percent}%`;
  }

  /* ==========================================================================
     제출 및 채점 로직
     ========================================================================= */

  /**
   * 최종 제출 전 미응답 문항 확인 모달 열기
   */
  function openSubmitConfirmModal() {
    const total = state.examQuestions.length;
    const answeredCount = Object.keys(state.answers).length;
    const unansweredCount = total - answeredCount;

    if (unansweredCount > 0) {
      elements.modalUnansweredNotice.innerHTML = `⚠️ 아직 풀지 않은 문제가 <strong>${unansweredCount}문항</strong> 있습니다!`;
      elements.modalUnansweredNotice.classList.remove('hidden');
    } else {
      elements.modalUnansweredNotice.innerHTML = `✅ 40문항 모두 풀이를 완료하셨습니다.`;
      elements.modalUnansweredNotice.classList.remove('hidden');
    }

    elements.modalSubmitConfirm.classList.remove('hidden');
  }

  /**
   * 제출 확인 모달 닫기
   */
  function closeSubmitConfirmModal() {
    elements.modalSubmitConfirm.classList.add('hidden');
  }

  /**
   * 시험 최종 제출 및 자동 채점 실행
   * @param {boolean} isAutoSubmit 시간 종료에 따른 자동 제출 여부
   */
  function submitExam(isAutoSubmit = false) {
    stopTimer();

    // 소요 시간 계산
    const elapsedSeconds = EXAM_TOTAL_SECONDS - state.timeLeft;
    const elapsedMin = Math.floor(elapsedSeconds / 60);
    const elapsedSec = elapsedSeconds % 60;
    const durationText = `${elapsedMin}분 ${elapsedSec}초`;

    // 문항별 채점 분석
    let correctCount = 0;
    let sub1Correct = 0;
    let sub2Correct = 0;

    const questionResults = state.examQuestions.map((q, idx) => {
      const selected = state.answers[idx] !== undefined ? state.answers[idx] : null;
      const isCorrect = (selected === q.answer);

      if (isCorrect) {
        correctCount++;
        if (q.subjectCode === 1) sub1Correct++;
        else if (q.subjectCode === 2) sub2Correct++;
      }

      return {
        index: idx,
        questionId: q.id,
        subject: q.subject,
        subjectCode: q.subjectCode,
        question: q.question,
        options: q.options,
        answer: q.answer,
        userAnswer: selected,
        isCorrect: isCorrect,
        explanation: q.explanation,
        optionExplanations: q.optionExplanations
      };
    });

    const sub1Score = sub1Correct * POINTS_PER_QUESTION; // 만점 50점
    const sub2Score = sub2Correct * POINTS_PER_QUESTION; // 만점 50점
    const totalScore = correctCount * POINTS_PER_QUESTION; // 만점 100점
    const wrongCount = state.examQuestions.length - correctCount;

    // 합격 판정: 총점 60점 이상 & 각 과목 40점 이상(20점 이상)
    const isPassed = (totalScore >= 60) && (sub1Score >= 20) && (sub2Score >= 20);

    const resultData = {
      id: 'res_' + Date.now(),
      dateText: formatCurrentDate(),
      name: state.studentName,
      studentId: state.studentId,
      totalScore,
      sub1Score,
      sub2Score,
      sub1Correct,
      sub2Correct,
      correctCount,
      wrongCount,
      durationText,
      isPassed,
      isAutoSubmit,
      questionResults
    };

    state.latestResult = resultData;

    // 진행 중인 세션 초기화 (시험 완료)
    clearCurrentSessionStorage();

    // 이전 응시 이력 목록에 추가 저장
    saveResultToHistory(resultData);

    // 결과 화면 렌더링
    renderResultScreen(resultData);
    switchScreen('result');
  }

  /* ==========================================================================
     결과 화면 및 해설 렌더링
     ========================================================================= */

  /**
   * 결과 화면 종합 성적표 및 전체 해설 목록 렌더링
   * @param {Object} res 
   */
  function renderResultScreen(res) {
    // 수험생 정보 및 일시
    elements.resStudentHeader.textContent = `${res.name} (${res.studentId}) 수험생의 모의고사 성적표`;
    elements.resDate.textContent = `응시일시: ${res.dateText}`;

    // 총점 및 합격 판정
    elements.resTotalScore.textContent = res.totalScore;
    if (res.isPassed) {
      elements.resPassBadge.textContent = '🎉 최종 합격 (기준 통과)';
      elements.resPassBadge.className = 'pass-badge pass';
    } else {
      let reason = '기준 미달';
      if (res.totalScore >= 60 && (res.sub1Score < 20 || res.sub2Score < 20)) {
        reason = '과락 발생 (과목별 40점 미만)';
      }
      elements.resPassBadge.textContent = `⚠️ 불합격 (${reason})`;
      elements.resPassBadge.className = 'pass-badge fail';
    }

    // 1과목 성적
    elements.resSub1Score.textContent = res.sub1Score;
    const sub1Percent = Math.round((res.sub1Correct / 20) * 100);
    elements.resSub1Ratio.textContent = `정답: ${res.sub1Correct} / 20문항 (${sub1Percent}%)`;
    elements.resSub1Bar.style.width = `${sub1Percent}%`;

    // 2과목 성적
    elements.resSub2Score.textContent = res.sub2Score;
    const sub2Percent = Math.round((res.sub2Correct / 20) * 100);
    elements.resSub2Ratio.textContent = `정답: ${res.sub2Correct} / 20문항 (${sub2Percent}%)`;
    elements.resSub2Bar.style.width = `${sub2Percent}%`;

    // 메타 요약
    elements.resCorrectCnt.textContent = `${res.correctCount}문항`;
    elements.resWrongCnt.textContent = `${res.wrongCount}문항`;
    elements.resDuration.textContent = res.durationText;

    // 필터 카운트 숫자 갱신
    elements.filterWrongCount.textContent = res.wrongCount;
    elements.filterCorrectCount.textContent = res.correctCount;

    // 기본 필터는 '전체'로 세팅
    elements.reviewFilters.forEach(f => f.classList.remove('active'));
    document.getElementById('btn-filter-all').classList.add('active');

    // 문제별 해설 카드 렌더링
    renderReviewCards(res.questionResults);
  }

  /**
   * 20개 문제의 상세 해설 카드 렌더링
   * @param {Array} qResults 
   */
  function renderReviewCards(qResults) {
    elements.reviewListContainer.innerHTML = '';

    qResults.forEach((item, idx) => {
      const qNum = idx + 1;
      const card = document.createElement('div');
      card.className = `review-card ${item.isCorrect ? 'correct' : 'wrong'}`;
      card.dataset.status = item.isCorrect ? 'correct' : 'wrong';

      // 내가 선택한 답안 텍스트
      let myChoiceText = '미응답';
      if (item.userAnswer !== null) {
        myChoiceText = `${item.userAnswer}번. ${item.options[item.userAnswer - 1]}`;
      }

      // 정답 텍스트
      const answerText = `${item.answer}번. ${item.options[item.answer - 1]}`;

      // 각 보기별(①~④) 상세 해설 리스트 생성
      let optExplHtml = '';
      if (Array.isArray(item.optionExplanations)) {
        optExplHtml = item.optionExplanations.map((exp, expIdx) => {
          const optNum = expIdx + 1;
          const isThisCorrect = (optNum === item.answer);
          return `
            <div class="opt-expl-item ${isThisCorrect ? 'is-correct-opt' : 'is-wrong-opt'}">
              ${exp}
            </div>
          `;
        }).join('');
      }

      card.innerHTML = `
        <div class="rc-head">
          <div class="rc-meta">
            <span class="q-badge-num">Q. ${String(qNum).padStart(2, '0')}</span>
            <span class="q-badge-subject">${item.subject}</span>
          </div>
          <div>
            ${item.isCorrect 
              ? '<span class="rc-badge-status pass">⭕ 정답 (2.5점 획득)</span>' 
              : '<span class="rc-badge-status fail">❌ 오답 (0점)</span>'}
          </div>
        </div>

        <h4 class="rc-question">${item.question}</h4>

        <div class="rc-answer-summary">
          <div class="as-item">
            <strong>나의 답안:</strong>
            <span class="as-val ${item.isCorrect ? 'my-correct' : 'my-wrong'}">${myChoiceText}</span>
          </div>
          <div class="as-item">
            <strong>실제 정답:</strong>
            <span class="as-val real-ans">✅ ${answerText}</span>
          </div>
        </div>

        <div class="rc-main-expl">
          <h5>💡 [정답 핵심 해설]</h5>
          <p>${item.explanation}</p>
        </div>

        <div class="rc-option-details">
          <div class="rc-option-details-title">🔍 보기별 상세 분석 (왜 맞고 왜 틀렸는가?)</div>
          <div class="opt-expl-list">
            ${optExplHtml}
          </div>
        </div>
      `;

      elements.reviewListContainer.appendChild(card);
    });
  }

  /**
   * 해설 목록 필터링 (전체 / 오답노트 / 맞힌 문제)
   * @param {'all' | 'wrong' | 'correct'} filterType 
   */
  function filterReviewList(filterType) {
    const cards = elements.reviewListContainer.querySelectorAll('.review-card');
    cards.forEach(card => {
      const status = card.dataset.status;
      if (filterType === 'all') {
        card.style.display = 'block';
      } else if (filterType === 'wrong') {
        card.style.display = (status === 'wrong') ? 'block' : 'none';
      } else if (filterType === 'correct') {
        card.style.display = (status === 'correct') ? 'block' : 'none';
      }
    });
  }

  /* ==========================================================================
     오답 다시 풀기 (정답 가림 모드)
     ========================================================================= */

  /**
   * 오답 다시 풀기 화면 진입
   */
  function openWrongRetryScreen() {
    if (!state.latestResult) return;

    const wrongList = state.latestResult.questionResults.filter(q => !q.isCorrect);
    if (wrongList.length === 0) {
      alert('축하합니다! 틀린 문제가 하나도 없습니다. 100점 만점입니다!');
      return;
    }

    state.retryAnswers = {};
    elements.retryListContainer.innerHTML = '';

    wrongList.forEach((q, rIdx) => {
      const card = document.createElement('div');
      card.className = 'retry-card';
      card.id = `retry-card-${q.questionId}`;

      let optionsHtml = '';
      q.options.forEach((optText, oIdx) => {
        const optNum = oIdx + 1;
        optionsHtml += `
          <label class="option-item" style="cursor: pointer; margin-bottom: 8px;">
            <input type="radio" name="retry_opt_${q.questionId}" value="${optNum}" class="opt-radio">
            <span class="opt-num">${optNum}</span>
            <span class="opt-text">${optText}</span>
          </label>
        `;
      });

      card.innerHTML = `
        <div class="q-header">
          <div class="q-meta-left">
            <span class="q-badge-num">오답 #${rIdx + 1} (원래 Q.${q.index + 1})</span>
            <span class="q-badge-subject">${q.subject}</span>
          </div>
        </div>
        <p class="q-text" style="margin-bottom: 1.25rem;">${q.question}</p>
        <div class="retry-options" style="display:flex; flex-direction:column; gap:8px;">
          ${optionsHtml}
        </div>
        <div class="retry-feedback" id="retry-fb-${q.questionId}"></div>
      `;

      // 라디오 체인지 이벤트
      card.querySelectorAll(`input[name="retry_opt_${q.questionId}"]`).forEach(radio => {
        radio.addEventListener('change', (e) => {
          state.retryAnswers[q.questionId] = parseInt(e.target.value, 10);
        });
      });

      elements.retryListContainer.appendChild(card);
    });

    switchScreen('wrong-retry');
  }

  /**
   * 오답 다시 푼 답안 채점
   */
  function gradeRetryAnswers() {
    if (!state.latestResult) return;

    const wrongList = state.latestResult.questionResults.filter(q => !q.isCorrect);
    let retryCorrectCount = 0;

    wrongList.forEach(q => {
      const fbBox = document.getElementById(`retry-fb-${q.questionId}`);
      if (!fbBox) return;

      const userRetryChoice = state.retryAnswers[q.questionId];
      fbBox.classList.add('show');

      if (userRetryChoice === q.answer) {
        retryCorrectCount++;
        fbBox.className = 'retry-feedback show correct';
        fbBox.innerHTML = `
          <strong>🎉 정답입니다! (선택: ${userRetryChoice}번)</strong>
          <p style="margin-top: 6px; font-size: 0.9rem;">${q.explanation}</p>
        `;
      } else {
        fbBox.className = 'retry-feedback show wrong';
        fbBox.innerHTML = `
          <strong>❌ 다시 풀어도 아쉽게 오답입니다. (내가 고른 답: ${userRetryChoice || '미선택'}번 / 정답: ${q.answer}번)</strong>
          <p style="margin-top: 6px; font-size: 0.9rem;">${q.explanation}</p>
        `;
      }
    });

    alert(`재풀이 완료! 총 ${wrongList.length}문항 중 ${retryCorrectCount}문항을 맞히셨습니다.`);
  }

  /* ==========================================================================
     LocalStorage 상태 저장 및 복원 (새로고침 대비)
     ========================================================================= */

  /**
   * 현재 시험 진행 상태를 localStorage에 저장
   */
  function saveSessionToStorage() {
    try {
      const sessionData = {
        examActive: true,
        studentName: state.studentName,
        studentId: state.studentId,
        questionIds: state.examQuestions.map(q => q.id),
        answers: state.answers,
        currentIndex: state.currentIndex,
        timeLeft: state.timeLeft,
        startTime: state.startTime
      };
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(sessionData));
    } catch (e) {
      console.warn('LocalStorage 저장 실패:', e);
    }
  }

  /**
   * 로컬 스토리지에서 진행 세션 읽기
   */
  function loadSessionFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * 진행 세션 데이터 제거
   */
  function clearCurrentSessionStorage() {
    try {
      localStorage.removeItem(STORAGE_KEY_CURRENT);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * 새로고침 후 이전 진행 세션 복구
   * @param {Object} session 
   */
  function restoreExamSession(session) {
    if (!window.QUESTION_BANK) return;

    // ID 목록으로 질문 객체 복원
    const restoredQuestions = [];
    const questionMap = new Map(window.QUESTION_BANK.map(q => [q.id, q]));

    for (const qId of session.questionIds) {
      if (questionMap.has(qId)) {
        restoredQuestions.push(questionMap.get(qId));
      }
    }

    if (restoredQuestions.length < 40) {
      clearCurrentSessionStorage();
      switchScreen('start');
      return;
    }

    state.studentName = session.studentName || '학생';
    state.studentId = session.studentId || '-';
    state.examQuestions = restoredQuestions;
    state.answers = session.answers || {};
    state.currentIndex = session.currentIndex || 0;
    state.timeLeft = Math.max(1, session.timeLeft || EXAM_TOTAL_SECONDS);
    state.startTime = session.startTime || Date.now();

    elements.displayStudentName.textContent = `${state.studentName} (${state.studentId})`;

    renderOMRGrids();
    renderQuestion(state.currentIndex);
    updateProgressUI();

    switchScreen('exam');
    startTimer();
  }

  /* ==========================================================================
     시험 결과 히스토리 관리 (LocalStorage)
     ========================================================================= */

  /**
   * 이전 시험 이력 불러오기
   * @returns {Array}
   */
  function getHistoryFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * 시험 결과 한 건을 이력에 추가 저장
   * @param {Object} resultData 
   */
  function saveResultToHistory(resultData) {
    try {
      const history = getHistoryFromStorage();
      // 가벼운 메타 데이터만 추출하여 저장 (용량 절약)
      const compactItem = {
        id: resultData.id,
        date: resultData.dateText,
        name: resultData.name,
        studentId: resultData.studentId,
        totalScore: resultData.totalScore,
        sub1Score: resultData.sub1Score,
        sub2Score: resultData.sub2Score,
        correctCount: resultData.correctCount,
        duration: resultData.durationText,
        isPassed: resultData.isPassed
      };

      history.unshift(compactItem); // 최신순 맨 앞 삽입
      if (history.length > 20) history.pop(); // 최대 20회 보관

      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('시험 이력 저장 실패:', e);
    }
  }

  /**
   * 시작 화면의 응시 이력 테이블 렌더링
   */
  function renderHistoryTable() {
    const history = getHistoryFromStorage();

    if (!history || history.length === 0) {
      elements.historyContainer.innerHTML = `
        <div class="empty-history">
          아직 응시한 모의고사 기록이 없습니다. 성명과 학번을 입력하고 모의고사를 시작해보세요!
        </div>
      `;
      return;
    }

    let rowsHtml = '';
    history.forEach((item, idx) => {
      const passTag = item.isPassed 
        ? '<span class="text-success" style="font-weight:700;">합격</span>' 
        : '<span class="text-danger" style="font-weight:700;">불합격</span>';

      rowsHtml += `
        <tr>
          <td>${idx + 1}회차</td>
          <td>${item.date}</td>
          <td>${item.name} (${item.studentId})</td>
          <td><strong style="color:var(--blue-600);">${item.totalScore}점</strong></td>
          <td>${item.sub1Score}점 / 50</td>
          <td>${item.sub2Score}점 / 50</td>
          <td>${item.correctCount} / 40</td>
          <td>${passTag}</td>
        </tr>
      `;
    });

    elements.historyContainer.innerHTML = `
      <table class="history-table">
        <thead>
          <tr>
            <th>회차</th>
            <th>응시 일시</th>
            <th>수험자</th>
            <th>총점</th>
            <th>1과목</th>
            <th>2과목</th>
            <th>정답수</th>
            <th>결과</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  }

  /**
   * 응시 이력 초기화
   */
  function handleClearHistory() {
    if (confirm('저장된 모든 모의고사 응시 기록을 삭제하시겠습니까?')) {
      try {
        localStorage.removeItem(STORAGE_KEY_HISTORY);
        renderHistoryTable();
      } catch (e) {
        console.warn(e);
      }
    }
  }

  /**
   * 날짜 포맷팅 헬퍼 (YYYY. MM. DD HH:mm)
   */
  function formatCurrentDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${y}.${m}.${d} ${hh}:${mm}`;
  }

  // DOM 로드 완료 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();

