import type { GetStaticProps } from "next";
import { Button, Grid } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import fetch from "../utils/fetcher";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import loadMorePrograms from "../utils/loadMorePrograms";
import dynamic from "next/dynamic";
import Layout from "../components/layout";
import buildStatus from "../utils/build-status";

const SearchComponent = dynamic(() => import("../components/search"));

export async function getStaticProps({}: GetStaticProps) {
  const builds = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/builds/latest`);
  const programs = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/programs/latest`);

  // Sort programs by created_at (desc)
  programs.sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Find if the last build for a program is verified
  for (let i = 0; i < programs.length; i++) {
    const lastBuild = builds.find((element) => element.address === programs[i].address);

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
  const [newProgramsSize, setNewProgramsSize] = useState(10);
  const [justUpdatedSize, setJustUpdatedSize] = useState(10);

  const metaTags = {
    title: "apr",
    description: "Anchor Programs Registry",
    url: "https://apr.dev",
  };

  return (
    <Layout metaTags={metaTags}>
      <Grid
        container
        spacing={2}
        sx={{ maxWidth: "xl", margin: "auto" }}
        direction="row"
        justifyContent="space-around"
      >
        {/* Search */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
            marginTop: 5,
            gap: 4,
          }}
        >
          <Box>
            <Image alt="" src="/banner-text.png" width="400px" height="268px" />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* Search input */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: 4,
                paddingLeft: 2,
              }}
            >
              <SearchComponent data={newPrograms} height={2} />
              <Typography variant="subtitle2" component="p" sx={{ fontSize: 15 }}>
                Tip: Search for programs or app using the program name or address.
              </Typography>
            </Box>

            {/* Search btn */}
            <Button
              color="secondary"
              variant="contained"
              disableElevation
              size="large"
              sx={{ height: 55, width: 200 }}
            >
              <Typography variant="button" color="primary">
                Search
              </Typography>
            </Button>
          </Box>
        </Grid>
        {/* New Programs List */}
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: 5,
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            New Programs
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {loadMorePrograms(newPrograms, newProgramsSize)}
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: 400 }}
              onClick={() => setNewProgramsSize(newProgramsSize + 10)}
            >
              View More
            </Button>
          </Box>
        </Grid>
        {/* Just Updated List */}
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: 5,
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Updated Programs
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {loadMorePrograms(justUpdated, justUpdatedSize, true)}
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: 400 }}
              onClick={() => setJustUpdatedSize(justUpdatedSize + 10)}
            >
              View More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

interface HomeProps {
  justUpdated: any[];
  newPrograms: any[];
}
