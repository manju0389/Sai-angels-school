
"use client";

import { useEffect, useState, useRef } from "react";

interface Banner {
  _id: string;
  image: string;
  publicId: string;
  isActive: boolean;
  order: number;
}

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  message: string;
  initials: string;
  color: string;
  rating: number;
  isActive: boolean;
  order: number;
}

interface Topper {
  _id: string;
  name: string;
  score: string;
  poster: string;
  publicId: string;
  isActive: boolean;
  order: number;
}

interface GalleryImage {
  _id: string;
  image: string;
  publicId: string;
  alt: string;
  isActive: boolean;
  order: number;
}

interface News {
  _id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  link: string;
  isActive: boolean;
  order: number;
}

const API = `${process.env.NEXT_PUBLIC_API_URL}/home`;

export default function HomePage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // TOPPERS STATES
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [topperName, setTopperName] = useState("");
  const [topperScore, setTopperScore] = useState("");
  const [topperFile, setTopperFile] = useState<File | null>(null);
  const [topperPreview, setTopperPreview] = useState("");
  const [editingTopperId, setEditingTopperId] = useState<string | null>(null);

  // TESTIMONIALS STATES
const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
const [testimonialName, setTestimonialName] = useState("");
const [testimonialRole, setTestimonialRole] = useState("Parent Testimonial");
const [testimonialMessage, setTestimonialMessage] = useState("");
const [testimonialInitials, setTestimonialInitials] = useState("P");
  const [testimonialRating, setTestimonialRating] = useState(5);
const [testimonialColor, setTestimonialColor] = useState(
  "bg-purple-100 text-purple-700"
);
const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  // GALLERY STATES
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryPreview, setGalleryPreview] = useState("");
  const [galleryAlt, setGalleryAlt] = useState("");
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

  // NEWS STATES
const [news, setNews] = useState<News[]>([]);
const [newsDate, setNewsDate] = useState("");
const [newsCategory, setNewsCategory] = useState("Announcement");
const [newsTitle, setNewsTitle] = useState("");
const [newsDescription, setNewsDescription] = useState("");
const [newsLink, setNewsLink] = useState("");
const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

  // THOUGHT FOR THE DAY STATES
const [thoughtQuote, setThoughtQuote] = useState("");

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const galleryEditingId = useRef<string | null>(null);
  
  const editInputRef = useRef<HTMLInputElement>(null);
  const editingId = useRef<string | null>(null);

  // FETCH BANNERS
  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API}/banners`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch banners");
      }

      setBanners(data.banners || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load banners");
    }
  };

  // FETCH THOUGHT FOR THE DAY
const fetchThought = async () => {
  try {
    const response = await fetch(`${API}/thought`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch thought");
    }

    setThoughtQuote(data.thought?.quote || "");
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to load thought"
    );
  }
};

  // FETCH TESTIMONIALS
const fetchTestimonials = async () => {
  try {
    const response = await fetch(`${API}/testimonials`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch testimonials");
    }

    setTestimonials(data.testimonials || []);
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to load testimonials"
    );
  }
};

  // FETCH TOPPERS
  const fetchToppers = async () => {
    try {
      const response = await fetch(`${API}/toppers`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch toppers");
      }

      setToppers(data.toppers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load toppers");
    }
  };

  useEffect(() => {
  fetchBanners();
  fetchToppers();
  fetchGallery();
  fetchNews();
  fetchTestimonials();
  fetchThought();
}, []);


  // FETCH NEWS
const fetchNews = async () => {
  try {
    const response = await fetch(`${API}/news`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch news");
    }

    setNews(data.news || []);
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to load news"
    );
  }
};

  // FETCH GALLERY
const fetchGallery = async () => {
  try {
    const response = await fetch(`${API}/gallery`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch gallery");
    }

    setGallery(data.gallery || []);
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to load gallery"
    );
  }
};

  // BANNER UPLOAD
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = Array.from(e.target.files || []);

    previews.forEach((url) => URL.revokeObjectURL(url));

    if (selected.length > 10) {
      setError("Maximum 10 images can be uploaded at once");
      setFiles([]);
      setPreviews([]);
      return;
    }

    setError("");
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select banner images");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(`${API}/banners`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage("Banners uploaded successfully!");

      previews.forEach((url) => URL.revokeObjectURL(url));

      setFiles([]);
      setPreviews([]);

      await fetchBanners();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // BANNER EDIT
  const handleEdit = (id: string) => {
    editingId.current = id;
    editInputRef.current?.click();
  };

  const handleReplace = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const id = editingId.current;

    if (!file || !id) return;

    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setError("Select a valid image under 10 MB");
      e.target.value = "";
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API}/banners/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      setMessage("Banner updated successfully!");
      await fetchBanners();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
      editingId.current = null;
      e.target.value = "";
    }
  };

  // BANNER DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner? This will remove it from MongoDB and Cloudinary."
    );

    if (!confirmDelete) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/banners/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete banner");
      }

      alert("Banner deleted successfully!");
      await fetchBanners();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete banner");
    } finally {
      setLoading(false);
    }
  };

  // BANNER STATUS
  const handleStatus = async (id: string) => {
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/banners/${id}/status`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setMessage("Banner status updated!");
      await fetchBanners();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Status update failed");
    }
  };

  // SAVE / UPDATE THOUGHT
