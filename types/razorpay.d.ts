interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    hide_topbar?: boolean;
  };
  modal?: {
    ondismiss?: () => void;
    animation?: boolean;
  };
  config?: {
    display?: {
      blocks?: Record<string, { name: string; instruments: { method: string }[] }>;
      sequence?: string[];
      preferences?: { show_default_blocks?: boolean };
    };
  };
}

declare class RazorpayCheckout {
  constructor(options: RazorpayOptions);
  open(): void;
  on(event: string, callback: (response: RazorpayPaymentResponse) => void): void;
}

interface Window {
  Razorpay: typeof RazorpayCheckout;
}
