import type { ReactElement } from 'react'
import {useState} from "react";
import { Link } from "@remix-run/react";

export interface CollapsableProps {
  title: string;
  subTitle: string;
  linkTo: string;
  onCollapse(): void;
  shown: boolean | null;
  children: ReactElement
}

export function Collapsable({
  shown = null,
  children,
  onCollapse,
  linkTo,
  title,
  subTitle
}: CollapsableProps) {
  let showAux: boolean = false
  const [show, setShow] = useState(false)
  const isStateLess = shown !== null
  if (!isStateLess) {
    showAux = show
  } else {
    showAux = shown
  }
  const handleClick = () => {
    if (!isStateLess) {
      setShow(!showAux)
    }
    onCollapse()
  }
  return (
    <div className="bg-teal-100 m-5 p-3 rounded-lg drop-shadow-lg">
      <div className="my-2 flex justify-between items-center">
        <div className="flex justify-around items-center">
          <h3 className="font-medium tracking-wide text-lg uppercase indent-1">
            <Link to={linkTo} onClick={() => handleClick()}>{title}</Link>
          </h3>
          <div className="font-medium text-sm text-slate-500 font-mono dark:text-slate-400">
            ({subTitle})
          </div>
        </div>
        <div>
          {showAux ? (
            <Link to="/string-of-pearls">
              <img src="/img/close.svg" alt="Close" />
            </Link>
          ) : null}
        </div>
      </div>
      {showAux ? children : null}
    </div>
  )
}
