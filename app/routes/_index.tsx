import { useLoaderData } from "@remix-run/react";
import { getRecentPosts } from "~/lib/posts.server";
import RecentPosts from "~/components/RecentPosts";

const EMAIL = "me@arathjz.com";

export async function loader() {
  const posts = await getRecentPosts(3);
  return { posts };
}

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex flex-col justify-center page-container pt-20 pb-8">
      <p className="t-prompt mb-7 fade-in-up animation-delay-100">$ whoami</p>

      <h1 className="t-display mb-4 fade-in-up animation-delay-200">
        Arath Jimenez<span className="text-accent">.</span>
        <span
          aria-hidden="true"
          className="inline-block bg-accent ml-2 animate-blink"
          style={{ width: "0.08em", height: "0.85em", verticalAlign: "-0.08em" }}
        />
      </h1>

      <p className="t-lead max-w-md mb-10 fade-in-up animation-delay-300">
        <span className="text-accent">Software engineer</span>. Finance
        enthusiast.
        <br />
        Powered by espresso <span className="text-accent">☕</span>
      </p>

      <div className="max-w-xl space-y-5 mb-10 fade-in-up animation-delay-400">
        <p className="t-body">
          Hi! I&apos;m Arath, a software engineer with 7+ years in the industry.
          I&apos;m a <span className="text-accent">generalist</span> who loves
          solving problems and learning new things.
        </p>
        <p className="t-body">
          Currently an Engineering Manager at{" "}
          <a
            href="https://trykeep.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Keep
          </a>
          , leading the Capital team. I believe technology should be easy and
          accessible for everyone, which fuels my focus on user experience,
          accessibility, and design in every project.
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
        <RecentPosts posts={posts} />
      </div>
    </div>
  );
}
