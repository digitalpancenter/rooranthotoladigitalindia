import React, { useState } from "react";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [roomAvailable, setRoomAvailable] = useState(null);

  const handleSearch = () => {
    const available = Math.random() > 0.5;
    setRoomAvailable(available);
    setShowModal(true);
  };

  const featuredHotels = [
    {
      img: "img/chotel.jpeg",
      title: "Urbanza Suites",
      location: "Main Road 123 Street , 23 Colony",
      price: "$399",
      rating: 4.5,
      bestSeller: true,
    },
    {
      img: "img/Hotel Boulevard.jpg",
      title: "Urbanza Suites",
      location: "Main Road 123 Street , 23 Colony",
      price: "₹1500",
      rating: 4.5,
      bestSeller: false,
    },
    {
      img: "img/liebling hotel.jpg",
      title: "Urbanza Suites",
      location: "Main Road 123 Street , 23 Colony",
      price: "₹3000",
      rating: 4.5,
      bestSeller: true,
    },
    {
      img: "img/hotelwikipedia.jpg",
      title: "Urbanza Suites",
      location: "Main Road 123 Street , 23 Colony",
      price: "₹2000",
      rating: 4.5,
      bestSeller: false,
    },
  ];

  const offers = [
    {
      discount: "25% OFF",
      title: "Summer Escape Package",
      description: "Enjoy a complimentary night and daily breakfast",
      expiry: "Aug 31",
      image: "img/hotel.jpg",
    },
    {
      discount: "20% OFF",
      title: "Romantic Getaway",
      description: "Special couples package including spa treatment",
      expiry: "Sep 20",
      image: "img/limak.jpg",
    },
    {
      discount: "30% OFF",
      title: "Luxury Retreat",
      description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.",
      expiry: "Sep 25",
      image: "img/luxury.jpeg",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center relative bg-no-repeat"
        style={{ backgroundImage: "url('img/colonyhotel.jpg')" }}
      >
        <div className="relative z-10 px-8 lg:px-20 pt-36 max-w-5xl text-white">
          <p className="bg-blue-500 inline-block px-4 py-1 rounded-full mb-4">
            The Ultimate Hotel Experience
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Discover Your Perfect <br /> Gateway Destination
          </h1>
          <p className="text-lg mb-10">
            Unparalleled luxury and comfort await at the world's most exclusive
            hotels and resorts. Start your journey today.
          </p>

  <div className="bg-white rounded-xl shadow-lg p-4 flex flex-wrap gap-4 items-center">
  <div className="flex flex-col">
    <label className="text-gray-500 text-sm">ROOM Destination</label>
    <input type="text" className="border rounded-md px-3 py-2 w-40" />
  </div>
  <div className="flex flex-col">
    <label className="text-gray-500 text-sm">Check in</label>
    <input type="date" className="border rounded-md px-3 py-2 w-40" />
  </div>
  <div className="flex flex-col">
    <label className="text-gray-500 text-sm">Check out</label>
    <input type="date" className="border rounded-md px-3 py-2 w-40" />
  </div>
  <div className="flex flex-col">
    <label className="text-gray-500 text-sm">Guests</label>
    <input type="number" min="1" className="border rounded-md px-3 py-2 w-24" />
  </div>
  <button
    onClick={handleSearch}
    className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
  >
    🔍 Search
  </button>
</div>
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-96 text-center">
      {roomAvailable ? (
        <>
          <h2 className="text-lg font-semibold mb-2 text-green-600">✅ Room Available</h2>
          <p>Contact the room owner: <strong>8447008141</strong></p>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2 text-red-600">❌ Not Available</h2>
          <p>Sorry, no rooms are available for the selected dates.</p>
        </>
      )}
      <button
        onClick={() => setShowModal(false)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  </div>
)}

      {/* Featured Destination */}
      <section className="py-16 px-4 lg:px-20 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Featured Destination
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional properties around
            the world, offering unparalleled luxury and unforgettable experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredHotels.map((hotel, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300">
              <div className="relative">
                <img src={hotel.img} alt={hotel.title} className="w-full h-56 object-cover" />
                {hotel.bestSeller && (
                  <span className="absolute top-3 left-3 bg-white text-sm font-medium text-gray-800 px-3 py-1 rounded-full shadow">
                    Best Seller
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{hotel.title}</h3>
                <p className="text-sm text-gray-500 mt-1">📍 {hotel.location}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">{hotel.price}
                    <span className="text-sm font-normal text-gray-500">/night</span>
                  </span>
                  <span className="flex items-center text-orange-500 font-semibold">
                    ⭐ {hotel.rating}
                  </span>
                </div>
                <button className="mt-4 w-full border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="px-4 lg:px-20 py-16 bg-white">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden relative h-64 flex flex-col justify-end p-6 text-white bg-cover bg-center"
              style={{ backgroundImage: `url(${offer.image})` }}
            >
              <span className="absolute top-4 left-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow">
                {offer.discount}
              </span>
              <h3 className="text-xl font-bold">{offer.title}</h3>
              <p className="text-sm mt-1">{offer.description}</p>
              <p className="text-xs text-gray-200 mt-1">Expires {offer.expiry}</p>
              <button className="mt-4 text-sm font-medium underline flex items-center gap-1 hover:text-blue-200">
                View Offers <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
<section className="bg-gray-50 py-16 px-4 lg:px-20 text-center">
  <h2 className="text-3xl md:text-4xl font-semibold mb-4">What Our Guests Say</h2>
  <p className="text-gray-600 max-w-2xl mx-auto mb-12">
    Discover why discerning travelers consistently choose R.A DIGITAL INDIA  for their exclusive and luxurious accommodations around the world.
  </p>

  <div className="grid gap-8 md:grid-cols-3">
    {[
      {
        name: "Emma Rodriguez",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4,
        review:
          "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that R.A DIGITAL INDIA provides. Their curated selection of hotels is unmatched.",
      },
      {
        name: "Liam Johnson",
        image: "https://randomuser.me/api/portraits/men/65.jpg",
        rating: 4,
        review:
          "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that R.A DIGITAL INDIA provides. Their curated selection of hotels is unmatched.",
      },
      {
        name: "Sophia Lee",
        image: "https://randomuser.me/api/portraits/women/64.jpg",
        rating: 4,
        review:
          "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that R.A DIGITAL INDIA provides. Their curated selection of hotels is unmatched.",
      },
    ].map((testimonial, idx) => (
      <div
        key={idx}
        className="bg-white rounded-xl shadow p-6 text-left max-w-md mx-auto"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <div className="text-orange-400">
              {"★".repeat(testimonial.rating)}
              {"☆".repeat(5 - testimonial.rating)}
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm">"{testimonial.review}"</p>
      </div>
    ))}
  </div>
</section>

{/* Newsletter Section */}
<section className="py-16 bg-gray-900 text-white px-4">
  <div className="max-w-xl mx-auto bg-gray-800 rounded-xl p-8 text-center">
    <h3 className="text-2xl font-semibold mb-4">Stay Inspired</h3>
    <p className="text-sm text-gray-300 mb-6">
      Join our newsletter and be the first to discover new destinations,
      exclusive offers, and travel inspiration.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 w-full sm:w-auto rounded-lg text-black"
      />
      <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200">
        Subscribe →
      </button>
    </div>
    <p className="text-xs text-gray-400 mt-4">
      By subscribing, you agree to our Privacy Policy and consent to receive updates.
    </p>
  </div>
</section>

    </div>
  );
};
export default Hero;
