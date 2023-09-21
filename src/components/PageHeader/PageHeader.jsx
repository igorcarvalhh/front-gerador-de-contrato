export default function PageHeader(props) {
  return (
    <header className="header">
      <img
        className="pdi-logo"
        src="https://avatars.githubusercontent.com/u/50842644?s=280&v=4"
        alt="logo pdi taesa"
      />
      <h1 className="text-3xl">{props.title}</h1>
      <h3 className="text-lg font-normal">{props.subtitle}</h3>
    </header>
  );
}
