"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function NewsMediaPage() {

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [items, setItems] = useState([]);

  // Fetch News Media
  useEffect(() => {

    fetch("http://localhost:5000/api/news-media")
      .then(res => res.json())
      .then(result => {

        const formatted = result.data.map(item => ({
          src: item.image,
          title: item.eventName,
          category: item.category,
          year: item.year
        }));

        setItems(formatted);

      })
      .catch(err => console.log(err));

  }, []);


  // Create rows dynamically
  const rows = [];

  for(let i = 0; i < items.length; i += 6){
    rows.push(items.slice(i, i + 6));
  }


  // Flatten for modal
  const flatItems = items;


  const nextImage = () => {

    setSelectedIndex(prev =>
      prev !== null
        ? (prev + 1) % flatItems.length
        : 0
    );

  };


  const prevImage = () => {

    setSelectedIndex(prev =>
      prev !== null
        ? prev === 0
          ? flatItems.length - 1
          : prev - 1
        : 0
    );

  };


return (

<main className="min-h-screen bg-[#f9f7f7]">

{/* Hero */}

<section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-24 px-6">

<div className="text-center">

<h1 className="text-5xl font-bold text-black">
News and Media
</h1>

</div>

</section>


<section className="container mx-auto py-10 px-4">

<div className="px-6 space-y-10">

<h2 className="text-4xl font-bold text-center">
Latest Events
</h2>

<h3 className="text-2xl font-bold text-center">
School Program [2025-2026]
</h3>



{
rows.map((rowItems,rowIndex)=>(

<div key={rowIndex}>

<hr className="my-5"/>

<h4 className="text-2xl font-bold mb-5">
{rowItems[0]?.category || "Events"} 
</h4>


<Swiper

modules={[Autoplay]}

loop={true}

speed={5000}

autoplay={{
delay:0,
disableOnInteraction:false,
pauseOnMouseEnter:true
}}

dir={rowIndex % 2 === 0 ? "rtl":"ltr"}

breakpoints={{

0:{
slidesPerView:1
},

640:{
slidesPerView:2
},

1024:{
slidesPerView:3
}

}}

spaceBetween={20}

>


{

rowItems.map((item)=>{

const globalIndex = flatItems.findIndex(
x=>x.src===item.src
);


return (

<SwiperSlide key={globalIndex}>

<div

onClick={()=>
setSelectedIndex(globalIndex)
}

className="
cursor-pointer
relative
h-[220px]
md:h-[260px]
rounded-xl
overflow-hidden
shadow-lg
group
"

>

<img

src={item.src}

alt={item.title}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-110
"

/>

<div className="
absolute
bottom-0
bg-black/50
text-white
w-full
p-3
text-center
">

{item.title}

</div>

</div>

</SwiperSlide>

)

})

}


</Swiper>


</div>

))

}


</div>

</section>




{/* Modal */}

{
selectedIndex !== null && flatItems[selectedIndex] && (

<div className="
fixed
inset-0
bg-black/70
backdrop-blur-md
flex
items-center
justify-center
z-50
">

<button

onClick={()=>setSelectedIndex(null)}

className="
absolute
top-6
right-6
text-white
text-3xl
font-bold
"

>
✕
</button>


<button

onClick={prevImage}

className="
absolute
left-6
text-white
text-5xl
"

>
‹
</button>




<div className="text-center">

<img

src={flatItems[selectedIndex].src}

alt={flatItems[selectedIndex].title}

className="
max-h-[80vh]
max-w-[90vw]
rounded-lg
shadow-xl
"

/>


<p className="
text-white
mt-4
text-xl
font-semibold
">

{flatItems[selectedIndex].title}

</p>

</div>




<button

onClick={nextImage}

className="
absolute
right-6
text-white
text-5xl
"

>
›
</button>



</div>

)

}


</main>

);

}

