// =============== 요소 생성 유틸 함수 ===============
// 공통 요소 생성
export function createEl({ tag, className, text }) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// 내부 전용: 뱃지 생성
function createBadge(text) {
  const className = `hk-badge${text.includes('불가') ? ' no-reservable' : ''}`;
  return createEl({ tag: 'span', className, text });
}

// 정보 라인 생성
export function createInfoLine(infoData, badgeText = null) {
  const line = createEl({ tag: 'div', className: 'info-line' });

  infoData.forEach(([label, value]) => {
    const box = document.createElement('div');
    if (label) box.appendChild(createEl({ tag: 'span', className: 'label', text: label }));
    box.appendChild(document.createTextNode(value));
    line.appendChild(box);
  });

  if (badgeText) line.appendChild(createBadge(badgeText));
  return line;
}

// 카드 컨테이너 생성
export function createCardContainer(titleText, badgeText = null) {
  const card = createEl({ tag: 'div', className: 'card' });
  const titleBox = createEl({ tag: 'div', className: 'title-box' });

  titleBox.appendChild(createEl({ tag: 'h3', text: titleText }));
  if (badgeText) titleBox.appendChild(createBadge(badgeText));

  card.appendChild(titleBox);
  return card;
}

// =============== 포맷 ===============
// 국내선
export function getFormattedDomesticTitleBox({ airline, flightNumber }) {
  return `${airline} ${flightNumber}`;
}

export function getFormattedDomesticSchedule({ departure, departureTime, arrival, arrivalTime }) {
  return [
    ['출발:', `${departure} - ${departureTime}`],
    ['도착:', `${arrival} - ${arrivalTime}`],
  ];
}

export function getFormattedDomesticInfo({ cabinClass, flightNumber }) {
  return [
    ['좌석:', cabinClass],
    ['항공편:', flightNumber],
  ];
}

// 국제선
export function getFormattedInternationalTitleBox({ depcity, depairport, arrcity, arrairport }) {
  return `${arrcity} (${arrairport}) → ${depcity} (${depairport})`;
}

export function getFormattedInternationalSchedule({ airnm, fltno, depdate, deptm, arrdate, arrtm }) {
  return `✈️ ${airnm} ${fltno} | ${depdate} ${deptm} 출발 → ${arrdate} ${arrtm} 도착`;
}
