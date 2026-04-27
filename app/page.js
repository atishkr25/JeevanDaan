import Image from "next/image";
import medicalBills from "@/assets/medicalbills.png";
import fundraiser from "@/assets/startMedFundraiser.avif";
import medical from "@/assets/trymedical.avif";

export default function Home() {   
  return (
    <>
      {/* 🌟 Hero Section */}
      <div className='min-h-[42vh] relative w-full overflow-hidden flex flex-col gap-6 justify-center items-center px-4 sm:px-6 text-white bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
        <div className="font-bold text-3xl sm:text-4xl md:text-5xl flex gap-2 justify-center items-center drop-shadow-lg text-center flex-wrap">
          Help the Needy 
          <span>
            <img src="https://www.lbma.org/wp-content/uploads/Donate-GIF.gif" width="80" alt="Donation GIF"/>
          </span>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-center max-w-[600px] drop-shadow-md">
          A crowdfunding platform for helpers to serve as a beacon of hope.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
          <button className="w-full sm:w-auto text-white bg-gradient-to-br from-blue-600 to-indigo-500 hover:scale-105 transition-transform duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-6 py-3 shadow-lg">
            Start now
          </button>
          <button className="w-full sm:w-auto text-white bg-gradient-to-br from-blue-600 to-indigo-500 hover:scale-105 transition-transform duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-6 py-3 shadow-lg">
            Read more
          </button>
        </div>
      </div>

      {/* 🔹 Divider */}
      <div className='bg-white h-1 opacity-10'></div>

      {/* 🌟 Fundraising Section */}
      <div className='text-xl sm:text-2xl md:text-3xl text-white flex justify-center items-center p-4 sm:p-6 font-semibold tracking-wide bg-gray-900 rounded-lg shadow-md text-center'>
        FUNDRAISING AND CROWDFUNDING
      </div>

      {/* 🌟 Image Section with Captions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-4 sm:px-8 md:px-12 justify-items-center">
        {[
          { img: medicalBills, title: "Medical Bills", desc: "Medical Bills are a burden for many individuals and families." },
          { img: fundraiser, title: "Start a Fundraiser", desc: "Stop worrying about medical bills. Start a fundraising campaign with Sahayak." },
          { img: medical, title: "Healthcare Support", desc: "Start a medical fundraiser for yourself or a loved one." }
        ].map((item, index) => (
          <div key={index} className="w-full max-w-sm flex flex-col items-center text-center bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <Image className="bg-slate-600 p-2 rounded-lg" width={200} height={200} src={item.img} alt={item.title} />
            <p className="mt-4 text-white text-xl font-bold">{item.title}</p>
            <p className="text-white text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Divider */}
      <div className='bg-white h-1 opacity-10 mt-10'></div>

      {/* 🌟 Learn More Section */}
      <div className='text-xl sm:text-2xl text-white flex justify-center items-center p-4 font-semibold text-center'>
        LEARN MORE ABOUT US
      </div>

      {/* 📹 Responsive YouTube Video */}
      <div className="flex justify-center items-center mt-6 px-4 sm:px-8">
        <div className="w-full max-w-3xl">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/CiFoHm7HD94?si=IKHkdyemXJd-kgP_" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* 🔹 Divider */}
      <div className='bg-white h-1 opacity-10 mt-10'></div>
    </>
  );
}
