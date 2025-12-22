import PropertyCard from "./propertyCard";

type Property = {
  id: string;
  title: string;
  owner: string;
  location: string;
  price: string;
  perSqft?: string;
  area?: string;
  status?: string;
  floor?: string;
  description?: string;
};

const sample: Property[] = [
  {
    id: "1",
    title: "2 BHK Flat for Sale in Hagadur, Whitefield",
    owner: "Amoan John",
    location: "Whitefield, Bangalore",
    price: "₹ 69.3 Lac",
    perSqft: "₹ 7,568 per sqft",
    area: "135 sqft",
    status: "Ready to move",
    floor: "4 out of 4",
    description:
      "Multistory apartment is available for sale. It is a good location property. Please contact ...",
  },
  {
    id: "2",
    title: "2 BHK Flat for Sale in Hagadur, Whitefield",
    owner: "Amoan John",
    location: "Whitefield, Bangalore",
    price: "₹ 69.3 Lac",
    perSqft: "₹ 7,568 per sqft",
    area: "135 sqft",
    status: "Ready to move",
    floor: "4 out of 4",
    description:
      "Multistory apartment is available for sale. It is a good location property. Please contact ...",
  },
  {
    id: "3",
    title: "2 BHK Flat for Sale in Hagadur, Whitefield",
    owner: "Amoan John",
    location: "Whitefield, Bangalore",
    price: "₹ 69.3 Lac",
    perSqft: "₹ 7,568 per sqft",
    area: "135 sqft",
    status: "Ready to move",
    floor: "4 out of 4",
    description:
      "Multistory apartment is available for sale. It is a good location property. Please contact ...",
  },
];

export default function PropertyArchive() {
  return (
    <div className="bg-white py-8">
      <div className="max-w-300 mx-auto max-md:px-4">
        <div className="mb-6 ">
          <div className="border-b flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Properties (2653)
              </h1>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Short by:</span>
              <select className="rounded bg-white px-3 py-2 ">
                <option>Relevance</option>
              </select>
            </div>
          </div>
          <p className="mt-4 font-semibold">
            {2653} results | Flats in Whitefield, Bangalore
          </p>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
            earum autem dicta, blanditiis labore reprehenderit nostrum
            laboriosam architecto quisquam temporibus quia necessitatibus
            assumenda consectetur sapiente recusandae delectus officiis debitis.
            Nostrum.
          </p>
        </div>

        <div className="space-y-6">
          {sample.map((p) => (
            <div key={p.id} className="rounded-lg bg-transparent">
              <PropertyCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
