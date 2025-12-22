"use client"

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
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 48 48" fill="none">
        <path d="M24 0C10.745 0 0 10.745 0 24c0 4.243 1.107 8.229 3.041 11.682L0.418 46.418l11.014-2.891C14.771 45.893 19.257 47 24 47c13.255 0 24-10.745 24-24S37.255 0 24 0z" fill="#25D366"/>
        <path d="M35.176 31.929c-.554 1.561-2.761 2.861-4.518 3.236-.478.1-.982.149-1.486.149-1.561 0-3.236-.4-5.411-1.561-3.236-1.711-6.471-4.518-8.882-7.929-1.561-2.175-2.461-4.518-2.561-6.993-.1-2.175.8-4.118 2.361-5.411.4-.3.9-.5 1.4-.5.2 0 .4 0 .6.1.5.1.9.3 1.2.9.4.7.9 2.175 1 2.375.1.2.2.5.1.8-.1.3-.2.5-.4.7-.2.2-.4.5-.6.7-.2.2-.4.5-.2.9.2.4.9 1.561 2.061 2.561 1.561 1.361 2.861 1.761 3.361 2.061.4.2.7.2 1-.2.3-.4 1.2-1.4 1.561-1.861.4-.5.7-.4 1.2-.2.5.2 3.036 1.461 3.536 1.761.5.3.8.4.9.7.1.3.1 1.561-.4 3.036z" fill="#fff"/>
      </svg>

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
