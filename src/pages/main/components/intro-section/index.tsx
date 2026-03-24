import { imgIntro01, imgIntro02 } from '@/shared/assets/images';
import Title from '@/shared/components/title';

const cards = [
  {
    key: 'prioritize',
    label: 'PRIORITIZE',
    toneClassName: 'bg-primary-100',
    contentClassName: '',
    imageWrapClassName: '',
    imageFrameClassName:
      'h-63 w-75 max-w-full overflow-hidden rounded-lg md:h-96 md:w-116 lg:h-110 lg:w-131',
    title: (
      <>
        일의 우선순위를
        <br />
        한눈에 정리하세요
      </>
    ),
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
    title: (
      <>
        할 일을
        <br />
        간단하게 추가하세요
      </>
    ),
    image: imgIntro02,
    imageAlt: 'Taskify 할 일 생성 화면',
    imageClassName: 'h-auto w-54 max-w-full rounded-lg md:w-90 lg:w-109',
  },
] as const;

function IntroSection() {
  return (
    <section>
      <ul className="flex flex-col">
        {cards.map((card) => (
          <li key={card.key}>
            <div
              className={`${card.toneClassName} flex flex-col gap-25 md:gap-50 lg:h-150 lg:flex-row lg:justify-center`}
            >
              <div
                className={`mx-auto flex w-fit flex-col items-start px-5 pt-31 md:mx-0 md:w-full md:px-10 lg:w-auto lg:justify-center lg:px-0 lg:pt-0 ${card.contentClassName ?? ''}`}
              >
                <span className="typo-2lg-bold text-primary-500">
                  {card.label}
                </span>
                <Title
                  as="h3"
                  size="3xl"
                  weight="bold"
                  color="text-black"
                  className="mt-4"
                >
                  {card.title}
                </Title>
              </div>
              <div
                className={`${card.imageWrapClassName ?? ''} flex w-full items-end justify-center px-5 pt-10 md:justify-end md:px-10 md:pt-12 lg:h-full lg:w-auto lg:px-0 lg:pt-12`}
              >
                {card.imageFrameClassName ? (
                  <div className={card.imageFrameClassName}>
                    <img
                      loading="lazy"
                      src={card.image}
                      className={card.imageClassName}
                      alt={card.imageAlt}
                    />
                  </div>
                ) : (
                  <img
                    loading="lazy"
                    src={card.image}
                    className={card.imageClassName}
                    alt={card.imageAlt}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default IntroSection;
