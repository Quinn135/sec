"use strict";

function NotFound() {
  return (
    <>
      <div className="flex flex-col w-full min-h-dvh items-center justify-center text-3xl font-bold">
        <div>
          <h1>Oh no!</h1>
          <span className="flex flex-row gap-2 mb-8">
            <h1 className="text-red-600">404</h1>
            <h1>Not found :(</h1>
          </span>
          <h1>Try this: <a href="/" className="underline text-blue-600">home</a></h1>
        </div>
      </div>
    </>
  )
}

export default NotFound
