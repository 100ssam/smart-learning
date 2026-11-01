/**
 * 컴퓨터활용능력 2급 필기 핵심 빈출 OX 문제은행 (총 60문항)
 * - 제1과목 컴퓨터 일반: 30문항 (ID: ox_com_01 ~ ox_com_30)
 * - 제2과목 스프레드시트 일반: 30문항 (ID: ox_spr_01 ~ ox_spr_30)
 *
 * 각 문항은 정답(answer: 'O' | 'X'), 상세 해설(explanation),
 * X인 경우 핵심 교정 포인트(correction)를 포함합니다.
 */

const OX_QUESTION_BANK = [
  /* ==========================================================================
     제1과목 : 컴퓨터 일반 (30문항)
     ========================================================================== */
  {
    id: "ox_com_01",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "주기억장치",
    statement: "ROM(Read Only Memory)은 전원이 차단되어도 기록된 데이터가 지워지지 않는 비휘발성 메모리이다.",
    answer: "O",
    explanation: "ROM은 읽기 전용 메모리로 비휘발성이며, 컴퓨터 부팅에 필요한 기본 입출력 시스템(BIOS) 등이 저장됩니다.",
    correction: null
  },
  {
    id: "ox_com_02",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "주기억장치",
    statement: "DRAM은 SRAM보다 접근 속도가 빠르며, 재충전(Refresh) 회로가 필요 없어 주로 캐시 메모리로 사용된다.",
    answer: "X",
    explanation: "재충전 회로가 필요 없고 속도가 빨라 캐시 메모리로 사용되는 것은 SRAM입니다. DRAM은 구조가 단순하고 집적도가 높아 주기억장치에 주로 사용되며 주기적인 재충전이 필요합니다.",
    correction: "DRAM이 아니라 SRAM에 대한 설명입니다. DRAM은 재충전이 필요하고 주기억장치로 쓰입니다."
  },
  {
    id: "ox_com_03",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "기타 메모리",
    statement: "캐시 메모리(Cache Memory)는 CPU(중앙처리장치)와 주기억장치 사이의 속도 차이를 극복하기 위한 고속 메모리이다.",
    answer: "O",
    explanation: "캐시 메모리는 빠른 CPU와 상대적으로 느린 주기억장치 사이의 병목 현상을 줄이기 위해 설치되는 초고속 SRAM 기반 메모리입니다.",
    correction: null
  },
  {
    id: "ox_com_04",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "기타 메모리",
    statement: "가상 메모리(Virtual Memory)는 주기억장치의 속도를 보조기억장치만큼 빠르게 향상시키기 위해 사용하는 기법이다.",
    answer: "X",
    explanation: "가상 메모리는 보조기억장치(하드디스크, SSD)의 일부를 주기억장치처럼 활용하여 '주기억장치의 용량 부족'을 해소하기 위한 기술이지 속도를 빠르게 만드는 것이 아닙니다.",
    correction: "속도 향상이 아니라 주기억장치의 '용량 부족을 해결'하기 위한 기법입니다."
  },
  {
    id: "ox_com_05",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "CPU 구조",
    statement: "프로그램 카운터(PC, Program Counter)는 다음번에 실행할 명령어의 주소를 기억하는 레지스터이다.",
    answer: "O",
    explanation: "프로그램 카운터(PC)는 제어장치 내부의 레지스터로, CPU가 다음에 인출하여 실행할 명령어의 주기억장치 번지(주소)를 저장합니다.",
    correction: null
  },
  {
    id: "ox_com_06",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "CPU 구조",
    statement: "누산기(Accumulator)는 제어장치에 위치하며, 현재 수행 중인 명령어 자체를 임시 보관하는 장치이다.",
    answer: "X",
    explanation: "누산기(AC)는 연산장치(ALU)에 속하며 산술 및 논리 연산의 중간 결과를 일시적으로 저장합니다. 현재 실행 중인 명령어를 기억하는 것은 '명령 레지스터(IR)'입니다.",
    correction: "누산기는 연산의 중간 결과를 저장하는 연산장치 부품입니다. 현재 명령어 보관은 '명령 레지스터(IR)'입니다."
  },
  {
    id: "ox_com_07",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "Windows 운영체제",
    statement: "Windows에서 [Ctrl] + [Shift] + [Esc] 키를 누르면 작업 관리자 창을 즉시 실행할 수 있다.",
    answer: "O",
    explanation: "[Ctrl] + [Shift] + [Esc]는 다른 확인 창을 거치지 않고 작업 관리자를 즉각 여는 대표적인 단축키입니다.",
    correction: null
  },
  {
    id: "ox_com_08",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "Windows 운영체제",
    statement: "Windows 휴지통에 보관된 파일이나 폴더는 복원하지 않고도 더블 클릭하여 즉시 실행하거나 편집할 수 있다.",
    answer: "X",
    explanation: "휴지통에 있는 항목은 바로 실행하거나 수정할 수 없으며, 반드시 [복원]한 뒤 원래 위치나 다른 폴더에서 실행해야 합니다.",
    correction: "휴지통에 있는 파일은 직접 실행할 수 없으며, 반드시 '복원'해야 실행 가능합니다."
  },
  {
    id: "ox_com_09",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "Windows 운영체제",
    statement: "[Shift] 키를 누른 상태에서 파일을 삭제하면 휴지통을 거치지 않고 영구 삭제된다.",
    answer: "O",
    explanation: "[Shift] + [Delete]를 누르면 파일이 휴지통에 들어가지 않고 디스크에서 즉시 영구 삭제됩니다.",
    correction: null
  },
  {
    id: "ox_com_10",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "Windows 운영체제",
    statement: "USB 메모리나 네트워크 드라이브에서 삭제한 파일은 기본적으로 Windows 휴지통에 임시 보관된다.",
    answer: "X",
    explanation: "USB 메모리, 외장 플래시 메모리, 네트워크 드라이브(LAN 공유 폴더) 등에서 삭제한 파일은 휴지통에 들어가지 않고 즉시 영구 삭제됩니다.",
    correction: "USB 및 네트워크 드라이브에서 삭제 시 휴지통에 들어가지 않고 '즉시 영구 삭제'됩니다."
  },
  {
    id: "ox_com_11",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "네트워크 장비",
    statement: "라우터(Router)는 최적의 네트워크 경로를 설정하여 데이터를 목적지까지 전송해 주는 3계층 네트워크 장비이다.",
    answer: "O",
    explanation: "라우터는 서로 다른 네트워크를 연결하며 패킷 전송을 위해 가장 효율적인 경로(Routing Table)를 지정합니다.",
    correction: null
  },
  {
    id: "ox_com_12",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "네트워크 장비",
    statement: "게이트웨이(Gateway)는 신호가 감쇠되었을 때 단순히 원래 신호로 증폭 및 재생해 주는 장비이다.",
    answer: "X",
    explanation: "신호를 단순히 증폭하고 재생하는 장비는 '리피터(Repeater)'입니다. 게이트웨이는 서로 다른 프로토콜 구조를 가진 이종 네트워크 간의 출입구 역할을 수행합니다.",
    correction: "신호 증폭 장비는 '리피터(Repeater)'입니다. 게이트웨이는 다른 프로토콜 간의 통신 통로입니다."
  },
  {
    id: "ox_com_13",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "인터넷 주소",
    statement: "IPv4는 32비트 주소 체계(8비트씩 4부분)이며, 차세대 IPv6는 128비트 주소 체계(16비트씩 8부분)를 가진다.",
    answer: "O",
    explanation: "IPv4는 32비트(10진수 4마디), IPv6는 주소 고갈 문제 해결을 위해 128비트(16진수 8마디)로 대폭 확장되었습니다.",
    correction: null
  },
  {
    id: "ox_com_14",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "인터넷 주소",
    statement: "DNS(Domain Name System)는 컴퓨터의 물리적 MAC 주소를 32비트 IP 주소로 변환해 주는 프로토콜이다.",
    answer: "X",
    explanation: "DNS는 문자로 된 도메인 이름(예: www.naver.com)을 숫자로 된 IP 주소로 변환하는 시스템입니다. MAC 주소를 IP 주소로 바꾸는 것은 RARP/ARP 프로토콜입니다.",
    correction: "DNS는 '영문 도메인 네임'을 '숫자 IP 주소'로 상호 변환해 주는 시스템입니다."
  },
  {
    id: "ox_com_15",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "정보 보안 위협",
    statement: "랜섬웨어(Ransomware)는 사용자 PC의 파일을 무단으로 암호화하여 열지 못하게 한 뒤, 금전을 요구하는 악성코드이다.",
    answer: "O",
    explanation: "랜섬웨어는 중요한 문서나 시스템을 암호화하여 인질로 삼고 해독 대가로 암호화폐나 현금을 요구하는 대표적인 악성코드입니다.",
    correction: null
  },
  {
    id: "ox_com_16",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "정보 보안 위협",
    statement: "스푸핑(Spoofing)은 네트워크 트래픽을 가로채서 몰래 패킷 내용을 엿듣고 도청하는 행위를 의미한다.",
    answer: "X",
    explanation: "네트워크 패킷을 엿듣고 도청하는 행위는 '스니핑(Sniffing)'입니다. '스푸핑(Spoofing)'은 IP나 호스트 이름을 속여 신뢰할 수 있는 정상 사용자인 것처럼 위장하는 기만 공격입니다.",
    correction: "패킷을 엿듣고 가로채는 행위는 '스니핑(Sniffing)'입니다. 스푸핑은 신분을 속이는 위장 공격입니다."
  },
  {
    id: "ox_com_17",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "정보 보안 위협",
    statement: "피싱(Phishing)은 금융기관이나 공공기관을 사칭한 가짜 웹사이트로 사용자를 유인하여 개인정보를 탈취하는 수법이다.",
    answer: "O",
    explanation: "피싱(Private Data + Fishing)은 신뢰할 수 있는 기관을 가장한 이메일이나 웹사이트로 계좌번호, 비밀번호 등을 가로채는 금융 사기 수법입니다.",
    correction: null
  },
  {
    id: "ox_com_18",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "보안 기술",
    statement: "방화벽(Firewall)은 외부의 불법 침입을 차단하는 보안 시스템이지만, 내부 사용자가 저지른 해킹 행위는 막지 못한다.",
    answer: "O",
    explanation: "방화벽은 외부 인터넷망과 내부 네트워크 경계에서 패킷을 필터링하므로, 내부 사용자의 불법적인 행동이나 악의적인 반출은 막기 어렵습니다.",
    correction: null
  },
  {
    id: "ox_com_19",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "멀티미디어",
    statement: "비트맵(Bitmap) 이미지는 픽셀 단위로 색상을 저장하므로, 이미지를 크게 확대해도 계단 현상이 전혀 발생하지 않는다.",
    answer: "X",
    explanation: "비트맵 이미지는 확대 시 가장자리에 계단 현상(깨짐 현상)이 발생합니다. 확대를 해도 깨지지 않는 방식은 수학적 좌표로 표현되는 '벡터(Vector)' 이미지입니다.",
    correction: "비트맵은 확대 시 계단 현상(깨짐)이 발생합니다. 확대해도 깨지지 않는 것은 '벡터' 방식입니다."
  },
  {
    id: "ox_com_20",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "멀티미디어",
    statement: "JPEG 파일 형식은 24비트 트루컬러(약 1,670만 색)를 지원하여 고화질 사진 압축에 주로 쓰이지만, 애니메이션 기능은 지원하지 않는다.",
    answer: "O",
    explanation: "JPEG는 사진 압축에 매우 탁월하지만 단일 프레임 형식으로 애니메이션을 지원하지 않습니다. 애니메이션과 투명 배경을 지원하는 대표적 포맷은 GIF(256색)와 PNG입니다.",
    correction: null
  },
  {
    id: "ox_com_21",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "멀티미디어",
    statement: "GIF 형식은 최대 24비트의 다양한 색상을 표현할 수 있어 풍부한 색감의 고해상도 예술 사진 압축에 주로 이용된다.",
    answer: "X",
    explanation: "GIF는 최대 8비트(256색)까지만 표현할 수 있어 단순한 로고나 짧은 움짤(애니메이션)에 쓰입니다. 고해상도 사진에는 JPEG나 PNG가 쓰입니다.",
    correction: "GIF는 최대 256색(8비트)까지만 표현할 수 있어 고화질 사진에는 부적합합니다."
  },
  {
    id: "ox_com_22",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "소프트웨어 분류",
    statement: "셰어웨어(Shareware)는 일정 기간 또는 일부 기능을 무료로 사용해 본 뒤, 계속 사용하려면 비용을 지불해야 하는 소프트웨어이다.",
    answer: "O",
    explanation: "셰어웨어는 정식 제품 구매를 유도하기 위해 체험 기간(예: 30일)이나 일부 기능 제한을 둔 상태로 배포되는 소프트웨어입니다.",
    correction: null
  },
  {
    id: "ox_com_23",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "소프트웨어 분류",
    statement: "프리웨어(Freeware)는 상업적 배포 및 소스 코드 무단 수정과 재판매까지 모두 허용되는 완전한 공개 소프트웨어이다.",
    answer: "X",
    explanation: "프리웨어는 '무료 사용'만 허용될 뿐 저작권이 제작자에게 있으며, 소스 코드가 공개되지 않아 무단 수정이나 영리 목적 재판매는 엄격히 금지됩니다.",
    correction: "프리웨어는 무료 사용만 가능하며, 소스 코드 수정이나 상업적 재판매는 허용되지 않습니다."
  },
  {
    id: "ox_com_24",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "PC 관리 및 업그레이드",
    statement: "Windows에서 '디스크 조각 모음(드라이브 최적화)'을 수행하면 전체 하드디스크의 총 저장 용량이 크게 늘어난다.",
    answer: "X",
    explanation: "디스크 조각 모음은 분산되어 저장된 파일의 연속된 공간을 재배치하여 '접근 속도와 효율성'을 향상시키는 작업이지, 디스크의 물리적 용량이 늘어나는 것은 아닙니다.",
    correction: "조각 모음은 접근 속도를 높여주는 것이며 디스크 총 용량이 늘어나지는 않습니다."
  },
  {
    id: "ox_com_25",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "PC 관리 및 업그레이드",
    statement: "SSD(Solid State Drive)는 기계적 모터나 헤드가 없는 플래시 메모리 기반 장치로, HDD보다 충격에 강하고 속도가 빠르며 소음이 없다.",
    answer: "O",
    explanation: "SSD는 반도체 플래시 메모리를 사용하므로 물리적 회전판이 없어 데이터 읽기/쓰기 속도가 압도적으로 빠르고 발열 및 소음이 적습니다.",
    correction: null
  },
  {
    id: "ox_com_26",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "컴퓨터 발전사",
    statement: "에드삭(EDSAC)은 폰 노이만이 제안한 '프로그램 내장 방식'을 세계 최초로 구현한 컴퓨터이다.",
    answer: "O",
    explanation: "프로그램 내장 방식을 최초로 도입하여 완성한 컴퓨터는 1949년 영국의 EDSAC(에드삭)입니다.",
    correction: null
  },
  {
    id: "ox_com_27",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "데이터 통신",
    statement: "전이중(Full Duplex) 통신 방식은 양쪽에서 동시에 송수신을 할 수 있는 방식으로 대표적으로 전화기 통신이 있다.",
    answer: "O",
    explanation: "무전기는 단방향 교대 송수신(반이중, Half Duplex)인 반면, 전화기와 인터넷은 동시에 말하고 들을 수 있는 전이중(Full Duplex) 방식입니다.",
    correction: null
  },
  {
    id: "ox_com_28",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "데이터 통신",
    statement: "라디오 방송과 TV 방송은 정보가 일방향으로만 전달되는 반이중(Half Duplex) 통신의 대표적인 예이다.",
    answer: "X",
    explanation: "라디오와 공중파 TV는 한쪽 방향으로만 데이터가 흐르므로 '단방향(Simplex) 통신'입니다. 반이중은 양방향 통신이 가능하지만 동시에는 안 되는 무전기가 해당합니다.",
    correction: "라디오와 TV 방송은 '단방향(Simplex) 통신'입니다."
  },
  {
    id: "ox_com_29",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "정보 윤리",
    statement: "공공누리(KOGL) 제1유형 저작물은 출처 표시만 하면 상업적 이용 및 변형 창작이 모두 가능하다.",
    answer: "O",
    explanation: "공공누리 제1유형은 '출처표시' 조건만 지키면 상업적 활용과 2차적 저작물 작성이 자유롭게 허용되는 가장 개방적인 공공저작물 라이선스입니다.",
    correction: null
  },
  {
    id: "ox_com_30",
    subjectId: 1,
    subjectName: "컴퓨터 일반",
    topic: "입출력 장치",
    statement: "인터럽트(Interrupt)는 CPU가 프로그램을 실행하는 도중 급작스러운 비상 상황이 발생했을 때 즉시 실행을 중단하고 해당 상황을 처리하는 기술이다.",
    answer: "O",
    explanation: "인터럽트는 전원 이상, 기계 고장, 입출력 완료 등의 사건이 일어났을 때 현재 작업을 잠시 멈추고 우선 처리하는 메커니즘입니다.",
    correction: null
  },

  /* ==========================================================================
     제2과목 : 스프레드시트 일반 (30문항)
     ========================================================================== */
  {
    id: "ox_spr_01",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "데이터 입력 및 편집",
    statement: "엑셀에서 셀에 문자를 입력하면 기본적으로 셀의 왼쪽으로 정렬되고, 숫자를 입력하면 오른쪽으로 정렬된다.",
    answer: "O",
    explanation: "엑셀의 기본 맞춤 서식은 문자는 왼쪽, 숫자는 오른쪽, 논리값(TRUE/FALSE)과 오류값은 가운데 정렬입니다.",
    correction: null
  },
  {
    id: "ox_spr_02",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "데이터 입력 및 편집",
    statement: "하나의 셀 안에서 줄을 바꾸어 두 줄 이상의 텍스트를 입력하려면 [Alt] + [Enter] 키를 누른다.",
    answer: "O",
    explanation: "단순히 [Enter]를 누르면 아래쪽 셀로 이동하며, 셀 내부에서 줄바꿈(개행)을 하려면 [Alt] + [Enter]를 입력해야 합니다.",
    correction: null
  },
  {
    id: "ox_spr_03",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "데이터 입력 및 편집",
    statement: "숫자 1이 입력된 셀의 채우기 핸들을 [Ctrl] 키를 누르지 않고 아래로 드래그하면 1, 2, 3, 4 순으로 1씩 자동 증가한다.",
    answer: "X",
    explanation: "숫자 단일 셀을 그냥 드래그하면 동일한 숫자가 복사됩니다. 1씩 연속 증가 채우기를 하려면 [Ctrl] 키를 누른 채 드래그하거나 두 개 셀을 블록 잡고 드래그해야 합니다.",
    correction: "단일 숫자는 그냥 드래그하면 복사(1, 1, 1...)되며, [Ctrl]을 눌러야 1씩 증가합니다."
  },
  {
    id: "ox_spr_04",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "데이터 입력 및 편집",
    statement: "현재 날짜를 셀에 입력하는 단축키는 [Ctrl] + [;](세미콜론)이고, 현재 시간을 입력하는 단축키는 [Ctrl] + [Shift] + [;](콜론)이다.",
    answer: "O",
    explanation: "[Ctrl] + [;]는 시스템의 현재 날짜를 고정값으로 입력하고, [Ctrl] + [Shift] + [;]는 현재 시각을 즉시 입력합니다.",
    correction: null
  },
  {
    id: "ox_spr_05",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "셀 참조",
    statement: "수식에서 $A$1과 같은 참조는 절대 참조로서, 수식을 다른 셀로 복사해도 행과 열의 주소가 절대 변하지 않는다.",
    answer: "O",
    explanation: "열 문자 앞과 행 번호 앞에 모두 $ 기호가 붙은 참조는 절대 참조로, 수식 복사 위치에 관계없이 언제나 특정 셀 고정 위치를 가리킵니다.",
    correction: null
  },
  {
    id: "ox_spr_06",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "셀 참조",
    statement: "수식 입력 줄에서 셀 주소를 입력한 후 [F2] 키를 누르면 상대 참조, 절대 참조, 혼합 참조 순서로 참조 형태가 순환 전환된다.",
    answer: "X",
    explanation: "참조 방식을 A1 → $A$1 → A$1 → $A1 순으로 순환 변경하는 기능 키는 [F4] 키입니다. [F2] 키는 현재 셀을 편집 상태로 만드는 단축키입니다.",
    correction: "참조 방식을 전환하는 단축키는 [F4] 키입니다. [F2]는 셀 편집 키입니다."
  },
  {
    id: "ox_spr_07",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "수식 오류",
    statement: "#DIV/0! 오류는 수식에서 특정 숫자를 0 또는 빈 셀로 나누려고 시도했을 때 나타나는 오류이다.",
    answer: "O",
    explanation: "수학적으로 어떤 수를 0으로 나눌 수 없으므로 엑셀은 0으로 나누기 연산 시 #DIV/0!(Divide by Zero) 오류를 표시합니다.",
    correction: null
  },
  {
    id: "ox_spr_08",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "수식 오류",
    statement: "#NAME? 오류는 수식에서 셀을 삭제하여 유효하지 않은 셀 참조 위치를 참조할 때 주로 발생하는 오류이다.",
    answer: "X",
    explanation: "참조하던 셀이 삭제되었을 때 나타나는 오류는 '#REF!' 오류입니다. '#NAME?' 오류는 함수 이름을 오타 냈거나 따옴표 없는 문자를 인식하지 못할 때 발생합니다.",
    correction: "참조 셀 삭제 시 나타나는 오류는 '#REF!'입니다. '#NAME?'은 함수명 오타 시 발생합니다."
  },
  {
    id: "ox_spr_09",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "수식 오류",
    statement: "셀에 ###이 표시되는 것은 열의 너비가 좁아서 숫자나 날짜를 모두 표시하지 못할 때 주로 발생한다.",
    answer: "O",
    explanation: "열 너비가 셀에 들어있는 숫자값의 자릿수보다 좁으면 ###으로 표시되며, 열 경계선을 더블 클릭하여 열 너비를 넓혀주면 정상 수치가 보입니다.",
    correction: null
  },
  {
    id: "ox_spr_10",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "함수 활용",
    statement: "수식 =SUM(10, 20, TRUE)의 결과값은 논리값 TRUE가 1로 계산되어 31이 반환된다.",
    answer: "O",
    explanation: "SUM 함수의 인수로 논리값 TRUE를 직접 입력하면 수치 1로 변환(FALSE는 0)되어 10 + 20 + 1 = 31이 됩니다.",
    correction: null
  },
  {
    id: "ox_spr_11",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "함수 활용",
    statement: "COUNT 함수는 범위 내의 빈 셀을 포함하여 모든 문자열과 숫자가 들어있는 셀의 개수를 센다.",
    answer: "X",
    explanation: "COUNT 함수는 오직 '숫자'가 입력된 셀의 개수만 셉니다. 비어있지 않은 모든 셀(문자 포함)의 개수를 세는 함수는 'COUNTA' 함수입니다.",
    correction: "COUNT는 '숫자' 셀만 셉니다. 문자를 포함한 개수는 'COUNTA' 함수를 써야 합니다."
  },
  {
    id: "ox_spr_12",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "함수 활용",
    statement: "수식 =AVERAGEA(10, 20, \"텍스트\", TRUE)에서 \"텍스트\"는 0으로, TRUE는 1로 계산된다.",
    answer: "O",
    explanation: "AVERAGEA 함수는 범위 내의 문자열을 0, 논리값 TRUE는 1, FALSE는 0으로 취급하여 총 개수로 나누어 평균을 계산합니다.",
    correction: null
  },
  {
    id: "ox_spr_13",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "함수 활용",
    statement: "수식 =INT(-3.7)의 결과값은 소수점을 단순 버림하여 -3이 된다.",
    answer: "X",
    explanation: "INT 함수는 해당 수보다 크지 않은 '가장 가까운 작은 정수'를 구하므로 -3.7의 경우 -3이 아니라 더 작은 정수인 -4가 됩니다.",
    correction: "INT(-3.7)의 결과는 -4입니다. (주어진 수보다 크지 않은 정수로 내림)"
  },
  {
    id: "ox_spr_14",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "함수 활용",
    statement: "수식 =MOD(17, 5)의 결과값은 몫인 3이 반환된다.",
    answer: "X",
    explanation: "MOD 함수는 나눗셈의 '나머지'를 구하는 함수이므로 17을 5로 나눈 나머지인 2가 반환됩니다. 몫을 구하는 함수는 QUOTIENT입니다.",
    correction: "MOD는 나머지를 구하는 함수이므로 결과값은 2입니다. 몫을 구하는 함수는 QUOTIENT입니다."
  },
  {
    id: "ox_spr_15",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "함수 활용",
    statement: "수식 =ROUND(125.678, 1)의 결과는 소수점 둘째 자리에서 반올림하여 125.7이 된다.",
    answer: "O",
    explanation: "ROUND(값, 1)은 소수점 이하 1자리까지만 남기도록 소수점 둘째 자리에서 반올림하므로 125.7이 맞습니다.",
    correction: null
  },
  {
    id: "ox_spr_16",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "찾기/참조 함수",
    statement: "VLOOKUP 함수는 참조 표의 첫 번째 행에서 특정 기준값을 검색하여 일치하는 값을 찾아온다.",
    answer: "X",
    explanation: "참조 표의 첫 번째 '열(세로)'에서 값을 찾는 것은 VLOOKUP(Vertical Lookup)이고, 첫 번째 '행(가로)'에서 찾는 것은 HLOOKUP(Horizontal Lookup)입니다.",
    correction: "첫 번째 열에서 찾는 함수는 VLOOKUP이며, 첫 번째 '행'에서 찾는 함수는 HLOOKUP입니다."
  },
  {
    id: "ox_spr_17",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "찾기/참조 함수",
    statement: "VLOOKUP 함수에서 마지막 인수 Range_lookup을 FALSE 또는 0으로 지정하면 정확하게 일치하는 값을 찾는다.",
    answer: "O",
    explanation: "VLOOKUP의 4번째 인수가 TRUE(또는 1, 생략)이면 근사값(오름차순 정렬 필요), FALSE(또는 0)이면 완전히 정확히 일치하는 값을 찾습니다.",
    correction: null
  },
  {
    id: "ox_spr_18",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "조건부 서식",
    statement: "조건부 서식에서 지정한 조건이 만족될 때 글꼴, 글자색, 테두리뿐만 아니라 셀의 글꼴 크기도 자유롭게 변경할 수 있다.",
    answer: "X",
    explanation: "조건부 서식에서는 글꼴 스타일(굵게, 기울임꼴), 글꼴 색, 밑줄, 셀 배경색, 테두리는 지정할 수 있지만, '글꼴 종류'와 '글꼴 크기'는 변경할 수 없습니다.",
    correction: "조건부 서식에서는 '글꼴 종류'와 '글꼴 크기'를 바꿀 수 없습니다."
  },
  {
    id: "ox_spr_19",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "조건부 서식",
    statement: "조건부 서식에서 여러 개의 규칙이 동시에 일치할 경우, 규칙 관리자 목록의 가장 위에 있는 규칙이 우선순위를 갖는다.",
    answer: "O",
    explanation: "규칙 관리자에서 상단에 위치한 규칙일수록 우선순위가 높으며, 필요시 [위로 이동] 단추로 순서를 바꿀 수 있습니다.",
    correction: null
  },
  {
    id: "ox_spr_20",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "정렬 기능",
    statement: "엑셀에서 오름차순 정렬을 수행할 때 빈 셀(공백 셀)은 항상 가장 마지막(끝)으로 정렬된다.",
    answer: "O",
    explanation: "오름차순이나 내림차순에 관계없이 빈 셀은 언제나 정렬 순서의 맨 마지막에 배치됩니다.",
    correction: null
  },
  {
    id: "ox_spr_21",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "정렬 기능",
    statement: "오름차순 정렬 시 영문자는 대소문자를 구분할 수 없으며, 반드시 숫자가 문자보다 뒤쪽에 정렬된다.",
    answer: "X",
    explanation: "오름차순 정렬 시 숫자 → 문자(한글/영문) → 논리값 → 오류값 → 빈 셀 순서로 정렬되며, 옵션에서 대소문자 구분을 켜면 소문자가 대문자보다 우선합니다.",
    correction: "숫자가 문자보다 앞서 정렬됩니다. (숫자 < 문자 < 논리값 < 오류값 < 빈 셀)"
  },
  {
    id: "ox_spr_22",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "필터 기능",
    statement: "자동 필터(AutoFilter)를 적용하면 조건에 일치하지 않는 행은 완전히 삭제되어 복구할 수 없다.",
    answer: "X",
    explanation: "필터는 조건에 맞지 않는 행을 임시로 '숨기기(Hide)' 처리하는 것이며 데이터가 영구 삭제되는 것이 아닙니다. 필터를 해제하면 원래대로 모두 나타납니다.",
    correction: "데이터가 삭제되는 것이 아니라 조건에 맞지 않는 행이 '숨겨지는' 것입니다."
  },
  {
    id: "ox_spr_23",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "부분합",
    statement: "부분합을 올바르게 계산하기 위해서는 사전에 기준이 되는 그룹화할 항목을 반드시 '정렬'해 두어야 한다.",
    answer: "O",
    explanation: "그룹화할 열이 정렬되어 있지 않으면 그룹별로 묶이지 않고 같은 항목이 여러 번 분산되어 잘못된 계산 결과가 도출됩니다.",
    correction: null
  },
  {
    id: "ox_spr_24",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "피벗 테이블",
    statement: "피벗 테이블 보고서에서 원본 데이터의 값을 수정하면 피벗 테이블에 실시간으로 즉시 자동 반영된다.",
    answer: "X",
    explanation: "피벗 테이블은 원본 데이터가 변경되어도 자동으로 갱신되지 않으며, 반드시 [피벗 테이블 분석] 메뉴에서 [새로 고침(Refresh)]을 클릭해야 반영됩니다.",
    correction: "원본이 바뀌어도 자동 반영되지 않으며, 반드시 [새로 고침]을 눌러야 갱신됩니다."
  },
  {
    id: "ox_spr_25",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "피벗 테이블",
    statement: "피벗 테이블 보고서는 기존 워크시트뿐만 아니라 새 워크시트를 생성하여 배치할 수도 있다.",
    answer: "O",
    explanation: "피벗 테이블 생성 대화상자에서 [새 워크시트] 또는 [기존 워크시트의 특정 위치]를 선택하여 삽입할 수 있습니다.",
    correction: null
  },
  {
    id: "ox_spr_26",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "차트 기능",
    statement: "차트가 선택된 상태에서 원본 데이터의 특정 열을 삭제하면 차트에서도 해당 계열이 자동으로 함께 삭제된다.",
    answer: "O",
    explanation: "차트는 원본 표와 동적으로 연결되어 있으므로 원본에서 행/열이 삭제되면 차트 계열도 즉각 함께 사라집니다.",
    correction: null
  },
  {
    id: "ox_spr_27",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "차트 기능",
    statement: "원형(Pie) 차트는 여러 개의 데이터 계열을 동시에 비교 분석하기에 가장 적합한 3차원 차트이다.",
    answer: "X",
    explanation: "원형 차트는 오직 '단 하나의 데이터 계열'만 표현할 수 있으며 전체에 대한 각 항목의 비율을 볼 때 사용됩니다. 다중 계열 비교에는 꺾은선형이나 묶은 세로 막대형을 써야 합니다.",
    correction: "원형 차트는 '오직 1개의 데이터 계열'만 표현 가능합니다. 다중 계열은 불가합니다."
  },
  {
    id: "ox_spr_28",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "페이지 설정 및 인쇄",
    statement: "페이지 설정의 [시트] 탭에서 '반복할 행'을 설정하면 매 페이지의 상단마다 특정 표 제목 행을 반복 인쇄할 수 있다.",
    answer: "O",
    explanation: "여러 장으로 넘어가는 대량의 표를 인쇄할 때 [반복할 행](예: $1:$1)을 지정하면 2페이지 이후에도 표 머리글이 반복되어 가독성이 유지됩니다.",
    correction: null
  },
  {
    id: "ox_spr_29",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "페이지 설정 및 인쇄",
    statement: "인쇄 미리 보기 상태에서는 셀의 데이터를 직접 클릭하여 수식이나 내용을 편집할 수 있다.",
    answer: "X",
    explanation: "인쇄 미리 보기는 출력 형태와 여백 등을 확인하는 모드로, 셀의 데이터나 수식을 직접 수정할 수는 없습니다. 편집하려면 기본 보기로 돌아가야 합니다.",
    correction: "인쇄 미리 보기 화면에서는 셀 내용을 직접 수정할 수 없습니다."
  },
  {
    id: "ox_spr_30",
    subjectId: 2,
    subjectName: "스프레드시트 일반",
    topic: "매크로",
    statement: "매크로 기록 시 마우스 동작뿐만 아니라 리본 메뉴 클릭이나 단축키 입력 등 사용자의 모든 동작이 VBA 코드로 기록된다.",
    answer: "O",
    explanation: "엑셀 매크로 기록기는 사용자가 수행한 일련의 서식 지정, 데이터 입력, 수식 계산 등의 작업을 Visual Basic for Applications(VBA) 프로시저로 자동 생성해 줍니다.",
    correction: null
  }
];

