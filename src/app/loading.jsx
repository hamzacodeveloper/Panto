export default function Loading() {
  return (
    <main className="panto-route-loading" role="status" aria-live="polite">
      <div className="panto-route-loading-content">
        <span className="panto-route-loading-logo">Panto</span>
        <span className="panto-route-loading-indicator" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="panto-route-loading-message">Making room for comfort</span>
      </div>
      <span className="panto-visually-hidden">Loading page</span>
    </main>
  );
}
