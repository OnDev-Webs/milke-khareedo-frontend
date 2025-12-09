export default function Heading() {
  return (
    <section className="py-25 px-30">
      <div className="shadow-[0_0_10px_rgba(0,0,0,0.08)] py-21.5 px-12.5 rounded-4xl flex justify-between">
        <div className="flex flex-col w-md">
            <h2 className="font-bold text-4xl leading-12 text-[#5D5A88]">Heading</h2>
            <p className="text-[#9795B5]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nulla recusandae iure fugiat? Laboriosam, ex? Vel et aliquam praesentium distinctio nam iusto, suscipit voluptatum maiores qui tenetur, ducimus adipisci reprehenderit!</p>
        </div>
        <div className=" flex items-center justify-center p-4">
            <div className="w-150 h-25  bg-[#D9D9D9] rounded-full flex items-center p-4 gap-4">
                <input type="text" 
                placeholder="Text"
                className=" w-full p-4 focus:outline-none rounded-full text-3xl"
                />
                <button className=" rounded-full border border-[#969696] bg-white px-12 py-5 text-sm font-semibold text-[#7D7D7D]">
                {"Button"}
              </button>
            </div>
        </div>
      </div>
    </section>
  );
}
