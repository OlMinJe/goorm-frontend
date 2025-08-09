export const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
export const GAME_STATUS_LABEL = {
  BEFORE: '경기 전',
  LIVE: '경기 중',
  END: '경기 종료',
  CANCEL: '경기 취소',
};

// =============== fetchSchedule ===============
export async function fetchSchedule() {
  const res = await fetch('./schedule.json');
  if (!res.ok) throw new Error('[Failed] fetch schedule.json 불러오기');
  const { schedule } = await res.json();
  console.log('schedule', schedule['20250806']);
  return schedule;
}
// =============== 요소 생성 ===============
export function createEl(tag, { className, text, html, attrs, children } = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  if (html) el.innerHTML = html;
  if (attrs) for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  if (children) el.append(...children);
  return el;
}

export function teamCell(name, logoUrl, isHome) {
  const teamBox = createEl('div', { className: 'team-box font-size-lg' });
  const teamImg = createEl('img', { attrs: { src: logoUrl, alt: `${name} 로고` } });
  const teamText = createEl('span', { text: name });

  if (isHome) teamBox.append(teamImg, teamText); // 홈팀: 로고 먼저
  else teamBox.append(teamText, teamImg); // 원정팀: 이름 먼저

  return createEl('td', { children: [teamBox] });
}

export function scoreCell(game) {
  const { gameStatus, awayWlt, homeWlt, awayResult, homeResult } = game;
  const gameStatusText = GAME_STATUS_LABEL[gameStatus] || '';
  const gameStausEl = createEl('span', { className: 'font-size-xs status', text: gameStatusText });

  if (gameStatus === 'END') {
    const awayScore = createEl('span', { className: awayWlt === 'W' ? 'win' : '', text: awayResult ?? '-' });
    const homeScore = createEl('span', { className: homeWlt === 'W' ? 'win' : '', text: homeResult ?? '-' });
    return createEl('td', { className: 'game-score', children: [awayScore, gameStausEl, homeScore] });
  }

  return createEl('td', {
    className: 'game-score',
    children: [createEl('span', { text: '-' }), gameStausEl, createEl('span', { text: '-' })],
  });
}

export function broadcastCell(game) {
  const { gameStatus, op, gameId } = game;
  const broadTd = createEl('td', { className: 'text-center' });

  if (gameStatus === 'CANCEL') {
    broadTd.textContent = '경기취소';
    return broadTd;
  }

  if (op?.vod) {
    const broadBtn = createEl('button', {
      className: 'font-size-sm btn-highlight',
      text: '하이라이트',
      attrs: { type: 'button' },
    });

    const highlightLink = `https://sports.daum.net/match/${gameId}`;
    broadBtn.addEventListener('click', () => (window.location.href = highlightLink));
    broadTd.append(broadBtn);
    return broadTd;
  }

  const broadBtn = createEl('button', {
    className: 'font-size-sm btn-message',
    text: '문자중계',
    attrs: { type: 'button' },
  });
  broadTd.append(broadBtn);
  return broadTd;
}

// =============== 날짜 시간 포맷 (서울 기준) ===============
export const getIsToday = (yyyymmdd) => yyyymmdd === dateToYYYYMMDD(new Date());

export function getMonthDates(baseDate = new Date()) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const last = new Date(year, month + 1, 0).getDate();
  const dates = [];
  for (let day = 1; day <= last; day++) dates.push(dateToYYYYMMDD(new Date(year, month, day)));
  return dates;
}

export function dateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export function formatDateKR(yyyymmdd) {
  const year = Number(yyyymmdd.slice(0, 4));
  const month = Number(yyyymmdd.slice(4, 6));
  const day = Number(yyyymmdd.slice(6, 8));
  const date = new Date(year, month - 1, day);
  const isToday = getIsToday(yyyymmdd);
  const label = isToday ? '오늘' : DAY_NAMES[date.getDay()];

  const wrapper = createEl('span');
  wrapper.append(
    `${month}.${day} `,
    createEl('span', { className: `font-size-sm ${isToday ? 'today' : ''}`, text: label })
  );
  return wrapper;
}

export function formatTime(startTime) {
  const time = String(startTime).match(/^(\d{2})(\d{2})$/);
  const value = time ? `${time[1]}:${time[2]}` : startTime;
  return createEl('span', { className: 'font-size-lg', text: value });
}
