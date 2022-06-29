import { memo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import filesTree from "../../utils/files-tree";
import {
  Breadcrumbs,
  Button,
  Paper,
  TableCell,
  TableContainer,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { Folder } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Source from "./source";

function table(
  tree: any[],
  setTree: Function,
  setSource: Function,
  setShowSource: Function,
  setBreadcrumbs: Function,
  breadcrumbs: any[]
) {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ border: "solid", borderWidth: 1, borderColor: "divider" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableBody>
          {tree.map((file) => (
            <TableRow key={file.name} hover>
              {file.type === "folder" && (
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    setBreadcrumbs([
                      ...breadcrumbs,
                      {
                        name: file.name,
                        children: file.children,
                      },
                    ]);

                    setTree(file.children);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography sx={{ display: "flex" }}>
                    <Folder
                      sx={{
                        color: "grey.500",
                      }}
                    />{" "}
                    &nbsp;
                    {file.name}
                  </Typography>
                </TableCell>
              )}
              {file.type === "file" && (
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    setBreadcrumbs([
                      ...breadcrumbs,
                      {
                        name: file.name,
                        children: file.children,
                      },
                    ]);
                    setSource({ name: file.name, url: file.url });
                    setShowSource(true);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography sx={{ display: "flex" }}>
                    <InsertDriveFileOutlinedIcon /> &nbsp;
                    {file.name}
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SourceFiles({ name, files, readme }: SourceFilesProps) {
  const [tree, setTree] = useState([]);
  const [source, setSource] = useState<SourceProps>();
  const [showSource, setShowSource] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const structure = filesTree(files);
    setTree(structure);

    setBreadcrumbs([{ name, children: structure }]);
  }, [files, name]);

  return (
    <Box
      sx={{ paddingTop: 3, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Breadcrumbs sx={{ paddingLeft: 2 }} aria-label="breadcrumb">
        {breadcrumbs.map((item) => (
          <Button
            color="info"
            key={item.name}
            variant="text"
            onClick={() => {
              let files: any;

              for (let i = 0; i < breadcrumbs.length; i++) {
                if (item.name !== breadcrumbs[i].name) continue;

                files = item;

                const newBreadcrumbs = breadcrumbs.slice(0, i + 1);
                setBreadcrumbs(newBreadcrumbs);

                break;
              }

              if (showSource) setShowSource(false);

              setTree(files.children);
            }}
          >
            {item.name}
          </Button>
        ))}
      </Breadcrumbs>

      {showSource ? (
        <Source url={source.url} name={source.name} readme={readme} />
      ) : (
        table(
          tree,
          setTree,
          setSource,
          setShowSource,
          setBreadcrumbs,
          breadcrumbs
        )
      )}
    </Box>
  );
}

interface SourceFilesProps {
  name: string;
  files: string[];
  readme: string;
}

interface SourceProps {
  name: string;
  url: string;
}

export default memo(SourceFiles);
