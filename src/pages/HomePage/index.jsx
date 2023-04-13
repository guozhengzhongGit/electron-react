const Home = () => {
  const chromeVersion = versions.chrome();
  const nodeVersion = versions.node();
  const electronVersion = versions.electron();
  return (
    <div>
      <h1>Home Page

      </h1>
      <p>app is using Chrome { chromeVersion }, Node { nodeVersion }, Electron { electronVersion }</p>
    </div>
  );
}

export default Home;