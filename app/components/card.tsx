import type {ReactElement} from "react"

interface CardProps {
  className?: string;
  children: ReactElement
}

export function CardBottom({ children, className }: CardProps) {
  const classes = `mt-6 text-xs text-slate-400 ${className}`
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: CardProps) {
  const classes = `${className}`
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export function CardSeparator() {
  return (
    <div className="border border-b-2 my-2" />
  )
}

export function CardTitle({ children }: CardProps) {
  return (
    <div className="my-2 text-lg uppercase indent-1">{children}</div>
  )
}

export function Card({ children, className }: CardProps) {
  const defaultClasses = "bg-teal-100 m-5 p-3 rounded-lg drop-shadow-lg"
  return (
    <div className={`${defaultClasses} ${className}`}>
      {children}
    </div>
  )
}
