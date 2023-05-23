import type {LoaderArgs} from "@remix-run/node";
import { gql, useMutation, useQuery } from "@apollo/client";
import {useLoaderData} from "@remix-run/react";
import { Card, CardTitle, CardSeparator, CardContent, CardBottom } from '~/components/card'

const GET_BY_DATE = gql`
  query GetByDate($date: String!) {
    getByDate(date: $date) {
      name,
      turd,
      notes
    }
  }
`

interface GetByDateResult {
  name: String;
  turd: String;
  notes: String;
}

export function loader({ params }: LoaderArgs) {
  return params.date
}

export default function Pearls() {
  const date = useLoaderData<typeof loader>()
  const { data } = useQuery(GET_BY_DATE, {
    variables: {
      date
    }
  })
  const pearls = data?.getByDate?.map((result: GetByDateResult) => (
    <Card key={result.name} className='w-80'>
      <CardTitle>
        <h2 className="no-underline font-semibold">{result.name}</h2>
      </CardTitle>
      <CardContent className="h-32 overflow-y-auto">
        <p>{result.notes}</p>
      </CardContent>
      <CardSeparator />
      <CardBottom className="h-10 overflow-y-auto">
        <p>{result.turd}</p>
      </CardBottom>
    </Card>
  ))
  return (
    <div className="bg-purple-50 h-screen flex items-center justify-center drop-shadow-md">
      <div className="bg-slate-50 h-2/5 w-11/12 rounded-lg drop-shadow-lg overflow-x-auto flex items-center justify-start">
        {pearls}
      </div>
    </div>
  )
}