const handleThoughtSubmit = async () => {
  if (!thoughtQuote.trim()) {
    setError("Please enter the thought for the day");
    return;
  }

  setLoading(true);
  setError("");
  setMessage("");

  try {
    const response = await fetch(`${API}/thought`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: thoughtQuote.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save thought");
    }

    setThoughtQuote(data.thought?.quote || thoughtQuote.trim());
    setMessage("Thought for the Day updated successfully!");
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to save thought"
    );
  } finally {
    setLoading(false);
  }
};

  // RESET TOPPER FORM
  const resetTopperForm = () => {
    if (topperPreview.startsWith("blob:")) {
      URL.revokeObjectURL(topperPreview);
    }

    setTopperName("");
    setTopperScore("");
    setTopperFile(null);
    setTopperPreview("");
    setEditingTopperId(null);
  };

  // ADD OR UPDATE TOPPER
  const handleTopperSubmit = async () => {
    if (!topperName.trim() || !topperScore.trim()) {
      setError("Please enter student name and score");
      return;
    }

    if (!editingTopperId && !topperFile) {
      setError("Please select a topper poster");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("name", topperName.trim());
      formData.append("score", topperScore.trim());

      if (topperFile) {
        formData.append("poster", topperFile);
      }

      const url = editingTopperId
        ? `${API}/toppers/${editingTopperId}`
        : `${API}/toppers`;

      const response = await fetch(url, {
        method: editingTopperId ? "PUT" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save topper");
      }

      setMessage(
        editingTopperId
          ? "Topper updated successfully!"
          : "Topper added successfully!"
      );

      resetTopperForm();
      await fetchToppers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save topper");
    } finally {
      setLoading(false);
    }
  };

  // TOPPER EDIT
  const handleTopperEdit = (topper: Topper) => {
    setEditingTopperId(topper._id);
    setTopperName(topper.name);
    setTopperScore(topper.score);
    setTopperFile(null);
    setTopperPreview(topper.poster);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // TOPPER FILE SELECT
  const handleTopperFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 10 * 1024 * 1024
    ) {
      setError("Select a JPG, PNG or WebP image under 10 MB");
      e.target.value = "";
      return;
    }

    if (topperPreview.startsWith("blob:")) {
      URL.revokeObjectURL(topperPreview);
    }

    setError("");
    setTopperFile(file);
    setTopperPreview(URL.createObjectURL(file));
  };

  // TOPPER DELETE
  const handleTopperDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this topper? This will remove the record from MongoDB and the poster from Cloudinary."
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/toppers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete topper");
      }

      alert("Topper deleted successfully!");
      await fetchToppers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete topper");
    } finally {
      setLoading(false);
    }
  };

  // TOPPER STATUS
  const handleTopperStatus = async (id: string) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/toppers/${id}/status`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setMessage("Topper status updated!");
      await fetchToppers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Status update failed");
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
// TESTIMONIALS MANAGEMENT
// ==========================================

// RESET TESTIMONIAL FORM
const resetTestimonialForm = () => {
  setTestimonialName("");
  setTestimonialRole("Parent Testimonial");
  setTestimonialMessage("");
  setTestimonialInitials("P");
  setTestimonialColor("bg-purple-100 text-purple-700");
  setTestimonialRating(5);
  setEditingTestimonialId(null);
};

// ADD OR UPDATE TESTIMONIAL
const handleTestimonialSubmit = async () => {
  if (!testimonialName.trim() || !testimonialMessage.trim()) {
    setError("Please enter parent name and testimonial message");
    return;
  }

  setLoading(true);
  setError("");
  setMessage("");

  try {
    const payload = {
      name: testimonialName.trim(),
      role: testimonialRole.trim(),
      message: testimonialMessage.trim(),
      initials:
        testimonialInitials.trim() ||
        testimonialName.trim().charAt(0).toUpperCase(),
      color: testimonialColor,
      rating: testimonialRating,
    };

    const url = editingTestimonialId
      ? `${API}/testimonials/${editingTestimonialId}`
      : `${API}/testimonials`;

    const response = await fetch(url, {
      method: editingTestimonialId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save testimonial");
    }

    setMessage(
      editingTestimonialId
        ? "Testimonial updated successfully!"
        : "Testimonial added successfully!"
    );

    resetTestimonialForm();
    await fetchTestimonials();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to save testimonial"
    );
  } finally {
    setLoading(false);
  }
};

// EDIT TESTIMONIAL
const handleTestimonialEdit = (item: Testimonial) => {
  setEditingTestimonialId(item._id);
  setTestimonialName(item.name);
  setTestimonialRole(item.role || "Parent Testimonial");
  setTestimonialMessage(item.message);
  setTestimonialInitials(item.initials || "P");
  setTestimonialColor(
    item.color || "bg-purple-100 text-purple-700"
  );
  setTestimonialRating(item.rating ?? 5);

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

// DELETE TESTIMONIAL
const handleTestimonialDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this testimonial?"
  );

  if (!confirmed) return;

  setLoading(true);
  setError("");
  setMessage("");

  try {
    const response = await fetch(`${API}/testimonials/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete testimonial");
    }

    setMessage("Testimonial deleted successfully!");

    if (editingTestimonialId === id) {
      resetTestimonialForm();
    }

    await fetchTestimonials();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to delete testimonial"
    );
  } finally {
    setLoading(false);
  }
};

