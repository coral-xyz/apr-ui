import { GetStaticPaths, GetStaticProps } from "next";
import fetch from "../../../../utils/fetcher";
import fetchMD from "../../../../utils/fetcher-md";
import markdownToHtml from "../../../../utils/markdown";
import dynamic from "next/dynamic";
import Layout from "../../../../components/layout";
import buildStatus from "../../../../utils/build-status";

const ProgramComponent = dynamic(
  () => import("../../../../components/program")
);

export const getStaticPaths: GetStaticPaths = async () => {
  const builds: any[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/builds/latest`
  );

  const paths = builds.map((build) => {
    return {
      params: {
        address: build.address,
        id: build.id.toString(),
      },
    };
  });

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

  // find the selected build,
  const selectedBuild = builds.find(
    (build) => build.id.toString() === params.id
  );

  // Find selected build artifacts
  selectedBuild.artifacts = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/build/${selectedBuild.id}/artifacts`
  );

  let slimBuilds = [];
  for await (const build of builds) {
    slimBuilds.push({
      buildStatus: await buildStatus(build, false),
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

export default function ProgramBuild({
  program,
  selectedBuild,
  builds,
  readme,
  files,
}: AddressProps) {
  const metaTags = {
    title: `apr - ${selectedBuild.name}`,
    description: `apr - ${selectedBuild.name} - ${selectedBuild.address}`,
    url: `https://apr.dev/program/${selectedBuild.address}/build/${selectedBuild.id}`,
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

interface AddressProps {
  program: any;
  builds: any[];
  selectedBuild: any;
  readme: string;
  files: string[];
}
