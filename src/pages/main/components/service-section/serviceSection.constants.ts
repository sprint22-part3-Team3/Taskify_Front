import {
  imgService01,
  imgService02,
  imgService03,
} from '@/shared/assets/images';
import type { ServiceCard } from '@/pages/main/components/service-section/serviceSection.types';

export const SERVICE_CARDS: ServiceCard[] = [
  {
    image: imgService01,
    imageAlt: '대시보드 설정 안내 이미지',
    title: '대시보드 설정',
    description: '대시보드 사진과 이름을 변경할 수 있어요.',
  },
  {
    image: imgService02,
    imageAlt: '초대 안내 이미지',
    title: '초대',
    description: '새로운 팀원을 초대할 수 있어요.',
  },
  {
    image: imgService03,
    imageAlt: '구성원 초대 안내 이미지',
    title: '구성원',
    description: '구성원을 초대하고 내보낼 수 있어요.',
  },
];
