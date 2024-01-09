import { useContext } from "react";
import Link from "next/link";
import NormalLayout from "./NormalLayout";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import LessonVideo from "../components/LessonVideo";
import LessonDetails from "../components/LessonDetails";
import Patrons from "../components/Patrons";
import ShareButtons from "../components/ShareButtons";
import LessonNav from "../components/LessonNav";
import Jump from "../components/Jump";
import TableOfContents from "../components/TableOfContents";
import { PageContext } from "../pages/_app";

// layout for lessons
const LessonLayout = () => {
  const { video, timestamp, content } = useContext(PageContext);
  const has_sufficient_text = content.length > 1000;
  return (
    <NormalLayout>
      {/* Key prevents state from being preserved when moving between pages: */}
      <LessonVideo
        key={video}
        timestamp={timestamp}
        defaultToWide={!has_sufficient_text}
      />
      <LessonDetails />
      {/* Don't alternate section color after <LessonDetails> */}
      <div />
      <PageContent />

      {has_sufficient_text && (
        <>
          <div />
          <Section width="narrow">
            <ShareButtons />
            <CorrectionLink />
          </Section>
          <LessonNav />
          <TableOfContents />
          <Jump />
        </>
      )}

      <Thanks />
    </NormalLayout>
  );
};

const CorrectionLink = () => {
  const { file } = useContext(PageContext);

  const url = `https://github.com/3b1b/3Blue1Brown.com/edit/main/public${file}`;

  return (
    <div style={{ marginTop: 24 }}>
      Notice a mistake?{" "}
      <a href={url} target="_blank" rel="noreferrer">
        Submit a correction on GitHub
      </a>
    </div>
  );
};

const Thanks = () => {
  const { patrons = [] } = useContext(PageContext);
  return (
    <>
      {patrons.length > 0 && (
        <Section>
          <h1 id="thanks">Thanks</h1>
          <p>
            Special thanks to those below for supporting the original video
            behind this post, and to <Link href="/thanks">current patrons</Link>{" "}
            for funding ongoing projects. If you find these lessons valuable,{" "}
            <Link href="https://www.patreon.com/3blue1brown">
              consider joining
            </Link>
            .
          </p>
          <Patrons />
        </Section>
      )}
    </>
  );
};

export default LessonLayout;
