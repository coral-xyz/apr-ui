import { GetStaticPaths, GetStaticProps } from "next";
import fetch from "../../../utils/fetcher";
import fetchMD from "../../../utils/fetcher-md";
import markdownToHtml from "../../../utils/markdown";
import dynamic from "next/dynamic";
import Layout from "../../../components/layout";
import buildStatus from "../../../utils/build-status";

const ProgramComponent = dynamic(() => import("../../../components/program"));

export const getStaticPaths: GetStaticPaths = async () => {
  const programs = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/programs/latest`
  );

  const paths: any[] = [];

  for (let i = 0; i < programs.length; i++) {
    // Patch for weird issue, will fix later
    if (
      programs[i].address === "So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo" ||
      programs[i].address === "ninaN2tm9vUkxoanvGcNApEeWiidLMM2TdBX8HoJuL4"
    )
      continue;

    paths.push({
      params: {
        address: programs[i].address,
      },
    });
  }

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const program = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/program/${params.address}`
  );
  let builds = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/program/${params.address}/latest`
  );

  let selectedBuild = builds[0] || {};

  // Find selected build artifacts
  selectedBuild.artifacts = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/build/${selectedBuild.id}/artifacts`
  );

  let slimBuilds = [];
  for await (const build of builds) {
    const status = await buildStatus(build, false);

    slimBuilds.push({
      buildStatus: status,
      id: build.id,
      address: build.address,
      updated_at: build.updated_at,
      sha256: build.sha256,
    });
  }

  // If the program contains a Readme, we need to process it
  let readmeUrl: string | boolean = false;

  selectedBuild.descriptor.forEach((item) => {
    if (item.split(":")[0] === "README.md") {
      readmeUrl = item.split(":")[2];
    }
  });

  let readme: string | boolean;
  if (readmeUrl) {
    readme = await fetchMD(`https://${readmeUrl}`);
  } else {
    readme = false;
  }
  readme = await markdownToHtml(readme || "");

  selectedBuild.buildStatus = await buildStatus(selectedBuild, true);

  return {
    props: {
      program,
      builds: slimBuilds,
      selectedBuild,
      readme,
      files: selectedBuild?.descriptor || null,
    },
    revalidate: 60,
  };
};

export default function Program({
  program,
  selectedBuild,
  builds,
  readme,
  files,
}: ProgramProps) {
  const metaTags = {
    title: `apr - ${selectedBuild.name}`,
    description: `apr - ${selectedBuild.name} - ${selectedBuild.address}`,
    url: `https://apr.dev/program/${selectedBuild.address}`,
  };

  return (
    <Layout metaTags={metaTags}>
      <ProgramComponent
        program={program}
        selectedBuild={selectedBuild}
        builds={builds}
        readme={readme}
        files={files}
      />
    </Layout>
  );
}

interface ProgramProps {
  program: any;
  builds: any[];
  selectedBuild: any;
  readme: string;
  files: string[];
}
