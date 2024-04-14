import "../styles/Pagination.css";
import { Box, Button, IconButton, Paper } from "@mui/material";
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
    <Paper
      sx={{ justifyContent: "center" }}
      className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
    >
      <Box
        sx={{ gap: 2 }}
        className="flex flex-1 items-center justify-between flex-col sm:flex-row"
      >
        <div className="py-2">
          <p className="text-sm">
            Showing{" "}
            <span className="font-medium">
              {page * eventsPerPage - eventsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * eventsPerPage >= eventsNumber
                ? eventsNumber
                : page * eventsPerPage}
            </span>{" "}
            of <span className="font-medium">{eventsNumber}</span> results
          </p>
        </div>

        <Box
          sx={{ gap: 1 }}
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {page - 3 > 1 && (
            <IconButton
              onClick={() => setPage(1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <FirstPageIcon />
            </IconButton>
          )}

          <IconButton
            onClick={() => page !== 1 && setPage(page - 1)}
            className="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
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
                  className={`${
                    page === i + 1
                      ? "bg-orange-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:outline-offset-0"
                  } relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20`}
                >
                  {i + 1}
                </Button>
              )
          )}
          <IconButton
            onClick={() => page !== pages && setPage(page + 1)}
            className="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <ChevronRightIcon />
          </IconButton>
          {page + 3 < pages && (
            <IconButton
              onClick={() => setPage(pages)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <LastPageIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
