"use client";

export default function MissionVision() {
  return (
    <section className="w-full bg-[#f7f7fb] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <h3 className="text-xl font-semibold text-[#5b567a]">Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              earum, laboriosam consequuntur illo quae rem, aut voluptate error
              itaque velit iste architecto, nemo excepturi. Voluptatum provident
              a, deleniti modi officiis necessitatibus nulla aliquam sapiente
              adipisci laudantium quo velit, inventore ipsum?
            </p>
          </div>

          <div className="hidden h-40 w-px bg-[#d3d1e0] md:block" />

          <div>
            <h3 className="text-xl font-semibold text-[#5b567a]">Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur ullam, minima aspernatur doloremque iusto dolores
              atque natus deserunt quo exercitationem dolorem ducimus tempora
              officiis asperiores enim assumenda voluptates iste rerum rem
              fugiat excepturi ipsam odit sunt dolorum. Praesentium, ipsam
              incidunt!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}