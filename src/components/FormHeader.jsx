export default function FormHeader(props) {
  return (
    <>
      <div className="py-4 text-center">
        <img
          class="d-block mx-auto mb-4"
          src="https://avatars.githubusercontent.com/u/50842644?s=280&v=4"
          alt=""
          width="100"
          height="100"
        />
        <h2>{props.title}</h2>
        <p class="lead">{props.subtitle}</p>
      </div>
    </>
  );
}
