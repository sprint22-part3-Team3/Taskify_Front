import { SERVICE_CARDS } from '@/pages/main/components/service-section/serviceSection.constants';
import type { ServiceCard } from '@/pages/main/components/service-section/serviceSection.types';
import Title from '@/shared/components/title';

function ServiceCardItem({ image, imageAlt, title, description }: ServiceCard) {
  return (
    <li className="group flex w-full max-w-94 flex-col transition-transform duration-300 hover:-translate-y-1">
      <div className="bg-black-100 flex h-65 items-center justify-center rounded-t-lg p-2">
        <img
          className="w-full max-w-65 transition-transform duration-500 group-hover:scale-[1.03] md:max-w-75"
          src={image}
          alt={imageAlt}
          loading="lazy"
        />
      </div>
      <div className="bg-primary-100 rounded-b-lg px-8 py-8.25 text-white">
        <Title
          as="h4"
          size="2lg"
          weight="bold"
          color="text-black"
          className="mb-4.5"
        >
          {title}
        </Title>
        <p className="typo-lg-regular text-black">{description}</p>
      </div>
    </li>
  );
}

function ServiceSection() {
  return (
    <section
      id="service-section"
      className="mx-auto mt-22.5 mb-40 max-w-300 scroll-mt-25 px-4 md:px-0"
    >
      <Title
        as="h3"
        weight="bold"
        color="text-black"
        className="mb-9 text-center text-xl md:text-2xl xl:text-left"
      >
        생산성을 높이는 다양한 설정 ⚡
      </Title>
      <ul className="flex w-full flex-col items-center gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
        {SERVICE_CARDS.map((card) => (
          <ServiceCardItem
            key={card.title}
            image={card.image}
            imageAlt={card.imageAlt}
            title={card.title}
            description={card.description}
          />
        ))}
      </ul>
    </section>
  );
}

export default ServiceSection;
