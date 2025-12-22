"use client"

import Image from "next/image"

export function WhatsAppChat() {
  const handleClick = () => {
    const url =
      "https://api.whatsapp.com/send/?phone=62882022783493&text=Halo%2C+saya+ingin+bertanya+tentang+lelang+mobil.&type=phone_number&app_absent=0"
    window.open(url, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:shadow-2xl active:scale-95 sm:h-16 sm:w-16 group"
      aria-label="Chat WhatsApp"
    >
      <div className="relative w-8 h-8 sm:w-10 sm:h-10">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/024/398/617/non_2x/whatsapp-logo-icon-isolated-on-transparent-background-free-png.png"
          alt="WhatsApp"
          fill
          className="object-contain"
          sizes="40px"
        />
      </div>

      {/* Online indicator */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-[#25D366]">
        <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
      </span>

      {/* Tooltip on hover */}
      <div className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg">
        Butuh bantuan? Chat kami!
        <div className="absolute right-0 top-1/2 -mr-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-900" />
      </div>
    </button>
  )
}
