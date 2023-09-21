export default function FormGroup({ children, ...props }) {
  return (
    <div {...props} className="mb-3 flex flex-column">
      {children}
    </div>
  );
}
