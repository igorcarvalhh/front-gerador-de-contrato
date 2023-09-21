export default function Label({ children, required }) {
  return (
    <label className="mb-2 form-label">
      {children}
      {required ? <span>*</span> : ""}
    </label>
  );
}
