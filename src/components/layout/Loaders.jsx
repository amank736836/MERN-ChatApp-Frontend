import { Grid, Skeleton, Stack } from "@mui/material";

export const LayoutLoader = () => {
  return (
    <Grid
      container
      height={"calc(100vh - 6rem)"}
      spacing={"1rem"}
      sx={{
        padding: "1rem",
      }}
    >
      <Grid
        size={{ sm: 4, md: 3 }}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Skeleton
          variant="rounded"
          height={"100vh"}
          sx={{
            padding: "2rem",
          }}
        />
      </Grid>
      <Grid size={{ sm: 8, md: 5, lg: 6, xs: 12 }} height={"100%"} spacing={1}>
        <Stack spacing={"1rem"}>
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} variant="rounded" height={95} sx={{}} />
          ))}
        </Stack>
      </Grid>
      <Grid
        size={{ md: 4, lg: 3 }}
        sx={{
          display: { xs: "none", md: "block" },
        }}
        height={"100%"}
      >
        <Skeleton
          variant="rounded"
          height={"100vh"}
          sx={{
            padding: "2rem",
          }}
        />
      </Grid>
    </Grid>
  );
};
