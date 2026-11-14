import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main id="main">
      <Container className="flex min-h-svh flex-col justify-center py-40">
        <p className="label text-accent">404</p>
        <h1 className="display-xl mt-8 max-w-[14ch] text-primary">
          This page <span className="accent-phrase">slipped a gear.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-secondary">
          The address doesn&rsquo;t match anything here. The rest of the workshop is still running.
        </p>
        <div className="mt-10">
          <ButtonLink href="/">Back to the start</ButtonLink>
        </div>
      </Container>
    </main>
  );
}
