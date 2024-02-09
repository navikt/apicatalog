import { Product, getProducts } from "@/data/products";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import useSWR from "swr";
import { BodyLong, ExpansionCard, LinkPanel } from "@navikt/ds-react";
import NextLink from "next/link";

export const getServerSideProps = (async () => {
  return { props: { products: await getProducts() } };
}) satisfies GetServerSideProps<{ products: Product[] }>;

export default function Home({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /*const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;*/
  return (
    <main>
      {products.length === 0 ? (
        <h1>No APIs found</h1>
      ) : (
        products.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })
      )}
    </main>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <ExpansionCard aria-label="Demo med bare tittel">
        <ExpansionCard.Header>
          <ExpansionCard.Title>{product.name}</ExpansionCard.Title>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <BodyLong spacing>{product.description}</BodyLong>
          {product.apis.map((api, i) => (
            <LinkPanel
              href={`${product.id}/apis/${api.id}`}
              key={i}
              border={false}
              as={NextLink}
            >
              <LinkPanel.Title>{api.name}</LinkPanel.Title>
              <LinkPanel.Description>{api.description}</LinkPanel.Description>
            </LinkPanel>
          ))}
        </ExpansionCard.Content>
      </ExpansionCard>
    </>
  );
};
