import { useContext } from 'react'

import { ThemeContext } from '@/context/ThemeContext'

export default function Home() {
  const theme = useContext(ThemeContext)
  return (
    <div>
      <div>현재 테마는 {theme}입니다.</div>
      <div>
        <h1 className="sr-only">프론트엔드 이민제 프로필</h1>

        <div className="grid grid-cols-[1fr_2fr] gap-2 grid-flow-dense">
          {/* profile */}
          <section className="col-span-1 row-span-4" aria-label="사용자 프로필">
            <h2 className="bg-white">프로필</h2>
            {/* profile-image-wrapper */}
            <div className="">
              <img className="" src="image/profile_img.jpg" alt="프로필 사진" />
              <p className="">이민제(LEE MINJE)</p>
            </div>
            {/* content */}
            <div className="">
              <ul className="mb-8">
                <li>
                  <i className="fa-solid fa-briefcase" />
                  프론트엔드 개발자
                </li>
                <li>
                  <i className="fa-solid fa-house" />
                  경기도 부천시
                </li>
                <li>
                  <i className="fa-solid fa-envelope" />
                  <a href="mailto:ol.minje@gmail.com">ol.minje@gmail.com</a>
                </li>
                <li>
                  <i className="fa-solid fa-phone" />
                  010-9037-5766
                </li>
              </ul>
              <hr className="mb-8" />
              {/* progressbar */}
              <div>
                <h3>
                  <i className="fa-solid fa-vials" />
                  Skills
                </h3>
                <div className="">
                  <h4 id="skill-html-css">HTML/CSS</h4>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-labelledby="skill-html-css"
                    aria-valuenow="90"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value="90"
                  >
                    <div className="progress" data-text="90%">
                      <img src="image/logo_html.png" alt="html icon" />
                      <img src="image/logo_css.png" alt="css icon" />
                    </div>
                  </div>
                  <h4 id="skill-javascript">Javascript</h4>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-labelledby="skill-javascript"
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value="80"
                  >
                    <div className="progress" data-text="80%">
                      <img src="image/logo_js.png" alt="Javascript icon" />
                    </div>
                  </div>
                  <h4 id="skill-typescript">Typescript</h4>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-labelledby="skill-typescript"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value="60"
                  >
                    <div className="progress" data-text="60%">
                      <img src="image/logo_ts.png" alt="Typescript icon" />
                    </div>
                  </div>
                  <h4 id="skill-react">React</h4>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-labelledby="skill-react"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value="60"
                  >
                    <div className="progress" data-text="60%">
                      <img src="image/logo_react.png" alt="react icon" />
                    </div>
                  </div>
                  <h4 id="skill-vue">Vue</h4>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-labelledby="skill-vue"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value="50"
                  >
                    <div className="progress" data-text="50%">
                      <img src="image/logo_vue.png" alt="react icon" />
                    </div>
                  </div>
                </div>
                <br />
                <h3>
                  <i className="fa-solid fa-earth-asia" />
                  Languages
                </h3>
                <div className="progressbar_box">
                  <h4 id="language-ko">한국어</h4>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-labelledby="language-ko"
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value="80"
                  >
                    <div className="progress" data-text="80%" />
                  </div>
                  <h4 id="language-en">영어</h4>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-labelledby="language-en"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value="20"
                  >
                    <div className="progress" data-text="20%" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* introduce */}
          <section className="col-span-1 row-span-3">
            <h2>
              <i className="fa-solid fa-user" />
              Introduce
            </h2>
            <div className="">
              <div className="">
                <div className="">
                  <p>
                    하루에 1개의 개발 주제를 만들어 나아가기 위해 버전 관리를 중요시하는 프론트엔드
                    엔지니어 이민제 입니다!
                  </p>
                  <span className="">#탐구하는_자세 #노력 #성장</span>
                  <div className="">
                    끊임없는 #탐구하는_자세로 새로운 기술을 배우고,
                    <br />
                    이를 실제 개발에 #노력을 통해 적용합니다.
                    <br />이 과정을 통해 개인적으로도 #성장하고, 더 나아가 프로젝트의 품질 향상에도
                    기여합니다.
                  </div>
                </div>
                <h3>개발Lo_Goal때림</h3>
                <ul>
                  <li>
                    <i className="fa-solid fa-pencil" />
                    <b>기록</b>하는 개발자
                  </li>
                  <li>
                    <i className="fa-solid fa-person-running" />
                    <b>목적지</b>를 향해 달려가는 개발자
                  </li>
                  <li>
                    <i className="fa-solid fa-bullseye" />
                    기록과 탐구를 <b>꾸준히 실천</b>하여 최종 <b>Goal</b>을 넣는 개발자
                  </li>
                </ul>
                <div className="">
                  <img src="https://ghchart.rshah.org/olminje" alt="깃허브 활동 히트맵" />
                </div>
              </div>
              <hr />

              <div className="">
                <h3>프론트엔드 개발자가 되기로 결심한 이유</h3>
                <div className="">
                  <p>
                    사실 저는 개발자를 꿈꾼 게 대학 입학 전부터였어요.
                    <br />
                    그럼에도 불구하고 <b>“왜 프론트엔드 개발자인가”</b>에 대해 고민한 시점이
                    있었습니다.
                  </p>
                </div>
                <div className="">
                  학교 생활 중 다양한 프로그래밍 수업과 공모전에 참여하면서 가장 즐거웠던 순간은
                  <br />
                  웹 개발의 시각적인 매력을 느낄 때였습니다.
                  <br />그 후 웹의 본질을 공부하며 자연스럽게 프론트엔드 개발자를 꿈꾸게 되었습니다.
                </div>
                <div className="">
                  <p>
                    <b>Q. “시각적 특성”</b>은 알겠는데, 정확히 뭘 보고 그렇게 빠진 거야?
                  </p>
                </div>
                <div className="">
                  자바스크립트를 기반으로 한 다양한 라이브러리와 프레임워크의 유연함과 가능성에
                  매료되었고, 그 안에서 무한히 펼쳐지는 로직과 결과물들을 직접 구현하고 도전하는
                  과정이 너무 즐거웠습니다.
                  <br />이 모든 것들이 저를 이 길로 확실히 이끌었습니다.
                </div>
              </div>
            </div>
          </section>

          {/* career */}
          <section className="col-span-1 row-span-2">
            <h2>
              <i className="fa-solid fa-briefcase" />
              Work Experience
            </h2>
            <div className="">
              <h3>
                Front End Developer / <span>회사주소</span>
              </h3>
              <div className="">
                <h4 className="">
                  <i className="fa-solid fa-calendar-days" />
                  Apr. 2025 - Jun. 2025
                </h4>
                <ul>
                  <li>공통 UI 컨포넌트 버그 수정 및 개발</li>
                  <li>wms 기능 추가되는거 계속 반영햇지</li>
                  <li>cs 버그 수정했지..</li>
                  <li>사용기술: NextJs/VueJS, Typescript, Pinia</li>
                </ul>
              </div>
              <hr />

              <h3>
                Front End Developer / <span>회사주소</span>
              </h3>
              <div className="">
                <h4 className="">
                  <i className="fa-solid fa-calendar-days" />
                  Mar. 2024 - May. 2024 / Nov. 2024 - Feb. 2025
                </h4>
                <ul>
                  <li>스마트 시스템 및 식품 공장 실시간 모니터링 시스템 개발</li>
                  <li>
                    ICT (VOC) 융합 휘발성유기화합물 장거리 상시 감지 예방시스템 모니터링 시스템 개발
                  </li>
                  <li>Unity 기반의 디지털 트윈 관제 시스템 오브젝트 개발?</li>
                  <li>정부 사업 제안서 및 사업계획서 작성</li>
                  <li>사용기술: NextJs/ReactJs, Typescript, Redux, Redux Toolkit</li>
                </ul>
              </div>
              <hr />

              <h3>
                Front End Developer / <span>회사주소</span>
              </h3>
              <div className="">
                <h4 className="">
                  <i className="fa-solid fa-calendar-days" />
                  Mar. 2022 - Jun. 2022
                </h4>
                <ul>
                  <li>내부 프로젝트 사용자 설문 관리 페이지 및 시작 페이지 개발</li>
                  <li>외주 프로젝트 메인 페이지 개발 및 사용자 테스트 수행</li>
                  <li>사용기술: Javascript, JQuery</li>
                </ul>
              </div>
            </div>
          </section>

          {/* education */}
          <section className="col-span-1 row-span-1">
            <h2>
              <i className="fa-solid fa-award" />
              Education
            </h2>
            <div className="">
              <div className="">
                <h3>구름 부트캠프</h3>
                <div>
                  <h4 className="">
                    <i className="fa-solid fa-calendar-days" />
                    Jun. 2025 - <span className="">Current</span>
                  </h4>
                  <p>프론트엔드개발자 과정</p>
                </div>
              </div>
              <div className="">
                <h3>과정</h3>
                <div>
                  <h4 className="">
                    <i className="fa-solid fa-calendar-days" />
                    Jun. 2025 -
                  </h4>
                  <p>학과/,,,</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
