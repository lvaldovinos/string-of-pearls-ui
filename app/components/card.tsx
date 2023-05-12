import { Link } from "@remix-run/react"

interface CardProps {
  title: String;
  subTitle?: String;
  content: String
}

export default function Card({ title, subTitle, content }: CardProps) {
  return (
    <div className="bg-teal-100 m-2 p-3 rounded-lg">
      <div className="relative">
        <h3 className="font-medium tracking-wide">
          <Link to={`/pearls/${title}`}>{title}</Link>
        </h3>
        {subTitle ? (
          <div className="absolute top-4 left-0 font-medium text-sm text-slate-500 font-mono mb-3 dark:text-slate-400">
            {subTitle}
          </div>
        ) : null}
      </div> 
      <div className="">
        {content}      
      </div>
    </div>
  )
}
