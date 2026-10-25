export default function Brand() {
  return (
    <a className="brand" href="/" aria-label="Riseup.AI home">
      <svg viewBox="0 0 610 1005" aria-hidden="true" className="brand-gem">
        <defs>
          <linearGradient id="brand-gem-fill" x1="0" y1="0" x2=".35" y2="1">
            <stop offset="0" stopColor="#f7b35a" />
            <stop offset=".45" stopColor="#e0641f" />
            <stop offset="1" stopColor="#8f2d0b" />
          </linearGradient>
        </defs>
        <path
          fill="url(#brand-gem-fill)"
          fillRule="evenodd"
          d="M305 0C382 124 566 330 610 527C596 706 468 878 305 1005C142 878 14 706 0 527C44 330 228 124 305 0Z M305 300C246 404 222 470 236 540C252 616 286 690 305 905C324 690 358 616 374 540C388 470 364 404 305 300Z"
        />
        <path
          fill="#7a2a0a"
          opacity=".32"
          d="M305 0C380 124 566 330 610 527C560 430 430 380 380 300C350 250 320 140 305 0Z"
        />
      </svg>
      <span>Riseup.AI</span>
    </a>
  );
}
