import type { V2_MetaFunction } from "@remix-run/node";
import { gql, useQuery } from "@apollo/client";
import Card from '~/components/card'

const GET_ALL_QUERY = gql`
  query GetAll {
    getAll {
      date,
      total
    }
  }
`

interface StringOfPearlResult {
  date: String;
  total: Number;
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const { data, error } = useQuery(GET_ALL_QUERY)
  const stringOfPearls = data?.getAll?.map((result : StringOfPearlResult) => (
    <Card
      key={result.date}
      title={result.date}
      subTitle={result.total.toString()}
    />
  ))

  return (
    <div>
      <h1 className='text-xl pb-6'>My string of pearls</h1>
      <div className='bg-purple-50 rounded-lg max-h-screen overflow-y-auto'>
        {stringOfPearls}
      </div>
    </div>
  );
}
