import fetch from "isomorphic-unfetch";
import Layout from "../../components/layout";
import {
  ClockIcon,
  CodeIcon,
  DatabaseIcon,
  DocumentTextIcon,
  TerminalIcon,
} from "@heroicons/react/solid";
import dynamic from "next/dynamic";

const ProgramBanner = dynamic(
  () => import("../../components/program/program-banner")
);
const Tabs = dynamic(() => import("../../components/program/tabs"));

const tabs = [
  { name: "Readme", icon: DocumentTextIcon, disabled: true },
  { name: "Explorer", icon: CodeIcon, disabled: true },
  { name: "IDL", icon: TerminalIcon, disabled: false },
  { name: "Accounts Data", icon: DatabaseIcon, disabled: true },
  { name: "Builds", icon: ClockIcon, disabled: true },
];

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          address: "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo",
        },
      },
    ],

    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/idl?address=${params.address}`
  );
  const idl = await res.json();

  return {
    props: {
      data: idl,
    },
    revalidate: 3600,
  };
}

export default function IDLViewerPage({ data }) {
  const metaTags = {
    title: `apr - ${data?.name}`,
    description: `IDL Viewer - ${data?.name} - ${data?.address}`,
    url: `https://apr.dev/idl/${data.address}`,
  };

  return (
    <Layout metaTags={metaTags}>
      <div className="flex flex-col gap-8">
        <ProgramBanner
          name={data.name}
          address={data.address}
          selectedBuild={false}
          latest={false}
        />

        <Tabs
          tabs={tabs}
          networkIdl={data.idl}
          idlAddress={data.address}
          readme={undefined}
          selectedBuild={undefined}
          builds={undefined}
          files={undefined}
        />
      </div>
    </Layout>
  );
}
