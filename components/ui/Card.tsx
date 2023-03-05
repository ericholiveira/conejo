import React from 'react'

const Card = (props: { heading: string, children: React.ReactNode }) => {
  const { heading, children } = props

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{heading}</h2>
        <span>{children}</span>
      </div>
    </div>
  )
}

const Body = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={`${className}`}>{children}</div>
}

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

Card.Body = Body
Card.Footer = Footer

export default Card
