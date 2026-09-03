import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, siteConfig } from "@/data/portfolio";
import { ProjectCaseStudy } from "@/components/project/project-case-study";
import { getSiteUrl } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.summary,
    alternates: { canonical: `${getSiteUrl(siteConfig.domain)}/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
