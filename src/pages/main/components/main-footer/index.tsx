import { IcGithub } from '@/shared/assets/icons';

function MainFooter() {
  return (
    <footer className="bg-black-200">
      <div className="mx-auto flex h-58 w-full max-w-350 flex-col items-center justify-center gap-10 px-6 text-center md:h-25 md:flex-row md:justify-between md:gap-0 md:px-8 md:text-left">
        <p className="typo-lg-regular tracking-wide text-white">
          ©FE22 Part 3 Team3 - 2026
        </p>
        <a
          href="https://github.com/sprint22-part3-Team3/Taskify_Front"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          className="hover:text-primary-500 text-white transition-colors"
        >
          <IcGithub className="h-7 w-7" />
        </a>
      </div>
    </footer>
  );
}

export default MainFooter;
