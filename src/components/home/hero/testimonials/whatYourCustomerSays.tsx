"use client";

const reviews = [
  {
    rating: 5,
    text: "description description description description description description description description description description description",
    user: "User Name",
  },
  {
    rating: 5,
    text: "description description description description description description description description description description description",
    user: "User Name",
  },
  {
    rating: 4,
    text: "description description description description description description description description description description description",
    user: "User Name",
  },
  {
    rating: 5,
    text: "description description description description description description description description description description description",
    user: "User Name",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto w-300">
        <h2 className="mb-10 text-center text-2xl font-semibold text-[#5b567a]">
          What Our Customers Say
        </h2>

        <div className="flex gap-6 pb-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="w-100 h-100 rounded-xl bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
            >
              <h4 className="text-lg font-semibold text-[#5b567a]">Rating</h4>

              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                {review.text}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#ededf0]"></div>

                <span className="text-sm font-medium text-gray-600">
                  {review.user}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
