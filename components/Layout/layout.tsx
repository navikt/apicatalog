import { Box, InternalHeader, Page, Search, Spacer } from "@navikt/ds-react";

export const Layout =({ children }: { children: React.ReactNode }) => {
  return (
    <Page
      footer={
        <InternalHeader>
          <Spacer />
        </InternalHeader>
      }
    >
      <InternalHeader>
        <InternalHeader.Title as="h1">NAV APIs</InternalHeader.Title>
        <form
          style={{ margin: "10px" }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Search!");
          }}
        >
          <Search
            label="search"
            size="small"
            variant="simple"
            placeholder="search"
          />
        </form>
      </InternalHeader>
      <Box padding="8" paddingBlock="16" as="main">
        <Page.Block gutters width="lg">
          {children}
        </Page.Block>
      </Box>
    </Page>
  );
}