// TESTIMONIAL STATUS
const handleTestimonialStatus = async (id: string) => {
  setLoading(true);
  setError("");
  setMessage("");

  try {
    const response = await fetch(`${API}/testimonials/${id}/status`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Status update failed");
    }

    setMessage("Testimonial status updated successfully!");
    await fetchTestimonials();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Status update failed"
    );
  } finally {
    setLoading(false);
  }
};


  // ==========================================
// NEWS MANAGEMENT
// ==========================================

// RESET NEWS FORM
const resetNewsForm = () => {
  setNewsDate("");
  setNewsCategory("Announcement");
  setNewsTitle("");
  setNewsDescription("");
  setNewsLink("");
  setEditingNewsId(null);
};

// ADD OR UPDATE NEWS
const handleNewsSubmit = async () => {
  if (
    !newsDate ||
    !newsCategory.trim() ||
    !newsTitle.trim() ||
    !newsDescription.trim()
  ) {
    setError("Please fill all required news fields");
    return;
  }

  setLoading(true);
  setError("");
  setMessage("");

  try {
    const payload = {
      date: newsDate,
      category: newsCategory.trim(),
      title: newsTitle.trim(),
      description: newsDescription.trim(),
      link: newsLink.trim(),
    };

    const url = editingNewsId
      ? `${API}/news/${editingNewsId}`
      : `${API}/news`;

    const response = await fetch(url, {
      method: editingNewsId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save news");
    }

    setMessage(
      editingNewsId
        ? "News updated successfully!"
        : "News added successfully!"
    );

    resetNewsForm();
    await fetchNews();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to save news"
    );
  } finally {
    setLoading(false);
  }
};

// EDIT NEWS
const handleNewsEdit = (item: News) => {
  setEditingNewsId(item._id);

  setNewsDate(
    item.date ? new Date(item.date).toISOString().slice(0, 10) : ""
  );

  setNewsCategory(item.category);
  setNewsTitle(item.title);
  setNewsDescription(item.description);
  setNewsLink(item.link || "");

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

// DELETE NEWS
const handleNewsDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this news announcement?"
  );

  if (!confirmed) return;

  setLoading(true);
  setError("");
  setMessage("");

  try {
    const response = await fetch(`${API}/news/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete news");
    }

    setMessage("News deleted successfully!");

    if (editingNewsId === id) {
      resetNewsForm();
    }

    await fetchNews();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to delete news"
    );
  } finally {
    setLoading(false);
  }
};

// NEWS STATUS
const handleNewsStatus = async (id: string) => {
  setLoading(true);
  setError("");
  setMessage("");

  try {
    const response = await fetch(`${API}/news/${id}/status`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Status update failed");
    }

    setMessage("News status updated successfully!");
    await fetchNews();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Status update failed"
    );
  } finally {
    setLoading(false);
  }
};

  
// ==========================================
// GALLERY MANAGEMENT
// ==========================================

// RESET GALLERY FORM
const resetGalleryForm = () => {
  if (galleryPreview.startsWith("blob:")) {
    URL.revokeObjectURL(galleryPreview);
  }

  setGalleryFile(null);
  setGalleryPreview("");
  setGalleryAlt("");
  setEditingGalleryId(null);

  if (galleryInputRef.current) {
    galleryInputRef.current.value = "";
  }
};

// SELECT GALLERY IMAGE
const handleGalleryFileChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (
    !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 10 * 1024 * 1024
  ) {
    setError("Select a JPG, PNG or WebP image under 10 MB");
    e.target.value = "";
    return;
  }

  if (galleryPreview.startsWith("blob:")) {
    URL.revokeObjectURL(galleryPreview);
  }

  setError("");
  setGalleryFile(file);
  setGalleryPreview(URL.createObjectURL(file));
};

// ADD OR UPDATE GALLERY IMAGE
const handleGallerySubmit = async () => {
  if (!galleryAlt.trim()) {
    setError("Please enter an image description");
    return;
  }

  if (!editingGalleryId && !galleryFile) {
    setError("Please select a gallery image");
    return;
  }

  if (!editingGalleryId && gallery.length >= 10) {
    setError("Maximum 10 gallery images are allowed");
    return;
  }

  setLoading(true);
  setError("");
  setMessage("");

  try {
    const formData = new FormData();

    formData.append("alt", galleryAlt.trim());

    if (galleryFile) {
      formData.append("image", galleryFile);
    }

    const url = editingGalleryId
      ? `${API}/gallery/${editingGalleryId}`
      : `${API}/gallery`;

    const response = await fetch(url, {
      method: editingGalleryId ? "PUT" : "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save gallery image");
    }

    setMessage(
      editingGalleryId
        ? "Gallery image updated successfully!"
        : "Gallery image uploaded successfully!"
    );

    resetGalleryForm();
    await fetchGallery();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to save gallery image"
    );
  } finally {
    setLoading(false);
  }
};

// EDIT GALLERY IMAGE
const handleGalleryEdit = (image: GalleryImage) => {
  setEditingGalleryId(image._id);
  setGalleryAlt(image.alt);
  setGalleryFile(null);
  setGalleryPreview(image.image);

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

// DELETE GALLERY IMAGE
const handleGalleryDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this gallery image? This will remove it from MongoDB and Cloudinary."
  );

  if (!confirmed) return;

  setLoading(true);
  setError("");
  setMessage("");

  try {
    const response = await fetch(`${API}/gallery/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete gallery image");
    }

    setMessage("Gallery image deleted successfully!");

    if (editingGalleryId === id) {
      resetGalleryForm();
    }

    await fetchGallery();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to delete gallery image"
    );
  } finally {
    setLoading(false);
  }
};

