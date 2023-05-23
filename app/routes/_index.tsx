import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react"
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card, CardTitle } from '~/components/card'
import type {SyntheticEvent} from "react";
import { useRef, useEffect } from 'react'

const GET_ALL_QUERY = gql`
  query GetAll {
    getAll {
      date,
      total
    }
  }
`

const CREATE_PEARL = gql`
  mutation CreatePearl($pearl: PearlInput!) {
    createPearl(pearl: $pearl) {
      name,
      turd,
      notes
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
  const formRef = useRef<HTMLFormElement>()
  const { data, error } = useQuery(GET_ALL_QUERY)
  const [createPearl, { loading: createLoading, error: createError, data: createData }] = useMutation(CREATE_PEARL, {
    refetchQueries: [
      GET_ALL_QUERY
    ]
  })
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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const now = new Date()
    const date = `${now.getFullYear()}-${now.getMonth() < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}-${now.getDate()}`
    const formData = new FormData(formRef.current)
    const pearl = {
      date,
      ...Object.fromEntries(formData)
    }
    createPearl({
      variables: {
        pearl
      }
    })
  }

  useEffect(() => {
    if (createData) { 
      // success response
      formRef.current?.reset()
    }
  }, [createData])

  return (
    <div>
      <h1 className='text-xl pb-6'>My string of pearls</h1>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="flex flex-col border-2 p-10 rounded-lg mb-8">
            <div className="flex flex-col">
              <label htmlFor="name" className="my-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="my-2 rounded-lg drop-shadow-lg p-4"
                disabled={createLoading}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="notes" className="my-2">Notes</label>
              <textarea
                id="notes"
                name="notes" className="my-2 rounded-lg drop-shadow-lg h-32 p-4" disabled={createLoading}></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="turd" className="my-2">Turd</label>
              <textarea id="turd" name="turd" className="my-2 rounded-lg drop-shadow-lg h-16 p-4" disabled={createLoading}></textarea>
            </div>
            <div className="my-2 flex justify-end">
              <button
                disabled={createLoading}
                type="submit"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                {createLoading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      <div className='bg-purple-50 rounded-lg max-h-screen overflow-y-auto'>
        {stringOfPearls}
      </div>
    </div>
  );
}
