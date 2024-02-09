import { Api, Product, getProducts } from "@/data/products";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { promises as fs } from "fs";
import { Box, List, Spacer, VStack } from "@navikt/ds-react";
import { PadlockUnlockedIcon } from "@navikt/aksel-icons";
import { PadlockLockedIcon } from "@navikt/aksel-icons";
import Link from "next/link";
import { ExternalLinkIcon } from "@navikt/aksel-icons";

export const getServerSideProps = (async () => {
  return { props: { products: await getProducts() } };
}) satisfies GetServerSideProps<{ products: Product[] }>;

export default function Api({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const productId = router.query.product;
  const apiId = router.query.api;
  const product = products.find((p) => p.id === productId);
  const api = product?.apis.find((a) => a.id === apiId);

  return (
    <Box
      borderWidth="2"
      padding="8"
      borderRadius={{ md: "large" }}
      background="surface-subtle"
    >
      <h1>
        {product?.name} - {api?.name}
      </h1>
      <p>{api?.description}</p>
      <VStack gap="4">
        {api?.authentication && (
          <Box padding="4" background="surface-default" borderRadius={"xlarge"}>
            <List title="Authentication">
              <List.Item>
                Type:{" "}
                <code style={{ fontSize: "1rem" }}>
                  {api?.authentication?.type}
                </code>
              </List.Item>
              <List.Item>
                Scope:{" "}
                <code style={{ fontSize: "1rem" }}>
                  {api?.authentication?.scopes.join(", ")}
                </code>
              </List.Item>
            </List>
          </Box>
        )}
        <Box padding="4" background="surface-default" borderRadius={"xlarge"}>
          <List title="OpenAPI Url">
            <List.Item
              icon={
                <ExternalLinkIcon
                  aria-hidden
                  title="a11y-title"
                  fontSize="1.5rem"
                />
              }
            >
              <Link href={api?.openApiUrl || '/notfound'}>{api?.openApiUrl}</Link>
            </List.Item>
          </List>
        </Box>
        {api?.openEndpoints && (
          <Box padding="4" background="surface-default" borderRadius={"xlarge"}>
            <List title="Open Endpoints">
              {api?.openEndpoints.map((endpoint, i) => (
                <List.Item
                  key={i}
                  icon={<PadlockUnlockedIcon aria-hidden fontSize="1.5rem" />}
                >
                  {endpoint.url}
                </List.Item>
              ))}
            </List>
          </Box>
        )}
        {api?.endpoints && (
          <Box padding="4" background="surface-default" borderRadius={"xlarge"}>
            <List title="Protected Endpoints">
              {api?.endpoints.map((endpoint, i) => (
                <List.Item
                  key={i}
                  icon={<PadlockLockedIcon aria-hidden fontSize="1.5rem" />}
                >
                  {endpoint.url}
                </List.Item>
              ))}
            </List>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