// GALLERY STATUS
const handleGalleryStatus = async (id: string) => {
  setLoading(true);
  setError("");
  setMessage("");

  try {
    const response = await fetch(`${API}/gallery/${id}/status`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Status update failed");
    }

    setMessage("Gallery image status updated!");
    await fetchGallery();
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Status update failed"
    );
  } finally {
    setLoading(false);
  }
};


  // ADMIN PAGE JSX
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="flex min-h-screen flex-col md:flex-row">
        <div className="min-w-0 flex-1 bg-[#f3f3f5] px-6 py-10 md:px-10">
          <div className="mx-auto max-w-7xl">

            <h1 className="mb-5 text-4xl font-normal text-gray-900">
              Home Page
            </h1>

            <hr className="mb-8 border-gray-400" />

            {/* BANNER UPLOAD */}
            <div className="space-y-5">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full rounded-lg border border-gray-300 bg-[#e9e9e9] text-lg file:mr-5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-cyan-500 file:px-5 file:py-3 file:font-semibold file:text-black"
              />

              {previews.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {previews.map((preview, index) => (
                    <img
                      key={preview}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-28 w-48 rounded-md border object-cover"
                    />
                  ))}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={loading}
                className="cursor-pointer rounded-md bg-blue-600 px-7 py-3 text-lg text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Upload"}
              </button>

              <input
                ref={editInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleReplace}
              />

              {message && (
                <p className="font-medium text-green-700">{message}</p>
              )}

              {error && (
                <p className="font-medium text-red-600">{error}</p>
              )}
            </div>

            <hr className="my-8 border-gray-400" />

            {/* BANNER TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#174b91] text-white">
                    <th className="px-4 py-5 text-lg">S.No</th>
                    <th className="px-4 py-5 text-center text-lg">
                      Banner Image
                    </th>
                    <th className="px-4 py-5 text-lg">Status</th>
                    <th className="px-4 py-5 text-lg">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {banners.map((banner, index) => (
                    <tr
                      key={banner._id}
                      className="border-b border-gray-500 bg-[#e9e9e9]"
                    >
                      <td className="px-4 py-6 text-lg">{index + 1}</td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={banner.image}
                            alt={`Banner ${index + 1}`}
                            className="h-24 w-48 rounded-md border border-gray-400 object-cover"
                          />

                          <a
                            href={banner.image}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 underline"
                          >
                            View Banner
                          </a>
                        </div>
                      </td>

                      <td className="px-4 py-6">
                        <button
                          onClick={() => handleStatus(banner._id)}
                          disabled={loading}
                          className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                            banner.isActive ? "bg-green-600" : "bg-gray-500"
                          }`}
                        >
                          {banner.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td className="px-4 py-6">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleEdit(banner._id)}
                            disabled={loading}
                            className="cursor-pointer rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(banner._id)}
                            disabled={loading}
                            className="cursor-pointer rounded-md bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {banners.length === 0 && (
                <p className="py-10 text-center text-gray-500">
                  No banners uploaded yet.
                </p>
              )}
            </div>

            <hr className="my-10 border-gray-400" />

            {/* TOPPERS MANAGEMENT */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900">
                SSLC Rank Holders / Toppers
              </h2>

              <p className="text-gray-600">
                Add, edit, activate or delete student achievement posters.
              </p>

              {/* TOPPER FORM */}
              <div className="space-y-5 rounded-lg border border-gray-300 bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingTopperId ? "Edit Topper" : "Add New Topper"}
                </h3>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Student Name
                  </label>

                  <input
                    type="text"
                    value={topperName}
                    onChange={(e) => setTopperName(e.target.value)}
                    placeholder="Enter student name"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Score
                  </label>

                  <input
                    type="text"
                    value={topperScore}
                    onChange={(e) => setTopperScore(e.target.value)}
                    placeholder="Example: SSLC (97.21%)"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Topper Poster
                  </label>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleTopperFileChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-cyan-500 file:px-5 file:py-3 file:font-semibold file:text-black"
                  />

                  <p className="mt-2 text-sm text-gray-500">
                    JPG, PNG or WebP. Maximum size: 10 MB.
                    {editingTopperId &&
                      " Leave empty to keep the existing poster."}
                  </p>
                </div>

                {topperPreview && (
                  <div>
                    <p className="mb-2 font-medium text-gray-700">
                      Poster Preview
                    </p>

                    <img
                      src={topperPreview}
                      alt="Topper poster preview"
                      className="h-64 w-48 rounded-md border border-gray-300 object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleTopperSubmit}
                    disabled={loading}
                    className="rounded-md bg-blue-600 px-7 py-3 cursor-pointer text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading
                      ? "Please wait..."
                      : editingTopperId
                      ? "Update Topper"
                      : "Add Topper"}
                  </button>

                  {editingTopperId && (
                    <button
                      type="button"
                      onClick={resetTopperForm}
                      disabled={loading}
                      className="rounded-md bg-gray-500 px-7 py-3 cursor-pointer text-white hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* TOPPERS TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#174b91] text-white">
                      <th className="px-4 py-5">S.No</th>
                      <th className="px-4 py-5 text-center">Poster</th>
                      <th className="px-4 py-5">Student Name</th>
                      <th className="px-4 py-5">Score</th>
                      <th className="px-4 py-5">Status</th>
                      <th className="px-4 py-5">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {toppers.map((topper, index) => (
                      <tr
                        key={topper._id}
                        className="border-b border-gray-400 bg-[#e9e9e9]"
                      >
                        <td className="px-4 py-5">{index + 1}</td>

                        <td className="px-4 py-4">
                          <div className="flex justify-center">
                            <img
                              src={topper.poster}
                              alt={topper.name}
                              className="h-36 w-28 rounded-md border border-gray-400 object-cover"
                            />
                          </div>
                        </td>

                        <td className="px-4 py-5 font-medium">
                          {topper.name}
                        </td>

                        <td className="px-4 py-5">{topper.score}</td>

                        <td className="px-4 py-5">
                          <button
                            type="button"
                            onClick={() => handleTopperStatus(topper._id)}
                            disabled={loading}
                            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                              topper.isActive ? "bg-green-600" : "bg-gray-500"
                            }`}
                          >
                            {topper.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>

                        <td className="px-4 py-5">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleTopperEdit(topper)}
                              disabled={loading}
                              className="rounded-md bg-blue-600 cursor-pointer px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleTopperDelete(topper._id)}
                              disabled={loading}
                              className="rounded-md bg-red-600 px-4 py-2 text-white cursor-pointer hover:bg-red-700 disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {toppers.length === 0 && (
                  <p className="py-10 text-center text-gray-500">
                    No toppers added yet.
                  </p>
                )}
              </div>
            </section>

            
            <hr className="my-10 border-gray-400" />

            {/* GALLERY MANAGEMENT */}
            <section className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-900">
                    School Gallery
                  </h2>

                  <p className="mt-2 text-gray-600">
                    Upload, edit, activate or delete school gallery images.
                  </p>
                </div>

                <span
                  className={`rounded-full px-5 py-2 font-semibold ${
                    gallery.length >= 10
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {gallery.length} / 10 Images
                </span>
              </div>

              {/* GALLERY FORM */}
              <div className="space-y-5 rounded-lg border border-gray-300 bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingGalleryId
                    ? "Edit Gallery Image"
                    : "Add Gallery Image"}
                </h3>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Image Description
                  </label>

                  <input
                    type="text"
                    value={galleryAlt}
                    onChange={(e) => setGalleryAlt(e.target.value)}
                    placeholder="Example: Annual Day Celebration"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    Gallery Image
                  </label>

                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleGalleryFileChange}
                    disabled={!editingGalleryId && gallery.length >= 10}
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-cyan-500 file:px-5 file:py-3 file:font-semibold file:text-black disabled:opacity-50"
                  />

                  <p className="mt-2 text-sm text-gray-500">
                    JPG, PNG or WebP. Maximum size: 10 MB.
                    {editingGalleryId &&
                      " Leave empty to keep the existing image."}
                  </p>
                </div>

                {galleryPreview && (
                  <div>
                    <p className="mb-2 font-medium text-gray-700">
                      Image Preview
                    </p>

                    <img
                      src={galleryPreview}
                      alt="Gallery preview"
                      className="h-48 w-72 rounded-md border border-gray-300 object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleGallerySubmit}
                    disabled={
                      loading ||
                      (!editingGalleryId && gallery.length >= 10)
                    }
                    className="cursor-pointer rounded-md bg-blue-600 px-7 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading
                      ? "Please wait..."
                      : editingGalleryId
                      ? "Update Image"
                      : "Upload Image"}
                  </button>

                  {editingGalleryId && (
                    <button
                      type="button"
                      onClick={resetGalleryForm}
                      disabled={loading}
                      className="cursor-pointer rounded-md bg-gray-500 px-7 py-3 text-white hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {!editingGalleryId && gallery.length >= 10 && (
                  <p className="font-medium text-red-600">
                    Maximum 10 images reached. Delete an existing image
                    to upload another.
                  </p>
                )}
              </div>

              {/* GALLERY TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#174b91] text-white">
                      <th className="px-4 py-5">S.No</th>
                      <th className="px-4 py-5 text-center">
                        Gallery Image
                      </th>
                      <th className="px-4 py-5">Description</th>
                      <th className="px-4 py-5">Status</th>
                      <th className="px-4 py-5">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {gallery.map((image, index) => (
                      <tr
                        key={image._id}
                        className="border-b border-gray-400 bg-[#e9e9e9]"
                      >
                        <td className="px-4 py-5">
                          {index + 1}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-col items-center gap-2">
                            <img
                              src={image.image}
                              alt={image.alt}
                              className="h-28 w-48 rounded-md border border-gray-400 object-cover"
                            />

                            <a
                              href={image.image}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-700 underline"
                            >
                              View Image
                            </a>
                          </div>
                        </td>

                        <td className="px-4 py-5 font-medium">
                          {image.alt}
                        </td>

                        <td className="px-4 py-5">
                          <button
                            type="button"
                            onClick={() => handleGalleryStatus(image._id)}
                            disabled={loading}
                            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                              image.isActive
                                ? "bg-green-600"
                                : "bg-gray-500"
                            }`}
                          >
                            {image.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>

                        <td className="px-4 py-5">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleGalleryEdit(image)}
                              disabled={loading}
                              className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleGalleryDelete(image._id)}
                              disabled={loading}
                              className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {gallery.length === 0 && (
                  <p className="py-10 text-center text-gray-500">
                    No gallery images uploaded yet.
                  </p>
                )}
              </div>
            </section>


            <hr className="my-10 border-gray-400" />

{/* NEWS MANAGEMENT */}
<section className="space-y-6">

  <div>
    <h2 className="text-3xl font-semibold text-gray-900">
      News & Announcements
    </h2>

    <p className="mt-2 text-gray-600">
      Add, edit, activate or delete school news and announcements.
    </p>
  </div>

  {/* NEWS FORM */}
  <div className="space-y-5 rounded-lg border border-gray-300 bg-white p-6">

    <h3 className="text-xl font-semibold text-gray-800">
      {editingNewsId ? "Edit News" : "Add New News"}
    </h3>

    {/* DATE */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        News Date
      </label>

      <input
        type="date"
        value={newsDate}
        onChange={(e) => setNewsDate(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>

    {/* CATEGORY */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Category
      </label>

      <select
        value={newsCategory}
        onChange={(e) => setNewsCategory(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      >
        <option value="Announcement">Announcement</option>
        <option value="Achievements">Achievements</option>
        <option value="School Events">School Events</option>
        <option value="Campus">Campus</option>
        <option value="Admissions">Admissions</option>
        <option value="Sports">Sports</option>
        <option value="Activities">Activities</option>
        <option value="General">General</option>
        <option value="Holiday's List">Holiday's List</option>
      </select>
    </div>

    {/* TITLE */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        News Title
      </label>

      <input
        type="text"
        value={newsTitle}
        onChange={(e) => setNewsTitle(e.target.value)}
        placeholder="Enter news title"
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>

    {/* DESCRIPTION */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Description
      </label>

      <textarea
        value={newsDescription}
        onChange={(e) => setNewsDescription(e.target.value)}
        placeholder="Enter news description"
        rows={4}
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>

    {/* LINK */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Page Link (Optional)
      </label>

      <input
        type="text"
        value={newsLink}
        onChange={(e) => setNewsLink(e.target.value)}
        placeholder="Example: /admission"
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />

      <p className="mt-2 text-sm text-gray-500">
        Enter the page URL to open when a visitor clicks the news.
      </p>
    </div>

    {/* BUTTONS */}
    <div className="flex flex-wrap gap-3">

      <button
        type="button"
        onClick={handleNewsSubmit}
        disabled={loading}
        className="cursor-pointer rounded-md bg-blue-600 px-7 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Please wait..."
          : editingNewsId
          ? "Update News"
          : "Add News"}
      </button>

      {editingNewsId && (
        <button
          type="button"
          onClick={resetNewsForm}
          disabled={loading}
          className="cursor-pointer rounded-md bg-gray-500 px-7 py-3 text-white hover:bg-gray-600 disabled:opacity-50"
        >
          Cancel
        </button>
      )}

    </div>
  </div>

  {/* NEWS TABLE */}
  <div className="overflow-x-auto">

    <table className="w-full border-collapse text-left">

      <thead>
        <tr className="bg-[#174b91] text-white">
          <th className="px-4 py-5">S.No</th>
          <th className="px-4 py-5">Date</th>
          <th className="px-4 py-5">Category</th>
          <th className="px-4 py-5">Title</th>
          <th className="px-4 py-5">Status</th>
          <th className="px-4 py-5">Action</th>
        </tr>
      </thead>

      <tbody>
        {news.map((item, index) => (
          <tr
            key={item._id}
            className="border-b border-gray-400 bg-[#e9e9e9]"
          >
            <td className="px-4 py-5">
              {index + 1}
            </td>

            <td className="px-4 py-5 whitespace-nowrap">
              {new Date(item.date).toLocaleDateString("en-IN")}
            </td>

            <td className="px-4 py-5">
              {item.category}
            </td>

            <td className="px-4 py-5 font-medium">
              <div className="max-w-xs">
                {item.title}
                <p className="mt-1 text-sm font-normal text-gray-600">
                  {item.description}
                </p>
              </div>
            </td>

            <td className="px-4 py-5">
              <button
                type="button"
                onClick={() => handleNewsStatus(item._id)}
                disabled={loading}
                className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                  item.isActive
                    ? "bg-green-600"
                    : "bg-gray-500"
                }`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </button>
            </td>

            <td className="px-4 py-5">
              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={() => handleNewsEdit(item)}
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleNewsDelete(item._id)}
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  Delete
                </button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>

    </table>

    {news.length === 0 && (
      <p className="py-10 text-center text-gray-500">
        No news announcements added yet.
      </p>
    )}

  </div>

</section>


            <hr className="my-10 border-gray-400" />

{/* TESTIMONIALS MANAGEMENT */}
<section className="space-y-6">

  <div>
    <h2 className="text-3xl font-semibold text-gray-900">
      Parent Testimonials
    </h2>

    <p className="mt-2 text-gray-600">
      Add, edit, activate or delete parent and student testimonials.
    </p>
  </div>

  {/* TESTIMONIAL FORM */}
  <div className="space-y-5 rounded-lg border border-gray-300 bg-white p-6">

    <h3 className="text-xl font-semibold text-gray-800">
      {editingTestimonialId
        ? "Edit Testimonial"
        : "Add New Testimonial"}
    </h3>

    {/* NAME */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Parent / Student Name
      </label>

      <input
        type="text"
        value={testimonialName}
        onChange={(e) => setTestimonialName(e.target.value)}
        placeholder="Example: Parent of a Student"
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>

    {/* ROLE */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Role
      </label>

      <input
        type="text"
        value={testimonialRole}
        onChange={(e) => setTestimonialRole(e.target.value)}
        placeholder="Example: Parent Testimonial"
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>

    {/* MESSAGE */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Testimonial Message
      </label>

      <textarea
        value={testimonialMessage}
        onChange={(e) => setTestimonialMessage(e.target.value)}
        placeholder="Enter parent testimonial"
        rows={5}
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>

    {/* INITIALS */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Avatar Initials
      </label>

      <input
        type="text"
        maxLength={3}
        value={testimonialInitials}
        onChange={(e) => setTestimonialInitials(e.target.value)}
        placeholder="Example: P"
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>

    <div>
  <label className="block text-sm font-medium mb-2">
    Star Rating
  </label>

  <select
    value={testimonialRating}
    onChange={(e) => setTestimonialRating(Number(e.target.value))}
    className="w-full border rounded-lg p-3"
  >
    {[1, 2, 3, 4, 5].map((rating) => (
      <option key={rating} value={rating}>
        {rating} Star{rating > 1 ? "s" : ""}
      </option>
    ))}
  </select>
</div>

    {/* AVATAR COLOR */}
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Avatar Color
      </label>

      <select
        value={testimonialColor}
        onChange={(e) => setTestimonialColor(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      >
        <option value="bg-purple-100 text-purple-700">Purple</option>
        <option value="bg-orange-100 text-orange-700">Orange</option>
        <option value="bg-emerald-100 text-emerald-700">Emerald</option>
        <option value="bg-sky-100 text-sky-700">Sky Blue</option>
        <option value="bg-rose-100 text-rose-700">Rose</option>
        <option value="bg-amber-100 text-amber-700">Amber</option>
      </select>

      <div className="mt-3">
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${testimonialColor}`}
        >
          {testimonialInitials || "P"}
        </span>
      </div>
    </div>

    {/* BUTTONS */}
    <div className="flex flex-wrap gap-3">

      <button
        type="button"
        onClick={handleTestimonialSubmit}
        disabled={loading}
        className="cursor-pointer rounded-md bg-blue-600 px-7 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Please wait..."
          : editingTestimonialId
          ? "Update Testimonial"
          : "Add Testimonial"}
      </button>

      {editingTestimonialId && (
        <button
          type="button"
          onClick={resetTestimonialForm}
          disabled={loading}
          className="cursor-pointer rounded-md bg-gray-500 px-7 py-3 text-white hover:bg-gray-600 disabled:opacity-50"
        >
          Cancel
        </button>
      )}

    </div>
  </div>

  {/* TESTIMONIALS TABLE */}
  <div className="overflow-x-auto">

    <table className="w-full border-collapse text-left">

      <thead>
        <tr className="bg-[#174b91] text-white">
          <th className="px-4 py-5">S.No</th>
          <th className="px-4 py-5">Name</th>
          <th className="px-4 py-5">Role</th>
          <th className="px-4 py-5">Message</th>
          <th className="px-4 py-5">Avatar</th>
          <th className="px-4 py-5">Status</th>
          <th className="px-4 py-5">Action</th>
        </tr>
      </thead>

      <tbody>
        {testimonials.map((item, index) => (
          <tr
            key={item._id}
            className="border-b border-gray-400 bg-[#e9e9e9]"
          >
            <td className="px-4 py-5">{index + 1}</td>

            <td className="px-4 py-5 font-medium">
              {item.name}
            </td>

            <td className="px-4 py-5">
              {item.role}
            </td>

            <td className="px-4 py-5">
              <p className="max-w-sm text-sm text-gray-700">
                {item.message}
              </p>
            </td>

            <td className="px-4 py-5">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full font-bold ${
                  item.color || "bg-purple-100 text-purple-700"
                }`}
              >
                {item.initials || "P"}
              </span>
            </td>

            <td className="px-4 py-5">
              <button
                type="button"
                onClick={() => handleTestimonialStatus(item._id)}
                disabled={loading}
                className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                  item.isActive
                    ? "bg-green-600"
                    : "bg-gray-500"
                }`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </button>
            </td>

            <td className="px-4 py-5">
              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={() => handleTestimonialEdit(item)}
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleTestimonialDelete(item._id)}
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  Delete
                </button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>

    </table>

    {testimonials.length === 0 && (
      <p className="py-10 text-center text-gray-500">
        No testimonials added yet.
      </p>
    )}

  </div>

</section>


<hr className="my-10 border-gray-400" />
            
{/* THOUGHT FOR THE DAY MANAGEMENT */}
<section className="space-y-6">

  <div>
    <h2 className="text-3xl font-semibold text-gray-900">
      Thought for the Day
    </h2>

    <p className="mt-2 text-gray-600">
      Update the inspirational quote displayed on the home page.
    </p>
  </div>

  <div className="space-y-5 rounded-lg border border-gray-300 bg-white p-6">

    <div>
      <label className="mb-2 block font-medium text-gray-700">
        Thought / Quote
      </label>

      <textarea
        value={thoughtQuote}
        onChange={(e) => setThoughtQuote(e.target.value)}
        placeholder="Enter the thought for the day..."
        rows={5}
        maxLength={1000}
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />

      <p className="mt-2 text-sm text-gray-500">
        {thoughtQuote.length}/1000 characters
      </p>
    </div>

    {thoughtQuote.trim() && (
      <div className="rounded-lg bg-blue-950 p-6 text-center text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-300">
          Thought Preview
        </p>

        <p className="text-lg font-medium leading-relaxed">
          "{thoughtQuote}"
        </p>
      </div>
    )}

    <button
      type="button"
      onClick={handleThoughtSubmit}
      disabled={loading || !thoughtQuote.trim()}
      className="cursor-pointer rounded-md bg-blue-600 px-7 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Please wait..." : "Save Thought"}
    </button>

  </div>

</section>

<hr className="my-10 border-gray-400" />



          </div>
        </div>
      </section>
    </main>
  );
}
