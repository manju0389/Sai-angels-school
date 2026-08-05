"use client";

import { useEffect, useRef, useState } from "react";

interface GalleryImage {
  _id: string;
  title: string;
  category: string;
  image: string;
}

export default function AdminGallery() {

  const API = `${process.env.NEXT_PUBLIC_API_URL}/admin/PhotoGallery`;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Sai Angels School");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch gallery images
  const fetchData = async () => {
    try {
      const res = await fetch(API);
      const result = await res.json();
      console.log("Gallery:", result);
      if (!res.ok) {
        throw new Error(result.message);
      }
      setPreview(result.data || []);
    } catch(error) {
      console.log(error);
    }
  };

  // Upload image
  const handleSave = async () => {
    if(loading) return;
    if(!title.trim()){
      alert("Enter title");
      return;
    }

    if(!image){
      alert("Choose image");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    // Cloudinary folder name
    formData.append(
      "folder", "Gallery"
    );

    try {
      setLoading(true);
      const res = await fetch(API,{
        method:"POST",
        body:formData
      });

      const result = await res.json();
      console.log("Upload response:",result);
      if(!res.ok){
        alert(result.message || "Upload failed");
        return;
      }

      alert("Uploaded Successfully");
      setTitle("");
      setCategory("Sai Angels School");
      setImage(null);
      if(fileRef.current){
        fileRef.current.value="";
      }
      await fetchData();
    } catch(error){
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete image
  const deleteImage = async(id:string)=>{
    const confirmDelete = window.confirm(
      "Delete this image?"
    );
    if(!confirmDelete) return;
    try{
      const res = await fetch(`${API}/${id}`,{
        method:"DELETE"
      });

      const result = await res.json();
      console.log(result);
      if(!res.ok){
        alert(result.message || "Delete failed");
        return;
      }
      alert("Deleted Successfully");
      await fetchData();
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-xl p-8 border">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upload Gallery Image
        </h2>

        <form onSubmit={(e)=>{e.preventDefault(); handleSave();}}className="grid gap-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Title
            </label>

            <input type="text" value={title} placeholder="Enter Image Title" onChange={(e)=>setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>

            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full rounded-lg border border-gray-300 p-3">

              <option>
                Sai Angels School
              </option>

              <option>
                Little Sai Angels
              </option>

              <option>
                Sai Cherubs
              </option>

              <option>
                Sai Boarding Home
              </option>
            </select>
          </div>
          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Upload Image
            </label>

            <input ref={fileRef} type="file" accept="image/*" onChange={(e)=>{if(e.target.files){setImage(e.target.files[0]);}}}
                className="block w-full text-sm cursor-pointer"
            />
          </div>

          <button disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg py-3 font-semibold cursor-pointer w-50"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>

      <div className="mt-10 bg-white shadow-lg rounded-xl border border-gray-300 rounded-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-semibold">
            Gallery Preview
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
            <tr className="bg-[#10458e] text-white">
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Images</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Action</th>
            </tr>
            </thead>

            <tbody>
            {
              preview.length===0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6">
                    No Images Uploaded
                  </td>
                </tr>
              ) : (
                preview.map((item,index)=>(

                  <tr key={item._id} className="border-t" >
                    <td className="p-4">
                      {index+1}
                    </td>

                    <td className="p-4">
                      <img src={item.image} alt={item.title} className="h-20 w-20 rounded-lg object-cover border" />
                    </td>

                    <td className="p-4">
                      {item.title}
                    </td>

                    <td className="p-4">
                      {item.category}
                    </td>

                    <td className="p-4">
                      <button onClick={()=>deleteImage(item._id)} className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer" >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}