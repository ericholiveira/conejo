const LetterAvatar = ({ name }: { name: string }) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export default LetterAvatar
