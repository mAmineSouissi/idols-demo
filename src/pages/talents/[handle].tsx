import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import CreatorProfilePage from "@/components/pages/CreatorProfilePage";
import { creators, getCreatorByHandle, type CreatorProfile } from "@/data/creators";

type Props = { creator: CreatorProfile };

export default function CreatorProfile({ creator }: Props) {
  const title = `${creator.shortName} — Icons`;
  const desc = `${creator.shortName} — ${creator.title}. ${creator.bio.slice(0, 120)}…`;
  const url = `https://icons.so/talents/${creator.handle}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: creator.shortName,
    url,
    image: creator.photo,
    jobTitle: creator.title,
    description: creator.bio.slice(0, 200),
    worksFor: { "@type": "Organization", name: "Icons", url: "https://icons.so" },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content={creator.photo} />
        <meta property="og:image:alt" content={`${creator.shortName} — Icons creator`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={creator.photo} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>
      <CreatorProfilePage creator={creator} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: creators.map((c) => ({ params: { handle: c.handle } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const creator = getCreatorByHandle(params?.handle as string);
  if (!creator) return { notFound: true };
  return { props: { creator } };
};
