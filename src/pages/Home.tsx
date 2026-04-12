import RecentPosts from '../components/RecentPosts'

const EMAIL = 'me@arathjz.com'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col justify-center page-container pt-20 pb-16">
      <p className="t-prompt mb-7 fade-in-up animation-delay-100">
        $ whoami
      </p>

      <div className="flex items-center gap-6 mb-4 fade-in-up animation-delay-200">
        <img
          src="/images/illustration.png"
          alt="Arath Jimenez"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover flex-shrink-0"
          style={{ objectPosition: '50% 30%' }}
        />
        <h1 className="t-display">
          Arath Jimenez<span className="text-accent">.</span>
          <span
            aria-hidden="true"
            className="inline-block bg-accent ml-3 animate-blink"
            style={{ width: '0.08em', height: '0.85em', verticalAlign: '-0.08em' }}
          />
        </h1>
      </div>

      <p className="t-lead max-w-md mb-10 fade-in-up animation-delay-300">
        Software engineer. Finance enthusiast.
        <br />
        Powered by espresso <span className="text-accent">☕</span>
      </p>

      <div className="max-w-xl space-y-5 mb-10 fade-in-up animation-delay-400">
        <p className="t-body">
          Hi! I'm Arath, a software engineer with 7+ years in the industry.
          I'm a generalist who loves solving problems and learning new things.
        </p>
        <p className="t-body">
          Currently an Engineering Manager at Keep, leading the Capital team.
          I believe technology should be easy and accessible for everyone,
          which fuels my focus on user experience, accessibility, and design
          in every project.
        </p>
      </div>

      <div className="fade-in-up animation-delay-500">
        <a
          href={`mailto:${EMAIL}`}
          className="font-mono text-lg md:text-xl text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-2 group"
        >
          <span className="text-terminal opacity-80">$</span>
          <span className="border-b border-accent/30 group-hover:border-accent transition-colors pb-0.5">
            {EMAIL}
          </span>
        </a>
      </div>

      <div className="mt-12 fade-in-up animation-delay-600">
        <RecentPosts />
      </div>
    </div>
  )
}
