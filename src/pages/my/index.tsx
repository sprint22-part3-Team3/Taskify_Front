import { IcArrowLeft } from '@/shared/assets';
import InputField from '@/shared/components/input';

function MyPage() {
  return (
    <div>
      {/* <div>My Page</div> */}
      {/* header & sidebar */}
      <button>
        <IcArrowLeft />
        돌아가기
      </button>
      <div className="content">
        <div className="profile">
          {/* 타이틀 */}
          <div className="flex justify-between">
            {/* 이미지 업로드 */}
            {/* 이메일 레이블,인풋 / 닉네임 레이블,인풋 */}
            <InputField />
            {/* 버튼 컴포넌트 - 저장 */}
          </div>
        </div>
        <div className="change-password">
          {/* 타이틀 */}
          {/* 현재 비밀번호 레이블,인풋 / 새 비밀번호 레이블,인풋 / 새 비밀번호 확인 레이블,인풋 */}
          {/* 버튼 컴포넌트 - 변경 */}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
