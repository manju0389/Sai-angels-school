
export default function BoardingHomePage() {


  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-25 px-6">
        <div className="mx-auto text-center">
          <h1 className="text-5xl font-bold text-black mb-3">
            Sai Angels Boarding Home
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto py-6 ">

          <div className="text-justify">
            <h2 className="block text-2xl mb-2 font-bold"> Devotion </h2>
            <p className="mb-6 text-base leading-7 text-gray-800">
              Boarders’ Dining Hall is a hygienic food shrine that pledges to cater to all boarders’ health 
              requisites. Breakfast through to banquet, the precedence is set by invocation for indulged eating and 
              health benefits for our children so that they savour every morsel they have and their metabolism grows 
              stronger.
            </p>

            <h2 className="block text-2xl mb-2 font-bold"> A Home Away From Home </h2>
            <p className="text-base leading-7 text-gray-800">
              Boarding Dormitory makes them feel nothing less than home while being away. Studded in a placid zone 
              of the campus, it creates perfectly suitable aura for studies as well as peaceful co-existence of the 
              boarders. Cleanliness is top priority invigilated periodically by the authorities.
            </p>

          </div>

      </section>
    </main>
  );
}