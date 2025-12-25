"use client"

export function WhatsAppChat() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "62882022783493"
  
  const handleClick = () => {
    const message = encodeURIComponent("Halo, saya ingin bertanya tentang lelang mobil.")
    const url = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-[#20BA5A] active:scale-95 group animate-bounce-slow"
      aria-label="Chat WhatsApp"
      title="Chat dengan kami di WhatsApp"
    >
      {/* WhatsApp Logo SVG - Official Design */}
      <svg 
        className="w-9 h-9 text-white transition-transform group-hover:rotate-12" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>

      {/* Online indicator with pulse animation */}
      <span className="absolute -top-1 -right-1 flex h-5 w-5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
        <span className="relative inline-flex h-5 w-5 rounded-full bg-green-500 border-2 border-white"></span>
      </span>

      {/* Tooltip on hover */}
      <div className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-xl transition-opacity">
        💬 Butuh bantuan? Chat kami!
        <div className="absolute right-0 top-1/2 -mr-1.5 h-3 w-3 -translate-y-1/2 rotate-45 bg-gray-900" />
      </div>
    </button>
  )
}
