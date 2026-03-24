import {
  imgService01,
  imgService02,
  imgService03,
} from '@/shared/assets/images';
import Title from '@/shared/components/title';

type ServiceCard = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

const serviceCards: ServiceCard[] = [
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

function ServiceCardItem({ image, imageAlt, title, description }: ServiceCard) {
  return (
    <li className="group flex w-full max-w-94 flex-col transition-transform duration-300 hover:-translate-y-1">
      <div className="bg-black-100 flex h-65 items-center justify-center rounded-t-lg p-2">
        <img
          className="w-full max-w-75 transition-transform duration-500 group-hover:scale-[1.03]"
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
    <section className="mx-auto mt-22.5 mb-40 max-w-300">
      <Title
        as="h3"
        weight="bold"
        color="text-black"
        className="mb-9 text-center text-xl md:text-2xl xl:text-left"
      >
        생산성을 높이는 다양한 설정 ⚡
      </Title>
      <ul className="flex w-full flex-col items-center gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
        {serviceCards.map((card) => (
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
