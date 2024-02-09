import { Product } from "@/data/model";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { promises as fs } from 'fs';
import useSWR from 'swr';
import { BodyLong, ExpansionCard, LinkPanel } from "@navikt/ds-react";
import NextLink from 'next/link'; 

export const getServerSideProps = (async () => {
  const file = await fs.readFile(process.cwd() + '/data/products.json', 'utf8');
  const products = JSON.parse(file) as Product[];
  return { props: { products } }
}) satisfies GetServerSideProps<{ products: Product[] }>

export default function Home({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /*const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;*/
  return (
    <main>
      <h1>Products</h1>
      {products.map((product, i) => {
        return <ProductCard key={i} product={product} />
      })}
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
            <LinkPanel href={ `${product.id}/apis/${api.id}`} key={i} border={false} as={NextLink}>
              <LinkPanel.Title>{api.name}</LinkPanel.Title>
              <LinkPanel.Description>{api.description}</LinkPanel.Description>
            </LinkPanel>
          ))}
        </ExpansionCard.Content>
      </ExpansionCard>
    </>
  );
};