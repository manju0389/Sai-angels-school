"use client";

import {useState} from "react";


export default function NewsMediaAdmin(){


const [form,setForm]=useState({

eventName:"",
category:"",
year:"",
image:null

});



const submit=async(e)=>{

e.preventDefault();


const data=new FormData();


data.append(
"eventName",
form.eventName
);


data.append(
"category",
form.category
);


data.append(
"year",
form.year
);


data.append(
"image",
form.image
);



await fetch(
"http://localhost:5000/api/news-media",
{
method:"POST",
body:data
}
);



alert("Uploaded");


};



return(

<div className="p-10">


<h1 className="text-3xl font-bold mb-10">
News Media Upload
</h1>



<form 
onSubmit={submit}
className="space-y-5"
>



<input

className="border p-3 w-full"

placeholder="Event Name"

onChange={(e)=>
setForm({
...form,
eventName:e.target.value
})
}

/>



<input

className="border p-3 w-full"

placeholder="Category"

onChange={(e)=>
setForm({
...form,
category:e.target.value
})
}

/>




<input

className="border p-3 w-full"

placeholder="Year"

onChange={(e)=>
setForm({
...form,
year:e.target.value
})
}

/>





<input

type="file"

className="border p-3 w-full"

onChange={(e)=>
setForm({
...form,
image:e.target.files[0]
})
}

/>





<button

className="
bg-purple-600
text-white
px-6
py-3
rounded
"

>

Upload

</button>



</form>


</div>

)


}