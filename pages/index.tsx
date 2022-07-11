import type { GetStaticProps } from "next";
import Image from "next/future/image";
import fetch from "../utils/fetcher";
import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/layout";
import buildStatus from "../utils/build-status";
import { SearchIcon } from "@heroicons/react/outline";

const Search = dynamic(() => import("../components/search"));
const ProgramMiniCard = dynamic(
  () => import("../components/program-mini-card")
);

function loadMorePrograms(programs, amount, buildType = false) {
  let size;

  if (programs.length < amount) {
    size = programs.length;
  } else {
    size = amount;
  }

  let component = [];
  for (let i = 0; i < size; i++) {
    component.push(
      <ProgramMiniCard
        key={programs[i].id}
        name={programs[i].name}
        address={programs[i].address}
        verified={programs[i].verified}
        id={buildType && programs[i].id}
      />
    );
  }

  return component;
}

export async function getStaticProps({}: GetStaticProps) {
  const builds = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/builds/latest`
  );
  const programs = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/programs/latest`
  );

  // Sort programs by created_at (desc)
  programs.sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Find if the last build for a program is verified
  for (let i = 0; i < programs.length; i++) {
    const lastBuild = builds.find(
      (element) => element.address === programs[i].address
    );

    if (lastBuild === undefined) {
      programs[i].verified = false;
      continue;
    }

    programs[i].buildStatus = buildStatus(lastBuild);

    programs[i].verified = lastBuild.verified === "Verified";
  }

  // Reduce data size for UI
  const justUpdated = builds.map((build) => {
    return {
      id: build.id,
      name: build.name,
      address: build.address,
      verified: build.verified === "Verified",
      buildStatus: buildStatus(build),
    };
  });

  let newPrograms = [];
  for await (const program of programs) {
    newPrograms.push({
      id: program.id,
      name: program.name,
      address: program.address,
      verified: program.verified,
      buildStatus: program.buildStatus || false,
    });
  }

  return {
    props: {
      justUpdated,
      newPrograms,
    },
    revalidate: 60,
  };
}

export default function Home({ justUpdated, newPrograms }: HomeProps) {
  const [open, setOpen] = useState(false);
  const [newProgramsSize, setNewProgramsSize] = useState(10);
  const [justUpdatedSize, setJustUpdatedSize] = useState(10);

  const metaTags = {
    title: "apr",
    description: "Anchor Programs Registry",
    url: "https://apr.dev",
  };

  return (
    <>
      <Layout metaTags={metaTags}>
        <div className="mx-auto flex flex-col justify-around">
          <div className="mx-auto mb-20 mt-10 flex flex-col gap-4">
            <div className="mx-auto">
              <Image
                className="max-w-sm"
                alt="hero"
                src="/banner-text.png"
                width="400"
                height="300"
                priority
              />
            </div>

            {/* Search */}
            <div className="relative mt-1 ">
              <button
                onClick={() => setOpen(true)}
                className="shadow-xs flex h-14 w-96 min-w-full cursor-text
                items-center justify-between rounded-md border border-gray-200/80 bg-gray-100 px-5 font-medium shadow hover:border-slate-200/80 hover:bg-slate-100 focus:outline-none md:w-[600px]"
              >
                <div className="flex flex-row items-center gap-2 text-gray-500">
                  <SearchIcon className="h-5 w-5" />
                  <span className="">Search by name or address</span>
                </div>
                <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-500">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-around gap-10 md:flex-row ">
            {/* New Programs List */}
            <div className="flex flex-col items-center gap-5 pb-5">
              <h2 className="text-2xl font-medium tracking-tight">
                New Programs
              </h2>
              <div className="flex flex-col gap-8">
                {loadMorePrograms(newPrograms, newProgramsSize)}
                <button
                  className="w-[400px] rounded-md bg-gray-900 py-2 px-4 font-medium uppercase tracking-wide text-gray-200 hover:bg-gray-800 hover:text-gray-50"
                  onClick={() => setNewProgramsSize(newProgramsSize + 10)}
                >
                  View More
                </button>
              </div>
            </div>

            {/* Just Updated List */}
            <div className="flex flex-col items-center gap-5 pb-5">
              <h2 className="text-2xl font-medium tracking-tight">
                Just Updated
              </h2>
              <div className="flex flex-col gap-8">
                {loadMorePrograms(justUpdated, justUpdatedSize, true)}
                <button
                  className="w-[400px] rounded-md bg-gray-900 py-2 px-4 font-medium uppercase tracking-wide text-gray-200 hover:bg-gray-800 hover:text-gray-50"
                  onClick={() => setJustUpdatedSize(justUpdatedSize + 10)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Search programs={newPrograms} open={open} setOpen={setOpen} />
    </>
  );
}

interface HomeProps {
  justUpdated: any[];
  newPrograms: any[];
}
