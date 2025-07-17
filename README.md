# Front

## 🚗 개요
신세계 I&C 스파로스 아카데미 6기 2차 프로젝트
* ParkMate는 운전자에게 실시간 주차 공간 정보를 제공하고, 주차장 소유주에게는 유휴 공간을 효과적으로 활용할 수 있는 기회를 제공하는 MSA(Microservice Architecture) 기반 주차장 중개 플랫폼입니다.
* 사용자/호스트 서비스를 분리하지 않는 모노레포 형식을 채택하여 TurboRepo를 기반으로 user와 host를 관리하고 있습니다.
* 프로젝트 전체의 readme를 원하시면 [이곳](https://github.com/3-park-mate)으로 이동하세요.

### 주요 기능
- 클라이언트
  - 회원가입/로그인/소셜 로그인
  - 유저 정보 관리/내 차량 등록/즐겨찾기
  - 주차장/주차장 검색/주차장 예약
  - 지도
  - 주문/결제
  - 리뷰
  - 알림
- 호스트
  - 주차장 등록
  - 주차장 운영 관리/정보 수정
  - 매출 통계

&nbsp;
## 기술 스택

| 카테고리| 스택 | 사용 목표 |
|:------|:------|:------|
|**Programming Languages**| ![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white) | 코드 안정성 및 유지보수성 향상을 위함 |
|**Frameworks**| ![React](https://img.shields.io/badge/React-06B6D4?style=flat-square&logo=React&logoColor=white) ![Next.js](https://img.shields.io/badge/next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)| 컴포넌트 기반 SSR 및 SSG, SEO 최적화 |
|**CSS Framework**| ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)| 유틸리티 클래스 CSS 프레임워크를 통한 개발 최적화 |
|**State Management**|![Zustand](https://img.shields.io/badge/Zustand-8B4513?style=flat-square&logoColor=white)| 전역 상태 관리 라이브러리를 통한 상태 관리 |
|**library**| ![Shadcn UI](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcn/ui&logoColor=white)  ![Zod](https://img.shields.io/badge/zod-3E67B1?style=flat-square&logo=zod&logoColor=white) | UI 컴포넌트 라이브러리와 유효성 검증 라이브러리를 통한 개발 속도 향상 |
|**Authentication**| ![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=flat-square&logo=nextdotjs&logoColor=white)| OAuth, Credentials 기능 제공 및 토큰 관리를 통한 보안성 향상 |
| **Monorepo Tool** | ![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=flat-square&logo=turborepo&logoColor=white) | 사용자/호스트 앱을 포함한 모노레포 환경 구성 |

&nbsp;
## 역할 분담
### 👨‍💻 Front-end
#### 윤예지
| 기능       | 구현 목록                                       | 설명                                                                                             |
| :--------- | :---------------------------------------------- | :----------------------------------------------------------------------------------------------- |
|  **지도**   |   주차장 탐색 <br/> 주차장 필터링 <br/> 위치 검색 | - 카카오맵 API를 활용한 지도 기능 구현<br/> - 필터링(일정, 전기차 충전여부): 주변 주차장의 빈자리 수 조회<br/> - 지도 범위 내 주차장 정보 및 리스트 확인  <br/> - 키워드 검색 후 주변 위치로 이동 후 주차장 조회    
| **예약**     | 예약 가능 여부 확인 <br/> 예약            | - 일정별 가격확인 및  차량 타입별 잔여 주차면 수 확인 <br/> - 예약 정보 확인 및 차량번호 선택(내 차량 or 직접입력) 후 결제 진행                    


&nbsp;

#### 윤채영
| 기능 | 구현 목록 | 설명 |
|:------|:------|:------|
| **인증** | 로그인/회원가입<br>소셜 로그인 | - NextAuth를 이용한 인증 기능<br>- zod와 react-hook-form을 이용한 Funnel 형식의 인증 폼 구현 |
| **유저** | 마이페이지<br>유저 정보 관리<br>내 차량<br>즐겨찾기<br>예약/주문 내역 | - 유저의 기본 정보 및 차량 정보 조회/수정<br>- 관심 주차장 즐겨찾기 및 관리 기능<br>- 예약 상태에 따라 다르게 나타나는 무한 스크롤 예약 내역, 주문 내역 |
| **주차장** | 주차장 상세<br>주차장 리뷰 | - 주차장 상세 정보 및 실시간 운영 시간, 주차장 옵션, 가격 등의 정보 제공<br>- 무한 스크롤 이용자 리뷰 |
| **주문/결제** | 주문/결제 | - 토스페이먼츠(Toss Payments) 연동을 통한 결제 기능 구현 |
| **알림** | 푸시 알림 | - FCM 및 서비스 워커를 통한 실시간 알림<br>- 알림 발생 시 toast UI로 사용자에게 안내 |
| **호스트** | 주차장 등록<br>주차장 관리<br>매출 통계 | - 프론트엔드에서 S3 업로드 기능을 통해 주차장 이미지 등록<br>- 등록된 주차장의 운영 설정 및 매출 통계 확인 가능 |


&nbsp;
### 폴더 구조
- Client
```bash
📦src
 ┣ 📂actions              # 서버 액션 함수
 ┣ 📂app
 ┃ ┣ 📂(auth)             # 로그인/회원가입
 ┃ ┣ 📂(chat)             # 주차장 채팅 
 ┃ ┣ 📂(home)             
 ┃ ┣ 📂(map)              # 지도 기반 주차장 검색
 ┃ ┣ 📂(myPage)           # 마이페이지
 ┃ ┣ 📂(parkingLot)       # 주차장 상세
 ┃ ┣ 📂(review)           # 리뷰
 ┃ ┣ 📂(search)           # 검색
 ┃ ┣ 📂api     
 ┃ ┣ 📂favorites          # 즐겨찾기 
 ┃ ┣ 📂notifications      # 알림 
 ┃ ┣ 📂payment            # 결제
 ┃ ┣ 📂reservation-pre    # 예약 전 정보 확인 및 처리
 ┣ 📂components
 ┃ ┣ 📂common       
 ┃ ┣ 📂layouts         
 ┃ ┗ 📂pages    
 ┣ 📂config               # 환경 설정
 ┣ 📂constants            # 상수 정의
 ┣ 📂context              # 컨텍스트 API (유저 세션)
 ┣ 📂data                 # 임시 데이터/Mock
 ┣ 📂hooks                # 커스텀 훅
 ┣ 📂lib                  
 ┣ 📂provider             # 전역 Provider 설정 (Auth)
 ┣ 📂schemas              # zod 기반 유효성 검증 스키마
 ┣ 📂store                # Zustand 스토어
 ┣ 📂types               
 ┗ 📂utils              
```
- Admin
```bash
📦src
 ┣ 📂actions             # 서버 액션 함수
 ┣ 📂app
 ┃ ┣ 📂(auth)            # 관리자 로그인 페이지
 ┃ ┣ 📂(home)            
 ┃ ┗ 📂(myParkingLot)    # 내 주차장 리스트
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth            # NextAuth 설정 API 
 ┃ ┃ ┗ 📂s3              # S3 이미지 업로드 처리 API
 ┣ 📂components
 ┃ ┣ 📂common   
 ┃ ┣ 📂layouts        
 ┃ ┗ 📂pages 
 ┣ 📂config              # 환경 설정
 ┣ 📂constants           # 상수 정의
 ┣ 📂context             # 컨텍스트 API (유저 세션)
 ┣ 📂data                # 임시 데이터/Mock
 ┣ 📂hooks               # 커스텀 훅
 ┣ 📂provider            # 전역 Provider 설정 (Auth)
 ┣ 📂schemas             # zod 기반 유효성 검증 스키마
 ┣ 📂types              
 ┗ 📂utils             
```
- 공유 패키지(모노레포 구조)
```bash
📦packages
 ┣ 📂eslint-config        # 프로젝트 전역 ESLint 설정
 ┣ 📂typescript-config    # tsconfig 공통 설정
 ┣ 📂ui
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂base             # shadcn 기본 UI 컴포넌트
 ┃ ┃ ┣ 📂common           # 공용 UI 컴포넌트
 ┃ ┃ ┗ 📂icon             # SVG 기반 아이콘 컴포넌트
 ┃ ┣ 📂lib   
 ┃ ┗ 📂styles             # 전역 Tailwind 스타일 설정
```
