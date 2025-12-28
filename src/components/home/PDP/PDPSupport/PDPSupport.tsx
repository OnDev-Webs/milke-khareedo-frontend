export default function PDPSupport() {
  return (
    <div className="w-full container rounded-3xl bg-neutral-200 py-6 text-center mx-auto">
      <p className="text-lg font-semibold text-gray-800">
        Hi, I am here to Answer <br /> all your queries.
      </p>

      <div className="mt-3 rounded-2xl p-4">
        <div className="relative flex h-40 w-full items-center justify-center rounded-xl bg-white">
          <div className="absolute left-2 bottom-2 mt-3 flex items-center gap-2 text-sm text-gray-600">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100"></div>
            <span>5 Start Rating</span>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-lg font-semibold text-gray-900">Gauswami Goli</p>
          <p className="text-sm text-gray-500">Relationship Manager</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4">
        <div className="flex w-full items-center justify-center gap-3">
          <button className="w-1/2 rounded-full border border-gray-300 bg-white py-2 text-xs font-medium text-gray-700">
            Phone No
          </button>
          <button className="w-1/2 rounded-full border border-gray-300 bg-white py-2 text-xs font-medium text-gray-700">
            Email ID
          </button>
        </div>

        <button className="w-full rounded-full border border-gray-300 bg-white py-3 text-xs font-semibold text-gray-700">
          Book A Visit
        </button>
      </div>
    </div>
  );
}
