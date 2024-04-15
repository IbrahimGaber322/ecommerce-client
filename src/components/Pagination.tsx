import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

export default function Pagination({
  page,
  setPage,
  eventsPerPage,
  pages,
  eventsNumber,
}: {
  page: number;
  setPage: Function;
  eventsPerPage: number;
  pages: number;
  eventsNumber: number;
}) {
  return (
    <Paper sx={{ justifyContent: "center", flexWrap: "wrap", py: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "0.9rem" }}>
            Showing{" "}
            <span style={{ fontSize: "1rem" }}>
              {page * eventsPerPage - eventsPerPage + 1}
            </span>{" "}
            to{" "}
            <span style={{ fontSize: "1rem" }}>
              {page * eventsPerPage >= eventsNumber
                ? eventsNumber
                : page * eventsPerPage}
            </span>{" "}
            of <span style={{ fontSize: "1rem" }}>{eventsNumber}</span> results
          </Typography>
        </Box>

        <Box
          sx={{
            gap: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {page - 3 > 1 && (
            <IconButton onClick={() => setPage(1)}>
              <FirstPageIcon />
            </IconButton>
          )}

          <IconButton onClick={() => page !== 1 && setPage(page - 1)}>
            <ChevronLeftIcon />
          </IconButton>

          {Array.from(
            { length: pages },
            (p, i) =>
              i + 1 <= page + 3 &&
              i + 1 >= page - 3 && (
                <Button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  sx={
                    page === i + 1
                      ? {
                          color: "primary.main",
                          "&:hover": { bgcolor: "inherit", cursor: "default" },
                        }
                      : {
                          color: "secondary.main",
                          "&:hover": {
                            color: "primary.main",
                          },
                        }
                  }
                >
                  {i + 1}
                </Button>
              )
          )}
          <IconButton onClick={() => page !== pages && setPage(page + 1)}>
            <ChevronRightIcon />
          </IconButton>
          {page + 3 < pages && (
            <IconButton onClick={() => setPage(pages)}>
              <LastPageIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
