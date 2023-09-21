export default function Input(props) {
  return (
    <>
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">
          {props.label}
        </label>
        {props.children}
      </div>
    </>
  );
}
