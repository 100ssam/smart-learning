/**
 * Smart Learning - 컴활 2급 필기 스피드 OX 퀴즈 애플리케이션
 */

(function () {
  'use strict';

  // 애플리케이션 상태
  const state = {
    allQuestions: [],
    quizList: [],
    currentIndex: 0,
    userAnswers: [], // { question, userChoice, isCorrect }
    currentStreak: 0,
    maxStreak: 0,
    isAnswered: false,
    timerStart: null
  };

  // DOM 요소 캐시
  const elements = {
    // 화면 섹션
    setupScreen: document.getElementById('screen-setup'),
    quizScreen: document.getElementById('screen-quiz'),
    resultScreen: document.getElementById('screen-results'),

    // 폼 컨트롤
    formSetup: document.getElementById('form-setup'),
    btnStart: document.getElementById('btn-start-quiz'),

    // 퀴즈 화면 요소
    qCurrentNum: document.getElementById('q-current-num'),
    qTotalNum: document.getElementById('q-total-num'),
    progressFill: document.getElementById('progress-fill'),
    streakBadge: document.getElementById('streak-indicator'),
    streakCount: document.getElementById('streak-count'),
    subjectTag: document.getElementById('subject-tag'),
    topicTag: document.getElementById('topic-tag'),
    statementCard: document.getElementById('statement-card'),
    statementText: document.getElementById('statement-text'),
    btnO: document.getElementById('btn-o'),
    btnX: document.getElementById('btn-x'),

    // 피드백 박스
    feedbackBox: document.getElementById('feedback-box'),
    feedbackBadge: document.getElementById('feedback-badge'),
    correctionBanner: document.getElementById('correction-banner'),
    correctionText: document.getElementById('correction-text'),
    explanationText: document.getElementById('explanation-text'),
    btnNext: document.getElementById('btn-next-question'),

    // 결과 화면 요소
    statTotal: document.getElementById('stat-total'),
    statCorrect: document.getElementById('stat-correct'),
    statWrong: document.getElementById('stat-wrong'),
    statRate: document.getElementById('stat-rate'),
    statStreak: document.getElementById('stat-streak'),
    wrongListContainer: document.getElementById('wrong-list-container'),
    wrongItemsList: document.getElementById('wrong-items-list'),
    btnRetryWrong: document.getElementById('btn-retry-wrong'),
    btnRestart: document.getElementById('btn-restart')
  };

  // 초기화
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    if (typeof OX_QUESTION_BANK === 'undefined' || !Array.isArray(OX_QUESTION_BANK)) {
      alert('문제은행 데이터를 불러올 수 없습니다.');
      return;
    }
    state.allQuestions = OX_QUESTION_BANK;

    bindEvents();
  }

  function bindEvents() {
    // 시작 버튼
    elements.btnStart.addEventListener('click', startQuiz);

    // O / X 버튼
    elements.btnO.addEventListener('click', () => handleChoice('O'));
    elements.btnX.addEventListener('click', () => handleChoice('X'));

    // 다음 문제 버튼
    elements.btnNext.addEventListener('click', nextQuestion);

    // 다시 시작 & 오답 다시 풀기
    elements.btnRestart.addEventListener('click', resetToSetup);
    elements.btnRetryWrong.addEventListener('click', retryWrongQuestions);

    // 키보드 단축키
    document.addEventListener('keydown', handleKeydown);
  }

  /**
   * 퀴즈 시작
   */
  function startQuiz(e) {
    if (e) e.preventDefault();

    const subjectVal = document.querySelector('input[name="subject"]:checked').value;
    const countVal = document.querySelector('input[name="count"]:checked').value;

    // 1. 과목 필터링
    let filtered = [];
    if (subjectVal === 'all') {
      filtered = [...state.allQuestions];
    } else {
      const subId = parseInt(subjectVal, 10);
      filtered = state.allQuestions.filter(q => q.subjectId === subId);
    }

    // 2. 무작위 셔플 (Fisher-Yates)
    shuffleArray(filtered);

    // 3. 문항 수 제한
    if (countVal !== 'all') {
      const limit = parseInt(countVal, 10);
      filtered = filtered.slice(0, limit);
    }

    if (filtered.length === 0) {
      alert('선택하신 조건에 해당하는 문제가 없습니다.');
      return;
    }

    state.quizList = filtered;
    state.currentIndex = 0;
    state.userAnswers = [];
    state.currentStreak = 0;
    state.maxStreak = 0;
    state.timerStart = Date.now();

    // 화면 전환
    elements.setupScreen.classList.add('hidden');
    elements.resultScreen.classList.add('hidden');
    elements.quizScreen.classList.remove('hidden');

    renderQuestion();
  }

  /**
   * 문제 렌더링
   */
  function renderQuestion() {
    const q = state.quizList[state.currentIndex];
    const total = state.quizList.length;
    const currentNum = state.currentIndex + 1;

    state.isAnswered = false;

    // 진행 상태 표시
    elements.qCurrentNum.textContent = currentNum;
    elements.qTotalNum.textContent = `/ ${total}`;
    elements.progressFill.style.width = `${((currentNum - 1) / total) * 100}%`;

    // 콤보 표시
    updateStreakDisplay();

    // 문제 내용
    elements.subjectTag.textContent = q.subjectName;
    elements.topicTag.textContent = q.topic;
    elements.statementText.textContent = q.statement;

    // 카드 스타일 초기화
    elements.statementCard.classList.remove('correct-anim', 'wrong-anim');

    // O/X 버튼 초기화
    elements.btnO.disabled = false;
    elements.btnX.disabled = false;
    elements.btnO.classList.remove('selected');
    elements.btnX.classList.remove('selected');

    // 피드백 박스 숨김
    elements.feedbackBox.classList.remove('show');
  }

  /**
   * O 또는 X 선택 처리
   */
  function handleChoice(choice) {
    if (state.isAnswered) return;
    state.isAnswered = true;

    const q = state.quizList[state.currentIndex];
    const isCorrect = (choice === q.answer);

    // 상태 저장
    state.userAnswers.push({
      question: q,
      userChoice: choice,
      isCorrect: isCorrect
    });

    // 콤보 계산
    if (isCorrect) {
      state.currentStreak += 1;
      if (state.currentStreak > state.maxStreak) {
        state.maxStreak = state.currentStreak;
      }
    } else {
      state.currentStreak = 0;
    }
    updateStreakDisplay();

    // 버튼 선택 표시 및 비활성화
    elements.btnO.disabled = true;
    elements.btnX.disabled = true;
    if (choice === 'O') {
      elements.btnO.classList.add('selected');
    } else {
      elements.btnX.classList.add('selected');
    }

    // 카드 애니메이션
    if (isCorrect) {
      elements.statementCard.classList.add('correct-anim');
    } else {
      elements.statementCard.classList.add('wrong-anim');
    }

    // 피드백 박스 내용 구성
    showFeedback(q, isCorrect);
  }

  /**
   * 피드백 박스 표시
   */
  function showFeedback(question, isCorrect) {
    if (isCorrect) {
      elements.feedbackBadge.className = 'result-badge correct';
      elements.feedbackBadge.innerHTML = '⭕ 정답입니다!';
      elements.correctionBanner.classList.add('hidden');
    } else {
      elements.feedbackBadge.className = 'result-badge wrong';
      elements.feedbackBadge.innerHTML = '❌ 틀렸습니다!';

      if (question.correction) {
        elements.correctionText.textContent = question.correction;
        elements.correctionBanner.classList.remove('hidden');
      } else {
        elements.correctionBanner.classList.add('hidden');
      }
    }

    elements.explanationText.textContent = question.explanation;

    // 다음 문항 버튼 텍스트
    const isLast = (state.currentIndex === state.quizList.length - 1);
    elements.btnNext.innerHTML = isLast
      ? '<span>결과 성적표 확인하기</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>'
      : '<span>다음 문제 풀기 (Space)</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';

    elements.feedbackBox.classList.add('show');
    elements.btnNext.focus();
  }

  /**
   * 다음 문제로 이동 또는 결과 화면
   */
  function nextQuestion() {
    if (!state.isAnswered) return;

    if (state.currentIndex < state.quizList.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
    } else {
      showResults();
    }
  }

  /**
   * 결과 화면 표시
   */
  function showResults() {
    elements.quizScreen.classList.add('hidden');
    elements.resultScreen.classList.remove('hidden');

    const total = state.userAnswers.length;
    const correctCount = state.userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = total - correctCount;
    const rate = Math.round((correctCount / total) * 100);

    // 통계 표시
    elements.statTotal.textContent = total;
    elements.statCorrect.textContent = correctCount;
    elements.statWrong.textContent = wrongCount;
    elements.statRate.textContent = `${rate}%`;
    elements.statStreak.textContent = `🔥 ${state.maxStreak}회`;

    // 오답 리스트 구성
    const wrongAnswers = state.userAnswers.filter(a => !a.isCorrect);
    if (wrongAnswers.length > 0) {
      elements.wrongListContainer.classList.remove('hidden');
      elements.btnRetryWrong.classList.remove('hidden');

      elements.wrongItemsList.innerHTML = wrongAnswers.map((item, idx) => `
        <div class="wrong-item-card">
          <div class="wrong-item-statement">
            ${idx + 1}. [${item.question.subjectName}] ${escapeHtml(item.question.statement)}
          </div>
          <div class="wrong-item-ans">
            나의 선택: ${item.userChoice} / 정답: <strong>${item.question.answer}</strong>
          </div>
          <div class="wrong-item-corr">
            ${item.question.correction ? `👉 <strong>핵심 교정:</strong> ${escapeHtml(item.question.correction)}<br>` : ''}
            💡 ${escapeHtml(item.question.explanation)}
          </div>
        </div>
      `).join('');
    } else {
      elements.wrongListContainer.classList.add('hidden');
      elements.btnRetryWrong.classList.add('hidden');
    }

    // 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * 틀린 문제만 다시 풀기
   */
  function retryWrongQuestions() {
    const wrongQuestions = state.userAnswers.filter(a => !a.isCorrect).map(a => a.question);
    if (wrongQuestions.length === 0) return;

    shuffleArray(wrongQuestions);
    state.quizList = wrongQuestions;
    state.currentIndex = 0;
    state.userAnswers = [];
    state.currentStreak = 0;

    elements.resultScreen.classList.add('hidden');
    elements.quizScreen.classList.remove('hidden');
    renderQuestion();
  }

  /**
   * 처음 설정 화면으로 복귀
   */
  function resetToSetup() {
    elements.resultScreen.classList.add('hidden');
    elements.quizScreen.classList.add('hidden');
    elements.setupScreen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * 콤보 표시 갱신
   */
  function updateStreakDisplay() {
    if (state.currentStreak >= 2) {
      elements.streakCount.textContent = state.currentStreak;
      elements.streakBadge.classList.add('active');
    } else {
      elements.streakBadge.classList.remove('active');
    }
  }

  /**
   * 키보드 단축키
   */
  function handleKeydown(e) {
    // 퀴즈 화면이 활성화되어 있을 때만 동작
    if (elements.quizScreen.classList.contains('hidden')) return;

    // 답변 전
    if (!state.isAnswered) {
      if (e.key === 'o' || e.key === 'O' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleChoice('O');
      } else if (e.key === 'x' || e.key === 'X' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleChoice('X');
      }
    } else {
      // 답변 후 (스페이스바 or 엔터로 다음 문제)
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nextQuestion();
      }
    }
  }

  /**
   * 배열 셔플 (Fisher-Yates)
   */
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();

