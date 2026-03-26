import Title from '@/shared/components/title';
import Input from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import ImageUploadBox from '@/shared/components/image-uploader';

/**
 * TODO
 * email 데이터 연동 후 상태 값으로 주입 (readOnly)
 * nickname 데이터 연동 후 placeholder로 주입
 **/

export default function ProfileForm() {
  return (
    <form>
      <div className="mt-1 w-71 rounded-xl bg-white p-4 md:mt-7 md:w-137 md:p-6 lg:w-2xl">
        <Title
          as="h3"
          size="2lg"
          weight="bold"
          className="mb-10 md:mb-6 md:text-2xl"
        >
          프로필
        </Title>

        <div className="w-full md:flex md:justify-between">
          <ImageUploadBox />
          <div className="mt-10 md:mt-0 md:w-69 lg:w-100">
            <Input
              label="이메일"
              name="email"
              type="text"
              readOnly
              labelClassName="text-md md:mt-0 md:text-lg"
              className="mb-4"
            />

            <Input
              label="닉네임"
              name="nickname"
              type="text"
              labelClassName="text-md md:mt-0 md:text-lg"
            />

            <Button
              theme="primary"
              type="submit"
              className="mt-6 h-13.5 w-full"
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
