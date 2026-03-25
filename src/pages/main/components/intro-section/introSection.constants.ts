import { imgIntro01, imgIntro02 } from '@/shared/assets/images';

export const CARDS = [
  {
    key: 'prioritize',
    label: 'PRIORITIZE',
    toneClassName: 'bg-primary-100',
    contentClassName: '',
    imageWrapClassName: '',
    imageFrameClassName:
      'h-63 w-75 max-w-full overflow-hidden rounded-lg md:h-96 md:w-116 lg:h-110 lg:w-131',
    titleLines: ['일의 우선순위를', '한눈에 정리하세요'],
    image: imgIntro01,
    imageAlt: 'Taskify 우선순위 보드 화면',
    imageClassName: 'h-full w-full object-cover object-left',
  },
  {
    key: 'add-tasks',
    label: 'ADD TASKS',
    toneClassName: 'bg-gray-50',
    contentClassName: 'lg:order-2',
    imageWrapClassName: 'lg:order-1',
    imageFrameClassName: '',
    titleLines: ['할 일을', '간단하게 추가하세요'],
    image: imgIntro02,
    imageAlt: 'Taskify 할 일 생성 화면',
    imageClassName: 'h-auto w-54 max-w-full rounded-lg md:w-90 lg:w-109',
  },
] as const;
