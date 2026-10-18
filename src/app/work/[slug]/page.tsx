import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CASE_STUDY_SLUGS,
  getCaseStudy,
} from "../../../data/case-studies";
import CaseStudyPage from "../../../components/case-study/CaseStudy";
import SiteFooter from "../../../components/SiteFooter";
import { OG_IMAGE, SITE_NAME } from "../../../data/site";

/*
 * The page content is fully static per slug (see generateStaticParams),
 * but reading `params` ties the shell to the URL, which trips Next 16's
 * instant-navigation validation in development. Opting out does not
 * force the route dynamic — each slug still prerenders statically.
 */
export const instant = false;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.name} · ${SITE_NAME}`;
  return {
    title: study.name,
    description: study.tagline,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title,
      description: study.tagline,
      url: `/work/${slug}`,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.tagline,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return (
    <div className="flex min-h-screen flex-col items-center bg-black">
      <main className="flex w-full flex-1 flex-col px-6">
        <div className="pt-16 pb-16">
          <CaseStudyPage study={study} />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
