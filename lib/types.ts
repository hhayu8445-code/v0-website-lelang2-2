export interface User {
  id: string
  email: string
  phone?: string
  full_name: string
  id_card_number?: string
  kyc_status: "pending" | "verified" | "rejected"
  kyc_documents?: {
    ktp_url?: string
    selfie_url?: string
    npwp?: string
  }
  wallet_balance: number
  bonus_balance: number
  auction_participation_count: number
  role?: "user" | "admin"
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  mileage?: number
  transmission?: "Manual" | "Automatic" | "CVT" | "DCT"
  fuel_type?: "Bensin" | "Diesel" | "Hybrid" | "Electric" | "CNG"
  color?: string
  starting_price: number
  current_bid?: number
  buy_now_price?: number
  condition?: "Excellent" | "Good" | "Fair" | "Poor"
  description?: string
  location: string
  images: string[]
  documents: string[]
  auction_status: "upcoming" | "live" | "ended" | "sold" | "cancelled"
  auction_start_time?: string
  auction_end_time?: string
  seller_id?: string
  winner_id?: string
  view_count: number
  bid_count: number
  created_at: string
  updated_at: string
}

export interface Bid {
  id: string
  vehicle_id: string
  user_id: string
  bid_amount: number
  bid_time: string
  is_auto_bid: boolean
  status: "active" | "outbid" | "winner" | "cancelled"
  created_at: string
  user?: User
}

export interface Transaction {
  id: string
  user_id: string
  type: "kyc_bonus" | "deposit" | "withdrawal" | "bid" | "purchase" | "refund"
  amount: number
  status: "pending" | "completed" | "failed" | "cancelled"
  reference_number?: string
  payment_method?: string
  bank_details?: Record<string, unknown>
  notes?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  user_id: string
  vehicle_id?: string
  rating: number
  comment: string
  images: string[]
  verified_purchase: boolean
  is_featured: boolean
  created_at: string
  user?: User
}

export interface KYCVerification {
  id: string
  user_id: string
  id_card_photo?: string
  selfie_photo?: string
  npwp_number?: string
  verification_status: "pending" | "approved" | "rejected"
  admin_notes?: string
  verified_at?: string
  verified_by?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  read_status: boolean
  link?: string
  created_at: string
}

export interface BankAccount {
  id: string
  user_id: string
  bank_name: string
  account_number: string
  account_holder_name: string
  verification_status: "pending" | "verified" | "rejected"
  created_at: string
}
