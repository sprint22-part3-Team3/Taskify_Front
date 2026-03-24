import Title from '@/shared/components/title';
import { CARDS } from '@/pages/main/components/intro-section/introSection.constants';

function IntroSection() {
  return (
    <section>
      <ul className="flex flex-col">
        {CARDS.map((card) => (
          <li key={card.key}>
            <div
              className={`${card.toneClassName} group flex flex-col gap-25 transition-transform duration-300 hover:-translate-y-1 md:gap-50 lg:h-150 lg:flex-row lg:justify-center`}
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
                  {card.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Title>
              </div>
              <div
                className={`${card.imageWrapClassName ?? ''} flex w-full items-end justify-center px-5 pt-10 md:justify-end md:px-10 md:pt-12 lg:h-full lg:w-auto lg:px-0 lg:pt-12`}
              >
                {card.imageFrameClassName ? (
                  <div
                    className={`${card.imageFrameClassName} group-hover:scale-1.02 transition-transform duration-500 group-hover:-translate-y-2`}
                  >
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
                    className={`${card.imageClassName} transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]`}
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
