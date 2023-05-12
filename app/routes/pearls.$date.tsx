import type {LoaderArgs} from "@remix-run/node";

export function loader({ params }: LoaderArgs) {
  console.log(params)
  return params
}

export default function Pearls() {
  return (
    <div>
      Pearls 
    </div>
  )
}
