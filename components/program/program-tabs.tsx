import * as React from "react";
import { memo } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Paper } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import dynamic from "next/dynamic";

const Readme = dynamic(() => import("./readme"));
const Builds = dynamic(() => import("./builds"));
const IdlViewer = dynamic(() => import("./idl-viewer"), { ssr: false });
const SourceFiles = dynamic(() => import("./souce-files"));

function ProgramTabs({
  selectedBuild,
  builds,
  readme,
  files,
}: ProgramTabsProps) {
  const [value, setValue] = React.useState("1");
  const { data: idl = {} } = useSWR(
    selectedBuild.artifacts.idl as string,
    fetcher
  );
  const [hideIdl, setHideIdl] = React.useState(true);

  React.useEffect(() => {
    if (Object.keys(idl).length !== 0) {
      setHideIdl(false);
    }
  }, [idl]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="program tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              icon={<ArticleIcon />}
              iconPosition="start"
              label="Readme"
              value="1"
            />

            <Tab
              icon={<CodeIcon />}
              iconPosition="start"
              label="Source Files"
              value="2"
            />
            <Tab
              icon={<QueryBuilderIcon />}
              iconPosition="start"
              label="Builds"
              value="3"
            />
            <Tab
              icon={<AccountTreeIcon />}
              iconPosition="start"
              label="IDL"
              value="4"
              disabled={hideIdl}
            />
            <Tab
              disabled
              icon={<VerifiedUserIcon />}
              iconPosition="start"
              label="Audits"
              value="5"
            />
            <Tab
              disabled
              icon={<ViewInArIcon />}
              iconPosition="start"
              label="Dependencies"
              value="6"
            />
          </TabList>
        </Box>

        {/* Readme visible only if README.md present */}

        <TabPanel value="1" sx={{ padding: 0 }}>
          <Grid item sx={{ overflow: "auto", paddingTop: 2 }}>
            {readme && <Readme readme={readme} />}
          </Grid>

          <Grid item xs={4} sx={{ paddingLeft: 2, paddingTop: 2 }}>
            <Paper
              elevation={0}
              sx={{
                padding: 3,
              }}
            ></Paper>
          </Grid>
        </TabPanel>

        <TabPanel value="2" sx={{ padding: 0 }}>
          <SourceFiles
            name={selectedBuild.name}
            files={files}
            readme={readme}
          />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <Builds builds={builds} />
        </TabPanel>
        {!hideIdl && (
          <TabPanel value="4" sx={{ padding: 0 }}>
            <Box
              sx={{
                paddingTop: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <IdlViewer data={idl} url={selectedBuild.artifacts.idl} />
            </Box>
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
}

interface ProgramTabsProps {
  readme: string;
  selectedBuild: any;
  builds: any[];
  files: string[];
}

export default memo(ProgramTabs);
