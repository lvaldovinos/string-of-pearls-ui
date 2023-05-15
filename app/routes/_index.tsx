import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react"
import { gql, useQuery } from "@apollo/client";
import { Card, CardTitle } from '~/components/card'

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
    <Card key={result.date}>
      <CardTitle>
        <div className="relative">
          <h3 className="font-medium tracking-wide">
            <Link to={`/pearls/${result.date}`}>{result.date}</Link>
          </h3>
          <div className="absolute top-6 left-0 font-medium text-sm text-slate-500 font-mono mb-3 dark:text-slate-400">
            {result.total.toString()}
          </div>
        </div> 
      </CardTitle>
    </Card>
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
